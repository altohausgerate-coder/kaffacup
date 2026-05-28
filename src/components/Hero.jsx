import { motion, useScroll, useTransform } from 'framer-motion'
import GoatLogo from './GoatLogo'
import { useLang } from '../context/LangContext'

const titleLetters = 'KAFFA CUP'.split('')
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } } }
const letterItem = { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 16 } } }
const fadeUp = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } } }

const bgUrl = 'https://imageproxy.wolt.com/assets/69a551787d25f60394a0677b'

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])
  const { t } = useLang()

  return (
    <motion.section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ scale: heroScale, opacity: heroOpacity }}>
      <div className="absolute inset-0">
        <motion.div className="w-full h-full bg-cover bg-center" style={{ y: bgY, backgroundImage: `url(${bgUrl})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,61,48,0.75)' }} />
      </div>
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }} className="mb-6">
        <GoatLogo size={200} />
      </motion.div>
      <motion.div className="relative z-10 text-center px-4">
        <motion.h1 className="flex flex-wrap justify-center gap-x-5 text-[80px] sm:text-[100px] md:text-[110px] font-heading font-bold text-white mb-4 leading-[0.85] tracking-[0.25em]"
          variants={container} initial="hidden" animate="visible"
          style={{ textShadow: '0 0 40px rgba(255,255,255,0.35)' }}>
          {titleLetters.map((l, i) => (
            <motion.span key={i} variants={letterItem} className="inline-block">{l === ' ' ? '\u00A0' : l}</motion.span>
          ))}
        </motion.h1>
        <motion.p className="text-lg sm:text-xl md:text-2xl text-white/85 font-light mb-2" variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
          {t('hero.subtitle')}
        </motion.p>
      </motion.div>
      <motion.div className="relative z-10 flex gap-4 flex-wrap justify-center mt-8" initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}>
        <motion.a href="#menu" className="inline-flex items-center bg-primary text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          Menyuya Bax
        </motion.a>
        <motion.a href="https://wolt.com/az/aze/baku/restaurant/kaffa-cup" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center bg-transparent border-2 border-white/40 text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          Wolt-da Sifariş Et
        </motion.a>
      </motion.div>
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </motion.section>
  )
}

export default Hero
