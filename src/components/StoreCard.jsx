import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveStoreLogoUrl } from '../utils/storeLogo'

function StoreCard({ store, featured = false }) {
  const [logoBroken, setLogoBroken] = useState(false)

  const logoUrl = useMemo(() => resolveStoreLogoUrl(store), [store])

  return (
    <Link
      to={`/store/${store.slug}`}
      className={`relative group block rounded-2xl border border-line bg-white p-3.5 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'sm:p-6' : ''
      }`}
    >

      
      <div className="mx-auto flex h-16 sm:h-20 w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-cream/60">
        {!logoBroken && logoUrl ? (
          <img loading="lazy" src={logoUrl} alt={`${store.name} logo`} className="h-full w-full object-contain p-2.5 sm:p-3" onError={() => setLogoBroken(true)} />
        ) : (
          <p className="text-lg sm:text-2xl font-bold tracking-[0.2em] text-ink">{store.logoText}</p>
        )}
      </div>

      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3">
        <div className="min-w-0">
          <h3 className={`font-bold tracking-tight text-ink text-base sm:text-xl md:text-2xl truncate`}>{store.name}</h3>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-ink leading-tight">{store.cashback}</p>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted self-start shrink-0">{store.category}</span>
      </div>

      <p className="mt-1 text-[11px] sm:text-xs text-muted line-clamp-1 sm:line-clamp-2">{store.highlight}</p>

      <div className="mt-3 sm:mt-4 flex items-center justify-between">
        <span className="inline-flex rounded-xl bg-navy px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold text-cream transition-all duration-300 group-hover:scale-105">
          View Deals
        </span>
      </div>
    </Link>
  )
}

export default StoreCard
