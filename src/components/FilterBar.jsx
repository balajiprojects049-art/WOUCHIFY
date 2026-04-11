import { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import {
  PRODUCT_CATEGORIES_BY_LETTER,
  STORE_CATEGORIES_BY_LETTER,
  BRAND_CATEGORIES_BY_LETTER,
  FESTIVAL_CATEGORIES_BY_LETTER,
  TOP_STORES,
  CATEGORY_SECTIONS,
} from '../utils/categories'

const defaultDiscountOptions = ['10%+', '25%+', '50%+', '70%+']
const defaultSortOptions = ['Trending', 'Latest', 'Price Low to High', 'Price High to Low', 'Expiring Soon']

/* ─────────────────────────────────────────────────────────────────────────────
   Mega Dropdown — shows when a section button is clicked
   ─────────────────────────────────────────────────────────────────────────── */
function MegaDropdown({ section, category, onCategoryChange, onClose }) {
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const filteredData = query.trim()
    ? Object.entries(section.data).reduce((acc, [l, items]) => {
        const m = items.filter(it => it.toLowerCase().includes(query.toLowerCase()))
        if (m.length) acc[l] = m
        return acc
      }, {})
    : section.data

  const letters = Object.keys(filteredData)

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 z-[500] mt-2 w-full"
      style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        border: '1px solid #e5e7eb',
        maxHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeSlideDown 0.18s ease',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 shrink-0"
        style={{ borderBottom: '1px solid #f3f4f6' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{section.icon}</span>
          <span className="text-sm font-black" style={{ color: '#1a1a2e' }}>
            {section.label} Categories
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${section.label.toLowerCase()}...`}
              className="w-40 bg-transparent text-xs focus:outline-none text-gray-700"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* All categories button */}
      <div className="px-5 pt-3 pb-1 shrink-0">
        <button
          onClick={() => { onCategoryChange('All'); onClose() }}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all"
          style={
            category === 'All'
              ? { background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }
              : { background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb' }
          }
        >
          <span>✦</span> All {section.label}
        </button>
      </div>

      {/* A-Z letter groups */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {letters.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">No results for "{query}"</p>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-0">
            {letters.map(letter => (
              <div key={letter} className="mb-2 break-inside-avoid">
                {/* Letter header */}
                <div className="flex items-center gap-1.5 py-1.5">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-black text-white shrink-0"
                    style={{ background: '#1a1a2e' }}
                  >
                    {letter}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,rgba(201,168,76,0.4),transparent)' }} />
                </div>
                {/* Items */}
                {filteredData[letter].map(item => (
                  <button
                    key={item}
                    onClick={() => { onCategoryChange(item); onClose() }}
                    className="group flex w-full items-center gap-1.5 rounded-lg px-2 py-1 text-left text-[11px] font-medium transition-all hover:bg-amber-50"
                    style={
                      category === item
                        ? { color: '#C9A84C', fontWeight: 700 }
                        : { color: '#4b5563' }
                    }
                  >
                    {category === item
                      ? <span className="text-amber-500 text-xs shrink-0">✓</span>
                      : <span className="h-1 w-1 rounded-full bg-gray-300 group-hover:bg-amber-400 shrink-0 transition-colors" />
                    }
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DESKTOP: Horizontal top bar
   ─────────────────────────────────────────────────────────────────────────── */
function DesktopTopBar({
  searchText, onSearchChange, searchPlaceholder,
  category, onCategoryChange,
  storeValue, onStoreChange, showStoreFilter,
  minDiscount, onMinDiscountChange, discountOptions,
  sortBy, onSortByChange, sortOptions,
  dealStatus, onDealStatusChange, showDealStatus,
}) {
  const [openSection, setOpenSection] = useState(null) // id of open mega menu
  const [sortOpen, setSortOpen]       = useState(false)
  const [discountOpen, setDiscountOpen] = useState(false)
  const [statusOpen, setStatusOpen]   = useState(false)
  const sortRef    = useRef(null)
  const discRef    = useRef(null)
  const statusRef  = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const h = (e) => {
      if (sortRef.current   && !sortRef.current.contains(e.target))   setSortOpen(false)
      if (discRef.current   && !discRef.current.contains(e.target))   setDiscountOpen(false)
      if (statusRef.current && !statusRef.current.contains(e.target)) setStatusOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const activeSection = CATEGORY_SECTIONS.find(s => s.data[category?.[0]]?.includes(category)) ||
    (category && category !== 'All' && category !== 'All Categories'
      ? CATEGORY_SECTIONS.find(s => Object.values(s.data).flat().includes(category))
      : null)

  const activeCount = [
    category && category !== 'All' && category !== 'All Categories' ? 1 : 0,
    storeValue && storeValue !== 'All Stores' ? 1 : 0,
    minDiscount && minDiscount !== discountOptions[0] ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <div
      className="hidden lg:block w-full mb-6 rounded-2xl"
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── Row 1: Search + Category Mega Menus + Sort + Discount ── */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        {/* Search */}
        <div className="flex-1 max-w-xs">
          <SearchBar value={searchText} onChange={onSearchChange} placeholder={searchPlaceholder} />
        </div>

        <div className="h-6 w-px bg-gray-200 mx-1 shrink-0" />

        {/* 4 Category Mega Menu Buttons */}
        <div className="relative flex-1 flex items-center gap-1">
          {CATEGORY_SECTIONS.map(section => {
            const isActive  = openSection === section.id
            const hasActive = Object.values(section.data).flat().includes(category)
            return (
              <button
                key={section.id}
                onClick={() => setOpenSection(isActive ? null : section.id)}
                className="relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all whitespace-nowrap"
                style={
                  isActive
                    ? { background: '#1a1a2e', color: '#fff' }
                    : hasActive
                    ? { background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }
                    : { color: '#374151', background: '#f9fafb', border: '1px solid #e5e7eb' }
                }
              >
                <span className="text-sm">{section.icon}</span>
                {section.label}
                {hasActive && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black text-white" style={{ background: '#C9A84C' }}>✓</span>
                )}
                <svg className={`h-3 w-3 transition-transform ${isActive ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )
          })}

          {/* Mega dropdown panel — positioned relative to the flex row */}
          {openSection && (() => {
            const section = CATEGORY_SECTIONS.find(s => s.id === openSection)
            return section ? (
              <MegaDropdown
                section={section}
                category={category}
                onCategoryChange={onCategoryChange}
                onClose={() => setOpenSection(null)}
              />
            ) : null
          })()}
        </div>

        <div className="h-6 w-px bg-gray-200 mx-1 shrink-0" />

        {/* Sort dropdown */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => { setSortOpen(v => !v); setDiscountOpen(false); setStatusOpen(false) }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border border-gray-200 bg-gray-50 transition-all hover:bg-gray-100 whitespace-nowrap"
            style={{ color: '#374151' }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
            </svg>
            {sortBy}
            <svg className={`h-3 w-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-2 z-[400] w-52 rounded-2xl bg-white shadow-2xl border border-gray-100 py-2 overflow-hidden">
              {sortOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { onSortByChange(opt); setSortOpen(false) }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-semibold transition-colors hover:bg-gray-50"
                  style={sortBy === opt ? { color: '#C9A84C', fontWeight: 700 } : { color: '#374151' }}
                >
                  {sortBy === opt && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />}
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Discount dropdown */}
        <div ref={discRef} className="relative">
          <button
            onClick={() => { setDiscountOpen(v => !v); setSortOpen(false); setStatusOpen(false) }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border transition-all whitespace-nowrap"
            style={
              minDiscount && minDiscount !== discountOptions[0]
                ? { background: 'rgba(201,168,76,0.1)', color: '#C9A84C', borderColor: 'rgba(201,168,76,0.3)' }
                : { background: '#f9fafb', color: '#374151', borderColor: '#e5e7eb' }
            }
          >
            🏷️ {minDiscount || discountOptions[0]}
            <svg className={`h-3 w-3 transition-transform ${discountOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {discountOpen && (
            <div className="absolute right-0 top-full mt-2 z-[400] w-36 rounded-2xl bg-white shadow-2xl border border-gray-100 py-2 overflow-hidden">
              {discountOptions.map(d => (
                <button
                  key={d}
                  onClick={() => { onMinDiscountChange(d); setDiscountOpen(false) }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-bold transition-colors hover:bg-gray-50"
                  style={minDiscount === d ? { color: '#C9A84C' } : { color: '#374151' }}
                >
                  {minDiscount === d && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />}
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deal Status dropdown */}
        {showDealStatus && (
          <div ref={statusRef} className="relative">
            <button
              onClick={() => { setStatusOpen(v => !v); setSortOpen(false); setDiscountOpen(false) }}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border border-gray-200 bg-gray-50 transition-all hover:bg-gray-100 whitespace-nowrap"
              style={{ color: '#374151' }}
            >
              {dealStatus || 'Active Deals'}
              <svg className={`h-3 w-3 transition-transform ${statusOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {statusOpen && (
              <div className="absolute right-0 top-full mt-2 z-[400] w-44 rounded-2xl bg-white shadow-2xl border border-gray-100 py-2 overflow-hidden">
                {['Active Deals', 'Expired Deals', 'All Deals'].map(s => (
                  <button
                    key={s}
                    onClick={() => { onDealStatusChange && onDealStatusChange(s); setStatusOpen(false) }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-semibold transition-colors hover:bg-gray-50"
                    style={dealStatus === s ? { color: '#1a1a2e', fontWeight: 700 } : { color: '#374151' }}
                  >
                    {dealStatus === s && <span className="h-1.5 w-1.5 rounded-full bg-navy shrink-0" />}
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clear all filters */}
        {activeCount > 0 && (
          <button
            onClick={() => { onCategoryChange('All'); if (onStoreChange) onStoreChange('All Stores'); onMinDiscountChange(discountOptions[0]) }}
            className="rounded-xl px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-50 transition-all border border-red-100 whitespace-nowrap"
          >
            ✕ Clear ({activeCount})
          </button>
        )}
      </div>

      {/* ── Row 2: Store quick chips (only if showStoreFilter) ── */}
      {showStoreFilter && (
        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 shrink-0">Store</span>
          <div className="h-4 w-px bg-gray-200 mx-1 shrink-0" />
          {TOP_STORES.map(s => (
            <button
              key={s}
              onClick={() => onStoreChange && onStoreChange(s)}
              className="shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all"
              style={
                storeValue === s
                  ? { background: '#1a1a2e', color: '#fff', borderColor: '#1a1a2e' }
                  : { background: '#f9fafb', color: '#6b7280', borderColor: '#e5e7eb' }
              }
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Row 3: Active category breadcrumb ── */}
      {category && category !== 'All' && category !== 'All Categories' && (
        <div
          className="flex items-center gap-2 px-4 py-2.5 text-xs"
          style={{ borderTop: '1px solid #f3f4f6', background: 'rgba(201,168,76,0.04)' }}
        >
          <span className="text-gray-400 font-semibold">Filtering by:</span>
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 font-bold"
            style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            {category}
            <button onClick={() => onCategoryChange('All')} className="hover:text-red-400 transition-colors leading-none">✕</button>
          </span>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE: Full-screen Filter Drawer
   ─────────────────────────────────────────────────────────────────────────── */
const QUICK_FILTER_CHIPS = [
  { label: 'Trending', icon: '🔥' },
  { label: 'New',      icon: '✨' },
  { label: 'Offers',   icon: '🏷️' },
  { label: 'Top Rated',icon: '⭐' },
  { label: 'Sale',     icon: '⚡' },
]

function MobileFilterDrawer({
  open, onClose,
  searchText, onSearchChange, searchPlaceholder,
  category, onCategoryChange,
  storeValue, onStoreChange, showStoreFilter,
  minDiscount, onMinDiscountChange, discountOptions,
  sortBy, onSortByChange, sortOptions,
  dealStatus, onDealStatusChange, showDealStatus,
  priceRange, onPriceRangeChange, priceRangeMin, priceRangeMax, showPriceRange,
  onApply, onReset,
}) {
  const [localCat, setLocalCat]         = useState(category)
  const [localStore, setLocalStore]     = useState(storeValue || 'All Stores')
  const [localDiscount, setLocalDiscount] = useState(minDiscount)
  const [localSort, setLocalSort]       = useState(sortBy)
  const [localStatus, setLocalStatus]   = useState(dealStatus || 'Active Deals')
  const [localPrice, setLocalPrice]     = useState(priceRange || priceRangeMax)
  const [activeTab, setActiveTab]       = useState('products') // which section tab
  const [catQuery, setCatQuery]         = useState('')

  useEffect(() => { setLocalCat(category) },       [category])
  useEffect(() => { setLocalSort(sortBy) },         [sortBy])
  useEffect(() => { setLocalDiscount(minDiscount) }, [minDiscount])
  useEffect(() => { setLocalPrice(priceRange || priceRangeMax) }, [priceRange, priceRangeMax])

  const handleApply = () => {
    onCategoryChange(localCat)
    if (showStoreFilter && onStoreChange) onStoreChange(localStore)
    onMinDiscountChange(localDiscount)
    onSortByChange(localSort)
    if (showDealStatus && onDealStatusChange) onDealStatusChange(localStatus)
    if (showPriceRange && onPriceRangeChange) onPriceRangeChange(localPrice)
    onClose()
    if (onApply) onApply()
  }

  const handleReset = () => {
    setLocalCat('All')
    setLocalStore('All Stores')
    setLocalDiscount(discountOptions[0])
    setLocalSort(sortOptions[0])
    setLocalStatus('Active Deals')
    setLocalPrice(priceRangeMax)
    if (onReset) onReset()
  }

  const currentSection = CATEGORY_SECTIONS.find(s => s.id === activeTab) || CATEGORY_SECTIONS[0]
  const filteredData = catQuery.trim()
    ? Object.entries(currentSection.data).reduce((acc, [l, items]) => {
        const m = items.filter(it => it.toLowerCase().includes(catQuery.toLowerCase()))
        if (m.length) acc[l] = m
        return acc
      }, {})
    : currentSection.data

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[300] flex flex-col" style={{ background: 'rgba(0,0,0,0.55)' }}>
      <div className="flex-1" onClick={onClose} />
      <div
        className="relative flex flex-col bg-white"
        style={{ maxHeight: '92vh', borderRadius: '20px 20px 0 0', boxShadow: '0 -8px 40px rgba(0,0,0,0.18)' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 shrink-0">
          <h2 className="text-base font-black" style={{ color: '#1a1a2e' }}>Sort & Filters</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: '#f3f4f6' }}>
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Search */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
              <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
              </svg>
              <input
                type="text" value={searchText}
                onChange={e => onSearchChange && onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700"
              />
              {searchText && (
                <button onClick={() => onSearchChange && onSearchChange('')} className="text-gray-400 hover:text-gray-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Sort By */}
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-gray-400">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map(opt => (
                <button
                  key={opt} onClick={() => setLocalSort(opt)}
                  className="rounded-full border px-4 py-2 text-xs font-semibold transition-all"
                  style={localSort === opt
                    ? { background: '#1a1a2e', color: '#fff', borderColor: '#1a1a2e' }
                    : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }}
                >{opt}</button>
              ))}
            </div>
          </div>

          {/* Category — with 4 section tabs */}
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-gray-400">Category</p>

            {/* Section tabs */}
            <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-none">
              {CATEGORY_SECTIONS.map(s => {
                const hasActive = Object.values(s.data).flat().includes(localCat)
                return (
                  <button
                    key={s.id}
                    onClick={() => { setActiveTab(s.id); setCatQuery('') }}
                    className="shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all"
                    style={
                      activeTab === s.id
                        ? { background: '#1a1a2e', color: '#fff' }
                        : hasActive
                        ? { background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }
                        : { background: '#f3f4f6', color: '#6b7280' }
                    }
                  >
                    {s.icon} {s.label}
                    {hasActive && activeTab !== s.id && <span style={{ fontSize: '8px', background: '#C9A84C', color: '#fff', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
                  </button>
                )
              })}
            </div>

            {/* Category search for current section */}
            <input
              type="text" placeholder={`Search ${currentSection.label.toLowerCase()}...`}
              value={catQuery} onChange={e => setCatQuery(e.target.value)}
              className="mb-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs focus:outline-none text-gray-700"
            />

            {/* All button */}
            <button
              onClick={() => setLocalCat('All')}
              className="mb-2 w-full rounded-xl border px-3 py-2 text-left text-xs font-bold transition-all"
              style={localCat === 'All'
                ? { borderColor: '#C9A84C', background: 'rgba(201,168,76,0.1)', color: '#C9A84C' }
                : { borderColor: '#e5e7eb', color: '#374151' }}
            >✦ All {currentSection.label}</button>

            {/* Items grid */}
            <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-200">
              {Object.entries(filteredData).map(([letter, items]) => (
                <div key={letter}>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-black text-white" style={{ background: '#1a1a2e' }}>{letter}</span>
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,rgba(201,168,76,0.3),transparent)' }} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-3 py-2">
                    {items.map(cat => (
                      <button
                        key={cat} onClick={() => setLocalCat(cat)}
                        className="rounded-full border px-3 py-1 text-[11px] font-medium transition-all"
                        style={localCat === cat
                          ? { borderColor: '#C9A84C', background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontWeight: 700 }
                          : { borderColor: '#e5e7eb', color: '#374151' }}
                      >{cat}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store */}
          {showStoreFilter && (
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-gray-400">Store</p>
              <div className="flex flex-wrap gap-2">
                {TOP_STORES.map(s => (
                  <button key={s} onClick={() => setLocalStore(s)}
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all"
                    style={localStore === s
                      ? { background: '#1a1a2e', color: '#fff', borderColor: '#1a1a2e' }
                      : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Min Discount */}
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-gray-400">Min Discount</p>
            <div className="grid grid-cols-4 gap-2">
              {discountOptions.map(d => {
                const icons = { 'All': '🏷️', '0%+': '✅', '10%+': '💰', '20%+': '🔥', '25%+': '🎯', '50%+': '⚡', '70%+': '🚀', '80%+': '💎' }
                return (
                  <button key={d} onClick={() => setLocalDiscount(d)}
                    className="flex flex-col items-center justify-center rounded-2xl border py-3 gap-1 transition-all"
                    style={localDiscount === d
                      ? { borderColor: '#C9A84C', background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }
                      : { borderColor: '#e5e7eb', background: '#fafafa', color: '#6b7280' }}
                  >
                    <span className="text-lg leading-none">{icons[d] || '🏷️'}</span>
                    <span className="text-[11px] font-bold">{d}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Price Range */}
          {showPriceRange && (
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Price Range</p>
                <span className="text-xs font-bold" style={{ color: '#C9A84C' }}>Up to ₹{localPrice?.toLocaleString()}</span>
              </div>
              <input type="range" min={priceRangeMin} max={priceRangeMax} step="10" value={localPrice}
                onChange={e => setLocalPrice(Number(e.target.value))} className="w-full" style={{ accentColor: '#C9A84C' }} />
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-gray-400">
                <span>₹{priceRangeMin}</span><span>₹{priceRangeMax?.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Deal Status */}
          {showDealStatus && (
            <div className="px-5 py-4 pb-6">
              <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-gray-400">Deal Status</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ label: 'Active Deals', icon: '✅' }, { label: 'Expired Deals', icon: '⏰' }, { label: 'All Deals', icon: '📋' }].map(({ label, icon }) => (
                  <button key={label} onClick={() => setLocalStatus(label)}
                    className="flex flex-col items-center justify-center rounded-2xl border py-3 gap-1 transition-all"
                    style={localStatus === label
                      ? { borderColor: '#1a1a2e', background: 'rgba(26,26,46,0.08)', color: '#1a1a2e' }
                      : { borderColor: '#e5e7eb', background: '#fafafa', color: '#6b7280' }}
                  >
                    <span className="text-lg leading-none">{icon}</span>
                    <span className="text-[11px] font-bold text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="flex gap-3 px-5 py-4 shrink-0" style={{ borderTop: '1px solid #f3f4f6', background: '#fff' }}>
          <button onClick={handleReset} className="flex-1 rounded-2xl border py-3.5 text-sm font-black transition-all" style={{ borderColor: '#e5e7eb', color: '#6b7280' }}>Reset</button>
          <button onClick={handleApply} className="flex-1 rounded-2xl py-3.5 text-sm font-black text-white shadow-lg transition-all" style={{ background: '#C9A84C', boxShadow: '0 4px 16px rgba(201,168,76,0.35)' }}>Apply Filters</button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE: Top bar (search + category pills)
   ─────────────────────────────────────────────────────────────────────────── */
function MobileTopBar({ searchText, onSearchChange, searchPlaceholder, category, onCategoryChange, openDrawer, activeFilterCount }) {
  // Show top few from each section for quick access
  const quickCats = ['All', ...Object.values(PRODUCT_CATEGORIES_BY_LETTER).flat().slice(0, 12)]
  return (
    <div className="flex flex-col gap-3 lg:hidden">
      <SearchBar value={searchText} onChange={onSearchChange} placeholder={searchPlaceholder} />
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none -mx-1 px-1">
        {quickCats.map(cat => (
          <button
            key={cat} onClick={() => onCategoryChange(cat)}
            className="shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-all"
            style={
              (category === cat || (cat === 'All' && category === 'All'))
                ? { background: '#1a1a2e', color: '#fff', borderColor: '#1a1a2e' }
                : { background: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }
            }
          >{cat}</button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE: Fixed bottom strip — compact icon style like bottom nav
   ─────────────────────────────────────────────────────────────────────────── */
function MobileBottomFilterBar({ openDrawer, activeFilterCount }) {
  return (
    <div
      className="fixed left-0 right-0 z-[200] lg:hidden flex items-center border-t"
      style={{ bottom: '60px', background: '#fff', borderTopColor: '#e5e7eb', boxShadow: '0 -2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Quick chips — same size/spacing as Filter button */}
      <div className="flex flex-1 items-center overflow-x-auto scrollbar-none">
        {QUICK_FILTER_CHIPS.map(chip => (
          <button
            key={chip.label}
            className="flex shrink-0 flex-col items-center justify-center py-2.5"
            style={{ minWidth: '60px' }}
          >
            <span className="text-[18px] leading-none">{chip.icon}</span>
            <span className="text-[10px] font-semibold text-gray-400 mt-1">{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Filter button — NO divider, flows naturally, bigger to match chips */}
      <button
        onClick={openDrawer}
        className="relative flex shrink-0 flex-col items-center justify-center py-2.5 transition-all active:scale-95"
        style={{ minWidth: '60px' }}
      >
        <div className="relative">
          <svg className="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" style={{ color: '#C9A84C' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
          </svg>
          {activeFilterCount > 0 && (
            <span
              className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black text-white"
              style={{ background: '#C9A84C' }}
            >
              {activeFilterCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold mt-1" style={{ color: '#C9A84C' }}>Filter</span>
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
   ─────────────────────────────────────────────────────────────────────────── */
function FilterBar({
  searchText, onSearchChange,
  searchPlaceholder = 'Search deals...',
  category, onCategoryChange,
  minDiscount, onMinDiscountChange,
  discountOptions = defaultDiscountOptions,
  priceRange, onPriceRangeChange,
  priceRangeMin = 50, priceRangeMax = 2000,
  sortBy, onSortByChange,
  sortOptions = defaultSortOptions,
  dealStatus, onDealStatusChange,
  showPriceRange = true,
  showDealStatus = true,
  showStoreFilter = false,
  storeValue, onStoreChange,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const activeCount = [
    category && category !== 'All' && category !== 'All Categories' ? 1 : 0,
    storeValue && storeValue !== 'All Stores' ? 1 : 0,
    minDiscount && minDiscount !== discountOptions[0] ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const sharedProps = {
    searchText, onSearchChange, searchPlaceholder,
    category, onCategoryChange,
    storeValue, onStoreChange, showStoreFilter,
    minDiscount, onMinDiscountChange, discountOptions,
    sortBy, onSortByChange, sortOptions,
    dealStatus, onDealStatusChange, showDealStatus,
    priceRange, onPriceRangeChange, priceRangeMin, priceRangeMax, showPriceRange,
  }

  return (
    <>
      {/* CSS for animations */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Desktop: Full-width top bar ── */}
      <DesktopTopBar {...sharedProps} />

      {/* ── Mobile: sticky bottom strip ── */}
      <MobileBottomFilterBar openDrawer={() => setDrawerOpen(true)} activeFilterCount={activeCount} />

      {/* ── Mobile: full-screen drawer ── */}
      <MobileFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} {...sharedProps} />

      {/* ── Mobile: top search + quick pills ── */}
      <MobileTopBar
        searchText={searchText} onSearchChange={onSearchChange} searchPlaceholder={searchPlaceholder}
        category={category} onCategoryChange={onCategoryChange}
        openDrawer={() => setDrawerOpen(true)} activeFilterCount={activeCount}
      />
    </>
  )
}

// Keep named export for any admin pages that import it directly
export { DesktopTopBar as DesktopFilterSidebar, MobileFilterDrawer }
export default FilterBar
