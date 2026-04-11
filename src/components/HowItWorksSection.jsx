function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      ),
      title: 'Browse Deals',
      desc: 'Explore hundreds of verified deals, coupons & loot offers updated daily.',
      color: 'from-amber-400 to-yellow-500',
      bg: 'bg-amber-50 dark:bg-amber-900/10',
    },
    {
      step: '02',
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-10 7 10 7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      ),
      title: 'Pick Your Offer',
      desc: 'Choose any deal, coupon code or reward voucher that suits you.',
      color: 'from-orange-400 to-rose-500',
      bg: 'bg-orange-50 dark:bg-orange-900/10',
    },
    {
      step: '03',
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
      title: 'Apply & Save',
      desc: 'Use it instantly at checkout. 100% free — no fees, no login required.',
      color: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
    },
    {
      step: '04',
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
      title: 'Earn Rewards',
      desc: 'Spin the wheel daily, collect points & unlock exclusive vouchers.',
      color: 'from-violet-400 to-purple-600',
      bg: 'bg-violet-50 dark:bg-violet-900/10',
    },
  ]

  return (
    <section className="py-4 sm:py-6" id="how-it-works">
      {/* Header */}
      <div className="mb-8 text-center sm:mb-10">
        <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold mb-3">
          Simple Process
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          How <span className="text-gold">Wouchify</span> Works
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base max-w-lg mx-auto">
          From discovering deals to saving money — it takes under 60 seconds.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6`}
          >
            {/* Step number */}
            <span className={`absolute -top-3 left-5 inline-flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} px-3 py-0.5 text-xs font-black text-white shadow`}>
              {step.step}
            </span>

            {/* Icon */}
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.bg} text-gold mt-1`}>
              {step.icon}
            </div>

            <div>
              <h3 className="text-base font-bold text-ink sm:text-lg">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{step.desc}</p>
            </div>

            {/* Connector arrow (not on last) */}
            {i < steps.length - 1 && (
              <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center lg:flex">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection
