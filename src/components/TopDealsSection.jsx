import { useNavigate } from 'react-router-dom'

const topDeals = [
  {
    title: 'MacBook Air M3',
    store: 'Amazon',
    discount: 'Save 18%',
    price: '$1,049',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'iPhone 15 Plus',
    store: 'Flipkart',
    discount: 'Save 22%',
    price: '$899',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sony WH-1000XM5',
    store: 'Croma',
    discount: 'Save 31%',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
]

function TopDealsSection() {
  const navigate = useNavigate()

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Top Deals</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Best Selling Deal Picks</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {topDeals.map((deal) => (
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
              <span className="rounded-full bg-navysoft px-2 py-1 text-[11px] font-semibold text-navy">{deal.discount}</span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-ink">{deal.title}</h3>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xl font-bold text-ink">{deal.price}</p>
              <button
                onClick={() => navigate(`/deals?q=${encodeURIComponent(deal.title)}`)}
                className="rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Grab Deal
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TopDealsSection
