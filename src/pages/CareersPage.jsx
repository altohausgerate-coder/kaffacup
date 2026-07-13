import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CareersSection from '../components/CareersSection'
import { useLang } from '../context/LangContext'

export default function CareersPage() {
  const { t } = useLang()
  const navigate = useNavigate()

  return (
    <motion.div
      className="min-h-screen"
      style={{ background: '#1e3a33' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />

      <div className="pt-28 pb-10 px-4 text-center">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 transition-colors"
          style={{ color: 'rgba(200,161,56,0.75)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kaffa Cup
        </button>
      </div>

      <CareersSection />

      <footer className="py-8 px-4 text-center border-t border-white/10">
        <p className="text-white/30 text-xs">© 2026 Kaffa Cup · Sumqayıt</p>
      </footer>
    </motion.div>
  )
}
