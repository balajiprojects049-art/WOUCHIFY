import { createContext, useContext, useEffect, useState } from 'react'

// ── Context ──────────────────────────────────────────────────────────────────
const DataContext = createContext(null)

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function buildLog(action, entity, detail, actor = 'Admin') {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    actor, action, entity, detail,
  }
}

function normalizeBanners(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result = {}
  Object.entries(value).forEach(([key, list]) => {
    if (Array.isArray(list)) result[key] = list
  })
  return result
}

function normalizeAdminMembers(value) {
  if (!Array.isArray(value)) return []
  if (value.length === 1 && Array.isArray(value[0])) return value[0]
  return value
}

export function DataProvider({ children }) {
  // ── All state starts empty — DB is the only source of truth ──
  const [deals, setDeals] = useState([])
  const [lootDeals, setLootDeals] = useState([])
  const [stores, setStores] = useState([])
  const [coupons, setCoupons] = useState([])
  const [giveaways, setGiveaways] = useState([])
  const [creditCards, setCreditCards] = useState({ shopping: [], lifetime: [] })
  const [banners, setBanners] = useState({})
  const [adminSettings, setAdminSettings] = useState({ siteName: 'Wouchify', supportEmail: '', timezone: 'Asia/Kolkata', avatar: '' })
  const [adminMembers, setAdminMembers] = useState([])
  const [auditLog, setAuditLog] = useState([])
  const [analytics, setAnalytics] = useState({ dealClicks: {}, couponCopies: {}, pageViews: {} })
  const [dbConnected, setDbConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // ── 1) Load from Neon DB on mount ────────────────────────────────────────
  useEffect(() => {
    setIsLoading(true)
    fetch('/api/data')
      .then((r) => r.json())
      .then((res) => {
        if (res.isConnected) {
          setDbConnected(true)
          const d = res.data || {}
          if (Array.isArray(d.deals)) setDeals(d.deals)
          if (Array.isArray(d.lootDeals)) setLootDeals(d.lootDeals)
          if (Array.isArray(d.stores)) setStores(d.stores)
          if (Array.isArray(d.coupons)) setCoupons(d.coupons)
          if (Array.isArray(d.giveaways)) setGiveaways(d.giveaways)
          if (Array.isArray(d.auditLog)) setAuditLog(d.auditLog)
          if (d.creditCards && typeof d.creditCards === 'object') setCreditCards(d.creditCards)
          if (d.banners && typeof d.banners === 'object') setBanners(normalizeBanners(d.banners))
          if (d.adminSettings && typeof d.adminSettings === 'object') setAdminSettings(d.adminSettings)
          if (Array.isArray(d.adminMembers)) setAdminMembers(normalizeAdminMembers(d.adminMembers))
          if (d.analytics && typeof d.analytics === 'object') setAnalytics(d.analytics)
        }
      })
      .catch(() => console.warn('Could not reach DB.'))
      .finally(() => setIsLoading(false))
  }, [])

  // ── 2) Full sync ──────────────────────────────────────────────────────────
  const syncDataToDb = async () => {
    const payload = { deals, lootDeals, stores, coupons, giveaways, creditCards, banners, adminSettings, adminMembers, auditLog, analytics }
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await res.json()
  }

  // ── 3) Per-item persistence ───────────────────────────────────────────────
  const persist = async (collection, item) => {
    if (!item) return
    try {
      const res = await fetch(`/api/collection/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      if (!res.ok) {
        const text = await res.text()
        console.error(`DB persist failed for ${collection}. Status: ${res.status}. Error:`, text)
        alert(`Failed to save! Please check your file sizes. Error: ${res.status}`)
      }
    } catch (err) {
      console.error(`DB persist network error for ${collection}:`, err?.message || err)
    }
  }

  const removeDb = (collection, id) => {
    const url = id ? `/api/collection/${collection}/${id}` : `/api/collection/${collection}`
    fetch(url, { method: 'DELETE' }).catch((err) =>
      console.error(`DB delete failed for ${collection}:`, err?.message || err)
    )
  }

  // ── Audit Log ─────────────────────────────────────────────────────────────
  const addAuditLog = (action, entity, detail) => {
    const entry = buildLog(action, entity, detail)
    setAuditLog((prev) => [entry, ...prev].slice(0, 500))
    persist('auditLog', entry)
  }
  const clearAuditLog = () => {
    setAuditLog([])
    removeDb('auditLog')
  }

  // ── Analytics ─────────────────────────────────────────────────────────────
  const updateAnalytics = (updater) => {
    setAnalytics((prev) => {
      const next = updater(prev)
      persist('analytics', next)
      return next
    })
  }
  const trackDealClick = (slug) =>
    updateAnalytics((prev) => ({ ...prev, dealClicks: { ...prev.dealClicks, [slug]: (prev.dealClicks[slug] || 0) + 1 } }))
  const trackCouponCopy = (id) =>
    updateAnalytics((prev) => ({ ...prev, couponCopies: { ...prev.couponCopies, [id]: (prev.couponCopies[id] || 0) + 1 } }))
  const trackPageView = (page) =>
    updateAnalytics((prev) => ({ ...prev, pageViews: { ...prev.pageViews, [page]: (prev.pageViews[page] || 0) + 1 } }))

  // ── BANNERS CRUD ──────────────────────────────────────────────────────────
  const addBanner = (page, banner) => {
    const newBanner = { ...banner, id: generateId(), active: true }
    const updated = { ...banners, [page]: [...(banners[page] || []), newBanner] }
    setBanners(updated)
    persist('banners', updated)
  }
  const updateBanner = (page, id, updates) => {
    const updated = { ...banners, [page]: (banners[page] || []).map((b) => (b.id === id ? { ...b, ...updates } : b)) }
    setBanners(updated)
    persist('banners', updated)
  }
  const deleteBanner = (page, id) => {
    const updated = { ...banners, [page]: (banners[page] || []).filter((b) => b.id !== id) }
    setBanners(updated)
    persist('banners', updated)
  }
  const reorderBanners = (page, newList) => {
    const updated = { ...banners, [page]: newList }
    setBanners(updated)
    persist('banners', updated)
  }

  // ── DEALS CRUD ────────────────────────────────────────────────────────────
  const addDeal = (deal) => {
    const d = { ...deal, slug: deal.slug || generateId(), createdAt: new Date().toISOString() }
    setDeals((prev) => [d, ...prev])
    persist('deals', d)
    addAuditLog('CREATE', 'Deal', `Created deal "${deal.title}"`)
  }
  const updateDeal = (slug, updates) => {
    setDeals((prev) => {
      const draft = prev.map((d) => (d.slug === slug ? { ...d, ...updates } : d))
      persist('deals', draft.find((x) => x.slug === slug))
      return draft
    })
    addAuditLog('UPDATE', 'Deal', `Updated deal "${updates.title || slug}"`)
  }
  const deleteDeal = (slug) => {
    const d = deals.find((x) => x.slug === slug)
    setDeals((prev) => prev.filter((d) => d.slug !== slug))
    removeDb('deals', slug)
    addAuditLog('DELETE', 'Deal', `Deleted deal "${d?.title || slug}"`)
  }
  const getDealBySlug = (slug) => deals.find((d) => d.slug === slug)

  // ── LOOT DEALS CRUD ───────────────────────────────────────────────────────
  const addLootDeal = (deal) => {
    const d = { ...deal, id: generateId(), slug: deal.slug || generateId() }
    setLootDeals((prev) => [d, ...prev])
    persist('lootDeals', d)
    addAuditLog('CREATE', 'Loot Deal', `Created loot deal "${deal.title}"`)
  }
  const updateLootDeal = (slug, updates) => {
    setLootDeals((prev) => {
      const draft = prev.map((d) => (d.slug === slug ? { ...d, ...updates } : d))
      persist('lootDeals', draft.find((x) => x.slug === slug))
      return draft
    })
    addAuditLog('UPDATE', 'Loot Deal', `Updated loot deal "${updates.title || slug}"`)
  }
  const deleteLootDeal = (slug) => {
    const d = lootDeals.find((x) => x.slug === slug)
    setLootDeals((prev) => prev.filter((d) => d.slug !== slug))
    removeDb('lootDeals', slug)
    addAuditLog('DELETE', 'Loot Deal', `Deleted loot deal "${d?.title || slug}"`)
  }
  const getLootDealBySlug = (slug) => lootDeals.find((d) => d.slug === slug)

  // ── STORES CRUD ───────────────────────────────────────────────────────────
  const addStore = (store) => {
    const s = { ...store, slug: store.slug || generateId(), offers: store.offers || [] }
    setStores((prev) => [s, ...prev])
    persist('stores', s)
    addAuditLog('CREATE', 'Store', `Created store "${store.name}"`)
  }
  const updateStore = (slug, updates) => {
    setStores((prev) => {
      const draft = prev.map((s) => (s.slug === slug ? { ...s, ...updates } : s))
      persist('stores', draft.find((x) => x.slug === slug))
      return draft
    })
    addAuditLog('UPDATE', 'Store', `Updated store "${updates.name || slug}"`)
  }
  const deleteStore = (slug) => {
    const s = stores.find((x) => x.slug === slug)
    setStores((prev) => prev.filter((s) => s.slug !== slug))
    removeDb('stores', slug)
    addAuditLog('DELETE', 'Store', `Deleted store "${s?.name || slug}"`)
  }
  const getStoreBySlug = (slug) => stores.find((s) => s.slug === slug)

  // ── COUPONS CRUD ──────────────────────────────────────────────────────────
  const addCoupon = (coupon) => {
    const c = { ...coupon, id: generateId(), active: true }
    setCoupons((prev) => [c, ...prev])
    persist('coupons', c)
    addAuditLog('CREATE', 'Coupon', `Created coupon "${coupon.code}" for ${coupon.store}`)
  }
  const updateCoupon = (id, updates) => {
    setCoupons((prev) => {
      const draft = prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      persist('coupons', draft.find((x) => x.id === id))
      return draft
    })
  }
  const deleteCoupon = (id) => {
    const c = coupons.find((x) => x.id === id)
    setCoupons((prev) => prev.filter((c) => c.id !== id))
    removeDb('coupons', id)
    addAuditLog('DELETE', 'Coupon', `Deleted coupon "${c?.code}" (${c?.store})`)
  }

  // ── GIVEAWAYS CRUD ────────────────────────────────────────────────────────
  const addGiveaway = (giveaway) => {
    const g = { ...giveaway, id: generateId(), active: true }
    setGiveaways((prev) => [g, ...prev])
    persist('giveaways', g)
  }
  const updateGiveaway = (id, updates) => {
    setGiveaways((prev) => {
      const draft = prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      persist('giveaways', draft.find((x) => x.id === id))
      return draft
    })
  }
  const deleteGiveaway = (id) => {
    setGiveaways((prev) => prev.filter((g) => g.id !== id))
    removeDb('giveaways', id)
  }

  // ── CREDIT CARDS CRUD ─────────────────────────────────────────────────────
  const addCreditCard = (card) => {
    const newCard = { ...card, id: generateId(), active: true }
    const typeKey = card.type === 'lifetime' ? 'lifetime' : 'shopping'
    const updated = { ...creditCards, [typeKey]: [newCard, ...(creditCards[typeKey] || [])] }
    setCreditCards(updated)
    persist('creditCards', updated)
  }
  const updateCreditCard = (id, updates) => {
    const updated = {
      shopping: (creditCards.shopping || []).map((c) => (c.id === id ? { ...c, ...updates } : c)),
      lifetime: (creditCards.lifetime || []).map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }
    setCreditCards(updated)
    persist('creditCards', updated)
  }
  const deleteCreditCard = (id) => {
    const updated = {
      shopping: (creditCards.shopping || []).filter((c) => c.id !== id),
      lifetime: (creditCards.lifetime || []).filter((c) => c.id !== id),
    }
    setCreditCards(updated)
    persist('creditCards', updated)
  }

  // ── ADMIN SETTINGS / MEMBERS ──────────────────────────────────────────────
  const updateAdminSettings = (updates) => {
    const draft = { ...adminSettings, ...updates }
    setAdminSettings(draft)
    persist('adminSettings', draft)
  }
  const addAdminMember = (member) => {
    const m = { ...member, id: generateId(), active: true }
    setAdminMembers((prev) => [m, ...prev])
    persist('adminMembers', m)
  }
  const updateAdminMember = (id, updates) => {
    setAdminMembers((prev) => {
      const draft = prev.map((member) => (member.id === id ? { ...member, ...updates } : member))
      return draft
    })
    const updated = adminMembers.map(m => m.id === id ? { ...m, ...updates } : m).find((member) => member.id === id)
    if (updated) persist('adminMembers', updated)
  }
  const deleteAdminMember = (id) => {
    setAdminMembers((prev) => prev.filter((member) => member.id !== id))
    removeDb('adminMembers', id)
  }

  return (
    <DataContext.Provider value={{
      isLoading, dbConnected,
      deals, lootDeals, stores, coupons, giveaways, creditCards, banners, adminSettings, adminMembers,
      addDeal, updateDeal, deleteDeal, getDealBySlug,
      addLootDeal, updateLootDeal, deleteLootDeal, getLootDealBySlug,
      addStore, updateStore, deleteStore, getStoreBySlug,
      addCoupon, updateCoupon, deleteCoupon,
      addGiveaway, updateGiveaway, deleteGiveaway,
      addCreditCard, updateCreditCard, deleteCreditCard,
      addBanner, updateBanner, deleteBanner, reorderBanners,
      updateAdminSettings,
      addAdminMember, updateAdminMember, deleteAdminMember,
      auditLog, addAuditLog, clearAuditLog,
      analytics, trackDealClick, trackCouponCopy, trackPageView,
      syncDataToDb,
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
