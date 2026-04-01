import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

function FeaturedDealSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigate = useNavigate()
  const { banners } = useData()

  // Only show admin-configured banners — no hardcoded fallbacks
  const featuredSlides = (banners.home || [])
    .filter(b => b.active !== false)
    .map(b => ({
      title: b.title,
      description: b.description,
      image: b.image,
      primaryCta: 'Shop Now',
      secondaryCta: 'View Collection',
      link: b.link || '/deals',
    }))

  useEffect(() => {
    setActiveSlide(0)
  }, [featuredSlides.length])

  useEffect(() => {
    if (featuredSlides.length <= 1) return
    const intervalId = setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % featuredSlides.length)
    }, 4000)
    return () => clearInterval(intervalId)
  }, [featuredSlides.length])

  if (!featuredSlides.length) {
    return (
      <section className="mt-8 sm:mt-10">
        <div className="grid items-center gap-6 rounded-2xl bg-white p-4 shadow-sm sm:gap-8 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-cream px-3 py-1 text-xs font-semibold text-muted">Featured Deal</p>
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-4xl">Your featured deal will appear here</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted sm:mt-5">
              Add a home banner from Admin Panel → Banners → Home to feature it here.
            </p>
          </div>
          <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-cream sm:h-80">
            <svg className="h-8 w-8 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-semibold text-muted">Banner image will appear here</p>
          </div>
        </div>
      </section>
    )
  }

  const currentSlide = featuredSlides[Math.min(activeSlide, featuredSlides.length - 1)]
  if (!currentSlide) return null

  return (
    <section className="mt-8 sm:mt-10">
      <div className="grid items-center gap-6 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 sm:gap-8 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-cream px-3 py-1 text-xs font-semibold text-muted">Featured Deal</p>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-4xl">{currentSlide.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted sm:mt-5 sm:leading-7 sm:text-base">
            {currentSlide.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
            <button
              onClick={() => navigate(currentSlide.link || '/stores')}
              className="rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105 sm:px-5 sm:py-3"
            >
              {currentSlide.primaryCta}
            </button>
            <button
              onClick={() => navigate(currentSlide.link || '/stores')}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:scale-105 sm:px-5 sm:py-3"
            >
              {currentSlide.secondaryCta}
            </button>
          </div>

          {featuredSlides.length > 1 && (
            <div className="mt-5 flex items-center gap-2">
              {featuredSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Featured slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-gold' : 'w-3 bg-line'}`}
                />
              ))}
              <p className="ml-2 text-xs font-semibold text-muted">{activeSlide + 1}/{featuredSlides.length}</p>
            </div>
          )}
        </div>

        {currentSlide.image && (
          <div className="overflow-hidden rounded-2xl">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-60 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedDealSection
