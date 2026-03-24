import { useNavigate } from 'react-router-dom'

const dealCards = [
  {
    title: 'iPhone 15 Plus',
    store: 'Amazon',
    discount: 'Up to 22% OFF',
    code: 'APPLE22',
    price: '$899',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Samsung Galaxy Buds',
    store: 'Flipkart',
    discount: 'Flat 31% OFF',
    code: 'SOUND31',
    price: '$119',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'ASUS TUF Gaming Laptop',
    store: 'Croma',
    discount: 'Save 18% Today',
    code: 'TUF18',
    price: '$1,049',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Nike Air Max',
    store: 'Myntra',
    discount: 'Buy at 28% OFF',
    code: 'AIRMAX28',
    price: '$139',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sony Bravia 55" 4K',
    store: 'Reliance Digital',
    discount: 'Mega Deal 24% OFF',
    code: 'BRAVIA24',
    price: '$699',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Boat Smart Watch',
    store: 'Ajio',
    discount: 'Extra 35% OFF',
    code: 'BOAT35',
    price: '$59',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
]

function DealsCatalogSection({
  label = 'Deals Catalog',
  title = 'Best Offers Across Top Stores',
  actionText = 'View All',
}) {
  const navigate = useNavigate()

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
        </div>
        <button onClick={() => navigate('/deals')} className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:text-sm">
          {actionText}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dealCards.map((deal) => (
          <article
            key={deal.title}
            className="rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-4"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-44 w-full rounded-xl object-cover transition-all duration-300 hover:scale-105"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{deal.store}</p>
              <span className="rounded-full bg-navysoft px-2 py-1 text-[11px] font-semibold text-navy">{deal.discount}</span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-ink">{deal.title}</h3>
            <p className="mt-1 text-sm text-muted">Coupon: {deal.code}</p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xl font-bold text-ink">{deal.price}</p>
              <button
                onClick={() => navigate(`/deals?q=${encodeURIComponent(deal.title)}`)}
                className="rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Grab Deal
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DealsCatalogSection
