import {
  rollsItems, saladItems, sandwichItems, bowlItems, dessertItems,
  classicCoffee, alternativeCoffee, icedCoffee,
  lemonadeItems, smoothieItems, iceTeaItems,
  cocktailItems, mocktailItems,
  milkshakeItems, extraBarItems, teaItems, allMenuItems,
  bubbleTeaItems, freshItems, coffeeBeanItems,
} from './menuData'

export const menuGroupTabs = [
  { id: 'all', labelKey: 'menu.cat.all' },
  { id: 'drinks', labelKey: 'menu.cat.drinks' },
  { id: 'foods', labelKey: 'menu.group.foods' },
  { id: 'desserts', labelKey: 'menu.cat.desserts' },
  { id: 'extra-bar', labelKey: 'menu.sec.extrabar' },
  { id: 'specials', labelKey: 'menu.group.specials' },
]

export const specialOfferItems = allMenuItems.filter(item => item.popular)

export const menuDisplaySections = [
  { id: 'hot-coffee', tabs: ['all', 'drinks'], titleKey: 'menu.sec.classic', items: classicCoffee, emoji: '☕' },
  { id: 'alt-coffee', tabs: ['all', 'drinks'], titleKey: 'menu.sec.alt', items: alternativeCoffee, emoji: '☕' },
  { id: 'cold-coffee', tabs: ['all', 'drinks'], titleKey: 'menu.heading.coldcoffee', items: icedCoffee, emoji: '🧊' },
  { id: 'smoothies', tabs: ['all', 'drinks'], titleKey: 'menu.sec.smoothies', items: smoothieItems, emoji: '🥤' },
  { id: 'lemonade', tabs: ['all', 'drinks'], titleKey: 'menu.sec.lemonade', items: lemonadeItems, emoji: '🍋' },
  { id: 'iced-tea', tabs: ['all', 'drinks'], titleKey: 'menu.sec.icetea', items: iceTeaItems, emoji: '🧊' },
  { id: 'cocktails', tabs: ['all', 'drinks'], titleKey: 'menu.sec.cocktails', items: cocktailItems, emoji: '🍹' },
  { id: 'mocktails', tabs: ['all', 'drinks'], titleKey: 'menu.sec.mocktails', items: mocktailItems, emoji: '🍸' },
  { id: 'milkshakes', tabs: ['all', 'drinks'], titleKey: 'menu.sec.milkshakes', items: milkshakeItems, emoji: '🥛' },
  { id: 'tea', tabs: ['all', 'drinks'], titleKey: 'menu.sec.tea', items: teaItems, emoji: '🍵' },
  { id: 'bubble-tea', tabs: ['all', 'drinks'], titleKey: 'menu.sec.bubbletea', items: bubbleTeaItems, emoji: '🧋' },
  { id: 'fresh', tabs: ['all', 'drinks'], titleKey: 'menu.sec.fresh', items: freshItems, emoji: '🍊' },
  { id: 'coffee-beans', tabs: ['all', 'drinks'], titleKey: 'menu.sec.coffeebeans', items: coffeeBeanItems, emoji: '🫘', renderAs: 'list' },
  { id: 'extra-bar', tabs: ['all', 'extra-bar'], titleKey: 'menu.sec.extrabar', items: extraBarItems, emoji: '+', renderAs: 'list' },
  { id: 'rolls', tabs: ['all', 'foods'], titleKey: 'menu.heading.rolls', items: rollsItems, emoji: '🌯' },
  { id: 'salads', tabs: ['all', 'foods'], titleKey: 'menu.heading.salads', items: saladItems, emoji: '🥗' },
  { id: 'sandwich', tabs: ['all', 'foods'], titleKey: 'menu.heading.sandwich', items: sandwichItems, emoji: '🥖' },
  { id: 'bowls', tabs: ['all', 'foods'], titleKey: 'menu.heading.bowls', items: bowlItems, emoji: '🥙' },
  { id: 'desserts', tabs: ['all', 'desserts'], titleKey: 'menu.heading.desserts', items: dessertItems, emoji: '🍰' },
  { id: 'specials', tabs: ['all', 'specials'], titleKey: 'menu.heading.specials', items: specialOfferItems, emoji: '⭐', renderAs: 'specials' },
]

export const allMenuDisplayItems = menuDisplaySections.flatMap(section => section.items)

export const getSectionsForTab = (tabId = 'all') => (
  menuDisplaySections.filter(section => section.tabs.includes(tabId) && section.items.length > 0)
)

export const routeCategoryToMenuTab = (category = 'all') => {
  if (['all', 'drinks', 'foods', 'desserts', 'extra-bar', 'specials'].includes(category)) return category
  if (['coffee-hot', 'coffee-cold', 'drinks'].includes(category)) return 'drinks'
  if (['rolls', 'salads', 'sandwich', 'bowls'].includes(category)) return 'foods'
  if (category === 'desserts') return 'desserts'
  return 'all'
}
