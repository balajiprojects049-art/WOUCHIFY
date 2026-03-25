import { createContext, useContext, useEffect, useState } from 'react'
import { dealsData } from '../data/dealsData'
import { lootDealsData } from '../data/lootDealsData'
import { storesData } from '../data/storesData'

// ── Default Coupons ──────────────────────────────────────────────────────────
const defaultCoupons = [
  { id: 'c1', store: 'Amazon India', code: 'AMAZON10', discount: '10% OFF', category: 'All Categories', expiry: 'Expires in 3 days', minOrder: '₹499', success: '96%', badge: 'HOT', active: true },
  { id: 'c2', store: 'Flipkart', code: 'FLIP15', discount: '15% OFF', category: 'Electronics', expiry: 'Expires in 2 days', minOrder: '₹999', success: '91%', badge: 'POPULAR', active: true },
  { id: 'c3', store: 'Myntra', code: 'MYNTRA20', discount: '20% OFF', category: 'Fashion & Lifestyle', expiry: 'Expires in 5 days', minOrder: '₹799', success: '89%', badge: 'NEW', active: true },
  { id: 'c4', store: 'Swiggy', code: 'SWIGGY100', discount: '₹100 OFF', category: 'Food Delivery', expiry: 'Expires today', minOrder: '₹299', success: '93%', badge: 'ENDING SOON', active: true },
  { id: 'c5', store: 'Zomato', code: 'ZOMATO50', discount: '₹50 OFF', category: 'Food Delivery', expiry: 'Expires in 4 days', minOrder: '₹199', success: '88%', badge: 'TRENDING', active: true },
  { id: 'c6', store: 'Nykaa', code: 'NYKAA25', discount: '25% OFF', category: 'Beauty & Health', expiry: 'Expires in 6 days', minOrder: '₹599', success: '87%', badge: 'EXCLUSIVE', active: true },
  { id: 'c7', store: 'Ajio', code: 'AJIO30', discount: '30% OFF', category: 'Fashion', expiry: 'Expires in 1 day', minOrder: '₹999', success: '84%', badge: 'FLASH', active: true },
  { id: 'c8', store: 'Meesho', code: 'MEESHO12', discount: '12% OFF', category: 'Shopping', expiry: 'Expires in 7 days', minOrder: '₹299', success: '82%', badge: 'NEW', active: true },
  { id: 'c9', store: 'MakeMyTrip', code: 'MMT500', discount: '₹500 OFF', category: 'Travel', expiry: 'Expires in 2 days', minOrder: '₹3,999', success: '79%', badge: 'TRAVEL', active: true },
]

