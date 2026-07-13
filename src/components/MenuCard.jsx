import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

const getEmoji = (item) => {
  const cat = item.category || ''
  if (cat === 'breakfast') return '🍳'
  if (cat === 'coffee-hot' || cat === 'coffee-cold') return '☕'
  if (cat === 'rolls') return '🌯'
  if (cat === 'salads') return '🥗'
  if (cat === 'sandwich') return '🥖'
  if (cat === 'bowls') return '🫙'
  if (cat === 'desserts') return '🍰'
  if (cat === 'drinks') return '🥤'
  return '🍽️'
}

const MenuCard = ({ item, index = 0, onSelect }) => {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const { lang, t } = useLang()
  const imgRef = useRef(null)
  const placeholderRef = useRef(null)

  const displayName = lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name
  const displayDesc = lang === 'ru' ? (item.descRu || item.desc) : lang === 'en' ? (item.descEn || item.desc) : item.desc

  const hasImage = item.img && (item.img.startsWith('http') || item.img.startsWith('/'))
  const displayPrice = item.priceK ? `S:${item.priceS}₼ / M:${item.priceM}₼ / K:${item.priceK}₼` : item.priceS ? `S:${item.priceS}₼ / M:${item.priceM || item.price}₼` : `${item.price} ₼`

  const handleError = (e) => {
    setErrored(true)
    if (e.target) e.target.style.display = 'none'
    if (placeholderRef.current) placeholderRef.current.style.display = 'flex'
  }

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-card card-glow cursor-pointer flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      onClick={() => onSelect?.(item)}
    >
      <div className="relative h-[200px] overflow-hidden bg-gray-100">
        {!loaded && !errored && <div className="absolute inset-0 shimmer z-10" />}
        {hasImage ? (
          <>
            <img ref={imgRef} src={item.img} alt={displayName}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loaded && !errored ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition: item.imgPosition || 'center' }}
              onLoad={() => setLoaded(true)} onError={handleError} loading="lazy" />
            <div ref={placeholderRef} style={{ display: 'none', width: '100%', height: '100%', background: item.category === 'rolls' ? '#3d1f0d' : 'linear-gradient(135deg, #2D5F4E, #4a8a72)', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
              {getEmoji(item)}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #2D5F4E, #4a8a72)' }}>
            {getEmoji(item)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {t('menu.popular')}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-lg text-gray-800 leading-tight mb-1">{displayName}</h3>
        {displayDesc && <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">{displayDesc}</p>}
        <div className="flex items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-sm font-bold text-primary">{displayPrice}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default MenuCard
