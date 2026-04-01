import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BannerPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-line bg-gradient-to-br from-cream via-white to-cream shadow-sm">
      <div className="flex h-56 flex-col items-center justify-center gap-3 sm:h-72 lg:h-96">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
          <svg className="h-7 w-7 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-muted">Banner will appear here</p>
        <p className="text-xs text-muted/60">Add banners from the Admin Panel → Banners</p>
      </div>
    </div>
  )
}

function ScrollingPageBanner({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!banners?.length) {
      setCurrentIndex(0)
      return
    }
    setCurrentIndex((prev) => (prev >= banners.length ? 0 : prev))
  }, [banners])

  useEffect(() => {
    if (!banners || banners.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [banners])

  // Show placeholder if no banners configured
  if (!banners || banners.length === 0) return <BannerPlaceholder />

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
      <div className="relative h-56 sm:h-72 lg:h-96">
        {banners.map((banner, index) => {
          const desktopImage = banner.image || banner.mobileImage || ''
          const mobileImage = banner.mobileImage || banner.image || ''

          return (
            <div
              key={banner.id || `${banner.title || 'banner'}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Desktop Image */}
              {desktopImage && (
                <img
                  src={desktopImage}
                  alt={banner.title || 'Banner'}
                  className="hidden md:block h-full w-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                />
              )}
              {/* Mobile Image */}
              {mobileImage && (
                <img
                  src={mobileImage}
                  alt={banner.title || 'Banner'}
                  className="md:hidden h-full w-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                />
              )}
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
        })}
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
