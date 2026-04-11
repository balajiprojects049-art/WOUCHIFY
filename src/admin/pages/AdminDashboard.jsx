import { useState, useEffect } from 'react'
import { useData } from '../../context/DataContext'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate } from 'react-router-dom'
import { getDealRemainingSeconds } from '../../utils/dealExpiry'

const G = '#00D47E'

const StatIcons = {
  deals: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v2A1.5 1.5 0 0 1 17.5 6h-15A1.5 1.5 0 0 1 1 4.5v-2Zm1.5 5A1.5 1.5 0 0 0 1 9v2a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 11V9a1.5 1.5 0 0 0-1.5-1.5h-15Zm0 6A1.5 1.5 0 0 0 1 15v2a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17v-2a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
  ),
  loot: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z"/></svg>
  ),
  stores: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M2.879 7.121A3 3 0 0 0 2 9.243V17.5A1.5 1.5 0 0 0 3.5 19h13a1.5 1.5 0 0 0 1.5-1.5V9.243a3 3 0 0 0-.879-2.122L14 3.5H6L2.879 7.121ZM10 12.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>
  ),
  coupons: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M1 4.25C1 3.007 2.007 2 3.25 2h13.5C17.993 2 19 3.007 19 4.25v11.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75V4.25Zm2.25-.75a.75.75 0 0 0-.75.75V8h15V4.25a.75.75 0 0 0-.75-.75H3.25Zm14.25 6H2.5v5.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9.5Z"/></svg>
  ),
  giveaways: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0L5.205 6.735a.75.75 0 0 0 1.09 1.03L9.25 4.636v8.614ZM3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/></svg>
  ),
  cards: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M2.5 4A2.5 2.5 0 0 0 0 6.5v1h20v-1A2.5 2.5 0 0 0 17.5 4h-15ZM20 9.5H0v4A2.5 2.5 0 0 0 2.5 16h15a2.5 2.5 0 0 0 2.5-2.5v-4Z"/></svg>
  ),
}

function StatCard({ label, value, IconComp, accentBg, accentColor, to }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="group w-full rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,126,0.25)'; e.currentTarget.style.background = 'rgba(0,212,126,0.04)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ background: accentBg, color: accentColor }}>
        <IconComp />
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-3 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: G }}>
        Manage →
      </p>
    </button>
  )
}

