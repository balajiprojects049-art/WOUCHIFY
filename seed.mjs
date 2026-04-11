// ── Wouchify Full-Module Seed Script ──────────────────────────────────────────
// Populates ALL modules with 2 sample entries each via /api/sync
// Run: node seed.mjs

const API = 'http://localhost:5000'

function id(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2)
}

const now = new Date().toISOString()

// ── 1. DEALS ─────────────────────────────────────────────────────────────────
const deals = [
  {
    slug: 'samsung-galaxy-s24-ultra-amazon',
    title: 'Samsung Galaxy S24 Ultra – Amazon Deal',
    store: 'Amazon India',
    category: 'Electronics',
    discountLabel: 'Save ₹12,000',
    discountValue: 13,
    type: 'deal',
    price: '₹79,999',
    priceValue: 79999,
    usageCount: '4.2k',
    expiresInSeconds: 86400,
    successRate: 92,
    expiry: 'Expires in 24 hours',
    badge: 'HOT',
    code: '',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    description: 'Grab the Samsung Galaxy S24 Ultra at a massive discount exclusively on Amazon India. Limited stock available — hurry before it sells out!',
    terms: 'Valid on selected variants only. Subject to stock availability.',
    steps: ['Visit Amazon India', "Search 'Samsung Galaxy S24 Ultra'", 'Add to cart', 'Discount applies automatically at checkout'],
    highlights: ['200MP ProVisual Camera', 'Built-in S Pen', 'Titanium Frame', '12GB RAM + 256GB Storage', 'Free Amazon Prime delivery'],
    createdAt: now,
  },
  {
    slug: 'boat-airdopes-141-flipkart',
    title: 'boAt Airdopes 141 TWS – Flipkart Flash Sale',
    store: 'Flipkart',
    category: 'Electronics',
    discountLabel: 'Save 50%',
    discountValue: 50,
    type: 'deal',
    price: '₹799',
    priceValue: 799,
    usageCount: '12k',
    expiresInSeconds: 43200,
    successRate: 95,
    expiry: 'Expires in 12 hours',
    badge: 'FLASH',
    code: '',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
    description: 'boAt Airdopes 141 with 42-hour playback at just ₹799. Best-selling TWS earbuds at half price — grab them before stock ends!',
    terms: 'Flash sale price valid while stock lasts. One per account.',
    steps: ['Go to Flipkart', "Search 'boAt Airdopes 141'", 'Click Buy Now', 'Complete payment — no code needed'],
    highlights: ['42 Hours Total Playback', 'BEAST Mode for Gaming', 'IPX4 Water Resistant', 'Instant Auto-Connect', 'Fast Charge Support'],
    createdAt: now,
  },
]

// ── 2. LOOT DEALS ────────────────────────────────────────────────────────────
const lootDeals = [
  {
    id: id('ld'),
    slug: 'fire-boltt-ninja-pro-loot',
    title: 'Fire-Boltt Ninja Pro Smartwatch – 80% OFF Loot',
    category: 'Electronics',
    discountPercent: 80,
    oldPrice: '₹4,999',
    newPrice: '₹999',
    grabbed: '8.5k',
    stockLabel: 'Only 47 left!',
    urgency: 'Ending in 3 hours — grab it now!',
    expiresInSeconds: 10800,
    popularity: 96,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Massive loot! Get the Fire-Boltt Ninja Pro smartwatch for just ₹999 — 80% off the MRP. Stock is critically low!',
    steps: ['Click Grab Deal button', 'Sign in to Amazon', 'Add to cart immediately', 'Discount auto-applies at checkout'],
    terms: 'Valid while stock lasts. One per customer account.',
  },
  {
    id: id('ld'),
    slug: 'wildcraft-backpack-myntra-loot',
    title: 'Wildcraft 30L Laptop Backpack – 75% OFF Loot',
    category: 'Fashion',
    discountPercent: 75,
    oldPrice: '₹3,199',
    newPrice: '₹799',
    grabbed: '3.1k',
    stockLabel: 'Selling fast!',
    urgency: 'Limited time offer — hurry!',
    expiresInSeconds: 21600,
    popularity: 88,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Premium Wildcraft laptop backpack with waterproof material and USB port at just ₹799. Best loot deal of the week on Myntra!',
    steps: ['Visit Myntra', "Search 'Wildcraft 30L Backpack'", 'Select your colour', 'Apply code at checkout or direct deal price applies'],
    terms: 'Valid on selected colours. Subject to Myntra sale terms.',
  },
]

