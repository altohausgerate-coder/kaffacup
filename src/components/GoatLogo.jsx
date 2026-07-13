import { motion } from 'framer-motion'

export default function GoatLogo({ size = 120, animate = true, className = '' }) {
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, display: 'inline-block' }}
      animate={animate ? { rotate: [-1.5, 1.5, -1.5] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img src="/brand/symbol1.svg" alt="Kaffa Cup" width={size} height={size} style={{ width: size, height: size }} />
    </motion.div>
  )
}
