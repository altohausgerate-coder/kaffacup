import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuCategories, allMenuItems } from '../data/menuData'

const CASHIER_PIN = '1234'
const LOG_KEY = 'kc_kassir_log'

function loadLog() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]') } catch { return [] }
}
function saveLog(log) { localStorage.setItem(LOG_KEY, JSON.stringify(log)) }

function broadcast(data) {
  try { const bc = new BroadcastChannel('kaffa-cashback'); bc.postMessage(data); bc.close() } catch {}
}

// ── PIN Screen ───────────────────────────────────────────────────────────────
function PinScreen({ onAuth }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handle = (val) => {
    const next = (pin + val).slice(0, 4)
    setPin(next)
    setError(false)
    if (next.length === 4) {
      if (next === CASHIER_PIN) { onAuth() }
      else {
        setError(true)
        setTimeout(() => { setPin(''); setError(false) }, 600)
      }
    }
  }

  const dots = Array.from({ length: 4 }, (_, i) => i < pin.length)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1e3a33, #32534c)' }}>
      <div className="w-full max-w-xs text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(200,161,56,0.15)', border: '1px solid rgba(200,161,56,0.3)' }}>
          <span className="text-2xl">🧾</span>
        </div>
        <h1 className="text-white font-bold text-2xl mb-1">Kassir Paneli</h1>
        <p className="text-white/40 text-sm mb-10">PIN kodunu daxil edin</p>
        <div className="flex justify-center gap-4 mb-10">
          {dots.map((filled, i) => (
            <motion.div key={i} animate={{ scale: filled ? 1.15 : 1 }}
              className="w-4 h-4 rounded-full border-2 transition-colors"
              style={{
                borderColor: error ? '#f87171' : 'rgba(200,161,56,0.6)',
                background: filled ? (error ? '#f87171' : 'rgba(200,161,56,1)') : 'transparent'
              }} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => (
            <motion.button key={i}
              onClick={() => {
                if (k === '⌫') setPin(p => p.slice(0, -1))
                else if (k !== '') handle(String(k))
              }}
              disabled={k === ''}
              className="h-14 rounded-2xl text-xl font-semibold text-white disabled:opacity-0"
              style={{ background: k === '' ? 'transparent' : 'rgba(255,255,255,0.08)' }}
              whileHover={k !== '' ? { scale: 1.05 } : {}}
              whileTap={k !== '' ? { scale: 0.93 } : {}}>
              {k}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

const PROMO_REGEX = /^KAFFA-[A-Z0-9]{5}$/

// ── Menu Step ────────────────────────────────────────────────────────────────
function MenuStep({ customerName, promoCode, onApply, onBack, initialCart = {}, editMode = false }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState(initialCart)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const catScrollRef = useRef(null)

  const cats = menuCategories.filter(c => c.id !== 'all')
  const searchTrimmed = search.trim().toLowerCase()
  const visibleItems = searchTrimmed
    ? allMenuItems.filter(i => i.name.toLowerCase().includes(searchTrimmed))
    : activeCategory === 'all'
      ? allMenuItems
      : allMenuItems.filter(i => i.category === activeCategory)

  const qty = (id) => cart[id] || 0
  const add = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const remove = (id) => setCart(c => {
    const next = { ...c, [id]: (c[id] || 1) - 1 }
    if (next[id] <= 0) delete next[id]
    return next
  })

  const cartItems = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ ...allMenuItems.find(i => i.id === id), qty: q }))
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  const handleApply = () => {
    if (cartCount === 0) { setError('Ən azı bir məhsul seçin'); return }
    onApply(
      cartItems.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      parseFloat(cartTotal.toFixed(2))
    )
  }

  return (
    <div className="flex flex-col" style={{ height: '100dvh' }}>
      {/* Top bar */}
      <div className="shrink-0 px-4 py-3 flex items-center gap-3 border-b border-gray-100 bg-white">
        <button onClick={onBack}
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(50,83,76,0.08)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#32534c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{customerName}</p>
          <p className="text-xs font-mono text-gray-400">{promoCode}</p>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-lg text-green-700 bg-green-50">
          ✓ Doğrulandı
        </div>
      </div>

      {/* Search */}
      <div className="shrink-0 px-4 py-2.5 border-b border-gray-100 bg-white">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveCategory('all') }}
            placeholder="Məhsul axtar..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-yellow-400 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div ref={catScrollRef}
        className="shrink-0 flex gap-2 px-4 py-2.5 overflow-x-auto border-b border-gray-100 bg-white"
        style={{ scrollbarWidth: 'none', display: search ? 'none' : 'flex' }}>
        <button
          onClick={() => setActiveCategory('all')}
          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          style={{
            background: activeCategory === 'all' ? '#32534c' : 'rgba(50,83,76,0.07)',
            color: activeCategory === 'all' ? '#fff' : '#32534c',
          }}>
          Hamısı
        </button>
        {cats.map(c => (
          <button key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{
              background: activeCategory === c.id ? '#32534c' : 'rgba(50,83,76,0.07)',
              color: activeCategory === c.id ? '#fff' : '#32534c',
            }}>
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="divide-y divide-gray-100 bg-white">
          {visibleItems.map(item => {
            const q = qty(item.id)
            return (
              <div key={item.id} className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs font-bold mt-0.5" style={{ color: 'rgba(200,161,56,1)' }}>
                    {item.price.toFixed(2)} ₼
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {q > 0 ? (
                    <>
                      <button onClick={() => remove(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: '#32534c' }}>−</button>
                      <span className="w-5 text-center text-sm font-bold text-gray-700">{q}</span>
                      <button onClick={() => add(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: '#32534c' }}>+</button>
                    </>
                  ) : (
                    <button onClick={() => add(item.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-colors"
                      style={{ borderColor: '#32534c', color: '#32534c', background: 'transparent' }}>+</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="h-24" />
      </div>

      {/* Cart footer */}
      <div className="shrink-0 px-4 py-3 border-t border-gray-100 bg-white">
        {error && (
          <p className="text-red-500 text-xs mb-2 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            {cartCount > 0 ? (
              <>
                <p className="text-xs text-gray-500">{cartCount} məhsul seçildi</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-gray-800">{cartTotal.toFixed(2)} ₼</p>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(200,161,56,1)' }}>
                    +{(cartTotal * 0.05).toFixed(2)} ₼ cashback
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400">Məhsul seçilməyib</p>
            )}
          </div>
          <motion.button onClick={handleApply}
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: cartCount > 0 ? (editMode ? '#32534c' : 'rgba(200,161,56,1)') : '#d1d5db' }}
            whileTap={cartCount > 0 ? { scale: 0.97 } : {}}>
            {editMode ? 'Yadda Saxla' : 'Tətbiq Et'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ── Cashier Main ─────────────────────────────────────────────────────────────
function CashierMain({ onLogout }) {
  const [promoCode, setPromoCode] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [step, setStep] = useState('input') // input | menu | edit | success
  const [earnedAmount, setEarnedAmount] = useState(0)
  const [lastTotal, setLastTotal] = useState(0)
  const [lastItems, setLastItems] = useState([])
  const [error, setError] = useState('')
  const [log, setLog] = useState(loadLog)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [editRecord, setEditRecord] = useState(null)

  const handleVerify = () => {
    const cleanCode = promoCode.trim().toUpperCase()
    const cleanName = customerName.trim()
    if (!cleanName) { setError('Ad-soyad daxil edin'); return }
    if (!PROMO_REGEX.test(cleanCode)) { setError('Promo kodu düzgün deyil (KAFFA-XXXXX)'); return }
    setError('')
    setStep('menu')
  }

  const handleApply = (items, total) => {
    const earned = parseFloat((total * 0.05).toFixed(2))
    setEarnedAmount(earned)
    setLastTotal(total)
    setLastItems(items)

    const record = {
      id: `K${Date.now()}`,
      name: customerName.trim(),
      promoCode: promoCode.trim().toUpperCase(),
      items,
      purchaseAmount: total,
      cashbackAmount: earned,
      date: new Date().toISOString(),
    }
    const updated = [record, ...log].slice(0, 100)
    saveLog(updated)
    setLog(updated)
    broadcast({ type: 'new' })
    setStep('success')
  }

  const handleEditSave = (items, total) => {
    const earned = parseFloat((total * 0.05).toFixed(2))
    const updated = log.map(r =>
      r.id === editRecord.id
        ? { ...r, items, purchaseAmount: total, cashbackAmount: earned }
        : r
    )
    saveLog(updated)
    setLog(updated)
    broadcast({ type: 'edit', id: editRecord.id, items, purchaseAmount: total, cashbackAmount: earned })
    setLastItems(items)
    setLastTotal(total)
    setEarnedAmount(earned)
    setEditRecord(null)
    setStep('success')
  }

  const openEdit = (record) => {
    const initialCart = {}
    record.items?.forEach(i => { initialCart[i.id] = i.qty })
    setEditRecord(record)
    setStep('edit')
  }

  const reset = () => {
    setPromoCode(''); setCustomerName('')
    setEarnedAmount(0); setLastTotal(0); setLastItems([])
    setError(''); setEditRecord(null)
    setStep('input')
  }

  const handleDelete = (record) => {
    const newLog = log.filter(r => r.id !== record.id)
    saveLog(newLog)
    setLog(newLog)
    broadcast({ type: 'delete', id: record.id, cashbackAmount: record.cashbackAmount })
    setConfirmDeleteId(null)
  }

  // Customer history search (for input step)
  const searchName = customerName.trim().toLowerCase()
  const customerHistory = searchName.length >= 2
    ? log.filter(r => r.name.toLowerCase().includes(searchName))
    : []
  const customerTotalCashback = customerHistory.reduce((s, r) => s + r.cashbackAmount, 0)

  const [logFilter, setLogFilter] = useState('today')
  const [logSearch, setLogSearch] = useState('')

  const todayLog = log.filter(r =>
    new Date(r.date).toDateString() === new Date().toDateString()
  )
  const logSearchTrimmed = logSearch.trim().toLowerCase()
  const visibleLog = (logFilter === 'today' ? todayLog : log).filter(r =>
    logSearchTrimmed ? r.name.toLowerCase().includes(logSearchTrimmed) : true
  )

  if (step === 'menu') {
    return (
      <MenuStep
        customerName={customerName.trim()}
        promoCode={promoCode.trim().toUpperCase()}
        onApply={handleApply}
        onBack={() => setStep('input')}
      />
    )
  }

  if (step === 'edit' && editRecord) {
    const initialCart = {}
    editRecord.items?.forEach(i => { initialCart[i.id] = i.qty })
    return (
      <MenuStep
        customerName={editRecord.name}
        promoCode={editRecord.promoCode}
        onApply={handleEditSave}
        onBack={() => { setEditRecord(null); setStep('input') }}
        initialCart={initialCart}
        editMode
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0ede8' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-4 flex items-center justify-between"
        style={{ background: '#1e3a33' }}>
        <div className="flex items-center gap-3">
          <span className="text-xl">🧾</span>
          <div>
            <p className="text-white font-bold text-sm leading-none">Kassir Paneli</p>
            <p className="text-white/40 text-xs mt-0.5">Kaffa Cup</p>
          </div>
        </div>
        <button onClick={onLogout}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
          Çıxış
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{ background: 'rgba(200,161,56,0.12)' }}>💳</div>
            <p className="font-semibold text-gray-800 text-sm">
              {step === 'input' ? 'Müştərini Yoxla' : 'Cashback Tətbiq Edildi'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div key="input" className="px-5 py-5 space-y-4"
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                    Müştərinin Adı Soyadı
                  </label>
                  <input
                    value={customerName}
                    onChange={e => { setCustomerName(e.target.value); setError('') }}
                    placeholder="Ad Soyad"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-yellow-400 transition-colors"
                    autoFocus
                  />
                  <AnimatePresence>
                    {customerHistory.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="mt-2 rounded-xl border border-gray-100 overflow-hidden"
                        style={{ background: 'rgba(50,83,76,0.04)' }}>
                        <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">👤</span>
                            <p className="text-xs font-bold text-gray-700">Müştəri tapıldı</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-400">{customerHistory.length} əməliyyat</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(200,161,56,0.15)', color: 'rgba(200,161,56,1)' }}>
                              {customerTotalCashback.toFixed(2)} ₼ cashback
                            </span>
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                          {customerHistory.slice(0, 10).map(r => (
                            <div key={r.id} className="px-4 py-2 flex items-center gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-700">{r.name}</p>
                                <p className="text-xs text-gray-400">
                                  {new Date(r.date).toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                  {' · '}{new Date(r.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                                  {r.items?.length > 0 && (
                                    <span className="ml-1 text-gray-300">· {r.items.length} məhsul</span>
                                  )}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs text-gray-600">{r.purchaseAmount.toFixed(2)} ₼</p>
                                <p className="text-xs font-bold" style={{ color: 'rgba(200,161,56,1)' }}>
                                  +{r.cashbackAmount.toFixed(2)} ₼
                                </p>
                              </div>
                              <button
                                onClick={() => openEdit(r)}
                                className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                                style={{ background: 'rgba(50,83,76,0.08)', color: '#32534c' }}
                                title="Sifarişi redaktə et">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                    Promo Kodu
                  </label>
                  <input
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value.toUpperCase()); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleVerify()}
                    placeholder="KAFFA-XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono font-semibold text-gray-800 outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <span>⚠</span> {error}
                  </p>
                )}
                <motion.button onClick={handleVerify}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#32534c' }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Menyuya Keç →
                </motion.button>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" className="px-5 py-6"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center mb-5">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(34,197,94,0.12)' }}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                    <span className="text-3xl">✓</span>
                  </motion.div>
                  <p className="font-bold text-gray-800 text-lg mb-1">Cashback Tətbiq Edildi!</p>
                  <p className="text-gray-500 text-sm">{customerName} adlı müştəriyə</p>
                </div>

                {/* Items summary */}
                <div className="rounded-xl overflow-hidden border border-gray-100 mb-4">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alınan məhsullar</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {lastItems.map((item, i) => (
                      <div key={i} className="px-4 py-2 flex justify-between items-center">
                        <p className="text-sm text-gray-700">{item.name}
                          {item.qty > 1 && <span className="text-gray-400 text-xs ml-1">×{item.qty}</span>}
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                          {(item.price * item.qty).toFixed(2)} ₼
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-sm font-bold text-gray-700">Cəmi</p>
                    <p className="text-sm font-bold text-gray-700">{lastTotal.toFixed(2)} ₼</p>
                  </div>
                </div>

                <div className="text-center rounded-xl px-6 py-3 mb-5"
                  style={{ background: 'rgba(200,161,56,0.1)' }}>
                  <span className="font-bold text-2xl" style={{ color: 'rgba(200,161,56,1)' }}>
                    +{earnedAmount.toFixed(2)} ₼
                  </span>
                  <span className="text-gray-500 text-sm ml-2">cashback əlavə edildi</span>
                </div>

                <motion.button onClick={reset}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#32534c' }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Yeni Müştəri
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
              <div className="flex rounded-xl overflow-hidden border border-gray-200 text-xs font-semibold shrink-0">
                <button onClick={() => setLogFilter('today')}
                  className="px-3 py-1.5 transition-colors"
                  style={{ background: logFilter === 'today' ? '#32534c' : 'transparent', color: logFilter === 'today' ? '#fff' : '#6b7280' }}>
                  Bu gün
                </button>
                <button onClick={() => setLogFilter('all')}
                  className="px-3 py-1.5 transition-colors border-l border-gray-200"
                  style={{ background: logFilter === 'all' ? '#32534c' : 'transparent', color: logFilter === 'all' ? '#fff' : '#6b7280' }}>
                  Hamısı
                </button>
              </div>
              <div className="relative flex-1">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" width="12" height="12"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input value={logSearch} onChange={e => setLogSearch(e.target.value)}
                  placeholder="Ada görə axtar..."
                  className="w-full pl-7 pr-7 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 outline-none focus:border-yellow-400 transition-colors" />
                {logSearch && (
                  <button onClick={() => setLogSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: 'rgba(200,161,56,0.12)', color: 'rgba(200,161,56,1)' }}>
                {visibleLog.length}
              </span>
            </div>

            {visibleLog.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">Nəticə tapılmadı</p>
            ) : (
            <div className="divide-y divide-gray-50">
              <AnimatePresence initial={false}>
                {visibleLog.map(r => (
                  <motion.div key={r.id}
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.22 }}>
                    {/* Row header */}
                    <div className="px-5 py-3.5 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                          className="text-left w-full">
                          <p className="text-sm font-semibold text-gray-700 truncate">{r.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {logFilter === 'all'
                              ? new Date(r.date).toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ' · '
                              : ''}
                            {new Date(r.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                            {r.items?.length > 0 && (
                              <span className="ml-1.5 text-gray-300">· {r.items.length} məhsul</span>
                            )}
                          </p>
                        </button>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-gray-700">{r.purchaseAmount.toFixed(2)} ₼</p>
                        <p className="text-xs font-semibold" style={{ color: 'rgba(200,161,56,1)' }}>
                          +{r.cashbackAmount.toFixed(2)} ₼
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5">
                        <button onClick={() => openEdit(r)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg"
                          style={{ background: 'rgba(50,83,76,0.08)', color: '#32534c' }}
                          title="Redaktə et">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        {confirmDeleteId === r.id ? (
                          <div className="flex items-center gap-1.5">
                            <motion.button
                              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                              onClick={() => handleDelete(r)}
                              className="text-xs font-bold px-2.5 py-1.5 rounded-lg text-white"
                              style={{ background: '#ef4444' }}>
                              Sil
                            </motion.button>
                            <button onClick={() => setConfirmDeleteId(null)}
                              className="text-xs font-medium px-2 py-1.5 rounded-lg text-gray-400 border border-gray-200">
                              Xeyr
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmDeleteId(r.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg"
                            style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable items */}
                    <AnimatePresence>
                      {expandedId === r.id && r.items?.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden">
                          <div className="mx-5 mb-3 rounded-xl overflow-hidden border border-gray-100">
                            {r.items.map((item, idx) => (
                              <div key={idx}
                                className="px-4 py-2 flex justify-between text-xs border-b border-gray-50 last:border-0"
                                style={{ background: 'rgba(50,83,76,0.03)' }}>
                                <span className="text-gray-600">
                                  {item.name}
                                  {item.qty > 1 && <span className="text-gray-400 ml-1">×{item.qty}</span>}
                                </span>
                                <span className="font-semibold text-gray-700">
                                  {(item.price * item.qty).toFixed(2)} ₼
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            )}
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center"
              style={{ background: '#fafaf9' }}>
              <p className="text-xs text-gray-500">
                {logFilter === 'today' ? 'Bu gün cashback' : 'Göstərilənlərin cashbacki'}
              </p>
              <p className="text-sm font-bold" style={{ color: 'rgba(200,161,56,1)' }}>
                {visibleLog.reduce((s, r) => s + r.cashbackAmount, 0).toFixed(2)} ₼
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CashierPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('kc_kassir_auth') === '1')

  const handleAuth = () => {
    sessionStorage.setItem('kc_kassir_auth', '1')
    setAuthed(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('kc_kassir_auth')
    setAuthed(false)
  }

  return authed ? <CashierMain onLogout={handleLogout} /> : <PinScreen onAuth={handleAuth} />
}
