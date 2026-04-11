const benefits = [
  {
    title: 'No Login Required',
    desc: 'Browse deals instantly without any account hassle.',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L9 10.586 6.707 9.293z" clipRule="evenodd"/></svg>
    )
  },
  {
    title: 'All Deals in One Place',
    desc: 'Top offers and coupons verified from trusted stores.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    )
  },
  {
    title: 'Handpicked Offers Only',
    desc: 'Only the best, curated, and working discounts available.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
    )
  },
  {
    title: 'Telegram Instant Updates',
    desc: 'Get live loot deals straight to your phone.',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.84 1.16-5.17 3.39-.48.33-.92.5-1.32.48-.43-.01-1.26-.24-1.87-.44-.75-.24-1.34-.37-1.29-.79.03-.22.34-.44.93-.68 3.58-1.55 5.96-2.58 7.14-3.08 3.39-1.41 4.1-1.65 4.56-1.66.1 0 .32.02.46.12.12.08.16.2.17.29.01.07 0 .14-.02.24z"/></svg>
    )
  }
]

function BenefitsTicker() {
  return (
    <section className="mb-8 mt-6 sm:mb-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Why <span className="text-gold">Wouchify?</span></h2>
        <p className="mt-2 text-sm text-muted sm:text-base">Your ultimate destination for smart savings.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-line shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
            <p className="text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BenefitsTicker
