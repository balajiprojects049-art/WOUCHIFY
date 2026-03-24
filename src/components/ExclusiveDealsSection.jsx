import { useNavigate } from 'react-router-dom'
import { getDealPathByTitle } from '../data/dealsData'

const exclusiveDeals = [
  {
    title: 'MacBook Air M3',
    tag: 'HOT',
    price: '$1,049',
    badge: 'Save 18%',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'UltraWide Monitor',
    tag: 'LIMITED',
    price: '$499',
    badge: 'Save 26%',
    image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sony WH-1000XM5',
    tag: 'TRENDING',
    price: '$299',
    badge: 'Save 31%',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  },
]

function ExclusiveDealsSection() {
  const navigate = useNavigate()

  return (
    <section className="relative mt-16 overflow-hidden bg-navy py-14 sm:mt-20 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-gold/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute -right-20 bottom-8 h-56 w-56 rounded-full bg-white/5 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute left-1/4 top-16 h-24 w-24 rounded-full border border-white/10 sm:h-36 sm:w-36" />
        <div className="absolute bottom-12 right-1/4 h-16 w-16 rounded-full border border-gold/20 sm:h-24 sm:w-24" />
        <div className="absolute left-10 bottom-10 h-px w-28 bg-gradient-to-r from-transparent via-gold/25 to-transparent sm:w-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Exclusive Loot Deals</h2>
          <button
            onClick={() => navigate('/loot-deals')}
            className="rounded-xl bg-gold px-3 py-2 text-xs font-semibold text-slate-900 transition-all duration-300 hover:scale-105 sm:px-4 sm:text-sm"
          >
            Explore
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {exclusiveDeals.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{item.tag}</p>
                <p className="rounded-full bg-gold/20 px-2 py-1 text-xs font-semibold text-gold">{item.badge}</p>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold text-white">{item.price}</p>
                <button
                  onClick={() => navigate(getDealPathByTitle(item.title))}
                  className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-navy transition-all duration-300 hover:scale-105"
                >
                  Grab Deal
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExclusiveDealsSection
