const points = [
  'No Signup Required — Browse Deals Instantly',
  '100% Free Coupons — No Hidden Charges',
  'Safe & Trusted Deals from Verified Stores',
  'Grab Deals Without Creating an Account',
  'Direct Access to Discounts — No Payment Needed',
  'Use Coupons Instantly — No Registration Hassle',
  'Fast, Easy & Completely Free Deal Discovery',
]

function PointCard({ text }) {
  return (
    <div className="flex min-w-[280px] items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-2 sm:min-w-[320px] sm:gap-3 sm:px-4 sm:py-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold sm:h-8 sm:w-8">
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M7.629 13.233 4.396 10l-1.06 1.06 4.293 4.294L16.666 6.32l-1.06-1.06-7.977 7.973Z" />
        </svg>
      </span>
      <p className="text-xs font-medium leading-5 text-ink sm:text-sm">{text}</p>
    </div>
  )
}

function BenefitsTicker() {
  const loopItems = [...points, ...points]

  return (
    <section className="mb-8 mt-2 sm:mb-12">
      <div className="rounded-2xl border border-line bg-white p-3 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">No Login Needed</p>
          <p className="hidden text-xs font-medium text-muted sm:block">Deals accessible instantly</p>
        </div>

        <div className="overflow-hidden rounded-xl bg-cream/60 py-3">
          <div className="flex w-max animate-marquee gap-4 px-3">
            {loopItems.map((item, index) => (
              <PointCard key={`${item}-${index}`} text={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsTicker
