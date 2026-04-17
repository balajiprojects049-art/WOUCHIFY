import { useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
  { label: 'Stores', to: '/stores' },
  { label: 'Deals', to: '/deals' },
  { label: 'Loot Deals', to: '/loot-deals' },
  { label: 'Coupons', to: '/coupons' },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  )
}

function Navbar() {
  const [searchText, setSearchText] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const tabletSearchRef = useRef(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { deals, lootDeals, stores, coupons, creditCards } = useData()

  // ── Smart suggest logic ──
  const suggestions = useMemo(() => {
    const q = searchText.trim().toLowerCase()
    if (q.length < 2) return null

    const foundPages = navLinks.filter(l => l.label.toLowerCase().includes(q))
    const foundDeals = deals.filter(d => d.title.toLowerCase().includes(q)).slice(0, 3)
    const foundLoot = lootDeals.filter(d => d.title.toLowerCase().includes(q)).slice(0, 2)
    const foundStores = stores.filter(s => s.name.toLowerCase().includes(q)).slice(0, 3)
    const foundCoupons = coupons.filter(c => c.store.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)).slice(0, 2)
    
    const hasResults = foundPages.length || foundDeals.length || foundLoot.length || foundStores.length || foundCoupons.length
    return hasResults ? { pages: foundPages, deals: foundDeals, loot: foundLoot, stores: foundStores, coupons: foundCoupons } : null
  }, [searchText, deals, lootDeals, stores, coupons])

  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault()
    const query = searchText.trim()
    if (!query) return

    const qLower = query.toLowerCase()
    // Smart routing for keywords
    if (qLower === 'coupons') navigate('/coupons')
    else if (qLower === 'deals') navigate('/deals')
    else if (qLower === 'loot' || qLower === 'loot deals') navigate('/loot-deals')
    else if (qLower === 'stores') navigate('/stores')
    else if (qLower === 'cards' || qLower === 'credit cards') navigate('/credit-cards')
    else navigate(`/search?q=${encodeURIComponent(query)}`)

    setIsSearchOpen(false)
    setShowSuggestions(false)
    setSearchText('')
  }

  const openSearch = () => {
    setIsSearchOpen(true)
    setTimeout(() => tabletSearchRef.current?.focus(), 60)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchText('')
  }

  return (
    <>
      {/* ── Top Advertisement Bar ── */}
      <div className="relative flex h-10 sm:h-11 items-center justify-center gap-2 bg-gradient-to-r from-[#D4A820] via-[#E8D39A] to-[#D4A820] px-3 sm:gap-3 sm:px-4">
        <svg className="w-3 h-3 text-[#12151C]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <p className="text-[9px] font-bold tracking-tight text-[#12151C] sm:text-xs sm:tracking-wider uppercase">
          Promote your brand to our audience
        </p>
        <button
          onClick={() => {
            navigate('/')
            setTimeout(() => window.dispatchEvent(new Event('openAdvertiseForm')), 100)
          }}
          className="shrink-0 rounded-lg bg-[#12151C] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-black hover:shadow-md sm:px-3.5 sm:text-xs"
        >
          Advertise With Us
        </button>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-cream transition-colors duration-300">

        {/* ── Main nav row ── */}
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-2 px-3 sm:h-16 sm:px-4 lg:px-8">

          {/* Logo */}
          <div className="flex shrink-0 flex-col">
            <NavLink to="/" className="text-base font-black uppercase tracking-tighter text-[#12151C] md:text-lg xl:text-2xl leading-none">
              WOUCHIFY
            </NavLink>
            <span className="hidden text-[7px] font-black uppercase tracking-[0.15em] text-[#ffb400] md:block mt-0.5">
              Save More Every Day
            </span>
          </div>

          {/* Nav links — md and up */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `group relative py-1.5 text-[11px] lg:text-sm font-bold uppercase tracking-wide lg:tracking-wider transition-colors duration-300 hover:text-ink whitespace-nowrap ${isActive ? 'text-ink' : 'text-muted'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute bottom-0 left-0 block h-[2.5px] w-full rounded-t-full bg-gold transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">

            {/* Full search box — XL+ desktops only */}
            <div className="hidden xl:block relative">
              <form onSubmit={handleSearchSubmit} className="flex rounded-full border border-line bg-cream px-4 py-2 transition-colors duration-300 focus-within:border-gold">
                <input
                  type="text"
                  placeholder="Search deals, stores..."
                  value={searchText}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => { setSearchText(e.target.value); setShowSuggestions(true) }}
                  className="w-44 bg-transparent text-sm text-ink font-bold placeholder:font-normal placeholder:text-muted focus:outline-none"
                />
              </form>
              
              {/* Desktop Suggestions Dropdown */}
              {showSuggestions && suggestions && (
                <div className="absolute top-full right-0 mt-2 w-80 max-h-[480px] overflow-y-auto rounded-2xl border border-line bg-surface/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                  <SearchMenu suggestions={suggestions} itemClick={(path) => { navigate(path); setShowSuggestions(false); setSearchText('') }} />
                </div>
              )}
            </div>

            {/* Search icon — tablet md→xl: opens the slide-down overlay */}
            <button
              onClick={openSearch}
              className={`hidden md:inline-flex xl:hidden h-8 w-8 items-center justify-center rounded-full border transition-all ${
                isSearchOpen
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-line bg-cream text-ink hover:border-gold hover:text-gold'
              }`}
              aria-label="Open search"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M8.5 2a6.5 6.5 0 1 0 4.04 11.59l3.93 3.92 1.06-1.06-3.92-3.93A6.5 6.5 0 0 0 8.5 2Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
              </svg>
            </button>

            {/* Theme toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-line bg-cream text-ink transition-all duration-300 hover:scale-110 hover:border-gold hover:text-gold"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile: search icon */}
            <button
              onClick={openSearch}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-cream text-ink md:hidden"
              aria-label="Search"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M8.5 2a6.5 6.5 0 1 0 4.04 11.59l3.93 3.92 1.06-1.06-3.92-3.93A6.5 6.5 0 0 0 8.5 2Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
              </svg>
            </button>

            {/* Mobile: hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink hover:bg-black/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── Search Overlay (all screen sizes, slides down) ── */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="bg-surface border-t border-line/40 shadow-xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 fill-current text-gold" aria-hidden="true">
                <path d="M8.5 2a6.5 6.5 0 1 0 4.04 11.59l3.93 3.92 1.06-1.06-3.92-3.93A6.5 6.5 0 0 0 8.5 2Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
              </svg>
              <input
                ref={tabletSearchRef}
                type="text"
                placeholder="Search deals, stores, coupons..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 bg-transparent text-sm font-semibold text-ink placeholder:text-muted focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-gold px-4 py-1.5 text-xs font-black text-white hover:bg-[#D4A820] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={closeSearch}
                className="shrink-0 h-7 w-7 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>

            {/* Suggestions list for tablet/mobile overlay */}
            {isSearchOpen && suggestions && (
              <div className="px-4 pb-6 overflow-y-auto max-h-[400px]">
                <SearchMenu suggestions={suggestions} itemClick={(path) => { navigate(path); closeSearch() }} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] border-t border-line/40' : 'max-h-0'}`}>
        <nav className="flex flex-col gap-1 p-4 bg-cream/95 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3.5 text-[15px] uppercase tracking-wider font-extrabold transition-all duration-200 border border-transparent ${
                    isActive
                      ? 'bg-gold text-midnight shadow-md shadow-gold/20'
                      : 'text-ink active:bg-black/5 active:scale-[0.98] [@media(hover:hover)]:hover:bg-black/5 [@media(hover:hover)]:hover:border-line'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}

function SearchMenu({ suggestions, itemClick }) {
  return (
    <div className="space-y-4">
      {suggestions.pages?.length > 0 && (
        <section>
          <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-widest text-gold">Pages</p>
          {suggestions.pages.map(p => (
            <button key={p.to} onClick={() => itemClick(p.to)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gold/5">
              <span className="text-sm font-bold text-ink">{p.label}</span>
            </button>
          ))}
        </section>
      )}

      {suggestions.stores?.length > 0 && (
        <section>
          <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-widest text-gold text-opacity-60">Brand Stores</p>
          {suggestions.stores.map(s => (
            <button key={s.slug} onClick={() => itemClick(`/store/${s.slug}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gold/5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream font-bold text-[10px] text-ink">{s.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <p className="text-sm font-bold text-ink">{s.name}</p>
                <p className="text-[10px] text-muted">{s.category}</p>
              </div>
            </button>
          ))}
        </section>
      )}

      {suggestions.loot?.length > 0 && (
        <section>
          <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-widest text-gold">Loot Deals</p>
          {suggestions.loot.map(d => (
            <button key={d.slug} onClick={() => itemClick(`/loot-deal/${d.slug}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gold/5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-base">🔥</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{d.title}</p>
                <p className="text-[10px] text-emerald-500 font-bold">{d.newPrice}</p>
              </div>
            </button>
          ))}
        </section>
      )}

      {suggestions.deals?.length > 0 && (
        <section>
          <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-widest text-gold">Top Deals</p>
          {suggestions.deals.map(d => (
            <button key={d.slug} onClick={() => itemClick(`/deal/${d.slug}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gold/5">
              <svg className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.884 5.558a1 1 0 1 0-1.458-1.366l-.708.707a1 1 0 0 0 1.458 1.366l.708-.707zM16.282 5.558a1 1 0 1 1-1.458-1.366l.708.707a1 1 0 0 1-1.458 1.366l-.708-.707zM5 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0zm6 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{d.title}</p>
                <p className="text-[10px] text-muted">{d.store}</p>
              </div>
            </button>
          ))}
        </section>
      )}
    </div>
  )
}

export default Navbar
