import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

const Cart = () => {
  const { cartOpen, setCartOpen, cart, cartTotal, cartCount, removeFromCart, updateQty, setOrderModal } = useApp()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/40 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-heading text-2xl font-bold text-primary">Səbət</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20"><p className="text-5xl mb-4">🛒</p><p>Səbət boşdur</p></div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-4 p-3 bg-mint/50 rounded-xl">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={`https://source.unsplash.com/100x100/?${item.img || item.name}`} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-primary font-bold text-sm">{(item.price * item.qty).toFixed(2)} ₼</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold hover:bg-gray-300">−</button>
                        <span className="w-6 text-center font-semibold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold hover:bg-gray-300">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400 p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-3">
                <div className="flex justify-between text-lg font-bold"><span>Cəmi</span><span className="text-primary">{cartTotal.toFixed(2)} ₼</span></div>
                <motion.button onClick={() => { setOrderModal(true) }}
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-lg hover:bg-primary-dark transition-colors"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Sifariş Ver
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart
