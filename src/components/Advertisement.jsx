import React, { useState, useEffect } from 'react'

function Advertisement({ ad, className = '' }) {
  const [dismissed, setDismissed] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // When 'ad' prop changes, reset states so we don't accidentally hide a new ad.
  useEffect(() => {
    setDismissed(false)
    setShowFeedback(false)
  }, [ad])

  if (!ad || !ad.active || dismissed) return null

  const desktopImage = ad.image || ad.mobileImage
  const mobileImage = ad.mobileImage || ad.image

  if (!desktopImage) return null

  const handleCloseClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowFeedback(true)
  }

  const handleFeedback = (e, reason) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`Ad ${ad.id} closed. Reason: ${reason}`)
    setDismissed(true)
    setShowFeedback(false)
  }

  const cancelFeedback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowFeedback(false)
  }

  const content = (
    <>
      {/* Desktop Image */}
      <img
        src={desktopImage}
        alt={ad.title || 'Advertisement'}
        className={`hidden md:block h-auto w-full object-contain transition-all duration-300 ${showFeedback ? 'blur-md brightness-50' : ''}`}
        style={{ maxHeight: '250px' }}
      />
      {/* Mobile Image */}
      <img
        src={mobileImage}
        alt={ad.title || 'Advertisement'}
        className={`md:hidden h-auto w-full object-contain transition-all duration-300 ${showFeedback ? 'blur-md brightness-50' : ''}`}
        style={{ maxHeight: '200px' }}
      />
      
      {!showFeedback && (
        <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-black tracking-widest uppercase text-white/90 backdrop-blur-sm pointer-events-none z-10">
          Ad
        </div>
      )}

      {/* Close Button Options */}
      {!showFeedback && (
        <button 
          onClick={handleCloseClick}
          title="Close Advertisement"
          className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white/80 backdrop-blur-sm transition-all hover:bg-red-500 hover:text-white z-20 shadow-lg"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/></svg>
        </button>
      )}

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm px-2 py-2 overflow-y-auto">
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-2xl max-w-sm w-full text-center border border-gray-100 my-auto scale-95 sm:scale-100">
            <h4 className="text-sm font-black text-gray-900 mb-0.5">Stop seeing this ad?</h4>
            <p className="text-[10px] text-gray-500 mb-2.5 font-medium leading-tight">Why do you want to close this?</p>
            
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <button onClick={(e) => handleFeedback(e, 'Not interested')} className="w-full rounded-lg bg-gray-50 py-1.5 sm:py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors">Not interested in this</button>
              <button onClick={(e) => handleFeedback(e, 'Seen too often')} className="w-full rounded-lg bg-gray-50 py-1.5 sm:py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors">Seen it multiple times</button>
              <button onClick={(e) => handleFeedback(e, 'Inappropriate')} className="w-full rounded-lg bg-gray-50 py-1.5 sm:py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors">Ad was inappropriate</button>
            </div>
            
            <button onClick={cancelFeedback} className="mt-2.5 text-[11px] font-bold text-gray-400 hover:text-gray-700 underline underline-offset-2">Cancel</button>
          </div>
        </div>
      )}
    </>
  )

  const containerClasses = `group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-line ${className}`

  // If showing feedback, disable the main link wrapper so clicking anywhere doesn't redirect
  if (ad.link && !showFeedback) {
    return (
      <a 
        href={ad.link} 
        target={ad.link.startsWith('http') ? '_blank' : '_self'} 
        rel={ad.link.startsWith('http') ? 'noopener noreferrer' : ''}
        className={containerClasses + ' block transition-opacity hover:opacity-95'}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  )
}

export default Advertisement
