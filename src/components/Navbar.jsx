import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Deals', to: '/deals' },
  { label: 'Categories', to: '/deals' },
  { label: 'Contact', to: '/deals' },
]

function Navbar() {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const query = searchText.trim()
    navigate(query ? `/deals?q=${encodeURIComponent(query)}` : '/deals')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-base font-semibold tracking-tight text-ink sm:text-lg">
          WOUCHIFY
        </NavLink>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="hidden rounded-full border border-line bg-white px-4 py-2 md:flex">
            <input
              type="text"
              placeholder="Search deals"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="w-44 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </form>

          <button
            onClick={() => navigate('/deals')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink sm:hidden"
            aria-label="Search"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8.5 2a6.5 6.5 0 1 0 4.04 11.59l3.93 3.92 1.06-1.06-3.92-3.93A6.5 6.5 0 0 0 8.5 2Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
            </svg>
          </button>

          <button
            onClick={() => navigate('/deals')}
            className="rounded-full bg-navy px-3 py-2 text-[11px] font-semibold text-white transition-all duration-300 hover:scale-105 sm:px-4 sm:text-xs"
          >
            Get App
          </button>
        </div>
      </div>

    </header>
  )
}

export default Navbar
