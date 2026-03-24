import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'Home',
    to: '/',
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M10 2.3 2.5 8.2v9.5h5.3v-5.3h4.4v5.3h5.3V8.2L10 2.3Z" />
      </svg>
    ),
  },
  {
    label: 'Deals',
    to: '/deals',
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5V8a1.9 1.9 0 0 0 0 3.8v2.7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 14.5v-2.7a1.9 1.9 0 0 0 0-3.8V5.5Z" />
      </svg>
    ),
  },
  {
    label: 'Stores',
    to: '/stores',
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M3 3h6v6H3V3Zm8 0h6v6h-6V3ZM3 11h6v6H3v-6Zm8 0h6v6h-6v-6Z" />
      </svg>
    ),
  },
  {
    label: 'Loot',
    to: '/loot-deals',
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M4.2 4.5h11.6v2.2H4.2V4.5Zm1 4h9.6v2.2H5.2V8.5Zm1 4h7.6v2.2H6.2v-2.2Z" />
      </svg>
    ),
  },
]

function MobileBottomNav() {
  const location = useLocation()

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 py-2 backdrop-blur-md md:hidden">
      <nav className="mx-auto flex max-w-md items-center justify-between gap-1 rounded-2xl bg-white p-2 shadow-sm">
        {navItems.map((item) => (
          (() => {
            const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)

            return (
          <NavLink
            key={item.label}
            to={item.to}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 ${
              isActive ? 'bg-cream text-gold' : 'text-muted'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
            )
          })()
        ))}
      </nav>
    </div>
  )
}

export default MobileBottomNav
