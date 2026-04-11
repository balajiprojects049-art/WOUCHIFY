import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import DealGrid from '../components/DealGrid'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

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
    const sameCategory = deals.filter(item => item.slug !== deal.slug && item.category === deal.category)
    const fallback = deals.filter(item => item.slug !== deal.slug)
    return [...sameCategory, ...fallback].slice(0, 4)
  }, [deal, deals])

  useEffect(() => {
    const timerId = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(timerId)
  }, [])

  if (!deal) return <Navigate to="/deals" replace />

  const remainingSeconds = getDealRemainingSeconds(deal, nowMs)
  const storeSlug = deal.store ? deal.store.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
  const storeData = getStoreBySlug(storeSlug)
  const storePath = storeData ? `/store/${storeData.slug}` : '/stores'

  // Format time remaining for trust display
  const days = Math.floor(remainingSeconds / 86400)
  const hours = Math.floor((remainingSeconds % 86400) / 3600)
  const mins = Math.floor((remainingSeconds % 3600) / 60)
  const timeString = remainingSeconds > 0 
    ? `${days}d ${hours}h ${mins}m remaining` 
    : 'Offer Expired'

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        <svg className="h-4 w-4 text-line" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <Link to="/deals" className="hover:text-ink transition-colors">Deals</Link>
        <svg className="h-4 w-4 text-line" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="text-ink font-medium truncate max-w-[200px]">{deal.title}</span>
      </nav>

      {/* Main Deal Container - Professional Card Layout */}
      <section className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Visuals & Trust Badges */}
          <div className="lg:w-5/12 bg-gray-50/50 p-6 sm:p-10 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-line/40">
            {/* Image Box */}
            <div className="relative w-full aspect-[4/3] max-w-sm rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 p-4 flex items-center justify-center group">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                onError={e => e.target.style.display = 'none'}
              />
              {/* Discount Tag Top Left */}
              {deal.discountLabel && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                  {deal.discountLabel}
                </div>
              )}
            </div>

            {/* Trust Signals */}
            <div className="mt-6 w-full max-w-sm grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-xs font-bold">Verified Deal</span>
                </div>
                <span className="text-[10px] text-emerald-600/70 mt-0.5">Checked today</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-1.5 text-blue-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                  <span className="text-xs font-bold">{deal.successRate}% Success</span>
                </div>
                <span className="text-[10px] text-blue-600/70 mt-0.5">{deal.usageCount} utilized</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-muted font-medium">
               <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               {remainingSeconds > 0 ? (
                 <span className="text-orange-600 font-semibold">{timeString}</span>
               ) : (
                 <span className="text-red-500 font-semibold">Expired</span>
               )}
            </div>
          </div>

          {/* Right Column: Details & Action */}
          <div className="lg:w-7/12 p-6 sm:p-10 flex flex-col justify-center">
            
            {/* Header Area */}
            <div className="flex items-center justify-between mb-4">
              <Link to={storePath} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                <span className="uppercase tracking-wider">{deal.store}</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
              <button 
                onClick={() => setSaved(p => !p)} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${saved ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-50 text-muted hover:bg-gray-100 ring-1 ring-black/5'}`}
              >
                <svg className="h-3.5 w-3.5" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-tight mb-3">
              {deal.title}
            </h1>
            
            <p className="text-sm text-muted/90 leading-relaxed mb-8">
              {deal.description}
            </p>

            {/* Price & Action Area */}
            <div className="bg-gray-50 border border-line/50 rounded-xl p-5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-muted mb-1">Deal Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-ink">{deal.price}</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <a
                    href={deal.link || deal.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-ink/90 transition-all font-sans"
                  >
                    Get Deal Now
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Coupon Code Section (If applicable) */}
            {deal.code && (
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-dashed border-gold/50 bg-gold/5 gap-4">
                <div className="flex flex-col w-full text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Use Code at Checkout</span>
                  <span className="text-lg font-black text-ink tracking-widest">{deal.code}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gold text-midnight hover:bg-gold/90 shadow-[0_2px_10px_rgba(212,168,32,0.2)]'}`}
                >
                  {copied ? (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            )}
            
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        
        {/* Deal Terms and Info */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-ink border-b border-line/40 pb-3 mb-5">Offer Details & Guidelines</h2>
            
            {Array.isArray(deal.steps) && deal.steps.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  How to Redeem
                </h3>
                <div className="space-y-3">
                  {deal.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-surface border border-line text-xs font-bold text-ink mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-muted leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
             )}

            {Array.isArray(deal.highlights) && deal.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  Highlights
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {deal.highlights.map(point => (
                    <li key={point} className="flex items-start gap-2.5">
                      <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-sm text-muted">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
               <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                 <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Terms & Conditions
               </h3>
               <p className="text-sm text-muted/90 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-line/30">
                 {deal.terms || 'Standard terms and conditions apply. Offer subject to change without prior notice. Verify at merchant site.'}
               </p>
            </div>
          </div>
        </section>

        {/* Sidebar Info & Safety */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6">
             <h3 className="text-sm font-semibold text-ink mb-4">Quick Information</h3>
             <ul className="space-y-4">
                <li className="flex justify-between items-center text-sm">
                   <span className="text-muted">Category</span>
                   <span className="font-medium text-ink">{deal.category}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                   <span className="text-muted">Store/Brand</span>
                   <span className="font-medium text-ink">{deal.store}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                   <span className="text-muted">Offer Type</span>
                   <span className="font-medium text-ink capitalize">{deal.type}</span>
                </li>
                <li className="flex justify-between items-center text-sm border-t border-line/40 pt-4 mt-2">
                   <span className="text-muted">Added On</span>
                   <span className="font-medium text-ink">
                     {deal.createdAt ? new Date(deal.createdAt).toLocaleDateString() : 'Recently'}
                   </span>
                </li>
             </ul>
          </div>
          
          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 flex gap-3">
             <svg className="h-6 w-6 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Safe & Trusted Links</h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                   Links on Wouchify are verified for safety. We only partner with reputed, official stores.
                </p>
             </div>
          </div>
        </aside>

      </div>

      {/* Related Picks */}
      {relatedDeals.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-ink">Similar Offers</h2>
            <Link to="/deals" className="text-sm font-medium text-gold hover:text-gold/80 flex items-center gap-1">
              View All <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <DealGrid deals={relatedDeals} nowMs={nowMs} />
        </section>
      )}
    </main>
  )
}

export default DealDetail
