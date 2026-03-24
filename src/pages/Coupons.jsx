import { useState } from 'react'
import ScrollingPageBanner from '../components/ScrollingPageBanner'

const banners = [
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    label: 'Exclusive Coupons',
    title: 'Save Big With Verified Codes',
    description: 'Hand-picked coupon codes from hundreds of top Indian stores — all verified and ready to use.',
    link: '/coupons',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    label: 'Fresh Drops',
    title: 'New Coupons Added Daily',
    description: 'Our team verifies fresh discounts every morning so you always get working codes.',
    link: '/coupons',
  },
]

const coupons = [
  { store: 'Amazon India', code: 'AMAZON10', discount: '10% OFF', category: 'All Categories', expiry: 'Expires in 3 days', minOrder: '₹499', success: '96%', color: 'from-orange-50 to-white', badge: 'HOT' },
  { store: 'Flipkart', code: 'FLIP15', discount: '15% OFF', category: 'Electronics', expiry: 'Expires in 2 days', minOrder: '₹999', success: '91%', color: 'from-blue-50 to-white', badge: 'POPULAR' },
  { store: 'Myntra', code: 'MYNTRA20', discount: '20% OFF', category: 'Fashion & Lifestyle', expiry: 'Expires in 5 days', minOrder: '₹799', success: '89%', color: 'from-pink-50 to-white', badge: 'NEW' },
  { store: 'Swiggy', code: 'SWIGGY100', discount: '₹100 OFF', category: 'Food Delivery', expiry: 'Expires today', minOrder: '₹299', success: '93%', color: 'from-orange-50 to-white', badge: 'ENDING SOON' },
  { store: 'Zomato', code: 'ZOMATO50', discount: '₹50 OFF', category: 'Food Delivery', expiry: 'Expires in 4 days', minOrder: '₹199', success: '88%', color: 'from-red-50 to-white', badge: 'TRENDING' },
  { store: 'Nykaa', code: 'NYKAA25', discount: '25% OFF', category: 'Beauty & Health', expiry: 'Expires in 6 days', minOrder: '₹599', success: '87%', color: 'from-rose-50 to-white', badge: 'EXCLUSIVE' },
  { store: 'Ajio', code: 'AJIO30', discount: '30% OFF', category: 'Fashion', expiry: 'Expires in 1 day', minOrder: '₹999', success: '84%', color: 'from-indigo-50 to-white', badge: 'FLASH' },
  { store: 'Meesho', code: 'MEESHO12', discount: '12% OFF', category: 'Shopping', expiry: 'Expires in 7 days', minOrder: '₹299', success: '82%', color: 'from-purple-50 to-white', badge: 'NEW' },
  { store: 'MakeMyTrip', code: 'MMT500', discount: '₹500 OFF', category: 'Travel', expiry: 'Expires in 2 days', minOrder: '₹3,999', success: '79%', color: 'from-sky-50 to-white', badge: 'TRAVEL' },
]

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
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = coupons.filter((c) => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory
    const matchSearch = !search.trim() || c.store.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-14">
        <ScrollingPageBanner banners={banners} />
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
