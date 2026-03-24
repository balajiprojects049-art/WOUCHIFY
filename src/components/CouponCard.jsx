import { useMemo, useState } from 'react'

function CouponCard({ store, offer }) {
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

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
    <article className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">{store.logoText}</div>
          <div>
            <p className="text-sm font-bold text-ink">{store.name}</p>
            <p className="text-xs text-muted">{store.category}</p>
          </div>
        </div>

        <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold text-gold">{offer.badge}</span>
      </div>

      <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{offer.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{offer.description}</p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <p className={`${offer.expiryDays < 0 ? 'text-rose-500' : 'text-muted'}`}>{expiryText}</p>
        <p className="font-semibold text-ink">{offer.successRate}% success</p>
      </div>

      {isCoupon && (
        <div className="mt-4 rounded-xl border border-line bg-cream p-3">
          <div className={`flex items-center justify-between rounded-lg bg-white px-3 py-2 transition-all duration-300 ${isCodeVisible ? 'opacity-100' : 'opacity-80'}`}>
            <p className={`text-sm font-bold tracking-[0.12em] text-ink transition-all duration-300 ${isCodeVisible ? 'blur-0' : 'blur-sm select-none'}`}>
              {offer.code}
            </p>
            <button onClick={handleCopy} className="rounded-lg bg-navy px-2.5 py-1.5 text-[11px] font-semibold text-white transition-all duration-300 hover:scale-105">
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setIsCodeVisible((previous) => !previous)}
          className="rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
        >
          {isCoupon ? (isCodeVisible ? 'Hide Code' : 'Show Code') : 'Get Deal'}
        </button>

        <button
          onClick={() => setShowDetails((previous) => !previous)}
          className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:scale-105"
        >
          View Details
        </button>
      </div>

      <div className={`grid transition-all duration-300 ${showDetails ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden rounded-xl bg-cream p-4">
          <p className="text-sm font-semibold text-ink">Terms & Conditions</p>
          <p className="mt-1 text-xs leading-5 text-muted">{offer.terms}</p>

          <p className="mt-3 text-sm font-semibold text-ink">Steps to Redeem</p>
          <ul className="mt-1 space-y-1 text-xs text-muted">
            {offer.steps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default CouponCard
