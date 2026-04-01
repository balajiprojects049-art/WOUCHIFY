import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function TopDealsSection() {
  const navigate = useNavigate()
  const { deals } = useData()

  // Show top 3 active deals sorted by discount
  const topDeals = useMemo(() => {
    return [...(deals || [])]
      .filter(d => d.active !== false)
      .sort((a, b) => (b.discountValue || 0) - (a.discountValue || 0))
      .slice(0, 3)
  }, [deals])

  if (!topDeals.length) return null

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
            key={deal.slug}
            className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-4"
          >
            {deal.image && (
              <div className="overflow-hidden rounded-xl">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{deal.store}</p>
              {deal.discount && (
                <span className="rounded-full bg-gold/20 px-2 py-1 text-[11px] font-semibold text-gold">
                  {deal.discount}
                </span>
              )}
            </div>

            <h3 className="mt-2 text-lg font-semibold text-ink">{deal.title}</h3>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xl font-bold text-ink">{deal.price || deal.priceFormatted || ''}</p>
              <button
                onClick={() => navigate(`/deal/${deal.slug}`)}
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
