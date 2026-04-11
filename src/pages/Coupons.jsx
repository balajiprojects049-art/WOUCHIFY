import { useEffect, useRef, useState } from 'react'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import FilterBar from '../components/FilterBar'
import { useData } from '../context/DataContext'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import ShareButton from '../components/ShareButton'

/* ── Animations ──────────────────────────────────────────────────── */
const css = `
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes revealBurst {
  0%   { transform: scale(0.85); opacity: 0; filter: blur(8px); }
  60%  { transform: scale(1.05); opacity: 1; filter: blur(0); }
  100% { transform: scale(1);    opacity: 1; filter: blur(0); }
}
@keyframes confettiFall {
  0%   { transform: translateY(0)    rotate(0deg)   scale(1); opacity: 1; }
  100% { transform: translateY(60px) rotate(720deg) scale(0); opacity: 0; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(1.5); opacity: 0;   }
}
@keyframes slide-up {
  from { transform: translateY(10px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.reveal-anim { animation: revealBurst 0.5s cubic-bezier(.22,1,.36,1) forwards; }
.slide-up    { animation: slide-up 0.35s ease forwards; }
`

/* ── Confetti ────────────────────────────────────────────────────── */
function ConfettiBurst({ trigger }) {
  const [particles, setParticles] = useState([])
  const colors = ['#FFD700','#C9A84C','#FF6B6B','#4ECDC4','#7B61FF','#FF8C00']

  useEffect(() => {
    if (!trigger) return
    const p = Array.from({ length: 16 }, (_, i) => ({
      id: i, color: colors[i % colors.length],
      x: Math.random() * 100 - 50,
      size: Math.random() * 7 + 4,
      delay: Math.random() * 0.15,
      duration: Math.random() * 0.4 + 0.45,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
    setParticles(p)
    setTimeout(() => setParticles([]), 800)
  }, [trigger])

  if (!particles.length) return null
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-20">
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          width: p.size,
          height: p.shape === 'rect' ? p.size * 0.5 : p.size,
          borderRadius: p.shape === 'circle' ? '50%' : '2px',
          background: p.color,
          left: `calc(50% + ${p.x}px)`,
          top: '50%',
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-out forwards`,
        }} />
      ))}
    </div>
  )
}

/* ── Store Logo ─────────────────────────────────────────────────── */
function StoreLogo({ store, directLogo }) {
  const [broken, setBroken] = useState(false)
  // Priority: directly uploaded logo → resolved logo URL → initials
  const logoUrl = directLogo || resolveStoreLogoUrl({ name: store, logoText: '' })

  if (logoUrl && !broken) {
    return (
      <img
        src={logoUrl}
        alt={store}
        onError={() => setBroken(true)}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10"
      />
    )
  }

  const initials = (store || '?').slice(0, 2).toUpperCase()
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 ring-2 ring-gold/30">
      <span className="text-sm font-black text-gold">{initials}</span>
    </div>
  )
}

/* ── Gradient themes ─────────────────────────────────────────────── */
const GRADIENTS = [
  'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
  'from-[#1a0a2e] via-[#2d1b69] to-[#11998e]',
  'from-[#0f2027] via-[#203a43] to-[#2c5364]',
  'from-[#12100e] via-[#2b2b2b] to-[#1a1a1a]',
  'from-[#1e3c72] via-[#2a5298] to-[#1e3c72]',
  'from-[#200122] via-[#6f0000] to-[#200122]',
  'from-[#093028] via-[#237a57] to-[#093028]',
  'from-[#232526] via-[#414345] to-[#232526]',
]

/* ── Dynamic Expiry Helper ───────────────────────────────────────── */
function getDynamicExpiry(expiryString, createdAtStr) {
  if (!createdAtStr || !expiryString) return expiryString
  
  const match = expiryString.match(/(\d+)\s*days?/i)
  if (!match) return expiryString

  const originalDays = parseInt(match[1], 10)
  const createdWhen = new Date(createdAtStr)
  const now = new Date()
  const elapsedDays = Math.floor((now - createdWhen) / (1000 * 60 * 60 * 24))
  
  const remainingDays = originalDays - elapsedDays
  if (remainingDays < 0) return 'Expired'
  if (remainingDays === 0) return 'Expires today'
  if (remainingDays === 1) return 'Expires in 1 day'
  return expiryString.replace(match[0], `${remainingDays} days`)
}

/* ── Horizontal CouponCard ───────────────────────────────────────── */
function CouponCard({ item, index, dealLink }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [burst, setBurst] = useState(0)
  const grad = GRADIENTS[index % GRADIENTS.length]

  const dynamicExpiryText = getDynamicExpiry(item.expiry, item.createdAt)

  const handleReveal = () => { setRevealed(true); setBurst(b => b + 1) }
  const handleCopy = () => {
    navigator.clipboard.writeText(item.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <article className={`
      group relative flex w-full overflow-hidden rounded-2xl
      bg-gradient-to-r ${grad} shadow-lg
      transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl
    `}>
      {/* Gold top accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* ── LEFT: info ───────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 items-center gap-4 px-5 py-5">
        {/* Store logo */}
        <StoreLogo store={item.store} directLogo={item.logo} />

        {/* Text info */}
        <div className="min-w-0 flex-1">
          {/* Category + badge */}
          <div className="flex items-center gap-2">
            <span className="truncate text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
              {item.category || 'Coupon'}
            </span>
            {item.badge && (
              <span className="shrink-0 rounded-lg border border-gold/30 bg-gold/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-gold">
                {item.badge}
              </span>
            )}
          </div>

          {/* Store */}
          <h3 className="truncate text-base font-black text-white sm:text-lg">{item.store}</h3>

          {/* Discount */}
          <p className="line-clamp-1 text-sm font-semibold text-white/70">{item.discount}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
            {item.minOrder && <span className="text-white/35">Min: {item.minOrder}</span>}
            {dynamicExpiryText && <span className={dynamicExpiryText === 'Expired' ? 'text-rose-500' : 'text-red-400'}>{dynamicExpiryText}</span>}
            {item.success  && <span className="text-emerald-400">✓ {item.success}</span>}
          </div>
        </div>
      </div>

      {/* ── Dashed vertical divider ───────────────────────────── */}
      <div className="relative flex shrink-0 flex-col items-center justify-center py-4 px-0.5">
        <div className="absolute -top-3 h-6 w-6 rounded-full bg-black/60" />
        <div className="h-full border-l-2 border-dashed border-white/15" />
        <span className="absolute rotate-90 text-[11px] text-white/20">✂</span>
        <div className="absolute -bottom-3 h-6 w-6 rounded-full bg-black/60" />
      </div>

      {/* ── RIGHT: code reveal ───────────────────────────────── */}
      <div className="relative flex w-40 shrink-0 flex-col items-center justify-center gap-3 px-5 py-5 sm:w-48">
        <ConfettiBurst trigger={burst} />

        {!revealed ? (
          <>
            {/* Blurred placeholder */}
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <p className="select-none text-center text-xs font-black tracking-[0.35em] text-white/20 blur-[5px]">
                {item.code || 'XXXXXX'}
              </p>
              <div className="absolute inset-0 rounded-xl" style={{
                background: 'linear-gradient(90deg,transparent,rgba(255,215,0,0.07),transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }} />
            </div>

            {/* Reveal button with pulsing ring */}
            <button
              onClick={handleReveal}
              className="relative w-full overflow-hidden rounded-xl border border-gold/40 bg-gold/10 py-2.5 text-[11px] font-black text-gold transition-all duration-200 hover:bg-gold/20 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 rounded-xl border border-gold/25"
                style={{ animation: 'pulse-ring 1.6s ease-out infinite' }} />
              <span className="relative flex items-center justify-center gap-1.5">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Reveal Code
              </span>
            </button>
          </>
        ) : (
          <>
            {/* Revealed code box */}
            <div className="reveal-anim w-full rounded-xl border border-gold/40 bg-gold/10 px-3 py-2.5">
              <p className="slide-up text-center text-[11px] font-black tracking-[0.2em] text-gold">
                {item.code}
              </p>
            </div>

            {/* Copy + Get Deal buttons */}
            <div className="slide-up flex w-full flex-col gap-2">
              <button
                onClick={handleCopy}
                className={`w-full rounded-xl py-2 text-[11px] font-black shadow transition-all duration-200 hover:scale-105 active:scale-95 ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-gold text-[#111] shadow-gold/30'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
              <a
                href={dealLink || '#'}
                target={dealLink ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={!dealLink ? e => e.preventDefault() : undefined}
                className={`flex w-full items-center justify-center gap-1 rounded-xl border py-2 text-[11px] font-black transition-all duration-200 hover:scale-105 active:scale-95 ${
                  dealLink
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                {dealLink ? 'Get Deal' : 'No Link'}
                {dealLink && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </a>
              {/* Share */}
              <ShareButton
                variant="pill"
                title={`${item.store} Coupon — ${item.discount}`}
                text={`Use code ${item.code} for ${item.discount} at ${item.store}`}
                url={dealLink || window.location.href}
                className="w-full justify-center border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white"
              />
            </div>
          </>
        )}
      </div>
    </article>
  )
}

/* ── Coupons Page ────────────────────────────────────────────────── */
function Coupons() {
  const { coupons: allCoupons, banners, stores } = useData()
  const activeCoupons = allCoupons.filter(c => {
    if (c.active === false) return false
    
    // Auto-hide if mathematically expired
    if (c.expiryDays !== undefined && c.expiryDays < 0) return false
    const dynamicExpiryText = getDynamicExpiry(c.expiry, c.createdAt)
    if (dynamicExpiryText === 'Expired') return false

    return true
  })

  // Build a store website lookup map
  const storeWebsiteMap = (stores || []).reduce((map, s) => {
    if (s.name && s.website) map[s.name.toLowerCase()] = s.website
    return map
  }, {})

  const activeBanners = (banners.coupons || []).filter(b => b.active !== false)
  const displayBanners = activeBanners.length > 0 ? activeBanners : [{
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    label: 'Exclusive Coupons',
    title: 'Save Big With Verified Codes',
    description: 'Hand-picked coupon codes, all verified and ready to use.',
    link: '/coupons',
  }]

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [storeFilter, setStoreFilter] = useState('All Stores')
  const [sortBy, setSortBy] = useState('Latest')

  const filterProps = {
    searchText: search, onSearchChange: setSearch,
    searchPlaceholder: 'Search by store, code or discount...',
    category, onCategoryChange: setCategory,
    minDiscount: 'All', onMinDiscountChange: () => {},
    discountOptions: ['All'],
    sortBy, onSortByChange: setSortBy,
    sortOptions: ['Latest', 'Most Popular', 'Highest Discount'],
    showPriceRange: false, showDealStatus: false,
    showStoreFilter: true, storeValue: storeFilter, onStoreChange: setStoreFilter,
  }

  const filtered = activeCoupons.filter(c => {
    const matchCat = category === 'All' || category === 'All Categories'
      || (c.category || '').toLowerCase().includes(category.toLowerCase())
    const matchStore = storeFilter === 'All Stores'
      || (c.store || '').toLowerCase().includes(storeFilter.toLowerCase())
    const q = search.trim().toLowerCase()
    const matchSearch = !q
      || (c.store || '').toLowerCase().includes(q)
      || (c.code || '').toLowerCase().includes(q)
      || (c.discount || '').toLowerCase().includes(q)
    return matchCat && matchStore && matchSearch
  }).map(c => ({
    ...c,
    // Resolve the best destination link
    resolvedLink: c.link || c.url || storeWebsiteMap[(c.store || '').toLowerCase()] || null,
  }))

  return (
    <>
      <style>{css}</style>
      <main className="mx-auto max-w-[1400px] px-4 py-10 pb-32 sm:px-6 lg:px-8 lg:pb-10">
        <section className="mb-10">
          <ScrollingPageBanner banners={displayBanners} />
        </section>

        <div className="flex gap-6 items-start">
          {/* Top filter bar — full width */}
          <div className="w-full">
            <FilterBar {...filterProps} />

            {/* Count */}
            <p className="mb-5 text-sm font-medium text-muted">
              Showing <span className="font-bold text-ink">{filtered.length}</span> coupon{filtered.length !== 1 ? 's' : ''}
              {category !== 'All' && category !== 'All Categories' && (
                <span className="ml-2 font-semibold text-gold">in {category}</span>
              )}
            </p>

            {/* Vertical list */}
            <div className="flex flex-col gap-4">
              {filtered.map((coupon, i) => (
                <CouponCard key={coupon.id || coupon.code} item={coupon} index={i} dealLink={coupon.resolvedLink} />
              ))}
              {filtered.length === 0 && (
                <div className="rounded-3xl border border-line bg-white p-16 text-center">
                  <p className="text-4xl mb-3">🎟️</p>
                  <p className="font-bold text-ink">No coupons found</p>
                  <p className="mt-1 text-sm text-muted">Try adjusting the filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Coupons
