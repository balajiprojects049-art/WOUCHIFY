import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function formatCountdown(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds].map((time) => String(time).padStart(2, '00')).join(':')
}

function TrendingCard({ item, elapsedSeconds }) {
  const navigate = useNavigate()
  const remainingSeconds = item.expiresInSeconds - elapsedSeconds

  return (
    <article className="min-w-[260px] rounded-2xl bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md sm:min-w-0 sm:p-4">
      <div className="overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.title}
          className="h-40 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105 sm:h-48"
          onError={e => e.target.style.display='none'}
        />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink sm:mt-5">{item.title}</h3>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-base font-bold text-ink">{item.price}</p>
        <p className="rounded-full bg-gold/20 px-2 py-1 text-xs font-semibold text-gold">{item.discountLabel}</p>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-cream px-2.5 py-2">
        <p className="text-[11px] font-semibold text-ink">
          Expires in <span className="text-gold">{formatCountdown(remainingSeconds)}</span>
        </p>
        <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M10 3c-4.8 0-8.7 3-9.9 7 1.2 4 5.1 7 9.9 7s8.7-3 9.9-7c-1.2-4-5.1-7-9.9-7Zm0 11.5A4.5 4.5 0 1 1 10 5a4.5 4.5 0 0 1 0 9.5Zm0-7.3a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
          </svg>
          {item.usageCount} used
        </p>
      </div>

      <button
        onClick={() => navigate(`/deal/${item.slug}`)}
        className="mt-4 w-full rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105"
      >
        View Deal
      </button>
    </article>
  )
}

function TrendingDealsSection() {
  const { deals } = useData()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Show first 4 trending deals (sorted by usageCount / "HOT" badge)
  const trendingDeals = deals
    .filter(d => d.expiresInSeconds - elapsedSeconds > 0)
    .sort((a, b) => {
      // Prioritize HOT/TRENDING badges
      const badgePriority = { 'HOT': 3, 'TRENDING': 2, 'FLASH': 1 }
      const aPri = badgePriority[a.badge] || 0
      const bPri = badgePriority[b.badge] || 0
      if (bPri !== aPri) return bPri - aPri
      // then by usage count
      const parseCount = (v) => {
        const s = String(v || '').toLowerCase()
        if (s.endsWith('k')) return parseFloat(s) * 1000
        return parseInt(s) || 0
      }
      return parseCount(b.usageCount) - parseCount(a.usageCount)
    })
    .slice(0, 4)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (trendingDeals.length === 0) return null

  return (
    <section className="mt-14 sm:mt-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Trending Deals</h2>
        <Link to="/deals" className="text-sm font-semibold text-gold">
          View all
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
        {trendingDeals.map((item) => (
          <TrendingCard key={item.slug} item={item} elapsedSeconds={elapsedSeconds} />
        ))}
      </div>
    </section>
  )
}

export default TrendingDealsSection
