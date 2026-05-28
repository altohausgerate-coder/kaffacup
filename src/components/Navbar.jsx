import { useState, useEffect } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import GoatLogo from './GoatLogo'
import { useLang } from '../context/LangContext'

const langOptions = [
  { code: 'az', label: 'AZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { lang, setLang, t } = useLang()

  const links = [
    { label: t('nav.menu'), href: '#menu' },
    { label: t('nav.gallery'), href: '#gallery' },
    { label: t('nav.reservation'), href: '#reservation' },
    { label: t('nav.team'), href: '#team' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return () => unsub()
  }, [scrollY])

  const handleClick = (e, href) => {
    e.preventDefault(); setMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-6"
      style={{
        height: scrolled ? 56 : 72,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        background: scrolled ? 'rgba(45,95,78,0.92)' : 'rgba(45,95,78,0)'
      }}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-heading font-bold text-white tracking-wider text-xl">
          <GoatLogo size={40} animate={false} /> KAFFA CUP
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)}
              className="relative px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >{l.label}</a>
          ))}
          <div className="ml-3 flex items-center gap-1 bg-white/10 rounded-full p-0.5">
            {langOptions.map(o => (
              <button key={o.code} onClick={() => setLang(o.code)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${lang === o.code ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}
              >{o.label}</button>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
            <motion.span className="block w-6 h-0.5 bg-white rounded" animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span className="block w-6 h-0.5 bg-white rounded" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="block w-6 h-0.5 bg-white rounded" animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)}
                className="text-2xl font-heading font-semibold text-white/90"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.07 }}
              >{l.label}</motion.a>
            ))}
            <div className="flex items-center gap-2 mt-6 bg-white/10 rounded-full p-1">
              {langOptions.map(o => (
                <button key={o.code} onClick={() => { setLang(o.code); setMenuOpen(false) }}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === o.code ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}
                >{o.label}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
