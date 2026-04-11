import { useState } from 'react'

/**
 * ShareButton — uses Web Share API on mobile, falls back to clipboard on desktop.
 * Props:
 *   title    — share title (deal/coupon name)
 *   text     — share description
 *   url      — URL to share (defaults to current page if omitted)
 *   variant  — 'icon' | 'pill' (default: 'icon')
 *   className — extra classes
 */
function ShareButton({ title = 'Check this out!', text = '', url, variant = 'icon', className = '' }) {
  const [state, setState] = useState('idle') // idle | copied | shared

  const shareUrl = url || window.location.href

  const handleShare = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Try native Web Share API (works on mobile and some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
        setState('shared')
        setTimeout(() => setState('idle'), 2000)
      } catch {
        // User cancelled — do nothing
      }
      return
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      // Last resort: prompt
      window.prompt('Copy link:', shareUrl)
    }
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={handleShare}
        title="Share"
        className={`flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-muted transition-all duration-200 hover:border-gold hover:text-gold hover:shadow-sm active:scale-95 ${className}`}
      >
        {state === 'copied' ? (
          <>
            <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-600">Link Copied!</span>
          </>
        ) : state === 'shared' ? (
          <>
            <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-600">Shared!</span>
          </>
        ) : (
          <>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </>
        )}
      </button>
    )
  }

  // Default: icon only
  return (
    <button
      onClick={handleShare}
      title={state === 'copied' ? 'Link copied!' : state === 'shared' ? 'Shared!' : 'Share this deal'}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-muted transition-all duration-200 hover:border-gold hover:text-gold hover:shadow-md active:scale-95 ${className}`}
    >
      {state === 'copied' || state === 'shared' ? (
        <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )}
    </button>
  )
}

export default ShareButton
