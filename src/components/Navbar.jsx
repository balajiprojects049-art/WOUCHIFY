import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
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
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const query = searchText.trim()
    const route = query.toLowerCase().includes('loot') ? '/loot-deals' : '/deals'
    navigate(query ? `${route}?q=${encodeURIComponent(query)}` : route)
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
            setTimeout(() => {
              window.dispatchEvent(new Event('openAdvertiseForm'))
            }, 100)
          }}
          className="shrink-0 rounded-lg bg-[#12151C] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-black hover:shadow-md sm:px-3.5 sm:text-xs"
        >
          Advertise With Us
        </button>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-cream transition-colors duration-300">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:items-start">
          <NavLink to="/" className="text-xl font-black uppercase tracking-tighter text-[#12151C] sm:text-2xl leading-none">
            WOUCHIFY
          </NavLink>
          <span className="hidden text-[8px] font-black uppercase tracking-[0.2em] text-[#ffb400] md:block mt-1">
            Save More Every Day
          </span>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `group relative py-2 text-sm font-medium transition-colors duration-300 hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 block h-[2px] w-full rounded-full bg-gold transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="hidden rounded-full border border-line bg-cream px-4 py-2 md:flex transition-colors duration-300">
            <input
              type="text"
              placeholder="Search deals"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="w-44 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </form>

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-ink transition-all duration-300 hover:scale-110 hover:border-gold hover:text-gold"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => navigate('/deals')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-ink sm:hidden"
            aria-label="Search"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8.5 2a6.5 6.5 0 1 0 4.04 11.59l3.93 3.92 1.06-1.06-3.92-3.93A6.5 6.5 0 0 0 8.5 2Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
            </svg>
          </button>
        </div>
      </div>

    </header>
    </>
  )
}

export default Navbar

