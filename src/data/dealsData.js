const normalizeTitle = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const dealsData = [
  {
    id: "d1",
    slug: "apple-macbook-air-m2-sale",
    title: "Apple MacBook Air M2 - Flat ₹15000 OFF",
    description: "Get the latest Apple MacBook Air M2 at a massive discount with HDFC bank cards.",
    newPrice: "₹84,900",
    oldPrice: "₹99,900",
    discountPercent: 15,
    category: "Laptops",
    store: "Amazon",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 243,
    urgency: "Ending Soon",
    publishAt: new Date(Date.now() - 100000).toISOString()
  },
  {
    id: "d2",
    slug: "nike-air-max-shoes-discount",
    title: "Nike Air Max Sneakers - Min 40% OFF",
    description: "Upgrade your kicks with the latest Nike Air Max running shoes.",
    newPrice: "₹4,999",
    oldPrice: "₹8,499",
    discountPercent: 41,
    category: "Fashion",
    store: "Myntra",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviews: 890,
    publishAt: new Date(Date.now() - 200000).toISOString()
  },
  {
    id: "d3",
    slug: "sony-wh-1000xm4-headphones",
    title: "Sony WH-1000XM4 Noise Cancelling Headphones",
    description: "Industry leading active noise cancellation headphones with multi-device pairing.",
    newPrice: "₹19,990",
    oldPrice: "₹29,990",
    discountPercent: 33,
    category: "Electronics",
    store: "Flipkart",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 1500,
    urgency: "Hot Deal",
    publishAt: new Date(Date.now() - 300000).toISOString()
  }
]

export function getDealBySlug(slug) {
  return dealsData.find((deal) => deal.slug === slug)
}

export function getDealPathByTitle(title) {
  const normalizedTitle = normalizeTitle(title)
  const matchedDeal = dealsData.find((deal) => deal.slug === normalizedTitle || normalizeTitle(deal.title) === normalizedTitle)
  return matchedDeal ? `/deal/${matchedDeal.slug}` : '/deals'
}
