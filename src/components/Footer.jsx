import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import GoatLogo from './GoatLogo'
import { useLang } from '../context/LangContext'

const exteriorCards = [
  {
    label: 'İçəri Görüntü',
    sub: 'Neon işarə, isti atmosfer',
    image: '/İmages/gallery1.jpg.webp',
  },
  {
    label: 'Açıq Teras - Gündüz',
    sub: 'Günəşli teras, yaşıl kollar',
    image: '/İmages/gallery2.jpg.webp',
  },
  {
    label: 'Gecə Terası',
    sub: 'İşıqlı dam, gecə atmosferi',
    image: '/İmages/gallery3.jpg.webp',
  },
]

const ExteriorPhotos = () => {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0.3, 0.5], [0, -30])
  const y2 = useTransform(scrollYProgress, [0.35, 0.55], [0, -20])
  const y3 = useTransform(scrollYProgress, [0.4, 0.6], [0, -40])
  const { t } = useLang()

  return (
    <section className="py-20 px-4 bg-mint" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 className="text-4xl md:text-5xl font-heading font-bold text-primary"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('gallery.title')}
          </motion.h2>
          <motion.p className="text-gray-400 mt-2 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            {t('gallery.subtitle')}
          </motion.p>
          <motion.div className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3" style={{ maxWidth: 80 }}
            initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exteriorCards.map((card, i) => {
            const y = [y1, y2, y3][i]
            return (
              <motion.div key={i}
                className="relative h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 150 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" style={{ y }} />
                <div className="absolute top-5 left-5 z-[2]" style={{ y }}>
                  <GoatLogo size={44} animate={false} />
                </div>
                <div className="absolute bottom-6 left-6 z-[2] text-white" style={{ y }}>
                  <p className="font-heading font-bold text-2xl drop-shadow-lg">{card.label}</p>
                  <p className="text-sm text-white/70 mt-1 drop-shadow">{card.sub}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const TeamSection = () => {
  const { t } = useLang()
  return (
    <section className="py-16 px-4 bg-mint" id="team">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('team.title')}
          </motion.h2>
          <motion.p className="text-gray-400 font-body mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            {t('team.subtitle')}
        </motion.p>
        <motion.div className="w-full max-w-[500px] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <img src="/images/team.jpg" alt="Kaffa Cup komandası" className="w-full object-cover"
            style={{ aspectRatio: '4/5', objectPosition: 'center 20%' }} />
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  const { scrollYProgress } = useScroll()
  const goatY = useTransform(scrollYProgress, [0.7, 1], [30, 0])

  return (
    <footer className="bg-[#1a3d30] text-white/80 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <motion.div className="flex flex-col items-start gap-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div style={{ y: goatY }}><GoatLogo size={70} /></motion.div>
            <span className="font-heading font-bold text-xl text-white">KAFFA CUP</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="font-heading font-semibold text-white mb-4 text-lg">📍 Ünvan</h4>
            <p className="leading-relaxed text-sm">
              Sumqayıt şəhəri, 5-ci məhəllə<br />
              Azərbaycan prospekti 4
            </p>
            <a href="https://www.google.com/maps?q=40.59488850151604,49.666463569392675" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
              Google Maps-də aç
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="font-heading font-semibold text-white mb-4 text-lg">📞 Əlaqə</h4>
            <a href="tel:+994517326959" className="block text-sm hover:text-white transition-colors mb-2">+994 51 732 69 59</a>
            <a href="https://www.instagram.com/kaffacupcoffee/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              @kaffacupcoffee
            </a>
            <a href="https://wolt.com/en/aze/sumgait/restaurant/kaffa-cup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
              Wolt-da sifariş et
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="font-heading font-semibold text-white mb-4 text-lg">🕐 İş Saatları</h4>
            <p className="text-sm">Hər gün<br /><span className="text-white font-semibold">08:00 – 00:00</span></p>
          </motion.div>
        </div>

        <motion.div className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
            {[10,20,30,40,50,60,70].map((x,i) => (
              <ellipse key={i} cx={x} cy={[10,8,11,9,11,8,10][i]} rx="4" ry="3" fill="#B5C4A2" opacity="0.5" />
            ))}
            <line x1="8" y1="12" x2="72" y2="12" stroke="#B5C4A2" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </motion.div>

        <motion.div className="text-center text-sm text-white/40"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          &copy; 2025 Kaffa Cup. Bütün hüquqlar qorunur.
        </motion.div>
      </div>
    </footer>
  )
}

export { ExteriorPhotos, TeamSection }
export default Footer
