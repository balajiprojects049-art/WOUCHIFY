import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'

// Professional SVG icons
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M2 11h7V2H2v9Zm0 7h7v-5H2v5Zm9 0h7v-9h-7v9Zm0-16v5h7V2h-7Z"/>
    </svg>
  ),
  Deals: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v2A1.5 1.5 0 0 1 17.5 6h-15A1.5 1.5 0 0 1 1 4.5v-2Zm1.5 5A1.5 1.5 0 0 0 1 9v2a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 11V9a1.5 1.5 0 0 0-1.5-1.5h-15Zm0 6A1.5 1.5 0 0 0 1 15v2a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17v-2a1.5 1.5 0 0 0-1.5-1.5h-15Z"/>
    </svg>
  ),
  Loot: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z"/>
    </svg>
  ),
  Stores: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M2.879 7.121A3 3 0 0 0 2 9.243V17.5A1.5 1.5 0 0 0 3.5 19h13a1.5 1.5 0 0 0 1.5-1.5V9.243a3 3 0 0 0-.879-2.122L14 3.5H6L2.879 7.121ZM10 12.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
    </svg>
  ),
  Coupons: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M1 4.25C1 3.007 2.007 2 3.25 2h13.5C17.993 2 19 3.007 19 4.25v11.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75V4.25Zm2.25-.75a.75.75 0 0 0-.75.75V8h15V4.25a.75.75 0 0 0-.75-.75H3.25Zm14.25 6H2.5v5.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9.5Zm-10 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 7.5 12.5Zm4.5-7.5a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Z"/>
    </svg>
  ),
  CreditCard: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M2.5 4A2.5 2.5 0 0 0 0 6.5v1h20v-1A2.5 2.5 0 0 0 17.5 4h-15ZM20 9.5H0v4A2.5 2.5 0 0 0 2.5 16h15a2.5 2.5 0 0 0 2.5-2.5v-4ZM5 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    </svg>
  ),
  Gift: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0L5.205 6.735a.75.75 0 0 0 1.09 1.03L9.25 4.636v8.614ZM3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/>
    </svg>
  ),
  Banner: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M2 3.25A2.25 2.25 0 0 1 4.25 1h11.5A2.25 2.25 0 0 1 18 3.25v9.5A2.25 2.25 0 0 1 15.75 15h-3.878l1.575 2.495a.75.75 0 0 1-1.274.805L10 15.5l-2.173 2.8a.75.75 0 0 1-1.274-.805L8.128 15H4.25A2.25 2.25 0 0 1 2 12.75v-9.5Z"/>
    </svg>
  ),
  Members: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM1.465 14.52a.478.478 0 0 0-.34.48c0 .302.046.602.138.898C1.845 17.131 3.51 18 5 18h.027A6.01 6.01 0 0 1 4 14c0-.374.035-.74.102-1.094A3.523 3.523 0 0 0 1.465 14.52Zm17.07 0a3.523 3.523 0 0 0-2.637-1.614c.067.354.102.72.102 1.094 0 1.44-.48 2.77-1.28 3.836.043.003.086.004.13.004 1.49 0 3.154-.869 3.736-2.102a2.26 2.26 0 0 0 .139-.898.478.478 0 0 0-.34-.48l.15.16ZM10 11a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4Z"/>
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.509 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"/>
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd"/>
      <path fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-1.05a.75.75 0 1 1 1.061-1.06l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 1 1-1.06-1.06l1.047-1.05H6.75A.75.75 0 0 1 6 10Z" clipRule="evenodd"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current">
      <path d="M2 4.5h16v1.5H2V4.5Zm0 5h16v1.5H2V9.5Zm0 5h16v1.5H2v-1.5Z"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
    </svg>
  ),
}

const navItems = [
  { label: 'Dashboard',    to: '/admin/dashboard',    Icon: Icons.Dashboard },
  { label: 'Deals',        to: '/admin/deals',        Icon: Icons.Deals },
  { label: 'Loot Deals',   to: '/admin/loot-deals',   Icon: Icons.Loot },
  { label: 'Stores',       to: '/admin/stores',       Icon: Icons.Stores },
  { label: 'Coupons',      to: '/admin/coupons',      Icon: Icons.Coupons },
  { label: 'Credit Cards', to: '/admin/credit-cards', Icon: Icons.CreditCard },
  { label: 'Giveaways',    to: '/admin/giveaways',    Icon: Icons.Gift },
  { label: 'Banners',      to: '/admin/banners',      Icon: Icons.Banner },
  { label: 'Members',      to: '/admin/members',      Icon: Icons.Members },
  { label: 'Settings',     to: '/admin/settings',     Icon: Icons.Settings },
]

// Accent colour — matches login page green
const G = '#00D47E'

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { adminSettings } = useData()

  const handleLogout = () => navigate('/admin')

  return (
    <div className="flex min-h-screen" style={{ background: '#070B12' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#0C1018', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-3 px-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-sm"
            style={{ background: G, color: '#070B12', boxShadow: `0 4px 16px rgba(0,212,126,0.35)` }}
          >W</div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: G }}>Wouchify</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30">Admin CMS</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-white/30 hover:text-white transition-colors lg:hidden"
          >
            <Icons.Close />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map(({ label, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${isActive ? 'active-nav' : 'inactive-nav'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span style={isActive ? { color: G } : { color: 'rgba(255,255,255,0.4)' }}>
                    <Icon />
                  </span>
                  <span style={isActive ? { color: G } : { color: 'rgba(255,255,255,0.55)' }}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="shrink-0 p-3 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10"
          >
            <Icons.Logout />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header
          className="sticky top-0 z-30 flex h-16 items-center justify-between px-5 lg:px-8"
          style={{ background: 'rgba(7,11,18,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white/40 hover:text-white transition-colors lg:hidden"
              aria-label="Open sidebar"
            >
              <Icons.Menu />
            </button>
            <div>
              <h1 className="text-base font-black text-white">{title}</h1>
              <p className="text-[10px] font-medium text-white/30">Wouchify Admin CMS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div
              className="hidden sm:flex items-center gap-2 rounded-xl px-4 py-2"
              style={{ background: 'rgba(0,212,126,0.08)', border: '1px solid rgba(0,212,126,0.2)' }}
            >
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: G }} />
              <span className="text-xs font-bold" style={{ color: G }}>Live CMS</span>
            </div>

            {/* Avatar */}
            {adminSettings?.avatar ? (
              <img
                src={adminSettings.avatar}
                alt="Admin"
                className="h-9 w-9 rounded-xl object-cover"
                style={{ border: `1px solid rgba(0,212,126,0.25)` }}
              />
            ) : (
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black"
                style={{ background: 'rgba(0,212,126,0.12)', border: `1px solid rgba(0,212,126,0.2)`, color: G }}
              >
                {(adminSettings?.siteName || 'A').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 pb-28 lg:p-8 lg:pb-32">
          <div className="mx-auto w-full max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>

      <style>{`
        .active-nav { background: rgba(0,212,126,0.10); border: 1px solid rgba(0,212,126,0.18); }
        .inactive-nav { border: 1px solid transparent; }
        .inactive-nav:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.06); }
        .inactive-nav:hover span { color: rgba(255,255,255,0.9) !important; }
      `}</style>
    </div>
  )
}
