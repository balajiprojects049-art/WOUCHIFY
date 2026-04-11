import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Deals from './pages/Deals'
import Stores from './pages/Stores'
import StoreDetail from './pages/StoreDetail'
import DealDetail from './pages/DealDetail'
import LootDeals from './pages/LootDeals'
import LootDealDetail from './pages/LootDealDetail'
import AboutContact from './pages/AboutContact'
import CreditCards from './pages/CreditCards'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import FaqPage from './pages/FaqPage'
import Giveaways from './pages/Giveaways'
import Coupons from './pages/Coupons'
import Categories from './pages/Categories'
import CategoryResults from './pages/CategoryResults'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminDeals from './admin/pages/AdminDeals'
import AdminLootDeals from './admin/pages/AdminLootDeals'
import AdminStores from './admin/pages/AdminStores'
import AdminCoupons from './admin/pages/AdminCoupons'
import AdminCreditCards from './admin/pages/AdminCreditCards'
import AdminGiveaways from './admin/pages/AdminGiveaways'
import AdminBanners from './admin/pages/AdminBanners'
import AdminMembers from './admin/pages/AdminMembers'
import AdminSettings from './admin/pages/AdminSettings'
import AdminAnalytics from './admin/pages/AdminAnalytics'
import AdminExpiryAlerts from './admin/pages/AdminExpiryAlerts'
import AdminBulkImport from './admin/pages/AdminBulkImport'


import AdminAdvertisements from './admin/pages/AdminAdvertisements'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

import AdZone from './components/AdZone'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <AdZone position="global_top" className="mx-auto max-w-7xl px-6 pt-6" />
      {children}
      <div className="mx-auto max-w-7xl px-6">
        <AdZone position="global_bottom" />
      </div>

      {/* Floating Bottom Right Ads */}
      <div className="fixed bottom-24 right-4 z-40 w-[85vw] max-w-[320px] sm:bottom-4 drop-shadow-2xl animate-[slideInUp_0.5s_ease-out_forwards]">
        <AdZone position="floating_bottom_right" />
      </div>


      <Footer />
    </div>
  )
}

function AppRoutes() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {isAdmin ? (
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/deals" element={<AdminDeals />} />
          <Route path="/admin/loot-deals" element={<AdminLootDeals />} />
          <Route path="/admin/stores" element={<AdminStores />} />
          <Route path="/admin/coupons" element={<AdminCoupons />} />
          <Route path="/admin/credit-cards" element={<AdminCreditCards />} />
          <Route path="/admin/giveaways" element={<AdminGiveaways />} />
          <Route path="/admin/banners" element={<AdminBanners />} />
          <Route path="/admin/advertisements" element={<AdminAdvertisements />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/expiry-alerts" element={<AdminExpiryAlerts />} />
          <Route path="/admin/bulk-import" element={<AdminBulkImport />} />

          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      ) : (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deal/:dealSlug" element={<DealDetail />} />
            <Route path="/loot-deals" element={<LootDeals />} />
            <Route path="/loot-deal/:lootDealId" element={<LootDealDetail />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/store/:storeName" element={<StoreDetail />} />
            <Route path="/about-contact" element={<AboutContact />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/giveaways" element={<Giveaways />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category-results" element={<CategoryResults />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PublicLayout>
      )}
    </>
  )
}

function App() {
  return (
    <DataProvider>
      <AppRoutes />
    </DataProvider>
  )
}

export default App
