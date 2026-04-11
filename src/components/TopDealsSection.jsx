import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { storesData } from '../data/storesData'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import CircularTimer from './CircularTimer'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

function getStoreLogo(storeName) {
  const name = (storeName || '').toLowerCase()
  const matched = storesData.find(s => s.name.toLowerCase() === name)
    || storesData.find(s => name.includes(s.name.toLowerCase()))
    || storesData.find(s => s.name.toLowerCase().includes(name))
  return matched?.logo || resolveStoreLogoUrl(storeName)
}

function TopDealsSection() {
  const navigate = useNavigate()
  const { deals } = useData()
  const [nowMs, setNowMs] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const topDeals = useMemo(() => {
    return [...(deals || [])]
      .filter(d => d.active !== false)
      .sort((a, b) => (b.discountValue || 0) - (a.discountValue || 0))
      .slice(0, 3)
  }, [deals])

  if (!topDeals.length) return null

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb300]">Top Deals</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Best Selling Deal Picks</h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {topDeals.map((deal) => {
          const remainingSeconds = getDealRemainingSeconds(deal, nowMs)
          const isExpired = remainingSeconds <= 0
          const logoUrl = getStoreLogo(deal.store)
          const logoText = (deal.store || '').slice(0, 2).toUpperCase()

          return (
            <article
              key={deal.slug}
              className="relative rounded-2xl border border-[#ffb300]/30 bg-white p-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-4"
            >
              {/* HOT DEAL Ribbon */}
              <div className="absolute -left-2 top-4 z-10 rounded-r-lg bg-[#e53935] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                🔥 Hot Deal
                <svg className="absolute -bottom-2 left-0 h-2 w-2 text-[#b71c1c]" fill="currentColor" viewBox="0 0 100 100"><path d="M0 0 L100 0 L100 100 Z" /></svg>
              </div>

              {deal.image && (
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="h-48 w-full rounded-xl object-cover transition-all duration-300 hover:scale-110"
                  />
                  {deal.discount && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#ff9800] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                      {deal.discount} OFF
                    </span>
                  )}
                </div>
              )}

              {/* Store name + logo row */}
              <div className="mt-3 flex items-center gap-2.5">
                {logoUrl ? (
                  <div className="h-8 w-8 rounded-lg bg-white border border-line flex items-center justify-center p-1 shadow-sm overflow-hidden flex-shrink-0">
                    <img src={logoUrl} alt={deal.store} className="h-full w-full object-contain" onError={e => e.target.style.display='none'} />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 text-[10px] font-black text-gold border border-gold/20 flex-shrink-0">{logoText || 'ST'}</div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-black text-ink leading-tight truncate">{deal.store || 'Store'}</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                    Verified Store
                  </p>
                </div>
              </div>

              <h3 className="mt-3 text-lg font-bold text-ink line-clamp-2">{deal.title}</h3>

              <div className="mt-3 flex items-center justify-between gap-3 h-14">
                {!isExpired ? (
                  <div className="scale-90 origin-left"><CircularTimer remainingSeconds={remainingSeconds} /></div>
                ) : (
                  <span className="rounded-lg bg-[#111] px-5 py-2 text-sm font-black tracking-widest text-red-500 uppercase border border-white/10">EXPIRED</span>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line/40 pt-4">
                <div className="flex flex-col">
                  {(deal.originalPrice || deal.oldPrice) && (
                    <span className="text-[11px] font-bold text-gray-400 line-through mb-0.5">
                      {!String(deal.originalPrice || deal.oldPrice).includes('₹') && '₹'}{deal.originalPrice || deal.oldPrice}
                    </span>
                  )}
                  <p className="text-[22px] font-black text-[#12151C] leading-none tracking-tight">
                    {!String(deal.price || deal.priceFormatted || '').includes('₹') && '₹'}{deal.price || deal.priceFormatted}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/deal/${deal.slug}`)}
                  className={`rounded-xl flex-1 px-4 py-2.5 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden relative group ${
                    isExpired
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                    : 'bg-[#ffb300] text-black shadow-lg hover:shadow-[#ffb300]/40 hover:-translate-y-1'
                  }`}
                >
                  {!isExpired && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                  {isExpired ? 'Offer Ended' : 'Grab Deal'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TopDealsSection
