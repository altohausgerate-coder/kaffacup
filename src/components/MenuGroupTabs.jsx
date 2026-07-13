import { CakeSlice, CircleStar, CupSoda, Grid3X3, PlusCircle, Utensils } from 'lucide-react'
import { motion } from 'framer-motion'
import { menuGroupTabs } from '../data/menuDisplay'
import { useLang } from '../context/LangContext'

const icons = {
  all: Grid3X3,
  drinks: CupSoda,
  foods: Utensils,
  desserts: CakeSlice,
  'extra-bar': PlusCircle,
  specials: CircleStar,
}

const localeMap = {
  az: 'az-AZ',
  ru: 'ru-RU',
  en: 'en-US',
}

export default function MenuGroupTabs({ activeTab, onChange, layoutId = 'menuGroupTab' }) {
  const { lang, t } = useLang()

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max items-center gap-1 px-2 sm:justify-center md:gap-2 md:px-0">
        {menuGroupTabs.map((tab) => {
          const Icon = icons[tab.id]
          const active = activeTab === tab.id
          const label = t(tab.labelKey).toLocaleUpperCase(localeMap[lang] || 'en-US')

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative flex min-h-[50px] md:min-h-[58px] items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2.5 md:py-3 text-[11px] sm:text-[13px] md:text-[17px] font-extrabold uppercase transition-colors ${
                active ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
              style={{ letterSpacing: 0 }}
            >
              {active && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={2.4}
                className={`shrink-0 ${active ? 'text-primary' : 'text-gray-500'}`}
                aria-hidden="true"
              />
              <span className="relative whitespace-nowrap leading-none">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
