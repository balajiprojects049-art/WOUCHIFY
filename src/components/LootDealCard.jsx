import { Link } from 'react-router-dom'
import CountdownTimer from './CountdownTimer'

function LootDealCard({ deal }) {
  return (
    <article className="group rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
      <Link to={`/loot-deal/${deal.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl">
          <img src={deal.image} alt={deal.title} className="h-44 w-full rounded-xl object-cover transition-all duration-300 group-hover:scale-105" />
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            {deal.discountPercent}% OFF
          </span>
        </div>

        <h3 className="mt-4 text-base font-bold text-ink">{deal.title}</h3>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-sm font-semibold text-muted line-through">{deal.oldPrice}</p>
          <p className="text-xl font-bold text-ink">{deal.newPrice}</p>
        </div>
      </Link>

      <div className="mt-3">
        <CountdownTimer initialSeconds={deal.expiresInSeconds} label="Ends in" />
      </div>

      <div className="mt-3 space-y-1 text-xs font-semibold text-muted">
        <p className="text-red-500">🔥 {deal.grabbed} users grabbed</p>
        <p>{deal.stockLabel}</p>
        <p className="text-red-500">{deal.urgency}</p>
      </div>

      <Link
        to={`/loot-deal/${deal.slug}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-black py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
      >
        Grab Deal
      </Link>
    </article>
  )
}

export default LootDealCard
