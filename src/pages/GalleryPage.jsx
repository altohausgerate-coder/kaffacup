import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ExteriorPhotos } from '../components/Footer'
import { useLang } from '../context/LangContext'

export default function GalleryPage() {
  const { t } = useLang()
  const navigate = useNavigate()

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />

      <div className="pt-28 pb-10 px-4 text-center" style={{ background: 'linear-gradient(to bottom, #f5f2ee, #fff)' }}>
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 transition-colors hover:text-primary"
          style={{ color: 'rgba(200,161,56,0.85)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kaffa Cup
        </button>
        <motion.h1 className="font-display text-primary mb-2" style={{ fontSize: 'clamp(36px, 7vw, 72px)' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          {t('gallery.title')}
        </motion.h1>
        <motion.p className="text-gray-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          {t('gallery.subtitle')}
        </motion.p>
        <motion.div className="h-px bg-primary/20 max-w-[80px] mx-auto mt-4"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.6 }} />
      </div>

      <ExteriorPhotos />

      <footer className="py-8 px-4 text-center border-t border-gray-100">
        <p className="text-gray-400 text-xs">© 2026 Kaffa Cup · Sumqayıt</p>
      </footer>
    </motion.div>
  )
}
