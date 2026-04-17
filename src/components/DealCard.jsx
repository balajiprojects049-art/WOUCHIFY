import { Link } from 'react-router-dom'
import { storesData } from '../data/storesData'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import ShareButton from './ShareButton'

function DealCard({ deal, remainingSeconds }) {
  const isExpired = remainingSeconds <= 0

  // Find store logo — try exact match first, then partial/fuzzy
  const storeName = (deal.store || '').toLowerCase()
  const store = storesData.find(s => s.name.toLowerCase() === storeName)
    || storesData.find(s => storeName.includes(s.name.toLowerCase()))
    || storesData.find(s => s.name.toLowerCase().includes(storeName))
  const logoUrl = store?.logo || resolveStoreLogoUrl(deal.store)
  const logoText = (deal.store || '').slice(0, 2).toUpperCase()

  // Timer units
  const days    = Math.floor(remainingSeconds / 86400)
  const hours   = Math.floor((remainingSeconds % 86400) / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = Math.floor(remainingSeconds % 60)

  const getBadgeColors = (badge) => {
    const b = (badge || '').toUpperCase()
    if (b === 'HOT')       return 'bg-red-500 text-white'
    if (b === 'FLASH')     return 'bg-amber-400 text-black'
    if (b === 'EXCLUSIVE') return 'bg-purple-600 text-white'
    if (b === 'LOOT')      return 'bg-emerald-500 text-white'
    return 'bg-gold/20 text-gold'
  }

  // Derive original price: use stored field, or calculate from discount %
  const derivedOriginalPrice = (() => {
    const stored = deal.originalPrice || deal.oldPrice
    if (stored) return stored

    // Auto-calculate from discountValue % if available
    try {
      const curr = parseFloat(String(deal.price || '').replace(/[^\d.]/g, ''))
      const pct  = parseFloat(String(deal.discountValue || '').replace(/[^\d.]/g, ''))
      if (curr > 0 && pct > 0 && pct < 100) {
        const orig = Math.round(curr / (1 - pct / 100))
        return `₹${orig.toLocaleString()}`
      }
    } catch {}
    return null
  })()

  const savings = (() => {
    try {
      const orig = parseFloat(String(derivedOriginalPrice || '').replace(/[^\d.]/g, ''))
      const curr = parseFloat(String(deal.price || '').replace(/[^\d.]/g, ''))
      if (orig && curr && orig > curr) return `Save ₹${(orig - curr).toLocaleString()}`
    } catch {}
    return deal.discountLabel
  })()


  return (
    <article className={`group flex flex-col rounded-2xl border bg-surface overflow-hidden transition-all duration-300 ${
      isExpired
        ? 'opacity-60 grayscale border-line/30'
        : 'border-line/50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1'
    }`}>

      {/* ── Image Banner ── */}
      <div className="relative overflow-hidden bg-cream">
        <img
          loading="lazy"
          src={deal.image}
          alt={deal.title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => e.target.style.display = 'none'}
        />

        {/* Discount pill */}
        <div className="absolute top-3 right-3 rounded-xl bg-gold px-3 py-1.5 text-xs font-black text-surface shadow-lg">
          {deal.discountLabel}
        </div>

        {/* Badge */}
        {deal.badge && (
          <span className={`absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm ${getBadgeColors(deal.badge)}`}>
            {deal.badge}
          </span>
        )}

        {/* Views */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          👁️ {deal.usageCount || 0} views
        </span>

        {isExpired && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <span className="rotate-[-10deg] rounded-xl border-2 border-white/70 bg-red-600/90 px-6 py-2 text-lg font-black tracking-widest text-white">
              EXPIRED
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-4 gap-3">

        {/* Store row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {logoUrl ? (
              <img src={logoUrl} alt={deal.store} className="h-9 w-9 rounded-lg object-contain bg-white border border-line p-1 shadow-sm" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-xs font-black text-gold border border-gold/20">{logoText}</div>
            )}
            <div>
              <p className="text-sm font-black text-ink leading-tight">{deal.store}</p>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Store
              </p>
            </div>
          </div>
          {/* Category chip */}
          <span className="rounded-full bg-gold/5 border border-gold/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-gold">
            {deal.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-ink line-clamp-2 leading-snug flex-1">
          {deal.title}
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-2xl font-black text-ink tracking-tight leading-none">
            {!String(deal.price || '').includes('₹') && '₹'}{deal.price}
          </p>
          {derivedOriginalPrice && (
            <p className="text-sm font-bold text-muted line-through">
              {!String(derivedOriginalPrice).includes('₹') && '₹'}{derivedOriginalPrice}
            </p>
          )}
          {savings && savings !== deal.discountLabel && (
            <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-500">
              {savings}
            </span>
          )}
        </div>

        {/* ── Flipboard Timer ── */}
        {!isExpired ? (
          <div className="flex items-center gap-2 bg-black/40 rounded-xl px-3 py-2.5 border border-gold/20">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted flex-shrink-0">Ends in</span>
            <div className="flex items-center gap-1 ml-auto">
              {days > 0 && (
                <>
                  <FlipUnit value={days} label="D" />
                  <Colon />
                </>
              )}
              <FlipUnit value={hours} label="H" />
              <Colon />
              <FlipUnit value={minutes} label="M" />
              <Colon />
              <FlipUnit value={seconds} label="S" urgent={remainingSeconds < 3600} />
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-ink px-3 py-2 text-center border border-line">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">Deal Expired</span>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={isExpired ? '#' : `/deal/${deal.slug}`}
            className={`flex-1 relative overflow-hidden inline-flex items-center justify-center rounded-xl py-3 text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 ${
              isExpired
                ? 'bg-cream text-muted border border-line cursor-not-allowed pointer-events-none'
                : 'bg-gold text-surface shadow-lg shadow-gold/20 hover:bg-gold/90 hover:-translate-y-0.5'
            }`}
          >
            {!isExpired && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
            {isExpired ? 'Offer Ended' : '🔥 Grab Deal'}
          </Link>
          <ShareButton
            title={deal.title}
            text={`${deal.discountLabel} off at ${deal.store} — ${deal.title}`}
            url={`${window.location.origin}/deal/${deal.slug}`}
          />
        </div>
      </div>
    </article>
  )
}

function FlipUnit({ value, label, urgent }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-sm font-mono tracking-tight ${urgent ? 'bg-red-500 text-white' : 'bg-gold/10 text-gold'}`}>
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[7px] font-bold uppercase text-gold/60 mt-0.5">{label}</span>
    </div>
  )
}

function Colon() {
  return <span className="text-gold/40 font-black text-sm mb-3">:</span>
}

export default DealCard

