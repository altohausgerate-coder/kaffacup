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

const beans = [
  { top: '2%', left: '5%', size: 22, duration: 5.5, delay: 0, dir: 1, color: 'rgba(200,161,56,0.38)' },
  { top: '10%', left: '93%', size: 15, duration: 6.2, delay: 0.6, dir: -1, color: 'rgba(50,83,76,0.3)' },
  { top: '24%', left: '3%', size: 14, duration: 4.8, delay: 1.2, dir: 1, color: 'rgba(200,161,56,0.32)' },
  { top: '34%', left: '95%', size: 19, duration: 5.8, delay: 0.3, dir: -1, color: 'rgba(50,83,76,0.32)' },
  { top: '48%', left: '6%', size: 17, duration: 5.2, delay: 0.9, dir: 1, color: 'rgba(200,161,56,0.3)' },
  { top: '58%', left: '92%', size: 13, duration: 6.6, delay: 1.5, dir: -1, color: 'rgba(50,83,76,0.26)' },
  { top: '72%', left: '4%', size: 20, duration: 5, delay: 0.4, dir: 1, color: 'rgba(200,161,56,0.34)' },
  { top: '84%', left: '94%', size: 16, duration: 6, delay: 1.1, dir: -1, color: 'rgba(50,83,76,0.28)' },
  { top: '95%', left: '8%', size: 14, duration: 5.4, delay: 0.7, dir: 1, color: 'rgba(200,161,56,0.3)' },
]

const Bean = ({ b, scrollYProgress }) => {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100 * b.dir])

  return (
    <motion.div
      className="absolute"
      style={{ top: b.top, left: b.left, y: parallaxY, color: b.color }}
    >
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, b.dir * 20, 0] }}
        transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
      >
        <CoffeeBean size={b.size} />
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
      {beans.map((b, i) => (
        <Bean key={i} b={b} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  )
}

export default FloatingBeans
