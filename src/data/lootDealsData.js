export const lootDealsData = [
  {
    id: 'loot-1',
    slug: 'iphone-15-mega-drop',
    title: 'iPhone 15 Mega Drop',
    category: 'Electronics',
    discountPercent: 50,
    oldPrice: '₹79,900',
    newPrice: '₹39,950',
    grabbed: '5k+',
    stockLabel: 'Only few left',
    urgency: 'Ending soon',
    expiresInSeconds: 6322,
    popularity: 98,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Limited iPhone drop with bundled exchange and cashback boosters.',
    steps: ['Open partner page', 'Select eligible variant', 'Apply available checkout offer', 'Confirm purchase quickly'],
    terms: 'Limited stock campaign. Final price may vary by payment option and location.',
  },
]

export function getLootDealBySlug(slug) {
  return lootDealsData.find((deal) => deal.slug === slug)
}
