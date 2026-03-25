import { useState } from 'react'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import { useData } from '../context/DataContext'

const categories = ['All', 'Electronics', 'Fashion', 'Food Delivery', 'Travel', 'Beauty & Health', 'Shopping']

function CouponCard({ item }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(item.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className={`group rounded-[2rem] border border-line bg-gradient-to-br ${item.color} overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
      <div className="flex items-center justify-between border-b border-line/60 px-6 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-muted">{item.category}</p>
          <h3 className="mt-1 text-base font-black text-ink">{item.store}</h3>
        </div>
        <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gold">
          {item.badge}
        </span>
      </div>

      <div className="px-6 py-5">
        <p className="text-3xl font-black text-ink">{item.discount}</p>
        <p className="mt-1 text-xs font-medium text-muted">Min. order: {item.minOrder}</p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1 rounded-xl border-2 border-dashed border-gold/40 bg-gold/5 px-4 py-3 text-center">
            <p className="text-sm font-black tracking-[0.15em] text-ink">{item.code}</p>
          </div>
          <button
            onClick={handleCopy}
            className={`shrink-0 rounded-xl px-5 py-3 text-xs font-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-md ${
              copied ? 'bg-emerald-500 text-white' : 'bg-navy text-cream'
            }`}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] font-semibold text-muted">
          <span className="text-red-500 font-bold">{item.expiry}</span>
          <span className="text-emerald-600 font-bold">✓ {item.success} success rate</span>
        </div>
      </div>
    </article>
  )
}

function Coupons() {
  const { coupons: allCoupons, banners } = useData()
  const activeCoupons = allCoupons.filter(c => c.active !== false)
  const activeBanners = (banners.coupons || []).filter(b => b.active !== false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const CARD_COLORS = ['from-orange-50 to-white', 'from-blue-50 to-white', 'from-pink-50 to-white', 'from-red-50 to-white', 'from-rose-50 to-white', 'from-indigo-50 to-white', 'from-purple-50 to-white', 'from-sky-50 to-white']

  const filtered = activeCoupons.filter((c) => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory || c.category.includes(activeCategory)
    const matchSearch = !search.trim() || c.store.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }).map((c, i) => ({ ...c, color: c.color || CARD_COLORS[i % CARD_COLORS.length] }))

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-14">
        <ScrollingPageBanner banners={activeBanners} />
      </section>

      {/* Search & Filter */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search by store or coupon code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-line bg-white px-5 py-3.5 text-sm font-medium text-ink placeholder:text-muted focus:border-gold focus:outline-none shadow-sm sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 hover:scale-105 ${
                activeCategory === cat ? 'bg-navy text-cream shadow-md' : 'bg-white border border-line text-muted hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((coupon) => (
          <CouponCard key={coupon.code} item={coupon} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-3xl border border-line bg-white p-12 text-center text-muted">
            No coupons found for your search.
          </div>
        )}
      </div>
    </main>
  )
}

export default Coupons
