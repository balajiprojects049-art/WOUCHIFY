import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { storesData } from '../data/storesData'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import ShareButton from './ShareButton'

function LootDealCard({ deal }) {
  const [nowMs, setNowMs] = useState(Date.now())
  const [mountTime] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const remainingSeconds = useMemo(() => {
    const total = Number(deal.expiresInSeconds) || 0
    if (total <= 0) return 0
    const birth = deal.createdAt ? new Date(deal.createdAt).getTime() : mountTime
    const elapsed = Math.floor((nowMs - birth) / 1000)
    return Math.max(total - Math.max(elapsed, 0), 0)
  }, [deal.expiresInSeconds, deal.createdAt, nowMs, mountTime])

  const isExpired = remainingSeconds <= 0
  const days    = Math.floor(remainingSeconds / 86400)
  const hours   = Math.floor((remainingSeconds % 86400) / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60

  const savings = (() => {
    try {
      const o = parseFloat(String(deal.oldPrice || '').replace(/[^\d.]/g, ''))
      const n = parseFloat(String(deal.newPrice || '').replace(/[^\d.]/g, ''))
      if (o && n && o > n) return `₹${(o - n).toLocaleString()} off`
    } catch {}
    return null
  })()

  // Store logo
  const storeName = (deal.store || '').toLowerCase()
  const matchedStore = storesData.find(s => s.name.toLowerCase() === storeName)
    || storesData.find(s => storeName.includes(s.name.toLowerCase()))
    || storesData.find(s => s.name.toLowerCase().includes(storeName))
  const logoUrl = matchedStore?.logo || resolveStoreLogoUrl(deal.store)
  const logoText = (deal.store || '').slice(0, 2).toUpperCase()

  return (
    <article className={`group flex flex-col rounded-2xl border bg-surface overflow-hidden transition-all duration-300 ${
      isExpired
        ? 'opacity-60 grayscale border-line/30'
        : 'border-line/50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1.5'
    }`}>

      {/* Image */}
      <Link to={`/loot-deal/${deal.slug}`} className="block relative overflow-hidden">
        <img
          loading="lazy"
          src={deal.image}
          alt={deal.title}
          className="h-32 sm:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => e.target.style.display = 'none'}
        />

        {/* Discount badge */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-lg sm:rounded-xl bg-gold px-2 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-black text-surface shadow-lg">
          {deal.discountPercent}% OFF
        </div>

        {/* Views */}
        <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex items-center gap-1 sm:gap-1.5 rounded-md sm:rounded-lg bg-black/60 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-bold text-white backdrop-blur-sm">
          👁️ {deal.usageCount || 0}
        </span>

        {/* Urgency tag */}
        {deal.urgency && (
          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-0.5 sm:gap-1 rounded-md sm:rounded-lg bg-red-600/90 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[10px] font-black text-white backdrop-blur-sm">
            ⚡ {deal.urgency}
          </span>
        )}

        {isExpired && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <span className="rotate-[-10deg] rounded-xl border-2 border-white/70 bg-red-600/90 px-6 py-2 text-lg font-black tracking-widest text-white">
              EXPIRED
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4 gap-2 sm:gap-3">

        {/* Store name + logo row */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 mb-0.5 sm:mb-1">
          {logoUrl ? (
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-white border border-line flex items-center justify-center p-0.5 sm:p-1 shadow-sm overflow-hidden flex-shrink-0">
              <img src={logoUrl} alt={deal.store} className="h-full w-full object-contain" onError={e => e.target.style.display='none'} />
            </div>
          ) : (
            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-gold/15 text-[8px] sm:text-[10px] font-black text-gold border border-gold/20 flex-shrink-0">{logoText || 'ST'}</div>
          )}
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-black text-ink leading-tight truncate">{deal.store || 'Store'}</p>
            <p className="text-[8px] sm:text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 sm:gap-1">
              <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="truncate">Verified Store</span>
            </p>
          </div>
        </div>

        {/* Category + Badge row */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-gold/10 border border-gold/20 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wide text-gold truncate max-w-[70%] sm:max-w-none">
            {deal.category}
          </span>
          <span className="hidden sm:inline-block rounded-full bg-ink px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-gold">
            LOOT DEAL
          </span>
        </div>

        {/* Title */}
        <Link to={`/loot-deal/${deal.slug}`}>
          <h3 className="text-[13px] sm:text-[15px] font-bold text-ink line-clamp-2 leading-snug hover:text-[#ff6b00] transition-colors">
            {deal.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 sm:gap-3 flex-wrap">
          <p className="text-lg sm:text-2xl font-black text-ink tracking-tight leading-none">
            {!String(deal.newPrice || '').includes('₹') && '₹'}{deal.newPrice}
          </p>
          {deal.oldPrice && (
            <p className="text-xs sm:text-sm font-bold text-muted line-through">
              {!String(deal.oldPrice || '').includes('₹') && '₹'}{deal.oldPrice}
            </p>
          )}
          {savings && (
            <span className="rounded-md sm:rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-black text-emerald-500 whitespace-nowrap">
              {savings}
            </span>
          )}
        </div>

        {/* Social proof bar */}
        {deal.grabbed && (
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-emerald-500/5 border border-emerald-500/10 px-2 py-1.5 sm:px-3 sm:py-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[9px] sm:text-[11px] font-black text-emerald-500/80 leading-none truncate">
              {deal.grabbed} grabbed this!
            </span>
          </div>
        )}

        {/* Flipboard Countdown Timer */}
        {!isExpired ? (
          <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2 bg-black/40 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2.5 border border-gold/20">
            <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gold/60 flex-shrink-0">⏱ Ends in</span>
            <div className="flex items-center gap-0.5 sm:gap-1 mx-auto sm:ml-auto">
              {days > 0 && (<><LFlipUnit value={days} label="D" /><LColon /></>)}
              <LFlipUnit value={hours} label="H" />
              <LColon />
              <LFlipUnit value={minutes} label="M" />
              <LColon />
              <LFlipUnit value={seconds} label="S" urgent={remainingSeconds < 3600} />
            </div>
          </div>
        ) : (
          <div className="rounded-lg sm:rounded-xl bg-ink px-2 py-1.5 sm:px-3 sm:py-2 text-center border border-line">
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-red-500 uppercase">Expired</span>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
          <Link
            to={`/loot-deal/${deal.slug}`}
            className="flex-1 relative overflow-hidden inline-flex items-center justify-center rounded-lg sm:rounded-xl py-2 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.08em] sm:tracking-[0.15em] bg-gold text-surface shadow-md sm:shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-gold/90 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            ⚡ Grab Deal
          </Link>
          <ShareButton
            title={deal.title}
            text={`${deal.discountPercent}% OFF — ${deal.title} at ${deal.newPrice}`}
            url={`${window.location.origin}/loot-deal/${deal.slug}`}
          />
        </div>
      </div>
    </article>
  )
}

function LFlipUnit({ value, label, urgent }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg font-black text-[11px] sm:text-sm font-mono ${urgent ? 'bg-red-500 text-white' : 'bg-gold/10 text-gold'}`}>
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[6px] sm:text-[7px] font-bold uppercase text-gold/60 mt-0.5">{label}</span>
    </div>
  )
}

function LColon() {
  return <span className="text-gold/40 font-black text-[11px] sm:text-sm mb-2 sm:mb-3">:</span>
}

export default LootDealCard


