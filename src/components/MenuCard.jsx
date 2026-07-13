import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { getMenuImageSrc } from '../utils/menuImages'

const MenuCard = ({ item, priority = false, onSelect }) => {
  const [errored, setErrored] = useState(false)
  const { lang, t } = useLang()

  const displayName = lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name
  const displayDesc = lang === 'ru' ? (item.descRu || item.desc) : lang === 'en' ? (item.descEn || item.desc) : item.desc

  const imageSrc = getMenuImageSrc(item, errored)
  const displayPrice = item.priceK ? `S:${item.priceS}₼ / M:${item.priceM}₼ / K:${item.priceK}₼` : item.priceS ? `S:${item.priceS}₼ / M:${item.priceM || item.price}₼` : `${item.price} ₼`

  const handleError = () => {
    if (!errored) setErrored(true)
  }

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
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
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
