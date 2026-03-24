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
    <article className="flex min-w-[230px] items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.2)] sm:min-w-[270px]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-sm font-bold text-gold">
        {partner.logoText}
      </div>
      <div>
        <p className="text-sm font-bold tracking-wide text-ink">{partner.name}</p>
        <p className="text-xs font-medium text-muted">{partner.category} Partner</p>
      </div>
    </article>
  )
}

function CategoryTabs() {
  const loopItems = [...partners, ...partners]
  const reverseLoopItems = [...partners].reverse().concat([...partners].reverse())

  return (
    <section className="relative left-1/2 right-1/2 mt-16 box-border w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip px-3 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-r from-navy via-[#0f2b4f] to-navy p-5 shadow-sm sm:p-7">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Our Partners</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Trusted Companies We Work With</h3>
          </div>
          <p className="text-xs font-medium text-slate-200">Verified network across fashion, electronics, and travel</p>
        </div>

        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl bg-white/10 py-3">
            <div className="flex w-max animate-marquee gap-4 px-3">
              {loopItems.map((partner, index) => (
                <PartnerLogoCard key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/10 py-3">
            <div className="flex w-max animate-marquee gap-4 px-3 [animation-direction:reverse]">
              {reverseLoopItems.map((partner, index) => (
                <PartnerLogoCard key={`${partner.name}-reverse-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent" />
      </div>
    </section>
  )
}

export default CategoryTabs
