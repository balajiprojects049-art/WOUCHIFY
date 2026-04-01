export const storesData = [
  {
    slug: 'amazon',
    name: 'Amazon',
    category: 'Electronics',
    logoText: 'AM',
    cashback: 'Up to 6.2% rewards',
    highlight: '5000+ live deals and coupons',
    description: 'Get verified electronics, fashion, and home coupons with high success rates.',
    website: 'https://www.amazon.in',
    offers: [
      {
        id: 'am-1',
        type: 'coupon',
        badge: '50% OFF',
        title: 'Up to 50% off on electronics accessories',
        description: 'Applies on selected chargers, cables, and smart wearables.',
        expiryDays: 5,
        successRate: 92,
        code: 'AMZTECH50',
        terms: 'Valid on selected products. Max discount ₹1,200. One use per account.',
        steps: ['Open Amazon store page', 'Add eligible products', 'Apply coupon code at checkout'],
        discountValue: 50,
        popularity: 98,
        createdAt: '2026-03-22T10:00:00Z',
      },
      {
        id: 'am-2',
        type: 'deal',
        badge: 'EXCLUSIVE',
        title: 'Extra 20% cashback on Amazon Pay balance',
        description: 'Limited-time cashback for wallet and UPI payments.',
        expiryDays: 2,
        successRate: 89,
        code: '',
        terms: 'Cashback credited in 48 hours. Minimum cart value ₹999.',
        steps: ['Add items to cart', 'Choose Amazon Pay', 'Complete order to receive cashback'],
        discountValue: 20,
        popularity: 95,
        createdAt: '2026-03-24T08:30:00Z',
      },
    ],
  },
]

export const storeCategories = ['All', 'Fashion', 'Electronics', 'Travel', 'Beauty']

export function getStoreBySlug(storeSlug) {
  return storesData.find((store) => store.slug === storeSlug)
}

export function getStorePathByName(storeName) {
  if (!storeName) {
    return '/stores'
  }

  const normalizedName = storeName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const matchedStore = storesData.find((store) => {
    const normalizedStoreName = store.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return store.slug === normalizedName || normalizedStoreName === normalizedName
  })

  return matchedStore ? `/store/${matchedStore.slug}` : '/stores'
}
