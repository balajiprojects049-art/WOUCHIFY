import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Deals from './pages/Deals'
import Stores from './pages/Stores'
import StoreDetail from './pages/StoreDetail'
import DealDetail from './pages/DealDetail'
import LootDeals from './pages/LootDeals'
import LootDealDetail from './pages/LootDealDetail'
import MobileBottomNav from './components/MobileBottomNav'
import AboutContact from './pages/AboutContact'
import CreditCards from './pages/CreditCards'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import Giveaways from './pages/Giveaways'
import Coupons from './pages/Coupons'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="min-h-screen bg-cream pb-20 md:pb-0">
      <ScrollToTop />
      <Navbar />

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default App
