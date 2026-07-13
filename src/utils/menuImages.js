const MENU_IMAGE_VERSION = '20260713-6'

const LOCAL_IMAGE_OVERRIDES = {
  s1: '/images/qarisiq-yemek-asli.jpg',
  s2: '/images/salat.jpg',
  s3: '/images/sezar-salati.jpg',
  s4: '/images/salat.jpg',
  s5: '/images/menu/salad-meat.jpg',
  sw1: '/images/menu/sandwich-kaffa.png',
  sw2: '/images/menu/sandwich-kaffa.png',
  sw3: '/images/menu/sandwich-meat.png',
  sw4: '/images/menu/sandwich-kaffa.png',
  sw5: '/images/menu/sandwich-meat.png',
  sw6: '/images/menu/sandwich-meat.png',
  sw7: '/images/menu/sandwich-cheese.png',
  sw8: '/images/menu/sandwich-kaffa.png',
  sw9: '/images/menu/bagette-vegeterian.png',
  d3: '/images/sniker-tort.jpg',
  d8: '/images/menu/dessert-waffle-shokoladli.png',
  d9: '/images/menu/dessert-waffle-meyveli.png',
  d10: '/images/menu/dessert-waffle-dondurmali-sade.png',
  d11: '/images/menu/dessert-waffle-dondurmali-shokoladli.png',
  d5: '/images/menu/dessert-dondurma-maras.png',
  d6: '/images/menu/dessert-dondurma-servis.png',
  ex1: '/images/menu/coffee-latte.png',
  ex2: '/images/menu/dessert-dondurma-servis.png',
  ex3: '/images/menu/drinks/lemonade-strawberry.png',
  ex4: '/images/menu/dessert-waffle-shokoladli.png',
  ex5: '/images/menu/coffee-espresso-double.png',
  ex6: '/images/menu/coffee-latte.png',
  ex7: '/images/menu/drinks/lemonade-lime.png',
  ex8: '/images/menu/drinks/lemonade-lime.png',
  ex9: '/images/menu/coffee-cappuccino.png',
}

const toFastMenuImage = (src) => {
  if (!src || !src.startsWith('/images/menu/')) return src
  const cleanSrc = src.split('?')[0]
  return cleanSrc
    .replace('/images/menu/', '/images/menu-fast/')
    .replace(/\.(png|jpe?g|webp)$/i, '.jpg')
}

const withVersion = (src) => {
  if (!src || typeof src !== 'string') return src
  const base = src.split('?')[0]
  return `${base}?v=${MENU_IMAGE_VERSION}`
}

const versionedMenuAsset = (src) => withVersion(toFastMenuImage(src))

export const getMenuFallbackImage = (item = {}) => {
  const cat = item.category || ''
  if (cat === 'rolls') return '/images/menu/roll-kaffa.jpg'
  if (cat === 'salads') return '/images/salat.jpg'
  if (cat === 'sandwich') return '/images/menu/sandwich-kaffa.png'
  if (cat === 'bowls') return '/images/menu/bowl-toyuq.jpg'
  if (cat === 'desserts') return '/images/sniker-tort.jpg'
  if (cat === 'coffee-hot') return '/images/menu/coffee-latte.png'
  if (cat === 'coffee-cold') return '/images/menu/kaffa-iced-coffee.jpg'
  if (cat === 'drinks') return '/images/menu/drinks/lemonade-strawberry.png'
  if (cat === 'specials') return '/images/menu/specials/special-combo-1.png'
  return '/images/qarisiq-yemek-asli.jpg'
}

export const getMenuImageSrc = (item = {}, forceFallback = false) => {
  if (!forceFallback && LOCAL_IMAGE_OVERRIDES[item.id]) return versionedMenuAsset(LOCAL_IMAGE_OVERRIDES[item.id])
  const src = item.img
  if (forceFallback || !src || typeof src !== 'string') return versionedMenuAsset(getMenuFallbackImage(item))
  return src.startsWith('http') ? versionedMenuAsset(getMenuFallbackImage(item)) : versionedMenuAsset(src)
}

export const getMenuPreloadImages = (sections = [], limit = 8) => {
  const seen = new Set()
  return sections
    .flatMap(section => section.items || [])
    .map(item => getMenuImageSrc(item))
    .filter((src) => {
      if (!src || seen.has(src)) return false
      seen.add(src)
      return true
    })
    .slice(0, limit)
}