// ── 3. STORES ────────────────────────────────────────────────────────────────
const stores = [
  {
    slug: 'amazon-india',
    name: 'Amazon India',
    category: 'Shopping',
    logoText: 'AM',
    logo: '',
    cashback: 'Up to 5% cashback on all orders',
    highlight: "India's largest online marketplace with millions of products",
    description: "Amazon India is the country's largest e-commerce platform offering electronics, fashion, groceries, books, and more. Shop from top brands with Prime delivery and exclusive daily deals.",
    website: 'https://www.amazon.in',
    offers: ['10% instant discount on SBI cards', 'Free Prime delivery on eligible orders', 'No-cost EMI available'],
  },
  {
    slug: 'flipkart',
    name: 'Flipkart',
    category: 'Shopping',
    logoText: 'FK',
    logo: '',
    cashback: 'Up to 6% cashback via Wouchify',
    highlight: 'Big Billion Days and exclusive flash sales',
    description: "Flipkart is India's homegrown e-commerce giant known for electronics, fashion, furniture and daily essentials. Famous for Big Billion Days sales offering jaw-dropping discounts across all categories.",
    website: 'https://www.flipkart.com',
    offers: ['Extra 5% off on Flipkart Axis Bank Card', 'No-cost EMI on 100+ products', 'SuperCoins on every purchase'],
  },
]

// ── 4. COUPONS ───────────────────────────────────────────────────────────────
const coupons = [
  {
    id: id('cp'),
    store: 'Amazon India',
    code: 'SAVE200',
    discount: '₹200 OFF on orders above ₹999',
    category: 'All Categories',
    expiry: 'Expires in 5 days',
    minOrder: '₹999',
    success: '94%',
    badge: 'HOT',
    active: true,
  },
  {
    id: id('cp'),
    store: 'Myntra',
    code: 'MYNTRA30',
    discount: '30% OFF on fashion & lifestyle',
    category: 'Fashion & Lifestyle',
    expiry: 'Expires in 3 days',
    minOrder: '₹799',
    success: '88%',
    badge: 'TRENDING',
    active: true,
  },
]

// ── 5. GIVEAWAYS ─────────────────────────────────────────────────────────────
const giveaways = [
  {
    id: id('gw'),
    prize: 'Apple iPhone 15 Pro Max 256GB',
    value: '₹1,59,900',
    entries: '24,320',
    endsIn: '3 days',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    tag: 'MEGA',
    color: 'from-midnight to-navy',
    active: true,
  },
  {
    id: id('gw'),
    prize: 'Sony WH-1000XM5 Headphones',
    value: '₹29,990',
    entries: '8,750',
    endsIn: '1 day',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    tag: 'HOT',
    color: 'from-emerald-900 to-teal-900',
    active: true,
  },
]

// ── 6. CREDIT CARDS ──────────────────────────────────────────────────────────
const creditCards = {
  shopping: [
    {
      id: id('cc'),
      bank: 'HDFC BANK',
      card: 'Millennia Credit Card',
      cashback: '5% Cashback on Amazon, Flipkart & Myntra',
      partners: 'Amazon • Flipkart • Myntra • Swiggy • Zomato',
      rewards: 'Flat ₹1,000 Amazon Voucher on joining',
      type: 'shopping',
      cardImage: '',
      active: true,
    },
    {
      id: id('cc'),
      bank: 'AXIS BANK',
      card: 'Flipkart Axis Bank Card',
      cashback: 'Up to 7.5% Cashback on top merchants',
      partners: 'Flipkart • Myntra • Swiggy • Uber • PVR',
      rewards: 'Welcome benefits worth ₹1,400',
      type: 'shopping',
      cardImage: '',
      active: true,
    },
  ],
  lifetime: [
    {
      id: id('cc'),
      bank: 'SBI CARD',
      card: 'SimplyCLICK Card',
      cashback: '10X Reward Points on online spend',
      partners: 'Amazon • BookMyShow • Cleartrip • Lenskart',
      rewards: 'Lifetime Free — ₹500 Amazon e-voucher on joining',
      type: 'lifetime',
      cardImage: '',
      active: true,
    },
    {
      id: id('cc'),
      bank: 'IDFC FIRST BANK',
      card: 'FIRST Millenia Card',
      cashback: 'Up to 10X Reward Points on online & offline spends',
      partners: 'EMI at 500+ brands • Dining offers • Movie discounts',
      rewards: 'Lifetime Free — No annual fee ever',
      type: 'lifetime',
      cardImage: '',
      active: true,
    },
  ],
}

// ── 7. ADVERTISEMENTS ────────────────────────────────────────────────────────
const advertisements = [
  {
    id: id('ad'),
    title: 'Amazon Great Indian Festival Sale',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    link: 'https://www.amazon.in',
    position: 'global_top',
    active: true,
    createdAt: now,
  },
  {
    id: id('ad'),
    title: 'Flipkart Big Billion Days Banner',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80',
    link: 'https://www.flipkart.com',
    position: 'deals_grid',
    active: true,
    createdAt: now,
  },
]

