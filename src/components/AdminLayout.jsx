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
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-primary text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-heading font-bold text-xl">KAFFA CUP</h1>
          <p className="text-white/50 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white/80'}`}>
              <span>{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white/80 w-full transition-colors">
            🔑 Çıxış
          </button>
          <NavLink to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white/80 transition-colors mt-1">
            ← Müştəri Saytı
          </NavLink>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  )
}

export default AdminLayout
