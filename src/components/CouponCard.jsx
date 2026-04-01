import { useMemo, useState } from 'react'
import { resolveStoreLogoUrl } from '../utils/storeLogo'

function CouponCard({ store, offer }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [showDetailsCard, setShowDetailsCard] = useState(false)
  const [logoBroken, setLogoBroken] = useState(false)

  const logoUrl = useMemo(() => resolveStoreLogoUrl(store), [store])

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
  const couponCode = isCoupon && offer.code ? offer.code : 'NO CODE REQUIRED'

  return (
    <article className="[perspective:1200px]">
      <div className={`relative h-[420px] transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <div className="absolute inset-0 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] [backface-visibility:hidden]">
          <div className="h-full rounded-xl border border-line bg-cream/50 p-3 flex flex-col">
            <div className="mx-auto flex h-14 w-32 items-center justify-center overflow-hidden rounded-lg border border-line bg-white">
              {!logoBroken && logoUrl ? (
                <img loading="lazy" src={logoUrl} alt={`${store.name} logo`} className="h-full w-full object-contain p-2" onError={() => setLogoBroken(true)} />
              ) : (
                <p className="text-xl font-bold tracking-[0.2em] text-ink">{store.logoText}</p>
              )}
            </div>

            <p className="mt-3 text-center text-lg font-bold tracking-tight text-ink line-clamp-2 min-h-[56px]">{offer.title}</p>
            <p className="mt-2 text-center text-sm text-muted">{store.name} · {store.category}</p>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-gold/20 px-3 py-1 font-semibold text-gold">{offer.badge}</span>
              <p className={`${offer.expiryDays < 0 ? 'text-rose-500' : 'text-muted'}`}>{expiryText}</p>
            </div>

            <div className="mt-3 rounded-xl border border-line bg-white/80 p-3">
              <p className="text-xs leading-5 text-muted line-clamp-3">{offer.description}</p>
              <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
                  {offer.successRate}% success
                </span>
                <span className="rounded-full bg-navy/10 px-2.5 py-1 font-semibold text-navy">
                  {offer.discountValue}% value
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl bg-gold px-3 text-sm font-bold text-midnight transition-all duration-300 hover:brightness-95"
            >
              {isCoupon ? 'Get This Coupon' : 'Get This Deal'}
            </button>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="h-full rounded-xl border border-line bg-gradient-to-b from-cream to-white p-3 flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Coupon Vault</p>
              <p className="text-[11px] font-semibold text-muted">{offer.successRate}% success</p>
            </div>

            <div className="mt-3 rounded-xl border border-line bg-white p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Code</p>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-line bg-cream px-3 py-2">
                <p className="text-sm font-bold tracking-[0.12em] text-ink">{couponCode}</p>
                {isCoupon && offer.code && (
                  <button
                    onClick={handleCopy}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-300 ${isCopied ? 'bg-emerald-500 text-white' : 'bg-navy text-cream hover:bg-black'}`}
                  >
                    {isCopied ? 'COPIED' : 'COPY'}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-white p-3 text-xs text-muted">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Discount</p>
                <p className="mt-1 font-medium text-ink">{offer.discountValue}%</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Validity</p>
                <p className="mt-1 font-medium text-ink">{expiryText}</p>
              </div>
            </div>

            <button
              onClick={() => setShowDetailsCard((previous) => !previous)}
              className="mt-3 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:bg-cream"
            >
              {showDetailsCard ? 'Hide Details' : 'View Details'}
            </button>

            {showDetailsCard && (
              <div className="mt-2 rounded-xl border border-line bg-white p-3 text-xs text-muted overflow-auto max-h-[120px]">
                <p className="leading-5">{offer.description}</p>
                <p className="mt-2 font-semibold text-ink">Terms</p>
                <p className="mt-1 leading-5">{offer.terms}</p>
              </div>
            )}

            <div className="mt-auto grid grid-cols-2 gap-2">
              <button
                onClick={() => { setIsFlipped(false); setShowDetailsCard(false) }}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-line bg-white text-xs font-semibold text-ink transition-all duration-300 hover:bg-cream"
              >
                Back
              </button>
              <a
                href={store.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-gold text-xs font-bold text-midnight transition-all duration-300 hover:brightness-95"
              >
                Visit Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CouponCard
