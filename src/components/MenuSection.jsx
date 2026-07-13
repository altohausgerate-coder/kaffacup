import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MenuCard from './MenuCard'
import MenuGroupTabs from './MenuGroupTabs'
import { allMenuDisplayItems, getSectionsForTab } from '../data/menuDisplay'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LangContext'

const formatPrice = (item) => {
  if (item.priceK) return `S:${item.priceS} ₼ / M:${item.priceM} ₼ / K:${item.priceK} ₼`
  if (item.priceS) return `S:${item.priceS} ₼ / M:${item.priceM || item.price} ₼`
  return `${Number(item.price).toFixed(2)} ₼`
}

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { cart, cartTotal, cartCount, setCartOpen, setSelectedProduct } = useApp()
  const { lang, t } = useLang()
  const sections = getSectionsForTab(activeTab)

  useEffect(() => {
    const imgs = allMenuDisplayItems.slice(0, 6).filter(i => i.img?.startsWith('http')).map(i => i.img)
    const controllers = imgs.map(src => { const img = new Image(); img.src = src; return img })
    return () => controllers.forEach(img => { img.src = '' })
  }, [])

  const renderItems = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <MenuCard key={item.id} item={item} index={i} onSelect={() => setSelectedProduct(item)} />
      ))}
    </div>
  )

  const renderList = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
      {items.map((item) => {
        const listName = lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name
        const listDesc = lang === 'ru' ? (item.descRu || item.desc) : lang === 'en' ? (item.descEn || item.desc) : item.desc
        return (
          <button
            key={item.id}
            type="button"
            className="bg-white/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-primary/5 text-left hover:border-primary/20 transition-colors"
            onClick={() => setSelectedProduct(item)}
          >
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-gray-700 truncate">{listName}</span>
              {listDesc && <span className="block text-[10px] text-gray-400 truncate">{listDesc}</span>}
            </span>
            <span className="text-xs font-bold text-primary shrink-0 leading-snug">{formatPrice(item)}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <section className="py-14 sm:py-20 px-4 bg-mint" id="menu">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
          >
            {t('menu.title')}
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm mt-2 font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {t('menu.subtitle')}
          </motion.p>
          <motion.div
            className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3"
            style={{ maxWidth: 80 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="sticky top-[56px] z-30 mb-8 -mx-4 bg-white/95 pt-2 pb-0 shadow-sm backdrop-blur border-y border-primary/10">
          <MenuGroupTabs activeTab={activeTab} onChange={setActiveTab} layoutId="homeMenuTab" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {sections.map((section) => (
              <div key={section.id} className="mb-10 sm:mb-12">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-800">
                    {section.emoji && <span className="mr-2">{section.emoji}</span>}
                    {t(section.titleKey)}
                  </h3>
                </div>
                {section.renderAs === 'list' ? renderList(section.items) : renderItems(section.items)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            type="button"
            onClick={() => setCartOpen(true)}
            className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-40 bg-accent text-white px-5 py-3 rounded-full shadow-xl flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            <span className="font-bold text-sm">{cartCount} · {cartTotal.toFixed(2)} ₼</span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MenuSection
