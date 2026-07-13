import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CoffeeBean = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2C6.5 2 2 6.8 2 12.5S6.5 22 12 22c3.5 0 5-2.2 5-5.2 0-2-1.2-3-2.6-4-1.6-1.1-3.4-2.3-3.4-4.8 0-2.6 2-4.4 4.7-4.4.9 0 1.7.2 2.3.5C16.7 2.7 14.5 2 12 2z"
      fill="currentColor"
    />
    <path
      d="M12.5 3.6c-4.1 2.9-6.6 6.6-6.6 10 0 3.4 2 5.9 4.8 5.9"
      stroke="rgba(0,0,0,0.22)"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

const SteamWisp = ({ size = 34, color }) => (
  <svg width={size} height={size * 1.7} viewBox="0 0 24 40" fill="none">
    <path
      d="M12 38C12 38 4 30 8 22C12 14 5 11 8 3"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

const beans = [
  { top: '3%', left: '5%', size: 24, duration: 8, delay: 0, dir: 1, ampX: 26, ampY: 30, color: 'rgba(200,161,56,0.42)' },
  { top: '14%', left: '92%', size: 16, duration: 9.5, delay: 0.6, dir: -1, ampX: 20, ampY: 24, color: 'rgba(50,83,76,0.34)' },
  { top: '30%', left: '4%', size: 15, duration: 7, delay: 1.2, dir: 1, ampX: 18, ampY: 22, color: 'rgba(200,161,56,0.36)' },
  { top: '44%', left: '94%', size: 21, duration: 8.6, delay: 0.3, dir: -1, ampX: 24, ampY: 28, color: 'rgba(50,83,76,0.36)' },
  { top: '60%', left: '6%', size: 18, duration: 7.8, delay: 0.9, dir: 1, ampX: 20, ampY: 26, color: 'rgba(200,161,56,0.34)' },
  { top: '76%', left: '90%', size: 14, duration: 9, delay: 1.5, dir: -1, ampX: 16, ampY: 20, color: 'rgba(50,83,76,0.3)' },
  { top: '90%', left: '5%', size: 20, duration: 8.2, delay: 0.4, dir: 1, ampX: 22, ampY: 24, color: 'rgba(200,161,56,0.38)' },
]

const wisps = [
  { top: '20%', left: '96%', size: 30, duration: 6, delay: 0.2, dir: -1, color: 'rgba(255,255,255,0.22)' },
  { top: '52%', left: '2%', size: 26, duration: 6.8, delay: 1, dir: 1, color: 'rgba(255,255,255,0.18)' },
  { top: '82%', left: '95%', size: 32, duration: 5.6, delay: 0.7, dir: -1, color: 'rgba(255,255,255,0.2)' },
]

const glows = [
  { top: '8%', left: '15%', size: 260, dir: 1, color: 'rgba(200,161,56,0.16)' },
  { top: '55%', left: '80%', size: 320, dir: -1, color: 'rgba(50,83,76,0.18)' },
  { top: '88%', left: '20%', size: 240, dir: 1, color: 'rgba(200,161,56,0.14)' },
]

const Glow = ({ g, scrollYProgress }) => {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 140 * g.dir])
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        top: g.top,
        left: g.left,
        width: g.size,
        height: g.size,
        y: parallaxY,
        background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
        filter: 'blur(10px)',
      }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

const Bean = ({ b, scrollYProgress }) => {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 170 * b.dir])
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [0, 90 * b.dir])

  return (
    <motion.div
      className="absolute"
      style={{ top: b.top, left: b.left, y: parallaxY, rotate: parallaxRotate, color: b.color }}
    >
      <motion.div
        animate={{
          y: [0, -b.ampY, 0, b.ampY * 0.35, 0],
          x: [0, b.ampX * 0.5 * b.dir, b.ampX * b.dir, b.ampX * 0.4 * b.dir, 0],
          rotate: [0, b.dir * 18, 0, -b.dir * 12, 0],
          scale: [1, 1.12, 1, 0.94, 1],
        }}
        transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
      >
        <CoffeeBean size={b.size} />
      </motion.div>
    </motion.div>
  )
}

const Wisp = ({ w, scrollYProgress }) => {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 130 * w.dir])

  return (
    <motion.div
      className="absolute"
      style={{ top: w.top, left: w.left, y: parallaxY }}
    >
      <motion.div
        animate={{
          y: [0, -18, 0],
          x: [0, w.dir * 10, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{ duration: w.duration, repeat: Infinity, ease: 'easeInOut', delay: w.delay }}
      >
        <SteamWisp size={w.size} color={w.color} />
      </motion.div>
    </motion.div>
  )
}

const FloatingBeans = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden hidden sm:block"
      aria-hidden="true"
    >
      {glows.map((g, i) => (
        <Glow key={`glow-${i}`} g={g} scrollYProgress={scrollYProgress} />
      ))}
      {wisps.map((w, i) => (
        <Wisp key={`wisp-${i}`} w={w} scrollYProgress={scrollYProgress} />
      ))}
      {beans.map((b, i) => (
        <Bean key={`bean-${i}`} b={b} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  )
}

export default FloatingBeans
