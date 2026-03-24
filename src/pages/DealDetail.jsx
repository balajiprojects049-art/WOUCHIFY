import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import DealGrid from '../components/DealGrid'
import { dealsData, getDealBySlug } from '../data/dealsData'
import { getStorePathByName } from '../data/storesData'

function formatCountdown(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

function DealDetail() {
  const { dealSlug } = useParams()
  const deal = getDealBySlug((dealSlug || '').toLowerCase())
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [saved, setSaved] = useState(false)

  if (!deal) {
    return <Navigate to="/deals" replace />
  }

  const relatedDeals = useMemo(() => {
    const sameCategory = dealsData.filter((item) => item.slug !== deal.slug && item.category === deal.category)
    const fallback = dealsData.filter((item) => item.slug !== deal.slug)

    return [...sameCategory, ...fallback].slice(0, 4)
  }, [deal.category, deal.slug])

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const remainingSeconds = deal.expiresInSeconds - elapsedSeconds

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <section className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-2xl">
            <img src={deal.image} alt={deal.title} className="h-72 w-full object-cover transition-all duration-300 hover:scale-105 sm:h-96" />
          </div>

          <div>
            <p className="inline-flex rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">{deal.discountLabel}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{deal.title}</h1>
            <p className="mt-3 text-sm font-semibold text-gold">{deal.store}</p>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{deal.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-cream p-3">
                <p className="text-xs text-muted">Price</p>
                <p className="mt-1 text-xl font-bold text-ink">{deal.price}</p>
              </div>
              <div className="rounded-xl border border-line bg-cream p-3">
                <p className="text-xs text-muted">Usage</p>
                <p className="mt-1 text-xl font-bold text-ink">{deal.usageCount}</p>
              </div>
              <div className="rounded-xl border border-line bg-cream p-3">
                <p className="text-xs text-muted">Expiry Countdown</p>
                <p className="mt-1 text-xl font-bold text-gold">{formatCountdown(remainingSeconds)}</p>
              </div>
              <div className="rounded-xl border border-line bg-cream p-3">
                <p className="text-xs text-muted">Success Rate</p>
                <p className="mt-1 text-xl font-bold text-ink">{deal.successRate}%</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Get Deal
              </button>
              <button
                onClick={() => setSaved((previous) => !previous)}
                className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:scale-105"
              >
                {saved ? 'Saved' : 'Save Deal'}
              </button>
              <Link to={getStorePathByName(deal.store)} className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:scale-105">
                Visit Store
              </Link>
            </div>

            {deal.code && (
              <div className="mt-4 rounded-xl border border-dashed border-line bg-cream px-4 py-3">
                <p className="text-xs text-muted">Coupon Code</p>
                <p className="mt-1 text-lg font-bold tracking-[0.14em] text-ink">{deal.code}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Offer Details</h2>
        <p className="mt-4 text-sm leading-7 text-muted">{deal.terms}</p>

        <h3 className="mt-6 text-lg font-semibold text-ink">Highlights</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {deal.highlights.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-ink">How to Redeem</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {deal.steps.map((step) => (
            <li key={step}>• {step}</li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-cream p-3">
            <p className="text-xs text-muted">Expiry</p>
            <p className="mt-1 text-sm font-semibold text-ink">{deal.expiry}</p>
          </div>
          <div className="rounded-xl border border-line bg-cream p-3">
            <p className="text-xs text-muted">Store</p>
            <p className="mt-1 text-sm font-semibold text-ink">{deal.store}</p>
          </div>
          <div className="rounded-xl border border-line bg-cream p-3">
            <p className="text-xs text-muted">Category</p>
            <p className="mt-1 text-sm font-semibold text-ink">{deal.category}</p>
          </div>
          <div className="rounded-xl border border-line bg-cream p-3">
            <p className="text-xs text-muted">Deal Type</p>
            <p className="mt-1 text-sm font-semibold text-ink">{deal.type}</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Related Deals</h2>
        <DealGrid deals={relatedDeals} elapsedSeconds={elapsedSeconds} />
      </section>
    </main>
  )
}

export default DealDetail
