import { Link } from 'react-router-dom'
import { storesData } from '../data/storesData'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import ShareButton from './ShareButton'

const FALLBACK = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80'

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

export default function DealCard({ deal, remainingSeconds }) {
  const isExpired = remainingSeconds !== null && remainingSeconds <= 0
  const hasTimer  = remainingSeconds !== null && remainingSeconds > 0 && remainingSeconds !== Infinity
  const isUrgent  = remainingSeconds !== null && remainingSeconds > 0 && remainingSeconds < 3600

  const hh = hasTimer ? pad(Math.floor((remainingSeconds % 86400) / 3600)) : '00'
  const mm = hasTimer ? pad(Math.floor((remainingSeconds % 3600) / 60))    : '00'
  const ss = hasTimer ? pad(Math.floor(remainingSeconds % 60))             : '00'

  // ── Store logo ──
  const sn  = (deal.store || '').toLowerCase()
  const ms  = storesData.find(s => s.name.toLowerCase() === sn)
           || storesData.find(s => sn.includes(s.name.toLowerCase()))
           || storesData.find(s => s.name.toLowerCase().includes(sn))
  const logoUrl  = ms?.logo || resolveStoreLogoUrl(deal.store)
  const logoText = (deal.store || 'ST').slice(0, 2).toUpperCase()
  const slug     = deal.slug || deal.id

  // ── Pricing ──
  const price = deal.newPrice || deal.price || null
  const originalPrice = deal.originalPrice || deal.oldPrice || null
  
  const savings = (() => {
    try {
      const o = parseFloat(String(originalPrice || '').replace(/[^\d.]/g, ''))
      const n = parseFloat(String(price || '').replace(/[^\d.]/g, ''))
      if (o && n && o > n) return `₹${(o - n).toLocaleString()} off`
    } catch {}
    return null
  })()

  // ── Social Proof mapping ──
  // If the deal doesn't have a explicit `grabbed` count, fallback to using `reviews` or `usageCount` if available as social proof.
  const socialProofText = deal.grabbed 
    ? `${deal.grabbed} people grabbed this!` 
    : deal.usageCount 
      ? `${deal.usageCount} users claimed this!` 
      : deal.reviews 
        ? `${deal.reviews}+ people rated this!` 
        : null

  // ── Badges ──
  const discountText = deal.discountPercent ? `${deal.discountPercent}% OFF` : deal.discountLabel
  const getBadgeColors = (badge) => {
    const b = (badge || '').toUpperCase()
    if (b === 'HOT')       return 'bg-red-500 text-white'
    if (b === 'FLASH')     return 'bg-amber-400 text-black'
    if (b === 'EXCLUSIVE') return 'bg-purple-600 text-white'
    if (b === 'LOOT')      return 'bg-emerald-500 text-white'
    return 'bg-black/80 text-[#C89B1E]'
  }

  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
      isExpired
        ? 'opacity-55 grayscale border-gray-200'
        : 'border-[#E8E4DC] shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 hover:border-red-300/50 hover:shadow-[0_20px_50px_rgba(239,68,68,0.10)]'
    }`}>

      {/* ══ 1. IMAGE ══════════════════════════════════════════ */}
      <Link to={isExpired ? '#' : `/deal/${slug}`} className={`relative block h-[170px] shrink-0 overflow-hidden bg-gray-100 ${isExpired ? 'cursor-not-allowed pointer-events-none' : ''}`}>
        <img
          loading="lazy"
          src={deal.image || FALLBACK}
          alt={deal.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = FALLBACK }}
        />
        {/* gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

        {/* Discount — top right */}
        {discountText && (
          <span className="absolute right-2.5 top-2.5 rounded-lg bg-red-500 px-2.5 py-1 text-[10px] font-black text-white shadow-md">
            {discountText}
          </span>
        )}

        {/* Badge — top left */}
        {deal.badge && (
          <span className={`absolute top-2.5 left-2.5 rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-wider shadow-md ${getBadgeColors(deal.badge)}`}>
            {deal.badge}
          </span>
        )}

        {/* Urgency — bottom right */}
        {deal.urgency && !isExpired && (
          <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-red-600/90 px-2 py-1 text-[9px] font-black text-white backdrop-blur-sm">
            ⚡ {deal.urgency}
          </span>
        )}

        {/* Store — bottom left */}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-[#C89B1E] backdrop-blur-sm">
          {deal.store}
        </span>

        {/* Expired stamp */}
        {isExpired && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm">
            <span className="-rotate-12 rounded-xl border-2 border-white/70 bg-red-600/90 px-5 py-2 text-base font-black tracking-widest text-white shadow-lg">
              EXPIRED
            </span>
          </div>
        )}
      </Link>

      {/* ══ 2. CARD BODY (Strict Top-to-Bottom, Fixed Heights) ══ */}
      <div className="flex flex-1 flex-col p-3.5">

        {/* ── Row A: Store logo + name + DEAL badge (fixed h-9) ── */}
        <div className="mb-2 flex h-9 items-center gap-2">
          {logoUrl ? (
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-[#E8E4DC] bg-white p-0.5 shadow-sm">
              <img src={logoUrl} alt={deal.store} className="h-full w-full object-contain" onError={e => e.target.style.display = 'none'} />
            </div>
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#C89B1E]/20 bg-[#C89B1E]/10 text-[10px] font-black text-[#C89B1E]">
              {logoText}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-black text-[#121826]">{deal.store}</p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
              Verified Store
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#121826] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#C89B1E]">
            DEAL
          </span>
        </div>

        {/* ── Row B: Category chip & Rating (fixed h-6) ── */}
        <div className="mb-2 flex h-6 items-center justify-between">
          <div className="flex items-center">
            {deal.category ? (
              <span className="inline-block rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-red-600">
                {deal.category}
              </span>
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
          {deal.rating && (
            <div className="flex items-center gap-1 rounded-md bg-orange-50 px-1.5 py-0.5 border border-orange-100">
              <span className="text-[11px]">⭐</span>
              <span className="text-[11px] font-black text-orange-600">{deal.rating}</span>
              {deal.reviews && <span className="text-[10px] font-bold text-orange-500">({deal.reviews})</span>}
            </div>
          )}
        </div>

        {/* ── Row C: Title (fixed 2-line height) ── */}
        <Link to={isExpired ? '#' : `/deal/${slug}`} className={`mb-2.5 block ${isExpired ? 'cursor-not-allowed pointer-events-none' : ''}`}>
          <h3 className="line-clamp-2 min-h-[2.8rem] text-[14px] font-bold leading-snug text-[#121826] transition-colors hover:text-red-500">
            {deal.title}
          </h3>
        </Link>

        {/* ── Row D: Price (fixed h-8) ── */}
        <div className="mb-2 flex h-8 flex-wrap items-baseline gap-x-2 gap-y-0 overflow-hidden">
          {price && (
            <span className="text-[20px] font-extrabold leading-none text-[#121826]">{price}</span>
          )}
          {originalPrice && (
            <span className="text-[13px] font-medium text-[#6B7280] line-through">{originalPrice}</span>
          )}
          {savings && (
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-black text-emerald-700">
              {savings}
            </span>
          )}
          {deal.isFreeShipping && (
            <span className="flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 border border-blue-100 text-[11px] font-black text-blue-700">
              🚚 Free
            </span>
          )}
        </div>

        {/* ── Row E: Social proof (fixed h-8) ── */}
        <div className="mb-2.5 flex h-8 items-center">
          {socialProofText ? (
            <div className="flex w-full items-center gap-1.5 rounded-xl border border-emerald-200/50 bg-emerald-50/70 px-2.5 py-1.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-700 truncate">{socialProofText}</span>
            </div>
          ) : (
            <div className="w-full" />
          )}
        </div>

        {/* ── Row F: Timer strip / Promo Code / Evergreen (fixed h-[42px]) ── */}
        <div className="mb-3 flex h-[42px] items-stretch">
          {isExpired ? (
            <div className="flex w-full items-center justify-center rounded-xl border border-red-200 bg-red-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Deal Expired</span>
            </div>
          ) : hasTimer ? (
            <div className={`flex w-full items-center justify-between rounded-xl px-3 ${isUrgent ? 'bg-red-500' : 'bg-[#0f0f1e]'}`}>
              <span className={`text-[11px] font-black uppercase tracking-wider ${isUrgent ? 'text-white' : 'text-[#C89B1E]'}`}>
                ⏱ Ends in
              </span>
              <div className="flex items-center gap-1.5">
                <div className={`flex flex-col items-center justify-center rounded-lg px-2 py-1 min-w-[30px] ${isUrgent ? 'bg-white/20' : 'bg-white/10'}`}>
                  <span className={`text-[15px] font-black leading-none font-mono ${isUrgent ? 'text-white' : 'text-[#C89B1E]'}`}>{hh}</span>
                  <span className={`text-[8px] font-bold uppercase mt-0.5 ${isUrgent ? 'text-white/80' : 'text-[#C89B1E]/70'}`}>H</span>
                </div>
                <span className={`text-[15px] font-black ${isUrgent ? 'text-white/70' : 'text-[#C89B1E]/60'}`}>:</span>
                <div className={`flex flex-col items-center justify-center rounded-lg px-2 py-1 min-w-[30px] ${isUrgent ? 'bg-white/20' : 'bg-white/10'}`}>
                  <span className={`text-[15px] font-black leading-none font-mono ${isUrgent ? 'text-white' : 'text-[#C89B1E]'}`}>{mm}</span>
                  <span className={`text-[8px] font-bold uppercase mt-0.5 ${isUrgent ? 'text-white/80' : 'text-[#C89B1E]/70'}`}>M</span>
                </div>
                <span className={`text-[15px] font-black ${isUrgent ? 'text-white/70' : 'text-[#C89B1E]/60'}`}>:</span>
                <div className={`flex flex-col items-center justify-center rounded-lg px-2 py-1 min-w-[30px] ${isUrgent ? 'bg-white/20' : 'bg-white/10'}`}>
                  <span className={`text-[15px] font-black leading-none font-mono ${isUrgent ? 'text-white' : 'text-[#C89B1E]'}`}>{ss}</span>
                  <span className={`text-[8px] font-bold uppercase mt-0.5 ${isUrgent ? 'text-white/80' : 'text-[#C89B1E]/70'}`}>S</span>
                </div>
              </div>
            </div>
          ) : deal.code ? (
            <div className="flex w-full items-center justify-between rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 px-3 hover:bg-emerald-100 transition-colors">
              <span className="text-[11px] font-black uppercase text-emerald-700">Promo</span>
              <span className="rounded-md bg-white px-2 py-1 text-[12px] font-mono font-black tracking-widest text-emerald-700 shadow-sm">{deal.code}</span>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/50">
              <span className="flex items-center gap-1.5 text-[10px] font-black tracking-wide text-emerald-600">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Active Deal
              </span>
            </div>
          )}
        </div>

        {/* ── Row G: CTA + Share (always at bottom, no mt-auto gap) ── */}
        <div className="flex items-center gap-2">
          <Link
            to={isExpired ? '#' : `/deal/${slug}`}
            className={`relative flex-1 overflow-hidden rounded-xl py-2.5 text-center text-[11px] font-black uppercase tracking-wider shadow-sm transition-all duration-300 ${
              isExpired
                ? 'bg-[#E8E4DC] text-[#9CA3AF] cursor-not-allowed pointer-events-none'
                : 'bg-[#C89B1E] text-[#141417] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,155,30,0.40)] active:scale-95'
            }`}
          >
            {!isExpired && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
            )}
            {isExpired ? 'Offer Ended' : '🔥 Grab Deal'}
          </Link>
          <ShareButton
            title={deal.title}
            text={`${discountText ? discountText + ' — ' : ''}${deal.title} at ${price}`}
            url={`${window.location.origin}/deal/${slug}`}
          />
        </div>

      </div>
    </article>
  )
}
