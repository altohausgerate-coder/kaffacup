import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import FloatingBeans from '../components/FloatingBeans'
import { useLang } from '../context/LangContext'
import { useCustomerAuth } from '../context/CustomerAuthContext'

const InfoStrip = () => {
  const { t } = useLang()
  const infoItems = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
        </svg>
      ),
      label: t('info.wifi'),
      value: 'Kaffa Cup',
      sub: 'Kaffa2025',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
      ),
      label: t('info.address'),
      value: 'Sumqayıt, Azərbaycan pr. 13/16',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: t('info.hours'),
      value: t('info.hours.value'),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.35 3a2.2 2.2 0 00-2.2 2.2c0 1.22.98 2.2 2.2 2.2s2.2-.98 2.2-2.2S9.57 3 8.35 3zm7.3 0a2.2 2.2 0 00-2.2 2.2c0 1.22.98 2.2 2.2 2.2s2.2-.98 2.2-2.2S16.87 3 15.65 3zM5 8.5a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm14 0a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm-7 1c-2.67 0-8 1.34-8 4v1.5C4 16.88 5.12 18 6.5 18h11c1.38 0 2.5-1.12 2.5-2.5V13.5c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      label: t('info.pet'),
      value: t('info.pet.value'),
    },
  ]

  return (
    <div className="bg-primary py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-2 sm:divide-x sm:divide-white/15">
        {infoItems.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2 sm:px-6">
            <span className="w-11 h-11 rounded-full bg-white/10 text-yellow-400 flex items-center justify-center shrink-0">
              {item.icon}
            </span>
            <div>
              <p className="text-white/50 text-[11px] font-medium uppercase" style={{ letterSpacing: 0.5 }}>{item.label}</p>
              <p className="text-white font-semibold text-sm mt-1">{item.value}</p>
              {item.sub && <p className="text-white/60 text-xs mt-0.5">{item.sub}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tiles = [
  {
    to: '/menu',
    image: '/images/qarisiq-yemek-asli.jpg',
    badge: { az: 'Yeməklər & İçkilər', ru: 'Еда и Напитки', en: 'Food & Drinks' },
    title: { az: 'Menyu', ru: 'Меню', en: 'Menu' },
    desc: { az: 'İçkilərdən yeməklərə hər şey burada', ru: 'Всё здесь — от напитков до блюд', en: 'Everything here, from drinks to dishes' },
    large: true,
    reloadDocument: true,
  },
  {
    to: '/gallery',
    image: '/İmages/gallery1.jpg.webp',
    badge: { az: 'Məkan', ru: 'Место', en: 'Venue' },
    title: { az: 'Atmosfer', ru: 'Атмосфера', en: 'Atmosphere' },
    desc: { az: 'İsti atmosfer, gözəl mühit', ru: 'Тёплая атмосфера', en: 'Warm atmosphere' },
  },
  {
    to: '/team',
    image: '/images/team.jpg',
    badge: { az: 'Komanda', ru: 'Команда', en: 'Team' },
    title: { az: 'Kollektivimiz', ru: 'Наша команда', en: 'Our Team' },
    desc: { az: 'Kaffa ailəsi ilə tanış ol', ru: 'Познакомьтесь с семьёй', en: 'Meet the family' },
  },
  {
    to: '/contact',
    image: '/İmages/gallery2.jpg.webp',
    badge: { az: 'Ünvan', ru: 'Адрес', en: 'Location' },
    title: { az: 'Kontakt', ru: 'Контакт', en: 'Contact' },
    desc: { az: 'Bizi tapın, gəlin görüşək', ru: 'Найдите нас', en: 'Come find us' },
  },
  {
    to: '/careers',
    image: '/İmages/gallery3.jpg.webp',
    badge: { az: 'Karyera', ru: 'Карьера', en: 'Career' },
    title: { az: 'Vakansiya', ru: 'Вакансии', en: 'Careers' },
    desc: { az: 'Komandaya qoşul, inkişaf et', ru: 'Работай с нами', en: 'Work with us' },
  },
]

const SectionTile = ({ tile, lang, delay = 0, className = '' }) => (
  <motion.div
    className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link to={tile.to} reloadDocument={tile.reloadDocument} className="block w-full h-full">
      <img
        src={tile.image}
        alt={tile.title[lang] || tile.title.az}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Arrow */}
      <div className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <p className="text-[10px] uppercase font-semibold mb-2" style={{ color: 'rgba(200,161,56,0.9)', letterSpacing: 0 }}>
          {tile.badge[lang] || tile.badge.az}
        </p>
        <h2 className="font-display text-white text-[2rem] sm:text-[2.625rem] leading-none mb-2">
          {tile.title[lang] || tile.title.az}
        </h2>
        <p className="text-white/55 text-sm font-body">
          {tile.desc[lang] || tile.desc.az}
        </p>
      </div>
    </Link>
  </motion.div>
)

const CashbackBanner = () => {
  const { user, cashbackBalance } = useCustomerAuth()
  const navigate = useNavigate()

  return (
    <div className="px-4 py-4 max-w-7xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #131f1d 0%, #1e3a33 50%, #2a4a40 100%)' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => navigate('/hesab')}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,161,56,0.2) 0%, transparent 70%)' }} />
        </div>

        {/* Pulsing ring behind 5% */}
        <motion.div
          className="absolute right-5 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none hidden sm:block"
          style={{ border: '1px solid rgba(200,161,56,0.2)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-7">
          {/* 5% badge */}
          <motion.div
            className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(200,161,56,0.15)', border: '1px solid rgba(200,161,56,0.3)' }}
            animate={{ boxShadow: ['0 0 0px rgba(200,161,56,0)', '0 0 18px rgba(200,161,56,0.4)', '0 0 0px rgba(200,161,56,0)'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="font-display text-2xl leading-none" style={{ color: 'rgba(200,161,56,1)' }}>5%</span>
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight">
              {user ? `Cashback balansın: ${cashbackBalance.toFixed(2)} ₼` : 'Hər alışdan 5% cashback qazanın'}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {user ? 'Bonusların birikir — kassada xərclə' : 'Qeydiyyat keç · Kod al · Bonusunu yığ'}
            </p>
          </div>

          {/* Steps — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {['☕', '→', '📱', '→', '💰'].map((s, i) => (
              <span key={i} className={i % 2 === 0
                ? 'text-base'
                : 'text-white/20 text-xs mx-0.5'}>
                {s}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="w-full shrink-0 px-4 py-2 rounded-xl text-center text-xs font-bold text-white sm:w-auto"
            style={{ background: 'rgba(200,161,56,1)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            {user ? 'Hesab →' : 'Qeydiyyat →'}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const Home = () => {
  const { lang } = useLang()

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <Hero />

      <div className="relative">
        <FloatingBeans />

        <InfoStrip />
        <CashbackBanner />

        {/* Section tiles */}
        <section id="sections" className="px-4 py-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase font-semibold mb-2" style={{ color: 'rgba(200,161,56,0.85)', letterSpacing: 0 }}>
              Kaffa Cup
            </p>
            <div className="h-px bg-primary/15 max-w-xs mx-auto" />
          </motion.div>

          {/* Grid: large left tile + 2 right tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            <div className="lg:col-span-7 h-[320px] sm:h-[420px] lg:h-[560px]">
              <SectionTile tile={tiles[0]} lang={lang} delay={0} className="h-full" />
            </div>
            <div className="lg:col-span-5 grid grid-rows-2 gap-4 h-[360px] sm:h-[420px] lg:h-[560px]">
              <SectionTile tile={tiles[1]} lang={lang} delay={0.08} className="h-full" />
              <SectionTile tile={tiles[2]} lang={lang} delay={0.14} className="h-full" />
            </div>
          </div>

          {/* Bottom row: 2 equal tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionTile tile={tiles[3]} lang={lang} delay={0.18} className="h-[240px] sm:h-[280px]" />
            <SectionTile tile={tiles[4]} lang={lang} delay={0.22} className="h-[240px] sm:h-[280px]" />
          </div>
        </section>
      </div>

      <Footer />
    </motion.div>
  )
}

export default Home
