import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import StoreCard from '../components/StoreCard'
import SearchBar from '../components/SearchBar'
import { storeCategories, storesData } from '../data/storesData'

const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

function Stores() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const queryParam = searchParams.get('q') || ''
    setQuery(queryParam)
  }, [searchParams])

  const handleQueryChange = (value) => {
    setQuery(value)
    const next = new URLSearchParams(searchParams)

    if (value.trim()) {
      next.set('q', value)
    } else {
      next.delete('q')
    }

    setSearchParams(next, { replace: true })
  }

  const filteredStores = useMemo(() => {
    return storesData.filter((store) => {
      const matchesSearch = !query.trim() || store.name.toLowerCase().includes(query.trim().toLowerCase())
      const matchesLetter = selectedLetter === 'All' || store.name.toUpperCase().startsWith(selectedLetter)
      const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory

      return matchesSearch && matchesLetter && matchesCategory
    })
  }, [query, selectedLetter, selectedCategory])

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <PageBanner
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
        alt="Stores banner"
        href="https://www.myntra.com"
      />

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <SearchBar value={query} onChange={handleQueryChange} placeholder="Search store name" className="min-w-[260px] flex-1" />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-10 rounded-xl border border-line bg-cream px-3 text-sm font-semibold text-ink focus:outline-none"
          >
            {storeCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                selectedLetter === letter ? 'bg-navy text-white' : 'bg-cream text-ink hover:bg-gold/20'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStores.map((store) => (
          <StoreCard key={store.slug} store={store} />
        ))}

        {filteredStores.length === 0 && (
          <article className="rounded-2xl border border-line bg-white p-6 text-center text-sm font-medium text-muted sm:col-span-2 lg:col-span-3 xl:col-span-4">
            No stores found for your current filters.
          </article>
        )}
      </section>
    </main>
  )
}

export default Stores
