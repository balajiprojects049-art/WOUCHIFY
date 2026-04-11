import FeaturedDealSection from '../components/FeaturedDealSection'
import TopDealsSection from '../components/TopDealsSection'
import DealsFilterBar from '../components/DealsFilterBar'
import CategoryTabs from '../components/CategoryTabs'
import TrendingDealsSection from '../components/TrendingDealsSection'
import DealsCatalogSection from '../components/DealsCatalogSection'
import ExclusiveDealsSection from '../components/ExclusiveDealsSection'
import CouponsSection from '../components/CouponsSection'

function DealsPage() {
  return (
    <>
      <main className="mx-auto max-w-[1400px] px-3 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
        <section className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Deals Hub</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">Find Today’s Best Deals, Coupons & Price Drops</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Explore the latest handpicked offers from trusted stores with verified coupon codes, trending products, and limited-time discounts.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            <span className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-ink">Updated Daily</span>
            <span className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-ink">Verified Coupons</span>
            <span className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-ink">Top Brands</span>
          </div>
        </section>

        <DealsFilterBar />
        <TopDealsSection />
        <FeaturedDealSection />
      </main>

      <ExclusiveDealsSection />

      <main className="mx-auto max-w-[1400px] px-3 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <CategoryTabs />
        <TrendingDealsSection />
        <DealsCatalogSection
          label="Newly Added"
          title="Newly Added Deals"
          actionText="View New"
        />
        <CouponsSection />
      </main>
    </>
  )
}

export default DealsPage