// ── 8. BANNERS ───────────────────────────────────────────────────────────────
const banners = {
  home: [
    {
      id: 'hb1',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
      label: '🔥 Exclusive Deals',
      title: 'Discover the Best Deals in India',
      description: 'Handpicked coupons, loot deals and cashback offers updated every day.',
      link: '/deals',
      active: true,
    },
    {
      id: 'hb2',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      label: '⚡ Flash Savings',
      title: 'Up to 80% OFF — Limited Time Only',
      description: 'Flash deals updated hourly. Save big on electronics, fashion and more.',
      link: '/loot-deals',
      active: true,
    },
  ],
  deals: [
    {
      id: 'db1',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
      label: 'Top Picks',
      title: 'Best Deals Today',
      description: 'All verified deals updated in real-time.',
      link: '/deals',
      active: true,
    },
    {
      id: 'db2',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      label: '🛍️ Weekend Sale',
      title: 'Weekend Deals — Extra 20% OFF',
      description: 'Special weekend deals across all categories. Don\'t miss out!',
      link: '/deals',
      active: true,
    },
  ],
  lootDeals: [
    {
      id: 'lb1',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
      label: '⚡ Loot Deals',
      title: 'Flash Prices — Grab Fast!',
      description: 'Limited-time loot deals before they expire.',
      link: '/loot-deals',
      active: true,
    },
    {
      id: 'lb2',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      label: '🎯 Today\'s Loot',
      title: 'Prices So Low — They\'re Almost Free!',
      description: 'Grab these insane loot deals before they\'re gone forever.',
      link: '/loot-deals',
      active: true,
    },
  ],
  stores: [
    {
      id: 'sb1',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      label: 'Top Stores',
      title: 'Shop at 100+ Verified Stores',
      description: 'Exclusive coupons from all your favourite Indian stores.',
      link: '/stores',
      active: true,
    },
  ],
  coupons: [
    {
      id: 'cb1',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
      label: 'Exclusive Coupons',
      title: 'Save Big With Verified Codes',
      description: 'Hand-picked coupon codes — all verified and ready to use.',
      link: '/coupons',
      active: true,
    },
    {
      id: 'cb2',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      label: '💰 Mega Savings',
      title: 'Extra 30% OFF With These Codes',
      description: 'Freshly added coupon codes across fashion, food, travel & more.',
      link: '/coupons',
      active: true,
    },
  ],
  creditCards: [
    {
      id: 'ccb1',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80',
      label: '💳 Card Offers',
      title: 'Best Credit Cards for Cashback',
      description: "Earn rewards on every purchase with India's top credit cards.",
      link: '/credit-cards',
      active: true,
    },
    {
      id: 'ccb2',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      label: '🏆 Lifetime Free Cards',
      title: 'Zero Annual Fee — Maximum Rewards',
      description: 'Lifetime free credit cards with best-in-class rewards and cashback.',
      link: '/credit-cards',
      active: true,
    },
  ],
  giveaways: [
    {
      id: 'gb1',
      image: 'https://images.unsplash.com/photo-1630450202872-e0829c9d6172?auto=format&fit=crop&w=1200&q=80',
      label: '🏆 Weekly Giveaway',
      title: 'Win Premium Gadgets Worth ₹1,59,900',
      description: 'Enter our weekly draw for a chance to win the latest iPhone 15 Pro Max.',
      link: '/giveaways',
      active: true,
    },
    {
      id: 'gb2',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
      label: '🎁 Free Entry',
      title: 'Enter to Win — 100% Free!',
      description: 'No purchase necessary. Just enter and win premium prizes every week.',
      link: '/giveaways',
      active: true,
    },
  ],
  privacyPolicy: [
    {
      id: 'ppb1',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      label: 'Privacy First',
      title: 'Your Data Is Safe With Us',
      description: 'We are committed to full transparency about how we collect and use your information.',
      link: '/privacy-policy',
      active: true,
    },
  ],
  termsOfUse: [
    {
      id: 'tob1',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      label: 'Terms & Conditions',
      title: 'Rules That Protect You',
      description: 'Clear, fair terms designed to ensure the best experience for every Wouchify user.',
      link: '/terms',
      active: true,
    },
  ],
}

// ── 9. ADMIN SETTINGS ────────────────────────────────────────────────────────
const adminSettings = {
  siteName: 'Wouchify Admin',
  supportEmail: 'admin@wouchify.com',
  timezone: 'Asia/Kolkata',
  avatar: '',
}

