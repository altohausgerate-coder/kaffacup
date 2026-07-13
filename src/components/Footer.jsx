import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, ShoppingBag, ArrowUp, MapPin, Phone } from 'lucide-react'
import GoatLogo from './GoatLogo'
import { useLang } from '../context/LangContext'

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const ExteriorPhotos = () => {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0.3, 0.5], [0, -30])
  const y2 = useTransform(scrollYProgress, [0.35, 0.55], [0, -20])
  const y3 = useTransform(scrollYProgress, [0.4, 0.6], [0, -40])
  const { t } = useLang()

  const exteriorCards = [
    {
      label: t('gallery.card1.label'),
      sub: t('gallery.card1.sub'),
      image: '/İmages/gallery1.jpg.webp',
    },
    {
      label: t('gallery.card2.label'),
      sub: t('gallery.card2.sub'),
      image: '/İmages/gallery2.jpg.webp',
    },
    {
      label: t('gallery.card3.label'),
      sub: t('gallery.card3.sub'),
      image: '/İmages/gallery3.jpg.webp',
    },
  ]

  return (
    <section className="py-14 sm:py-20 px-4 bg-mint" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('gallery.title')}
          </motion.h2>
          <motion.p className="mx-auto max-w-sm text-gray-400 mt-2 text-sm sm:text-base font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            {t('gallery.subtitle')}
          </motion.p>
          <motion.div className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3" style={{ maxWidth: 80 }}
            initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {exteriorCards.map((card, i) => {
            const y = [y1, y2, y3][i]
            return (
              <motion.div key={i}
                className="relative h-[320px] sm:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 150 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" style={{ y }} />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-[2]" style={{ y }}>
                  <GoatLogo size={40} animate={false} />
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-[2] text-white" style={{ y }}>
                  <p className="font-heading font-bold text-xl sm:text-2xl drop-shadow-lg">{card.label}</p>
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
    <section className="py-12 sm:py-16 px-4 bg-mint" id="team">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-2 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('team.title')}
          </motion.h2>
          <motion.p className="text-gray-400 font-body mb-6 sm:mb-8 text-sm sm:text-base text-center"
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
  const { t } = useLang()
  const year = new Date().getFullYear()

  const pages = [
    { label: t('footer.nav.menu'), to: '/menu', reloadDocument: true },
    { label: t('footer.nav.gallery'), to: '/gallery' },
    { label: t('footer.nav.team'), to: '/team' },
    { label: t('footer.nav.contact'), to: '/contact' },
    { label: t('footer.nav.careers'), to: '/careers' },
  ]

  const company = [
    { label: t('terms.nav.privacy'), to: '/mexfilik-siyaseti' },
    { label: t('terms.nav.terms'), to: '/istifade-sertleri' },
  ]

  const socialLinks = [
    { icon: <InstagramIcon className="size-4" />, href: 'https://www.instagram.com/kaffacupcoffee/' },
    { icon: <MessageCircle className="size-4" />, href: 'https://wa.me/994517326959' },
    { icon: <ShoppingBag className="size-4" />, href: 'https://wolt.com/en/aze/sumgait/restaurant/kaffa-cup' },
  ]

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-[#faf8f4] px-4 py-10 sm:py-14">
      <motion.div
        className="relative mx-auto max-w-4xl border-y border-primary/10 md:border-x"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-6 sm:p-8">
          {/* Logo + description + socials */}
          <div className="sm:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <GoatLogo size={36} animate={false} />
              <span className="font-heading font-bold text-primary">KAFFA CUP</span>
            </div>
            <p className="max-w-sm text-sm text-gray-500 font-body">{t('footer.desc')}</p>
            <p className="text-xs text-gray-400">
              {t('footer.hours.label')} <span className="font-semibold text-gray-600">{t('footer.hours.value')}</span>
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-primary/15 p-1.5 text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <span className="mb-1 block text-xs uppercase tracking-wide text-gray-400">{t('footer.links')}</span>
            <div className="flex flex-col gap-1">
              {pages.map((l, i) => (
                <Link
                  key={i}
                  to={l.to}
                  reloadDocument={l.reloadDocument}
                  className="w-max py-1 text-sm text-gray-600 duration-200 hover:text-primary hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <span className="mb-1 block text-xs uppercase tracking-wide text-gray-400">{t('footer.company')}</span>
            <div className="flex flex-col gap-1 mb-4">
              {company.map((l, i) => (
                <Link key={i} to={l.to} className="w-max py-1 text-sm text-gray-600 duration-200 hover:text-primary hover:underline">
                  {l.label}
                </Link>
              ))}
            </div>

            <span className="mb-1 block text-xs uppercase tracking-wide text-gray-400">{t('footer.contact')}</span>
            <div className="flex flex-col gap-1.5">
              <a
                href="https://www.google.com/maps?q=40.5948822,49.6658407"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-max items-center gap-1.5 py-1 text-sm text-gray-600 hover:text-primary hover:underline"
              >
                <MapPin className="size-3.5 shrink-0" />
                {t('footer.maps')}
              </a>
              <a href="tel:+994517326959" className="inline-flex w-max items-center gap-1.5 py-1 text-sm text-gray-600 hover:text-primary hover:underline">
                <Phone className="size-3.5 shrink-0" />
                +994 51 732 69 59
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 px-6 py-5 sm:px-8">
          <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs font-light text-gray-400 sm:text-left">
              {t('footer.copyright').replace('2026', String(year))}
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Yuxarı qayıt"
              className="flex size-9 items-center justify-center rounded-full border border-primary/15 text-gray-400 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

const IntroVideo = () => {
  return (
    <section className="bg-mint" id="intro-video">
      <div className="flex justify-center px-4 py-8 sm:py-10">
        <motion.div
          className="w-full max-w-[800px]"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <video controls loop playsInline
            className="w-full aspect-video rounded-xl sm:rounded-2xl object-cover shadow-xl">
            <source src="/kaffa-intro.mp4.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  )
}

const reviews = [
  { name: 'Aytən M.', stars: 5, text: 'Atmosfer çox rahatdır, qəhvə əla keyfiyyətdədir. Mütləq tövsiyə edirəm!' },
  { name: 'Rauf H.', stars: 5, text: 'Sumqayıtda ən yaxşı kafe. Qəhvələr təzə və dadlıdır, xidmət çox səliqəlidir.' },
  { name: 'Nigar S.', stars: 4, text: 'Çox gözəl dizayn, rahat oturacaqlar. Qəhvə seçimi genişdir.' },
  { name: 'Elnur K.', stars: 5, text: 'Açıq teras çox xoşuma gəldi. Gecə atmosferi ayrıca gözəldir.' },
  { name: 'Leyla B.', stars: 5, text: 'Hər dəfə gələndə eyni keyfiyyət. Kaffa Cup Sumqayıtın vizit kartıdır!' },
]

const googleMapsUrl = 'https://www.google.com/maps?q=KaffaCup+Coffee,+13/16,+16+Azerbaijan+Ave,+Sumqayit+5000&ftid=0x403097004abc6a65:0x8a5638680d63973b'

const Reviews = () => {
  const { t } = useLang()
  return (
    <section className="py-12 sm:py-16 px-4 bg-cream" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('reviews.title')}
          </motion.h2>
          <motion.div className="flex items-center justify-center gap-2 mt-2"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="text-sm text-gray-500 font-body">Google Maps</span>
          </motion.div>
          <motion.div className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3" style={{ maxWidth: 80 }}
            initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <motion.div key={i}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
            >
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }, (_, s) => (
                  <svg key={s} className={`w-5 h-5 ${s < r.stars ? 'fill-yellow-400' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                  <svg className="w-3 h-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </span>
              </div>
              <p className="text-gray-600 font-body text-sm leading-relaxed mb-4 flex-1">{r.text}</p>
              <p className="font-heading font-bold text-primary">{r.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-body text-sm hover:bg-primary-dark transition-colors shadow-md">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {t('reviews.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export { ExteriorPhotos, TeamSection, IntroVideo, Reviews }
export default Footer
