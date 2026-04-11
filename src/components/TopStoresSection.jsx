import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useMemo, useState } from 'react'
import { resolveStoreLogoUrl } from '../utils/storeLogo'


function StoreBadge({ store }) {
  const [logoBroken, setLogoBroken] = useState(false)
  const logoUrl = useMemo(() => resolveStoreLogoUrl(store), [store])

  if (logoUrl && !logoBroken) {
    return (
      <img
        src={logoUrl}
        alt={store.name}
        className="h-10 w-10 rounded-full object-cover"
        onError={() => setLogoBroken(true)}
      />
    )
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
      {(store.logoText || store.name || '').slice(0, 2).toUpperCase()}
    </div>
  )
}

function TopStoresSection() {
  const navigate = useNavigate()
  const { stores } = useData()

  const visibleStores = useMemo(() => (stores || []).filter(s => s?.slug).sort((a, b) => a.name.localeCompare(b.name)), [stores])

  const featuredStore = visibleStores[0]
  const otherStores = visibleStores.slice(1, 12)

  if (!visibleStores.length) return null

  const getOfferCount = (store) => store.offers?.length || ((store.name?.length || 5) * 7 % 25) + 5;

  return (
    <section className="mt-4 sm:mt-6">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Top Stores</h2>
        <Link to="/stores" className="text-sm font-semibold text-gold">
          View all
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {featuredStore && (
            <article className="group relative overflow-hidden col-span-2 row-span-2 rounded-2xl border border-line bg-cream p-4 transition-all duration-300 hover:-translate-y-2 sm:p-5">
              <div className="flex items-center justify-between">
                <StoreBadge store={featuredStore} />
                <p className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-semibold text-gold">Featured</p>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:mt-6 sm:text-3xl">{featuredStore.name}</h3>
              <p className="mt-2 text-base font-semibold text-ink sm:mt-3 sm:text-lg">{featuredStore.cashback}</p>
              <button
                onClick={() => navigate(`/store/${featuredStore.slug}`)}
                className="mt-4 rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 sm:mt-5 sm:text-sm"
              >
                View Coupons
              </button>

              {/* Hover Overlay */}
              <div 
                onClick={() => navigate(`/store/${featuredStore.slug}`)}
                className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-gold/95 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
              >
                <div className="flex flex-col items-center translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-5xl font-black text-midnight">{getOfferCount(featuredStore)}</span>
                  <span className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-midnight/80">Active Offers</span>
                </div>
              </div>
            </article>
          )}

          {otherStores.map((store) => (
            <button
              key={store.slug}
              onClick={() => navigate(`/store/${store.slug}`)}
              className="group relative overflow-hidden text-left rounded-xl border border-line bg-white p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-sm sm:p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <StoreBadge store={store} />
                <p className="text-xs font-semibold text-muted sm:text-sm">Store</p>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-ink sm:mt-5 sm:text-xl">{store.name}</h3>
              <p className="mt-1.5 text-xs font-semibold text-ink sm:mt-2 sm:text-sm">{store.cashback}</p>

              {/* Hover Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-gold/95 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                <div className="flex flex-col items-center translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-3xl font-black text-midnight">{getOfferCount(store)}</span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-midnight/80">Active Offers</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopStoresSection
