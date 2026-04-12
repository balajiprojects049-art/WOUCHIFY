import ScrollingPageBanner from '../components/ScrollingPageBanner'
import { useData } from '../context/DataContext'
import CreditCardDetailCard from '../components/CreditCardDetailCard'
import SEO from '../components/SEO'



function CreditCards() {
  const { creditCards, banners } = useData()

  const activeShoppingCards = (creditCards.shopping || []).filter(c => c.active !== false)
  const activeLifetimeCards = (creditCards.lifetime || []).filter(c => c.active !== false)

  const activeBanners = (banners.creditCards || []).filter(b => b.active !== false)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SEO 
        title="Best Credit Card Offers & Rewards"
        description="Compare the best credit cards in India. Find premium shopping cards and lifetime-free cards with exclusive cashback and rewards through Wouchify."
        keywords="credit cards, rewards, cashback, lifetime free, shopping cards, credit card offers"
      />
      <section className="mb-14">
        <ScrollingPageBanner banners={activeBanners} />
      </section>

      {/* Shopping Cards */}
      {activeShoppingCards.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-line" />
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-ink">Premium Shopping Cards</h2>
            <div className="h-px flex-1 bg-line" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {activeShoppingCards.map((card) => (
              <CreditCardDetailCard key={card.id} item={card} />
            ))}
          </div>
        </section>
      )}

      {/* Lifetime Cards */}
      {activeLifetimeCards.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-line" />
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-ink">Unlimited Lifetime Free</h2>
            <div className="h-px flex-1 bg-line" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {activeLifetimeCards.map((card) => (
              <CreditCardDetailCard key={card.id} item={card} dark />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {activeShoppingCards.length === 0 && activeLifetimeCards.length === 0 && (
        <div className="rounded-3xl border border-line bg-white p-16 text-center">
          <p className="text-4xl mb-4">💳</p>
          <p className="text-lg font-bold text-ink">No credit cards available</p>
          <p className="mt-2 text-sm text-muted">Check back soon — the admin will add cards shortly.</p>
        </div>
      )}
    </main>
  )
}

export default CreditCards
