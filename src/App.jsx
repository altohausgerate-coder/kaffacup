import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AdminProvider } from './context/AdminContext'
import { LangProvider } from './context/LangContext'
import Home from './pages/Home'
import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import Orders from './pages/Admin/Orders'
import MenuManager from './pages/Admin/MenuManager'
import Tables from './pages/Admin/Tables'
import Reservations from './pages/Admin/Reservations'
import Analytics from './pages/Admin/Analytics'

const App = () => {
  return (
    <BrowserRouter>
      <LangProvider>
        <AppProvider>
          <AdminProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Login />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/menu" element={<MenuManager />} />
              <Route path="/admin/tables" element={<Tables />} />
              <Route path="/admin/reservations" element={<Reservations />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AdminProvider>
        </AppProvider>
      </LangProvider>
    </BrowserRouter>
  )
}

export default App
