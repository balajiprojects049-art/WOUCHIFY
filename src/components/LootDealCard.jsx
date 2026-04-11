import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
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

  return (
    <article className={`group flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
      isExpired
        ? 'opacity-60 grayscale border-line/30'
        : 'border-line/50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5'
    }`}>

      {/* Image */}
      <Link to={`/loot-deal/${deal.slug}`} className="block relative overflow-hidden">
        <img
          loading="lazy"
          src={deal.image}
          alt={deal.title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => e.target.style.display = 'none'}
        />

        {/* Discount badge */}
        <div className="absolute top-3 right-3 rounded-xl bg-[#C89B1E] px-3 py-1.5 text-xs font-black text-[#12151C] shadow-lg">
          {deal.discountPercent}% OFF
        </div>

        {/* Views */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          👁️ {deal.usageCount || 0} views
        </span>

        {/* Urgency tag */}
        {deal.urgency && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-red-600/90 px-2 py-1 text-[10px] font-black text-white backdrop-blur-sm">
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
      <div className="flex flex-1 flex-col p-4 gap-3">

        {/* Category + Badge row */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-600">
            {deal.category}
          </span>
          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-amber-400">
            LOOT DEAL
          </span>
        </div>

        {/* Title */}
        <Link to={`/loot-deal/${deal.slug}`}>
          <h3 className="text-[15px] font-bold text-ink line-clamp-2 leading-snug hover:text-[#ff6b00] transition-colors">
            {deal.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-2xl font-black text-ink tracking-tight leading-none">
            {!String(deal.newPrice || '').includes('₹') && '₹'}{deal.newPrice}
          </p>
          {deal.oldPrice && (
            <p className="text-sm font-bold text-muted line-through">
              {!String(deal.oldPrice || '').includes('₹') && '₹'}{deal.oldPrice}
            </p>
          )}
          {savings && (
            <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-black text-emerald-600">
              {savings}
            </span>
          )}
        </div>

        {/* Social proof bar */}
        {deal.grabbed && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-black text-emerald-700">{deal.grabbed} people already grabbed this deal!</span>
          </div>
        )}

        {/* Flipboard Countdown Timer */}
        {!isExpired ? (
          <div className="flex items-center gap-2 bg-[#1F1F22] rounded-xl px-3 py-2.5 border border-[#C89B1E]/20">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#C89B1E]/60 flex-shrink-0">⏱ Ends in</span>
            <div className="flex items-center gap-1 ml-auto">
              {days > 0 && (<><LFlipUnit value={days} label="D" /><LColon /></>)}
              <LFlipUnit value={hours} label="H" />
              <LColon />
              <LFlipUnit value={minutes} label="M" />
              <LColon />
              <LFlipUnit value={seconds} label="S" urgent={remainingSeconds < 3600} />
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-center">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">Deal Expired</span>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/loot-deal/${deal.slug}`}
            className="flex-1 relative overflow-hidden inline-flex items-center justify-center rounded-xl py-3 text-xs font-black uppercase tracking-[0.15em] bg-[#C89B1E] text-[#12151C] shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-[#D4A820] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            ⚡ Grab Loot Deal
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
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-sm font-mono ${urgent ? 'bg-red-500 text-white' : 'bg-[#C89B1E]/20 text-[#C89B1E]'}`}>
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[7px] font-bold uppercase text-[#C89B1E]/60 mt-0.5">{label}</span>
    </div>
  )
}

function LColon() {
  return <span className="text-[#C89B1E]/40 font-black text-sm mb-3">:</span>
}

export default LootDealCard


