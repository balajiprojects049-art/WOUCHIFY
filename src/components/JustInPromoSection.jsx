import { useEffect, useState } from 'react'

const altCardImage = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80'

const shoppingCards = [
  {
    bank: 'AXIS BANK',
    card: 'Flipkart Card',
    cashback: 'Up to 7.5% Cashback',
    partners: 'Flipkart • Myntra • Uber • Cleartrip',
    rewards: 'Flat ₹1,400 Rewards',
    wrapper: 'from-cream via-white to-cream',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'SBI CARD',
    card: 'Flipkart Card',
    cashback: 'Up to 7.5% Cashback',
    partners: 'Flipkart • Myntra • Cleartrip • Uber',
    rewards: 'Flat ₹1,400 Rewards',
    wrapper: 'from-cream via-white to-cream',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'SBI CARD',
    card: 'Cashback Card',
    cashback: '5% Cashback on all online spends',
    partners: 'Amazon • Flipkart • Myntra • 1000+ stores',
    rewards: 'Flat ₹1,500 Rewards',
    wrapper: 'from-cream via-white to-cream',
    cardImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    bank: 'HDFC BANK',
    card: 'Millennia Card',
    cashback: '5% Cashback on top merchants',
    partners: 'Amazon • Myntra • Flipkart and more',
    rewards: 'Flat ₹1,100 Rewards',
    wrapper: 'from-cream via-white to-cream',
    cardImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80',
  },
]

const lifetimeCards = [
  {
    bank: 'AXIS BANK',
    card: 'MyZone Card',
    cashback: 'Save ₹2,800 On welcome benefits',
    partners: 'Movies • Dining • Shopping offers',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'SCAPIA',
    card: 'Travel Card',
    cashback: 'No Forex Fee on international spends',
    partners: 'Flights • Hotels • Global merchants',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'BOB CARD',
    card: 'Eterna Card',
    cashback: 'Premium lifestyle privileges',
    partners: 'Dining • Travel • Shopping',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    bank: 'IDFC FIRST',
    card: 'Credit Card',
    cashback: 'Welcome offers and zero joining fee',
    partners: 'Fuel • Grocery • Online spends',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?auto=format&fit=crop&w=900&q=80',
  },
]

function CreditCardTile({ item, lightText = false, slideIndex = 0 }) {
  const imageSlides = [item.cardImage, altCardImage]

  return (
    <article
      className={`relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-r p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-5 ${item.wrapper}`}
    >
      <div className="inline-flex w-fit flex-col rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-ink shadow-sm">
        <p>{item.bank}</p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{item.card}</p>
      </div>

      <div className="relative z-10 mt-16 max-w-[65%]">
        <h4 className={`text-xl font-bold leading-tight ${lightText ? 'text-white' : 'text-ink'}`}>{item.cashback}</h4>
        <p className={`mt-3 text-sm ${lightText ? 'text-slate-200' : 'text-muted'}`}>{item.partners}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-sm font-bold text-midnight">CK</span>
          <p className={`text-2xl font-extrabold ${lightText ? 'text-white' : 'text-ink'}`}>{item.rewards}</p>
        </div>

        <button className="mt-4 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-navy transition-all duration-300 hover:scale-105">
          Apply Now
        </button>
      </div>

      <div className="absolute right-3 top-16 h-52 w-40 overflow-hidden rounded-2xl border border-white/10 bg-midnight shadow-lg sm:h-56 sm:w-44">
        <img
          src={imageSlides[slideIndex % 2]}
          alt={`${item.bank} ${item.card}`}
          className="h-full w-full bg-midnight object-cover transition-all duration-500"
        />
      </div>
    </article>
  )
}

function CardRow({ title, items, lifetime = false, slideIndex = 0 }) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h3>
        <button className="text-sm font-semibold text-gold">View All →</button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.slice(0, 2).map((item) => (
          <CreditCardTile key={`${title}-${item.bank}-${item.card}`} item={item} lightText={lifetime} slideIndex={slideIndex} />
        ))}
      </div>
    </div>
  )
}

function JustInPromoSection() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((previous) => (previous + 1) % 2)
    }, 2600)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="mt-20 space-y-14">
      <CardRow title="Best Cards for Shopping" items={shoppingCards} slideIndex={slideIndex} />
      <CardRow title="Best Lifetime Free Credit Cards" items={lifetimeCards} lifetime slideIndex={slideIndex} />
    </section>
  )
}

export default JustInPromoSection
