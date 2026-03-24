import { useEffect, useState } from 'react'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    discount: '-50%',
    label: 'Featured Drop',
    title: 'Apple Essentials Collection',
    description: 'Limited-time premium accessories at the best prices.',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    discount: '-35%',
    label: 'Trending Now',
    title: 'Sport Shoes Mega Deal',
    description: 'Top-rated performance footwear with instant discounts.',
  },
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    discount: '-40%',
    label: 'Audio Picks',
    title: 'Headphones & Audio Gear',
    description: 'Clear sound, premium comfort, and unbeatable offers.',
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    discount: '-28%',
    label: 'Editor Choice',
    title: 'Smart Watches Collection',
    description: 'Track fitness and style with curated smartwatch deals.',
  },
  {
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
    discount: '-45%',
    label: 'Camera Deals',
    title: 'Creator Camera Accessories',
    description: 'Grab lenses, tripods, and creator kits for less.',
  },
  {
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80',
    discount: '-32%',
    label: 'Work Setup',
    title: 'Desk & Office Upgrades',
    description: 'Upgrade your workspace with premium productivity gear.',
  },
]

const heroPoints = [
  'No Signup Required  Browse Deals Instantly',
  '100% Free Coupons No Hidden Charges',
  'Safe & Trusted Deals from Verified Stores',
  'Fast, Easy & Completely Free Deal Discovery',
]

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % heroSlides.length)
    }, 3500)

    return () => clearInterval(intervalId)
  }, [])

  const currentSlide = heroSlides[activeSlide]
  const mobileHighlights = heroPoints.slice(0, 3)

  return (
    <section className="pb-12 pt-4 sm:pb-20 sm:pt-8">
      <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-12">
        <div className="text-left">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:mb-5 sm:text-xs sm:tracking-[0.24em]">Smart Savings</p>
          <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            <span className="text-ink">Discover the best deals,</span>
            <br className="hidden sm:block" />
            <span className="text-gold">Coupons & Rewards</span> <span className="text-ink">in One place</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:mt-6 sm:leading-7 sm:text-base">
            <span className="font-semibold text-gold">WOUCHIFY</span>{' '}
            <span className="text-muted">
              helps users find the best online deals, loot offers, coupon codes, giveaways, and reward opportunities from top brands.
            </span>
          </p>

          <div className="mt-4 grid gap-2 sm:hidden">
            {mobileHighlights.map((point) => (
              <p key={point} className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink">
                {point}
              </p>
            ))}
          </div>

          <div className="mt-5 hidden max-w-2xl gap-2 sm:grid">
            {heroPoints.map((point) => (
              <p
                key={point}
                className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-3 py-2 text-[13px] font-semibold leading-5 text-ink shadow-sm sm:text-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="text-muted">{point}</span>
              </p>
            ))}
          </div>

          <div className="mt-6 flex max-w-2xl items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm sm:mt-9 sm:gap-3 sm:p-3">
            <input
              type="text"
              placeholder="Search products, stores or promo codes"
              className="h-12 flex-1 rounded-xl border border-line bg-cream px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
            />
            <button className="h-12 shrink-0 rounded-xl bg-navy px-3.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 sm:px-6 sm:text-sm">
              Search
            </button>
          </div>

        </div>

        <article className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-5">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-56 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-midnight sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
              {currentSlide.discount}
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/35 p-2.5 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-4 sm:p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/90 sm:text-xs">{currentSlide.label}</p>
              <button className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-midnight transition-all duration-300 hover:scale-105 sm:px-4 sm:py-2 sm:text-xs">
                Grab Deal
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default HeroSection
