import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import LootProductCard from '../components/LootProductCard'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'
import SEO from '../components/SEO'

function parseDiscount(value) {
  return Number.parseInt((value || '').replace('%+', ''), 10)
}

function LootDeals() {
  const { userLootDeals: lootDeals, banners } = useData()
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
      // Auto-hide if mathematically expired (but treat missing expiry as evergreen)
      const remainingSeconds = getDealRemainingSeconds(deal, nowMs)
      if (deal.expiresInSeconds != null && remainingSeconds !== null && remainingSeconds <= 0) return false

      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || (deal.title || '').toLowerCase().includes(query) || (deal.category || '').toLowerCase().includes(query)
      const searchCat = category === 'All' || category === 'All Categories' ? '' : category.toLowerCase()
      const itemCat = (deal.category || '').toLowerCase()
      const itemStore = (deal.store || '').toLowerCase()
      const itemTitle = (deal.title || '').toLowerCase()
      
      let matchesCategory = !searchCat
      if (searchCat) {
        if (itemCat === searchCat || itemCat.includes(searchCat)) matchesCategory = true
        else if (itemStore === searchCat || itemStore.includes(searchCat)) matchesCategory = true
        else {
          const keywords = searchCat.split(' ').filter(k => k.length > 2)
          if (keywords.some(k => itemTitle.includes(k) || itemCat.includes(k) || itemStore.includes(k))) matchesCategory = true
        }
      }

      const matchesStore = storeFilter === 'All Stores' || itemStore.includes(storeFilter.toLowerCase())
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
  }, [category, storeFilter, minDiscount, searchText, sortBy, lootDeals, nowMs])

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
      <SEO 
        title="Exclusive Loot Deals & Flash Sales"
        description="Grab the hottest loot deals before they expire! Massive discounts, flash sales, and price errors from top retailers, verified daily."
        keywords="loot deals, flash sales, price errors, lowest price, looting, Wouchify loot"
      />
      <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6">
        <ScrollingPageBanner banners={lootBanners} />
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 pb-32 sm:px-6 lg:pb-10">
        {/* Top filter bar */}
        <FilterBar {...filterProps} />

        {/* Full-width grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDeals.map((deal) => (
            <LootProductCard key={deal.id} item={deal} />
          ))}
          {filteredDeals.length === 0 && (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-base font-bold text-ink">No loot deals found</p>
              <p className="mt-1 text-sm text-muted">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default LootDeals
