import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const FALLBACK = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80'

function DealCard({ deal }) {
  const navigate = useNavigate()
  const [imgErr, setImgErr] = useState(false)

  const discountText = deal.discountPercent
    ? `${deal.discountPercent}% OFF`
    : (deal.discount || deal.discountLabel || null)

  const price    = deal.newPrice || deal.price || null
  const oldPrice = deal.oldPrice || null

  return (
    <article
      onClick={() => navigate(`/deal/${deal.slug}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#EEEBE5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C89B1E]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
    >
      {/* ── Fixed-height Image Block ── */}
      <div className="relative h-[160px] shrink-0 overflow-hidden bg-gray-100">
        <img
          src={imgErr ? FALLBACK : (deal.image || FALLBACK)}
          alt={deal.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgErr(true)}
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* Discount badge — top right */}
        {discountText && (
          <div className="absolute right-2.5 top-2.5 rounded-lg bg-red-500 px-2 py-0.5 shadow-md">
            <span className="text-[10px] font-black text-white">{discountText}</span>
          </div>
        )}

        {/* Extra badge — top left */}
        {deal.badge && (
          <div className="absolute left-2.5 top-2.5 rounded-lg bg-[#C89B1E] px-2 py-0.5 shadow">
            <span className="text-[9px] font-black text-[#141417]">{deal.badge}</span>
          </div>
        )}

        {/* Store pill — bottom left, ON the image */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-[#C89B1E] backdrop-blur-sm">
            {deal.store}
          </span>
        </div>
      </div>

      {/* ── Content Block (equal height via flex-1) ── */}
      <div className="flex flex-1 flex-col p-3.5">
        {/* Title */}
        <h3 className="mb-auto line-clamp-2 text-[12.5px] font-bold leading-snug text-[#121826] transition-colors group-hover:text-[#C89B1E]">
          {deal.title}
        </h3>

        {/* Divider */}
        <div className="my-3 h-px bg-[#E6E2DA]" />

        {/* Price + Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {price && (
              <span className="text-base font-extrabold leading-none text-[#121826]">
                {price}
              </span>
            )}
            {oldPrice && (
              <span className="mt-0.5 text-[10px] text-[#667085] line-through">
                {oldPrice}
              </span>
            )}
          </div>

          <button className="shrink-0 rounded-xl bg-[#C89B1E] px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-[#141417] shadow-sm transition-all duration-300 group-hover:shadow-[0_4px_18px_rgba(200,155,30,0.5)] group-hover:scale-105 active:scale-95">
            View →
          </button>
        </div>
      </div>
    </article>
  )
}

export default function LatestDealsSection() {
  const navigate = useNavigate()
  const { userDeals: deals } = useData()

  const latest = [...(deals || [])]
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || a.publishAt || 0)
      const bDate = new Date(b.createdAt || b.publishAt || 0)
      return bDate - aDate
    })
    .slice(0, 5)

  if (!latest.length) return null

  return (
    <section>
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C89B1E]/10">
            <svg className="h-4 w-4 text-[#C89B1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gold dark:text-gold/80 mb-1 block">JUST ADDED</span>
            <h2 className="text-xl font-extrabold tracking-tight text-[#121826] dark:text-white">Latest Deals</h2>
          </div>
        </div>

        <button
          onClick={() => navigate('/deals')}
          className="group flex items-center gap-1.5 rounded-full border border-[#E6E2DA] bg-white px-4 py-2 text-[11px] font-bold text-[#667085] shadow-sm transition-all hover:border-[#C89B1E] hover:bg-[#C89B1E] hover:text-[#141417]"
        >
          View All
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      {/* ── 5-Card Uniform Grid ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {latest.map(deal => (
          <DealCard key={deal.slug || deal.id} deal={deal} />
        ))}
      </div>
    </section>
  )
}
