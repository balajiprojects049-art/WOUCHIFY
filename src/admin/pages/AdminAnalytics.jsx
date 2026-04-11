import { useMemo } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import { G, cardStyle, badgePillStyle } from '../components/adminStyles'

const ACTION_COLOR = {
  CREATE: { bg: 'rgba(0,212,126,0.12)', color: '#00D47E', label: 'Created' },
  UPDATE: { bg: 'rgba(59,130,246,0.12)', color: '#60A5FA', label: 'Updated' },
  DELETE: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', label: 'Deleted' },
  IMPORT: { bg: 'rgba(168,85,247,0.12)', color: '#C084FC', label: 'Imported' },
}

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="rounded-2xl p-5" style={cardStyle}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${accent}18` }}>
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{label}</span>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-white/40">{sub}</p>}
    </div>
  )
}

function MiniBar({ label, value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 truncate text-xs text-white/50 text-right">{label}</span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="w-8 text-xs font-bold text-right" style={{ color }}>{value}</span>
    </div>
  )
}

export default function AdminAnalytics() {
  const { deals, lootDeals, stores, coupons, giveaways, creditCards, analytics, auditLog } = useData()

  const totalDeals = deals.length
  const totalLoot = lootDeals.length
  const totalStores = stores.length
  const totalCoupons = coupons.length
  const totalGiveaways = giveaways.length
  const totalCards = (creditCards.shopping || []).length + (creditCards.lifetime || []).length
  const totalContent = totalDeals + totalLoot + totalStores + totalCoupons + totalGiveaways + totalCards

  // Active vs inactive
  const activeDeals = deals.filter(d => !d.expiry?.toLowerCase().includes('expired')).length
  const activeCoupons = coupons.filter(c => c.active).length

  // Top deals by clicks
  const dealClickEntries = Object.entries(analytics.dealClicks || {})
    .map(([slug, count]) => ({ slug, count, title: deals.find(d => d.slug === slug)?.title || slug }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
  const maxClicks = dealClickEntries[0]?.count || 1

  // Top coupons by copies
  const couponCopyEntries = Object.entries(analytics.couponCopies || {})
    .map(([id, count]) => ({ id, count, code: coupons.find(c => c.id === id)?.code || id }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
  const maxCopies = couponCopyEntries[0]?.count || 1

  // Page views
  const pageViewEntries = Object.entries(analytics.pageViews || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
  const maxViews = pageViewEntries[0]?.[1] || 1

  // Content breakdown
  const breakdown = [
    { label: 'Deals', count: totalDeals, color: G },
    { label: 'Loot Deals', count: totalLoot, color: '#60A5FA' },
    { label: 'Stores', count: totalStores, color: '#A78BFA' },
    { label: 'Coupons', count: totalCoupons, color: '#FBBF24' },
    { label: 'Giveaways', count: totalGiveaways, color: '#F472B6' },
    { label: 'Credit Cards', count: totalCards, color: '#34D399' },
  ]

  // Recent activity (last 10 audit logs)
  const recentActivity = auditLog.slice(0, 10)

  const totalClicks = dealClickEntries.reduce((a, b) => a + b.count, 0)
  const totalCopies = couponCopyEntries.reduce((a, b) => a + b.count, 0)

  return (
    <AdminLayout title="Analytics & Insights">

      {/* ── Headline KPIs ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        <StatCard label="Total Content" value={totalContent} sub={`across ${6} categories`} accent={G}
          icon={<svg viewBox="0 0 20 20" className="h-5 w-5" style={{ fill: G }}><path d="M2 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5zm6-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7zm6-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4z"/></svg>}
        />
        <StatCard label="Deal Clicks" value={totalClicks} sub="tracked user interactions" accent="#60A5FA"
          icon={<svg viewBox="0 0 20 20" className="h-5 w-5 fill-blue-400"><path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84z"/></svg>}
        />
        <StatCard label="Coupon Copies" value={totalCopies} sub="times codes were copied" accent="#FBBF24"
          icon={<svg viewBox="0 0 20 20" className="h-5 w-5 fill-yellow-400"><path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1z"/><path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5z"/></svg>}
        />
        <StatCard label="Audit Events" value={auditLog.length} sub="admin actions logged" accent="#A78BFA"
          icon={<svg viewBox="0 0 20 20" className="h-5 w-5 fill-purple-400"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1zm3 8V5.5a3 3 0 1 0-6 0V9h6z" clipRule="evenodd"/></svg>}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">

        {/* ── Top Deals by Clicks ── */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={cardStyle}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <p className="text-xs font-black uppercase tracking-widest text-white/50">Top Deals by Clicks</p>
          </div>
          {dealClickEntries.length === 0 ? (
            <div className="py-10 text-center text-sm text-white/25">
              No deal clicks tracked yet. Clicks will appear here as users interact with deals.
            </div>
          ) : (
            <div className="space-y-3">
              {dealClickEntries.map((d, i) => (
                <MiniBar key={d.slug} label={`${i + 1}. ${d.title.slice(0, 20)}`} value={d.count} max={maxClicks} color={G} />
              ))}
            </div>
          )}
        </div>

        {/* ── Content Breakdown ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <p className="text-xs font-black uppercase tracking-widest text-white/50">Content Breakdown</p>
          </div>
          <div className="space-y-3.5">
            {breakdown.map(b => (
              <div key={b.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: b.color }} />
                  <span className="text-sm text-white/60">{b.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-full rounded-full" style={{ width: `${totalContent > 0 ? (b.count / totalContent) * 100 : 0}%`, background: b.color }} />
                  </div>
                  <span className="w-6 text-right text-sm font-bold" style={{ color: b.color }}>{b.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl p-4 text-center" style={{ background: 'rgba(0,212,126,0.07)', border: '1px solid rgba(0,212,126,0.15)' }}>
            <p className="text-2xl font-black" style={{ color: G }}>{totalContent}</p>
            <p className="text-xs text-white/40 mt-0.5">Total items in CMS</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">

        {/* ── Top Coupons by Copies ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <p className="text-xs font-black uppercase tracking-widest text-white/50">Most Copied Coupon Codes</p>
          </div>
          {couponCopyEntries.length === 0 ? (
            <div className="py-8 text-center text-sm text-white/25">No coupon copies tracked yet.</div>
          ) : (
            <div className="space-y-3">
              {couponCopyEntries.map((c, i) => (
                <MiniBar key={c.id} label={`${i + 1}. ${c.code}`} value={c.count} max={maxCopies} color="#FBBF24" />
              ))}
            </div>
          )}
        </div>

        {/* ── Page Views ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <p className="text-xs font-black uppercase tracking-widest text-white/50">Page Views</p>
          </div>
          {pageViewEntries.length === 0 ? (
            <div className="py-8 text-center text-sm text-white/25">No page views tracked yet.</div>
          ) : (
            <div className="space-y-3">
              {pageViewEntries.map(([page, count]) => (
                <MiniBar key={page} label={`/${page}`} value={count} max={maxViews} color="#A78BFA" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Active vs Total Summary ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: 'Active Deals', value: activeDeals, total: totalDeals, color: G },
          { label: 'Active Coupons', value: activeCoupons, total: totalCoupons, color: '#FBBF24' },
          { label: 'Stores Listed', value: totalStores, total: totalStores, color: '#A78BFA' },
          { label: 'Giveaways Live', value: giveaways.filter(g => g.active).length, total: totalGiveaways, color: '#F472B6' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={cardStyle}>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{s.label}</p>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-white/30 mt-0.5">of {s.total} total</p>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="h-full rounded-full" style={{ width: `${s.total > 0 ? (s.value / s.total) * 100 : 0}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Activity Feed ── */}
      <div className="rounded-2xl p-5" style={cardStyle}>
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          <p className="text-xs font-black uppercase tracking-widest text-white/50">Recent Activity (last 10 actions)</p>
        </div>
        {recentActivity.length === 0 ? (
          <div className="py-8 text-center text-sm text-white/25">No activity logged yet. Admin actions will appear here automatically.</div>
        ) : (
          <div className="space-y-2">
            {recentActivity.map(log => {
              const ac = ACTION_COLOR[log.action] || ACTION_COLOR.UPDATE
              return (
                <div key={log.id} className="flex items-center gap-3 rounded-xl px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-black shrink-0" style={{ background: ac.bg, color: ac.color }}>{ac.label}</span>
                  <span className="text-[11px] font-bold text-white/60 shrink-0">{log.entity}</span>
                  <span className="flex-1 text-xs text-white/40 truncate">{log.detail}</span>
                  <span className="text-[10px] text-white/20 shrink-0">{new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
