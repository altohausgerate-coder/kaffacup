import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/AdminLayout'

const statuses = ['Yeni', 'Hazırlanır', 'Hazır', 'Təhvil verildi']
const statusColors = { 'Yeni': 'bg-yellow-100 text-yellow-700', 'Hazırlanır': 'bg-blue-100 text-blue-700', 'Hazır': 'bg-green-100 text-green-700', 'Təhvil verildi': 'bg-gray-100 text-gray-500' }

const Orders = () => {
  const { orders, updateOrderStatus } = useAdmin()
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <motion.h1 className="text-3xl font-heading font-bold text-gray-800"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Sifarişlər</motion.h1>
        <div className="flex gap-2">
          {['all', ...statuses].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s === 'all' ? 'Hamısı' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><p className="text-5xl mb-4">📋</p><p>Sifariş yoxdur</p></div>
        ) : filtered.map((order, i) => (
          <motion.div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <div className="p-5 flex items-center justify-between cursor-pointer flex-wrap gap-3"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gray-400">{order.id}</span>
                <span className="font-semibold">{order.name || 'Anonim'}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-primary">{order.total?.toFixed(2)} ₼</span>
                <span className="text-xs text-gray-400">{order.time}</span>
                <svg className={`transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <AnimatePresence>
              {expanded === order.id && (
                <motion.div className="border-t px-5 py-4 bg-gray-50/50 space-y-3"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="text-sm space-y-1">
                    {order.items?.map(item => (
                      <div key={item.id} className="flex justify-between text-gray-600">
                        <span>{item.name} × {item.qty}</span>
                        <span>{(item.price * item.qty).toFixed(2)} ₼</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-primary pt-2 border-t">
                      <span>Cəmi</span><span>{order.total?.toFixed(2)} ₼</span>
                    </div>
                  </div>
                  {order.phone && <p className="text-xs text-gray-400">📞 {order.phone}</p>}
                  {order.type && <p className="text-xs text-gray-400">📍 {order.type === 'takeaway' ? 'Paket' : `Masa ${order.table}`}</p>}
                  <div className="flex gap-2 pt-2">
                    {statuses.map(s => (
                      <button key={s} onClick={() => updateOrderStatus(order.id, s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${order.status === s ? 'bg-primary text-white' : 'bg-white text-gray-500 border hover:bg-gray-50'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  )
}

export default Orders
