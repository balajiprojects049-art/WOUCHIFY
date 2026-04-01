import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CouponCard from '../components/CouponCard'
import StoreFilterBar from '../components/StoreFilterBar'
import { useData } from '../context/DataContext'
import { resolveStoreLogoUrl } from '../utils/storeLogo'


function StoreDetail() {
  const { storeName } = useParams()
  const { stores } = useData()
  const store = (stores || []).find(s => s.slug === (storeName || '').toLowerCase())

  const [searchText, setSearchText] = useState('')
  const [offerType, setOfferType] = useState('All')
  const [minDiscount, setMinDiscount] = useState('10%+')
  const [sortBy, setSortBy] = useState('Latest')
  const [logoBroken, setLogoBroken] = useState(false)

  const storeLogoUrl = useMemo(() => resolveStoreLogoUrl(store), [store])

  const filteredOffers = useMemo(() => {
    if (!store) return []

    const threshold = Number.parseInt(minDiscount.replace('%+', ''), 10)

    const filtered = (store.offers || []).filter((offer) => {
      const isExpired = offer.expiryDays < 0
      const normalizedType = isExpired ? 'Expired' : offer.type === 'coupon' ? 'Coupons' : 'Deals'
      const matchesType = offerType === 'All' || normalizedType === offerType
      const matchesDiscount = Number.isNaN(threshold) || offer.discountValue >= threshold
      const query = searchText.trim().toLowerCase()
      const matchesSearch = !query || offer.title.toLowerCase().includes(query) || offer.description.toLowerCase().includes(query)

      return matchesType && matchesDiscount && matchesSearch
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'Popular') return b.popularity - a.popularity
      if (sortBy === 'Expiring Soon') return a.expiryDays - b.expiryDays
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [store, searchText, offerType, minDiscount, sortBy])

  if (!store) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-ink">Store not found</h1>
          <p className="mt-2 text-sm text-muted">This store page does not exist yet.</p>
          <Link to="/stores" className="mt-4 inline-flex rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-cream">
            Browse Stores
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            {storeLogoUrl && !logoBroken ? (
              <img src={storeLogoUrl} alt={store.name} className="h-14 w-14 rounded-full object-cover" onError={() => setLogoBroken(true)} />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold">
                {store.logoText || (store.name || '').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-ink">{store.name}</h1>
              <p className="mt-1 text-sm font-semibold text-gold">{store.cashback}</p>
              <p className="mt-2 max-w-2xl text-sm text-muted">{store.description}</p>
            </div>
          </div>

          {store.website && (
            <a
              href={store.website}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105"
            >
              Visit Store
            </a>
          )}
        </div>
      </section>

      <StoreFilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        offerType={offerType}
        onOfferTypeChange={setOfferType}
        minDiscount={minDiscount}
        onMinDiscountChange={setMinDiscount}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredOffers.map((offer) => (
          <CouponCard key={offer.id} store={store} offer={offer} />
        ))}

        {filteredOffers.length === 0 && (
          <article className="rounded-2xl border border-line bg-white p-8 text-center text-sm font-medium text-muted sm:col-span-2 lg:col-span-4">
            {(store.offers || []).length === 0
              ? 'No offers have been added to this store yet.'
              : 'No offers found. Try changing the filters.'}
          </article>
        )}
      </section>
    </main>
  )
}

export default StoreDetail
