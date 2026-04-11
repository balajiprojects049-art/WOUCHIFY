const res = await fetch('http://localhost:5000/api/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    deals: [],
    lootDeals: [],
    stores: [],
    coupons: [],
    giveaways: [],
    advertisements: [],
    adminMembers: [],
    auditLog: [],
    creditCards: { shopping: [], lifetime: [] },
    banners: {},
    analytics: {},
    adminSettings: {}
  })
})
const r = await res.json()
console.log(r.success ? '✅ All seeded data cleared from database!' : '❌ Failed: ' + JSON.stringify(r))
