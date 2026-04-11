import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import CreditCardDetailCard from './CreditCardDetailCard'

function TopCreditCardsSection() {
  const { creditCards } = useData()

  const activeShoppingCards = (creditCards.shopping || []).filter(c => c.active !== false)
  const activeLifetimeCards = (creditCards.lifetime || []).filter(c => c.active !== false)

  // Grab top 4 cards for a nice 2x2 grid on desktop or list on mobile
  const topCards = [...activeShoppingCards, ...activeLifetimeCards].slice(0, 4)

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {topCards.map((card, idx) => (
          <CreditCardDetailCard key={card.id || idx} item={card} dark={card.type === 'lifetime'} />
        ))}
      </div>
    </section>
  )
}

export default TopCreditCardsSection
