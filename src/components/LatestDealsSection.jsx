import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function LatestDealsSection() {
  const navigate = useNavigate()
  const { deals } = useData()

  const latest = [...deals]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4)

  if (latest.length === 0) return null

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Just Added</p>
          <h2 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">Latest Deals</h2>
        </div>
        <button
          onClick={() => navigate('/deals')}
          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[11px] font-bold text-ink transition-all duration-200 hover:border-gold hover:bg-gold hover:text-midnight"
        >
          View All →
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {latest.map((deal) => (
          <article
            key={deal.slug}
            onClick={() => navigate(`/deal/${deal.slug}`)}
            className="group cursor-pointer rounded-xl border border-line bg-surface p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(212,168,32,0.10)]"
          >
            {/* Image */}
            <div className="relative mb-2.5 overflow-hidden rounded-lg">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => e.target.style.display = 'none'}
              />
              {deal.badge && (
                <span className="absolute left-1.5 top-1.5 rounded bg-gold px-1.5 py-0.5 text-[9px] font-black text-midnight">
                  {deal.badge}
                </span>
              )}
              <span className="absolute right-1.5 top-1.5 rounded bg-ink/80 px-1.5 py-0.5 text-[9px] font-bold text-gold backdrop-blur-sm">
                {deal.discountLabel}
              </span>
            </div>

            <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">{deal.store}</p>
            <h3 className="mb-2 line-clamp-2 text-xs font-bold leading-snug text-ink transition-colors group-hover:text-gold">
              {deal.title}
            </h3>

            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-ink">{deal.price}</p>
              <span className="rounded bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold transition-colors group-hover:bg-gold group-hover:text-midnight">
                View
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LatestDealsSection
