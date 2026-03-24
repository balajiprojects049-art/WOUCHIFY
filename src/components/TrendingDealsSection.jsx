import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getDealPathByTitle } from '../data/dealsData'

const products = [
  {
    title: 'Nike Air Zoom Pegasus',
    price: '₹89.99',
    discount: '32% OFF',
    discountValue: 32,
    store: 'Myntra',
    category: 'Fashion',
    dealType: 'Loot Deals',
    expiresIn: 7265,
    viewers: '2.4k',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Minimal Desk Clock',
    price: '₹39.99',
    discount: '20% OFF',
    discountValue: 20,
    store: 'Amazon',
    category: 'Lifestyle',
    dealType: 'Coupon Deals',
    expiresIn: 4980,
    viewers: '1.6k',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Pro Gaming Headset',
    price: '₹119.99',
    discount: '41% OFF',
    discountValue: 41,
    store: 'Croma',
    category: 'Electronics',
    dealType: 'Flash Deals',
    expiresIn: 9540,
    viewers: '3.1k',
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Performance Laptop Sleeve',
    price: '₹29.99',
    discount: '18% OFF',
    discountValue: 18,
    store: 'Flipkart',
    category: 'Electronics',
    dealType: 'Loot Deals',
    expiresIn: 3720,
    viewers: '1.1k',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  },
]

function formatCountdown(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds].map((time) => String(time).padStart(2, '0')).join(':')
}

function TrendingCard({ item, elapsedSeconds, onViewDeal }) {
  const remainingSeconds = item.expiresIn - elapsedSeconds

  return (
    <article className="min-w-[260px] rounded-2xl bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md sm:min-w-0 sm:p-4">
      <div className="overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.title}
          className="h-40 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105 sm:h-48"
        />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink sm:mt-5">{item.title}</h3>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-base font-bold text-ink">{item.price}</p>
        <p className="rounded-full bg-gold/20 px-2 py-1 text-xs font-semibold text-gold">{item.discount}</p>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-cream px-2.5 py-2">
        <p className="text-[11px] font-semibold text-ink">
          Expires in <span className="text-gold">{formatCountdown(remainingSeconds)}</span>
        </p>

        <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M10 3c-4.8 0-8.7 3-9.9 7 1.2 4 5.1 7 9.9 7s8.7-3 9.9-7c-1.2-4-5.1-7-9.9-7Zm0 11.5A4.5 4.5 0 1 1 10 5a4.5 4.5 0 0 1 0 9.5Zm0-7.3a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
          </svg>
          {item.viewers} used
        </p>
      </div>

      <button onClick={() => onViewDeal(item.title)} className="mt-4 w-full rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105">
        View Deal
      </button>
    </article>
  )
}

function TrendingDealsSection() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const selectedCategory = searchParams.get('category')
  const selectedStore = searchParams.get('store')
  const selectedDealType = searchParams.get('dealType')
  const selectedMinDiscount = Number.parseInt((searchParams.get('minDiscount') || '').replace('%+', ''), 10)
  const selectedQuery = (searchParams.get('q') || '').trim().toLowerCase()

  const filteredProducts = products.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesStore = !selectedStore || item.store === selectedStore
    const matchesDealType = !selectedDealType || item.dealType === selectedDealType
    const matchesDiscount = Number.isNaN(selectedMinDiscount) || item.discountValue >= selectedMinDiscount
    const matchesQuery = !selectedQuery || item.title.toLowerCase().includes(selectedQuery)

    return matchesCategory && matchesStore && matchesDealType && matchesDiscount && matchesQuery
  })

  const handleViewDeal = (title) => {
    navigate(getDealPathByTitle(title))
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="mt-14 sm:mt-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Trending Deals</h2>
        <Link to="/deals" className="text-sm font-semibold text-gold">
          View all
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
        {filteredProducts.map((item) => (
          <TrendingCard key={item.title} item={item} elapsedSeconds={elapsedSeconds} onViewDeal={handleViewDeal} />
        ))}

        {filteredProducts.length === 0 && (
          <article className="w-full rounded-2xl border border-line bg-white p-6 text-center text-sm font-medium text-muted sm:col-span-2 lg:col-span-4">
            No trending deals found for this filter selection.
          </article>
        )}
      </div>
    </section>
  )
}

export default TrendingDealsSection
