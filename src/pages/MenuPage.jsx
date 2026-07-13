import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MenuCard from '../components/MenuCard'
import MenuGroupTabs from '../components/MenuGroupTabs'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LangContext'
import { getSectionsForTab, menuGroupTabs } from '../data/menuDisplay'

const formatPrice = (item) => {
  if (item.priceK) return `S:${item.priceS} ₼ / M:${item.priceM} ₼ / K:${item.priceK} ₼`
  if (item.priceS) return `S:${item.priceS} ₼ / M:${item.priceM || item.price} ₼`
  return `${Number(item.price).toFixed(2)} ₼`
}

export default function MenuPage({ initialTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const { lang, t } = useLang()
  const { setSelectedProduct } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    if (location.state?.openProduct) {
      setSelectedProduct(location.state.openProduct)
    }
  }, [location.state, setSelectedProduct])

  const sections = useMemo(() => getSectionsForTab(activeTab), [activeTab])

  const renderItems = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <MenuCard key={item.id} item={item} index={i} onSelect={() => setSelectedProduct(item)} />
      ))}
    </div>
  )

  const renderSpecials = (items) => (
    <div>
      <div className="mb-5 text-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
        <p className="text-sm font-bold text-primary">{t('menu.specials.banner')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-card card-glow cursor-pointer"
            onClick={() => setSelectedProduct(item)}
          >
            <div className="w-full" style={{ aspectRatio: '1470 / 1070' }}>
              <img
                src={item.img}
                alt={lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name}
                className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderList = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item) => {
        const name = lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name
        const desc = lang === 'ru' ? (item.descRu || item.desc) : lang === 'en' ? (item.descEn || item.desc) : item.desc
        return (
          <button
            type="button"
            key={item.id}
            className="bg-white rounded-xl border border-primary/10 px-4 py-3 text-left flex items-start justify-between gap-4 hover:border-primary/30 hover:shadow-sm transition-all"
            onClick={() => setSelectedProduct(item)}
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-gray-800 truncate">{name}</span>
              {desc && <span className="block text-xs text-gray-400 truncate mt-0.5">{desc}</span>}
            </span>
            <span className="text-sm font-bold text-primary shrink-0">{formatPrice(item)}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <motion.div
      className="min-h-screen bg-[#faf8f4]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />

      <header className="pt-28 pb-8 px-4 text-center bg-gradient-to-b from-[#f5f2ee] to-[#faf8f4]">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 transition-colors hover:text-primary"
          style={{ color: 'rgba(200,161,56,0.85)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Kaffa Cup
        </button>
        <motion.h1
          className="font-display text-primary mb-2"
          style={{ fontSize: 'clamp(36px, 7vw, 72px)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {t('menu.title')}
        </motion.h1>
        <motion.p
          className="text-gray-500 text-sm font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
        >
          {t('menu.subtitle')}
        </motion.p>
        <motion.div
          className="h-px bg-primary/20 max-w-[80px] mx-auto mt-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.22, duration: 0.6 }}
        />
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="sticky top-[56px] z-30 -mx-4 bg-white/95 px-4 pt-2 pb-0 shadow-sm backdrop-blur border-y border-primary/10">
          <MenuGroupTabs activeTab={activeTab} onChange={setActiveTab} layoutId="menuPageTab" />
        </div>

        <div className="flex items-center justify-between gap-3 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
            {t(menuGroupTabs.find(tab => tab.id === activeTab)?.labelKey || 'menu.cat.all')}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {sections.length > 0 ? (
              sections.map((section) => (
                <section key={section.id} className="mb-12 scroll-mt-32">
                  <div className="relative text-center mb-5 border-b border-primary/10 pb-3">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                      {section.emoji && <span className="mr-2">{section.emoji}</span>}
                      {t(section.titleKey)}
                    </h2>
                  </div>
                  {section.renderAs === 'list'
                    ? renderList(section.items)
                    : section.renderAs === 'specials'
                      ? renderSpecials(section.items)
                      : renderItems(section.items)}
                </section>
              ))
            ) : (
              <div className="bg-white border border-primary/10 rounded-2xl p-8 text-center text-gray-500">
                {t('menu.empty')}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-8 px-4 text-center border-t border-gray-100 bg-white">
        <p className="text-gray-400 text-xs">© 2026 Kaffa Cup · Sumqayıt</p>
      </footer>
    </motion.div>
  )
}
