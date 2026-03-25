import { useNavigate, useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'

function DealsCatalogSection({
  label = 'Deals Catalog',
  title = 'Best Offers Across Top Stores',
  actionText = 'View All',
}) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { deals } = useData()

  const selectedCategory = searchParams.get('category')
  const selectedStore = searchParams.get('store')
  const selectedMinDiscount = Number.parseInt((searchParams.get('minDiscount') || '').replace('%+', ''), 10)
  const selectedQuery = (searchParams.get('q') || '').trim().toLowerCase()

  const filteredDeals = deals
    .filter((deal) => {
      const matchesCategory = !selectedCategory || deal.category === selectedCategory
      const matchesStore = !selectedStore || deal.store === selectedStore
      const matchesDiscount = Number.isNaN(selectedMinDiscount) || deal.discountValue >= selectedMinDiscount
      const matchesQuery = !selectedQuery || deal.title.toLowerCase().includes(selectedQuery)

      return matchesCategory && matchesStore && matchesDiscount && matchesQuery
    })
    .slice(0, 6)

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
        </div>
        <button onClick={() => navigate('/deals')} className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:text-sm">
          {actionText}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDeals.map((deal) => (
          <article
            key={deal.slug}
            className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-4"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105"
                onError={e => e.target.style.display='none'}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{deal.store}</p>
              <span className="rounded-full bg-gold/20 px-2 py-1 text-[11px] font-semibold text-gold">{deal.discountLabel}</span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-ink">{deal.title}</h3>
            {deal.code && <p className="mt-1 text-sm text-muted">Coupon: {deal.code}</p>}

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xl font-bold text-ink">{deal.price}</p>
              <button
                onClick={() => navigate(`/deal/${deal.slug}`)}
                className="rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Grab Deal
              </button>
            </div>
          </article>
        ))}

        {filteredDeals.length === 0 && (
          <article className="lg:col-span-3 rounded-2xl border border-line bg-white p-6 text-center text-sm font-medium text-muted">
            No deals found for this filter selection.
          </article>
        )}
      </div>
    </section>
  )
}

export default DealsCatalogSection
