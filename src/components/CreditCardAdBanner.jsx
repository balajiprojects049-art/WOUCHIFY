import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { resolveStoreLogoUrl } from '../utils/storeLogo'

const CreditCardAdBanner = () => {
  const { creditCards } = useData()
  
  const activeShoppingCards = (creditCards.shopping || []).filter(c => c.active !== false)
  const activeLifetimeCards = (creditCards.lifetime || []).filter(c => c.active !== false)
  const cards = [...activeShoppingCards, ...activeLifetimeCards]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (cards.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [cards.length])

  if (cards.length === 0) return null

  return (
    <div className="w-full pb-10">
      {/* ── Heading for Section ── */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-gold" />
          <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">Top Featured Credit Cards</h2>
        </div>
        <Link to="/credit-cards" className="text-sm font-semibold text-gold shrink-0 pl-4 hidden sm:block">Explore All Cards</Link>
      </div>

      <div className="relative w-full rounded-[2rem] bg-[#0f172a] shadow-2xl overflow-hidden h-[460px] sm:h-[360px] border border-line/10 group">
        {cards.map((card, idx) => {
          const words = card.card.split(' ')
          const lastWord = words.length > 1 ? words.pop() : ''
          const restOfName = words.join(' ')
          
          // Smart fallback for logo
          const displayLogo = card.bankLogo || resolveStoreLogoUrl(card.bank)

          return (
            <div
              key={card.id || idx}
              className={`absolute inset-0 block transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-between gap-6 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-8 py-8 sm:flex-row sm:px-12 md:px-16">
                
                {/* Animated Background Elements */}
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${card.type === 'lifetime' ? 'bg-gold/10' : 'bg-blue-500/10'} blur-[80px] transition-all duration-700 group-hover:scale-110`} />
                <div className={`absolute -left-20 -bottom-20 h-64 w-64 rounded-full ${card.type === 'lifetime' ? 'bg-blue-500/10' : 'bg-gold/10'} blur-[80px] transition-all duration-700 group-hover:scale-110`} />
                
                <div className="relative z-10 flex-1 space-y-4 text-center sm:text-left">
                  <div className="inline-flex items-center gap-3 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-sm shadow-sm">
                    {displayLogo ? (
                      <div className="rounded border border-white/40 bg-white px-2 py-1 flex items-center justify-center shadow-inner -ml-2 bg-gradient-to-br from-white to-gray-100">
                        <img src={displayLogo} alt="bank" className="h-4 sm:h-5 w-auto max-w-[80px] object-contain drop-shadow-sm" onError={e => e.target.style.display='none'} />
                      </div>
                    ) : (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
                      </span>
                    )}
                    {card.bank}
                  </div>
                  
                  <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl line-clamp-2 leading-tight">
                    {restOfName || lastWord} <span className="bg-gradient-to-r from-gold via-amber-200 to-gold bg-clip-text text-transparent">{restOfName ? lastWord : ''}</span>
                  </h2>
                  
                  <p className="max-w-xl text-sm sm:text-base font-medium text-slate-400 line-clamp-2">
                    <span className="text-white font-bold">{card.cashback}.</span> {card.rewards}. Partners: {card.partners}.
                  </p>

                  <div className="pt-2 flex justify-center sm:justify-start">
                    <a 
                      href={card.applyUrl || '/credit-cards'}
                      target={card.applyUrl ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-2 text-xs font-black text-midnight transition-all hover:bg-white hover:scale-105 shadow-xl shadow-gold/20"
                    >
                      Apply Now →
                    </a>
                  </div>
                </div>

                <div className="relative z-10 flex shrink-0 items-center justify-center mb-6 sm:mb-0">
                  <div className="relative h-44 w-64 sm:h-48 sm:w-72 transition-transform duration-700 lg:group-hover:rotate-3 lg:group-hover:scale-110">
                    
                    {/* Render Real Card Image if uploaded */}
                    {card.cardImage && (
                      <img 
                        src={card.cardImage} 
                        alt={card.card} 
                        className="absolute inset-0 w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}

                    {/* Fallback CSS Card Layout */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10">
                      <div className="h-full w-full rounded-2xl bg-[#1e293b] p-6 flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-32" />
                        
                        <div className="flex justify-between items-start mb-6">
                          {displayLogo ? (
                             <img src={displayLogo} alt="bank" className="h-8 w-16 sm:h-8 sm:w-20 object-contain drop-shadow-md rounded bg-white p-1.5" onError={e => e.target.style.display='none'} />
                          ) : (
                             <div className="h-8 w-10 sm:h-10 sm:w-12 rounded bg-gradient-to-br from-gold/40 to-gold/10 shadow-inner" />
                          )}
                          <div className="text-gold font-bold opacity-90 italic text-xs sm:text-sm tracking-wider">WOUCHIFY</div>
                        </div>
                        <div className="space-y-1 sm:space-y-2 mt-auto">
                           <div className="text-[10px] sm:text-xs text-white/50 tracking-widest">{card.type === 'lifetime' ? 'LIFETIME FREE' : 'PREMIUM CARD'}</div>
                           <div className="text-xs sm:text-sm font-black text-white/90 uppercase tracking-widest truncate">{card.card}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {cards.map((_, idx) => (
            <button 
              key={idx} 
              onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${idx === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'}`} 
            />
          ))}
        </div>
      </div>
      <Link to="/credit-cards" className="mt-4 text-sm font-semibold text-gold block text-center sm:hidden">Explore All Cards →</Link>
    </div>
  )
}

export default CreditCardAdBanner
