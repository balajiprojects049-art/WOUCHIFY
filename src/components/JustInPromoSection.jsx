import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const altCardImage = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80'

function CreditCardTile({ item, lightText = false, slideIndex = 0, onApplyNow }) {
  const imageSlides = [item.cardImage || altCardImage, altCardImage]

  return (
    <article
      className={`relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-r p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-5 ${lightText ? 'from-midnight via-navysoft to-navy' : 'from-cream via-surface to-cream'}`}
    >
      <div className="inline-flex w-fit flex-col rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-ink shadow-sm">
        <p>{item.bank}</p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{item.card}</p>
      </div>

      <div className="relative z-10 mt-28 max-w-[100%] sm:mt-16 sm:max-w-[65%]">
        <h4 className={`text-lg font-bold leading-tight sm:text-xl ${lightText ? 'text-white' : 'text-ink'}`}>{item.cashback}</h4>
        <p className={`mt-2 text-xs sm:mt-3 sm:text-sm ${lightText ? 'text-slate-200' : 'text-muted'}`}>{item.partners}</p>

        <div className="mt-3 flex items-center gap-2 sm:mt-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-xs font-bold text-midnight sm:h-9 sm:w-9 sm:text-sm">CK</span>
          <p className={`text-xl font-extrabold sm:text-2xl ${lightText ? 'text-white' : 'text-ink'}`}>{item.rewards}</p>
        </div>

        <button onClick={onApplyNow} className="mt-3 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:scale-105 sm:mt-4 sm:px-5 sm:text-sm">
          Apply Now
        </button>
      </div>

      <div className="absolute right-3 top-14 h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-midnight shadow-lg sm:top-16 sm:h-56 sm:w-44">
        <img
          src={imageSlides[slideIndex % imageSlides.length]}
          alt={`${item.bank} ${item.card}`}
          className="h-full w-full bg-midnight object-cover transition-all duration-500"
          onError={e => e.target.style.display='none'}
        />
      </div>
    </article>
  )
}

function CardRow({ title, items, lifetime = false, slideIndex = 0, onApplyNow, onViewAll }) {
  if (!items || items.length === 0) return null
  return (
    <div>
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <h3 className="text-xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h3>
        <button onClick={onViewAll} className="text-sm font-semibold text-gold">View All →</button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.slice(0, 2).map((item) => (
          <CreditCardTile key={`${title}-${item.bank}-${item.card}-${item.id}`} item={item} lightText={lifetime} slideIndex={slideIndex} onApplyNow={onApplyNow} />
        ))}
      </div>
    </div>
  )
}

function JustInPromoSection() {
  const [slideIndex, setSlideIndex] = useState(0)
  const navigate = useNavigate()
  const { creditCards } = useData()

  const activeShoppingCards = (creditCards.shopping || []).filter(c => c.active !== false)
  const activeLifetimeCards = (creditCards.lifetime || []).filter(c => c.active !== false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((previous) => (previous + 1) % 2)
    }, 2600)

    return () => clearInterval(intervalId)
  }, [])

  if (activeShoppingCards.length === 0 && activeLifetimeCards.length === 0) return null

  return (
    <section className="mt-16 space-y-10 sm:mt-20 sm:space-y-14">
      {activeShoppingCards.length > 0 && (
        <CardRow
          title="Best Cards for Shopping"
          items={activeShoppingCards}
          slideIndex={slideIndex}
          onApplyNow={() => navigate('/credit-cards')}
          onViewAll={() => navigate('/credit-cards')}
        />
      )}
      {activeLifetimeCards.length > 0 && (
        <CardRow
          title="Best Lifetime Free Credit Cards"
          items={activeLifetimeCards}
          lifetime
          slideIndex={slideIndex}
          onApplyNow={() => navigate('/credit-cards')}
          onViewAll={() => navigate('/credit-cards')}
        />
      )}
    </section>
  )
}

export default JustInPromoSection
