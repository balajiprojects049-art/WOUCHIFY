import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import LootDealCard from '../components/LootDealCard'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

function LootDealDetail() {
  const { lootDealId } = useParams()
  const { lootDeals, getStoreBySlug, trackDealClick } = useData()
  const deal = lootDeals.find(d => d.slug === (lootDealId || '').toLowerCase() || d.id === lootDealId)

  useEffect(() => {
    if (deal) trackDealClick(deal.slug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal?.slug])
  
  const [nowMs, setNowMs] = useState(Date.now())
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const displayImages = Array.isArray(deal?.images) && deal.images.length > 0 ? deal.images : (deal?.image ? [deal.image] : [])

  // Auto-slide effect
  useEffect(() => {
    if (displayImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev === displayImages.length - 1 ? 0 : prev + 1))
    }, 3500)
    return () => clearInterval(timer)
  }, [displayImages.length])

  const handleShare = async () => {
    const shareData = {
      title: deal.title,
      text: deal.description,
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  const handleCopy = () => {
    if (!deal.code) return
    navigator.clipboard.writeText(deal.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const relatedDeals = lootDeals
    .filter((item) => deal && item.id !== deal.id && item.category === deal.category)
    .slice(0, 4)

  useEffect(() => {
    const timerId = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(timerId)
  }, [])

  if (!deal) return <Navigate to="/loot-deals" replace />

  const remainingSeconds = getDealRemainingSeconds(deal, nowMs)
  const storeSlug = deal.store ? deal.store.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
  const storeData = getStoreBySlug(storeSlug)
  const storePath = storeData ? `/store/${storeData.slug}` : '/stores'

  const days = remainingSeconds ? Math.floor(remainingSeconds / 86400) : 0
  const hours = remainingSeconds ? Math.floor((remainingSeconds % 86400) / 3600) : 0
  const mins = remainingSeconds ? Math.floor((remainingSeconds % 3600) / 60) : 0
  const secs = remainingSeconds ? Math.floor(remainingSeconds % 60) : 0
  const isExpired = remainingSeconds !== null && remainingSeconds <= 0
  const isEvergreen = remainingSeconds === null

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 flex items-center gap-2 text-[11px] sm:text-xs text-muted">
        <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        <svg className="h-3 w-3 text-line" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        <Link to="/loot-deals" className="hover:text-ink transition-colors">Loot Deals</Link>
        <svg className="h-3 w-3 text-line" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        <span className="text-ink font-medium truncate max-w-[200px]">{deal.category || 'Offers'}</span>
      </nav>

      {/* Main 2-Column E-commerce Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Left Column: Sticky Product Image Showcase */}
        <div className="lg:w-[45%] xl:w-[40%] flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-line/20 p-6 flex flex-col items-center">
            
            {/* Quick Actions (Share/Save) - Top Right Corner */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button 
                onClick={handleShare}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-surface/80 hover:bg-surface border border-line/50 text-muted hover:text-ink transition-colors shadow-sm backdrop-blur"
                title="Share this deal"
              >
                {shareCopied ? (
                  <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                )}
              </button>
              <button 
                onClick={() => setSaved(!saved)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-surface/80 hover:bg-surface border border-line/50 text-muted hover:text-red-500 transition-colors shadow-sm backdrop-blur"
                title="Save for later"
              >
                <svg className="h-5 w-5" fill={saved ? "#EF4444" : "none"} stroke={saved ? "#EF4444" : "currentColor"} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>

            {/* Badges - Top Left Corner */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {deal.discountPercent && (
                <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                  {deal.discountPercent}% OFF
                </span>
              )}
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                Loot Verified
              </span>
            </div>

            {/* Main Image Carousel Area */}
            <div className="w-full aspect-square flex items-center justify-center overflow-hidden bg-white mt-4 relative group">
              <div 
                className="w-full h-full flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {displayImages.map((imgUrl, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center p-2">
                    <img
                      src={imgUrl}
                      alt={`${deal.title} - Image ${idx + 1}`}
                      className="max-h-full max-w-full object-contain cursor-crosshair transition-transform duration-300 hover:scale-105"
                      onError={e => e.target.style.display = 'none'}
                    />
                  </div>
                ))}
              </div>

              {/* Slider Arrows (Hidden if only 1 image) */}
              {displayImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex(p => (p === 0 ? displayImages.length - 1 : p - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md text-ink opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex(p => (p === displayImages.length - 1 ? 0 : p + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md text-ink opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
              
              {/* Slider Dots */}
              {displayImages.length > 1 && (
                <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1.5 z-10">
                  {displayImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-ink' : 'w-1.5 bg-ink/30'}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Trust Signals Under Image */}
            <div className="mt-8 pt-6 border-t border-line/20 w-full flex items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-[11px] font-bold text-ink">Verified Loot</span>
                <span className="text-[9px] text-muted">Checked Today</span>
              </div>
              <div className="w-px h-10 bg-line/30"></div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                </div>
                <span className="text-[11px] font-bold text-ink">{deal.successRate || 95}% Success</span>
                <span className="text-[9px] text-muted">{deal.grabbed || '100+'} Grabbed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content & Conversion Area */}
        <div className="flex-1 lg:py-4">
          
          {/* Store Logo & Link */}
          <Link to={storePath} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors mb-3">
            <span>{deal.store}</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </Link>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight leading-[1.2] mb-3">
            {deal.title}
          </h1>

          {/* Rating & Reviews (Social Proof) */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-line/30">
            {deal.rating && (
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-orange-500">{deal.rating}</span>
                <div className="flex items-center text-orange-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
              </div>
            )}
            {deal.reviews && (
              <>
                <span className="text-line">|</span>
                <a href="#reviews" className="text-sm font-medium text-blue-600 hover:underline">{deal.reviews} Ratings</a>
              </>
            )}
            {deal.grabbed && (
              <>
                <span className="text-line">|</span>
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  {deal.grabbed} claimed this
                </span>
              </>
            )}
          </div>

          {/* Urgency / Timer Banner (Amazon Style) */}
          {!isEvergreen && !isExpired && (
            <div className="mb-6 rounded-lg overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white flex items-center justify-between px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-bold uppercase tracking-wider">{deal.urgency || "Loot Ends In"}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-lg font-black tracking-tight">
                {days > 0 && <span>{days}d :</span>}
                <span>{hours.toString().padStart(2, '0')}h :</span>
                <span>{mins.toString().padStart(2, '0')}m :</span>
                <span>{secs.toString().padStart(2, '0')}s</span>
              </div>
            </div>
          )}
          {isExpired && (
            <div className="mb-6 rounded-lg overflow-hidden bg-surface text-muted flex items-center px-4 py-3 border border-line shadow-sm">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm font-bold uppercase tracking-wider">This deal has expired.</span>
            </div>
          )}

          {/* Amazon-Style Pricing Block */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-1">
              {deal.discountPercent && (
                <span className="text-3xl font-light text-red-600">-{deal.discountPercent}%</span>
              )}
              <span className="text-4xl font-black text-ink">{deal.price || deal.newPrice}</span>
            </div>
            {deal.oldPrice && (
              <div className="text-sm text-muted font-medium mb-1">
                M.R.P.: <span className="line-through">{deal.oldPrice}</span>
              </div>
            )}
            <div className="text-sm text-ink mb-3">Inclusive of all taxes</div>

            {deal.isFreeShipping && (
              <div className="flex items-center gap-2 text-sm font-bold text-ink mt-2">
                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                FREE Delivery <span className="font-normal text-muted">on this item</span>
              </div>
            )}
          </div>

          {/* Promo Code Block */}
          {deal.code && (
            <div className="mb-6 rounded-xl border border-gold/40 bg-gradient-to-r from-gold/10 to-gold/5 p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                Available Offer
              </h4>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-ink mb-1">Use promo code at checkout:</div>
                  <div className="text-xl font-black font-mono tracking-widest text-midnight bg-white inline-block px-3 py-1 rounded border border-line/50 border-dashed">
                    {deal.code}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-emerald-600 text-white shadow' : 'bg-midnight text-white hover:bg-midnight/90 shadow'}`}
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          )}

          {/* Call to Action Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={deal.link || deal.url || '#'}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-black text-white shadow-lg transition-all ${isExpired ? 'bg-muted cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-xl hover:-translate-y-0.5'}`}
            >
              {isExpired ? 'Deal Expired' : 'Grab Deal Now'}
              {!isExpired && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            </a>
          </div>

          {/* About this item (Highlights) */}
          <div className="pt-6 border-t border-line/30">
            <h3 className="text-base font-bold text-ink mb-4">About this deal</h3>
            
            <p className="text-sm text-ink/90 leading-relaxed mb-5">
              {deal.description}
            </p>

            {Array.isArray(deal.highlights) && deal.highlights.length > 0 && (
              <ul className="space-y-2 mb-6">
                {deal.highlights.map(point => (
                  <li key={point} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {Array.isArray(deal.steps) && deal.steps.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-ink mb-3">How to Redeem:</h4>
                <ol className="space-y-3 list-decimal list-inside text-sm text-ink/80">
                  {deal.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {Array.isArray(deal.specifications) && deal.specifications.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-ink mb-3">Product Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {deal.specifications.map(spec => {
                    const [key, ...rest] = spec.split(':');
                    const val = rest.join(':').trim();
                    if (!val) {
                      return (
                        <div key={spec} className="flex items-start gap-2 text-sm text-ink/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-1.5 shrink-0"></span>
                          <span className="leading-relaxed">{spec}</span>
                        </div>
                      )
                    }
                    return (
                      <div key={spec} className="flex border-b border-line/10 pb-1.5">
                        <span className="w-1/3 text-xs font-bold text-ink/70">{key.trim()}</span>
                        <span className="w-2/3 text-sm text-ink/90">{val}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Terms & Conditions Accordion (Simple) */}
          <div className="mt-4 pt-6 border-t border-line/30">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-ink text-sm">
                Terms & Conditions
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-sm text-muted mt-3 leading-relaxed border-l-2 border-red-500 pl-3">
                {deal.terms || 'Standard terms and conditions apply. Offer subject to change without prior notice. Verify at merchant site.'}
              </p>
            </details>
          </div>

        </div>
      </div>

      {/* Related Picks Section */}
      {relatedDeals.length > 0 && (
        <section className="mt-16 pt-10 border-t border-line/20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Don't Miss</p>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">Related Loot Deals</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedDeals.map((item) => (
              <LootDealCard key={item.id} deal={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default LootDealDetail
