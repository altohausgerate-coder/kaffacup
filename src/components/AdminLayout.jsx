import { NavLink, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/orders', label: 'Sifarişlər', icon: '📋' },
  { to: '/admin/menu', label: 'Menyu', icon: '🍽️' },
  { to: '/admin/tables', label: 'Masalar', icon: '🪑' },
  { to: '/admin/analytics', label: 'Analitika', icon: '📈' },
]

const AdminLayout = ({ children }) => {
  const { logout } = useAdmin()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin') }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-primary text-white flex flex-col md:min-h-screen md:flex-shrink-0">
        <div className="p-4 md:p-6 border-b border-white/10">
          <h1 className="font-heading font-bold text-xl">KAFFA CUP</h1>
          <p className="text-white/50 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex gap-2 overflow-x-auto p-3 md:flex-1 md:flex-col md:space-y-1 md:overflow-visible md:p-4">
          {links.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `flex shrink-0 items-center gap-2 md:gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white/80'}`}>
              <span>{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="grid grid-cols-2 gap-2 p-3 border-t border-white/10 md:block md:p-4">
          <button onClick={handleLogout} className="flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white/80 w-full transition-colors">
            🔑 Çıxış
          </button>
          <NavLink to="/"
            className="flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white/80 transition-colors md:mt-1">
            ← Müştəri Saytı
          </NavLink>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  )
}

export default AdminLayout
