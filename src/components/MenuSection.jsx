import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MenuCard from './MenuCard'
import {
  menuCategories, breakfastItems, croissantItems, rollsItems, saladItems,
  sandwichItems, bowlItems, dessertItems, classicCoffee, alternativeCoffee,
  icedCoffee, lemonadeItems, smoothieItems, iceTeaItems,
  cocktailItems, mocktailItems, signatureDrinkItems,
  milkshakeItems, extraBarItems, teaItems,
} from '../data/menuData'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LangContext'

const allCategorySections = [
  { id: 'breakfast', items: breakfastItems, title: 'Səhər Yeməyi', subtitle: 'Günə dadlı başlanğıc', emoji: '🍳' },
  { id: 'croissant', items: croissantItems, title: 'Kruassan', subtitle: 'Xırtıldayan ləzzət', emoji: '🥐' },
  { id: 'rolls', items: rollsItems, title: 'Rollar', subtitle: 'Dadla dolu rulonlar', emoji: '🌯' },
  { id: 'salads', items: saladItems, title: 'Salatlar', subtitle: 'Təzə və təravətli', emoji: '🥗' },
  { id: 'sandwich', items: sandwichItems, title: 'Sendviçlər', subtitle: 'Doyumlu ləzzətlər', emoji: '🥖' },
  { id: 'bowls', items: bowlItems, title: 'Kəsalar', subtitle: 'Bol dad, böyük porsiya', emoji: '🫙' },
  { id: 'desserts', items: dessertItems, title: 'Desertlər', subtitle: 'Şirin sonluq', emoji: '🍰' },
  {
    id: 'coffee-hot',
    title: 'İsti Qəhvə',
    subtitle: 'Klassik və alternativ dadlar',
    emoji: '☕',
    subsections: [
      { title: 'Klassik İsti Qəhvələr', items: classicCoffee },
      { title: 'Alternativ Qəhvə', items: alternativeCoffee },
    ],
  },
  { id: 'coffee-cold', items: icedCoffee, title: 'Soyuq Qəhvə', subtitle: 'Soyuq qəhvə ləzzətləri', emoji: '🧊' },
  {
    id: 'drinks',
    title: 'İçkilər',
    subtitle: 'Geniş içki menyusu',
    emoji: '🥤',
    subsections: [
      { title: 'Smuzilər', items: smoothieItems },
      { title: 'Limonad Klassik', items: lemonadeItems },
      { title: 'Buzlu Çay', items: iceTeaItems },
      { title: 'Alkogolsiz Kokteyllər', items: cocktailItems },
      { title: 'Mokteyllər', items: mocktailItems },
      { title: 'Siqnature İçkilər', items: signatureDrinkItems },
      { title: 'Milkskeyklər', items: milkshakeItems },
      { title: 'Extra Bar', items: extraBarItems, renderAs: 'list' },
      { title: 'Çay', items: teaItems },
    ],
  },
]

