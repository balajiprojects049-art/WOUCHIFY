import { useState } from 'react'

function DealsFilterBar() {
  const [category, setCategory] = useState('All Categories')
  const [store, setStore] = useState('Popular Stores')
  const [discount, setDiscount] = useState('50%+')
  const [dealType, setDealType] = useState('Loot Deals')

  const discounts = ['30%+', '50%+', '70%+']

  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Category</p>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Travel</option>
              <option>Grocery</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Store</p>
            <select
              value={store}
              onChange={(event) => setStore(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              <option>Popular Stores</option>
              <option>Amazon</option>
              <option>Flipkart</option>
              <option>Myntra</option>
              <option>Croma</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Min Discount</p>
            <div className="flex h-11 items-center gap-1.5 rounded-xl border border-line bg-cream px-2 sm:gap-2">
              {discounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setDiscount(value)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-300 hover:scale-105 sm:px-3 sm:text-xs ${
                    discount === value ? 'bg-gold/20 text-gold' : 'text-ink'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Deal Type</p>
            <select
              value={dealType}
              onChange={(event) => setDealType(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              <option>Loot Deals</option>
              <option>Coupon Deals</option>
              <option>Flash Deals</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsFilterBar
