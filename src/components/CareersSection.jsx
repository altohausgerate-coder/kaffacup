import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LangContext'

const perkIcons = [
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
]

const perkKeys = [
  { title: 'careers.perk1.title', desc: 'careers.perk1.desc' },
  { title: 'careers.perk2.title', desc: 'careers.perk2.desc' },
  { title: 'careers.perk3.title', desc: 'careers.perk3.desc' },
  { title: 'careers.perk4.title', desc: 'careers.perk4.desc' },
]

const positionKeys = [
  'careers.pos.barista',
  'careers.pos.cashier',
  'careers.pos.waiter',
  'careers.pos.kitchen',
  'careers.pos.courier',
  'careers.pos.other',
]

export default function CareersSection() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', phone: '', position: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const positions = positionKeys.map(k => t(k))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t('careers.err.name')
    if (!form.phone.trim()) e.phone = t('careers.err.phone')
    if (!form.position) e.position = t('careers.err.pos')
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    const msg = [
      t('careers.wa.title'),
      ``,
      `👤 Ad: ${form.name}`,
      `📞 Telefon: ${form.phone}`,
      `💼 Vəzifə: ${form.position}`,
      form.message ? `💬 Mesaj: ${form.message}` : '',
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/994517326959?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
    setForm({ name: '', phone: '', position: '', message: '' })
    setTimeout(() => setSent(false), 6000)
  }

  const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase text-white/50" style={{ letterSpacing: 0 }}>{label}</label>
      {children}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  )

  return (
    <section id="careers" className="relative py-14 sm:py-24 px-4 overflow-hidden" style={{ background: '#1e3a33' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 55%), radial-gradient(circle at 80% 20%, #c8a138 0%, transparent 45%)' }} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.p className="text-xs uppercase font-semibold mb-3"
            style={{ color: 'rgba(200,161,56,0.8)', letterSpacing: 0 }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('careers.label')}
          </motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}>
            {t('careers.title')}
          </motion.h2>
          <motion.p className="text-white/55 max-w-xl mx-auto font-body text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}>
            {t('careers.desc')}
          </motion.p>
          <motion.div className="h-px mx-auto mt-6 bg-white/10 max-w-xs"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left: Perks + open positions */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {perkKeys.map((p, i) => (
                <motion.div key={i}
                  className="rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 160 }}
                  whileHover={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(200,161,56,0.25)' }}
                >
                  <span style={{ color: 'rgba(200,161,56,0.85)' }}>{perkIcons[i]}</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{t(p.title)}</p>
                    <p className="text-white/50 text-xs leading-relaxed">{t(p.desc)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Open positions */}
            <motion.div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs uppercase text-white/40 font-semibold mb-4" style={{ letterSpacing: 0 }}>{t('careers.open')}</p>
              <div className="flex flex-wrap gap-2">
                {positionKeys.slice(0, -1).map((key, i) => (
                  <span key={i}
                    className="text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium"
                    style={{ background: 'rgba(200,161,56,0.12)', color: 'rgba(200,161,56,0.9)', border: '1px solid rgba(200,161,56,0.2)' }}>
                    {t(key)}
                  </span>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-4 leading-relaxed">
                {t('careers.open.note')}
              </p>
            </motion.div>
          </div>

          {/* Right: Application form */}
          <motion.div
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-8"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 130, delay: 0.1 }}
          >
            <h3 className="text-xl font-display text-white mb-1">{t('careers.form.title')}</h3>
            <p className="text-white/40 text-sm mb-6 sm:mb-7">{t('careers.form.desc')}</p>

            <AnimatePresence>
              {sent && (
                <motion.div className="mb-6 px-4 py-3 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(50,220,100,0.12)', border: '1px solid rgba(50,220,100,0.25)' }}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(50,220,100,0.9)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
                  </svg>
                  <p className="text-sm text-green-300">{t('careers.form.success')}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label={t('careers.form.name')} error={errors.name}>
                <input name="name" value={form.name}
                  onChange={e => { setForm(p => ({...p, name: e.target.value})); setErrors(p => ({...p, name:''})) }}
                  placeholder={t('careers.form.name.ph')}
                  className="px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all focus:ring-1"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: errors.name ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.12)',
                    '--tw-ring-color': 'rgba(200,161,56,0.5)',
                  }} />
              </Field>

              <Field label={t('careers.form.phone')} error={errors.phone}>
                <input name="phone" value={form.phone} type="tel"
                  onChange={e => { setForm(p => ({...p, phone: e.target.value})); setErrors(p => ({...p, phone:''})) }}
                  placeholder={t('careers.form.phone.ph')}
                  className="px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all focus:ring-1"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: errors.phone ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.12)',
                    '--tw-ring-color': 'rgba(200,161,56,0.5)',
                  }} />
              </Field>

              <Field label={t('careers.form.pos')} error={errors.position}>
                <select name="position" value={form.position}
                  onChange={e => { setForm(p => ({...p, position: e.target.value})); setErrors(p => ({...p, position:''})) }}
                  className="px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 appearance-none cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: errors.position ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.12)',
                    color: form.position ? '#fff' : 'rgba(255,255,255,0.25)',
                    '--tw-ring-color': 'rgba(200,161,56,0.5)',
                  }}>
                  <option value="" disabled style={{ background: '#1e3a33' }}>{t('careers.form.pos.ph')}</option>
                  {positions.map((pos, i) => (
                    <option key={i} value={pos} style={{ background: '#1e3a33', color: '#fff' }}>{pos}</option>
                  ))}
                </select>
              </Field>

              <Field label={t('careers.form.msg')}>
                <textarea name="message" value={form.message} rows={3}
                  onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  placeholder={t('careers.form.msg.ph')}
                  className="px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none resize-none transition-all focus:ring-1"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    '--tw-ring-color': 'rgba(200,161,56,0.5)',
                  }} />
              </Field>

              <motion.button type="submit"
                className="mt-1 w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all"
                style={{ background: 'rgba(200,161,56,1)', color: '#1a2e1e' }}
                whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
                whileTap={{ scale: 0.98 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {t('careers.form.submit')}
              </motion.button>

              <p className="text-center text-white/25 text-xs">
                {t('careers.form.hint')}
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
