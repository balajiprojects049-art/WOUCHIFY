import React, { useState, useMemo, useEffect } from 'react';
import { resolveStoreLogoUrl } from '../utils/storeLogo';
import { useData } from '../context/DataContext';
import { Scissors, Copy, CheckCircle2, Tag, ChevronRight, ExternalLink } from 'lucide-react';

function getDynamicExpiry(expiryString, createdAtStr) {
  if (!createdAtStr || !expiryString) return expiryString;
  
  const match = expiryString.match(/(\d+)\s*days?/i);
  if (!match) return expiryString;

  const originalDays = parseInt(match[1], 10);
  const createdWhen = new Date(createdAtStr);
  const now = new Date();
  const elapsedDays = Math.floor((now - createdWhen) / (1000 * 60 * 60 * 24));
  
  const remainingDays = originalDays - elapsedDays;
  if (remainingDays < 0) return 'Expired';
  if (remainingDays === 0) return 'Expires today';
  if (remainingDays === 1) return 'Expires in 1 day';
  return expiryString.replace(match[0], `${remainingDays} days`);
}

export default function PromoCouponCard({ offer, store, onReveal }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { trackCouponCopy } = useData();

  const logoUrl = useMemo(() => resolveStoreLogoUrl(store), [store]);

  const dynamicExpiryText = useMemo(() => {
    if (offer?.expiryDays !== undefined) {
      if (offer.expiryDays < 0) return 'Expired';
      if (offer.expiryDays === 0) return 'Expires today';
      if (offer.expiryDays === 1) return 'Expires in 1 day';
      return `Expires in ${offer.expiryDays} days`;
    }
    return getDynamicExpiry(offer?.expiry, offer?.createdAt);
  }, [offer]);

  const isExpired = dynamicExpiryText === 'Expired';
  const isCoupon = offer?.type === 'coupon' || offer?.code;

  const handleReveal = (e) => {
    e.preventDefault();
    if (!isCoupon) {
       // If it's just a deal, act as a link out
       if (offer?.link || offer?.url || store?.website) {
         window.open(offer.link || offer.url || store.website, '_blank');
       }
       return;
    }
    setRevealed(true);
    if (onReveal) onReveal(offer);
    if (trackCouponCopy) trackCouponCopy(offer.id);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    if (!offer?.code) return;
    navigator.clipboard.writeText(offer.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`group bg-surface border ${isExpired ? 'border-line opacity-60' : 'border-line hover:border-gold/40 hover:shadow-lg'} transition-all duration-300 rounded-xl flex flex-col sm:flex-row relative overflow-hidden`}>
      
      {/* Background Icon (Optional subtle touch) */}
      <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
        <Tag className="w-32 h-32 text-ink" />
      </div>

      {/* Left Section: Details */}
      <div className="flex-1 p-5 flex flex-col justify-center">
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg border border-line bg-cream flex items-center justify-center p-1.5 shrink-0">
             {logoUrl ? (
                <img src={logoUrl} alt={store?.name} className="w-full h-full object-contain" />
             ) : (
                <span className="text-xs font-bold text-ink">{store?.name?.substring(0, 2).toUpperCase()}</span>
             )}
          </div>
          <div className="min-w-0">
             <p className="text-[10px] font-black text-muted uppercase tracking-widest truncate">{store?.name}</p>
             <div className="flex items-center gap-2 mt-0.5">
               {offer?.badge && (
                 <span className="px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[9px] font-black uppercase tracking-wider">
                   {offer.badge}
                 </span>
               )}
               {offer?.successRate && (
                 <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                   <CheckCircle2 className="w-3 h-3" />
                   {offer.successRate}% Verified
                 </span>
               )}
             </div>
          </div>
        </div>

        <h3 className="text-base font-bold text-ink mb-2 leading-snug line-clamp-2">
           {offer?.title || offer?.discount}
        </h3>
        {offer?.description && (
          <p className="text-xs text-muted line-clamp-2 mb-3">
            {offer.description}
          </p>
        )}

        <div className="mt-auto flex items-center gap-3 text-[11px] font-semibold text-muted">
           {dynamicExpiryText && (
              <span className={isExpired ? 'text-red-500' : ''}>⏳ {dynamicExpiryText}</span>
           )}
           {offer?.minOrder && (
              <span>🛒 Min. Order: {offer.minOrder}</span>
           )}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:flex flex-col items-center justify-center w-6 shrink-0 relative">
        <div className="absolute top-0 bottom-0 w-[2px] border-l-2 border-dashed border-line"></div>
        <div className="w-6 h-6 rounded-full bg-cream absolute -top-3 left-1/2 -translate-x-1/2 border-b border-line"></div>
        <div className="w-6 h-6 rounded-full bg-cream absolute -bottom-3 left-1/2 -translate-x-1/2 border-t border-line"></div>
        <div className="bg-surface relative z-10 p-1 text-muted opacity-30 group-hover:opacity-60 transition-opacity">
          <Scissors className="w-3.5 h-3.5 -rotate-90" />
        </div>
      </div>
      
      {/* Mobile Divider */}
      <div className="sm:hidden flex items-center justify-center h-6 shrink-0 relative px-4 overflow-hidden">
        <div className="absolute left-0 right-0 h-[2px] border-t-2 border-dashed border-line"></div>
        <div className="w-6 h-6 rounded-full bg-cream absolute -left-3 top-1/2 -translate-y-1/2 border-r border-line"></div>
        <div className="w-6 h-6 rounded-full bg-cream absolute -right-3 top-1/2 -translate-y-1/2 border-l border-line"></div>
      </div>

      {/* Right Section: Code & Action */}
      <div className="sm:w-48 p-5 flex flex-col justify-center items-center bg-cream/30 sm:bg-transparent">
        
        {isCoupon ? (
           revealed ? (
             <div className="w-full animate-fadeIn">
               <p className="text-[10px] font-black uppercase text-muted text-center tracking-widest mb-2">Use Code</p>
               <div className="w-full bg-cream border-2 border-dashed border-gold/40 rounded-xl p-2.5 mb-3 flex items-center justify-center">
                 <span className="text-sm font-bold tracking-[0.1em] text-ink">{offer.code}</span>
               </div>
               <button
                 onClick={handleCopy}
                 className={`w-full py-2.5 rounded-xl text-[11px] font-black transition-all duration-300 flex items-center justify-center gap-1.5 ${
                   copied 
                     ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                     : 'bg-ink text-surface hover:bg-gold hover:text-ink hover:shadow-lg hover:shadow-gold/20'
                 }`}
               >
                 {copied ? (
                   <>Copied! <CheckCircle2 className="w-3.5 h-3.5" /></>
                 ) : (
                   <>Copy Code <Copy className="w-3.5 h-3.5" /></>
                 )}
               </button>
             </div>
           ) : (
             <div className="w-full">
               <div className="w-full bg-cream border border-line rounded-xl p-2 mb-3 flex items-center justify-center relative overflow-hidden">
                 <span className="text-sm font-bold tracking-[0.2em] text-muted blur-[4px] select-none">
                   {offer.code || 'XXXXXX'}
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full animate-[shimmer_2s_infinite]"></div>
               </div>
               <button
                 onClick={handleReveal}
                 className="w-full py-2.5 rounded-xl bg-gold text-ink text-[11px] font-black transition-all duration-300 hover:brightness-105 shadow-md shadow-gold/20 active:scale-95 flex items-center justify-center gap-1.5"
               >
                 Show Code <ChevronRight className="w-3.5 h-3.5" />
               </button>
             </div>
           )
        ) : (
           <div className="w-full">
              <div className="w-full bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 mb-3 flex items-center justify-center text-center">
                 <span className="text-xs font-bold text-emerald-700">Deal Activated</span>
              </div>
              <button
                 onClick={handleReveal}
                 className="w-full py-2.5 rounded-xl bg-ink text-surface text-[11px] font-black transition-all duration-300 hover:bg-gold hover:text-ink shadow-md active:scale-95 flex items-center justify-center gap-1.5"
               >
                 Get Deal <ExternalLink className="w-3.5 h-3.5" />
               </button>
           </div>
        )}

      </div>

    </div>
  );
}
