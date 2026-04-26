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
  const [activeTab, setActiveTab] = useState('all')
  const [activeTravelSub, setActiveTravelSub] = useState('All')
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
        if (activeTravelSub !== 'All' && tripType !== activeTravelSub) return
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
    <div className="min-h-screen bg-cream font-sans text-ink transition-colors duration-500">
      {/* ── 1. TOP HEADER SECTION ── */}
      <header className="bg-surface border-b border-line pb-6 pt-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="text-ink">Categories</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink mb-3">Categories</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-line rounded-full text-xs font-semibold text-muted shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Total Categories: <span className="text-ink font-bold">{totalCategories.toLocaleString()}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-line rounded-full text-xs font-semibold text-muted shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                  Coupons & Offers: <span className="text-ink font-bold">{totalCoupons.toLocaleString()}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 py-1.5 px-3 bg-cream rounded-xl border border-line self-start md:self-auto shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Verified On: <span className="text-ink">{today}</span></span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col gap-6">

          {/* ── SIDEBAR: horizontal scrollable tabs on tablet, vertical on desktop ── */}
          <div className="w-full">
            {/* Mobile + Tablet: horizontal scrollable tab strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:hidden">
              {sidebarLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all border ${
                    activeTab === link.id
                      ? 'bg-gold text-white border-gold shadow-sm'
                      : 'bg-surface text-muted border-line hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  <IconRenderer name={link.icon} className="w-3.5 h-3.5" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Desktop sidebar — vertical, hidden on tablet and below */}
            <aside className="hidden lg:block lg:w-56 xl:w-64 shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Navigation Menu */}
              <nav className="bg-surface rounded-2xl border border-line p-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="space-y-1">
                  {sidebarLinks.map(link => (
                    <button
                      key={link.id}
                      onClick={() => setActiveTab(link.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group ${activeTab === link.id ? 'bg-gold/10 text-gold shadow-sm' : 'text-muted hover:bg-cream hover:text-ink'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg transition-colors ${activeTab === link.id ? 'bg-gold text-white shadow-md shadow-gold/20' : 'bg-cream text-muted group-hover:bg-line group-hover:text-ink'}`}>
                          <IconRenderer name={link.icon} className="w-4 h-4" />
                        </div>
                        <span className={`text-[13px] font-bold tracking-tight ${activeTab === link.id ? 'text-ink' : 'group-hover:text-ink'}`}>{link.label}</span>
                      </div>
                      {activeTab === link.id && <ChevronRight className="w-4 h-4 text-gold" />}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Popular Merchants List */}
              <div className="px-2 pt-2">
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-line"></span>
                  Popular Stores
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Swiggy', 'Zomato'].map(merchant => (
                    <Link
                      key={merchant}
                      to={`/store/${merchant.toLowerCase()}`}
                      className="px-3 py-1.5 bg-surface hover:bg-gold/10 hover:text-gold hover:border-gold/30 text-[11px] font-semibold text-muted rounded-full transition-all border border-line"
                    >
                      {merchant}
                    </Link>
                  ))}
                </div>
              </div>
              </div>
            </aside>

            {/* ── 3. MAIN CONTENT ── */}
            <div className="flex-grow min-w-0">

            {/* 🔥 SECTION 1: Popular Categories */}
            <section className="mb-10 lg:mb-14">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold tracking-tight text-ink flex items-center gap-2">
                  <div className="p-1.5 bg-gold/10 rounded-lg"><TrendingUp className="w-4 h-4 text-gold" /></div>
                  Trending Categories
                </h2>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 gap-y-6 sm:gap-y-8">
                {popularCategories.map((cat, i) => (
                  <Link
                    key={i}
                    to={`/category-results?category=${encodeURIComponent(cat.name)}`}
                    className="group flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-full relative h-[90px] flex items-center justify-center bg-surface rounded-2xl border border-line overflow-hidden transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_8px_20px_rgba(212,168,32,0.15)] group-hover:-translate-y-1">
                      
                      {/* Default State: Icon */}
                      <div className="absolute inset-0 flex items-center justify-center transition-all duration-400 group-hover:opacity-0 group-hover:scale-50">
                        <IconRenderer name={cat.icon} className="w-7 h-7 sm:w-8 sm:h-8 text-gold opacity-80" />
                      </div>

                      {/* Count badge — mobile/tablet only */}
                      <div className="lg:hidden absolute bottom-1.5 right-1.5 flex items-center rounded-full bg-gold px-1.5 py-0.5 pointer-events-none shadow-sm">
                        <span className="text-[9px] font-black text-midnight leading-none">{getCatCount(cat.name)}</span>
                      </div>

                      {/* Hover State: Full overlay (desktop) */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gold text-midnight transition-all duration-400 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100">
                        <span className="text-xl sm:text-2xl font-black">{getCatCount(cat.name)}</span>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest opacity-90">Offers</span>
                      </div>
                    </div>
                    
                    {/* Label below the card */}
                    <div className="mt-3.5 flex items-center gap-1.5 text-ink group-hover:text-gold transition-colors duration-300">
                      <h3 className="text-[13px] sm:text-sm font-semibold text-center">
                        {cat.name}
                      </h3>
                      <IconRenderer name="ArrowUpRight" className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* 🔥 SECTION 2: All Categories */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-line">
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">Browse {activeTab}</h2>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center gap-1 p-1 bg-cream rounded-xl border border-line">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-surface text-gold shadow-sm' : 'text-muted'}`}><LayoutGrid className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-surface text-gold shadow-sm' : 'text-muted'}`}><List className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="w-44 h-9 pl-8 pr-3 bg-surface border border-line rounded-lg focus:border-gold focus:outline-none transition-all text-xs font-bold text-ink"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted group-focus-within:text-gold" />
                  </div>
                </div>
              </div>

              {/* Travel Sub-categories filter */}
              {activeTab === 'travel' && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {['All', 'Planes', 'Buses', 'Trains', 'Cars', 'Bikes', 'Auto'].map(sub => (
                    <button
                      key={sub}
                      onClick={() => setActiveTravelSub(sub)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        activeTravelSub === sub
                          ? 'bg-gold text-white border-gold shadow-md'
                          : 'bg-surface text-muted border-line hover:border-gold/40'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {/* ── Alphabet filter: wraps on tablet ── */}
              <div className="flex flex-wrap items-center gap-1.5 mb-6 md:mb-8">
                {LETTERS.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter)}
                    className={`h-7 md:h-8 px-2 md:px-3 rounded-lg flex items-center justify-center text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      activeLetter === letter
                        ? 'bg-ink text-cream shadow-md'
                        : 'bg-surface border border-line text-muted hover:border-gold/30 hover:text-gold'
                    }`}
                  >
                    {letter === 'ALL' ? 'All' : letter}
                  </button>
                ))}
              </div>

              {/* ── CATEGORY GRID SYSTEM ── */}
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 gap-y-8 sm:gap-y-10">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="flex flex-col">
                      <div className="h-[100px] bg-surface rounded-2xl border border-line animate-pulse" />
                      <div className="h-4 w-2/3 mx-auto mt-3.5 bg-surface rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : Object.keys(processedData).length > 0 ? (
                <div className={viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 gap-y-6 md:gap-y-8'
                  : 'flex flex-col gap-3'
                }>
                  {Object.entries(processedData).sort().map(([letter, items]) => (
                    <React.Fragment key={letter}>
                      {activeLetter === 'ALL' && (
                        <div className="col-span-full flex items-center justify-center mt-12 sm:mt-16 mb-6 sm:mb-10 w-full">
                          {/* Bright Gradient Line Left */}
                          <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-gold/40 to-gold rounded-full opacity-80" />
                          
                          {/* Premium Circular Letter Badge */}
                          <div className="mx-4 sm:mx-6 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-surface rounded-full border-2 border-gold shadow-[0_4px_20px_rgba(212,168,32,0.25)] flex-shrink-0 relative">
                            {/* Inner Dashed Ring */}
                            <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-dashed border-gold rotate-45"></div>
                            <h3 className="text-xl sm:text-3xl font-black text-gold tracking-widest translate-x-0.5">{letter}</h3>
                          </div>
                          
                          {/* Bright Gradient Line Right */}
                          <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent via-gold/40 to-gold rounded-full opacity-80" />
                        </div>
                      )}
                      {items.map((cat, idx) => (
                        <Link
                          key={idx}
                          to={`/category-results?category=${encodeURIComponent(cat.name)}`}
                          className="group flex flex-col items-center cursor-pointer"
                        >
                          <div className="w-full relative h-[100px] flex items-center justify-center bg-surface rounded-2xl border border-line overflow-hidden transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_8px_20px_rgba(212,168,32,0.15)] group-hover:-translate-y-1">
                            
                            {/* Default State: Icon */}
                            <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                              <IconRenderer name={cat.icon || 'Tag'} className="w-8 h-8 text-gold transition-colors" />
                            </div>

                            {/* Count badge — mobile/tablet only (hidden on desktop where hover works) */}
                            <div className="lg:hidden absolute bottom-1.5 right-1.5 flex items-center rounded-full bg-gold px-1.5 py-0.5 pointer-events-none shadow-sm">
                              <span className="text-[9px] font-black text-midnight leading-none">{cat.realCount}</span>
                            </div>

                            {/* Hover State: Full gold overlay (desktop) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gold text-midnight transition-all duration-400 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
                              <span className="text-xl sm:text-2xl font-black">{cat.realCount}</span>
                              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest opacity-90">Deals</span>
                            </div>
                          </div>
                          
                          <div className="mt-2.5 flex flex-col items-center gap-0.5 text-ink group-hover:text-gold transition-colors duration-300 w-full px-1">
                            <h4 className="text-[12px] sm:text-[13px] font-semibold text-center leading-tight line-clamp-2">
                              {cat.name}
                            </h4>
                            {/* Offer count below name — only on mobile/tablet */}
                            <span className="lg:hidden text-[10px] font-bold text-gold">{cat.realCount} offers</span>
                          </div>
                        </Link>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-surface rounded-[40px] border-2 border-dashed border-line">
                  <Filter className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-black text-muted">No results found</h3>
                </div>
              )}
            </section>

            </div>
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
              { name: 'Ajio', logo: 'https://assets.ajio.com/static/img/Ajio-Logo.svg' },
              { name: 'Swiggy', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png' },
              { name: 'Zomato', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg' }
            ].map(store => (
              <Link
                key={store.name}
                to={`/store/${store.name.toLowerCase()}`}
                className="group relative flex items-center justify-center p-4 bg-surface rounded-2xl hover:bg-surface hover:border-gold hover:scale-105 transition-all duration-500 shadow-xl w-28 h-16 sm:w-32 sm:h-20"
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
