import { createContext, useContext, useState } from 'react'

const translations = {
  az: {
    'nav.menu': 'Menyu',
    'nav.gallery': 'Qalereya',
    'nav.reservation': 'Rezervasiya',
    'nav.team': 'Kollektivimiz',
    'nav.contact': 'Əlaqə',
    'hero.subtitle': 'Hər Gün Yeni Bir Dadla Başla',
    'menu.title': 'Menyu',
    'gallery.title': 'Bizi Ziyarət Edin',
    'gallery.subtitle': 'Sumqayıtın ən isti məkanı',
    'team.title': 'Kollektivimiz',
    'team.subtitle': 'Kaffa Cup ailəsi',
  },
  ru: {
    'nav.menu': 'Меню',
    'nav.gallery': 'Галерея',
    'nav.reservation': 'Резервация',
    'nav.team': 'Коллектив',
    'nav.contact': 'Контакт',
    'hero.subtitle': 'Начни каждый день с нового вкуса',
    'menu.title': 'Меню',
    'gallery.title': 'Посетите нас',
    'gallery.subtitle': 'Самое уютное место Сумгайыта',
    'team.title': 'Наша команда',
    'team.subtitle': 'Семья Kaffa Cup',
  },
  en: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservation': 'Reservation',
    'nav.team': 'Our Team',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Start Every Day with a New Taste',
    'menu.title': 'Menu',
    'gallery.title': 'Visit Us',
    'gallery.subtitle': 'The warmest place in Sumgait',
    'team.title': 'Our Team',
    'team.subtitle': 'Kaffa Cup family',
  },
}

const LangContext = createContext()

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('az')
  const t = (key) => translations[lang]?.[key] || key
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
