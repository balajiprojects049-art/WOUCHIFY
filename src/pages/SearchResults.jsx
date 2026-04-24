import { Component, useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import DealCard from '../components/DealCard'
import LootDealCard from '../components/LootDealCard'
import StoreCard from '../components/StoreCard'
import CreditCardDetailCard from '../components/CreditCardDetailCard'
import SEO from '../components/SEO'

// ── Error Boundary — prevents any crash in Search from killing the whole page ──
class SearchErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[SearchResults] Render error caught by boundary:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center px-4">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-cream text-6xl shadow-inner border border-line">⚠️</div>
          <p className="text-xl font-bold text-ink">Something went wrong with your search.</p>
          <p className="mt-2 text-muted">Please try a different keyword or go back to the homepage.</p>
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.history.back() }}
              className="rounded-xl border border-line bg-cream px-6 py-3 text-sm font-black text-ink hover:scale-105 transition-all"
            >
              ← Go Back
            </button>
            <Link to="/" className="rounded-xl bg-ink px-8 py-3 text-sm font-black text-surface hover:scale-105 transition-all">Home</Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// Horizontal Coupon Card for search results (simplified version of the one in Coupons.jsx)
function SearchCouponCard({ item }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xl">🎟️</div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-gold text-opacity-80">{item.store}</p>
        <h3 className="truncate text-sm font-bold text-ink">{item.discount}</h3>
        <p className="truncate text-xs text-muted">Code: <span className="font-mono font-bold text-ink">{item.code}</span></p>
      </div>
      <Link to="/coupons" className="shrink-0 rounded-lg bg-cream px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-ink transition-colors hover:bg-gold/20">View All</Link>
    </div>
  )
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const { deals, lootDeals, stores, coupons, creditCards } = useData()
  const [nowMs, setNowMs] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 60000)
    return () => clearInterval(timer)
  }, [])

  const results = useMemo(() => {
    if (!query) return { deals: [], loot: [], stores: [], coupons: [], cards: [], total: 0 }

    try {
      const safeDeals = Array.isArray(deals) ? deals : []
      const safeLoot = Array.isArray(lootDeals) ? lootDeals : []
      const safeStores = Array.isArray(stores) ? stores : []
      const safeCoupons = Array.isArray(coupons) ? coupons : []
      const safeCards = creditCards && typeof creditCards === 'object' && !Array.isArray(creditCards)
        ? [...(Array.isArray(creditCards.shopping) ? creditCards.shopping : []), ...(Array.isArray(creditCards.lifetime) ? creditCards.lifetime : [])]
        : []

      const d = safeDeals.filter(x => x?.title?.toLowerCase().includes(query) || x?.store?.toLowerCase().includes(query))
      const l = safeLoot.filter(x => x?.title?.toLowerCase().includes(query) || x?.category?.toLowerCase().includes(query))
      const s = safeStores.filter(x => x?.name?.toLowerCase().includes(query) || x?.category?.toLowerCase().includes(query))
      const c = safeCoupons.filter(x => x?.store?.toLowerCase().includes(query) || x?.code?.toLowerCase().includes(query) || x?.discount?.toLowerCase().includes(query))
      const cc = safeCards.filter(x => x?.name?.toLowerCase().includes(query) || x?.bank?.toLowerCase().includes(query))

      return {
        deals: d, loot: l, stores: s, coupons: c, cards: cc,
        total: d.length + l.length + s.length + c.length + cc.length
      }
    } catch (err) {
      console.error('[SearchResults] useMemo filter error:', err)
      return { deals: [], loot: [], stores: [], coupons: [], cards: [], total: 0 }
    }
  }, [query, deals, lootDeals, stores, coupons, creditCards])

  const isEmpty = results.total === 0

  return (
    <SearchErrorBoundary>
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SEO title={`Search results for "${query}"`} />

      <header className="mb-12">
        <p className="text-xs font-black uppercase tracking-widest text-gold text-center">Search Discovery</p>
        <h1 className="mt-2 text-center text-3xl font-black text-ink sm:text-4xl">
          {isEmpty ? `No results for "${query}"` : `Found ${results.total} results for "${query}"`}
        </h1>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold" />
      </header>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-cream text-6xl shadow-inner border border-line">🔍</div>
          <p className="text-xl font-bold text-ink">We couldn't find what you were looking for.</p>
          <p className="mt-2 text-muted">Try searching for stores like "Amazon", items like "iPhone", or "Coupons".</p>
          <Link to="/" className="mt-8 rounded-xl bg-ink px-8 py-3 text-sm font-black text-surface hover:scale-105 transition-all">Back to Home</Link>
        </div>
      ) : (
        <div className="space-y-20">
          
          {/* Deals */}
          {results.deals.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-wider text-ink">Deals ({results.deals.length})</h2>
                <Link to="/deals" className="text-xs font-bold text-gold hover:underline">View All Deals</Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.deals.map(d => <DealCard key={d.slug} deal={d} nowMs={nowMs} />)}
              </div>
            </section>
          )}

          {/* Loot Deals */}
          {results.loot.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-wider text-ink">Loot Deals ({results.loot.length})</h2>
                <Link to="/loot-deals" className="text-xs font-bold text-gold hover:underline">View All Loot</Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.loot.map(d => <LootDealCard key={d.slug} deal={d} nowMs={nowMs} />)}
              </div>
            </section>
          )}

          {/* Stores */}
          {results.stores.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-wider text-ink">Stores ({results.stores.length})</h2>
                <Link to="/stores" className="text-xs font-bold text-gold hover:underline">All Stores</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {results.stores.map(s => <StoreCard key={s.slug} store={s} />)}
              </div>
            </section>
          )}

          {/* Coupons */}
          {results.coupons.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-wider text-ink">Coupons ({results.coupons.length})</h2>
                <Link to="/coupons" className="text-xs font-bold text-gold hover:underline">All Coupons</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.coupons.map(c => <SearchCouponCard key={c.id || c.code} item={c} />)}
              </div>
            </section>
          )}

          {/* Credit Cards */}
          {results.cards.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-wider text-ink">Credit Cards ({results.cards.length})</h2>
                <Link to="/credit-cards" className="text-xs font-bold text-gold hover:underline">Compare Cards</Link>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {results.cards.map(cc => <CreditCardDetailCard key={cc.id} item={cc} />)}
              </div>
            </section>
          )}

        </div>
      )}
    </main>
    </SearchErrorBoundary>
  )
}
