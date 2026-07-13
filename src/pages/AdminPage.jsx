import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'
import { Navigate } from 'react-router-dom'

const sections = [
  { path: '/admin/dashboard', icon: '📊', label: 'Dashboard', desc: 'Ümumi statistika' },
  { path: '/admin/orders',    icon: '🧾', label: 'Sifarişlər', desc: 'Aktiv sifarişlər' },
  { path: '/admin/menu',      icon: '☕', label: 'Menyu', desc: 'Məhsul idarəsi' },
  { path: '/admin/tables',    icon: '🪑', label: 'Masalar', desc: 'Masa planı' },
  { path: '/admin/analytics', icon: '📈', label: 'Analitika', desc: 'Satış hesabatları' },
]

export default function AdminPage() {
  const navigate = useNavigate()
  const { authenticated, logout } = useAdmin()

  if (!authenticated) return <Navigate to="/admin" replace />

  return (
    <div className="min-h-screen" style={{ background: '#f0ede8' }}>
      {/* Header */}
      <div className="px-4 py-5 flex items-center justify-between"
        style={{ background: '#1e3a33' }}>
        <div>
          <p className="text-white font-bold text-lg leading-none">Kaffa Cup</p>
          <p className="text-white/40 text-xs mt-0.5">Admin Paneli</p>
        </div>
        <button onClick={logout}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
          Çıxış
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Bölmələr</p>
        <div className="space-y-3">
          {sections.map(({ path, icon, label, desc }, i) => (
            <motion.button key={path}
              onClick={() => navigate(path)}
              className="w-full bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm text-left"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'rgba(50,83,76,0.08)' }}>
                {icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
