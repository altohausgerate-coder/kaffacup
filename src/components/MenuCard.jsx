import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

const getFallbackImage = (item) => {
  const cat = item.category || ''
  if (cat === 'rolls') return '/images/menu/roll-kaffa.jpg'
  if (cat === 'salads') return '/images/menu/salad-meat.png'
  if (cat === 'sandwich') return '/images/menu/sandwich-kaffa.png'
  if (cat === 'bowls') return '/images/menu/bowl-toyuq.jpg'
  if (cat === 'desserts') return '/images/menu/dessert-waffle-shokoladli.png'
  if (cat === 'coffee-hot') return '/images/menu/coffee-latte.png?v=5'
  if (cat === 'coffee-cold') return '/images/menu/kaffa-iced-coffee.jpg?v=2'
  if (cat === 'drinks') return '/images/menu/drinks/lemonade-strawberry.png?v=6'
  if (cat === 'specials') return '/images/menu/specials/special-combo-1.png'
  return '/images/qarisiq-yemek-asli.jpg'
}

const MenuCard = ({ item, index = 0, onSelect }) => {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const { lang, t } = useLang()

  const displayName = lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name
  const displayDesc = lang === 'ru' ? (item.descRu || item.desc) : lang === 'en' ? (item.descEn || item.desc) : item.desc

  const hasImage = item.img && (item.img.startsWith('http') || item.img.startsWith('/'))
  const imageSrc = hasImage && !errored ? item.img : getFallbackImage(item)
  const displayPrice = item.priceK ? `S:${item.priceS}₼ / M:${item.priceM}₼ / K:${item.priceK}₼` : item.priceS ? `S:${item.priceS}₼ / M:${item.priceM || item.price}₼` : `${item.price} ₼`

  const handleError = (e) => {
    setErrored(true)
  }

  useEffect(() => {
    if (!hasImage || loaded || errored) return undefined
    const timer = window.setTimeout(() => setErrored(true), 2500)
    return () => window.clearTimeout(timer)
  }, [hasImage, loaded, errored])

  return (
    <motion.div
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-primary/10 shadow-card card-glow cursor-pointer flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      onClick={() => onSelect?.(item)}
    >
      <div className="relative h-[170px] sm:h-[200px] overflow-hidden bg-gray-100">
        <img src={imageSrc} alt={displayName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ objectPosition: item.imgPosition || 'center' }}
          onLoad={() => setLoaded(true)} onError={handleError}
          loading="eager"
          fetchPriority="high"
          decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {t('menu.popular')}
          </span>
        )}
      </div>
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-base sm:text-lg text-gray-800 leading-tight mb-1">{displayName}</h3>
        {displayDesc && <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">{displayDesc}</p>}
        <div className="flex items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-[13px] sm:text-sm font-bold text-primary leading-snug">{displayPrice}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default MenuCard
