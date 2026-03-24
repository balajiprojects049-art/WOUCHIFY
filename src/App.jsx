import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DealsPage from './pages/DealsPage'
import MobileBottomNav from './components/MobileBottomNav'

function App() {
  return (
    <div className="min-h-screen bg-cream pb-20 md:pb-0">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default App
