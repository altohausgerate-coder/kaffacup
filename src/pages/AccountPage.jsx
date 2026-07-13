import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCustomerAuth } from '../context/CustomerAuthContext'

function generatePromoCode(email) {
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash + email.charCodeAt(i)) | 0
  }
  const abs = Math.abs(hash)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  let n = abs
  for (let i = 0; i < 5; i++) {
    code += chars[n % chars.length]
    n = Math.floor(n / chars.length)
  }
  return 'KAFFA-' + code
}

function downloadPromoAsPDF(name, promoCode) {
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html>
<html lang="az">
<head>
<meta charset="UTF-8"/>
<title>Kaffa Cup – Promo Kodu</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#f8f7f5; display:flex; align-items:center; justify-content:center; min-height:100vh; }
  .card { width:400px; background:linear-gradient(135deg,#32534c,#1e3a33); border-radius:24px; padding:40px 36px; color:#fff; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.25); position:relative; overflow:hidden; }
  .card::before { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(200,161,56,0.12); border-radius:50%; }
  .card::after { content:''; position:absolute; bottom:-30px; left:-30px; width:120px; height:120px; background:rgba(200,161,56,0.08); border-radius:50%; }
  .logo { font-size:13px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:rgba(200,161,56,0.8); margin-bottom:28px; }
  .greeting { font-size:14px; color:rgba(255,255,255,0.6); margin-bottom:6px; }
  .name { font-size:22px; font-weight:700; color:#fff; margin-bottom:24px; }
  .badge { display:inline-block; background:rgba(200,161,56,0.15); border:1px solid rgba(200,161,56,0.35); border-radius:12px; padding:6px 16px; font-size:12px; color:rgba(200,161,56,1); font-weight:600; letter-spacing:1px; margin-bottom:20px; }
  .code-box { background:rgba(200,161,56,1); border-radius:16px; padding:20px 24px; margin:0 auto 24px; }
  .code-label { font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:8px; }
  .code { font-size:32px; font-weight:800; letter-spacing:4px; color:#fff; font-family: 'Courier New', monospace; }
  .divider { border:none; border-top:1px dashed rgba(255,255,255,0.15); margin:20px 0; }
  .info { font-size:11px; color:rgba(255,255,255,0.45); line-height:1.7; }
  .info b { color:rgba(255,255,255,0.75); }
  .footer { margin-top:24px; font-size:10px; color:rgba(255,255,255,0.25); letter-spacing:1px; }
  @media print { body { background:#fff; } }
</style>
</head>
<body>
<div class="card">
  <div class="logo">☕ Kaffa Cup</div>
  <div class="greeting">Xoş gəldiniz,</div>
  <div class="name">${name}</div>
  <div class="badge">5% Cashback Kodu</div>
  <div class="code-box">
    <div class="code-label">Promo Kodunuz</div>
    <div class="code">${promoCode}</div>
  </div>
  <hr class="divider"/>
  <div class="info">
    Bu kodu kassada göstərərək <b>hər alışda 5% cashback</b> qazana bilərsiniz.<br/>
    Kod yalnız <b>${name}</b> adına verilmişdir.
  </div>
  <div class="footer">kaffa-cup.az · Şəxsi istifadə üçündür</div>
</div>
<script>window.onload=()=>{window.print(); setTimeout(()=>window.close(),500)}<\/script>
</body>
</html>`)
  win.document.close()
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handle = () => {
    const clean = email.trim()
    if (!clean || !clean.includes('@') || !clean.includes('.')) {
      setError('Düzgün e-mail daxil edin')
      return
    }
    onLogin(clean)
  }

  return (
    <motion.div className="min-h-[100svh] flex flex-col items-center justify-center px-4 pt-20 pb-10"
      style={{ background: 'linear-gradient(135deg, #32534c, #1e3a33)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(200,161,56,0.15)', border: '1px solid rgba(200,161,56,0.25)' }}>
          <span className="font-display text-2xl" style={{ color: 'rgba(200,161,56,1)' }}>5%</span>
        </div>
        <h2 className="font-display text-white text-3xl mb-1">Cashback</h2>
        <p className="text-white/40 text-sm mb-8">E-mail ilə daxil ol, hər sifarişdən 5% qazan</p>

        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handle()}
            placeholder="e-mail@example.com"
            className="w-full px-4 py-3.5 rounded-xl text-sm outline-none text-gray-800 placeholder-gray-400"
            style={{ background: 'rgba(255,255,255,0.95)' }}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs text-left pl-1">{error}</p>}
          <motion.button
            onClick={handle}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'rgba(200,161,56,1)' }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Daxil Ol
          </motion.button>
        </div>
        <p className="text-white/25 text-xs mt-5">Şifrə tələb olunmur · Yalnız e-mail yetər</p>
      </div>
    </motion.div>
  )
}

export default function AccountPage() {
  const navigate = useNavigate()
  const { user, cashbackBalance, totalEarned, orderHistory, signIn, signOutUser } = useCustomerAuth()
  const [copied, setCopied] = useState(false)

  if (!user) return <LoginForm onLogin={signIn} />

  return (
    <motion.div className="min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #32534c 0%, #1e3a33 280px, #f8f7f5 280px)' }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <Navbar />

      <div className="max-w-lg mx-auto px-4 pt-24 sm:pt-28 pb-20">
        {/* Back */}
        <button onClick={() => navigate('/')}
          className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase mb-5 sm:mb-6 transition-colors"
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
            {user.displayName?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-bold text-lg leading-tight">{user.displayName}</h2>
            <p className="text-white/40 text-xs break-all">{user.email}</p>
          </div>
        </motion.div>

        {/* Balance card */}
        <motion.div
          className="rounded-2xl p-5 sm:p-6 mb-4 shadow-xl text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(200,161,56,1), rgba(175,138,35,1))' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(25%, -25%)' }} />
          <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(0, 50%)' }} />
          <p className="text-sm font-semibold opacity-75 uppercase mb-1" style={{ letterSpacing: 0 }}>Cashback Balansı</p>
          <p className="font-display text-4xl sm:text-5xl mb-1">{cashbackBalance.toFixed(2)} ₼</p>
          <p className="text-sm opacity-60">Cəmi qazanılan: {totalEarned.toFixed(2)} ₼</p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs opacity-50">Hər sifarişdən 5% · Səbətdə aktiv etmək olar</p>
          </div>
        </motion.div>

        {/* Promo Code Card */}
        {(() => {
          const promoCode = generatePromoCode(user.email)
          const name = user.displayName
          return (
            <motion.div
              className="rounded-2xl mb-4 overflow-hidden shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1e3a33, #32534c)' }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {/* Header */}
              <div className="px-5 sm:px-6 pt-6 pb-4 text-center">
                <p className="text-xs font-bold uppercase mb-1" style={{ color: 'rgba(200,161,56,0.7)', letterSpacing: 0 }}>
                  Şəxsi Promo Kodunuz
                </p>
                <p className="text-white/60 text-sm mb-0.5">Xoş gəldiniz,</p>
                <p className="text-white font-bold text-xl">{name} 👋</p>
              </div>

              {/* Code box */}
              <div className="mx-5 sm:mx-6 mb-5 rounded-xl px-4 py-4 text-center"
                style={{ background: 'rgba(200,161,56,1)' }}>
                <p className="text-xs font-semibold uppercase mb-2 text-white/70" style={{ letterSpacing: 0 }}>Promo Kodu</p>
                <p className="font-mono font-extrabold text-[1.55rem] sm:text-3xl text-white select-all break-all">{promoCode}</p>
              </div>

              {/* Info */}
              <div className="px-5 sm:px-6 pb-2">
                <div className="rounded-xl px-4 py-3 mb-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-white/55 text-xs text-center leading-relaxed">
                    Bu kodu <span className="text-white/80 font-semibold">kassada göstərin</span> — hər alışda <span className="text-yellow-400 font-bold">5% cashback</span> qazanın
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          )
        })()}

        {/* How it works */}
        <motion.div className="rounded-2xl p-5 mb-5 bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p className="font-semibold text-gray-700 mb-3 text-sm">Necə işləyir?</p>
          <div className="space-y-2.5">
            {[
              ['☕', 'Hər sifarişdən ödənilən məbləğin 5%-i balansa əlavə edilir'],
              ['💳', 'Cashback balansını növbəti sifarişdə istifadə et'],
              ['🛒', 'Səbəti açanda balansı aktiv etmək seçimi görünər'],
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
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="font-semibold text-gray-700 text-sm">Sifariş Tarixçəsi</p>
            </div>
            <div className="divide-y divide-gray-50">
              {orderHistory.slice(0, 10).map((order) => (
                <div key={order.id} className="px-5 py-4 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{order.items?.length || 0} məhsul</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.date).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: '#32534c' }}>{(order.paid ?? order.total ?? 0).toFixed(2)} ₼</p>
                    {order.cashbackEarned > 0 && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(200,161,56,1)' }}>+{order.cashbackEarned.toFixed(2)} ₼</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sign out */}
        <motion.button onClick={signOutUser}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-red-400 border border-red-100 bg-white hover:bg-red-50 transition-colors"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          Çıxış
        </motion.button>
      </div>
    </motion.div>
  )
}
