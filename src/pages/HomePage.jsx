import HeroSection from '../components/HeroSection'
import BenefitsTicker from '../components/BenefitsTicker'
import FeaturedDealSection from '../components/FeaturedDealSection'
import TopStoresSection from '../components/TopStoresSection'
import DealsFilterBar from '../components/DealsFilterBar'
import CategoryTabs from '../components/CategoryTabs'
import JustInPromoSection from '../components/JustInPromoSection'
import GiveawaySection from '../components/GiveawaySection'
import TelegramBanner from '../components/TelegramBanner'
import ExclusiveDealsSection from '../components/ExclusiveDealsSection'
import AdvertiseWithUsSection from '../components/AdvertiseWithUsSection'
import LatestDealsSection from '../components/LatestDealsSection'

function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-3 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
        <HeroSection />
        <BenefitsTicker />
        <FeaturedDealSection />
        <TopStoresSection />
        <DealsFilterBar />
        <CategoryTabs />
        <LatestDealsSection />
      </main>

      <ExclusiveDealsSection />

      <main className="mx-auto max-w-6xl px-3 py-12 sm:px-6 sm:py-14 lg:px-8">
        <JustInPromoSection />
        <GiveawaySection />
        <AdvertiseWithUsSection />
        <TelegramBanner />
      </main>
    </>
  )
}

export default HomePage
