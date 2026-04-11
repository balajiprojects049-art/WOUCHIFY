import { Link } from 'react-router-dom'
import CountdownTimer from './CountdownTimer'
import ShareButton from './ShareButton'

function LootDealCard({ deal }) {
  const logoText = (deal.category || '').slice(0, 2).toUpperCase()

  return (
    <article className="group rounded-[2rem] border border-[#ffb300]/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(255,179,0,0.12)]">
      <Link to={`/loot-deal/${deal.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl">
          <img loading="lazy" src={deal.image} alt={deal.title} className="h-44 w-full rounded-2xl object-cover transition-all duration-700 group-hover:scale-110" />
          
          <span className="absolute left-2.5 top-2.5 rounded-lg bg-black/60 backdrop-blur-[2px] px-2.5 py-1 text-[10px] font-black text-white shadow-md flex items-center justify-center gap-1.5 z-10 border border-white/10" title="Total Views">
            <span className="text-[12px] leading-none mb-[1px]">👁️</span> {deal.usageCount || 0}
          </span>
          
          <div className="absolute right-3 top-3 rounded-xl bg-[#ffb300] px-3 py-1.5 text-[10px] font-black text-black shadow-lg">
            {deal.discountPercent}% OFF
          </div>
          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-[#ffb300] backdrop-blur-md border border-white/5">
            Loot Verified
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffb300]/10 text-xs font-black text-[#ffb300]">
              {logoText}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#ffb300]">{deal.category}</p>
              <p className="text-[10px] font-bold text-muted mt-0.5">Premium Loot</p>
            </div>
          </div>
          <span className="rounded-full bg-[#12151C] px-3 py-1 text-[9px] font-black text-[#ffb300] border border-[#ffb300]/20">EXCLUSIVE</span>
        </div>

        <h3 className="mt-4 text-base font-black text-ink line-clamp-1 group-hover:text-[#ffb300] transition-colors">{deal.title}</h3>

        <div className="mt-3 flex items-end gap-2">
          <p className="text-xl font-black text-[#12151C] leading-none">
             {!String(deal.newPrice || '').includes('₹') && '₹'}{deal.newPrice}
          </p>
          <p className="text-xs font-bold text-muted line-through mb-0.5">
             {!String(deal.oldPrice || '').includes('₹') && '₹'}{deal.oldPrice}
          </p>
        </div>
      </Link>

      <div className="mt-4">
        <CountdownTimer createdAt={deal.createdAt} initialSeconds={deal.expiresInSeconds} label="Expires" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          {deal.grabbed} claimed
        </span>
        <span className="rounded-lg bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter">{deal.urgency}</span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Link
          to={`/loot-deal/${deal.slug}`}
          className="flex-1 relative overflow-hidden group/btn flex items-center justify-center rounded-xl bg-[#12151C] py-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffb300] transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
          Grab Deal
        </Link>
        <ShareButton
          title={deal.title}
          text={`${deal.discountPercent}% OFF — ${deal.title} at ${deal.newPrice}`}
          url={`${window.location.origin}/loot-deal/${deal.slug}`}
        />
      </div>
    </article>
  )
}

export default LootDealCard