const allItems = allCategorySections.flatMap(s => s.items || s.subsections?.flatMap(sub => sub.items) || [])

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { placeOrder, cart, cartTotal, cartCount, setCartOpen } = useApp()
  const [form, setForm] = useState({ name: '', phone: '', table: '' })
  const { t } = useLang()

  const buildWhatsAppMessage = () => {
    const lines = [
      '🛒 Yeni Sifariş - Kaffa Cup',
      `👤 Ad: ${form.name}`,
      `📞 Telefon: ${form.phone}`,
      `🪑 Masa: ${form.table}`,
      '─────────────',
      ...cart.map(item => `${item.name} x${item.qty} - ${(item.price * item.qty).toFixed(2)} ₼`),
      '─────────────',
      `💰 Cəmi: ${cartTotal.toFixed(2)} ₼`,
      '💳 Ödəniş: Kartla',
    ]
    return lines.join('\n')
  }

  const handleSubmit = () => {
    const msg = encodeURIComponent(buildWhatsAppMessage())
    window.open(`https://wa.me/994517326959?text=${msg}`, '_blank')
    setShowOrderModal(false)
  }

  const activeSection = activeTab === 'all' ? null : allCategorySections.find(s => s.id === activeTab)

  const renderItems = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)}
    </div>
  )

  return (
    <section className="py-20 px-4 bg-mint" id="menu">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <motion.h2 className="text-4xl md:text-5xl font-heading font-bold text-primary"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('menu.title')}
          </motion.h2>
          <motion.div className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3" style={{ maxWidth: 80 }}
            initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>

        <div className="sticky top-0 z-30 bg-mint/90 backdrop-blur-md pb-4 pt-2 mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {menuCategories.map(cat => (
              <motion.button key={cat.id} onClick={() => setActiveTab(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === cat.id ? 'text-white' : 'text-gray-600 bg-white/80 hover:bg-white border border-gray-200'}`}
                whileTap={{ scale: 0.95 }}>
                {activeTab === cat.id && <motion.span layoutId="menuTab" className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="relative z-10">{cat.icon && <span className="mr-1.5">{cat.icon}</span>}{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.3 }}>
            {activeTab === 'all' ? (
              renderItems(allItems)
            ) : activeSection && (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">
                    {activeSection.emoji && <span className="mr-2">{activeSection.emoji}</span>}{activeSection.title}
                  </h3>
                  {activeSection.subtitle && <p className="text-xs text-gray-400 mt-1">{activeSection.subtitle}</p>}
                </div>
                {activeSection.subsections ? (
                  activeSection.subsections.map((sub, si) => (
                    <div key={si} className="mb-10">
                        <div className="text-center mb-5">
                          <h4 className="text-lg md:text-xl font-heading font-semibold text-primary/80 border-b border-primary/10 inline-block pb-1 px-4">
                            {sub.title}
                          </h4>
                        </div>
                        {sub.renderAs === 'list' ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                            {sub.items.map((item, i) => (
                              <motion.div key={item.id}
                                className="bg-white/80 rounded-xl p-3 flex items-center justify-between gap-2 border border-primary/5"
                                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
                                  {item.desc && <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>}
                                </div>
                                <span className="text-xs font-bold text-primary shrink-0">{item.price.toFixed(1)} ₼</span>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          renderItems(sub.items)
                        )}
                    </div>
                  ))
                ) : (
                  renderItems(activeSection.items || [])
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showOrderModal && (
          <>
            <motion.div className="fixed inset-0 bg-black/50 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOrderModal(false)} />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl" initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}>
                <h3 className="font-heading text-2xl font-bold text-primary mb-6">Sifariş Forması</h3>
                <div className="space-y-4">
                  <input placeholder="Ad" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none font-body" />
                  <input placeholder="Telefon" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none font-body" />
                  <input placeholder="Masa nömrəsi" value={form.table} onChange={e => setForm({...form, table: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none font-body" />
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800 font-medium flex items-center gap-2">
                    <span>💳</span>
                    <span>Ödəniş yalnız kartla həyata keçirilir</span>
                  </div>
                  <div className="bg-mint/50 rounded-xl p-4">
                    <p className="text-sm font-semibold mb-2">Sifariş:</p>
                    {cart.map(item => <p key={item.id} className="text-sm text-gray-600 flex justify-between"><span>{item.name} × {item.qty}</span><span>{(item.price * item.qty).toFixed(2)} ₼</span></p>)}
                    <p className="text-base font-bold text-primary mt-2 flex justify-between"><span>Cəmi</span><span>{cartTotal.toFixed(2)} ₼</span></p>
                  </div>
                  <motion.button onClick={handleSubmit}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-lg hover:bg-primary-dark transition-colors"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Sifarişi Təsdiqlə
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button onClick={() => setCartOpen(true)}
            className="fixed bottom-6 left-6 z-40 bg-accent text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <span className="font-bold text-sm">{cartCount} • {cartTotal.toFixed(2)} ₼</span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MenuSection
