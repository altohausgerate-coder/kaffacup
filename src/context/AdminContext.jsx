import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AdminContext = createContext()

const ADMIN_PASSWORD = 'kaffa2025'

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export function AdminProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [orders, setOrders] = useState(() => load('kc_orders', []))
  const [menuItems, setMenuItems] = useState(() => load('kc_admin_menu', null))
  const [tables, setTables] = useState(() => load('kc_tables', Array.from({ length: 16 }, (_, i) => ({ id: i + 1, capacity: i < 6 ? 4 : i < 12 ? 2 : 6, status: 'available', x: 0, y: 0 }))))
  const [adminReservations, setAdminReservations] = useState(() => load('kc_reservations', []))

  useEffect(() => { localStorage.setItem('kc_orders', JSON.stringify(orders)) }, [orders])
  useEffect(() => { if (menuItems) localStorage.setItem('kc_admin_menu', JSON.stringify(menuItems)) }, [menuItems])
  useEffect(() => { localStorage.setItem('kc_tables', JSON.stringify(tables)) }, [tables])
  useEffect(() => { localStorage.setItem('kc_reservations', JSON.stringify(adminReservations)) }, [adminReservations])

  const login = useCallback((pass) => { if (pass === ADMIN_PASSWORD) { setAuthenticated(true); return true } return false }, [])
  const logout = useCallback(() => setAuthenticated(false), [])

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }, [])

  const addMenuItem = useCallback((item) => {
    setMenuItems(prev => prev ? [...prev, item] : null)
  }, [])

  const updateMenuItem = useCallback((id, data) => {
    setMenuItems(prev => prev ? prev.map(i => i.id === id ? { ...i, ...data } : i) : null)
  }, [])

  const toggleItemAvailability = useCallback((id) => {
    setMenuItems(prev => prev ? prev.map(i => i.id === id ? { ...i, available: !i.available } : i) : null)
  }, [])

  const removeMenuItem = useCallback((id) => {
    setMenuItems(prev => prev ? prev.filter(i => i.id !== id) : null)
  }, [])

  const updateTable = useCallback((id, data) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }, [])

  const addTable = useCallback((table) => {
    setTables(prev => [...prev, { ...table, id: Math.max(...prev.map(t => t.id), 0) + 1 }])
  }, [])

  const removeTable = useCallback((id) => {
    setTables(prev => prev.filter(t => t.id !== id))
  }, [])

  const updateReservation = useCallback((id, data) => {
    setAdminReservations(prev => prev.map(r => r.id === id ? { ...r, ...data } : r))
  }, [])

  const deleteReservation = useCallback((id) => {
    setAdminReservations(prev => prev.filter(r => r.id !== id))
  }, [])

  return (
    <AdminContext.Provider value={{
      authenticated, login, logout,
      orders, updateOrderStatus,
      menuItems, addMenuItem, updateMenuItem, toggleItemAvailability, removeMenuItem,
      tables, updateTable, addTable, removeTable,
      adminReservations, updateReservation, deleteReservation,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
export { ADMIN_PASSWORD }
