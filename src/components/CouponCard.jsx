import { useMemo, useState } from 'react'

function CouponCard({ store, offer }) {
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [showDetailsCard, setShowDetailsCard] = useState(false)
  const [logoBroken, setLogoBroken] = useState(false)

  const logoUrl = useMemo(() => {
    try {
      const hostname = new URL(store.website).hostname.replace('www.', '')
      return `https://logo.clearbit.com/${hostname}`
    } catch {
      return ''
    }
  }, [store.website])

  const expiryText = useMemo(() => {
    if (offer.expiryDays < 0) return 'Expired'
    if (offer.expiryDays === 0) return 'Expires today'
    if (offer.expiryDays === 1) return 'Expires in 1 day'
    return `Expires in ${offer.expiryDays} days`
  }, [offer.expiryDays])

  const handleCopy = async () => {
    if (!offer.code) return

    try {
      await navigator.clipboard.writeText(offer.code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1500)
    } catch {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1500)
    }
  }

  const isCoupon = offer.type === 'coupon'

  return (
    <article className="rounded-2xl border border-line bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
      <div className="rounded-xl border border-line bg-cream/50 p-4">
        <div className="mx-auto flex h-20 w-44 items-center justify-center overflow-hidden rounded-lg border border-line bg-white">
          {!logoBroken && logoUrl ? (
            <img src={logoUrl} alt={`${store.name} logo`} className="h-full w-full object-contain p-3" onError={() => setLogoBroken(true)} />
          ) : (
            <p className="text-2xl font-bold tracking-[0.2em] text-ink">{store.logoText}</p>
          )}
        </div>

        <p className="mt-4 text-center text-xl font-bold tracking-tight text-ink">{offer.title}</p>
        <p className="mt-2 text-center text-sm text-muted">{store.name} · {store.category}</p>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="rounded-full bg-gold/20 px-3 py-1 font-semibold text-gold">{offer.badge}</span>
          <p className={`${offer.expiryDays < 0 ? 'text-rose-500' : 'text-muted'}`}>{expiryText}</p>
        </div>

        <button
          onClick={() => setShowDetailsCard((previous) => !previous)}
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-navy text-base font-semibold text-cream transition-all duration-300 hover:scale-[1.01]"
        >
          {showDetailsCard ? 'Hide Deal Details' : isCoupon ? 'Get This Coupon' : 'Get This Deal'}
        </button>
      </div>

      <div className={`grid transition-all duration-300 ${showDetailsCard ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden rounded-xl border border-line bg-cream p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink">Offer Details</p>
            <p className="text-xs font-semibold text-muted">{offer.successRate}% success</p>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted">{offer.description}</p>

          <div className="mt-4 rounded-xl border border-line bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Coupon Code</p>
            <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-line bg-cream px-3 py-2">
              <p className={`text-sm font-bold tracking-[0.12em] text-ink transition-all duration-300 ${isCodeVisible ? 'blur-0' : 'blur-sm select-none'}`}>
                {isCoupon && offer.code ? offer.code : 'NO CODE REQUIRED'}
              </p>
              {isCoupon && offer.code && (
                <button
                  onClick={handleCopy}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-300 ${isCopied ? 'bg-emerald-500 text-white' : 'bg-navy text-cream hover:bg-black'}`}
                >
                  {isCopied ? '✓ COPIED' : 'COPY'}
                </button>
              )}
            </div>

            <button
              onClick={() => setIsCodeVisible((previous) => !previous)}
              className="mt-3 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-all duration-300 hover:scale-105"
            >
              {isCodeVisible ? 'Hide Code' : 'Show Code'}
            </button>
          </div>

          <div className="mt-4 grid gap-3 rounded-xl bg-white p-3 text-xs text-muted sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Specification</p>
              <p className="mt-1 font-medium text-ink">{offer.discountValue}% offer value</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Validity</p>
              <p className="mt-1 font-medium text-ink">{expiryText}</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Terms</p>
            <p className="mt-1 text-xs leading-5 text-muted">{offer.terms}</p>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">How to Use</p>
            <ul className="mt-1 space-y-1 text-xs text-muted">
              {offer.steps.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
          </div>

          <a
            href={store.website}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-gold text-sm font-semibold text-midnight transition-all duration-300 hover:scale-[1.01]"
          >
            Get Offer on {store.name}
          </a>
        </div>
      </div>
    </article>
  )
}

export default CouponCard
