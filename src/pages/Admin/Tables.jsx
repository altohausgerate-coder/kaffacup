import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/AdminLayout'

const Tables = () => {
  const { tables, updateTable } = useAdmin()
  const tableLayouts = [
    { seats: 2, label: '2 nəfərlik' },
    { seats: 4, label: '4 nəfərlik' },
    { seats: 6, label: '6 nəfərlik' },
  ]

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold text-gray-800 mb-8">Masalar</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {tableLayouts.map(t => (
          <div key={t.seats} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-heading font-bold text-gray-700 mb-3">{t.label}</h3>
            <div className="flex flex-wrap gap-2">
              {tables.filter(tbl => tbl.capacity === t.seats).map(tbl => (
                <button key={tbl.id} onClick={() => updateTable(tbl.id, { ...tbl, status: tbl.status === 'available' ? 'occupied' : 'available' })}
                  className={`w-16 h-16 rounded-xl font-bold text-sm border-2 transition-all ${
                    tbl.status === 'available' ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' :
                    tbl.status === 'occupied' ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' :
                    'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100'
                  }`}>
                  {tbl.id.replace('masa-','').toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-400 border-b">
            <th className="p-4 font-semibold">Masa</th><th className="p-4 font-semibold">Tutum</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Dəyiş</th>
          </tr></thead>
          <tbody>
            {tables.map(tbl => (
              <tr key={tbl.id} className="border-b border-gray-50">
                <td className="p-4 font-mono text-xs font-semibold">{tbl.id.replace('masa-','').toUpperCase()}</td>
                <td className="p-4">{tbl.capacity} nəfər</td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    tbl.status === 'available' ? 'bg-green-100 text-green-700' :
                    tbl.status === 'occupied' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{tbl.status === 'available' ? 'Boş' : tbl.status === 'occupied' ? 'Dolu' : 'Rezervə'}</span>
                </td>
                <td className="p-4">
                  <select value={tbl.status} onChange={e => updateTable(tbl.id, { ...tbl, status: e.target.value })}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold outline-none">
                    <option value="available">Boş</option><option value="occupied">Dolu</option><option value="reserved">Rezervə</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default Tables
