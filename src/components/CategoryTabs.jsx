const partners = [
  { name: 'Amazon', category: 'Marketplace', logoText: 'AM' },
  { name: 'Flipkart', category: 'Marketplace', logoText: 'FK' },
  { name: 'Myntra', category: 'Fashion', logoText: 'MY' },
  { name: 'Ajio', category: 'Fashion', logoText: 'AJ' },
  { name: 'Lenovo', category: 'Electronics', logoText: 'LN' },
  { name: 'Dell', category: 'Electronics', logoText: 'DL' },
  { name: 'Puma', category: 'Lifestyle', logoText: 'PM' },
  { name: 'Cleartrip', category: 'Travel', logoText: 'CT' },
]

function PartnerLogoCard({ partner }) {
  return (
    <article className="group flex min-w-[200px] items-center gap-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 p-3.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg sm:min-w-[240px]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.8rem] bg-gold/10 text-sm font-black text-gold transition-transform duration-300 group-hover:scale-110">
        {partner.logoText}
      </div>
      <div>
        <p className="text-[13px] font-black tracking-tight text-ink dark:text-white transition-colors">{partner.name}</p>
        <p className="mt-0.5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-[0.15em]">{partner.category}</p>
      </div>
    </article>
  )
}

function CategoryTabs() {
  // Triple the items to ensure a seamless infinite scroll across wide screens
  const loopItems = [...partners, ...partners, ...partners]

  return (
    <section className="overflow-hidden">
      <div className="relative py-4">
        
        <div className="mb-10 text-center px-4">
          <p className="inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-gold shadow-sm">
            Our Network
          </p>
          <h3 className="mt-5 text-2xl sm:text-3xl font-black tracking-tight text-ink dark:text-white">
            Trusted Companies We Work With
          </h3>
          <p className="mt-3 text-xs sm:text-sm font-semibold text-muted dark:text-white/50">
            Verified direct relationships across India's top brands
          </p>
        </div>

        <div className="relative flex overflow-x-hidden">
          {/* Marquee Track */}
          <div className="flex w-max animate-marquee space-x-6 px-3 hover:[animation-play-state:paused]">
            {loopItems.map((partner, index) => (
              <PartnerLogoCard key={`${partner.name}-${index}`} partner={partner} />
            ))}
          </div>

          {/* Seamless Edge Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-cream dark:from-surface to-transparent transition-colors duration-300" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-cream dark:from-surface to-transparent transition-colors duration-300" />
        </div>

      </div>
    </section>
  )
}

export default CategoryTabs
