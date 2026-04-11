import { Link } from 'react-router-dom'
import { storesData } from '../data/storesData'
import ShareButton from './ShareButton'
import CircularTimer from './CircularTimer'

function DealCard({ deal, remainingSeconds }) {
  const isExpired = remainingSeconds <= 0

  // Find store logo
  const store = storesData.find(s => s.name.toLowerCase() === (deal.store || '').toLowerCase())
  const logoUrl = store?.logo
  const logoText = (deal.store || '').slice(0, 2).toUpperCase()

  const getBadgeStyle = (badge) => {
    const b = (badge || '').toUpperCase()
    if (b === 'HOT') return 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse'
    if (b === 'FLASH') return 'bg-amber-400 text-black font-black shadow-[0_0_10px_rgba(251,191,36,0.5)]'
    if (b === 'EXCLUSIVE') return 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]'
    if (b === 'LOOT') return 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]'
    return 'bg-gold/20 text-gold'
  }

  return (
    <article className={`rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${isExpired ? 'opacity-60 grayscale' : 'hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]'}`}>
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img loading="lazy" src={deal.image} alt={deal.title} className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105" />
        
        <span className="absolute left-2.5 top-2.5 rounded-lg bg-black/60 backdrop-blur-[2px] px-2.5 py-1 text-[10px] font-black text-white shadow-md flex items-center justify-center gap-1.5 z-10 border border-white/10" title="Total Views">
          <span className="text-[12px] leading-none mb-[1px]">👁️</span> {deal.usageCount || 0}
        </span>
        
        <span className="absolute right-3 top-3 rounded-full bg-[#ff9800] px-3 py-1 text-xs font-bold text-white shadow-md">
          {deal.discountLabel}
        </span>
        {isExpired && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="rounded-xl border-2 border-white/80 bg-red-600/80 px-6 py-2 text-xl font-black tracking-widest text-white shadow-xl backdrop-blur-md rotate-[-12deg]">
              EXPIRED
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={deal.store} className="h-10 w-10 rounded-full object-contain bg-white border border-line p-1 shadow-sm" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">{logoText}</div>
          )}
          <div>
            <p className="text-sm font-bold text-ink leading-none">{deal.store}</p>
            <p className="text-[10px] text-muted mt-1 uppercase tracking-wider font-bold">Verified Store</p>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-[10px] font-black tracking-tighter ${getBadgeStyle(deal.badge)}`}>
          {deal.badge}
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold text-ink line-clamp-2 h-12">{deal.title}</h3>

      <div className="mt-4 flex items-end justify-between">
        <div className="flex flex-col">
          {(deal.originalPrice || deal.oldPrice) && (
            <span className="text-[11px] font-bold text-gray-400 line-through mb-0.5">
              {!String(deal.originalPrice || deal.oldPrice).includes('₹') && '₹'}{deal.originalPrice || deal.oldPrice}
            </span>
          )}
          <p className="text-[22px] font-black text-[#12151C] leading-none tracking-tight">
            {!String(deal.price || '').includes('₹') && '₹'}{deal.price}
          </p>
        </div>
        <div className="rounded-md bg-[#ffb300]/10 border border-[#ffb300]/20 px-2 py-1 flex items-center justify-center">
          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#b48600]">
            {deal.category}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-line/40 min-h-[50px] overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden pb-1 no-scrollbar shrink">
          <CircularTimer remainingSeconds={remainingSeconds} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to={isExpired ? '#' : `/deal/${deal.slug}`}
          className={`flex-1 inline-flex items-center justify-center rounded-xl px-4 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden relative group ${isExpired
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'bg-[#ffb300] text-black shadow-xl hover:shadow-[0_10px_25px_rgba(255,179,0,0.3)] hover:-translate-y-1'
            }`}
        >
          {!isExpired && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
          {isExpired ? 'Offer Ended' : 'View Deal'}
        </Link>
        <ShareButton
          title={deal.title}
          text={`${deal.discountLabel} off at ${deal.store} — ${deal.title}`}
          url={`${window.location.origin}/deal/${deal.slug}`}
        />
      </div>
    </article>
  )
}

export default DealCard
