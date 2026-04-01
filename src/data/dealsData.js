const normalizeTitle = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const dealsData = [
  {
    slug: 'macbook-air-m3',
    title: 'MacBook Air M3',
    store: 'Amazon',
    category: 'Electronics',
    discountLabel: 'Save 18%',
    discountValue: 18,
    type: 'deal',
    price: '₹1,04,900',
    priceValue: 104900,
    usageCount: '2.9k',
    expiresInSeconds: 7200,
    successRate: 91,
    expiry: 'Expires in 2 days',
    badge: 'HOT',
    code: '',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium laptop deal with limited stock and instant bank discounts.',
    terms: 'Valid on selected variants only. Bank terms apply. Stock subject to availability.',
    steps: ['Open deal link', 'Choose eligible variant', 'Complete checkout with available offers'],
    createdAt: '2026-03-20T10:00:00Z',
    highlights: ['M3 chipset performance', 'Instant card offer', 'Premium build quality'],
  },
]

export function getDealBySlug(slug) {
  return dealsData.find((deal) => deal.slug === slug)
}

export function getDealPathByTitle(title) {
  const normalizedTitle = normalizeTitle(title)
  const matchedDeal = dealsData.find((deal) => deal.slug === normalizedTitle || normalizeTitle(deal.title) === normalizedTitle)

  return matchedDeal ? `/deal/${matchedDeal.slug}` : '/deals'
}
