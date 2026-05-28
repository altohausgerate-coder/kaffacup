import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

const MenuCard = ({ item, index = 0 }) => {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const { addToCart } = useApp()
  const imgRef = useRef(null)
  const placeholderRef = useRef(null)

  const hasImage = item.img && item.img.startsWith('http')
  const displayPrice = item.priceK ? `S:${item.priceS}₼ / M:${item.priceM}₼ / K:${item.priceK}₼` : item.priceS ? `S:${item.priceS}₼ / M:${item.priceM || item.price}₼` : `${item.price} ₼`

  const handleError = (e) => {
    setErrored(true)
    if (e.target) e.target.style.display = 'none'
    if (placeholderRef.current) placeholderRef.current.style.display = 'flex'
  }

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-card hover:shadow-card-hover cursor-default flex flex-col"
      initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-[200px] overflow-hidden bg-gray-100">
        {!loaded && !errored && <div className="absolute inset-0 shimmer z-10" />}
        {hasImage ? (
          <>
            <img ref={imgRef} src={item.img} alt={item.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loaded && !errored ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)} onError={handleError} loading="lazy" />
            <div ref={placeholderRef} style={{ display: 'none', width: '100%', height: '100%', background: 'linear-gradient(135deg, #2D5F4E, #4a8a72)', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
              {item.name.includes('Omlet') || item.name.includes('Yumurta') || item.name.includes('Qlazok') ? '🍳' :
               item.name.includes('Qəhvə') || item.name.includes('Espresso') || item.name.includes('Latte') || item.name.includes('Kappuçino') || item.name.includes('Mokka') || item.name.includes('Makkiato') || item.name.includes('Karamel') || item.name.includes('Cortado') || item.name.includes('Flat') || item.name.includes('Raf') || item.name.includes('Affogato') || item.name.includes('Chai') || item.name.includes('Spanish') || item.name.includes('Irish') || item.name.includes('Coffee') || item.name.includes('Hot Choco') || item.name.includes('Matça') ? '☕' : '🍽️'}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #2D5F4E, #4a8a72)' }}>
            {item.name.includes('Omlet') || item.name.includes('Yumurta') || item.name.includes('Qlazok') ? '🍳' :
             item.name.includes('Qəhvə') || item.name.includes('Espresso') || item.name.includes('Latte') || item.name.includes('Kappuçino') || item.name.includes('Mokka') || item.name.includes('Makkiato') || item.name.includes('Karamel') || item.name.includes('Cortado') || item.name.includes('Flat') || item.name.includes('Raf') || item.name.includes('Affogato') || item.name.includes('Chai') || item.name.includes('Spanish') || item.name.includes('Irish') || item.name.includes('Coffee') || item.name.includes('Hot Choco') || item.name.includes('Matça') ? '☕' : '🍽️'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
          {displayPrice}
        </span>
        {item.popular && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Ən çox sifariş edilən
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-lg text-gray-800 leading-tight mb-1">{item.name}</h3>
        {item.desc && <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">{item.desc}</p>}
        <motion.button onClick={() => addToCart(item)}
          className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          whileTap={{ scale: 0.95 }}>
          Səbətə Əlavə Et
        </motion.button>
      </div>
    </motion.div>
  )
}

export default MenuCard
