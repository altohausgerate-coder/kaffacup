import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCustomerAuth } from '../context/CustomerAuthContext'
import { generatePromoCode } from '../utils/promoCode'

function downloadPromoAsPDF(name, promoCode) {
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html>
<html lang="az">
<head>
<meta charset="UTF-8"/>
<title>Kaffa Cup – Promo Kodu</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f8f7f5;display:flex;align-items:center;justify-content:center;min-height:100vh}
  .card{width:420px;background:linear-gradient(135deg,#32534c,#1e3a33);border-radius:24px;padding:44px 40px;color:#fff;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,0.28);position:relative;overflow:hidden}
  .card::before{content:'';position:absolute;top:-50px;right:-50px;width:180px;height:180px;background:rgba(200,161,56,0.1);border-radius:50%}
  .card::after{content:'';position:absolute;bottom:-40px;left:-40px;width:140px;height:140px;background:rgba(200,161,56,0.07);border-radius:50%}
  .logo{font-size:12px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:rgba(200,161,56,0.75);margin-bottom:30px}
  .greeting{font-size:13px;color:rgba(255,255,255,0.55);margin-bottom:4px}
  .name{font-size:24px;font-weight:700;color:#fff;margin-bottom:28px}
  .badge{display:inline-block;background:rgba(200,161,56,0.15);border:1px solid rgba(200,161,56,0.4);border-radius:20px;padding:6px 18px;font-size:11px;color:rgba(200,161,56,1);font-weight:700;letter-spacing:2px;margin-bottom:22px;text-transform:uppercase}
  .code-box{background:rgba(200,161,56,1);border-radius:18px;padding:22px 28px;margin:0 auto 26px}
  .code-label{font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:10px}
  .code{font-size:34px;font-weight:800;letter-spacing:5px;color:#fff;font-family:'Courier New',monospace}
  hr{border:none;border-top:1px dashed rgba(255,255,255,0.12);margin:22px 0}
  .info{font-size:11px;color:rgba(255,255,255,0.45);line-height:1.8}
  .info b{color:rgba(255,255,255,0.75)}
  .footer{margin-top:26px;font-size:9px;color:rgba(255,255,255,0.22);letter-spacing:2px;text-transform:uppercase}
  @media print{body{background:#fff}}
</style>
</head>
<body>
<div class="card">
  <div class="logo">☕ Kaffa Cup</div>
  <div class="greeting">Xoş gəldiniz,</div>
  <div class="name">${name}</div>
  <div class="badge">5% Cashback Kodu</div>
  <div class="code-box">
    <div class="code-label">Şəxsi Promo Kodunuz</div>
    <div class="code">${promoCode}</div>
  </div>
  <hr/>
  <div class="info">
    Bu kodu kassada göstərərək <b>hər alışda 5% cashback</b> qazana bilərsiniz.<br/>
    Kod yalnız <b>${name}</b> adına verilmişdir.
  </div>
  <div class="footer">kaffa-cup · Şəxsi istifadə üçündür</div>
</div>
<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),500)}<\/script>
</body></html>`)
  win.document.close()
}

function OrderHistoryList({ orders }) {
  const [expandedId, setExpandedId] = useState(null)
  return (
    <div className="divide-y divide-gray-50">
      {orders.map((order) => (
        <div key={order.id}>
          <button
            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            className="w-full px-5 py-4 flex justify-between items-start text-left">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {order.items?.length > 0
                  ? order.items.map(i => i.name).join(', ').slice(0, 40) + (order.items.map(i => i.name).join(', ').length > 40 ? '…' : '')
                  : `${order.items?.length || 0} məhsul`}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(order.date).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                {' · '}{new Date(order.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-sm font-bold" style={{ color: '#32534c' }}>
                {(order.paid ?? order.total ?? 0).toFixed(2)} ₼
              </p>
              {order.cashbackEarned > 0 && (
                <p className="text-xs mt-0.5 font-semibold" style={{ color: 'rgba(200,161,56,1)' }}>
                  +{order.cashbackEarned.toFixed(2)} ₼
                </p>
              )}
            </div>
          </button>
          <AnimatePresence>
            {expandedId === order.id && order.items?.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden">
                <div className="mx-5 mb-3 rounded-xl overflow-hidden border border-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="px-4 py-2 flex justify-between text-xs border-b border-gray-50 last:border-0"
                      style={{ background: 'rgba(50,83,76,0.03)' }}>
                      <span className="text-gray-600">
                        {item.name}
                        {item.qty > 1 && <span className="text-gray-400 ml-1">×{item.qty}</span>}
                      </span>
                      <span className="font-semibold text-gray-700">
                        {(item.price * item.qty).toFixed(2)} ₼
                      </span>
                    </div>
                  ))}
                  <div className="px-4 py-2 flex justify-between text-xs bg-gray-50 border-t border-gray-100">
                    <span className="font-bold text-gray-600">Cəmi</span>
                    <span className="font-bold text-gray-700">{(order.paid ?? order.total ?? 0).toFixed(2)} ₼</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const handle = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'Ad daxil edin'
    if (!form.lastName.trim()) errs.lastName = 'Soyad daxil edin'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 9)
      errs.phone = 'Düzgün nömrə daxil edin'
    const cleanEmail = form.email.trim()
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.'))
      errs.email = 'Düzgün e-mail daxil edin'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onLogin(cleanEmail, `${form.firstName.trim()} ${form.lastName.trim()}`, form.phone.trim())
  }

  const fields = [
    { key: 'firstName', label: 'Ad',      placeholder: 'Adınız',       type: 'text' },
    { key: 'lastName',  label: 'Soyad',   placeholder: 'Soyadınız',    type: 'text' },
    { key: 'phone',     label: 'Nömrə',   placeholder: '+994 XX XXX XX XX', type: 'tel' },
    { key: 'email',     label: 'E-mail',  placeholder: 'mail@example.com', type: 'email' },
  ]

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, #32534c, #1e3a33)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Navbar />
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(200,161,56,0.15)', border: '1px solid rgba(200,161,56,0.25)' }}>
            <span className="font-display text-2xl" style={{ color: 'rgba(200,161,56,1)' }}>5%</span>
          </div>
          <h2 className="font-display text-white text-3xl mb-1">Cashback</h2>
          <p className="text-white/40 text-sm">Məlumatlarınızı daxil edin, hər alışdan 5% qazan</p>
        </div>

        <div className="space-y-3">
          {fields.map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1.5"
                style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handle()}
                placeholder={placeholder}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none text-gray-800 placeholder-gray-400"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: errors[key] ? '1.5px solid #f87171' : '1.5px solid transparent',
                }}
                autoFocus={key === 'firstName'}
              />
              {errors[key] && (
                <p className="text-red-400 text-xs mt-1 pl-1">{errors[key]}</p>
              )}
            </div>
          ))}

          <motion.button onClick={handle}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white mt-1"
            style={{ background: 'rgba(200,161,56,1)' }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Daxil Ol
          </motion.button>
        </div>

        <p className="text-white/20 text-xs mt-5 text-center">Şifrə tələb olunmur · Məlumatlar qorunur</p>
      </div>
    </motion.div>
  )
}

export default function CustomerPage() {
  const navigate = useNavigate()
  const { user, cashbackBalance, totalEarned, orderHistory, signIn, signOutUser } = useCustomerAuth()
  const [copied, setCopied] = useState(false)

  if (!user) return <LoginForm onLogin={signIn} />

  const promoCode = generatePromoCode(user.email)
  const name = user.displayName

  return (
    <motion.div className="min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #32534c 0%, #1e3a33 280px, #f8f7f5 280px)' }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <Navbar />

      <div className="max-w-lg mx-auto px-4 pt-28 pb-20">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 transition-colors"
          style={{ color: 'rgba(200,161,56,0.8)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kaffa Cup
        </button>

        {/* Profile */}
        <motion.div className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
            style={{ background: 'rgba(200,161,56,0.85)' }}>
            {name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{name}</h2>
            <p className="text-white/40 text-xs">{user.email}</p>
          </div>
        </motion.div>

        {/* Balance card */}
        <motion.div className="rounded-2xl p-6 mb-4 shadow-xl text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(200,161,56,1), rgba(175,138,35,1))' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(25%, -25%)' }} />
          <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(0, 50%)' }} />
          <p className="text-sm font-semibold opacity-75 uppercase tracking-widest mb-1">Cashback Balansı</p>
          <p className="font-display text-5xl mb-1">{cashbackBalance.toFixed(2)} ₼</p>
          <p className="text-sm opacity-60">Cəmi qazanılan: {totalEarned.toFixed(2)} ₼</p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs opacity-50">Hər alışdan 5% · Kassada promo kodunuzu göstərin</p>
          </div>
        </motion.div>

        {/* Promo Code Card */}
        <motion.div className="rounded-2xl mb-4 overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #1e3a33, #32534c)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="px-6 pt-6 pb-4 text-center">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'rgba(200,161,56,0.7)' }}>
              Şəxsi Promo Kodunuz
            </p>
            <p className="text-white/60 text-sm mb-0.5">Xoş gəldiniz,</p>
            <p className="text-white font-bold text-xl">{name} 👋</p>
          </div>

          <div className="mx-6 mb-5 rounded-xl px-4 py-4 text-center"
            style={{ background: 'rgba(200,161,56,1)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-white/70">Promo Kodu</p>
            <p className="font-mono font-extrabold text-3xl tracking-widest text-white select-all">{promoCode}</p>
          </div>

          <div className="px-6 pb-2">
            <div className="rounded-xl px-4 py-3 mb-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-white/55 text-xs text-center leading-relaxed">
                Bu kodu <span className="text-white/80 font-semibold">kassada göstərin</span> — hər alışda <span className="text-yellow-400 font-bold">5% cashback</span> qazanın
              </p>
            </div>
          </div>

          <div className="px-6 pb-6 grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => {
                navigator.clipboard.writeText(promoCode)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: copied ? 'rgba(200,161,56,1)' : 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.96 }}>
              {copied ? '✓ Kopyalandı' : 'Kodu Kopyala'}
            </motion.button>
            <motion.button
              onClick={() => downloadPromoAsPDF(name, promoCode)}
              className="py-3 rounded-xl text-sm font-bold"
              style={{ background: 'rgba(200,161,56,1)', color: '#fff' }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
              PDF Yüklə
            </motion.button>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div className="rounded-2xl p-5 mb-5 bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p className="font-semibold text-gray-700 mb-3 text-sm">Necə işləyir?</p>
          <div className="space-y-2.5">
            {[
              ['☕', 'Kaffa Cup-a gəlin, istədiyiniz məhsulu sifariş edin'],
              ['📱', 'Kassada bu ekranı və ya PDF-i göstərin'],
              ['💰', 'Kassir kodu yoxlayır, 5% cashback hesabınıza əlavə edilir'],
            ].map(([emoji, text]) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-lg shrink-0">{emoji}</span>
                <p className="text-sm text-gray-500 leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order history */}
        {orderHistory.length > 0 && (
          <motion.div className="rounded-2xl bg-white shadow-sm mb-5 overflow-hidden"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold text-gray-700 text-sm">Alış Tarixçəm</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(50,83,76,0.08)', color: '#32534c' }}>
                {orderHistory.length}
              </span>
            </div>
            <OrderHistoryList orders={orderHistory.slice(0, 20)} />
          </motion.div>
        )}

        <motion.button onClick={signOutUser}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-red-400 border border-red-100 bg-white hover:bg-red-50 transition-colors"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          Çıxış
        </motion.button>
      </div>
    </motion.div>
  )
}
