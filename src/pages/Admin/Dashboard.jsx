import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/AdminLayout'

const StatCard = ({ label, value, icon, color }) => (
  <motion.div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <div className="flex items-center justify-between mb-3">
      <span className={`text-3xl ${color}`}>{icon}</span>
    </div>
    <p className="text-3xl font-heading font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
  </motion.div>
)

const Dashboard = () => {
  const { orders, adminReservations, tables } = useAdmin()
  const todayOrders = orders.filter(o => o.time?.includes(new Date().toLocaleDateString('az-AZ')) || o.time?.includes(new Date().toISOString().slice(0,10)))
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)
  const pendingReservations = adminReservations.filter(r => r.status === 'pending')
  const activeTables = tables.filter(t => t.status === 'available').length

  return (
    <AdminLayout>
      <motion.h1 className="text-3xl font-heading font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard label="Bugünki Sifarişlər" value={todayOrders.length} icon="📋" color="text-blue-500" />
        <StatCard label="Ümumi Gəlir" value={`${revenue.toFixed(2)} ₼`} icon="💰" color="text-green-500" />
        <StatCard label="Aktiv Masalar" value={`${activeTables}/${tables.length}`} icon="🪑" color="text-accent" />
        <StatCard label="Gözləyən Rezervasiyalar" value={pendingReservations.length} icon="📅" color="text-yellow-500" />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-heading text-xl font-bold text-gray-800 mb-4">Son Sifarişlər</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 text-sm">Hələ sifariş yoxdur</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-400 border-b">
                <th className="pb-3 font-semibold">#</th><th className="pb-3 font-semibold">Müştəri</th>
                <th className="pb-3 font-semibold">Məbləğ</th><th className="pb-3 font-semibold">Status</th><th className="pb-3 font-semibold">Vaxt</th>
              </tr></thead>
              <tbody>
                {orders.slice(0, 10).map(o => (
                  <tr key={o.id} className="border-b border-gray-50">
                    <td className="py-3 font-mono text-xs">{o.id}</td>
                    <td className="py-3">{o.name || '—'}</td>
                    <td className="py-3 font-semibold">{o.total?.toFixed(2)} ₼</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        o.status === 'Yeni' ? 'bg-yellow-100 text-yellow-700' :
                        o.status === 'Hazırlanır' ? 'bg-blue-100 text-blue-700' :
                        o.status === 'Hazır' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>{o.status}</span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Dashboard
