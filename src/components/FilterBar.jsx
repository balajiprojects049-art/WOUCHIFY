import SearchBar from './SearchBar'

const defaultCategories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Travel']
const defaultDiscountFilters = ['10%+', '25%+', '50%+', '70%+']
const defaultSortOptions = ['Trending', 'Latest', 'Price Low to High', 'Price High to Low', 'Expiring Soon']

function FilterBar({
  searchText,
  onSearchChange,
  searchPlaceholder = 'Search deals...',
  category,
  onCategoryChange,
  categoryOptions = defaultCategories,
  minDiscount,
  onMinDiscountChange,
  discountOptions = defaultDiscountFilters,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  sortOptions = defaultSortOptions,
  onlyActive,
  onOnlyActiveChange,
  showPriceRange = true,
  showOnlyActive = true,
}) {
  return (
    <section className="sticky top-16 z-40 mt-8 rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-wrap gap-4">
        <SearchBar
          value={searchText}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          className="min-w-[240px] flex-1"
        />

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-10 min-w-[170px] rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink focus:outline-none"
        >
          {categoryOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <div className="flex flex-wrap items-center gap-2">
          {discountOptions.map((discount) => (
            <button
              key={discount}
              onClick={() => onMinDiscountChange(discount)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                minDiscount === discount ? 'bg-gold/20 text-gold' : 'bg-cream text-ink hover:bg-gold/10'
              }`}
            >
              {discount}
            </button>
          ))}
        </div>

        {showPriceRange && (
          <div className="min-w-[200px] flex-1 rounded-xl border border-line bg-white px-3 py-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>Price Range</span>
              <span>Up to ${priceRange}</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="10"
              value={priceRange}
              onChange={(event) => onPriceRangeChange(Number(event.target.value))}
              className="mt-2 w-full accent-gold"
            />
          </div>
        )}

        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
          className="h-10 min-w-[190px] rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        {showOnlyActive && (
          <button
            onClick={() => onOnlyActiveChange(!onlyActive)}
            className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-all duration-300 ${
              onlyActive ? 'bg-navy text-white' : 'bg-cream text-ink'
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${onlyActive ? 'bg-gold' : 'bg-muted'}`} />
            Only Active Deals
          </button>
        )}
      </div>
    </section>
  )
}

export default FilterBar
