import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import FeaturedDealSection from '../components/FeaturedDealSection'
import StoreCard from '../components/StoreCard'
import { storesData } from '../data/storesData'

function Home() {
  const featuredStore = storesData[0]
  const remainingStores = storesData.slice(1, 10)

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <HeroSection />
      <FeaturedDealSection />

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-ink">Top Stores</h2>
          <Link to="/stores" className="text-sm font-semibold text-gold">
            View All
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:row-span-2">
              <StoreCard store={featuredStore} featured />
            </div>

            {remainingStores.map((store) => (
              <StoreCard key={store.slug} store={store} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
