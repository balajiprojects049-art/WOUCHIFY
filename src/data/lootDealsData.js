export const lootDealsData = [
  // Add your loot deals here
]

export function getLootDealBySlug(slug) {
  return lootDealsData.find((deal) => deal.slug === slug)
}
