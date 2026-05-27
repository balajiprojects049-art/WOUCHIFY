import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import FilterBar from '../components/FilterBar'
import { useData } from '../context/DataContext'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import ShareButton from '../components/ShareButton'
import SEO from '../components/SEO'
import PromoCouponCard from '../components/PromoCouponCard'

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

/* ── Badge color helper ──────────────────────────────────────────── */
function badgeStyle(badge) {
  const b = (badge || '').toUpperCase()
  if (b === 'HOT')      return 'bg-red-100 text-red-600 border-red-200'
  if (b === 'TRENDING') return 'bg-amber-100 text-amber-600 border-amber-200'
  if (b === 'EXCLUSIVE')return 'bg-purple-100 text-purple-600 border-purple-200'
  if (b === 'NEW')      return 'bg-emerald-100 text-emerald-600 border-emerald-200'
  return 'bg-[#FFF8E7] text-[#C89B1E] border-[#C89B1E]/30'
}

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



/* ── Coupons Page ────────────────────────────────────────────────── */
function Coupons() {
  const { userCoupons: allCoupons, banners, stores } = useData()

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

  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [storeFilter, setStoreFilter] = useState('All Stores')
  const [sortBy, setSortBy] = useState('Latest')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearch(q)
  }, [searchParams])

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
    <>{/* SEO Component */}
      <SEO 
        title="Verified Coupons & Promo Codes"
        description="Save extra with our list of verified coupon codes and vouchers. Find active promo codes for Amazon, Flipkart, Myntra, Swiggy, and more."
        keywords="promo codes, coupons, discount vouchers, verified codes, Wouchify coupons"
      />
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
                <PromoCouponCard 
                  key={coupon.id || coupon.code} 
                  offer={{...coupon, link: coupon.resolvedLink}} 
                  store={{name: coupon.store, category: coupon.category}} 
                />
              ))}
              {filtered.length === 0 && (
                <div className="rounded-3xl border border-line bg-surface p-16 text-center shadow-inner">
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
