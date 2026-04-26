import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import LootDealCard from '../components/LootDealCard'
import { useData } from '../context/DataContext'

function LootDealDetail() {
  const { lootDealId } = useParams()
  const { lootDeals, trackDealClick } = useData()
  const deal = lootDeals.find(d => d.slug === (lootDealId || '').toLowerCase() || d.id === lootDealId)

  const [shareCopied, setShareCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: deal.title,
      text: deal.description,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  useEffect(() => {
    if (deal) trackDealClick(deal.slug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal?.slug])

  const relatedDeals = lootDeals
    .filter((item) => deal && item.id !== deal.id && item.category === deal.category)
    .slice(0, 4)

  if (!deal) {
    return <Navigate to="/loot-deals" replace />
  }

  const handleGrabDeal = () => {
    if (deal.link) {
      window.open(deal.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-surface p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:p-7 border border-line/10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="overflow-hidden rounded-2xl">
            <img src={deal.image} alt={deal.title} className="h-72 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-96" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">{deal.discountPercent}% OFF</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ffb300]">LOOT VERIFIED</span>
              </div>
              <button 
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${shareCopied ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20' : 'bg-surface/50 text-muted hover:bg-surface ring-1 ring-line'}`}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                {shareCopied ? 'Copied' : 'Share'}
              </button>
            </div>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-4xl leading-[1.1]">{deal.title}</h1>

            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm font-semibold text-muted line-through">{deal.oldPrice}</p>
              <p className="text-2xl font-black text-ink">{deal.newPrice}</p>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 inline-block">
              <CountdownTimer createdAt={deal.createdAt} initialSeconds={deal.expiresInSeconds} label="ENDS IN" />
            </div>

            <div className="mt-6 space-y-2.5 text-sm font-semibold">
              <p className="flex items-center gap-2 text-red-500">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                {deal.grabbed} users grabbed this deal
              </p>
              <p className="text-ink flex items-center gap-2">
                <svg className="h-4 w-4 text-[#ffb300]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z" clipRule="evenodd" /></svg>
                {deal.stockLabel}
              </p>
              <p className="text-red-500 font-black uppercase tracking-tighter">{deal.urgency}</p>
            </div>

            <button
              onClick={handleGrabDeal}
              className="mt-6 group relative flex w-full sm:w-60 items-center justify-center gap-3 overflow-hidden rounded-xl bg-gold py-3.5 text-xs font-black uppercase tracking-widest text-surface transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              Grab Deal
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-1">
        <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-7 border border-line">
          <h2 className="text-xl font-black tracking-tight text-ink border-b border-line pb-3">Deal Overview</h2>
          <div className="mt-4 text-sm leading-7 text-muted">
            {deal.description}
          </div>

          {Array.isArray(deal.steps) && deal.steps.length > 0 && (
            <div className="mt-8 rounded-xl bg-cream p-6 border border-line">
              <h3 className="text-lg font-black text-ink uppercase tracking-wide">Steps to Claim</h3>
              <div className="mt-4 space-y-4">
                {deal.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-black text-surface">{idx + 1}</span>
                    <p className="text-sm font-bold text-ink pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-black text-ink uppercase tracking-wide">Important Terms</h3>
            <p className="mt-3 text-sm leading-7 text-muted border-l-4 border-gold pl-4 italic bg-gold/5 py-3 rounded-r-lg">{deal.terms}</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tight text-ink">Related Loot Deals</h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden sm:block"></div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {relatedDeals.map((item) => (
            <LootDealCard key={item.id} deal={item} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default LootDealDetail
