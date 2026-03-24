import { useNavigate, useSearchParams } from 'react-router-dom'
import { getDealPathByTitle } from '../data/dealsData'

const topDeals = [
  {
    title: 'MacBook Air M3',
    store: 'Amazon',
    discount: 'Save 18%',
    discountValue: 18,
    category: 'Electronics',
    dealType: 'Loot Deals',
    price: '₹1,049',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'iPhone 15 Plus',
    store: 'Flipkart',
    discount: 'Save 22%',
    discountValue: 22,
    category: 'Electronics',
    dealType: 'Flash Deals',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sony WH-1000XM5',
    store: 'Croma',
    discount: 'Save 31%',
    discountValue: 31,
    category: 'Electronics',
    dealType: 'Coupon Deals',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
]

function TopDealsSection() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const selectedCategory = searchParams.get('category')
  const selectedStore = searchParams.get('store')
  const selectedDealType = searchParams.get('dealType')
  const selectedMinDiscount = Number.parseInt((searchParams.get('minDiscount') || '').replace('%+', ''), 10)
  const selectedQuery = (searchParams.get('q') || '').trim().toLowerCase()

  const filteredDeals = topDeals.filter((deal) => {
    const matchesCategory = !selectedCategory || deal.category === selectedCategory
    const matchesStore = !selectedStore || deal.store === selectedStore
    const matchesDealType = !selectedDealType || deal.dealType === selectedDealType
    const matchesDiscount = Number.isNaN(selectedMinDiscount) || deal.discountValue >= selectedMinDiscount
    const matchesQuery = !selectedQuery || deal.title.toLowerCase().includes(selectedQuery)

    return matchesCategory && matchesStore && matchesDealType && matchesDiscount && matchesQuery
  })

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Top Deals</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Best Selling Deal Picks</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {filteredDeals.map((deal) => (
          <article
            key={deal.title}
            className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-4"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{deal.store}</p>
              <span className="rounded-full bg-gold/20 px-2 py-1 text-[11px] font-semibold text-gold">{deal.discount}</span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-ink">{deal.title}</h3>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xl font-bold text-ink">{deal.price}</p>
              <button
                onClick={() => navigate(getDealPathByTitle(deal.title))}
                className="rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Grab Deal
              </button>
            </div>
          </article>
        ))}

        {filteredDeals.length === 0 && (
          <article className="md:col-span-3 rounded-2xl border border-line bg-white p-6 text-center text-sm font-medium text-muted">
            No top deals found for this filter selection.
          </article>
        )}
      </div>
    </section>
  )
}

export default TopDealsSection
