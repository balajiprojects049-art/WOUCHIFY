import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import LootDealCard from '../components/LootDealCard'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

function parseDiscount(value) {
  return Number.parseInt((value || '').replace('%+', ''), 10)
}

function LootDeals() {
  const { publishedLootDeals: lootDeals, banners } = useData()
  const [nowMs, setNowMs] = useState(Date.now())
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const [storeFilter, setStoreFilter] = useState('All Stores')
  const [minDiscount, setMinDiscount] = useState('All')
  const [sortBy, setSortBy] = useState('Most Popular')

  // Use admin-configured banners or fallbacks
  const lootBanners = (banners.lootDeals || []).filter(b => b.active !== false)

  useEffect(() => {
    const timerId = setInterval(() => {
      setNowMs(Date.now())
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  const filteredDeals = useMemo(() => {
    const minDiscountValue = parseDiscount(minDiscount)

    const filtered = lootDeals.filter((deal) => {
      // Auto-hide if mathematically expired
      if (getDealRemainingSeconds(deal, nowMs) <= 0) return false

      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || (deal.title || '').toLowerCase().includes(query) || (deal.category || '').toLowerCase().includes(query)
      const matchesCategory = category === 'All' || (deal.category || '') === category
      const matchesStore = storeFilter === 'All Stores' || (deal.store || '').toLowerCase().includes(storeFilter.toLowerCase())
      const matchesDiscount = Number.isNaN(minDiscountValue) || deal.discountPercent >= minDiscountValue

      return matchesSearch && matchesCategory && matchesStore && matchesDiscount
    })

    return filtered.sort((first, second) => {
      if (sortBy === 'Highest Discount') {
        return second.discountPercent - first.discountPercent
      }
      if (sortBy === 'Ending Soon') {
        return first.expiresInSeconds - second.expiresInSeconds
      }
      return second.popularity - first.popularity
    })
  }, [category, storeFilter, minDiscount, searchText, sortBy, lootDeals])

  const filterProps = {
    searchText, onSearchChange: setSearchText,
    searchPlaceholder: 'Search loot deals...',
    category, onCategoryChange: setCategory,
    minDiscount, onMinDiscountChange: setMinDiscount,
    discountOptions: ['All', '20%+', '50%+', '70%+'],
    sortBy, onSortByChange: setSortBy,
    sortOptions: ['Most Popular', 'Highest Discount', 'Ending Soon'],
    showPriceRange: false, showDealStatus: false,
    showStoreFilter: true, storeValue: storeFilter, onStoreChange: setStoreFilter,
  }

  return (
    <main>
      <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6">
        <ScrollingPageBanner banners={lootBanners} />
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 pb-32 sm:px-6 lg:pb-10">
        {/* Top filter bar */}
        <FilterBar {...filterProps} />

        {/* Full-width grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
          {filteredDeals.map((deal) => (
            <LootDealCard key={deal.id} deal={deal} />
          ))}
          {filteredDeals.length === 0 && (
            <article className="rounded-2xl border border-line bg-white p-8 text-center text-sm font-medium text-muted sm:col-span-2 md:col-span-3">
              No loot deals found for current filters.
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default LootDeals
