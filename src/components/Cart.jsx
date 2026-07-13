import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useCustomerAuth } from '../context/CustomerAuthContext'

const Cart = () => {
  const { cartOpen, setCartOpen, cart, cartTotal, cartCount, removeFromCart, updateQty, clearCart, placeOrder } = useApp()
  const { user, cashbackBalance, signIn, addCashback, spendCashback, saveOrder } = useCustomerAuth()

  const [step, setStep] = useState('cart')
  const [form, setForm] = useState({ name: '', phone: '', table: '' })
  const [useCashback, setUseCashback] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [showLoginInput, setShowLoginInput] = useState(false)

  const cashbackToUse = useCashback ? parseFloat(Math.min(cashbackBalance, cartTotal).toFixed(2)) : 0
  const finalTotal = parseFloat((cartTotal - cashbackToUse).toFixed(2))
  const willEarn = parseFloat((finalTotal * 0.05).toFixed(2))

  const handleClose = () => {
    setCartOpen(false)
    setStep('cart')
    setForm({ name: '', phone: '', table: '' })
    setUseCashback(false)
  }

  const handleOrder = async () => {
    if (!form.name.trim() || !form.phone.trim()) return
    setSending(true)

    const itemLines = cart.map(i => `• ${i.name} × ${i.qty} — ${(i.price * i.qty).toFixed(2)} ₼`).join('\n')
    const lines = [
      '🛒 *Yeni Sifariş — Kaffa Cup*',
      '',
      `👤 Ad: ${form.name}`,
      `📞 Telefon: ${form.phone}`,
      form.table.trim() ? `🪑 Masa: ${form.table}` : null,
      '',
      '📋 *Məhsullar:*',
      itemLines,
      '',
      `💰 Cəmi: ${cartTotal.toFixed(2)} ₼`,
      cashbackToUse > 0 ? `💳 Cashback endirim: −${cashbackToUse.toFixed(2)} ₼` : null,
      cashbackToUse > 0 ? `✅ Ödəniləcək: ${finalTotal.toFixed(2)} ₼` : null,
      user && willEarn > 0 ? `🎁 Qazanılacaq cashback: +${willEarn.toFixed(2)} ₼` : null,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/994517326959?text=${encodeURIComponent(lines)}`, '_blank')

    if (user) {
      if (cashbackToUse > 0) await spendCashback(cashbackToUse)
      if (willEarn > 0) await addCashback(finalTotal)
      await saveOrder({
        items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
        total: cartTotal,
        cashbackUsed: cashbackToUse,
        paid: finalTotal,
        cashbackEarned: willEarn,
      })
    }

    placeOrder(form)
    setSent(true)
    setSending(false)

    setTimeout(() => {
      setSent(false)
      setStep('cart')
      setForm({ name: '', phone: '', table: '' })
      setUseCashback(false)
      setCartOpen(false)
    }, 2500)
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} />

          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {step === 'order' && (
                  <button onClick={() => setStep('cart')} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </button>
                )}
                <h2 className="font-heading text-xl font-bold text-primary">
                  {step === 'cart' ? 'Səbət' : 'Sifariş'}
                </h2>
                {step === 'cart' && cartCount > 0 && (
                  <span className="text-xs text-white font-bold px-2 py-0.5 rounded-full" style={{ background: '#32534c' }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Cart step */}
            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {cart.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                      <p className="text-5xl mb-4">🛒</p>
                      <p className="font-medium">Səbət boşdur</p>
                      <p className="text-sm mt-1 text-gray-300">Menyu bölməsindən məhsul əlavə edin</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence>
                        {cart.map(item => (
                          <motion.div key={item.id} layout
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                              {item.img ? (
                                <img src={item.img} alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={e => { e.target.style.display = 'none' }} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl bg-primary/10">☕</div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-800 leading-tight">{item.name}</p>
                              <p className="text-xs text-primary font-bold mt-0.5">{item.price.toFixed(2)} ₼/ədəd</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateQty(item.id, item.qty - 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                                style={{ background: '#f0ede9', color: '#32534c' }}>−</button>
                              <span className="w-6 text-center font-bold text-sm">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                                style={{ background: '#32534c', color: 'white' }}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-400 transition-colors p-1 ml-1">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                    {/* Cashback info */}
                    {user ? (
                      <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, #f0f9f5, #e8f4ef)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-primary/70 uppercase tracking-wide">Cashback Balansı</span>
                          <span className="font-bold text-primary">{cashbackBalance.toFixed(2)} ₼</span>
                        </div>
                        {cashbackBalance > 0 && (
                          <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <div onClick={() => setUseCashback(!useCashback)}
                              className={`w-10 h-5 rounded-full relative transition-colors ${useCashback ? 'bg-primary' : 'bg-gray-200'}`}>
                              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${useCashback ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </div>
                            <span className="text-xs text-gray-600">
                              {cashbackToUse > 0 ? `−${cashbackToUse.toFixed(2)} ₼ istifadə et` : 'Cashback istifadə et'}
                            </span>
                          </label>
                        )}
                        <p className="text-xs text-primary/60 mt-1.5">
                          Bu sifarişdən <span className="font-semibold text-primary">+{willEarn.toFixed(2)} ₼</span> qazanacaqsınız
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed p-3.5 space-y-2.5"
                        style={{ borderColor: 'rgba(50,83,76,0.2)', background: '#fafaf9' }}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">🎁</span>
                          <div>
                            <p className="text-xs font-semibold text-gray-700">Hər sifarişdən 5% cashback</p>
                            <p className="text-xs text-gray-400">E-mail ilə daxil ol, bonusunu yığ</p>
                          </div>
                        </div>
                        {showLoginInput ? (
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={loginEmail}
                              onChange={e => setLoginEmail(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' && loginEmail.includes('@')) {
                                  signIn(loginEmail); setShowLoginInput(false); setLoginEmail('')
                                }
                              }}
                              placeholder="e-mail@example.com"
                              className="flex-1 px-3 py-2 rounded-lg text-xs border border-gray-200 outline-none focus:border-primary"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                if (loginEmail.includes('@')) {
                                  signIn(loginEmail); setShowLoginInput(false); setLoginEmail('')
                                }
                              }}
                              className="px-3 py-2 rounded-lg text-xs font-bold text-white"
                              style={{ background: '#32534c' }}>
                              Daxil ol
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setShowLoginInput(true)}
                            className="w-full text-xs font-semibold py-2 rounded-lg transition-colors text-white"
                            style={{ background: 'rgba(50,83,76,0.85)' }}>
                            Daxil ol →
                          </button>
                        )}
                      </div>
                    )}

                    {/* Total */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Ara cəm</span><span>{cartTotal.toFixed(2)} ₼</span>
                      </div>
                      {cashbackToUse > 0 && (
                        <div className="flex justify-between text-sm text-primary">
                          <span>Cashback endirimi</span><span>−{cashbackToUse.toFixed(2)} ₼</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold text-gray-800 pt-1 border-t border-gray-100">
                        <span>Cəmi</span>
                        <span style={{ color: '#32534c' }}>{finalTotal.toFixed(2)} ₼</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setStep('order')}
                      className="w-full text-white font-bold py-3.5 rounded-xl text-base transition-colors"
                      style={{ background: '#32534c' }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      Sifarişi Təsdiqlə →
                    </motion.button>
                  </div>
                )}
              </>
            )}

            {/* Order step */}
            {step === 'order' && (
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent"
                    className="flex-1 flex flex-col items-center justify-center px-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'rgba(50,83,76,0.1)' }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#32534c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                    <h3 className="font-heading text-2xl text-primary mb-2">Sifariş Göndərildi!</h3>
                    <p className="text-gray-400 text-sm">
                      WhatsApp üzərindən tezliklə sizinlə əlaqə saxlayacağıq
                    </p>
                    {user && willEarn > 0 && (
                      <div className="mt-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: '#f0f9f5', color: '#32534c' }}>
                        🎁 +{willEarn.toFixed(2)} ₼ cashback balansınıza əlavə edildi
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="form"
                    className="flex-1 flex flex-col"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22 }}>
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                      {/* Order summary */}
                      <div className="rounded-xl p-4 bg-gray-50 space-y-1.5">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Sifariş xülasəsi</p>
                        {cart.map(i => (
                          <div key={i.id} className="flex justify-between text-sm text-gray-600">
                            <span>{i.name} × {i.qty}</span>
                            <span className="font-medium">{(i.price * i.qty).toFixed(2)} ₼</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t border-gray-200">
                          <span>{cashbackToUse > 0 ? 'Ödəniləcək' : 'Cəmi'}</span>
                          <span style={{ color: '#32534c' }}>{finalTotal.toFixed(2)} ₼</span>
                        </div>
                        {user && willEarn > 0 && (
                          <p className="text-xs pt-1" style={{ color: '#32534c' }}>
                            🎁 Bu sifarişdən +{willEarn.toFixed(2)} ₼ cashback qazanacaqsınız
                          </p>
                        )}
                      </div>

                      {/* Form fields */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Ad Soyad *</label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Adınızı daxil edin"
                            className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 outline-none transition-colors focus:border-primary"
                            style={{ '--tw-ring-color': '#32534c' }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Telefon *</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="+994 XX XXX XX XX"
                            className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 outline-none transition-colors focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Masa nömrəsi (isteğe bağlı)</label>
                          <input
                            type="text"
                            value={form.table}
                            onChange={e => setForm(f => ({ ...f, table: e.target.value }))}
                            placeholder="Masa №"
                            className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 outline-none transition-colors focus:border-primary"
                          />
                        </div>
                      </div>

                      {!user && (
                        <div className="rounded-xl p-3" style={{ background: '#fef9ec' }}>
                          <p className="text-xs text-amber-700 mb-2">💡 Hər sifarişdən 5% cashback qazan — e-mail ilə daxil ol:</p>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={loginEmail}
                              onChange={e => setLoginEmail(e.target.value)}
                              placeholder="e-mail@example.com"
                              className="flex-1 px-3 py-2 rounded-lg text-xs border border-amber-200 outline-none bg-white"
                            />
                            <button
                              onClick={() => {
                                if (loginEmail.includes('@')) {
                                  signIn(loginEmail); setLoginEmail('')
                                }
                              }}
                              className="px-3 py-2 rounded-lg text-xs font-bold text-white shrink-0"
                              style={{ background: 'rgba(200,161,56,0.9)' }}>
                              Daxil ol
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 px-6 py-5">
                      <motion.button
                        onClick={handleOrder}
                        disabled={!form.name.trim() || !form.phone.trim() || sending}
                        className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-xl text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: sending ? '#32534c99' : '#25D366' }}
                        whileHover={{ scale: !sending ? 1.02 : 1 }}
                        whileTap={{ scale: !sending ? 0.98 : 1 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        {sending ? 'Göndərilir...' : 'WhatsApp ilə Sifariş Ver'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart
