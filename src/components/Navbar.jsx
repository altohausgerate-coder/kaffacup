import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import GoatLogo from './GoatLogo'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'
import { allMenuItems } from '../data/menuData'
import { ExpandableTabs } from './ui/expandable-tabs'
import { Search, Briefcase, MessageCircle, ShoppingBag } from 'lucide-react'

const InstagramIcon = ({ size = 18, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FlagAZ = (props) => (
  <svg viewBox="0 0 60 30" {...props}>
    <rect width="60" height="30" fill="#509E2F" />
    <rect width="60" height="20" fill="#EF3340" />
    <rect width="60" height="10" fill="#00B9E4" />
    <circle cx="30" cy="15" r="6" fill="#fff" />
    <circle cx="32" cy="15" r="5" fill="#EF3340" />
    <text x="36.5" y="18.5" fontSize="7" fill="#fff">★</text>
  </svg>
)

const FlagRU = (props) => (
  <svg viewBox="0 0 60 30" {...props}>
    <rect width="60" height="30" fill="#D52B1E" />
    <rect width="60" height="20" fill="#0039A6" />
    <rect width="60" height="10" fill="#fff" />
  </svg>
)

const FlagGB = (props) => (
  <svg viewBox="0 0 60 30" {...props}>
    <rect width="60" height="30" fill="#00247d" />
    <g stroke="#fff" strokeWidth="6"><path d="M0,0 L60,30 M60,0 L0,30" /></g>
    <g stroke="#cf142b" strokeWidth="2"><path d="M0,0 L60,30 M60,0 L0,30" /></g>
    <rect x="24" width="12" height="30" fill="#fff" />
    <rect y="12" width="60" height="6" fill="#fff" />
    <rect x="26" width="8" height="30" fill="#cf142b" />
    <rect y="13" width="60" height="4" fill="#cf142b" />
  </svg>
)

const langOptions = [
  { code: 'az', label: 'AZ', Flag: FlagAZ },
  { code: 'ru', label: 'RU', Flag: FlagRU },
  { code: 'en', label: 'EN', Flag: FlagGB },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const inputRef = useRef(null)
  const { scrollY } = useScroll()
  const { lang, setLang, t } = useLang()
  const { setSelectedProduct } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const categoryLabel = {
    'rolls': t('menu.cat.rolls'),
    'salads': t('menu.cat.salads'),
    'sandwich': t('menu.cat.sandwich'),
    'bowls': t('menu.cat.bowls'),
    'desserts': t('menu.cat.desserts'),
    'coffee-hot': t('menu.cat.coffee-hot'),
    'coffee-cold': t('menu.cat.coffee-cold'),
    'drinks': t('menu.cat.drinks'),
  }

  const navLinks = [
    { label: t('nav.menu'), to: '/menu' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.team'), to: '/team' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  const iconTabs = [
    {
      title: t('nav.search') || 'Axtar',
      icon: Search,
      action: () => setSearchOpen(true),
      resetOnAction: true,
    },
    {
      title: t('nav.careers') || 'Karyera',
      icon: Briefcase,
      action: () => navigate('/careers'),
      resetOnAction: true,
    },
    { type: 'separator' },
    {
      title: 'WhatsApp',
      icon: MessageCircle,
      action: () => window.open('https://wa.me/994517326959', '_blank'),
      resetOnAction: true,
    },
    {
      title: 'Instagram',
      icon: InstagramIcon,
      action: () => window.open('https://www.instagram.com/kaffacupcoffee/', '_blank'),
      resetOnAction: true,
    },
    {
      title: 'Wolt',
      icon: ShoppingBag,
      action: () => window.open('https://wolt.com/en/aze/sumgait/restaurant/kaffa-cup', '_blank'),
      resetOnAction: true,
    },
  ]

  const getDisplayName = (item) =>
    lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name

  const results = query.trim().length >= 2
    ? allMenuItems.filter(item => {
        const q = query.toLowerCase()
        return (
          item.name.toLowerCase().includes(q) ||
          (item.nameRu && item.nameRu.toLowerCase().includes(q)) ||
          (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
          (item.desc && item.desc.toLowerCase().includes(q)) ||
          (item.descRu && item.descRu.toLowerCase().includes(q)) ||
          (item.descEn && item.descEn.toLowerCase().includes(q))
        )
      }).slice(0, 7)
    : []

  const solid = !isHome || scrolled

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return () => unsub()
  }, [scrollY])

  useEffect(() => {
    if (!searchOpen) return
    setTimeout(() => inputRef.current?.focus(), 80)
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) closeSearch()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [searchOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeSearch() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const closeSearch = () => { setSearchOpen(false); setQuery('') }

  const handleResultClick = (item) => {
    closeSearch()
    setSelectedProduct(item)
    navigate(`/menu/${item.category}`)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-6"
      style={{
        height: solid ? 56 : 72,
        backdropFilter: solid ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(16px)' : 'none',
        background: solid ? 'rgba(45,95,78,0.95)' : 'rgba(45,95,78,0)',
        transition: 'background 0.3s, height 0.3s',
      }}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">

        {/* Logo + Nav links grouped left */}
        <div className="flex items-center gap-6 ml-10">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-white tracking-wider text-xl shrink-0">
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`text-sm font-semibold transition-colors ${location.pathname === l.to ? 'text-[rgba(200,161,56,1)]' : 'text-white hover:text-[rgba(200,161,56,1)]'}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div ref={searchRef}
              className="absolute left-0 right-0 top-0 bottom-0 flex items-center px-6 z-10"
              style={{ background: 'rgba(30,58,51,0.98)', backdropFilter: 'blur(16px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="w-full max-w-2xl mx-auto relative">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={t('nav.search.placeholder')}
                    className="flex-1 bg-transparent text-white placeholder-white/35 text-sm outline-none"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="text-white/40 hover:text-white transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {results.length > 0 && (
                    <motion.div
                      className="absolute left-0 right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl"
                      style={{ background: '#1e3a33', border: '1px solid rgba(255,255,255,0.1)' }}
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {results.map((item) => (
                        <button key={item.id} onClick={() => handleResultClick(item)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0">
                          <img src={item.img} alt={getDisplayName(item)}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                            onError={e => { e.target.style.display = 'none' }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{getDisplayName(item)}</p>
                            <p className="text-white/40 text-xs truncate">{categoryLabel[item.category] || item.category}</p>
                          </div>
                          <span className="text-sm font-bold shrink-0" style={{ color: 'rgba(200,161,56,0.9)' }}>
                            {item.price.toFixed(2)} ₼
                          </span>
                        </button>
                      ))}
                      <div className="px-4 py-2.5 text-xs text-white/30 border-t border-white/5">
                        {results.length} {t('nav.search.found')}
                      </div>
                    </motion.div>
                  )}
                  {query.trim().length >= 2 && results.length === 0 && (
                    <motion.div
                      className="absolute left-0 right-0 top-full mt-2 rounded-xl px-4 py-4 text-center"
                      style={{ background: '#1e3a33', border: '1px solid rgba(255,255,255,0.1)' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/40 text-sm">"{query}" {t('nav.search.notfound')}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={closeSearch} className="ml-4 text-white/60 hover:text-white transition-colors shrink-0 text-sm font-medium">
                {t('nav.search.close')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop icons — ExpandableTabs + dil seçici */}
        <div className="hidden md:flex items-center gap-3">
          <ExpandableTabs tabs={iconTabs} activeColor="text-white" />

          <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
            {langOptions.map(o => (
              <button key={o.code} onClick={() => setLang(o.code)} aria-label={o.label}
                className={`w-8 h-8 flex items-center justify-center rounded-full overflow-hidden transition-opacity ${lang === o.code ? 'bg-white/20 opacity-100 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'}`}
              >
                <o.Flag className="w-5 h-3.5 rounded-[2px]" />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: search + burger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setSearchOpen(true)} className="text-white" aria-label="Axtar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
            <motion.span className="block w-6 h-0.5 bg-white rounded" animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span className="block w-6 h-0.5 bg-white rounded" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="block w-6 h-0.5 bg-white rounded" animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {navLinks.map((l, i) => (
              <motion.div key={l.to}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.07 }}>
                <Link to={l.to} onClick={() => setMenuOpen(false)}
                  className="text-2xl font-heading font-semibold text-white/90">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ delay: navLinks.length * 0.07 }}>
              <Link to="/careers" onClick={() => setMenuOpen(false)}
                className="text-2xl font-heading font-semibold flex items-center gap-2"
                style={{ color: 'rgba(200,161,56,0.9)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                </svg>
                {t('nav.careers')}
              </Link>
            </motion.div>
            <div className="flex items-center gap-2 mt-6 bg-white/10 rounded-full p-1">
              {langOptions.map(o => (
                <button key={o.code} onClick={() => { setLang(o.code); setMenuOpen(false) }} aria-label={o.label}
                  className={`w-11 h-11 flex items-center justify-center rounded-full overflow-hidden transition-opacity ${lang === o.code ? 'bg-primary opacity-100 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'}`}
                >
                  <o.Flag className="w-6 h-4 rounded-[2px]" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
