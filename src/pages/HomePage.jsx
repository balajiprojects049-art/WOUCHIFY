import HeroSection from '../components/HeroSection'
import TrustBadgesSection from '../components/TrustBadgesSection'
import TopStoresSection from '../components/TopStoresSection'
import LatestDealsSection from '../components/LatestDealsSection'
import TrendingDealsSection from '../components/TrendingDealsSection'
import LatestLootDealsSection from '../components/LatestLootDealsSection'
import ExclusiveDealsSection from '../components/ExclusiveDealsSection'
import TopCreditCardsSection from '../components/TopCreditCardsSection'
import NewsTickerSection from '../components/NewsTickerSection'
import AdZone from '../components/AdZone'
import CreditCardAdBanner from '../components/CreditCardAdBanner'
import AdImageBanner from '../components/AdImageBanner'
import SEO from '../components/SEO'

/**
 * USER JOURNEY (Critical Order):
 * 1. Hero → Understand the platform + CTAs
 * 2. Trust Badges → Build instant credibility
 * 3. Top Stores → Explore brands
 * 4. Latest Deals → Newest deals auto-updated
 * 5. Trending Deals → What people are grabbing
 * 6. Latest Loot Deals → Hottest loot section
 * 7. Exclusive Deals (full-width) → Deep content
 * 8. Advertise + FAQ → Community & trust
 */

function HomePage() {
  const sectionCls = "w-full py-12 sm:py-16"
  const containerCls = "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"

  return (
    <div className="flex flex-col bg-cream transition-colors duration-500">
      <SEO 
        title="Home"
        description="Save big with Wouchify! Discover verified deals, loot offers, and coupons from top Indian stores like Amazon, Flipkart, Myntra, and more. Your one-stop destination for ultimate savings."
        keywords="deals, coupons, India, discounts, loot deals, Amazon offers, Flipkart coupons, Wouchify"
      />
      {/* 1. HERO SECTION */}
      <section className="w-full bg-white">
        <div className={containerCls}>
          <HeroSection />
        </div>
      </section>

      {/* NEW: NEWS READER TICKER - Key Points */}
      <NewsTickerSection />

      {/* 2. TRUST SECTION - Professional Verification */}
      <section className="w-full bg-white border-b border-line/10 py-10 sm:py-12">
        <div className={containerCls}>
          <TrustBadgesSection />
        </div>
      </section>

      {/* 3. TOP STORES */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-8 w-1.5 rounded-full bg-gold" />
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">Shop by top Stores</h2>
          </div>
          <TopStoresSection />
        </div>
      </section>

      {/* 4. RECENTLY ADDED DEALS (Using bg-surface for subtle contrast in dark) */}
      <section className={`${sectionCls} bg-surface border-y border-line/30`}>
        <div className={containerCls}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-8 w-1.5 rounded-full bg-gold" />
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">Recently Added Deals</h2>
          </div>
          <LatestDealsSection />
        </div>
      </section>

      {/* 5. TRENDING DEALS */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-8 w-1.5 rounded-full bg-gold" />
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">Trending Best Sellers</h2>
          </div>
          <TrendingDealsSection />
        </div>
      </section>

      {/* 6. LOOT DEALS (Using bg-surface for subtle contrast in dark) */}
      <section className={`${sectionCls} bg-surface border-y border-line/30`}>
        <div className={containerCls}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-8 w-1.5 rounded-full bg-gold" />
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">Flash Loot Offers</h2>
          </div>
          <LatestLootDealsSection />
        </div>
      </section>

      {/* ADVERTISEMENT IMAGE BANNER */}
      <AdImageBanner />

      {/* 7. EXCLUSIVE LOOT (Stays as a specialized highlight) */}
      <ExclusiveDealsSection />

      {/* 8. CREDIT CARDS */}
      <section className={`${sectionCls} mb-12`}>
        <div className={containerCls}>
          <CreditCardAdBanner />
        </div>
      </section>
    </div>
  )
}

export default HomePage
