const stores = [
  { name: 'Amazon', reward: 'Up to 6.2% rewards', featured: true },
  { name: 'Flipkart', reward: 'Up to 7% cashback' },
  { name: 'Meesho', reward: 'Flat 5% cashback' },
  { name: 'Myntra', reward: 'Up to 6.8% cashback' },
  { name: 'Ajio', reward: 'Up to 10.2% cashback' },
  { name: 'BookMyShow', reward: 'Up to ₹120 savings' },
  { name: 'Cleartrip', reward: 'Up to ₹285 savings' },
  { name: 'Blissclub', reward: 'Up to 8% cashback' },
  { name: 'Clove', reward: 'Flat 4.5% cashback' },
  { name: 'Aramya', reward: 'Up to 9% cashback' },
  { name: 'Puma', reward: 'Up to 7.5% cashback' },
  { name: 'FirstCry', reward: 'Up to 5.4% cashback' },
  { name: 'Superbottom', reward: 'Up to 6% cashback' },
  { name: 'Acer', reward: 'Up to 4.8% cashback' },
]

function StoreBadge({ name }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

function TopStoresSection() {
  const featuredStore = stores.find((store) => store.featured)
  const otherStores = stores.filter((store) => !store.featured)

  return (
    <section className="mt-14 sm:mt-16">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Top Stores</h2>
        <a href="#" className="text-sm font-semibold text-gold">
          View all
        </a>
      </div>

      <div className="rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {featuredStore && (
            <article className="col-span-2 row-span-2 rounded-2xl border border-line bg-cream p-4 transition-all duration-300 hover:-translate-y-2 sm:p-5">
              <div className="flex items-center justify-between">
                <StoreBadge name={featuredStore.name} />
                <p className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-semibold text-gold">Featured</p>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:mt-6 sm:text-3xl">{featuredStore.name}</h3>
              <p className="mt-2 text-base font-semibold text-ink sm:mt-3 sm:text-lg">{featuredStore.reward}</p>
              <button className="mt-4 rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 sm:mt-5 sm:text-sm">
                Grab Deal
              </button>
            </article>
          )}

          {otherStores.map((store) => (
            <article
              key={store.name}
              className="rounded-xl border border-line bg-white p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-sm sm:p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <StoreBadge name={store.name} />
                <p className="text-xs font-semibold text-muted sm:text-sm">Store</p>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-ink sm:mt-5 sm:text-xl">{store.name}</h3>
              <p className="mt-1.5 text-xs font-semibold text-ink sm:mt-2 sm:text-sm">{store.reward}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopStoresSection
