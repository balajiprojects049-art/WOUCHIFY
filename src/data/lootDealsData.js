export const lootDealsData = [
  {
    id: "ld1",
    slug: "samsung-galaxy-s24-ultra-loot",
    title: "Samsung Galaxy S24 Ultra - Price Error Loot!",
    description: "Insane price drop due to a coupon glitch. Grab it before it gets cancelled!",
    newPrice: "₹89,999",
    oldPrice: "₹1,29,999",
    discountPercent: 30,
    category: "Mobiles",
    store: "Amazon",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 1205,
    urgency: "Expiring Soon",
    expiresInSeconds: 3600,
    popularity: 99,
    publishAt: new Date(Date.now() - 50000).toISOString()
  },
  {
    id: "ld2",
    slug: "levis-jeans-flat-80-off",
    title: "Levi's Men Jeans Flat 80% OFF Loot",
    description: "Massive clearance sale on Levi's apparel. Stock out fast!",
    newPrice: "₹599",
    oldPrice: "₹2,999",
    discountPercent: 80,
    category: "Fashion",
    store: "Flipkart",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    reviews: 450,
    urgency: "Hot Loot",
    expiresInSeconds: 7200,
    popularity: 95,
    publishAt: new Date(Date.now() - 100000).toISOString()
  },
  {
    id: "ld3",
    slug: "boat-airdopes-141-loot",
    title: "boAt Airdopes 141 - Flash Sale",
    description: "Limited stock available for the next 2 hours. Use code BOATLOOT.",
    newPrice: "₹899",
    oldPrice: "₹4,490",
    discountPercent: 80,
    category: "Electronics",
    store: "Ajio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 3200,
    urgency: "Flash Sale",
    expiresInSeconds: 10800,
    popularity: 92,
    publishAt: new Date(Date.now() - 150000).toISOString()
  },
  {
    id: "ld4",
    slug: "myntra-puma-sneakers-loot",
    title: "Puma Sneakers Min 70% OFF",
    description: "Exclusive Myntra deal on Puma shoes. Sizes running out quickly.",
    newPrice: "₹1,299",
    oldPrice: "₹4,999",
    discountPercent: 74,
    category: "Footwear",
    store: "Myntra",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 800,
    urgency: "Almost Gone",
    expiresInSeconds: 1800,
    popularity: 98,
    publishAt: new Date(Date.now() - 200000).toISOString()
  }
]

export function getLootDealBySlug(slug) {
  return lootDealsData.find((deal) => deal.slug === slug)
}