// ── 10. ADMIN MEMBERS ────────────────────────────────────────────────────────
const adminMembers = [
  { id: 'am1', name: 'Admin User', email: 'admin@wouchify.com', role: 'Owner', active: true },
  { id: 'am2', name: 'Content Manager', email: 'content@wouchify.com', role: 'Editor', active: true },
]

// ── 11. AUDIT LOG ────────────────────────────────────────────────────────────
const auditLog = [
  {
    id: id(),
    timestamp: now,
    actor: 'Admin',
    action: 'CREATE',
    entity: 'Deal',
    detail: 'Created deal "Samsung Galaxy S24 Ultra – Amazon Deal"',
  },
  {
    id: id(),
    timestamp: now,
    actor: 'Admin',
    action: 'CREATE',
    entity: 'Store',
    detail: 'Created store "Amazon India"',
  },
]

// ── 12. ANALYTICS ────────────────────────────────────────────────────────────
const analytics = {
  dealClicks: {
    'samsung-galaxy-s24-ultra-amazon': 142,
    'boat-airdopes-141-flipkart': 87,
  },
  couponCopies: {},
  pageViews: {
    '/': 560,
    '/deals': 320,
    '/coupons': 185,
    '/stores': 98,
    '/loot-deals': 74,
    '/giveaways': 52,
    '/credit-cards': 43,
  },
}

// ── SYNC PAYLOAD ──────────────────────────────────────────────────────────────
const payload = {
  deals,
  lootDeals,
  stores,
  coupons,
  giveaways,
  creditCards,
  advertisements,
  banners,
  adminSettings,
  adminMembers,
  auditLog,
  analytics,
}

// ── RUN ───────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱 Wouchify Seed Script — Populating all modules...\n')

  // Verify server is up
  try {
    const ping = await fetch(`${API}/api/data`)
    if (!ping.ok) throw new Error(`Server responded with ${ping.status}`)
    const pingData = await ping.json()
    if (!pingData.isConnected) {
      console.error('❌ Server is running but DATABASE is NOT connected.\n   Make sure DATABASE_URL is set in your .env file.')
      process.exit(1)
    }
    console.log('✅ Server + Database confirmed connected.\n')
  } catch (err) {
    console.error('❌ Cannot reach server at', API)
    console.error('   Make sure server.js is running: node server.js')
    console.error('   Error:', err.message)
    process.exit(1)
  }

  // Count items being seeded
  const counts = {
    'Deals': deals.length,
    'Loot Deals': lootDeals.length,
    'Stores': stores.length,
    'Coupons': coupons.length,
    'Giveaways': giveaways.length,
    'Credit Cards (Shopping)': creditCards.shopping.length,
    'Credit Cards (Lifetime)': creditCards.lifetime.length,
    'Advertisements': advertisements.length,
    'Home Banners': banners.home.length,
    'Deals Banners': banners.deals.length,
    'Loot Deals Banners': banners.lootDeals.length,
    'Coupons Banners': banners.coupons.length,
    'Credit Cards Banners': banners.creditCards.length,
    'Giveaways Banners': banners.giveaways.length,
    'Admin Members': adminMembers.length,
    'Audit Log Entries': auditLog.length,
  }

  console.log('📦 Data to seed:')
  for (const [module, count] of Object.entries(counts)) {
    console.log(`   ${module.padEnd(30)} ${count} entries`)
  }
  console.log()

  // POST to /api/sync
  try {
    const res = await fetch(`${API}/api/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`HTTP ${res.status}: ${err}`)
    }

    const result = await res.json()

    if (result.success) {
      console.log('✅ SUCCESS — All modules seeded to database!\n')
      console.log('📋 Summary:')
      console.log('   ✓ Deals            — 2 deals added')
      console.log('   ✓ Loot Deals       — 2 loot deals added')
      console.log('   ✓ Stores           — 2 stores added')
      console.log('   ✓ Coupons          — 2 coupons added')
      console.log('   ✓ Giveaways        — 2 giveaways added')
      console.log('   ✓ Credit Cards     — 2 shopping + 2 lifetime cards added')
      console.log('   ✓ Advertisements   — 2 ads added')
      console.log('   ✓ Banners          — 2 home + page banners added')
      console.log('   ✓ Admin Members    — 2 members added')
      console.log('   ✓ Analytics        — Seed data added')
      console.log('\n🎉 Visit http://localhost:5173 to see the user panel populated!')
      console.log('   Admin panel: http://localhost:5173/admin\n')
    } else {
      console.error('❌ Sync failed:', result)
    }
  } catch (err) {
    console.error('❌ Sync error:', err.message)
    process.exit(1)
  }
}

seed()
