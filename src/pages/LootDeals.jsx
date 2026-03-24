import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import LootDealCard from '../components/LootDealCard'
import { lootDealsData } from '../data/lootDealsData'

function parseDiscount(value) {
  return Number.parseInt((value || '').replace('%+', ''), 10)
}

function LootDeals() {
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const [minDiscount, setMinDiscount] = useState('50%+')
  const [sortBy, setSortBy] = useState('Most Popular')

  const filteredDeals = useMemo(() => {
    const minDiscountValue = parseDiscount(minDiscount)

    const filtered = lootDealsData.filter((deal) => {
      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || deal.title.toLowerCase().includes(query) || deal.category.toLowerCase().includes(query)
      const matchesCategory = category === 'All' || deal.category === category
      const matchesDiscount = Number.isNaN(minDiscountValue) || deal.discountPercent >= minDiscountValue

      return matchesSearch && matchesCategory && matchesDiscount
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
  }, [category, minDiscount, searchText, sortBy])

  return (
    <main>
      <section className="mx-auto mt-6 max-w-7xl rounded-b-3xl bg-gradient-to-r from-[#0B1F3A] to-[#1E3A8A] px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">🔥 Loot Deals – Grab Before They&apos;re Gone!</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
          Ultra high-discount deals with limited time availability.
        </p>
        <p className="mt-2 text-sm font-semibold text-red-200">Deals disappear fast. Act quickly.</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <FilterBar
          searchText={searchText}
          onSearchChange={setSearchText}
          searchPlaceholder="Search loot deals..."
          category={category}
          onCategoryChange={setCategory}
          categoryOptions={['All', 'Electronics', 'Fashion', 'Accessories', 'Travel']}
          minDiscount={minDiscount}
          onMinDiscountChange={setMinDiscount}
          discountOptions={['50%+', '70%+', '80%+']}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOptions={['Most Popular', 'Highest Discount', 'Ending Soon']}
          showPriceRange={false}
          showOnlyActive={false}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredDeals.map((deal) => (
            <LootDealCard key={deal.id} deal={deal} />
          ))}

          {filteredDeals.length === 0 && (
            <article className="rounded-2xl border border-line bg-white p-8 text-center text-sm font-medium text-muted sm:col-span-2 lg:col-span-4">
              No loot deals found for current filters.
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default LootDeals
