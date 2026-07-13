import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../context/LangContext'

const ScrollReveal = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const { t } = useLang()

  const textY = useTransform(scrollYProgress, [0, 1], ['14%', '-8%'])
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.35])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85])

  return (
    <section
      ref={ref}
      className="relative h-[50vh] sm:h-[60vh] overflow-hidden flex items-center justify-center"
      style={{ background: '#1e3a33' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: '48px 48px',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
        }}
      />

      {/* Aurora glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[45vh] w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,161,56,0.28) 0%, rgba(50,83,76,0.24) 45%, transparent 72%)',
          filter: 'blur(70px)',
          opacity: glowOpacity,
          scale: glowScale,
        }}
      />

      {/* Giant background wordmark */}
      <motion.div
        className="absolute font-display whitespace-nowrap select-none pointer-events-none"
        style={{
          fontSize: '17vw',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.07)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 65%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          y: textY,
          scale: textScale,
          opacity: textOpacity,
        }}
      >
        KAFFA CUP
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-[10px] sm:text-xs uppercase font-semibold mb-3"
          style={{ color: 'rgba(200,161,56,0.85)', letterSpacing: 2 }}
        >
          {t('reveal.label')}
        </p>
        <h2 className="font-heading text-white text-2xl sm:text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-snug px-2">
          {t('reveal.tagline')}
        </h2>
      </motion.div>
    </section>
  )
}

export default ScrollReveal
