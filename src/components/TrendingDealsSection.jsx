import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function TrendingDealsSection() {
  const navigate = useNavigate()
  const { deals } = useData()

  const trending = [...deals]
    .sort((a, b) => {
      if (b.trending && !a.trending) return 1
      if (a.trending && !b.trending) return -1
      const aCount = parseInt(String(a.usageCount).replace(/[^0-9]/g, '')) || 0
      const bCount = parseInt(String(b.usageCount).replace(/[^0-9]/g, '')) || 0
      return bCount - aCount
    })
    .slice(0, 8)

  if (trending.length === 0) return null

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">People Are Grabbing</p>
          <h2 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">Trending Deals</h2>
        </div>
        <button
          onClick={() => navigate('/deals')}
          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[11px] font-bold text-ink transition-all duration-200 hover:border-gold hover:bg-gold hover:text-midnight"
        >
          View All →
        </button>
      </div>

      {/* Compact horizontal list */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((deal, idx) => (
          <article
            key={deal.slug}
            onClick={() => navigate(`/deal/${deal.slug}`)}
            className="group flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 transition-all duration-200 hover:border-gold/40 hover:shadow-[0_4px_16px_rgba(212,168,32,0.08)]"
          >
            {/* Rank */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-xs font-black text-gold">
              #{idx + 1}
            </span>

            {/* Thumbnail */}
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={e => e.target.style.display = 'none'}
              />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">{deal.store}</p>
              <h3 className="line-clamp-1 text-xs font-bold text-ink transition-colors group-hover:text-gold">
                {deal.title}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-ink">{deal.price}</span>
                <span className="rounded bg-gold/10 px-1 py-0.5 text-[9px] font-bold text-gold">
                  {deal.discountLabel}
                </span>
              </div>
            </div>

            <span className="shrink-0 text-xs text-muted transition-colors group-hover:text-gold">→</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrendingDealsSection
