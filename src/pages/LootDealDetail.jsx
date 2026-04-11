import { Navigate, useParams } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import LootDealCard from '../components/LootDealCard'
import { useData } from '../context/DataContext'

function LootDealDetail() {
  const { lootDealId } = useParams()
  const { lootDeals } = useData()
  const deal = lootDeals.find(d => d.slug === (lootDealId || '').toLowerCase() || d.id === lootDealId)

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
    <main className="mx-auto max-w-7xl px-6 py-16">
      <section className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="overflow-hidden rounded-2xl">
            <img src={deal.image} alt={deal.title} className="h-72 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-96" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <p className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">{deal.discountPercent}% OFF</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ffb300]">LOOT VERIFIED</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl leading-[1.1]">{deal.title}</h1>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-base font-semibold text-muted line-through">{deal.oldPrice}</p>
              <p className="text-3xl font-bold text-ink">{deal.newPrice}</p>
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
              className="mt-8 group relative flex w-full sm:w-64 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-black py-4 text-sm font-black uppercase tracking-widest text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              Grab Deal
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 md:grid-cols-1">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 border border-gray-100">
          <h2 className="text-2xl font-black tracking-tight text-ink border-b border-gray-100 pb-4">Deal Overview</h2>
          <div className="mt-6 text-sm leading-8 text-ink/70">
            {deal.description}
          </div>

          {Array.isArray(deal.steps) && deal.steps.length > 0 && (
            <div className="mt-8 rounded-xl bg-gray-50 p-6">
              <h3 className="text-lg font-black text-ink uppercase tracking-wide">Steps to Claim</h3>
              <div className="mt-4 space-y-4">
                {deal.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">{idx + 1}</span>
                    <p className="text-sm font-bold text-ink/80 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-black text-ink uppercase tracking-wide">Important Terms</h3>
            <p className="mt-3 text-sm leading-7 text-muted border-l-4 border-[#ffb300] pl-4 italic bg-[#ffb300]/5 py-3 rounded-r-lg">{deal.terms}</p>
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
