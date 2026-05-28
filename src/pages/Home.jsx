import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { ExteriorPhotos, TeamSection } from '../components/Footer'
import MenuSection from '../components/MenuSection'
import TableMap from '../components/TableMap'
import MapSection from '../components/MapSection'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MenuSection />
      <TeamSection />
      <ExteriorPhotos />
      <TableMap />
      <MapSection />
      <Footer />
      <Cart />
    </div>
  )
}

export default Home
