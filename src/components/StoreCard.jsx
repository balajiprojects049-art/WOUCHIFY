import { Link } from 'react-router-dom'

function StoreCard({ store, featured = false }) {
  return (
    <Link
      to={`/store/${store.slug}`}
      className={`group block rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'sm:p-6' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
          {store.logoText}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Store</span>
      </div>

      <h3 className={`mt-5 font-bold tracking-tight text-ink ${featured ? 'text-3xl' : 'text-2xl'}`}>{store.name}</h3>
      <p className="mt-2 text-sm font-semibold text-ink">{store.cashback}</p>
      <p className="mt-1 text-xs text-muted">{store.highlight}</p>

      <span className="mt-4 inline-flex rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white transition-all duration-300 group-hover:scale-105">
        View Deals
      </span>
    </Link>
  )
}

export default StoreCard
