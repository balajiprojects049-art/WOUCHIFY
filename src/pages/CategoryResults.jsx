import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import DealGrid from '../components/DealGrid'
import { ChevronRight, Filter, Search, Tag, Sparkles, LayoutGrid } from 'lucide-react'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

export default function CategoryResults() {
  const { deals, lootDeals, coupons } = useData()
  const [searchParams] = useSearchParams()
  const categoryName = searchParams.get('category')
  const [nowMs, setNowMs] = useState(Date.now())
  const [tab, setTab] = useState('all') // 'all' | 'deals' | 'loot' | 'coupons'

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 1000)
    window.scrollTo(0, 0)
    return () => clearInterval(timer)
  }, [])

  const filteredDeals = useMemo(() => {
    return deals.filter(d => d.category === categoryName && getDealRemainingSeconds(d, nowMs) > 0)
  }, [deals, categoryName, nowMs])

  const filteredLoot = useMemo(() => {
    return lootDeals.filter(d => d.category === categoryName && getDealRemainingSeconds(d, nowMs) > 0)
  }, [lootDeals, categoryName, nowMs])

  const filteredCoupons = useMemo(() => {
    return coupons.filter(c => c.category === categoryName)
  }, [coupons, categoryName])

  const totalCount = filteredDeals.length + filteredLoot.length + filteredCoupons.length

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Header */}
      <div className="bg-white border-b border-line pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/categories" className="hover:text-gold">Categories</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink">{categoryName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-line mb-3">
                 <Tag className="w-3 h-3 text-gold" />
                 <span className="text-[10px] font-black text-midnight uppercase tracking-tighter">Category Results</span>
              </div>
              <h1 className="text-4xl font-black text-ink tracking-tight">{categoryName}</h1>
              <p className="mt-2 text-sm font-bold text-muted">Found {totalCount} active offers, deals and coupons</p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-1 p-1 bg-cream rounded-2xl border border-line">
               {[
                 { id: 'all', label: 'All', count: totalCount },
                 { id: 'deals', label: 'Deals', count: filteredDeals.length },
                 { id: 'loot', label: 'Loot', count: filteredLoot.length },
                 { id: 'coupons', label: 'Coupons', count: filteredCoupons.length }
               ].map(t => (
                 <button
                   key={t.id}
                   onClick={() => setTab(t.id)}
                   className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${tab === t.id ? 'bg-midnight text-gold shadow-lg shadow-midnight/20' : 'text-muted hover:text-ink'}`}
                 >
                   {t.label} <span className="ml-1 opacity-50">({t.count})</span>
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
         {(tab === 'all' || tab === 'deals') && filteredDeals.length > 0 && (
           <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                    <LayoutGrid className="w-4 h-4" />
                 </div>
                 <h2 className="text-xl font-black text-ink uppercase tracking-tight">Active Deals</h2>
              </div>
              <DealGrid deals={filteredDeals} nowMs={nowMs} />
           </section>
         )}

         {(tab === 'all' || tab === 'loot') && filteredLoot.length > 0 && (
           <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Sparkles className="w-4 h-4" />
                 </div>
                 <h2 className="text-xl font-black text-ink uppercase tracking-tight text-red-500">Loot Offers</h2>
              </div>
              <DealGrid deals={filteredLoot} nowMs={nowMs} />
           </section>
         )}

         {(tab === 'all' || tab === 'coupons') && filteredCoupons.length > 0 && (
           <section>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Tag className="w-4 h-4" />
                 </div>
                 <h2 className="text-xl font-black text-ink uppercase tracking-tight text-blue-500">Promo Coupons</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredCoupons.map(coupon => (
                   <Link 
                    key={coupon.id} 
                    to={`/deal/${coupon.slug || coupon.id}`}
                    className="group bg-white rounded-3xl border border-line p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                   >
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Tag className="w-12 h-12" />
                     </div>
                     <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">{coupon.store}</p>
                     <h3 className="text-lg font-black text-ink mb-2 leading-tight">{coupon.title}</h3>
                     <div className="flex items-center justify-between mt-6">
                        <span className="text-[11px] font-black px-3 py-1 bg-cream rounded-lg text-midnight border border-line">COPY CODE</span>
                        <ChevronRight className="w-5 h-5 text-muted group-hover:translate-x-1 transition-transform" />
                     </div>
                   </Link>
                 ))}
              </div>
           </section>
         )}

         {totalCount === 0 && (
            <div className="py-20 text-center bg-cream rounded-[40px] border-2 border-dashed border-line">
               <Filter className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
               <h3 className="text-xl font-black text-ink mb-1">No Offers Available</h3>
               <p className="text-sm font-bold text-muted">We couldn't find any active deals for {categoryName} right now.</p>
               <Link to="/categories" className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-midnight text-gold rounded-2xl font-black text-sm hover:scale-105 transition-transform active:scale-95">
                  BROWSE ALL CATEGORIES
               </Link>
            </div>
         )}
      </div>
    </div>
  )
}
