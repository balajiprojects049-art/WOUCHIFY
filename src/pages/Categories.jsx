import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as LucideIcons from 'lucide-react'
import {
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  TrendingUp,
  Tag,
  ShoppingBag,
  Store,
  CreditCard,
  Plane,
  Sparkles,
  MapPin,
  Palmtree,
  Filter,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react'
import { categoriesData } from '../data/categoriesData'

import { useData } from '../context/DataContext'

// Helper to render Lucide icons dynamically
const IconRenderer = ({ name, className = "w-5 h-5" }) => {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle
  return <IconComponent className={className} />
}

const LETTERS = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]

export default function Categories() {
  const { deals, lootDeals, coupons } = useData()
  const [activeTab, setActiveTab] = useState('products')
  const [activeLetter, setActiveLetter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'

  const { pathname } = useLocation()

  // Helper to get real count for a specific category string
  const getCatCount = (catName) => {
    const dealsCount = deals?.filter(d => d.category === catName)?.length || 0
    const lootCount = lootDeals?.filter(d => d.category === catName)?.length || 0
    const couponCount = coupons?.filter(c => c.category === catName)?.length || 0
    return dealsCount + lootCount + couponCount
  }

  // Simulate loading for Skeleton Effect
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 400)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => clearTimeout(timer)
  }, [activeTab, activeLetter])

  // Process data based on filters
  const processedData = useMemo(() => {
    let data = {}

    // Aggregation logic for 'all' tab
    if (activeTab === 'all') {
      ['products', 'stores', 'brands', 'banks', 'festivals', 'cities'].forEach(tab => {
        Object.entries(categoriesData[tab] || {}).forEach(([letter, list]) => {
          if (!data[letter]) data[letter] = []
          data[letter].push(...list)
        })
      })
      // Special flatten for travel into the same master list
      Object.entries(categoriesData.travel || {}).forEach(([tripType, letterGroups]) => {
        Object.entries(letterGroups).forEach(([letter, list]) => {
          if (!data[letter]) data[letter] = []
          data[letter].push(...list)
        })
      })
    } else {
      data = categoriesData[activeTab] || {}
    }

    let result = {}

    // Special handling for nested travel sub-sections
    if (activeTab === 'travel') {
      Object.entries(data).forEach(([tripType, letterGroups]) => {
        Object.entries(letterGroups).forEach(([letter, list]) => {
          if (activeLetter !== 'ALL' && letter !== activeLetter) return
          const filtered = list.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
          if (filtered.length > 0) {
            if (!result[letter]) result[letter] = []
            result[letter].push(...filtered.map(item => ({ ...item, realCount: getCatCount(item.name) })))
          }
        })
      })
    } else {
      Object.entries(data).forEach(([letter, list]) => {
        if (activeLetter !== 'ALL' && letter !== activeLetter) return
        const filtered = list.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        if (filtered.length > 0) result[letter] = filtered.map(item => ({ ...item, realCount: getCatCount(item.name) }))
      })
    }

    return result
  }, [activeTab, activeLetter, search, deals, lootDeals, coupons])

  // Quick stats
  const totalCategories = useMemo(() => {
    try {
      if (activeTab === 'all') {
        const basicCount = ['products', 'stores', 'brands', 'banks', 'festivals', 'cities'].reduce((acc, tab) => {
          const tabData = categoriesData[tab] || {}
          return acc + Object.values(tabData).flat().length
        }, 0)
        const travelCount = Object.values(categoriesData.travel || {}).reduce((acc, groups) => {
          return acc + Object.values(groups).flat().length
        }, 0)
        return basicCount + travelCount
      }

      if (activeTab === 'travel') {
        return Object.values(categoriesData.travel || {}).reduce((acc, groups) => {
          return acc + Object.values(groups).flat().length
        }, 0)
      }

      const currentData = categoriesData[activeTab] || {}
      return Object.values(currentData).flat().length
    } catch (err) {
      console.error("Error calculating totalCategories:", err)
      return 0
    }
  }, [activeTab])

  const totalCoupons = useMemo(() => {
    const dCount = deals?.length || 0
    const lCount = lootDeals?.length || 0
    const cCount = coupons?.length || 0
    return dCount + lCount + cCount
  }, [deals, lootDeals, coupons])

  const sidebarLinks = [
    { id: 'all', label: 'All Categories', icon: 'LayoutGrid' },
    { id: 'products', label: 'Categories', icon: 'Layers' },
    { id: 'stores', label: 'Stores', icon: 'Store' },
    { id: 'brands', label: 'Brands', icon: 'Tag' },
    { id: 'banks', label: 'Banks', icon: 'CreditCard' },
    { id: 'festivals', label: 'Festivals', icon: 'Sparkles' },
    { id: 'travel', label: 'Traveling', icon: 'Plane' },
    { id: 'cities', label: 'Cities Deals', icon: 'MapPin' },
  ]

  const popularCategories = [
    { name: 'Flight', icon: 'Plane' },
    { name: 'Electronics', icon: 'Laptop' },
    { name: 'Fashion', icon: 'Shirt' },
    { name: 'Beauty', icon: 'Sparkles' },
    { name: 'Phones', icon: 'Smartphone' },
    { name: 'Watches', icon: 'Watch' },
  ]

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-ink">
      {/* ── 1. TOP HEADER SECTION ── */}
      <header className="bg-white border-b border-line pb-6 pt-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="text-ink">Categories</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-ink mb-2">Categories</h1>
              <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold">
                <div className="flex items-center gap-2 text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Total Categories: <span className="text-ink">{totalCategories.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-midnight" />
                  Total Coupons & Offers: <span className="text-ink">{totalCoupons.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 py-1.5 px-3 bg-cream rounded-xl border border-line self-start md:self-auto shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Verified On: <span className="text-ink">{today}</span></span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── 2. LEFT SIDEBAR (Sticky) ── */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Navigation Menu */}
              <nav className="bg-white rounded-3xl border border-line p-3 shadow-sm">
                <div className="space-y-0.5">
                  {sidebarLinks.map(link => (
                    <button
                      key={link.id}
                      onClick={() => setActiveTab(link.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${activeTab === link.id ? 'bg-gold text-midnight' : 'text-muted hover:bg-cream hover:text-gold'}`}
                    >
                      <div className="flex items-center gap-3">
                        <IconRenderer name={link.icon} className={`w-4 h-4 ${activeTab === link.id ? 'text-midnight' : 'text-muted group-hover:text-gold'}`} />
                        <span className="text-[13px] font-black tracking-tight">{link.label}</span>
                      </div>
                      {activeTab === link.id && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Popular Merchants List */}
              <div className="px-1">
                <h3 className="text-[9px] font-black text-muted uppercase tracking-[0.2em] mb-4">Popular Merchants</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Swiggy', 'Zomato'].map(merchant => (
                    <Link
                      key={merchant}
                      to={`/store/${merchant.toLowerCase()}`}
                      className="px-2.5 py-1 bg-cream hover:bg-gold hover:text-midnight text-[10px] font-black text-muted rounded-lg transition-all border border-line/30"
                    >
                      {merchant}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── 3. MAIN CONTENT ── */}
          <div className="flex-grow">

            {/* 🔥 SECTION 1: Popular Categories */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-ink flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  Popular Categories
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                {popularCategories.map((cat, i) => (
                  <Link
                    key={i}
                    to={`/category-results?category=${encodeURIComponent(cat.name)}`}
                    className="group bg-white rounded-2xl p-4 border border-line shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
                  >
                    <div className="p-2.5 bg-cream text-gold rounded-xl w-fit group-hover:bg-gold group-hover:text-midnight transition-colors duration-300 mb-3">
                      <IconRenderer name={cat.icon} className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-black text-ink mb-0.5">{cat.name}</h3>
                    <p className="text-[9px] font-bold text-muted truncate">
                      {getCatCount(cat.name)} Deals
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* 🔥 SECTION 2: All Categories */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-line">
                <h2 className="text-xl font-black text-ink uppercase tracking-tight">Browse {activeTab}</h2>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center gap-1 p-1 bg-cream rounded-xl border border-line">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-gold shadow-sm' : 'text-muted'}`}><LayoutGrid className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-gold shadow-sm' : 'text-muted'}`}><List className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="w-44 h-9 pl-8 pr-3 bg-white border border-line rounded-lg focus:border-gold focus:outline-none transition-all text-xs font-bold"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted group-focus-within:text-gold" />
                  </div>
                </div>
              </div>

              {/* ── TOP FILTER BAR (Alphabet) ── */}
              <div className="flex items-center gap-1.5 mb-8 overflow-x-auto no-scrollbar py-1">
                {LETTERS.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter)}
                    className={`h-8 min-w-8 px-2 rounded-lg flex items-center justify-center text-[11px] font-black transition-all duration-200 ${activeLetter === letter ? 'bg-gold text-midnight' : 'bg-white border border-line text-muted hover:border-gold hover:text-gold'}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* ── CATEGORY GRID SYSTEM ── */}
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="h-[140px] bg-cream rounded-[32px] border border-line animate-pulse" />
                  ))}
                </div>
              ) : Object.keys(processedData).length > 0 ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" : "flex flex-col gap-3"}>
                  {Object.entries(processedData).sort().map(([letter, items]) => (
                    <React.Fragment key={letter}>
                      {activeLetter === 'ALL' && (
                        <div className="col-span-full mt-10 mb-6 relative">
                          <div className="flex items-center">
                            <div className="bg-midnight px-6 py-2 rounded-r-2xl border-l-4 border-gold shadow-xl">
                              <h3 className="text-xl font-black text-gold tracking-widest">{letter}</h3>
                            </div>
                            <div className="h-[1px] flex-grow bg-midnight/10 ml-4" />
                          </div>
                          <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gold/20 rounded-full" />
                        </div>
                      )}
                      {items.map((cat, idx) => (
                        <Link
                          key={idx}
                          to={`/category-results?category=${encodeURIComponent(cat.name)}`}
                          className="group relative bg-white rounded-[32px] border border-line p-5 flex flex-col items-center justify-center text-center hover:border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 overflow-hidden min-h-[140px]"
                        >
                          {/* Premium Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                          <div className="relative z-10 flex flex-col items-center">
                            {/* Optimized Icon Size */}
                            <div className="h-14 w-14 mb-4 flex items-center justify-center rounded-[22px] bg-cream text-muted group-hover:bg-gold group-hover:text-midnight group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 shadow-sm border border-line/50">
                              <IconRenderer name={cat.icon || 'Tag'} className="w-6 h-6" />
                            </div>

                            {/* Balanced Typography */}
                            <h4 className="text-[14px] font-black text-ink leading-tight group-hover:text-gold transition-colors duration-300 px-1">
                              {cat.name}
                            </h4>

                            {/* Reveal Stats on Hover */}
                            <div className="max-h-0 group-hover:max-h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-2">
                              <span className="inline-flex px-3 py-1 rounded-full bg-gold text-midnight text-[9px] font-black uppercase tracking-[0.15em] shadow-xl shadow-gold/20">
                                {cat.realCount} OFFERS
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-cream rounded-[40px] border-2 border-dashed border-line">
                  <Filter className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-black text-muted">No results found</h3>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>

      {/* ── Premium CTA & Merchants Footer ── */}
      <section className="relative overflow-hidden bg-midnight border-t border-white/10 py-20 lg:py-24">
        {/* Deep Gradient Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cta_bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 uppercase tracking-tighter">
            Coupons, Offers & <span className="text-gold">Discount Categories</span>
          </h2>
          <p className="text-slate-400 font-medium mb-12 text-sm leading-relaxed max-w-2xl mx-auto">
            Find the highest-rated vouchers and hand-picked offers from India's most trusted retail giants.
            Wouchify aggregates verified savings so you never pay full price again.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
            {[
              { name: 'Amazon', logo: 'https://cdn-icons-png.flaticon.com/512/732/732177.png' },
              { name: 'Flipkart', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png' },
              { name: 'Myntra', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png' },
              { name: 'Ajio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/AJIO_logo.svg/2560px-AJIO_logo.svg.png' },
              { name: 'Swiggy', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/512px-Swiggy_logo.svg.png' },
              { name: 'Zomato', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/1024px-Zomato_logo.png' }
            ].map(store => (
              <Link
                key={store.name}
                to={`/store/${store.name.toLowerCase()}`}
                className="group relative flex items-center justify-center p-4 bg-white rounded-2xl hover:bg-white hover:border-gold hover:scale-105 transition-all duration-500 shadow-xl w-28 h-16 sm:w-32 sm:h-20"
              >
                <img
                  src={store.logo}
                  alt={store.name}
                  className="max-h-6 sm:max-h-8 w-auto object-contain transition-all duration-500"
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gold text-midnight text-[8px] font-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                  {store.name} Coupons
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
