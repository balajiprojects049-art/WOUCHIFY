import React from 'react'

const CreditCardAdBanner = () => {
  return (
    <div className="w-full py-8">
      <a 
        href="https://www.idfcfirstbank.com/personal-banking/ad-landing-page/credit-card/select-credit-card?cc_code=IDFC001" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-1 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-gold/20"
      >
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0f172a]/90 px-8 py-10 sm:flex-row sm:py-12 md:px-16">
          {/* Animated Background Elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/5 blur-[80px] transition-all duration-700 group-hover:bg-gold/10" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] transition-all duration-700 group-hover:bg-blue-500/10" />
          
          <div className="relative z-10 flex-1 space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
              </span>
              Featured Offer
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Elevate Your <span className="bg-gradient-to-r from-gold via-amber-200 to-gold bg-clip-text text-transparent">Lifestyle</span>
            </h2>
            
            <p className="max-w-xl text-lg font-medium text-slate-400">
              Get 10X reward points on every spend and premium airport lounge access with IDFC FIRST Bank Credit Cards.
            </p>
          </div>

          <div className="relative z-10 flex shrink-0 items-center justify-center">
            <div className="relative h-48 w-72 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110">
              {/* CSS Powered Credit Card Visual */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-[1px] shadow-2xl">
                <div className="h-full w-full rounded-2xl bg-[#1e293b] p-6">
                  <div className="flex justify-between items-start mb-10">
                    <div className="h-10 w-12 rounded bg-gradient-to-br from-gold/40 to-gold/10" />
                    <div className="text-gold font-bold opacity-80 italic">WOUCHIFY</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-3/4 rounded bg-slate-700/50" />
                    <div className="flex items-end justify-between">
                      <div className="h-2 w-1/2 rounded bg-slate-700/50" />
                      <div className="h-6 w-10 rounded border border-white/10 bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default CreditCardAdBanner
