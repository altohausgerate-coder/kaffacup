import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

const ProductModal = ({ item, onClose }) => {
  const { lang, t } = useLang()

  const displayName = lang === 'ru' ? (item.nameRu || item.name) : lang === 'en' ? (item.nameEn || item.name) : item.name
  const displayDesc = lang === 'ru' ? (item.descRu || item.desc) : lang === 'en' ? (item.descEn || item.desc) : item.desc

  const displayPrice = item.priceK
    ? `S:${item.priceS}₼ / M:${item.priceM}₼ / K:${item.priceK}₼`
    : item.priceS
      ? `S:${item.priceS}₼ / M:${item.priceM || item.price}₼`
      : `${item.price} ₼`

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="relative">
            <div className="h-[280px] overflow-hidden bg-gray-100 rounded-t-3xl">
              {item.img ? (
                <img src={item.img} alt={displayName} className="w-full h-full object-cover" style={{ objectPosition: item.imgPosition || 'center' }} loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #2D5F4E, #4a8a72)' }}>
                  ☕
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            {item.popular && (
              <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {t('menu.popular')}
              </span>
            )}
          </div>

          <div className="p-6">
            <h3 className="font-heading font-bold text-2xl text-gray-800 mb-2">{displayName}</h3>
            {displayDesc && <p className="text-sm text-gray-400 leading-relaxed mb-4">{displayDesc}</p>}

            <div className="bg-mint rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 font-medium mb-1">{t('menu.price')}</p>
              <p className="text-xl font-bold text-primary">{displayPrice}</p>
            </div>

            <motion.button
              onClick={onClose}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-lg hover:bg-primary-dark transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Bağla
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default ProductModal