// ── Default Giveaways ────────────────────────────────────────────────────────
const defaultGiveaways = [
  { id: 'g1', prize: 'Apple iPhone 15 Pro Max', value: '₹1,59,900', entries: '12,450', endsIn: '2 days', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', tag: 'MEGA', color: 'from-midnight to-navy', active: true },
  { id: 'g2', prize: 'Sony WH-1000XM5 Headphones', value: '₹29,990', entries: '8,320', endsIn: '4 days', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', tag: 'HOT', color: 'from-gold to-[#c9940a]', active: true },
  { id: 'g3', prize: 'Samsung Galaxy Watch 6', value: '₹34,999', entries: '6,100', endsIn: '5 days', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', tag: 'NEW', color: 'from-slate-800 to-slate-700', active: true },
  { id: 'g4', prize: 'ASUS ROG Gaming Laptop', value: '₹89,990', entries: '4,800', endsIn: '7 days', image: 'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?auto=format&fit=crop&w=800&q=80', tag: 'JACKPOT', color: 'from-red-900 to-red-800', active: true },
  { id: 'g5', prize: 'Nike Air Jordan Bundle', value: '₹18,500', entries: '9,700', endsIn: '3 days', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', tag: 'TRENDING', color: 'from-orange-800 to-orange-700', active: true },
  { id: 'g6', prize: 'Boat Airdopes + Smartwatch', value: '₹8,998', entries: '14,200', endsIn: '1 day', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', tag: 'ENDING SOON', color: 'from-purple-900 to-purple-800', active: true },
]

// ── Default Credit Cards ─────────────────────────────────────────────────────
const defaultCreditCards = {
  shopping: [
    { id: 'cc1', bank: 'AXIS BANK', card: 'Flipkart Card', cashback: 'Up to 7.5% Cashback', partners: 'Flipkart • Myntra • Uber • Cleartrip', rewards: 'Flat ₹1,400 Rewards', type: 'shopping', cardImage: '/axis-bank-cashback-credit-card.jpg', active: true },
    { id: 'cc2', bank: 'SBI CARD', card: 'Flipkart Card', cashback: 'Up to 7.5% Cashback', partners: 'Flipkart • Myntra • Cleartrip • Uber', rewards: 'Flat ₹1,400 Rewards', type: 'shopping', cardImage: '/axis-bank-cashback-credit-card.jpg', active: true },
    { id: 'cc3', bank: 'SBI CARD', card: 'Cashback Card', cashback: '5% Cashback on all online spends', partners: 'Amazon • Flipkart • Myntra • 1000+ stores', rewards: 'Flat ₹1,500 Rewards', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80', active: true },
    { id: 'cc4', bank: 'HDFC BANK', card: 'Millennia Card', cashback: '5% Cashback on top merchants', partners: 'Amazon • Myntra • Flipkart and more', rewards: 'Flat ₹1,100 Rewards', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80', active: true },
  ],
  lifetime: [
    { id: 'cc5', bank: 'AXIS BANK', card: 'MyZone Card', cashback: 'Save ₹2,800 On welcome benefits', partners: 'Movies • Dining • Shopping offers', rewards: 'Lifetime Free', type: 'lifetime', cardImage: '/axis-bank-cashback-credit-card.jpg', active: true },
    { id: 'cc6', bank: 'SCAPIA', card: 'Travel Card', cashback: 'No Forex Fee on international spends', partners: 'Flights • Hotels • Global merchants', rewards: 'Lifetime Free', type: 'lifetime', cardImage: '/axis-bank-cashback-credit-card.jpg', active: true },
    { id: 'cc7', bank: 'BOB CARD', card: 'Eterna Card', cashback: 'Premium lifestyle privileges', partners: 'Dining • Travel • Shopping', rewards: 'Lifetime Free', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=900&q=80', active: true },
    { id: 'cc8', bank: 'IDFC FIRST', card: 'Credit Card', cashback: 'Welcome offers and zero joining fee', partners: 'Fuel • Grocery • Online spends', rewards: 'Lifetime Free', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?auto=format&fit=crop&w=900&q=80', active: true },
  ],
}

// ── Default Banners (per page section) ────────────────────────────────────────
const defaultBanners = {
  home: [
    { id: 'hb1', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', label: '🔥 Exclusive Deals', title: 'Discover the Best Deals in India', description: 'Handpicked coupons, loot deals and cashback offers updated every day.', link: '/deals', active: true },
    { id: 'hb2', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80', label: '💳 Credit Card Offers', title: 'Earn More, Spend Less', description: 'Top credit card rewards and cashback deals for smart shoppers.', link: '/credit-cards', active: true },
  ],
  deals: [
    { id: 'db1', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', label: 'Top Picks', title: 'Best Deals Today', description: 'All verified deals updated in real-time.', link: '/deals', active: true },
  ],
  lootDeals: [
    { id: 'lb1', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', label: '⚡ Loot Deals', title: 'Flash Prices — Grab Fast!', description: 'Limited-time loot deals before they expire.', link: '/loot-deals', active: true },
  ],
  stores: [
    { id: 'sb1', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80', label: 'Top Stores', title: 'Shop at 100+ Verified Stores', description: 'Exclusive coupons from all your favourite Indian stores.', link: '/stores', active: true },
  ],
  coupons: [
    { id: 'cb1', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', label: 'Exclusive Coupons', title: 'Save Big With Verified Codes', description: 'Hand-picked coupon codes — all verified and ready to use.', link: '/coupons', active: true },
    { id: 'cb2', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80', label: 'Fresh Drops', title: 'New Coupons Added Daily', description: 'Fresh discounts verified every morning.', link: '/coupons', active: true },
  ],
  creditCards: [
    { id: 'ccb1', image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80', label: '💳 Card Offers', title: 'Best Credit Cards for Cashback', description: "Earn rewards on every purchase with India's top credit cards.", link: '/credit-cards', active: true },
  ],
  giveaways: [
    { id: 'gb1', image: 'https://images.unsplash.com/photo-1630450202872-e0829c9d6172?auto=format&fit=crop&w=1200&q=80', label: '🏆 Weekly Giveaway', title: 'Win Premium Gadgets Worth ₹50,000', description: 'Enter our weekly draw for a chance to win the latest smartphones, earbuds and more.', link: '/giveaways', active: true },
    { id: 'gb2', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', label: '🎁 Rewards', title: 'Claim Your Reward Points Today', description: 'Earn points on every deal you grab and redeem them for exclusive discounts.', link: '/giveaways', active: true },
  ],
}

// ── Default Admin Settings / Members ───────────────────────────────────────
const defaultAdminSettings = {
  siteName: 'Wouchify Admin',
  supportEmail: 'admin@wouchify.com',
  timezone: 'Asia/Kolkata',
  avatar: '',
}

const defaultAdminMembers = [
  { id: 'am1', name: 'Admin User', email: 'admin@wouchify.com', role: 'Owner', active: true },
]

// ── Default Analytics ───────────────────────────────────────────────────────
const defaultAnalytics = {
  dealClicks: {},    // { slug: count }
  couponCopies: {},  // { id: count }
  pageViews: {},     // { page: count }
}

// ── Audit Log helpers ───────────────────────────────────────────────────────
function buildLog(action, entity, detail, actor = 'Admin') {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
    actor,
    action,   // 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT'
    entity,   // 'Deal' | 'Coupon' | 'Store' etc.
    detail,   // human-readable string
  }
}

// ── Helper ───────────────────────────────────────────────────────────────────
function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// ── Context ──────────────────────────────────────────────────────────────────
const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [deals, setDeals] = useState(() => loadFromStorage('wouchify_deals', dealsData))
  const [lootDeals, setLootDeals] = useState(() => loadFromStorage('wouchify_loot_deals', lootDealsData))
  const [stores, setStores] = useState(() => loadFromStorage('wouchify_stores', storesData))
  const [coupons, setCoupons] = useState(() => loadFromStorage('wouchify_coupons', defaultCoupons))
  const [giveaways, setGiveaways] = useState(() => loadFromStorage('wouchify_giveaways', defaultGiveaways))
  const [creditCards, setCreditCards] = useState(() => loadFromStorage('wouchify_credit_cards', defaultCreditCards))
  const [banners, setBanners] = useState(() => loadFromStorage('wouchify_banners', defaultBanners))
  const [adminSettings, setAdminSettings] = useState(() => loadFromStorage('wouchify_admin_settings', defaultAdminSettings))
  const [adminMembers, setAdminMembers] = useState(() => loadFromStorage('wouchify_admin_members', defaultAdminMembers))
  const [auditLog, setAuditLog] = useState(() => loadFromStorage('wouchify_audit_log', []))
  const [analytics, setAnalytics] = useState(() => loadFromStorage('wouchify_analytics', defaultAnalytics))

  const addAuditLog = (action, entity, detail) => {
    const entry = buildLog(action, entity, detail)
    setAuditLog(prev => [entry, ...prev].slice(0, 500)) // keep last 500
  }

  const trackDealClick = (slug) => setAnalytics(prev => ({ ...prev, dealClicks: { ...prev.dealClicks, [slug]: (prev.dealClicks[slug] || 0) + 1 } }))
  const trackCouponCopy = (id) => setAnalytics(prev => ({ ...prev, couponCopies: { ...prev.couponCopies, [id]: (prev.couponCopies[id] || 0) + 1 } }))
  const trackPageView = (page) => setAnalytics(prev => ({ ...prev, pageViews: { ...prev.pageViews, [page]: (prev.pageViews[page] || 0) + 1 } }))
  const clearAuditLog = () => { setAuditLog([]); saveToStorage('wouchify_audit_log', []) }

  // Persist to localStorage on every change
  useEffect(() => { saveToStorage('wouchify_deals', deals) }, [deals])
  useEffect(() => { saveToStorage('wouchify_loot_deals', lootDeals) }, [lootDeals])
  useEffect(() => { saveToStorage('wouchify_stores', stores) }, [stores])
  useEffect(() => { saveToStorage('wouchify_coupons', coupons) }, [coupons])
  useEffect(() => { saveToStorage('wouchify_giveaways', giveaways) }, [giveaways])
  useEffect(() => { saveToStorage('wouchify_credit_cards', creditCards) }, [creditCards])
  useEffect(() => { saveToStorage('wouchify_banners', banners) }, [banners])
  useEffect(() => { saveToStorage('wouchify_admin_settings', adminSettings) }, [adminSettings])
  useEffect(() => { saveToStorage('wouchify_admin_members', adminMembers) }, [adminMembers])
  useEffect(() => { saveToStorage('wouchify_audit_log', auditLog) }, [auditLog])
  useEffect(() => { saveToStorage('wouchify_analytics', analytics) }, [analytics])

  // ── BANNERS CRUD ─────────────────────────────────────────────────────────
  const addBanner = (page, banner) => setBanners(prev => ({ ...prev, [page]: [...(prev[page] || []), { ...banner, id: generateId(), active: true }] }))
  const updateBanner = (page, id, updates) => setBanners(prev => ({ ...prev, [page]: prev[page].map(b => b.id === id ? { ...b, ...updates } : b) }))
  const deleteBanner = (page, id) => setBanners(prev => ({ ...prev, [page]: prev[page].filter(b => b.id !== id) }))
  const reorderBanners = (page, newList) => setBanners(prev => ({ ...prev, [page]: newList }))

  // ── DEALS CRUD ───────────────────────────────────────────────────────────
  const addDeal = (deal) => {
    const d = { ...deal, slug: deal.slug || generateId(), createdAt: new Date().toISOString() }
    setDeals((prev) => [d, ...prev])
    addAuditLog('CREATE', 'Deal', `Created deal "${deal.title}"`)
  }
  const updateDeal = (slug, updates) => {
    setDeals((prev) => prev.map((d) => d.slug === slug ? { ...d, ...updates } : d))
    addAuditLog('UPDATE', 'Deal', `Updated deal "${updates.title || slug}"`)
  }
  const deleteDeal = (slug) => {
    const d = deals.find(x => x.slug === slug)
    setDeals((prev) => prev.filter((d) => d.slug !== slug))
    addAuditLog('DELETE', 'Deal', `Deleted deal "${d?.title || slug}"`)
  }
  const getDealBySlug = (slug) => deals.find((d) => d.slug === slug)

  // ── LOOT DEALS CRUD ─────────────────────────────────────────────────────
  const addLootDeal = (deal) => {
    setLootDeals((prev) => [{ ...deal, id: generateId(), slug: deal.slug || generateId() }, ...prev])
    addAuditLog('CREATE', 'Loot Deal', `Created loot deal "${deal.title}"`)
  }
  const updateLootDeal = (slug, updates) => {
    setLootDeals((prev) => prev.map((d) => d.slug === slug ? { ...d, ...updates } : d))
    addAuditLog('UPDATE', 'Loot Deal', `Updated loot deal "${updates.title || slug}"`)
  }
  const deleteLootDeal = (slug) => {
    const d = lootDeals.find(x => x.slug === slug)
    setLootDeals((prev) => prev.filter((d) => d.slug !== slug))
    addAuditLog('DELETE', 'Loot Deal', `Deleted loot deal "${d?.title || slug}"`)
  }
  const getLootDealBySlug = (slug) => lootDeals.find((d) => d.slug === slug)

  // ── STORES CRUD ──────────────────────────────────────────────────────────
  const addStore = (store) => {
    setStores((prev) => [{ ...store, slug: store.slug || generateId(), offers: store.offers || [] }, ...prev])
    addAuditLog('CREATE', 'Store', `Created store "${store.name}"`)
  }
  const updateStore = (slug, updates) => {
    setStores((prev) => prev.map((s) => s.slug === slug ? { ...s, ...updates } : s))
    addAuditLog('UPDATE', 'Store', `Updated store "${updates.name || slug}"`)
  }
  const deleteStore = (slug) => {
    const s = stores.find(x => x.slug === slug)
    setStores((prev) => prev.filter((s) => s.slug !== slug))
    addAuditLog('DELETE', 'Store', `Deleted store "${s?.name || slug}"`)
  }
  const getStoreBySlug = (slug) => stores.find((s) => s.slug === slug)

  // ── COUPONS CRUD ─────────────────────────────────────────────────────────
  const addCoupon = (coupon) => {
    setCoupons((prev) => [{ ...coupon, id: generateId(), active: true }, ...prev])
    addAuditLog('CREATE', 'Coupon', `Created coupon "${coupon.code}" for ${coupon.store}`)
  }
  const updateCoupon = (id, updates) => {
    setCoupons((prev) => prev.map((c) => c.id === id ? { ...c, ...updates } : c))
    if (!updates.active === false && Object.keys(updates).length > 1)
      addAuditLog('UPDATE', 'Coupon', `Updated coupon ID ${id}`)
  }
  const deleteCoupon = (id) => {
    const c = coupons.find(x => x.id === id)
    setCoupons((prev) => prev.filter((c) => c.id !== id))
    addAuditLog('DELETE', 'Coupon', `Deleted coupon "${c?.code}" (${c?.store})`)
  }

  // ── GIVEAWAYS CRUD ───────────────────────────────────────────────────────
  const addGiveaway = (giveaway) => setGiveaways((prev) => [{ ...giveaway, id: generateId(), active: true }, ...prev])
  const updateGiveaway = (id, updates) => setGiveaways((prev) => prev.map((g) => g.id === id ? { ...g, ...updates } : g))
  const deleteGiveaway = (id) => setGiveaways((prev) => prev.filter((g) => g.id !== id))

  // ── CREDIT CARDS CRUD ────────────────────────────────────────────────────
  const addCreditCard = (card) => {
    const newCard = { ...card, id: generateId(), active: true }
    setCreditCards((prev) => ({
      ...prev,
      [card.type === 'lifetime' ? 'lifetime' : 'shopping']: [newCard, ...(prev[card.type === 'lifetime' ? 'lifetime' : 'shopping'] || [])],
    }))
  }
  const updateCreditCard = (id, updates) => {
    setCreditCards((prev) => ({
      shopping: prev.shopping.map((c) => c.id === id ? { ...c, ...updates } : c),
      lifetime: prev.lifetime.map((c) => c.id === id ? { ...c, ...updates } : c),
    }))
  }
  const deleteCreditCard = (id) => {
    setCreditCards((prev) => ({
      shopping: prev.shopping.filter((c) => c.id !== id),
      lifetime: prev.lifetime.filter((c) => c.id !== id),
    }))
  }

  // ── ADMIN SETTINGS / MEMBERS ────────────────────────────────────────────
  const updateAdminSettings = (updates) => {
    setAdminSettings((prev) => ({ ...prev, ...updates }))
  }

  const addAdminMember = (member) => {
    setAdminMembers((prev) => [{ ...member, id: generateId(), active: true }, ...prev])
  }

  const updateAdminMember = (id, updates) => {
    setAdminMembers((prev) => prev.map((member) => member.id === id ? { ...member, ...updates } : member))
  }

  const deleteAdminMember = (id) => {
    setAdminMembers((prev) => prev.filter((member) => member.id !== id))
  }

  return (
    <DataContext.Provider value={{
      // Data
      deals, lootDeals, stores, coupons, giveaways, creditCards, banners, adminSettings, adminMembers,
      // Deals
      addDeal, updateDeal, deleteDeal, getDealBySlug,
      // Loot Deals
      addLootDeal, updateLootDeal, deleteLootDeal, getLootDealBySlug,
      // Stores
      addStore, updateStore, deleteStore, getStoreBySlug,
      // Coupons
      addCoupon, updateCoupon, deleteCoupon,
      // Giveaways
      addGiveaway, updateGiveaway, deleteGiveaway,
      // Credit Cards
      addCreditCard, updateCreditCard, deleteCreditCard,
      // Banners
      addBanner, updateBanner, deleteBanner, reorderBanners,
      // Admin Settings / Members
      updateAdminSettings,
      addAdminMember, updateAdminMember, deleteAdminMember,
      // Audit Log
      auditLog, addAuditLog, clearAuditLog,
      // Analytics
      analytics, trackDealClick, trackCouponCopy, trackPageView,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