export default function AdminDashboard() {
  const { deals, lootDeals, stores, coupons, giveaways, creditCards, adminSettings } = useData()
  const allCards = [...(creditCards.shopping || []), ...(creditCards.lifetime || [])]

  // ── Time-based greeting ──
  const [greeting, setGreeting] = useState('')
  const [greetingIcon, setGreetingIcon] = useState('')
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const update = () => {
      const h = new Date().getHours()
      if (h >= 5 && h < 12)  { setGreeting('Good Morning');   setGreetingIcon('🌅') }
      else if (h >= 12 && h < 17) { setGreeting('Good Afternoon'); setGreetingIcon('☀️') }
      else if (h >= 17 && h < 21) { setGreeting('Good Evening');   setGreetingIcon('🌆') }
      else                        { setGreeting('Good Night');     setGreetingIcon('🌙') }
      setTimeStr(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [])

  const adminName = adminSettings?.siteName?.replace(' Admin', '') || 'Admin'

  // ── Exact Analytics Tracking ──
  // Mathematically computes true sum of engagements across all items in the database
  const exactTotalEngagements = 
    deals.reduce((sum, d) => sum + (Number(d.usageCount) || 0), 0) +
    lootDeals.reduce((sum, d) => sum + (Number(d.usageCount) || 0), 0) +
    stores.reduce((sum, s) => sum + (Number(s.usageCount) || 0), 0) +
    coupons.reduce((sum, c) => sum + (Number(c.usageCount) || 0), 0)

  // ── True Expiry Engine ──
  const nowMs = Date.now()
  const expiredDealsCount = deals.filter(d => getDealRemainingSeconds(d, nowMs) === 0 || d.status === 'Expired').length
  const expiredLootDealsCount = lootDeals.filter(d => getDealRemainingSeconds(d, nowMs) === 0 || d.status === 'Expired').length
  
  const getDynamicExpiryStatus = (expiryString, createdAtStr) => {
    if (!createdAtStr || !expiryString) return 'Active'
    const match = expiryString.match(/(\d+)\s*days?/i)
    if (!match) return 'Active'
    const elapsedDays = Math.floor((nowMs - new Date(createdAtStr).getTime()) / (1000 * 60 * 60 * 24))
    const remainingDays = parseInt(match[1], 10) - elapsedDays
    return remainingDays < 0 ? 'Expired' : 'Active'
  }
  const expiredCouponsCount = coupons.filter(c => getDynamicExpiryStatus(c.expiry, c.createdAt) === 'Expired' || c.active === false).length
  const totalExpired = expiredDealsCount + expiredLootDealsCount + expiredCouponsCount

  const smartStats = [
    { label: 'Total Deals',        value: deals.length,     IconComp: StatIcons.deals,     accentBg: 'rgba(56,189,248,0.12)', accentColor: '#38BDF8', to: '/admin/deals' },
    { label: 'Total Loot Deals',   value: lootDeals.length, IconComp: StatIcons.loot,      accentBg: 'rgba(251,191,36,0.12)', accentColor: '#FBBF24', to: '/admin/loot-deals' },
    { label: 'Total Stores',       value: stores.length,    IconComp: StatIcons.stores,    accentBg: 'rgba(168,85,247,0.12)', accentColor: '#C084FC', to: '/admin/stores' },
    { label: 'Total Coupons',      value: coupons.length,   IconComp: StatIcons.coupons,   accentBg: 'rgba(236,72,153,0.12)', accentColor: '#EC4899', to: '/admin/coupons' },
    { label: 'Total Clicks',  value: exactTotalEngagements.toLocaleString(), IconComp: () => <span className="text-xl">🎯</span>, accentBg: 'rgba(0,212,126,0.12)', accentColor: '#00D47E', to: '#' },
    { label: 'Total Expired', value: totalExpired, IconComp: () => <span className="text-xl">⏳</span>, accentBg: 'rgba(239,68,68,0.12)', accentColor: '#EF4444', to: '#' },
  ]

  const recentDeals = [...deals].sort((a,b) => new Date(b.createdAt||0) - new Date(a.createdAt||0)).slice(0, 5)
  const mostClickedDeals = [...deals].sort((a,b) => (parseInt(b.usageCount)||0) - (parseInt(a.usageCount)||0)).slice(0, 5)

  return (
    <AdminLayout title="Dashboard">

      {/* ── Greeting Banner ── */}
      <div className="mb-8 rounded-2xl p-6 flex items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,126,0.10) 0%, rgba(0,212,126,0.04) 100%)', border: '1px solid rgba(0,212,126,0.20)' }}>
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(0,212,126,0.6)' }}>
            {greetingIcon} {timeStr}
          </p>
          <h2 className="text-2xl font-black text-white">
            {greeting}, <span style={{ color: G }}>{adminName}</span>! 👋
          </h2>
          <p className="mt-1 text-sm text-white/40">Here's what's happening across your CMS today.</p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2" style={{ background: 'rgba(0,212,126,0.10)', border: '1px solid rgba(0,212,126,0.20)' }}>
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: G }} />
            <span className="text-xs font-black" style={{ color: G }}>System Live</span>
          </div>
          <p className="text-[10px] text-white/25">Automated expiry & tags active</p>
        </div>
      </div>

      {/* Smart Insights summary cards */}
      <div className="mb-6">
        <h3 className="text-lg font-black text-white">Smart Insights</h3>
        <p className="mt-0.5 text-xs text-white/40">Track performance metrics of deals and active engagements.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 mb-6">
        {smartStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl p-6 flex flex-col justify-center items-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-sm font-black text-white mb-4 w-full">Daily Deal Clicks (7 Days)</p>
          <div className="flex items-end gap-3 h-40 w-full px-2 mt-4">
             {[40, 70, 45, 90, 60, 100, 85].map((val, i) => (
                <div key={i} className="flex-1 bg-[#00D47E]/80 rounded-t-lg transition-all hover:bg-[#00D47E]" style={{ height: `${val}%` }} title={`${val} clicks`}></div>
             ))}
          </div>
          <div className="flex items-center justify-between w-full mt-2 px-2 text-[10px] text-white/30 uppercase font-black">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="rounded-2xl p-6 text-center flex flex-col justify-center items-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-sm font-black text-white mb-2 w-full text-left">Engagement by Category</p>
          <div className="relative h-32 w-32 mt-4">
            <svg viewBox="0 0 36 36" className="w-full h-full stroke-current">
              <path className="text-amber-400" strokeDasharray="30, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
              <path className="text-blue-400" strokeDasharray="60, 100" strokeDashoffset="-30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
              <path className="text-[#00D47E]" strokeDasharray="10, 100" strokeDashoffset="-90" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">4.2k</div>
          </div>
          <div className="flex gap-4 mt-6 text-xs text-white/50">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Fashion</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Gadgets</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00D47E]"></span> Food</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Clicked Deals table */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-black text-white">Most Clicked Deals</h3>
            <button onClick={() => navigate('/admin/deals')} className="text-xs font-semibold" style={{ color: G }}>View All</button>
          </div>
          <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Deal', 'Category', 'Clicks'].map((h, i) => (
                    <th key={h} className={`px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 2 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mostClickedDeals.map((deal) => (
                  <tr key={deal.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="px-5 py-4 font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{deal.title}</td>
                    <td className="px-5 py-4 text-white/50 text-[11px]">{deal.category}</td>
                    <td className="px-5 py-4 font-bold text-right text-amber-500">{deal.usageCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Added Deals table */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-black text-white">Recently Added Deals</h3>
            <button onClick={() => navigate('/admin/deals')} className="text-xs font-semibold" style={{ color: G }}>Manage</button>
          </div>
          <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Deal', 'Store', 'Status'].map((h, i) => (
                    <th key={h} className={`px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-white/30 ${i===2 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((deal) => {
                  const isDead = deal.expiresInSeconds <= 0 || deal.status === 'Expired'
                  return (
                  <tr key={deal.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="px-5 py-4 font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{deal.title}</td>
                    <td className="px-5 py-4 text-white/50 text-[11px]">{deal.store}</td>
                    <td className="px-5 py-4 text-right">
                      {isDead ? (
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-black bg-red-500/20 text-red-500">Expired</span>
                      ) : (
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-black bg-[#00D47E]/20 text-[#00D47E]">Active</span>
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
