import { Link } from 'react-router-dom'

function formatCountdown(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

function DealCard({ deal, remainingSeconds }) {
  const logoText = (deal.store || '').slice(0, 2).toUpperCase()

  return (
    <article className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img loading="lazy" src={deal.image} alt={deal.title} className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
          {deal.discountLabel}
        </span>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">{logoText}</div>
          <div>
            <p className="text-sm font-bold text-ink">{deal.store}</p>
            <p className="text-xs text-muted">Verified Store</p>
          </div>
        </div>
        <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold text-gold">{deal.badge}</span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-ink">{deal.title}</h3>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-bold text-ink">{deal.price}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{deal.category}</p>
      </div>

      <div className="mt-3 rounded-lg bg-cream px-3 py-2 text-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-ink">
            Expires in <span className="text-gold">{formatCountdown(remainingSeconds)}</span>
          </p>
          <p className="text-xs font-semibold text-muted">{deal.usageCount} used</p>
        </div>
      </div>

      <Link
        to={`/deal/${deal.slug}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105"
      >
        View Deal
      </Link>
    </article>
  )
}

export default DealCard
