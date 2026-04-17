import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '🌅' }
  if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🍔' }
  if (hour >= 17 && hour < 21) return { text: 'Good Evening', emoji: '🌇' }
  return { text: 'Good Night', emoji: '🌙' }
}

const fallbackSlides = [
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    label: '🔥 Hot Deal',
    title: 'Discover Exclusive Deals',
    description: 'Premium products at loot prices — every day.',
    link: '/deals',
  },
  {
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1200&q=80',
    label: '🎁 Rewards',
    title: 'Earn & Win Every Day',
    description: 'Spin the wheel and collect vouchers.',
    link: '/loot-deals',
  },
]

const imageFallback = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80'

const STATS = [
  { value: '50K+', label: 'Trusted Users' },
  { value: '5K+', label: 'Active Deals' },
  { value: '0', label: 'Hidden Charges' },
  { value: '100%', label: 'Verified Deals' },
]

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigate = useNavigate()
  const { banners } = useData()

  const adminBanners = (banners.home || []).filter(b => b.active !== false)
  const heroSlides = adminBanners.length > 0 ? adminBanners : fallbackSlides

  useEffect(() => { setActiveSlide(0) }, [heroSlides.length])

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const id = setInterval(() => setActiveSlide(p => (p + 1) % heroSlides.length), 4000)
    return () => clearInterval(id)
  }, [heroSlides.length])

  const currentSlide = heroSlides[Math.min(activeSlide, heroSlides.length - 1)]
  const desktopImage = currentSlide?.image || currentSlide?.mobileImage || imageFallback
  const mobileImage = currentSlide?.mobileImage || currentSlide?.image || imageFallback

  if (!currentSlide) return null

  return (
    <section className="pb-8 pt-4 sm:pb-14 sm:pt-6" aria-label="Hero">
      <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">

        {/* ── Left: Text & CTAs ── */}
        <div className="flex flex-col gap-5 text-left">
          {/* Greeting */}
          {(() => {
            const g = getGreeting()
            return (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted sm:text-base">
                  {g.emoji} {g.text}! Welcome to Wouchify
                </span>
              </div>
            )
          })()}

          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold ring-1 ring-gold/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              Live Deals Updated Daily
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            India's #1 Free<br />
            <span className="text-gold">Deal Discovery</span>{' '}
            <span className="text-ink">Platform</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-md text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Find verified <strong className="text-ink font-semibold">coupons, loot deals, giveaways</strong> & credit card rewards from 500+ top brands.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['✅ 100% Free', '🔒 No Signup', '⚡ Instant Deals'].map(t => (
              <span key={t} className="rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink shadow-sm sm:text-xs">
                {t}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary: Explore Deals */}
            <Link
              to="/deals"
              id="hero-explore-deals"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-yellow-400 px-6 py-3.5 text-sm font-black text-midnight shadow-lg shadow-gold/30 transition-all duration-300 hover:scale-105 hover:shadow-gold/50 sm:text-base"
            >
              🔥 Explore Deals
            </Link>

            {/* Mini stats (Replaced Social Links) */}
            <div className="flex items-center justify-between gap-2 pt-2 sm:gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-black text-ink sm:text-xl">{s.value}</p>
                  <p className="text-[10px] font-semibold text-muted sm:text-xs whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Banner Slider ── */}
        <article className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={desktopImage}
              alt={currentSlide.title}
              className="hidden md:block h-80 w-full rounded-xl object-cover transition-all duration-500 lg:h-[420px]"
              onError={(e) => { e.currentTarget.src = imageFallback }}
            />
            <img
              src={mobileImage}
              alt={currentSlide.title}
              className="md:hidden h-64 w-full rounded-xl object-cover transition-all duration-500 sm:h-72"
              onError={(e) => { e.currentTarget.src = imageFallback }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent rounded-xl" />

            {currentSlide.label && (
              <div className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-black text-midnight shadow sm:left-4 sm:top-4 sm:text-xs">
                {currentSlide.label}
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/40 p-3 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-4">
              <div className="min-w-0 mr-3">
                <p className="truncate text-xs font-bold text-white sm:text-sm">{currentSlide.title}</p>
                {currentSlide.description && (
                  <p className="mt-0.5 truncate text-[10px] text-white/70 hidden sm:block">{currentSlide.description}</p>
                )}
              </div>
              <button
                onClick={() => navigate(currentSlide.link || '/deals')}
                className="shrink-0 rounded-xl bg-gold px-4 py-2 text-[11px] font-black text-midnight transition-all duration-300 hover:scale-105 sm:text-xs"
              >
                Grab Deal
              </button>
            </div>
          </div>

          {heroSlides.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-7 bg-gold' : 'w-2 bg-line'}`}
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
