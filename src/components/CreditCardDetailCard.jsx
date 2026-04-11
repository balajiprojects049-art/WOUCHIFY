export default function CreditCardDetailCard({ item, dark = false }) {
  const wrapperClass = dark
    ? 'from-midnight via-navysoft to-navy'
    : 'from-cream via-surface to-cream'

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-line p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] ${dark ? 'bg-midnight text-white border-white/10' : 'bg-white text-ink'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${dark ? 'bg-white/10 text-gold' : 'bg-gold/10 text-gold'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            {item.bank}
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-tight leading-tight sm:text-3xl">{item.card}</h3>
        </div>
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border border-line bg-cream/30 p-1.5 shadow-inner">
          {item.cardImage ? (
            <img src={item.cardImage} alt={item.card} className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" onError={e => e.target.style.display='none'} />
          ) : (
            <div className={`h-full w-full rounded-xl flex items-center justify-center text-xs font-bold ${dark ? 'bg-white/10 text-gold' : 'bg-gold/10 text-gold'}`}>
              💳
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-2xl p-4 transition-colors ${dark ? 'bg-white/5' : 'bg-cream/50'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-muted'}`}>Top Benefit</p>
            <p className="mt-1 text-sm font-bold leading-tight">{item.cashback}</p>
          </div>
          <div className={`rounded-2xl p-4 transition-colors ${dark ? 'bg-white/5' : 'bg-cream/50'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-muted'}`}>Rewards</p>
            <p className="mt-1 text-sm font-bold leading-tight">{item.rewards}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-muted'}`}>Verified Partners</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(item.partners || '').split('•').map((p, i) => (
              <span key={i} className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${dark ? 'bg-white/10 text-slate-300' : 'bg-cream text-muted'}`}>
                {p.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-line/50 pt-6 flex items-center justify-between gap-4">
        <div className="flex -space-x-3 overflow-hidden">
          {[1,2,3].map(i => (
            <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ${dark ? 'ring-midnight bg-slate-800' : 'ring-white bg-slate-200'} flex items-center justify-center text-[10px] font-bold`}>
              U{i}
            </div>
          ))}
          <div className={`flex items-center justify-center h-8 px-2 rounded-full text-[9px] font-bold ${dark ? 'bg-white/10 text-gold' : 'bg-gold/10 text-gold'}`}>
            +2.4k
          </div>
        </div>
        {item.applyUrl ? (
          <a href={item.applyUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black shadow-lg transition-all hover:scale-105 active:scale-95 ${dark ? 'bg-gold text-midnight hover:bg-white' : 'bg-navy text-cream hover:bg-black'}`}>
            Apply Now
            <span className="text-base">→</span>
          </a>
        ) : (
          <button className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black shadow-lg transition-all opacity-50 cursor-not-allowed ${dark ? 'bg-gold text-midnight' : 'bg-navy text-cream'}`}>
            Apply Now
            <span className="text-base">→</span>
          </button>
        )}
      </div>
    </article>
  )
}
