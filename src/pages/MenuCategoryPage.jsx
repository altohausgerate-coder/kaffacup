import { useParams } from 'react-router-dom'
import { routeCategoryToMenuTab } from '../data/menuDisplay'
import MenuPage from './MenuPage'

export default function MenuCategoryPage() {
  const { category } = useParams()
  return <MenuPage initialTab={routeCategoryToMenuTab(category)} />
}
