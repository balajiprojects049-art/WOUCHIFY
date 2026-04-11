import { useSearchParams } from 'react-router-dom'
import { ALL_CATEGORIES, TOP_STORES } from '../utils/categories'

function DealsFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || 'All Categories'
  const store = searchParams.get('store') || 'All Stores'
  const discount = searchParams.get('minDiscount') || '50%+'
  const dealType = searchParams.get('dealType') || 'All Types'

  const discounts = ['30%+', '50%+', '70%+']
  const dealTypes = ['All Types', 'Loot Deals', 'Coupon Deals', 'Flash Deals']

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
          {/* Category */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Category</p>
            <select
              value={category}
              onChange={(event) => updateFilter('category', event.target.value, 'All Categories')}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              {ALL_CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Store */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Store</p>
            <select
              value={store}
              onChange={(event) => updateFilter('store', event.target.value, 'All Stores')}
              className="h-11 w-full rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink focus:outline-none"
            >
              {TOP_STORES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Min Discount */}
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

          {/* Deal Type */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Deal Type</p>
            <select
              value={dealType}
              onChange={(event) => updateFilter('dealType', event.target.value, 'All Types')}
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
