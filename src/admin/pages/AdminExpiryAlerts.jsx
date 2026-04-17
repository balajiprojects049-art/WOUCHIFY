import { useMemo, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import { G, cardStyle, tableWrapStyle, thStyle, trBorderStyle, editBtnCls, editBtnStyle, delBtnCls } from '../components/adminStyles'
import { getDealRemainingSeconds } from '../../utils/dealExpiry'

// ── Expiry parsing ────────────────────────────────────────────────────────────
const EXPIRED_PHRASES  = ['expired', 'ended', 'unavailable']
const TODAY_PHRASES    = ['today', 'tonight', '0 day', 'ends now', 'last day']
const SOON_PHRASES     = ['1 day', '2 day', '3 day', 'tomorrow', '1 hour', '2 hour', 'ending soon']

function classify(text = '') {
  const t = text.toLowerCase()
  if (EXPIRED_PHRASES.some(p => t.includes(p))) return 'expired'
  if (TODAY_PHRASES.some(p => t.includes(p))) return 'today'
  if (SOON_PHRASES.some(p => t.includes(p))) return 'soon'
  return null
}

// also detect loot deals by expiresInSeconds
function classifySeconds(seconds) {
  const n = Number(seconds)
  if (isNaN(n) || n <= 0) return 'expired'
  if (n <= 3600)  return 'today'
  if (n <= 7200)  return 'today'
  if (n <= 86400) return 'soon'
  return null
}

const SEVERITY = {
  expired: { label: 'Expired',        bg: 'rgba(239,68,68,0.14)',   color: '#f87171', icon: '⛔', order: 0 },
  today:   { label: 'Expires Today',  bg: 'rgba(251,191,36,0.14)',  color: '#FBBF24', icon: '⚠️', order: 1 },
  soon:    { label: 'Expiring Soon',  bg: 'rgba(168,85,247,0.14)',  color: '#C084FC', icon: '🕐', order: 2 },
}

export default function AdminExpiryAlerts() {
  const { deals, lootDeals, coupons, deleteDeal, deleteLootDeal, deleteCoupon } = useData()
  const [filter, setFilter] = useState('all')
  const [confirmId, setConfirmId] = useState(null)

  const alerts = useMemo(() => {
    const items = []
    const nowMs = Date.now()

    deals.forEach(d => {
      const remainingSeconds = getDealRemainingSeconds(d, nowMs)
      const level = classifySeconds(remainingSeconds) || classify(d.expiry)
      if (level) {
        const hrs = Math.max(0, Math.round(remainingSeconds / 3600))
        const expiryText = d.expiry || (remainingSeconds <= 0 ? 'Expired' : `${hrs}h remaining`)
        items.push({ id: d.slug, type: 'Deal', title: d.title, expiryText, level, store: d.store, editPath: `/admin/deals` })
      }
    })

    lootDeals.forEach(d => {
      const remainingSeconds = getDealRemainingSeconds(d, nowMs)
      const level = classifySeconds(remainingSeconds)
      if (level) {
        const hrs = Math.max(0, Math.round(remainingSeconds / 3600))
        const expiryText = remainingSeconds <= 0 ? 'Expired' : `${hrs}h remaining`
        items.push({ id: d.slug, type: 'Loot Deal', title: d.title, expiryText, level, store: d.category, editPath: `/admin/loot-deals` })
      }
    })

    coupons.forEach(c => {
      const level = classify(c.expiry)
      if (level) items.push({ id: c.id, type: 'Coupon', title: `${c.code} — ${c.store}`, expiryText: c.expiry, level, store: c.store, editPath: `/admin/coupons` })
    })

    return items.sort((a, b) => SEVERITY[a.level].order - SEVERITY[b.level].order)
  }, [deals, lootDeals, coupons])

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.level === filter)

  const counts = {
    all: alerts.length,
    expired: alerts.filter(a => a.level === 'expired').length,
    today:   alerts.filter(a => a.level === 'today').length,
    soon:    alerts.filter(a => a.level === 'soon').length,
  }

  const handleDelete = (item) => {
    if (item.type === 'Deal') deleteDeal(item.id)
    else if (item.type === 'Loot Deal') deleteLootDeal(item.id)
    else if (item.type === 'Coupon') deleteCoupon(item.id)
    setConfirmId(null)
  }

  return (
    <AdminLayout title="Expiry Alerts">

      {/* Confirm Dialog */}
      {confirmId && (() => {
        const item = alerts.find(a => a.id === confirmId)
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
            <div className="w-full max-w-sm p-8 text-center shadow-2xl rounded-2xl" style={{ background: '#0C1018', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)' }}>
                <svg viewBox="0 0 20 20" className="h-7 w-7 fill-red-400"><path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4Z"/></svg>
              </div>
              <h3 className="text-lg font-black text-white">Delete "{item?.title?.slice(0, 30)}"?</h3>
              <p className="mt-2 text-sm text-white/40">This expired item will be permanently removed.</p>
              <div className="mt-7 flex gap-3">
                <button onClick={() => handleDelete(item)} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
                <button onClick={() => setConfirmId(null)} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        {[
          { key: 'all',     label: 'Total Alerts',   color: 'rgba(255,255,255,0.8)' },
          { key: 'expired', label: 'Expired',         color: '#f87171' },
          { key: 'today',   label: 'Expires Today',   color: '#FBBF24' },
          { key: 'soon',    label: 'Expiring Soon',   color: '#C084FC' },
        ].map(s => (
          <button key={s.key} onClick={() => setFilter(s.key)}
            className="rounded-2xl p-5 text-left transition-all"
            style={filter === s.key
              ? { background: 'rgba(0,212,126,0.09)', border: `1px solid rgba(0,212,126,0.28)` }
              : { ...cardStyle }
            }>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{counts[s.key]}</p>
          </button>
        ))}
      </div>

      {counts.all === 0 ? (
        <div className="rounded-2xl p-20 text-center" style={cardStyle}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(0,212,126,0.10)' }}>
            <svg viewBox="0 0 20 20" className="h-7 w-7" style={{ fill: G }}><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z" clipRule="evenodd"/></svg>
          </div>
          <p className="text-lg font-black text-white">All Clear! 🎉</p>
          <p className="mt-2 text-sm text-white/40">No expired or expiring deals, coupons or loot deals found.</p>
        </div>
      ) : (
        <div style={tableWrapStyle}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr style={thStyle}>
                  {['Status', 'Type', 'Title / Code', 'Expiry Info', 'Actions'].map((h, i) => (
                    <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const sev = SEVERITY[item.level]
                  return (
                    <tr key={`${item.type}-${item.id}`} style={trBorderStyle}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="px-5 py-4">
                        <span className="rounded-full px-2.5 py-1 text-[10px] font-black whitespace-nowrap" style={{ background: sev.bg, color: sev.color }}>{sev.label}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg px-2 py-1 text-[10px] font-bold text-white/50" style={{ background: 'rgba(255,255,255,0.07)' }}>{item.type}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white text-sm leading-tight">{item.title}</p>
                        <p className="text-[11px] text-white/30">{item.store}</p>
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold" style={{ color: sev.color }}>{item.expiryText}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] text-white/25 italic">edit in {item.type === 'Deal' ? 'Deals' : item.type === 'Loot Deal' ? 'Loot Deals' : 'Coupons'}</span>
                          <button onClick={() => setConfirmId(item.id)} className={delBtnCls} style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-white/30">{filtered.length} alert{filtered.length !== 1 ? 's' : ''} shown</p>
    </AdminLayout>
  )
}
