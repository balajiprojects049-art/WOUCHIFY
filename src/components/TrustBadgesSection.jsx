function TrustBadgesSection() {
  const badges = [
    {
      icon: (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: '100% Free Platform',
      sub: 'No fees ever',
    },
    {
      icon: (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      label: 'No Hidden Charges',
      sub: 'Completely transparent',
    },
    {
      icon: (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
      label: 'Verified Deals Only',
      sub: 'Handpicked & tested',
    },
    {
      icon: (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: '50,000+ Happy Users',
      sub: 'Growing every day',
    },
  ]

  return (
    <section className="py-2">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {badges.map((badge, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-4 text-center shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md sm:p-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold sm:h-14 sm:w-14">
              {badge.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-ink sm:text-sm">{badge.label}</p>
              <p className="mt-0.5 text-[10px] text-muted sm:text-xs">{badge.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBadgesSection
