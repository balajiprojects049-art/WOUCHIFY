import { useSearchParams } from 'react-router-dom'

function DealsFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || 'All Categories'
  const store = searchParams.get('store') || 'Popular Stores'
  const discount = searchParams.get('minDiscount') || '50%+'
  const dealType = searchParams.get('dealType') || 'Loot Deals'

  const discounts = ['30%+', '50%+', '70%+']
  const categories = ['All Categories', 'Electronics', 'Fashion', 'Travel', 'Grocery']
  const stores = ['Popular Stores', 'Amazon', 'Flipkart', 'Myntra', 'Croma', 'Ajio']
  const dealTypes = ['Loot Deals', 'Coupon Deals', 'Flash Deals']

  const updateFilter = (key, value, defaultValue) => {
    const nextParams = new URLSearchParams(searchParams)
    if (!value || value === defaultValue) {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Category</p>
            <select
              value={category}
              onChange={(event) => updateFilter('category', event.target.value, 'All Categories')}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Store</p>
            <select
              value={store}
              onChange={(event) => updateFilter('store', event.target.value, 'Popular Stores')}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              {stores.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Min Discount</p>
            <div className="flex h-11 items-center gap-1.5 rounded-xl border border-line bg-cream px-2 sm:gap-2">
              {discounts.map((value) => (
                <button
                  key={value}
                  onClick={() => updateFilter('minDiscount', value, '50%+')}
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
              onChange={(event) => updateFilter('dealType', event.target.value, 'Loot Deals')}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              {dealTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsFilterBar
