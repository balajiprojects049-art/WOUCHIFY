import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const fallbackSlides = [
  {
    title: 'Exclusive 50% Off Apple Accessories',
    description: 'Grab curated accessories with limited-time pricing. Includes chargers, watch straps and premium desk kits.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Shop Now',
    secondaryCta: 'View Collection',
    link: '/deals',
  },
]

const imageFallback = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'

function FeaturedDealSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigate = useNavigate()
  const { banners } = useData()

  // Use admin home banners or fallback slides
  const adminBanners = (banners.home || []).filter(b => b.active !== false)
  const featuredSlides = adminBanners.length > 0
    ? adminBanners.map(b => ({
      title: b.title,
      description: b.description,
      image: b.image,
      primaryCta: 'Shop Now',
      secondaryCta: 'View Collection',
      link: b.link || '/deals',
    }))
    : fallbackSlides

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

  const currentSlide = featuredSlides[Math.min(activeSlide, featuredSlides.length - 1)]
  const cardImage = currentSlide?.image || imageFallback
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

          <div className="mt-5 flex items-center gap-2">
            {featuredSlides.map((slide, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Featured slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-gold' : 'w-3 bg-line'
                  }`}
              />
            ))}
            <p className="ml-2 text-xs font-semibold text-muted">{activeSlide + 1}/{featuredSlides.length}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src={cardImage}
            alt={currentSlide.title}
            className="h-60 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
            onError={(e) => { e.currentTarget.src = imageFallback }}
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedDealSection
