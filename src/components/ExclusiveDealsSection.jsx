import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function ExclusiveDealsSection() {
  const navigate = useNavigate()
  const { lootDeals } = useData()

  // Show top 3 loot deals sorted by discountPercent
  const exclusiveDeals = [...lootDeals]
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 3)

  if (exclusiveDeals.length === 0) return null

  return (
    <section className="relative overflow-hidden border-y border-line bg-gradient-to-br from-cream via-surface to-gold/5 py-14 shadow-sm sm:py-20">
      {/* ── Animated Floating Glass Effects ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[60%] origin-center animate-[spin_20s_linear_infinite] rounded-full bg-gold/30 blur-[80px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[80%] w-[70%] origin-center animate-[spin_30s_linear_infinite_reverse] rounded-full bg-goldsoft/40 blur-[100px]" />
        <div className="absolute inset-0 -rotate-12 transform bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-60 blur-[2px]" style={{ animation: 'pulse 6s ease-in-out infinite' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between sm:mb-10">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Members Only</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink drop-shadow-sm sm:text-5xl">Exclusive Loot Deals</h2>
          </div>
          <button
            onClick={() => navigate('/loot-deals')}
            className="rounded-xl border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-midnight hover:border-gold sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Explore Options
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {exclusiveDeals.map((item) => (
            <article
              key={item.slug || item.id}
              className="group relative flex flex-col h-full rounded-3xl border border-line/50 bg-surface p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_20px_40px_rgba(212,168,32,0.12)]"
            >
              <div className="relative shrink-0 overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={e => e.target.style.display='none'}
                />
                <span className="absolute left-3 top-3 z-20 rounded-xl bg-surface px-3 py-1.5 text-[10px] font-black tracking-widest text-ink backdrop-blur-md uppercase shadow-sm">
                  {item.urgency || 'Verified'}
                </span>
                <span className="absolute right-3 top-3 z-20 rounded-xl bg-gold px-3 py-1.5 text-[10px] font-black tracking-widest text-midnight shadow-lg uppercase">
                  Save {item.discountPercent}%
                </span>
              </div>

              <div className="mt-6 flex flex-1 flex-col justify-between">
                <h3 className="text-xl font-black tracking-tight text-ink leading-tight line-clamp-2 min-h-[3.5rem]">{item.title}</h3>
                
                <div className="mt-4 flex items-end justify-between border-t border-line/10 pt-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Exclusive Price</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-2xl font-black text-ink">{item.newPrice}</p>
                       <p className="text-xs font-bold text-muted/50 line-through">{item.oldPrice}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/loot-deal/${item.slug || item.id}`)}
                    className="flex h-12 items-center justify-center rounded-2xl bg-navy px-5 text-sm font-black text-cream shadow-md transition-all duration-300 hover:bg-gold hover:text-midnight hover:scale-105 active:scale-95"
                  >
                    Grab Deal
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExclusiveDealsSection
