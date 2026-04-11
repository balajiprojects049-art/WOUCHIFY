const normalizeTitle = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const dealsData = [
  // Add your deals here
]

export function getDealBySlug(slug) {
  return dealsData.find((deal) => deal.slug === slug)
}

export function getDealPathByTitle(title) {
  const normalizedTitle = normalizeTitle(title)
  const matchedDeal = dealsData.find((deal) => deal.slug === normalizedTitle || normalizeTitle(deal.title) === normalizedTitle)
  return matchedDeal ? `/deal/${matchedDeal.slug}` : '/deals'
}
