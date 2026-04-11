import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const bannerImageFallback = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80'

function ScrollingPageBanner({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!banners?.length) {
      setCurrentIndex(0)
      return
    }

    // Keep index in bounds when admin adds/removes/reorders banners.
    setCurrentIndex((prev) => (prev >= banners.length ? 0 : prev))
  }, [banners])

  useEffect(() => {
    if (!banners || banners.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [banners])

  if (!banners || banners.length === 0) return null

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
      <div className="relative h-56 sm:h-72 lg:h-96">
        {banners.map((banner, index) => (
          (() => {
            const desktopImage = banner.image || banner.mobileImage || bannerImageFallback
            const mobileImage = banner.mobileImage || banner.image || bannerImageFallback

            return (
          <div
            key={banner.id || `${banner.title || 'banner'}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Desktop Image */}
            <img
              src={desktopImage}
              alt={banner.title || 'Banner'}
              className="hidden md:block h-full w-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
              onError={(e) => { e.currentTarget.src = bannerImageFallback }}
            />
            {/* Mobile Image */}
            <img
              src={mobileImage}
              alt={banner.title || 'Banner'}
              className="md:hidden h-full w-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
              onError={(e) => { e.currentTarget.src = bannerImageFallback }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="max-w-xl">
                  {banner.label && (
                    <span className="inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-midnight sm:text-xs">
                      {banner.label}
                    </span>
                  )}
                  <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                    {banner.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium text-slate-200 line-clamp-1 sm:text-lg sm:line-clamp-none opacity-90">
                    {banner.description}
                  </p>
                </div>
                {banner.link && (
                  <Link
                    to={banner.link}
                    className="inline-flex items-center justify-center rounded-2xl bg-gold px-6 py-3 text-sm font-black text-midnight shadow-xl shadow-gold/20 transition-all hover:scale-105 active:scale-95 sm:px-10 sm:py-5 sm:text-base whitespace-nowrap"
                  >
                    Explore Now →
                  </Link>
                )}
              </div>
            </div>
          </div>
            )
          })()
        ))}
      </div>

      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute top-6 right-6 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={banners[i]?.id || `dot-${i}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScrollingPageBanner
