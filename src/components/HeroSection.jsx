import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigate = useNavigate()
  const { banners } = useData()

  // Only show admin-configured banners — no hardcoded fallbacks
  const heroSlides = (banners.home || []).filter(b => b.active !== false)

  useEffect(() => {
    setActiveSlide(0)
  }, [heroSlides.length])

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const intervalId = setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % heroSlides.length)
    }, 3500)
    return () => clearInterval(intervalId)
  }, [heroSlides.length])

  if (!heroSlides.length) {
    return (
      <section className="pb-12 pt-4 sm:pb-20 sm:pt-8">
        <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-12">
          <div className="text-left">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:mb-5 sm:text-xs sm:tracking-[0.24em]">Smart Savings</p>
            <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              <span className="text-ink">Discover the best deals,</span>
              <br className="hidden sm:block" />
              <span className="text-gold">Coupons &amp; Rewards</span> <span className="text-ink">in One place</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:mt-6 sm:leading-7 sm:text-base">
              <span className="font-semibold text-gold">WOUCHIFY</span>{' '}
              <span className="text-muted">helps users find the best online deals, loot offers, coupon codes, giveaways, and reward opportunities from top brands.</span>
            </p>
          </div>
          <article className="rounded-2xl border-2 border-dashed border-line bg-gradient-to-br from-cream via-white to-cream p-3 shadow-sm sm:p-5">
            <div className="flex h-56 flex-col items-center justify-center gap-3 rounded-2xl sm:h-80">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                <svg className="h-7 w-7 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-muted">Banner will appear here</p>
              <p className="text-xs text-muted/60">Add from Admin Panel → Banners → Home</p>
            </div>
          </article>
        </div>
      </section>
    )
  }

  const currentSlide = heroSlides[Math.min(activeSlide, heroSlides.length - 1)]
  if (!currentSlide) return null

  const desktopImage = currentSlide.image || currentSlide.mobileImage || ''
  const mobileImage = currentSlide.mobileImage || currentSlide.image || ''

  return (
    <section className="pb-12 pt-4 sm:pb-20 sm:pt-8">
      <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-12">
        <div className="text-left">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:mb-5 sm:text-xs sm:tracking-[0.24em]">Smart Savings</p>
          <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            <span className="text-ink">Discover the best deals,</span>
            <br className="hidden sm:block" />
            <span className="text-gold">Coupons &amp; Rewards</span> <span className="text-ink">in One place</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:mt-6 sm:leading-7 sm:text-base">
            <span className="font-semibold text-gold">WOUCHIFY</span>{' '}
            <span className="text-muted">
              helps users find the best online deals, loot offers, coupon codes, giveaways, and reward opportunities from top brands.
            </span>
          </p>
        </div>

        <article className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-5">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Desktop Image */}
            <img
              src={desktopImage}
              alt={currentSlide.title}
              className="hidden md:block h-56 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
            />
            {/* Mobile Image */}
            <img
              src={mobileImage}
              alt={currentSlide.title}
              className="md:hidden h-56 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {currentSlide.label && (
              <div className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-midnight sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                {currentSlide.label}
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/35 p-2.5 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-4 sm:p-3">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/90 sm:text-xs truncate">
                  {currentSlide.title}
                </p>
                {currentSlide.description && (
                  <p className="text-[9px] text-white/70 mt-0.5 truncate hidden sm:block">{currentSlide.description}</p>
                )}
              </div>
              <button
                onClick={() => navigate(currentSlide.link || '/deals')}
                className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-ink transition-all duration-300 hover:scale-105 sm:px-4 sm:py-2 sm:text-xs shrink-0"
              >
                Grab Deal
              </button>
            </div>
          </div>

          {/* Slide indicators */}
          {heroSlides.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-gold' : 'w-2 bg-line'}`}
                />
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  )
}

export default HeroSection
