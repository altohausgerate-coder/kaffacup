import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { generatePromoCode } from '../utils/promoCode'

const CustomerAuthContext = createContext()

const dataKey = (email) => `kc_cb_${email}`
const loadData = (email) => {
  try { return JSON.parse(localStorage.getItem(dataKey(email)) || '{}') } catch { return {} }
}
const saveData = (email, data) => localStorage.setItem(dataKey(email), JSON.stringify(data))

// Single source of truth: recalculate everything from kassir log
function recalcFromLog(email) {
  const promoCode = generatePromoCode(email)
  let kassirLog = []
  try { kassirLog = JSON.parse(localStorage.getItem('kc_kassir_log') || '[]') } catch {}

  const mine = kassirLog.filter(r => r.promoCode === promoCode)
  const newTotal = parseFloat(mine.reduce((s, r) => s + r.cashbackAmount, 0).toFixed(2))
  const newOrders = mine.map(r => ({
    id: `ORD-${r.id}`,
    date: r.date,
    items: r.items || [],
    total: r.purchaseAmount,
    cashbackEarned: r.cashbackAmount,
  }))

  // mark all as claimed
  const updatedLog = kassirLog.map(r =>
    r.promoCode === promoCode ? { ...r, claimed: true } : r
  )
  localStorage.setItem('kc_kassir_log', JSON.stringify(updatedLog))

  const d = loadData(email)
  const updated = { ...d, balance: newTotal, totalEarned: newTotal, orders: newOrders }
  saveData(email, updated)
  return updated
}

export function CustomerAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cashbackBalance, setCashbackBalance] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)
  const [orderHistory, setOrderHistory] = useState([])
  const emailRef = useRef(null)

  const applyData = (d) => {
    setCashbackBalance(d.balance || 0)
    setTotalEarned(d.totalEarned || 0)
    setOrderHistory(d.orders || [])
  }

  const refresh = (email) => {
    const d = recalcFromLog(email)
    applyData(d)
  }

  useEffect(() => {
    const saved = localStorage.getItem('kc_user_email')
    if (saved) restoreUser(saved)
  }, [])

  // BroadcastChannel — any kassir change triggers full recalc
  useEffect(() => {
    let bc
    try {
      bc = new BroadcastChannel('kaffa-cashback')
      bc.onmessage = () => {
        if (emailRef.current) refresh(emailRef.current)
      }
    } catch {}
    return () => { try { bc?.close() } catch {} }
  }, [])

  // window focus — safety net if tab was inactive during kassir change
  useEffect(() => {
    const onFocus = () => { if (emailRef.current) refresh(emailRef.current) }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  const restoreUser = (email) => {
    emailRef.current = email
    const d = recalcFromLog(email)
    const meta = loadData(email)
    setUser({
      email,
      displayName: meta.displayName || email.split('@')[0],
      phone: meta.phone || '',
    })
    applyData(d)
  }

  const signIn = (email, displayName, phone) => {
    const clean = email.trim().toLowerCase()
    localStorage.setItem('kc_user_email', clean)
    const d = loadData(clean)
    saveData(clean, { ...d, displayName, phone })
    restoreUser(clean)
  }

  const signOutUser = () => {
    localStorage.removeItem('kc_user_email')
    emailRef.current = null
    setUser(null)
    setCashbackBalance(0)
    setTotalEarned(0)
    setOrderHistory([])
  }

  const addCashback = (paidAmount) => {
    if (!user || paidAmount <= 0) return 0
    const earned = parseFloat((paidAmount * 0.05).toFixed(2))
    const d = loadData(user.email)
    const updated = {
      ...d,
      balance: parseFloat(((d.balance || 0) + earned).toFixed(2)),
      totalEarned: parseFloat(((d.totalEarned || 0) + earned).toFixed(2)),
    }
    saveData(user.email, updated)
    setCashbackBalance(updated.balance)
    setTotalEarned(updated.totalEarned)
    return earned
  }

  const spendCashback = (amount) => {
    if (!user) return
    const d = loadData(user.email)
    const updated = { ...d, balance: parseFloat(((d.balance || 0) - amount).toFixed(2)) }
    saveData(user.email, updated)
    setCashbackBalance(updated.balance)
  }

  const saveOrder = (orderData) => {
    if (!user) return
    const record = { ...orderData, id: `ORD-${Date.now()}`, date: new Date().toISOString() }
    const d = loadData(user.email)
    const updated = { ...d, orders: [record, ...(d.orders || [])] }
    saveData(user.email, updated)
    setOrderHistory(updated.orders)
  }

  return (
    <CustomerAuthContext.Provider value={{
      user, cashbackBalance, totalEarned, orderHistory,
      signIn, signOutUser, addCashback, spendCashback, saveOrder,
      refresh: () => emailRef.current && refresh(emailRef.current),
    }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}

export const useCustomerAuth = () => useContext(CustomerAuthContext)
