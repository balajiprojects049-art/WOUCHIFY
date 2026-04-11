import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import CreditCardDetailCard from './CreditCardDetailCard'

function TopCreditCardsSection() {
  const { creditCards } = useData()

  const activeShoppingCards = (creditCards.shopping || []).filter(c => c.active !== false)
  const activeLifetimeCards = (creditCards.lifetime || []).filter(c => c.active !== false)

  // Grab top 8 cards for the sliding carousel
  const topCards = [...activeShoppingCards, ...activeLifetimeCards].slice(0, 8)

  if (topCards.length === 0) return null

  return (
    <section className="mt-8 sm:mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Top Featured Credit Cards</h2>
          <p className="mt-1 text-sm text-muted">Max out your rewards with the best premium & lifetime free cards</p>
        </div>
        <Link to="/credit-cards" className="text-sm font-semibold text-gold shrink-0 pl-4">View All Cards</Link>
      </div>

      <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {topCards.map((card, idx) => (
          <div key={card.id || idx} className="w-[85vw] sm:w-[48%] lg:w-[45%] shrink-0 snap-center sm:snap-start">
            <CreditCardDetailCard item={card} dark={card.type === 'lifetime'} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopCreditCardsSection
