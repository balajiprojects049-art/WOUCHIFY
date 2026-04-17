import { createContext, useContext, useEffect, useState } from 'react'
import { dealsData } from '../data/dealsData'
import { lootDealsData } from '../data/lootDealsData'
import { storesData } from '../data/storesData'

// ── Default Coupons ──────────────────────────────────────────────────────────
const defaultCoupons = [
  { id: 'c1', store: 'Amazon India', code: 'AMAZON10', discount: '10% OFF', category: 'All Categories', expiry: 'Expires in 3 days', minOrder: '₹499', success: '96%', badge: 'HOT', active: true },
]

// ── Default Giveaways ────────────────────────────────────────────────────────
const defaultGiveaways = [
  { id: 'g1', prize: 'Apple iPhone 15 Pro Max', value: '₹1,59,900', entries: '12,450', endsIn: '2 days', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', tag: 'MEGA', color: 'from-midnight to-navy', active: true },
]

// ── Default Credit Cards ─────────────────────────────────────────────────────
const defaultCreditCards = {
  shopping: [
    { id: 'cc1', bank: 'INDUSIND BANK', card: 'IndusInd Credit Card', cashback: 'Up to 5% Cashback', partners: 'Shopping • Travel • Dining', rewards: 'Exclusive Rewards', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1589758438368-0c5364c63604?auto=format&fit=crop&w=400&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=indusind.com', active: true },
    { id: 'cc2', bank: 'ICICI BANK', card: 'ICICI CC', cashback: '5% Cashback on Amazon', partners: 'Amazon • Flipkart • Swiggy', rewards: 'Earn Reward Points', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1589758438368-0c5364c63604?auto=format&fit=crop&w=400&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=icicibank.com', active: true },
    { id: 'cc3', bank: 'IDFC FIRST BANK', card: 'IDFC CC', cashback: 'Never Expiring Rewards', partners: 'All Merchant Spends', rewards: 'Lifetime Free', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1589758438368-0c5364c63604?auto=format&fit=crop&w=400&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=idfcfirstbank.com', active: true },
  ],
  lifetime: [
    { id: 'cc4', bank: 'TATA NEU', card: 'Tata Neu Card', cashback: 'Up to 10% NeuCoins', partners: 'Tata Brands • BigBasket', rewards: 'Lifetime Free Offers', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1589758438368-0c5364c63604?auto=format&fit=crop&w=400&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=tatadigital.com', active: true },
    { id: 'cc5', bank: 'AXIS BANK', card: 'Axis CC', cashback: 'Up to 7.5% Cashback', partners: 'Myntra • Flipkart • Flights', rewards: 'Flat ₹1,400 Rewards', type: 'lifetime', cardImage: '/axis-bank-cashback-credit-card.jpg', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=axisbank.com', active: true },
    { id: 'cc6', bank: 'BAJAJ FINSERV', card: 'Bajaj Finserv EMI Card', cashback: 'No Cost EMI', partners: 'Electronics • Home Appliances', rewards: 'Pre-approved Offers', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1589758438368-0c5364c63604?auto=format&fit=crop&w=400&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=bajajfinserv.in', active: true },
  ],
}

// ── Default Banners (per page section) ────────────────────────────────────────
const defaultBanners = {
  home: [
    { id: 'hb1', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', label: '🔥 Exclusive Deals', title: 'Discover the Best Deals in India', description: 'Handpicked coupons, loot deals and cashback offers updated every day.', link: '/deals', active: true },
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
  ],
  creditCards: [
    { id: 'ccb1', image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80', label: '💳 Card Offers', title: 'Best Credit Cards for Cashback', description: "Earn rewards on every purchase with India's top credit cards.", link: '/credit-cards', active: true },
  ],
  giveaways: [
    { id: 'gb1', image: 'https://images.unsplash.com/photo-1630450202872-e0829c9d6172?auto=format&fit=crop&w=1200&q=80', label: '🏆 Weekly Giveaway', title: 'Win Premium Gadgets Worth ₹50,000', description: 'Enter our weekly draw for a chance to win the latest smartphones, earbuds and more.', link: '/giveaways', active: true },
  ],
  privacyPolicy: [
    { id: 'ppb1', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80', label: 'Privacy First', title: 'Your Data Is Safe With Us', description: 'We are committed to full transparency about how we collect and use your information.', link: '/privacy-policy', active: true },
  ],
  termsOfUse: [
    { id: 'tob1', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', label: 'Terms & Conditions', title: 'Rules That Protect You', description: 'Clear, fair terms designed to ensure the best experience for every Wouchify user.', link: '/terms', active: true },
  ],
}

function normalizeBanners(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return defaultBanners
  }

  const merged = { ...defaultBanners }
  Object.entries(value).forEach(([key, list]) => {
    if (Array.isArray(list)) merged[key] = list
  })
  return merged
}

function normalizeAdminMembers(value) {
  if (!Array.isArray(value)) return defaultAdminMembers
  if (value.length === 1 && Array.isArray(value[0])) return value[0]
  return value
}

// ── Default Admin Settings / Members ───────────────────────────────────────
const defaultAdminSettings = {
  siteName: 'Wouchify Admin',
  supportEmail: 'admin@wouchify.com',
  timezone: 'Asia/Kolkata',
  avatar: '',
}

const defaultAdminMembers = [
  { id: 'am1', name: 'Admin User', email: 'admin@wouchify.com', phone: '', department: 'Management', role: 'Owner', active: true, password: 'admin' },
  { id: 'am2', name: 'Manager User', email: 'manager@wouchify.com', phone: '+91 98765 00001', department: 'Operations', role: 'Manager', active: true, password: 'admin' },
  { id: 'am3', name: 'Ops Leader', email: 'ops@wouchify.com', phone: '+91 98765 00002', department: 'Operations', role: 'Operational Manager', active: true, password: 'admin' },
  { id: 'am4', name: 'Content Editor', email: 'editor@wouchify.com', phone: '+91 98765 00003', department: 'Content & Marketing', role: 'Editors', active: true, password: 'admin' },
  { id: 'am5', name: 'Support Agent', email: 'support@wouchify.com', phone: '+91 98765 00004', department: 'Customer Support', role: 'Support', active: true, password: 'admin' },
  { id: 'am6', name: 'Balaji (Executive)', email: 'balaji@wouchify.com', phone: '+91 98765 00005', department: 'Content Entry', role: 'Operational Executive', active: true, password: 'admin' }
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
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`⚠️ LocalStorage save failed for "${key}":`, err.name)
    // If quota exceeded, we just don't save. The app will continue in-memory.
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// ── Deletion Tracking — prevents DB from re-adding intentionally deleted items ───
function addToDeletedIds(...ids) {
  try {
    const existing = new Set(JSON.parse(localStorage.getItem('wouchify_deleted_ids') || '[]'))
    ids.forEach(id => id && existing.add(String(id)))
    localStorage.setItem('wouchify_deleted_ids', JSON.stringify([...existing]))
  } catch {}
}
function getDeletedIds() {
  try { return new Set(JSON.parse(localStorage.getItem('wouchify_deleted_ids') || '[]')) }
  catch { return new Set() }
}

// ── Context ──────────────────────────────────────────────────────────────────
const DataContext = createContext(null)

export function DataProvider({ children }) {
  // ── Deals & LootDeals: Load from localStorage (admin-added data persists across refreshes)
  // Falls back to hardcoded file only if localStorage is empty.
  // This means admin-added deals survive page refresh AND hardcoded seed data appears on first load.
  const [deals, setDeals] = useState(() => {
    try {
      const stored = localStorage.getItem('wouchify_deals')
      const cached = stored ? JSON.parse(stored) : null
      // Trust localStorage even if empty — admin may have deleted all deals intentionally
      if (cached && Array.isArray(cached)) return cached
      return dealsData
    } catch { return dealsData }
  })
  const [lootDeals, setLootDeals] = useState(() => {
    try {
      const stored = localStorage.getItem('wouchify_loot_deals')
      const cached = stored ? JSON.parse(stored) : null
      // Trust localStorage even if empty — admin may have deleted all loot deals intentionally
      if (cached && Array.isArray(cached)) return cached
      return lootDealsData
    } catch { return lootDealsData }
  })
  const [stores, setStores] = useState(() => {
    try {
      const stored = localStorage.getItem('wouchify_stores')
      const cached = stored ? JSON.parse(stored) : null
      // Always trust localStorage — if admin deleted a store, respect that
      if (cached && Array.isArray(cached)) return cached
      return storesData // first load only
    } catch { return storesData }
  })
  const [coupons, setCoupons] = useState(() => loadFromStorage('wouchify_coupons', defaultCoupons))
  const [giveaways, setGiveaways] = useState(() => loadFromStorage('wouchify_giveaways', defaultGiveaways))
  const [creditCards, setCreditCards] = useState(() => loadFromStorage('wouchify_credit_cards', defaultCreditCards))
  const [banners, setBanners] = useState(() => normalizeBanners(loadFromStorage('wouchify_banners', defaultBanners)))
  const [adminSettings, setAdminSettings] = useState(() => loadFromStorage('wouchify_admin_settings', defaultAdminSettings))
  const [adminMembers, setAdminMembers] = useState(() => normalizeAdminMembers(loadFromStorage('wouchify_admin_members', defaultAdminMembers)))
  const [auditLog, setAuditLog] = useState(() => loadFromStorage('wouchify_audit_log', []))
  const [analytics, setAnalytics] = useState(() => loadFromStorage('wouchify_analytics', defaultAnalytics))
  const [advertisements, setAdvertisements] = useState(() => loadFromStorage('wouchify_advertisements', []))
  const [currentUser, setCurrentUser] = useState(() => loadFromStorage('wouchify_current_admin', null))

  const [dbConnected, setDbConnected] = useState(false)

  // NOTE: Test accounts are baked into defaultAdminMembers — no runtime injection needed

  // ── 1) Connect to Neon Backend on Mount ──
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(res => {
      if (res.isConnected) {
        setDbConnected(true)
        if (res.hasData) {
          // Smart merge: LOCAL always wins. DB only adds items missing from local.
          // Items the admin explicitly deleted are tracked and never re-added from DB.
          const deletedIds = getDeletedIds()
          const mergeList = (dbItems, localItems) => {
            if (!Array.isArray(dbItems) || !Array.isArray(localItems)) return localItems ?? dbItems
            const merged = [...localItems]
            dbItems.forEach(dbItem => {
              const itemId = String(dbItem.slug || dbItem.id || '')
              // Skip items the admin intentionally deleted
              if (itemId && deletedIds.has(itemId)) return
              const localIdx = merged.findIndex(l => l.slug === dbItem.slug || l.id === dbItem.id)
              if (localIdx === -1) {
                merged.push(dbItem) // Only add if not in local at all
              } else {
                // Local wins — backfill any fields missing in local from DB
                const local = merged[localIdx]
                const result = { ...dbItem }
                Object.entries(local).forEach(([k, v]) => { if (v != null && v !== '') result[k] = v })
                merged[localIdx] = result
              }
            })
            return merged
          }

          if (res.data.deals) setDeals(prev => mergeList(res.data.deals, prev))
          if (res.data.lootDeals) setLootDeals(prev => mergeList(res.data.lootDeals, prev))
          if (res.data.stores) setStores(prev => mergeList(res.data.stores, prev))
          if (res.data.coupons) setCoupons(prev => mergeList(res.data.coupons, prev))
          if (res.data.giveaways) setGiveaways(prev => mergeList(res.data.giveaways, prev))
          if (res.data.adminMembers) setAdminMembers(prev => normalizeAdminMembers(mergeList(res.data.adminMembers, prev)))
          // creditCards is a singleton object {shopping:[],lifetime:[]}, not a list
          // Only load from DB on a fresh device (no local data yet)
          if (res.data.creditCards && !localStorage.getItem('wouchify_credit_cards')) {
            setCreditCards(res.data.creditCards)
          }
          // banners: DB fills in any missing page sections, local edits win
          if (res.data.banners) setBanners(prev => normalizeBanners({ ...res.data.banners, ...prev }))
          // adminSettings: only use DB if nothing stored locally yet
          if (res.data.adminSettings && !localStorage.getItem('wouchify_admin_settings')) {
            setAdminSettings(res.data.adminSettings)
          }
          // auditLog & analytics: local is always fresher — only seed from DB on first load
          if (res.data.auditLog && auditLog.length === 0) setAuditLog(res.data.auditLog)
          if (res.data.analytics && Object.keys(analytics.dealClicks || {}).length === 0) setAnalytics(res.data.analytics)
        }
      }
    }).catch(() => console.log('⚠️ No DB connected, falling back to pure localStorage mode.'))
  }, [])

  // ── 2) Sync functionality (exposes to Admin Setup) ──
  const syncDataToDb = async () => {
    const payload = {
      deals, lootDeals, stores, coupons, giveaways, creditCards, banners, adminSettings, adminMembers, auditLog, analytics
    }
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return await res.json()
  }

  // ── Database single-item persistence bridge ──
  const persist = (collection, item) => {
    if (!item) return
    fetch(`/api/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).then((res) => {
      if (!res.ok) {
        console.error(`DB persist failed for ${collection}: HTTP ${res.status}`)
      }
    }).catch((err) => {
      console.error(`DB persist failed for ${collection}:`, err?.message || err)
      // Keep UI/localStorage responsive even if backend is temporarily unavailable.
    })
  }
  const removeDb = (collection, id) => {
    const endpoint = id ? `/api/${collection}/${id}` : `/api/${collection}`
    fetch(endpoint, { method: 'DELETE' }).then((res) => {
      if (!res.ok) {
        console.error(`DB delete failed for ${id ? `${collection}/${id}` : collection}: HTTP ${res.status}`)
      }
    }).catch((err) => {
      console.error(`DB delete failed for ${id ? `${collection}/${id}` : collection}:`, err?.message || err)
      // Deletion will remain local if backend is unavailable.
    })
  }


  const addAuditLog = (action, entity, detail) => {
    const entry = buildLog(action, entity, detail, currentUser?.name || 'System Auto')
    setAuditLog(prev => [entry, ...prev].slice(0, 500)) // keep last 500
    persist('auditLog', entry)
  }

  const updateAnalytics = (updater) => {
    setAnalytics((prev) => {
      const next = updater(prev)
      persist('analytics', next)
      return next
    })
  }
  const trackDealClick = (slug) => updateAnalytics(prev => ({ ...prev, dealClicks: { ...prev.dealClicks, [slug]: (prev.dealClicks[slug] || 0) + 1 } }))
  const trackCouponCopy = (id) => updateAnalytics(prev => ({ ...prev, couponCopies: { ...prev.couponCopies, [id]: (prev.couponCopies[id] || 0) + 1 } }))
  const trackPageView = (page) => updateAnalytics(prev => ({ ...prev, pageViews: { ...prev.pageViews, [page]: (prev.pageViews[page] || 0) + 1 } }))
  const clearAuditLog = () => {
    setAuditLog([])
    saveToStorage('wouchify_audit_log', [])
    removeDb('auditLog')
  }

  // ── Auth helpers ────────────────────────────────────────────────────────────
  const loginAdmin = (member) => {
    setCurrentUser(member)
    saveToStorage('wouchify_current_admin', member)
  }
  const logoutAdmin = () => {
    setCurrentUser(null)
    saveToStorage('wouchify_current_admin', null)
  }

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
  useEffect(() => { saveToStorage('wouchify_advertisements', advertisements) }, [advertisements])

  // ── Scheduled publishing filter ───────────────────────────────────────────
  // A deal is "live" if publishAt is empty/missing OR if publishAt is in the past
  const isPublished = (item) => {
    if (!item.publishAt) return true
    return new Date(item.publishAt).getTime() <= Date.now()
  }
  const publishedDeals = deals.filter(isPublished)
  const publishedLootDeals = lootDeals.filter(isPublished)

  // ── ADVERTISEMENTS CRUD ───────────────────────────────────────────────────
  const addAdvertisement = (ad) => {
    const newAd = { ...ad, id: generateId(), createdAt: new Date().toISOString() }
    setAdvertisements(prev => {
      const next = [newAd, ...prev]
      persist('advertisements', newAd)
      return next
    })
    addAuditLog('CREATE', 'Advertisement', `Added ad: ${ad.title}`)
  }
  const updateAdvertisement = (id, updates) => {
    setAdvertisements(prev => {
      const draft = prev.map(a => a.id === id ? { ...a, ...updates } : a)
      const updated = draft.find(a => a.id === id)
      if (updated) persist('advertisements', updated)
      return draft
    })
  }
  const deleteAdvertisement = (id) => {
    setAdvertisements(prev => prev.filter(a => a.id !== id))
    removeDb('advertisements', id)
    addAuditLog('DELETE', 'Advertisement', `Deleted ad id: ${id}`)
  }

  // ── BANNERS CRUD ─────────────────────────────────────────────────────────
  const addBanner = (page, banner) => {
    const newBanner = { ...banner, id: generateId(), active: true }
    setBanners((prev) => {
      const updatedBanners = { ...prev, [page]: [...(prev[page] || []), newBanner] }
      persist('banners', updatedBanners)
      return updatedBanners
    })
  }
  const updateBanner = (page, id, updates) => {
    setBanners(prev => {
      const updatedBanners = { ...prev, [page]: (prev[page] || []).map(b => b.id === id ? { ...b, ...updates } : b) }
      persist('banners', updatedBanners)
      return updatedBanners
    })
  }
  const deleteBanner = (page, id) => {
    setBanners(prev => {
      const updatedBanners = { ...prev, [page]: (prev[page] || []).filter(b => b.id !== id) }
      persist('banners', updatedBanners)
      return updatedBanners
    })
  }
  const reorderBanners = (page, newList) => {
    setBanners((prev) => {
      const updatedBanners = { ...prev, [page]: newList }
      persist('banners', updatedBanners)
      return updatedBanners
    })
  }

  // ── DEALS CRUD ───────────────────────────────────────────────────────────
  const addDeal = (deal) => {
    const d = {
      ...deal,
      slug: deal.slug || generateId(),
      createdAt: deal.createdAt || new Date().toISOString(), // preserve if editing
      addedBy: deal.addedBy || currentUser?.name || 'System Auto'
    }
    setDeals((prev) => [d, ...prev])
    persist('deals', d)
    addAuditLog('CREATE', 'Deal', `Created deal "${deal.title}"`)
  }
  const updateDeal = (slug, updates) => {
    setDeals((prev) => {
      const draft = prev.map((d) => d.slug === slug ? { ...d, ...updates } : d)
      persist('deals', draft.find(x => x.slug === slug))
      return draft
    })
    addAuditLog('UPDATE', 'Deal', `Updated deal "${updates.title || slug}"`)
  }
  const deleteDeal = (slug) => {
    const d = deals.find(x => x.slug === slug)
    addToDeletedIds(slug)
    setDeals((prev) => prev.filter((d) => d.slug !== slug))
    removeDb('deals', slug)
    addAuditLog('DELETE', 'Deal', `Deleted deal "${d?.title || slug}"`)
  }
  const getDealBySlug = (slug) => deals.find((d) => d.slug === slug)

  // ── LOOT DEALS CRUD ─────────────────────────────────────────────────────
  const addLootDeal = (deal) => {
    const d = {
      ...deal,
      id: generateId(),
      slug: deal.slug || generateId(),
      createdAt: deal.createdAt || new Date().toISOString(), // preserve if editing
      addedBy: deal.addedBy || currentUser?.name || 'System Auto'
    }
    setLootDeals((prev) => [d, ...prev])
    persist('lootDeals', d)
    addAuditLog('CREATE', 'Loot Deal', `Created loot deal "${deal.title}"`)
  }
  const updateLootDeal = (slug, updates) => {
    setLootDeals((prev) => {
      const draft = prev.map((d) => d.slug === slug ? { ...d, ...updates } : d)
      persist('lootDeals', draft.find(x => x.slug === slug))
      return draft
    })
    addAuditLog('UPDATE', 'Loot Deal', `Updated loot deal "${updates.title || slug}"`)
  }
  const deleteLootDeal = (slug) => {
    const d = lootDeals.find(x => x.slug === slug)
    addToDeletedIds(slug)
    setLootDeals((prev) => prev.filter((d) => d.slug !== slug))
    removeDb('lootDeals', slug)
    addAuditLog('DELETE', 'Loot Deal', `Deleted loot deal "${d?.title || slug}"`)
  }
  const getLootDealBySlug = (slug) => lootDeals.find((d) => d.slug === slug)

  // ── STORES CRUD ──────────────────────────────────────────────────────────
  const addStore = (store) => {
    const s = { ...store, slug: store.slug || generateId(), offers: store.offers || [], addedBy: currentUser?.name || 'System Auto' }
    setStores((prev) => [s, ...prev])
    persist('stores', s)
    addAuditLog('CREATE', 'Store', `Created store "${store.name}"`)
  }
  const updateStore = (slug, updates) => {
    setStores((prev) => {
      const draft = prev.map((s) => s.slug === slug ? { ...s, ...updates } : s)
      persist('stores', draft.find(x => x.slug === slug))
      return draft
    })
    addAuditLog('UPDATE', 'Store', `Updated store "${updates.name || slug}"`)
  }
  const deleteStore = (slug) => {
    const s = stores.find(x => x.slug === slug)
    addToDeletedIds(slug)
    setStores((prev) => prev.filter((s) => s.slug !== slug))
    removeDb('stores', slug)
    addAuditLog('DELETE', 'Store', `Deleted store "${s?.name || slug}"`)
  }
  const getStoreBySlug = (slug) => stores.find((s) => s.slug === slug)

  // ── COUPONS CRUD ─────────────────────────────────────────────────────────
  const addCoupon = (coupon) => {
    const c = { ...coupon, id: generateId(), active: true, createdAt: new Date().toISOString(), addedBy: currentUser?.name || 'System Auto' }
    setCoupons((prev) => [c, ...prev])
    persist('coupons', c)
    addAuditLog('CREATE', 'Coupon', `Created coupon "${coupon.code}" for ${coupon.store}`)
  }
  const updateCoupon = (id, updates) => {
    setCoupons((prev) => {
      const draft = prev.map((c) => c.id === id ? { ...c, ...updates } : c)
      persist('coupons', draft.find(x => x.id === id))
      return draft
    })
    if (Object.keys(updates).length > 1)
      addAuditLog('UPDATE', 'Coupon', `Updated coupon ID ${id}`)
  }
  const deleteCoupon = (id) => {
    const c = coupons.find(x => x.id === id)
    addToDeletedIds(id)
    setCoupons((prev) => prev.filter((c) => c.id !== id))
    removeDb('coupons', id)
    addAuditLog('DELETE', 'Coupon', `Deleted coupon "${c?.code}" (${c?.store})`)
  }

  // ── GIVEAWAYS CRUD ───────────────────────────────────────────────────────
  const addGiveaway = (giveaway) => {
    const g = { ...giveaway, id: generateId(), active: true, createdAt: new Date().toISOString(), addedBy: currentUser?.name || 'System Auto' }
    setGiveaways((prev) => [g, ...prev])
    persist('giveaways', g)
    addAuditLog('CREATE', 'Giveaway', `Created giveaway "${giveaway.prize}"`)
  }
  const updateGiveaway = (id, updates) => {
    setGiveaways((prev) => {
      const draft = prev.map((g) => g.id === id ? { ...g, ...updates } : g)
      persist('giveaways', draft.find(x => x.id === id))
      return draft
    })
    addAuditLog('UPDATE', 'Giveaway', `Updated giveaway ID ${id}`)
  }
  const deleteGiveaway = (id) => {
    const g = giveaways.find(x => x.id === id)
    addToDeletedIds(id)
    setGiveaways((prev) => prev.filter((g) => g.id !== id))
    removeDb('giveaways', id)
    addAuditLog('DELETE', 'Giveaway', `Deleted giveaway "${g?.prize || id}"`)
  }

  // ── CREDIT CARDS CRUD ────────────────────────────────────────────────────
  const addCreditCard = (card) => {
    const newCard = { ...card, id: generateId(), active: true, addedBy: currentUser?.name || 'System Auto' }
    setCreditCards((prev) => {
      const typeKey = card.type === 'lifetime' ? 'lifetime' : 'shopping'
      const updatedCards = {
        ...prev,
        [typeKey]: [newCard, ...(prev[typeKey] || [])],
      }
      persist('creditCards', updatedCards)
      return updatedCards
    })
  }
  const updateCreditCard = (id, updates) => {
    setCreditCards((prev) => {
      const updatedCards = {
        shopping: prev.shopping.map((c) => c.id === id ? { ...c, ...updates } : c),
        lifetime: prev.lifetime.map((c) => c.id === id ? { ...c, ...updates } : c),
      }
      persist('creditCards', updatedCards)
      return updatedCards
    })
  }
  const deleteCreditCard = (id) => {
    setCreditCards((prev) => {
      const updatedCards = {
        shopping: prev.shopping.filter((c) => c.id !== id),
        lifetime: prev.lifetime.filter((c) => c.id !== id),
      }
      persist('creditCards', updatedCards)
      return updatedCards
    })
  }

  // ── ADMIN SETTINGS / MEMBERS / DATA ───────────────────────────────────────────
  const updateAdminSettings = (updates) => {
    setAdminSettings((prev) => {
      const draft = { ...prev, ...updates }
      persist('adminSettings', draft)
      return draft
    })
  }

  const addAdminMember = (member) => {
    const m = { ...member, id: generateId(), active: true }
    setAdminMembers((prev) => {
      const updatedMembers = [m, ...prev]
      persist('adminMembers', m) // Only persist the new member — others already in DB
      return updatedMembers
    })
  }
  const updateAdminMember = (id, updates) => {
    setAdminMembers((prev) => {
      const draft = prev.map((member) => member.id === id ? { ...member, ...updates } : member)
      const updatedMember = draft.find((member) => member.id === id)
      if (updatedMember) persist('adminMembers', updatedMember)
      return draft
    })
  }
  const deleteAdminMember = (id) => {
    addToDeletedIds(id)
    setAdminMembers((prev) => {
      const draft = prev.filter((member) => member.id !== id)
      removeDb('adminMembers', id)
      return draft
    })
  }

  return (
    <DataContext.Provider value={{
      // Data
      deals, lootDeals, publishedDeals, publishedLootDeals, stores, coupons, giveaways, creditCards, banners, adminSettings, adminMembers, dbConnected, syncDataToDb,
      advertisements, addAdvertisement, updateAdvertisement, deleteAdvertisement,
      // Auth
      currentUser, loginAdmin, logoutAdmin,
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
