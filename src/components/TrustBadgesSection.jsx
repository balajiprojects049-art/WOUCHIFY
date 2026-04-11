function TrustBadgesSection() {
  const badges = [
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.105-2.59-.308-3.838A11.959 11.959 0 0112 2.714z" />
        </svg>
      ),
      label: 'Verified & Secure',
      sub: 'STRICT SECURITY PROTOCOLS',
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Live Every Hour',
      sub: 'REAL-TIME DATA REFRESH',
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-3.833-6.24h-.001a4.125 4.125 0 00-3.833 6.24zM16.271 8.262a3.375 3.375 0 11.618-3.235 3.377 3.377 0 01-.618 3.235zM4.126 18.544a4.125 4.125 0 013.833-6.24h.001a4.125 4.125 0 013.833 6.24 9.303 9.303 0 01-6.425.86 9.303 9.303 0 01-1.242-.86zM6.155 7.15a3.375 3.375 0 11.618-3.235 3.377 3.377 0 01-.618 3.235z" />
        </svg>
      ),
      label: '50K+ Community',
      sub: 'TRUSTED BY INDIAN SAVERS',
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      label: 'No Login Required',
      sub: '100% PRIVACY GUARANTEED',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {badges.map((badge, i) => (
        <div
          key={i}
          className="flex items-center gap-4 group"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-midnight">
            {badge.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-black tracking-tight text-ink sm:text-[15px]">{badge.label}</p>
            <p className="mt-0.5 text-[9px] font-black text-muted uppercase tracking-[0.15em]">{badge.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrustBadgesSection
