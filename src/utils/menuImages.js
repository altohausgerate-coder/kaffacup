const LOCAL_IMAGE_OVERRIDES = {
  s1: '/images/salat.jpg',
  s2: '/images/salat.jpg',
  s3: '/images/sezar-salati.jpg',
  s4: '/images/salat.jpg',
  sw1: '/images/menu/sandwich-kaffa.png',
  sw2: '/images/menu/sandwich-kaffa.png',
  sw3: '/images/menu/sandwich-meat.png',
  sw4: '/images/menu/sandwich-kaffa.png',
  sw5: '/images/menu/sandwich-meat.png',
  d3: '/images/sniker-tort.jpg',
  ex1: '/images/menu/coffee-latte.png?v=5',
  ex2: '/images/menu/dessert-dondurma-servis.png',
  ex3: '/images/menu/drinks/lemonade-strawberry.png?v=6',
  ex4: '/images/menu/dessert-waffle-shokoladli.png',
  ex5: '/images/menu/coffee-espresso-double.png?v=3',
  ex6: '/images/menu/coffee-latte.png?v=5',
  ex7: '/images/menu/drinks/lemonade-lime.png?v=4',
  ex8: '/images/menu/drinks/lemonade-lime.png?v=4',
  ex9: '/images/menu/coffee-cappuccino.png?v=3',
}

const toFastMenuImage = (src) => {
  if (!src || !src.startsWith('/images/menu/')) return src
  const cleanSrc = src.split('?')[0]
  return cleanSrc
    .replace('/images/menu/', '/images/menu-fast/')
    .replace(/\.(png|jpe?g|webp)$/i, '.jpg')
}

export const getMenuFallbackImage = (item = {}) => {
  const cat = item.category || ''
  if (cat === 'rolls') return '/images/menu/roll-kaffa.jpg'
  if (cat === 'salads') return '/images/menu/salad-meat.png'
  if (cat === 'sandwich') return '/images/menu/sandwich-kaffa.png'
  if (cat === 'bowls') return '/images/menu/bowl-toyuq.jpg'
  if (cat === 'desserts') return '/images/menu/dessert-waffle-shokoladli.png'
  if (cat === 'coffee-hot') return '/images/menu/coffee-latte.png?v=5'
  if (cat === 'coffee-cold') return '/images/menu/kaffa-iced-coffee.jpg?v=2'
  if (cat === 'drinks') return '/images/menu/drinks/lemonade-strawberry.png?v=6'
  if (cat === 'specials') return '/images/menu/specials/special-combo-1.png'
  return '/images/qarisiq-yemek-asli.jpg'
}

export const getMenuImageSrc = (item = {}, forceFallback = false) => {
  if (!forceFallback && LOCAL_IMAGE_OVERRIDES[item.id]) return toFastMenuImage(LOCAL_IMAGE_OVERRIDES[item.id])
  const src = item.img
  if (forceFallback || !src || typeof src !== 'string') return toFastMenuImage(getMenuFallbackImage(item))
  return src.startsWith('http') ? toFastMenuImage(getMenuFallbackImage(item)) : toFastMenuImage(src)
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
