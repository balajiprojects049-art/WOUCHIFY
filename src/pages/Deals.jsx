import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DealGrid from '../components/DealGrid'
import FilterBar from '../components/FilterBar'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import TopDealsSection from '../components/TopDealsSection'
import { useData } from '../context/DataContext'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

function parseDiscount(value) {
  return Number.parseInt((value || '').replace('%+', ''), 10)
}

function parseUsageCount(value) {
  const normalized = String(value || '').toLowerCase().trim()
  if (normalized.endsWith('k')) {
    return Number.parseFloat(normalized.replace('k', '')) * 1000
  }
  return Number.parseInt(normalized.replace(/[^0-9]/g, ''), 10) || 0
}

function Deals() {
  const { deals: allDeals, banners } = useData()
  const [searchParams] = useSearchParams()
  const [nowMs, setNowMs] = useState(Date.now())

  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const [minDiscount, setMinDiscount] = useState('0%+')
  const maxDealPrice = useMemo(() => {
    const highest = allDeals.reduce((max, deal) => {
      const value = Number(deal?.priceValue)
      return Number.isFinite(value) ? Math.max(max, value) : max
    }, 0)

    // Keep a practical floor so slider remains usable even with small datasets.
    return Math.max(2000, Math.ceil(highest / 1000) * 1000)
  }, [allDeals])
  const [priceRange, setPriceRange] = useState(maxDealPrice)
  const [sortBy, setSortBy] = useState('Trending')
  const [onlyActive, setOnlyActive] = useState(true)

  useEffect(() => {
    setPriceRange(maxDealPrice)
  }, [maxDealPrice])

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchText(query)
  }, [searchParams])

  useEffect(() => {
    const timerId = setInterval(() => {
      setNowMs(Date.now())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  // Use admin-configured banners or fallbacks
  const dealsBanners = (banners.deals || []).filter(b => b.active !== false)

  const filteredDeals = useMemo(() => {
    const minDiscountValue = parseDiscount(minDiscount)

    const filtered = allDeals.filter((deal) => {
      const remainingSeconds = getDealRemainingSeconds(deal, nowMs)
      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || deal.title.toLowerCase().includes(query) || deal.store.toLowerCase().includes(query)
      const matchesCategory = category === 'All' || deal.category === category
      const matchesDiscount = Number.isNaN(minDiscountValue) || deal.discountValue >= minDiscountValue
      const matchesPriceRange = deal.priceValue <= priceRange
      const matchesActive = !onlyActive || remainingSeconds > 0

      return matchesSearch && matchesCategory && matchesDiscount && matchesPriceRange && matchesActive
    })

    return filtered.sort((first, second) => {
      const firstRemaining = getDealRemainingSeconds(first, nowMs)
      const secondRemaining = getDealRemainingSeconds(second, nowMs)

      if (sortBy === 'Latest') {
        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
      }
      if (sortBy === 'Price Low to High') {
        return first.priceValue - second.priceValue
      }
      if (sortBy === 'Price High to Low') {
        return second.priceValue - first.priceValue
      }
      if (sortBy === 'Expiring Soon') {
        return firstRemaining - secondRemaining
      }
      return parseUsageCount(second.usageCount) - parseUsageCount(first.usageCount)
    })
  }, [category, nowMs, minDiscount, onlyActive, priceRange, searchText, sortBy, allDeals])

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <ScrollingPageBanner banners={dealsBanners} />
      </div>

      <FilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        minDiscount={minDiscount}
        onMinDiscountChange={setMinDiscount}
        discountOptions={['0%+', '10%+', '25%+', '50%+', '70%+']}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        priceRangeMin={0}
        priceRangeMax={maxDealPrice}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onlyActive={onlyActive}
        onOnlyActiveChange={setOnlyActive}
      />

      <DealGrid deals={filteredDeals} nowMs={nowMs} />
      <TopDealsSection />
    </main>
  )
}

export default Deals
