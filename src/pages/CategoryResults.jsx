import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import DealGrid from '../components/DealGrid'
import { ChevronRight, Filter, Search, Tag, Sparkles, LayoutGrid, CheckSquare, Square, Store, Compass } from 'lucide-react'
import { getDealRemainingSeconds } from '../utils/dealExpiry'
import { resolveStoreLogoUrl } from '../utils/storeLogo'
import * as LucideIcons from 'lucide-react'
import { categoriesData } from '../data/categoriesData'

// Helper for dynamic icons
const IconRenderer = ({ name, ...props }) => {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle
  return <IconComponent {...props} />
}

export default function CategoryResults() {
  const { deals, lootDeals, coupons, stores } = useData()
  const [searchParams] = useSearchParams()
  const categoryName = searchParams.get('category')
  const [nowMs, setNowMs] = useState(Date.now())
  const [tab, setTab] = useState('all') // 'all' | 'deals' | 'loot' | 'coupons'
  const [selectedStores, setSelectedStores] = useState([])
  
  // Search states for sidebar
  const [storeSearch, setStoreSearch] = useState('')
  const [categorySearch, setCategorySearch] = useState('')
  
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 1000)
    window.scrollTo(0, 0)
    return () => clearInterval(timer)
  }, [categoryName]) // reset scroll when category changes

  // Fetch all items assigned to this category
  const categoryDeals = useMemo(() => deals.filter(d => d.category === categoryName && getDealRemainingSeconds(d, nowMs) > 0), [deals, categoryName, nowMs])
  const categoryLoot = useMemo(() => lootDeals.filter(d => d.category === categoryName && getDealRemainingSeconds(d, nowMs) > 0), [lootDeals, categoryName, nowMs])
  const categoryCoupons = useMemo(() => coupons.filter(c => c.category === categoryName), [coupons, categoryName])

  // Get ALL stores from the platform
  const availableStores = useMemo(() => {
    return stores.map(store => store.name).sort()
  }, [stores])

  // Get ALL product categories
  const allCategories = useMemo(() => {
    const list = []
    Object.values(categoriesData.products || {}).forEach(arr => list.push(...arr))
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  // Filtered lists for sidebar searches
  const visibleStores = useMemo(() => {
    return availableStores.filter(s => s.toLowerCase().includes(storeSearch.toLowerCase()))
  }, [availableStores, storeSearch])

  const visibleCategories = useMemo(() => {
    return allCategories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()))
  }, [allCategories, categorySearch])

  // Helper to toggle store filters
  const toggleStore = (store) => {
    setSelectedStores(prev => 
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    )
  }

  // Final filtered data
  const filteredDeals = useMemo(() => {
    if (selectedStores.length === 0) return categoryDeals
    return categoryDeals.filter(d => selectedStores.includes(d.store))
  }, [categoryDeals, selectedStores])

  const filteredLoot = useMemo(() => {
    if (selectedStores.length === 0) return categoryLoot
    return categoryLoot.filter(d => selectedStores.includes(d.store))
  }, [categoryLoot, selectedStores])

  const filteredCoupons = useMemo(() => {
    if (selectedStores.length === 0) return categoryCoupons
    return categoryCoupons.filter(c => selectedStores.includes(c.store))
  }, [categoryCoupons, selectedStores])

  const totalCount = filteredDeals.length + filteredLoot.length + filteredCoupons.length

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Header */}
      <div className="bg-white border-b border-line pt-6 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/categories" className="hover:text-gold transition-colors">Categories</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink">{categoryName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-line mb-3 shadow-sm">
                 <Tag className="w-3.5 h-3.5 text-gold" />
                 <span className="text-[10px] font-black text-midnight uppercase tracking-[0.2em]">Category Results</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">{categoryName}</h1>
              <p className="mt-2 text-sm font-semibold text-muted">Found {totalCount} total active offers for your selection</p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-1 p-1 bg-surface rounded-2xl border border-line shadow-sm overflow-x-auto no-scrollbar">
               {[
                 { id: 'all', label: 'All', count: totalCount },
                 { id: 'deals', label: 'Deals', count: filteredDeals.length },
                 { id: 'loot', label: 'Loot', count: filteredLoot.length },
                 { id: 'coupons', label: 'Coupons', count: filteredCoupons.length }
               ].map(t => (
                 <button
                   key={t.id}
                   onClick={() => setTab(t.id)}
                   className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tab === t.id ? 'bg-navy text-white shadow-md' : 'text-muted hover:bg-cream hover:text-ink'}`}
                 >
                   {t.label} <span className="ml-1 opacity-70">({t.count})</span>
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
         
         {/* ── LEFT SIDEBAR FILTERS ── */}
         <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Store Filter */}
            {availableStores.length > 0 && (
              <div className="bg-white rounded-2xl border border-line p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Store className="w-4 h-4 text-gold" />
                  <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Filter by Store</h3>
                </div>
                
                {/* Search Bar for Stores */}
                <div className="relative mb-3.5 group">
                  <input
                    type="text"
                    placeholder="Search stores..."
                    value={storeSearch}
                    onChange={(e) => setStoreSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 bg-surface border border-line rounded-lg text-xs font-bold focus:border-gold focus:outline-none transition-all placeholder:text-muted/60 text-ink"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted group-focus-within:text-gold transition-colors" />
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                  {visibleStores.length > 0 ? (
                    visibleStores.map(store => {
                      const isSelected = selectedStores.includes(store);
                      return (
                        <button
                          key={store}
                          onClick={() => toggleStore(store)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors duration-200 border border-transparent ${isSelected ? 'bg-gold/10 border-gold/30 text-gold' : 'hover:bg-surface text-ink'}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 h-5 bg-white rounded border border-line flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-0.5">
                              <img src={resolveStoreLogoUrl(store)} alt={store} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                            </div>
                            <span className={`text-xs font-semibold ${isSelected ? 'text-gold' : 'text-ink'}`}>{store}</span>
                          </div>
                          {isSelected ? <CheckSquare className="w-4 h-4 text-gold shrink-0" /> : <Square className="w-4 h-4 text-muted shrink-0" />}
                        </button>
                      )
                    })
                  ) : (
                    <div className="text-xs text-muted text-center py-4 font-semibold">No stores found</div>
                  )}
                </div>
                {selectedStores.length > 0 && (
                  <button 
                    onClick={() => setSelectedStores([])}
                    className="mt-4 w-full text-[10px] font-bold text-muted hover:text-gold uppercase tracking-widest text-center transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

            {/* Related Categories Links */}
            <div className="bg-white rounded-2xl border border-line p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-4 h-4 text-gold" />
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Related Categories</h3>
              </div>

              {/* Search Bar for Categories */}
              <div className="relative mb-3.5 group">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-surface border border-line rounded-lg text-xs font-bold focus:border-gold focus:outline-none transition-all placeholder:text-muted/60 text-ink"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted group-focus-within:text-gold transition-colors" />
              </div>

              <div className="space-y-1 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {visibleCategories.length > 0 ? (
                  visibleCategories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => navigate(`/category-results?category=${encodeURIComponent(cat.name)}`)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group ${categoryName === cat.name ? 'bg-gold/10 text-gold' : 'hover:bg-surface'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${categoryName === cat.name ? 'bg-gold text-white shadow-sm' : 'bg-surface text-muted group-hover:bg-line'}`}>
                          <IconRenderer name={cat.icon} className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-xs font-semibold text-left line-clamp-1 ${categoryName === cat.name ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>{cat.name}</span>
                      </div>
                      {categoryName === cat.name && <ChevronRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-muted text-center py-4 font-semibold">No categories found</div>
                )}
              </div>
            </div>
         </aside>

         {/* ── RIGHT CONTENT (Results) ── */}
         <div className="flex-grow min-w-0">
           {(tab === 'all' || tab === 'deals') && filteredDeals.length > 0 && (
             <section className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                      <LayoutGrid className="w-4 h-4" />
                   </div>
                   <h2 className="text-xl font-extrabold text-ink tracking-tight">Active Deals</h2>
                </div>
                <DealGrid deals={filteredDeals} nowMs={nowMs} />
             </section>
           )}

           {(tab === 'all' || tab === 'loot') && filteredLoot.length > 0 && (
             <section className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                      <Sparkles className="w-4 h-4" />
                   </div>
                   <h2 className="text-xl font-extrabold tracking-tight text-red-500">Loot Offers</h2>
                </div>
                <DealGrid deals={filteredLoot} nowMs={nowMs} />
             </section>
           )}

           {(tab === 'all' || tab === 'coupons') && filteredCoupons.length > 0 && (
             <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Tag className="w-4 h-4" />
                   </div>
                   <h2 className="text-xl font-extrabold tracking-tight text-blue-500">Promo Coupons</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                   {filteredCoupons.map(coupon => (
                     <Link 
                      key={coupon.id} 
                      to={`/deal/${coupon.slug || coupon.id}`}
                      className="group bg-white rounded-2xl border border-line p-5 hover:border-gold/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col"
                     >
                       <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                          <Tag className="w-16 h-16 text-blue-500" />
                       </div>
                       <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">{coupon.store}</p>
                       <h3 className="text-base font-bold text-ink mb-1 leading-snug line-clamp-2 group-hover:text-gold transition-colors">{coupon.title}</h3>
                       <div className="mt-auto pt-6 flex items-center justify-between">
                          <span className="text-[10px] font-black px-3 py-1.5 bg-surface rounded-md text-midnight border border-line group-hover:bg-gold/10 group-hover:border-gold/30 group-hover:text-gold transition-colors">COPY CODE</span>
                          <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:text-gold transition-all" />
                       </div>
                     </Link>
                   ))}
                </div>
             </section>
           )}

           {totalCount === 0 && (
              <div className="py-24 text-center bg-white rounded-3xl border border-line shadow-sm">
                 <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-5">
                   <Filter className="w-8 h-8 text-muted opacity-50" />
                 </div>
                 <h3 className="text-xl font-bold text-ink mb-2 tracking-tight">No Offers Available</h3>
                 <p className="text-sm font-medium text-muted">We couldn't find any active deals matching your filters.</p>
                 <button onClick={() => { setSelectedStores([]); navigate('/categories'); }} className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-navy text-white rounded-xl font-semibold text-sm hover:scale-105 transition-all duration-200">
                    Explore Other Categories
                 </button>
              </div>
           )}
         </div>
      </div>
    </div>
  )
}
