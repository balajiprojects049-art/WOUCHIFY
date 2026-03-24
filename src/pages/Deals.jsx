import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DealGrid from '../components/DealGrid'
import FilterBar from '../components/FilterBar'
import PageBanner from '../components/PageBanner'
import { dealsData } from '../data/dealsData'

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
  const [searchParams] = useSearchParams()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const [minDiscount, setMinDiscount] = useState('10%+')
  const [priceRange, setPriceRange] = useState(2000)
  const [sortBy, setSortBy] = useState('Trending')
  const [onlyActive, setOnlyActive] = useState(true)

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchText(query)
  }, [searchParams])

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const filteredDeals = useMemo(() => {
    const minDiscountValue = parseDiscount(minDiscount)

    const filtered = dealsData.filter((deal) => {
      const remainingSeconds = deal.expiresInSeconds - elapsedSeconds
      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || deal.title.toLowerCase().includes(query) || deal.store.toLowerCase().includes(query)
      const matchesCategory = category === 'All' || deal.category === category
      const matchesDiscount = Number.isNaN(minDiscountValue) || deal.discountValue >= minDiscountValue
      const matchesPriceRange = deal.priceValue <= priceRange
      const matchesActive = !onlyActive || remainingSeconds > 0

      return matchesSearch && matchesCategory && matchesDiscount && matchesPriceRange && matchesActive
    })

    return filtered.sort((first, second) => {
      const firstRemaining = first.expiresInSeconds - elapsedSeconds
      const secondRemaining = second.expiresInSeconds - elapsedSeconds

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
  }, [category, elapsedSeconds, minDiscount, onlyActive, priceRange, searchText, sortBy])

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <PageBanner
        image="https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
        alt="Deals banner"
        href="https://www.amazon.in/gp/goldbox"
      />

      <FilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        minDiscount={minDiscount}
        onMinDiscountChange={setMinDiscount}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onlyActive={onlyActive}
        onOnlyActiveChange={setOnlyActive}
      />

      <DealGrid deals={filteredDeals} elapsedSeconds={elapsedSeconds} />
    </main>
  )
}

export default Deals
