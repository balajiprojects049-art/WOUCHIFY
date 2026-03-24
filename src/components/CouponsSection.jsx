import { useState } from 'react'

const coupons = [
  { code: 'SAVE100', store: 'Amazon', benefit: '₹100 Off on electronics', expiry: 'Ends Tonight' },
  { code: 'FASHION25', store: 'Myntra', benefit: 'Flat 25% Off on fashion', expiry: '2 Days Left' },
  { code: 'FOOD40', store: 'Swiggy', benefit: 'Up to 40% Off on orders', expiry: 'Limited Time' },
  { code: 'TRAVEL15', store: 'MakeMyTrip', benefit: '15% Off on hotels', expiry: 'Weekend Deal' },
]

function CouponsSection() {
  const [copiedCode, setCopiedCode] = useState('')

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

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Coupons</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Coupon Codes You Can Use Now</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {coupons.map((coupon) => (
          <article
            key={coupon.code}
            className="rounded-2xl border border-dashed border-line bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{coupon.store}</p>
              <p className="text-xs font-medium text-muted">{coupon.expiry}</p>
            </div>

            <p className="mt-3 text-sm text-muted">{coupon.benefit}</p>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-cream px-3 py-2">
              <p className="text-sm font-bold tracking-[0.12em] text-ink">{coupon.code}</p>
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                {copiedCode === coupon.code ? 'Copied' : 'Copy Code'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CouponsSection
