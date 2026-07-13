import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { AdminProvider } from './context/AdminContext'
import { LangProvider } from './context/LangContext'
import { CustomerAuthProvider } from './context/CustomerAuthContext'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import MenuCategoryPage from './pages/MenuCategoryPage'
import GalleryPage from './pages/GalleryPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsPage from './pages/TermsPage'
import CustomerPage from './pages/CustomerPage'
import CashierPage from './pages/CashierPage'
import AdminPage from './pages/AdminPage'
import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import Orders from './pages/Admin/Orders'
import MenuManager from './pages/Admin/MenuManager'
import Tables from './pages/Admin/Tables'
import Analytics from './pages/Admin/Analytics'
import ProductModal from './components/ProductModal'
import ScrollToTop from './components/ScrollToTop'

const GlobalUI = () => {
  const { selectedProduct, setSelectedProduct } = useApp()
  return (
    <AnimatePresence>
      {selectedProduct && (
        <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </AnimatePresence>
  )
}

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:category" element={<MenuCategoryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/mexfilik-siyaseti" element={<PrivacyPolicy />} />
          <Route path="/istifade-sertleri" element={<TermsPage />} />
          <Route path="/hesab" element={<CustomerPage />} />
          <Route path="/kassir" element={<CashierPage />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/panel" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/menu" element={<MenuManager />} />
          <Route path="/admin/tables" element={<Tables />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <GlobalUI />
    </>
  )
}

const App = () => (
  <BrowserRouter>
    <LangProvider>
      <CustomerAuthProvider>
        <AppProvider>
          <AdminProvider>
            <AnimatedRoutes />
          </AdminProvider>
        </AppProvider>
      </CustomerAuthProvider>
    </LangProvider>
  </BrowserRouter>
)

export default App
