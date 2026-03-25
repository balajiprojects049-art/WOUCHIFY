import { useState } from 'react'
import { useData } from '../context/DataContext'

function CouponsSection() {
  const { coupons } = useData()
  const [copiedCode, setCopiedCode] = useState('')

  // Show top 4 active coupons
  const activeCoupons = coupons.filter(c => c.active !== false).slice(0, 4)

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => {
        setCopiedCode('')
      }, 1500)
    } catch {
      setCopiedCode(code)
      setTimeout(() => {
        setCopiedCode('')
      }, 1500)
    }
  }

  if (activeCoupons.length === 0) return null

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Coupons</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Coupon Codes You Can Use Now</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activeCoupons.map((coupon) => (
          <article
            key={coupon.id || coupon.code}
            className="group relative rounded-2xl border border-dashed border-line bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 p-2 font-bold text-gold">
                {(coupon.store || '').charAt(0).toUpperCase()}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{coupon.expiry}</p>
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gold">{coupon.store}</p>
            <p className="mt-1 h-10 text-sm font-semibold leading-5 text-ink line-clamp-2">{coupon.discount}</p>

            <div className="mt-5 flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-line bg-cream p-1">
              <span className="px-3 text-xs font-bold tracking-[0.14em] text-ink">{coupon.code}</span>
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className={`rounded-lg px-4 py-2 text-[11px] font-bold transition-all duration-300 ${
                  copiedCode === coupon.code
                    ? 'bg-emerald-500 text-white'
                    : 'bg-navy text-cream hover:bg-black'
                }`}
              >
                {copiedCode === coupon.code ? '✓ COPIED' : 'COPY'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CouponsSection
