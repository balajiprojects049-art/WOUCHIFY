import { Navigate, useParams } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import LootDealCard from '../components/LootDealCard'
import { useData } from '../context/DataContext'

function LootDealDetail() {
  const { lootDealId } = useParams()
  const { lootDeals } = useData()
  const deal = lootDeals.find(d => d.slug === (lootDealId || '').toLowerCase() || d.id === lootDealId)

  if (!deal) {
    return <Navigate to="/loot-deals" replace />
  }

  const relatedDeals = lootDeals
    .filter((item) => item.id !== deal.id && item.category === deal.category)
    .slice(0, 4)

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <section className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="overflow-hidden rounded-2xl">
            <img src={deal.image} alt={deal.title} className="h-72 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-96" />
          </div>

          <div>
            <p className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">{deal.discountPercent}% OFF</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{deal.title}</h1>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-base font-semibold text-muted line-through">{deal.oldPrice}</p>
              <p className="text-3xl font-bold text-ink">{deal.newPrice}</p>
            </div>

            <div className="mt-5">
              <CountdownTimer initialSeconds={deal.expiresInSeconds} label="Ends in" />
            </div>

            <div className="mt-4 space-y-1 text-sm font-semibold">
              <p className="text-red-500">🔥 {deal.grabbed} users grabbed</p>
              <p className="text-ink">{deal.stockLabel}</p>
              <p className="text-red-500">{deal.urgency}</p>
            </div>

            <button className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105">
              Grab Deal
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Deal Details</h2>
        <p className="mt-4 text-sm leading-7 text-muted">{deal.description}</p>

        {Array.isArray(deal.steps) && deal.steps.length > 0 && (
          <>
            <h3 className="mt-6 text-lg font-semibold text-ink">Steps to Claim</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {deal.steps.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className="mt-6 text-lg font-semibold text-ink">Terms &amp; Conditions</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{deal.terms}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Related Loot Deals</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedDeals.map((item) => (
            <LootDealCard key={item.id} deal={item} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default LootDealDetail
