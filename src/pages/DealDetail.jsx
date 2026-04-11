import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import DealGrid from '../components/DealGrid'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

import CircularTimer from '../components/CircularTimer'

function DealDetail() {
  const { dealSlug } = useParams()
  const { deals, getStoreBySlug } = useData()
  const deal = deals.find(d => d.slug === (dealSlug || '').toLowerCase())
  const [nowMs, setNowMs] = useState(Date.now())
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!deal.code) return
    navigator.clipboard.writeText(deal.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const relatedDeals = useMemo(() => {
    if (!deal) return []
    const sameCategory = deals.filter((item) => item.slug !== deal.slug && item.category === deal.category)
    const fallback = deals.filter((item) => item.slug !== deal.slug)

    return [...sameCategory, ...fallback].slice(0, 4)
  }, [deal, deals])

  useEffect(() => {
    const timerId = setInterval(() => {
      setNowMs(Date.now())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  if (!deal) {
    return <Navigate to="/deals" replace />
  }

  const remainingSeconds = getDealRemainingSeconds(deal, nowMs)

  // Build store path
  const storeSlug = deal.store ? deal.store.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
  const storeData = getStoreBySlug(storeSlug)
  const storePath = storeData ? `/store/${storeData.slug}` : '/stores'

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-20">
      {/* Breadcrumb or Back Button */}
      <Link to="/deals" className="mb-6 inline-flex items-center gap-2 text-xs font-black text-muted hover:text-gold transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        BACK TO DEALS
      </Link>

      <section className="rounded-3xl bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:rounded-[2.5rem] sm:p-12 border border-line/40">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-xl">
              <img src={deal.image} alt={deal.title} className="h-64 w-full object-cover transition-all duration-700 group-hover:scale-110 sm:h-[32rem]" />
            </div>
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-xl bg-black/60 backdrop-blur-xl px-3 py-1.5 border border-white/10">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#ffb300] uppercase">Verified Offer</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="inline-flex max-w-fit rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-red-500 uppercase">
              {deal.discountLabel || 'Hot Deal'}
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-ink sm:mt-6 sm:text-5xl leading-[1.2] sm:leading-[1.1]">{deal.title}</h1>
            <p className="mt-3 text-sm font-bold text-gold uppercase tracking-wider sm:mt-4 sm:text-lg">{deal.store}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted/80 sm:mt-6 sm:text-base">{deal.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-2xl bg-gray-50 border border-line/40 p-4 sm:p-5 transition-all hover:border-[#ffb300]/30 hover:bg-white hover:shadow-lg">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted">Price</p>
                <p className="mt-1 text-2xl font-black text-ink sm:text-3xl">{deal.price}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-line/40 p-4 sm:p-5 transition-all hover:border-[#ffb300]/30 hover:bg-white hover:shadow-lg">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted">Success Rate</p>
                <p className="mt-1 text-2xl font-black text-emerald-600 sm:text-3xl">{deal.successRate}%</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center sm:items-start">
              <p className="mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted">Time Remaining</p>
              <CircularTimer remainingSeconds={remainingSeconds} />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 pt-8 border-t border-line/40">
              <a
                href={deal.link || deal.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-xl bg-[#ffb300] py-4 flex items-center justify-center text-xs font-black uppercase tracking-[0.2em] text-black shadow-lg transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group sm:rounded-2xl sm:py-5 sm:text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                Get Deal
              </a>
              <div className="flex gap-3">
                <button
                  onClick={() => setSaved((p) => !p)}
                  className={`flex-1 rounded-xl border-2 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 sm:rounded-2xl sm:py-5 sm:text-sm sm:px-8 ${saved ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-line text-ink hover:border-[#ffb300]'
                    }`}
                >
                  {saved ? 'Saved' : 'Save'}
                </button>
                <Link to={storePath} className="flex-1 rounded-xl border-2 border-line bg-white py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-[#ffb300] sm:rounded-2xl sm:py-5 sm:text-sm sm:px-8">
                  Store
                </Link>
              </div>
            </div>

            {deal.code && (
              <div className="mt-8 rounded-2xl border-2 border-dashed border-[#ffb300]/40 bg-[#ffb300]/5 p-5 sm:p-6 relative">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#b48600]">Coupon Code</p>
                    <p className="mt-1 text-xl font-black tracking-[0.25em] text-ink uppercase sm:text-2xl">{deal.code}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${copied ? 'bg-emerald-600 text-white' : 'bg-black text-white hover:bg-gold hover:text-black shadow-lg'
                      }`}
                  >
                    {copied ? 'Copied' : 'Copy Code'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 sm:mt-12 sm:rounded-[2.5rem] sm:p-12 shadow-sm border border-line/40">
        <div className="max-w-3xl">
          <h2 className="text-xl font-black tracking-widest text-ink uppercase sm:text-2xl">Offer Dossier</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted/90 sm:mt-6 sm:text-base">{deal.terms}</p>

          {Array.isArray(deal.highlights) && deal.highlights.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xs font-black text-gold uppercase tracking-widest">Highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {deal.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs text-muted font-bold sm:text-sm">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(deal.steps) && deal.steps.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xs font-black text-gold uppercase tracking-widest">How to Redeem</h3>
              <div className="mt-6 space-y-4">
                {deal.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-gray-100 text-[10px] font-black text-ink transition-colors group-hover:bg-[#ffb300] sm:h-8 sm:w-8 sm:text-xs">{idx + 1}</span>
                    <p className="text-xs font-bold text-muted transition-colors group-hover:text-ink sm:text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-3 grid-cols-2 lg:grid-cols-4 border-t border-line/40 pt-10">
          {[
            { label: 'Expiry', value: deal.expiry },
            { label: 'Store', value: deal.store },
            { label: 'Category', value: deal.category },
            { label: 'Strategy', value: deal.type }
          ].map((inf, i) => (
            <div key={i} className="rounded-xl border border-line/40 bg-gray-50/50 p-3 sm:p-4">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted">{inf.label}</p>
              <p className="mt-1 text-[10px] font-black text-ink sm:text-xs">{inf.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg font-black tracking-widest text-ink uppercase sm:text-2xl">Related Picks</h2>
          <Link to="/deals" className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">View All</Link>
        </div>
        <DealGrid deals={relatedDeals} nowMs={nowMs} />
      </section>
    </main>
  )
}

export default DealDetail
