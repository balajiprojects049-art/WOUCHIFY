import { useEffect, useState } from 'react'

const featuredSlides = [
  {
    title: 'Exclusive 50% Off Apple Accessories',
    description: 'Grab curated accessories with limited-time pricing. Includes chargers, watch straps and premium desk kits.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Shop Now',
    secondaryCta: 'View Collection',
  },
  {
    title: 'Up to 40% Off Premium Audio Gear',
    description: 'Save on headphones, speakers, and studio essentials from trusted brands with verified offers.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Get Audio Deal',
    secondaryCta: 'See Top Brands',
  },
  {
    title: 'Designer Watch Deals Starting at 30% Off',
    description: 'Explore premium watch styles with limited coupons and daily drops from curated stores.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Shop Watches',
    secondaryCta: 'View Offers',
  },
  {
    title: 'Home Office Essentials Mega Sale',
    description: 'Upgrade your setup with ergonomic desks, chairs, and productivity tools at special prices.',
    image: 'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Upgrade Setup',
    secondaryCta: 'Browse Picks',
  },
  {
    title: 'Top Camera & Creator Kits at Best Prices',
    description: 'Find cameras, tripods, and content creation accessories with instant coupons.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Explore Cameras',
    secondaryCta: 'See Creator Gear',
  },
  {
    title: 'Gaming Must-Haves with Exclusive Discounts',
    description: 'Get gaming mice, keyboards, and accessories with high-value promo deals.',
    image: 'https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?auto=format&fit=crop&w=1200&q=80',
    primaryCta: 'Grab Gaming Deal',
    secondaryCta: 'View All Gaming',
  },
]

function FeaturedDealSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % featuredSlides.length)
    }, 4000)

    return () => clearInterval(intervalId)
  }, [])

  const currentSlide = featuredSlides[activeSlide]

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
            <button className="rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 sm:px-5 sm:py-3">{currentSlide.primaryCta}</button>
            <button className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:scale-105 sm:px-5 sm:py-3">{currentSlide.secondaryCta}</button>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {featuredSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Featured slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'w-6 bg-navy' : 'w-3 bg-slate-300'
                }`}
              />
            ))}
            <p className="ml-2 text-xs font-semibold text-muted">{activeSlide + 1}/{featuredSlides.length}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="h-60 w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105 sm:h-80"
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedDealSection
