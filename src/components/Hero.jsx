import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GoatLogo from './GoatLogo'
import { useLang } from '../context/LangContext'

const bgUrl = '/images/cafe-bg.webp'

const steamParticles = [
  { x: '44%', delay: 0,   size: 7  },
  { x: '49%', delay: 1.1, size: 5  },
  { x: '53%', delay: 2.0, size: 9  },
  { x: '40%', delay: 3.0, size: 6  },
  { x: '57%', delay: 0.6, size: 8  },
  { x: '51%', delay: 1.8, size: 5  },
]

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const heroScale   = useTransform(scrollYProgress, [0, 0.35], [1,    0.92])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1,    0.5 ])
  const bgY         = useTransform(scrollYProgress, [0, 0.35], ['0%', '25%'])
  const { t } = useLang()
  const navigate = useNavigate()

  const quickLinks = [
    {
      label: t('hero.cta.menu'),
      action: () => navigate('/menu'),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      ),
    },
  ]

  const handleScroll = (e) => {
    e.preventDefault()
    document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden grain-overlay"
      style={{ scale: heroScale, opacity: heroOpacity }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ y: bgY, backgroundImage: `url(${bgUrl})` }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(10,28,22,0.55) 0%, rgba(20,50,38,0.62) 40%, rgba(8,22,17,0.90) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,15,12,0.55) 100%)'
        }} />
      </div>

      {/* Steam particles */}
      {steamParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size * 2.5,
            bottom: '18%',
            left: p.x,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.35), transparent)',
            filter: 'blur(3px)',
          }}
          animate={{ y: [0, -100, -180], opacity: [0, 0.55, 0], scaleX: [1, 1.6, 0.8] }}
          transition={{ duration: 3.5, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Content */}
      <div className="absolute inset-x-0 top-1/2 z-10 mx-auto flex w-full max-w-5xl -translate-y-1/2 flex-col items-center text-center px-4">

        <motion.div
          className="mb-5 sm:mb-6"
          initial={{ scale: 0.4, opacity: 0, filter: 'blur(12px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200,161,56,0.25) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <GoatLogo size={96} className="sm:scale-110" />
          </div>
        </motion.div>

        <div className="flex items-center gap-3 mb-6 sm:mb-7 w-40 sm:w-48">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(200,161,56,0.7))' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(200,161,56,0.9)' }} />
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(200,161,56,0.7))' }} />
        </div>

        <p
          className="text-[10px] sm:text-[11px] font-semibold mb-4"
          style={{ color: 'rgba(200,161,56,0.85)', fontFamily: "'Nunito Sans', sans-serif", textTransform: 'uppercase', letterSpacing: 0 }}
        >
          {t('hero.label')}
        </p>

        <h1 className="sr-only">KAFFA CUP</h1>

        <p
          className="text-sm sm:text-lg md:text-xl font-light mb-8 sm:mb-10 max-w-[20rem] sm:max-w-md"
          style={{ color: 'rgba(255,255,255,0.72)', letterSpacing: 0, lineHeight: 1.65 }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          className="flex w-full max-w-xs flex-col items-stretch justify-center gap-3 mb-10 sm:mb-14 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center"
        >
          {quickLinks.map((link, i) =>
            link.external ? (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-md transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
                whileHover={{ scale: 1.06, background: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.96 }}
              >
                {link.icon}
                {link.label}
              </motion.a>
            ) : (
              <motion.button
                key={i}
                onClick={link.action}
                className="inline-flex min-h-11 items-center justify-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-md transition-all"
                style={{
                  background: i === 0 ? 'rgba(200,161,56,0.18)' : 'rgba(255,255,255,0.08)',
                  border: i === 0 ? '1px solid rgba(200,161,56,0.45)' : '1px solid rgba(255,255,255,0.18)',
                }}
                whileHover={{ scale: 1.06, background: i === 0 ? 'rgba(200,161,56,0.32)' : 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.96 }}
              >
                {link.icon}
                {link.label}
              </motion.button>
            )
          )}
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <button onClick={handleScroll} className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 0 }}>{t('hero.scroll')}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Hero
