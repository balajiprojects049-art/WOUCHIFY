import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const fallbackSlides = [
  {
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    label: 'Featured Drop',
    title: 'Apple Essentials Collection',
    description: 'Limited-time premium accessories at the best prices.',
    link: '/deals',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    label: 'Trending Now',
    title: 'Sport Shoes Mega Deal',
    description: 'Top-rated performance footwear with instant discounts.',
    link: '/deals',
  },
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    label: 'Audio Picks',
    title: 'Headphones & Audio Gear',
    description: 'Clear sound, premium comfort, and unbeatable offers.',
    link: '/deals',
  },
]

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigate = useNavigate()
  const { banners } = useData()

  // Use admin home banners if available, otherwise use fallbacks
  const adminBanners = (banners.home || []).filter(b => b.active !== false)
  const heroSlides = adminBanners.length > 0 ? adminBanners : fallbackSlides

  useEffect(() => {
    setActiveSlide(0) // reset when slides change
  }, [heroSlides.length])

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const intervalId = setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % heroSlides.length)
    }, 3500)

    return () => clearInterval(intervalId)
  }, [heroSlides.length])

  const currentSlide = heroSlides[Math.min(activeSlide, heroSlides.length - 1)]

  if (!currentSlide) return null

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
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-56 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
              onError={e => e.target.style.display='none'}
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'w-6 bg-gold' : 'w-2 bg-line'
                  }`}
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
