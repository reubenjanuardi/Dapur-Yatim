import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ActivitiesPage from './pages/ActivitiesPage.jsx'
import DonationPage from './pages/DonationPage.jsx'
import TransparencyPage from './pages/TransparencyPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AdminLoginPage from './pages/admin/LoginPage.jsx'
import AdminDashboardPage from './pages/admin/DashboardPage.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'

function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/tentang" element={<AboutPage />} />
      <Route path="/kegiatan" element={<ActivitiesPage />} />
      <Route path="/donasi" element={<DonationPage />} />
      <Route path="/transparansi" element={<TransparencyPage />} />
      <Route path="/kontak" element={<ContactPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Redirect /admin ke /admin/dashboard */}
      <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
    </Routes>
  )
}

export default Router
