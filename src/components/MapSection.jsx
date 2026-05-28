import { motion } from 'framer-motion'

const MapSection = () => (
  <section className="py-20 px-4 bg-white" id="contact">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2 className="text-4xl md:text-5xl font-heading font-bold text-primary"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Bizi Tapın
        </motion.h2>
        <motion.div className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3" style={{ maxWidth: 80 }}
          initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2 overflow-hidden h-[450px]"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <iframe
            src="https://www.google.com/maps?q=40.59488850151604,49.666463569392675&z=16&output=embed"
            width="100%" height="100%" style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen loading="lazy" title="Kaffa Cup location" />
        </motion.div>

        <motion.div className="bg-primary rounded-2xl p-8 text-white flex flex-col justify-center gap-5 shadow-lg"
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-2">📍 Ünvan</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              5-ci məhəllə, Azərbaycan prospekti 4<br />Sumqayıt
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-2">📞 Telefon</h4>
            <a href="tel:+994517326959" className="text-white/80 text-sm hover:text-white transition-colors block">+994 51 732 69 59</a>
            <a href="tel:+994556722192" className="text-white/80 text-sm hover:text-white transition-colors block mt-1">+994 55 672 21 92</a>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-2">🕐 İş Saatları</h4>
            <p className="text-white/80 text-sm">Hər gün <span className="text-white font-semibold">08:00 – 00:00</span></p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-2">📷 Instagram</h4>
            <a href="https://www.instagram.com/kaffacupcoffee/" target="_blank" rel="noopener noreferrer"
              className="text-white/80 text-sm hover:text-white transition-colors inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              @kaffacupcoffee
            </a>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-2">🛵 Wolt</h4>
            <a href="https://wolt.com/en/aze/sumgait/restaurant/kaffa-cup" target="_blank" rel="noopener noreferrer"
              className="text-white/80 text-sm hover:text-white transition-colors inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
              Wolt-da sifariş et
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

export default MapSection
