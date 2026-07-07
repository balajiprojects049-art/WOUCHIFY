import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveStoreLogoUrl } from '../utils/storeLogo'

function StoreCard({ store, featured = false }) {
  const [logoBroken, setLogoBroken] = useState(false)

  const logoUrl = useMemo(() => resolveStoreLogoUrl(store), [store])

  return (
    <Link
      to={`/store/${store.slug}`}
      className={`relative group block rounded-2xl border border-line bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'sm:p-6' : ''
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[176px] items-center justify-center overflow-hidden rounded-xl border border-line bg-cream/60">
        {!logoBroken && logoUrl ? (
          <img 
            loading="lazy" 
            src={logoUrl} 
            alt={`${store.name} logo`} 
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" 
            onError={() => setLogoBroken(true)} 
          />
        ) : (
          <p className="text-xl sm:text-2xl font-black tracking-[0.2em] text-ink transition-transform duration-500 group-hover:scale-105">{store.logoText}</p>
        )}
      </div>

      <div className="mt-4">
        {store.category && (
          <span className="text-[10px] font-black uppercase tracking-widest text-muted block mb-1">
            {store.category}
          </span>
        )}
        <h3 className={`font-bold tracking-tight text-ink leading-tight line-clamp-1 ${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
          {store.name}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-[#00D47E]">
          {store.cashback}
        </p>
      </div>

      <p className="mt-2 text-xs text-muted line-clamp-2 min-h-[32px]">{store.highlight}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-cream transition-all duration-300 group-hover:bg-[#00D47E] group-hover:text-midnight">
          View Deals
        </span>
      </div>
    </Link>
  )
}

export default StoreCard
