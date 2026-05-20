import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import LootDealCard from '../components/LootDealCard'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'
import SEO from '../components/SEO'
import { categoriesData } from '../data/categoriesData'

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
    const catLower = category?.toLowerCase()

    const matchedClassification = (() => {
      if (!category || category === 'All' || category === 'All Categories') return { isStore: false, isBrand: false, isBank: false }
      const isStore = Object.values(categoriesData.stores || {}).some(arr => 
        arr.some(item => item.name.toLowerCase() === catLower)
      )
      const isBrand = Object.values(categoriesData.brands || {}).some(arr => 
        arr.some(item => item.name.toLowerCase() === catLower)
      )
      const isBank = Object.values(categoriesData.banks || {}).some(arr => 
        arr.some(item => item.name.toLowerCase() === catLower)
      )
      return { isStore, isBrand, isBank }
    })()

    const filtered = lootDeals.filter((deal) => {
      // Auto-hide if mathematically expired (but treat missing expiry as evergreen)
      if (deal.expiresInSeconds !== undefined && getDealRemainingSeconds(deal, nowMs) <= 0) return false

      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || (deal.title || '').toLowerCase().includes(query) || (deal.category || '').toLowerCase().includes(query)
      
      let matchesCategory = true
      if (category !== 'All' && category !== 'All Categories') {
        if (matchedClassification.isStore) {
          matchesCategory = (deal.store || '').toLowerCase() === catLower || (deal.store || '').toLowerCase().includes(catLower) || catLower.includes((deal.store || '').toLowerCase())
        } else if (matchedClassification.isBrand) {
          matchesCategory = (deal.brand || '').toLowerCase() === catLower || 
                            (deal.title || '').toLowerCase().includes(catLower) || 
                            (deal.description || '').toLowerCase().includes(catLower) ||
                            (deal.store || '').toLowerCase() === catLower
        } else if (matchedClassification.isBank) {
          const keywords = catLower.split(' ').filter(word => word.length > 2 && word !== 'bank' && word !== 'card')
          const searchWords = keywords.length > 0 ? keywords : [catLower]
          matchesCategory = searchWords.some(kw => 
            (deal.title || '').toLowerCase().includes(kw) || 
            (deal.description || '').toLowerCase().includes(kw) ||
            (deal.store || '').toLowerCase().includes(kw) ||
            (deal.category || '').toLowerCase().includes(kw)
          )
        } else {
          matchesCategory = (deal.category || '').toLowerCase() === catLower || (deal.category || '').toLowerCase().includes(catLower)
        }
      }

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 sm:gap-5">
          {filteredDeals.map((deal) => (
            <LootDealCard key={deal.id} deal={deal} />
          ))}
          {filteredDeals.length === 0 && (
            <article className="rounded-2xl border border-line bg-surface p-8 text-center text-sm font-medium text-muted sm:col-span-2 md:col-span-3 shadow-inner">
              No loot deals found for current filters.
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default LootDeals
