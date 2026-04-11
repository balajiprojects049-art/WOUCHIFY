import React from 'react'

const TICKER_ITEMS = [
  "⚡ 100% VERIFIED DEALS & COUPONS",
  "🔥 INDIA'S FASTEST GROWING DEAL COMMUNITY",
  "🛡️ NO SIGNUP REQUIRED – GRAB AND GO!",
  "💰 SAVE UP TO 90% ON TOP BRAND STORES",
  "🎁 DAILY LOOT DEALS ADDED EVERY HOUR",
  "✨ HANDPICKED EXCLUSIVE GIVEAWAYS & VOUCHERS",
  "🚀 EXPERIENCE PREMIUM SAVINGS FOR FREE",
]

export default function NewsTickerSection() {
  return (
    <div className="w-full bg-midnight py-3 overflow-hidden border-y border-gold/20 select-none">
      <div className="flex whitespace-nowrap animate-ticker group">
        {/* First set of items */}
        <div className="flex shrink-0 items-center justify-around gap-12 px-6">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="text-[11px] font-black tracking-[0.15em] text-gold uppercase flex items-center gap-2">
              {item}
            </span>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex shrink-0 items-center justify-around gap-12 px-6" aria-hidden="true">
          {TICKER_ITEMS.map((item, i) => (
            <span key={`dup-${i}`} className="text-[11px] font-black tracking-[0.15em] text-gold uppercase flex items-center gap-2">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  )
}
