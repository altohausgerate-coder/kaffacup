import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/AdminLayout'

const COLORS = ['#2D5F4E', '#6B3A2A', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6']

const Analytics = () => {
  const { orders, menuItems } = useAdmin()

  const revenueByDay = useMemo(() => {
    const days = {}
    orders.forEach(o => {
      if (!o.time) return
      const day = o.time.split(',')[0] || o.time.slice(0, 10)
      days[day] = (days[day] || 0) + (o.total || 0)
    })
    return Object.entries(days).slice(-7).map(([day, revenue]) => ({ day: day.slice(-5), revenue: Math.round(revenue * 100) / 100 }))
  }, [orders])

  const categorySales = useMemo(() => {
    const cats = {}
    orders.forEach(o => {
      (o.items || []).forEach(item => {
        cats[item.category] = (cats[item.category] || 0) + item.qty
      })
    })
    if (Object.keys(cats).length === 0) return []
    return Object.entries(cats).map(([name, sales]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), sales }))
  }, [orders])

  const statusBreakdown = useMemo(() => {
    const s = { 'Yeni': 0, 'Hazırlanır': 0, 'Hazır': 0, 'Təhvil verildi': 0 }
    orders.forEach(o => { if (s[o.status] !== undefined) s[o.status]++ })
    return Object.entries(s).map(([name, value]) => ({ name, value }))
  }, [orders])

  const topItems = useMemo(() => {
    const items = {}
    orders.forEach(o => {
      (o.items || []).forEach(item => {
        items[item.name] = (items[item.name] || 0) + item.qty
      })
    })
    return Object.entries(items).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, qty]) => ({ name, qty }))
  }, [orders])

  return (
    <AdminLayout>
      <motion.h1 className="text-3xl font-heading font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Analitika</motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-heading font-bold text-gray-700 mb-4">Gündəlik Gəlir (son 7 gün)</h3>
          {revenueByDay.length === 0 ? <p className="text-gray-400 text-sm">Məlumat yoxdur</p> : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueByDay}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={v => `${v} ₼`} />
                <Bar dataKey="revenue" fill="#2D5F4E" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="font-heading font-bold text-gray-700 mb-4">Kateqoriyalar Üzrə Satış</h3>
          {categorySales.length === 0 ? <p className="text-gray-400 text-sm">Məlumat yoxdur</p> : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categorySales} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categorySales.map((e, i) => <Cell key={e.name} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-heading font-bold text-gray-700 mb-4">Sifariş Statusları</h3>
          {statusBreakdown.every(s => s.value === 0) ? <p className="text-gray-400 text-sm">Məlumat yoxdur</p> : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {statusBreakdown.map((e, i) => <Cell key={e.name} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-heading font-bold text-gray-700 mb-4">Ən Çox Satılanlar</h3>
          {topItems.length === 0 ? <p className="text-gray-400 text-sm">Məlumat yoxdur</p> : (
            <div className="space-y-2">
              {topItems.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-400 w-5">{i + 1}.</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full flex items-center justify-end px-2" style={{ width: `${(item.qty / topItems[0].qty) * 100}%` }}>
                      <span className="text-[10px] text-white font-semibold">{item.qty}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 min-w-0 truncate w-40 text-right">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export default Analytics
