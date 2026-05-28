import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/AdminLayout'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const Reservations = () => {
  const { adminReservations, updateReservation } = useAdmin()

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold text-gray-800 mb-8">Rezervasiyalar</h1>

      {adminReservations.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <p className="text-5xl mb-4">📅</p>
          <p>Hələ rezervasiya yoxdur</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-400 border-b">
                <th className="p-4 font-semibold">Müştəri</th><th className="p-4 font-semibold">Telefon</th>
                <th className="p-4 font-semibold">Masa</th><th className="p-4 font-semibold">Tarix</th>
                <th className="p-4 font-semibold">Vaxt</th><th className="p-4 font-semibold">Nəfər</th>
                <th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Əməliyyat</th>
              </tr></thead>
              <tbody>
                {adminReservations.map(r => (
                  <tr key={r.id} className="border-b border-gray-50">
                    <td className="p-4 font-semibold">{r.name}</td>
                    <td className="p-4 text-gray-500">{r.phone}</td>
                    <td className="p-4 font-mono text-xs">{r.table?.replace('masa-','').toUpperCase()}</td>
                    <td className="p-4 text-gray-500">{r.date}</td>
                    <td className="p-4 text-gray-500">{r.time}</td>
                    <td className="p-4">{r.guests}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[r.status]}`}>
                        {r.status === 'pending' ? 'Gözləyir' : r.status === 'confirmed' ? 'Təsdiqləndi' : 'Ləğv olundu'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {r.status === 'pending' && (
                          <>
                            <button onClick={() => updateReservation(r.id, 'confirmed')}
                              className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-white">Təsdiq et</button>
                            <button onClick={() => updateReservation(r.id, 'cancelled')}
                              className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-100 text-red-700">Ləğv et</button>
                          </>
                        )}
                        {r.status !== 'pending' && (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Reservations
