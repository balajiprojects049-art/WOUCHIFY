import { useNavigate } from 'react-router-dom'
import { getDealPathByTitle } from '../data/dealsData'

const exclusiveDeals = [
  {
    title: 'MacBook Air M3',
    tag: 'HOT',
    price: '₹1,049',
    badge: 'Save 18%',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'UltraWide Monitor',
    tag: 'LIMITED',
    price: '₹499',
    badge: 'Save 26%',
    image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sony WH-1000XM5',
    tag: 'TRENDING',
    price: '₹299',
    badge: 'Save 31%',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  },
]

function ExclusiveDealsSection() {
  const navigate = useNavigate()

  return (
    <section className="relative mt-16 overflow-hidden border-y border-line bg-gradient-to-br from-cream via-surface to-gold/5 py-14 shadow-sm sm:mt-20 sm:py-20">
      {/* ── Animated Falling / Floating Glass Effects ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated Background Orbs that float and slowly spin - highly visible for glassmorphism */}
        <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[60%] origin-center animate-[spin_20s_linear_infinite] rounded-full bg-gold/30 blur-[80px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[80%] w-[70%] origin-center animate-[spin_30s_linear_infinite_reverse] rounded-full bg-goldsoft/40 blur-[100px]" />
        
        {/* Mirror/Glass falling reflection lines */}
        <div className="absolute inset-0 -rotate-12 transform bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-60 blur-[2px]" style={{ animation: 'pulse 6s ease-in-out infinite' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between sm:mb-10">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">Members Only</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink drop-shadow-sm sm:text-5xl">Exclusive Loot Deals</h2>
          </div>
          <button
            onClick={() => navigate('/loot-deals')}
            className="rounded-xl border border-line bg-white/40 px-4 py-2 text-xs font-semibold text-ink backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-midnight hover:border-gold sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Explore Options
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {exclusiveDeals.map((item) => (
            <article
              key={item.title}
              className="group relative rounded-3xl border border-white/40 bg-white/20 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:border-gold/50 hover:bg-white/30 hover:shadow-[0_25px_50px_rgba(212,168,32,0.15)]"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 z-20 rounded-lg bg-white/80 px-3 py-1 text-[11px] font-bold tracking-wider text-ink backdrop-blur-md">
                  {item.tag}
                </span>
                <span className="absolute right-3 top-3 z-20 rounded-lg bg-gold px-3 py-1 text-[11px] font-bold tracking-wider text-midnight shadow-[0_4px_10px_rgba(212,168,32,0.3)]">
                  {item.badge}
                </span>
              </div>
              
              <div className="mt-6 flex flex-col gap-1">
                <h3 className="text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-gold">{item.title}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted">Exclusive Price</p>
                    <p className="text-2xl font-extrabold text-ink">{item.price}</p>
                  </div>
                  <button
                    onClick={() => navigate(getDealPathByTitle(item.title))}
                    className="rounded-xl border border-white/60 bg-white/40 px-5 py-2.5 text-xs font-bold text-ink backdrop-blur-xl transition-all duration-300 group-hover:bg-gold group-hover:text-midnight group-hover:border-gold sm:text-sm"
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
