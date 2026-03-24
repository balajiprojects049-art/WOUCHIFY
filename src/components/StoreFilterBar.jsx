import SearchBar from './SearchBar'

const offerTypes = ['All', 'Deals', 'Coupons', 'Expired']
const discountFilters = ['10%+', '25%+', '50%+']
const sortOptions = ['Latest', 'Popular', 'Expiring Soon']

function StoreFilterBar({ searchText, onSearchChange, offerType, onOfferTypeChange, minDiscount, onMinDiscountChange, sortBy, onSortByChange }) {
  return (
    <section className="sticky top-16 z-40 mt-8 rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SearchBar
          value={searchText}
          onChange={onSearchChange}
          placeholder="Search coupons, deals, or keywords"
          className="min-w-[240px] flex-1"
        />

        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <select
            value={offerType}
            onChange={(event) => onOfferTypeChange(event.target.value)}
            className="h-9 w-full rounded-lg border border-line bg-white px-3 text-xs font-semibold text-ink focus:outline-none md:hidden"
          >
            {offerTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <select
            value={minDiscount}
            onChange={(event) => onMinDiscountChange(event.target.value)}
            className="h-9 w-full rounded-lg border border-line bg-white px-3 text-xs font-semibold text-ink focus:outline-none md:hidden"
          >
            {discountFilters.map((discount) => (
              <option key={discount}>{discount}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
            className="h-9 w-full rounded-lg border border-line bg-white px-3 text-xs font-semibold text-ink focus:outline-none md:hidden"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <div className="hidden flex-wrap items-center gap-2 md:flex">
            {offerTypes.map((type) => (
              <button
                key={type}
                onClick={() => onOfferTypeChange(type)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                  offerType === type ? 'bg-navy text-white' : 'bg-cream text-ink hover:bg-gold/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-wrap items-center gap-2 md:flex">
          {discountFilters.map((discount) => (
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

          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
            className="h-9 rounded-lg border border-line bg-white px-3 text-xs font-semibold text-ink focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default StoreFilterBar
