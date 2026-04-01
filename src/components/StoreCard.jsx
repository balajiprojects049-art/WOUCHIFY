import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveStoreLogoUrl } from '../utils/storeLogo'

function StoreCard({ store, featured = false }) {
  const [logoBroken, setLogoBroken] = useState(false)

  const logoUrl = useMemo(() => resolveStoreLogoUrl(store), [store])

  return (
    <Link
      to={`/store/${store.slug}`}
      className={`group block rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'sm:p-6' : ''
      }`}
    >
      <div className="mx-auto flex h-20 w-44 items-center justify-center overflow-hidden rounded-lg border border-line bg-cream/60">
        {!logoBroken && logoUrl ? (
          <img loading="lazy" src={logoUrl} alt={`${store.name} logo`} className="h-full w-full object-contain p-3" onError={() => setLogoBroken(true)} />
        ) : (
          <p className="text-2xl font-bold tracking-[0.2em] text-ink">{store.logoText}</p>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className={`font-bold tracking-tight text-ink ${featured ? 'text-3xl' : 'text-2xl'}`}>{store.name}</h3>
          <p className="mt-2 text-sm font-semibold text-ink">{store.cashback}</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">{store.category}</span>
      </div>

      <p className="mt-1 text-xs text-muted">{store.highlight}</p>

      <span className="mt-4 inline-flex rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-cream transition-all duration-300 group-hover:scale-105">
        View Deals
      </span>
    </Link>
  )
}

export default StoreCard
