import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'
import { useLang } from '../context/LangContext'

const sectionIcons = [
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
]

const sectionKeys = [
  { title: 'privacy.s1.title', text: 'privacy.s1.text' },
  { title: 'privacy.s2.title', text: 'privacy.s2.text' },
  { title: 'privacy.s3.title', text: 'privacy.s3.text' },
  { title: 'privacy.s4.title', text: 'privacy.s4.text' },
  { title: 'privacy.s5.title', text: 'privacy.s5.text' },
  { title: 'privacy.s6.title', text: 'privacy.s6.text' },
]

export default function PrivacyPolicy() {
  const { t } = useLang()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: '#32534c' }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #c8a138 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ color: 'rgba(200,161,56,0.85)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {t('privacy.label')}
          </motion.p>
          <motion.h1 className="font-display text-white text-4xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
            {t('privacy.title')}
          </motion.h1>
          <motion.p className="text-white/50 text-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            {t('privacy.updated')}
          </motion.p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <motion.div
          className="rounded-2xl p-8 mb-10 border-l-4"
          style={{ background: '#f0f5f2', borderColor: '#32534c' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-gray-700 leading-relaxed font-body text-base">
            {t('privacy.intro')}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sectionKeys.map((s, i) => (
            <motion.div key={i}
              className="rounded-2xl p-7 border border-gray-100 hover:border-primary/20 transition-colors"
              style={{ background: '#fff', boxShadow: '0 2px 16px rgba(50,83,76,0.06)' }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.07, type: 'spring', stiffness: 160 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#f0f5f2', color: '#32534c' }}>
                  {sectionIcons[i]}
                </div>
                <h2 className="font-heading font-bold text-lg text-primary">{t(s.title)}</h2>
              </div>
              <p className="text-gray-600 font-body text-sm leading-relaxed">{t(s.text)}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div className="mt-10 rounded-2xl p-8 text-center"
          style={{ background: '#32534c' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <p className="text-white/80 font-body text-sm leading-relaxed max-w-2xl mx-auto mb-4">
            {t('privacy.closing')}
          </p>
          <p className="font-heading font-semibold text-white text-base">{t('privacy.board')}</p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all"
              style={{ background: 'rgba(200,161,56,0.2)', color: 'rgba(200,161,56,1)', border: '1px solid rgba(200,161,56,0.35)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {t('privacy.back')}
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
      <Cart />
    </div>
  )
}
