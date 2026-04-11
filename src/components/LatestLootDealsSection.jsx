import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function LatestLootDealsSection() {
  const navigate = useNavigate()
  const { lootDeals } = useData()

  const latest = [...lootDeals]
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || 0)
      const bDate = new Date(b.createdAt || 0)
      if (bDate - aDate !== 0) return bDate - aDate
      return (b.popularity || 0) - (a.popularity || 0)
    })
    .slice(0, 3)

  if (latest.length === 0) return null

  return (
    <section className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink via-midnight to-navy px-5 py-5 shadow-lg sm:px-6 sm:py-6">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Grab Before Gone</p>
            <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">Latest Loot Deals</h2>
          </div>
          <button
            onClick={() => navigate('/loot-deals')}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white/80 transition-all duration-200 hover:border-gold hover:bg-gold hover:text-midnight"
          >
            View All →
          </button>
        </div>

        {/* Compact cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {latest.map((item) => (
            <article
              key={item.slug || item.id}
              onClick={() => navigate(`/loot-deal/${item.slug || item.id}`)}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/8"
            >
              {/* Image */}
              <div className="relative mb-2.5 overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => e.target.style.display = 'none'}
                />
                <span className="absolute left-1.5 top-1.5 rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-black text-white">
                  {item.discountPercent}% OFF
                </span>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4">
                  <p className="text-[9px] font-bold text-gold">⚡ {item.urgency || 'Ending Soon'}</p>
                </div>
              </div>

              <h3 className="mb-1.5 line-clamp-2 text-xs font-bold leading-snug text-white transition-colors group-hover:text-gold">
                {item.title}
              </h3>

              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-gold">{item.newPrice}</span>
                <span className="text-[10px] text-white/30 line-through">{item.oldPrice}</span>
              </div>

              <p className="mt-1 text-[9px] font-semibold text-white/35">
                🔥 {item.grabbed || '0'} grabbed
              </p>

              {/* View Deal button */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/loot-deal/${item.slug || item.id}`) }}
                className="mt-2.5 w-full rounded-lg bg-gold py-1.5 text-[11px] font-black uppercase tracking-wide text-midnight shadow-sm transition-all duration-200 hover:bg-[#D4A820] hover:shadow-[0_4px_12px_rgba(212,168,32,0.4)] active:scale-95"
              >
                Grab Deal →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestLootDealsSection
