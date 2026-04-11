import HeroSection from '../components/HeroSection'
import TrustBadgesSection from '../components/TrustBadgesSection'
import TopStoresSection from '../components/TopStoresSection'

import UserGuideSection from '../components/UserGuideSection'
import ExclusiveDealsSection from '../components/ExclusiveDealsSection'
import JustInPromoSection from '../components/JustInPromoSection'
import GiveawaySection from '../components/GiveawaySection'
import FAQSection from '../components/FAQSection'
import AdvertiseWithUsSection from '../components/AdvertiseWithUsSection'
import BenefitsTicker from '../components/BenefitsTicker'
import TelegramBanner from '../components/TelegramBanner'
import AdZone from '../components/AdZone'

/**
 * USER JOURNEY (Critical Order):
 * 1. Hero → Understand the platform + CTAs
 * 2. Trust Badges → Build instant credibility
 * 3. How It Works → Concept clarity
 * 4. Featured Deals → Start browsing
 * 5. Top Stores → Explore brands
 * 6. Daily Rewards / Spin Wheel → Engagement hook
 * 7. Exclusive Deals → Deep content
 * 8. User Guide → Quick start clarity
 * 9. Just In Promos + Giveaways → More content
 * 10. FAQ → Address doubts
 * 11. Advertise + Telegram + Benefits → Community & trust
 */

function HomePage() {
  return (
    <div className="flex flex-col pb-8 sm:pb-12">
      <main className="mx-auto flex w-full flex-col gap-8 max-w-6xl px-4 pt-4 sm:gap-12 sm:px-6 sm:pt-6 lg:px-8">

        {/* STEP 1: Land & Understand */}
        <HeroSection />

        {/* STEP 2: Trust instantly */}
        <TrustBadgesSection />

        {/* AD Zone */}
        <AdZone position="home_middle" />

        {/* STEP 5: Explore top stores */}
        <TopStoresSection />



      </main>

      {/* STEP 7: Exclusive full-width deals */}
      <ExclusiveDealsSection />

      <main className="mx-auto flex w-full flex-col gap-8 max-w-6xl px-4 pt-8 sm:gap-12 sm:px-6 sm:pt-12 lg:px-8">

        {/* STEP 8: User Guide — quick start */}
        <UserGuideSection />

        {/* STEP 9: More content */}
        <JustInPromoSection />
        <GiveawaySection />

        {/* STEP 10: Community & Brand trust */}
        <AdvertiseWithUsSection />
        <BenefitsTicker />
        <TelegramBanner />

        {/* STEP 11: FAQ — last thing before footer */}
        <FAQSection />

      </main>
    </div>
  )
}

export default HomePage
