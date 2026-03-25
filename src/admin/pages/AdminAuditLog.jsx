import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import { G, cardStyle, tableWrapStyle, thStyle, trBorderStyle, searchInpCls, searchInpStyle } from '../components/adminStyles'

const ACTION_META = {
  CREATE: { bg: 'rgba(0,212,126,0.13)', color: '#00D47E', label: 'Create' },
  UPDATE: { bg: 'rgba(59,130,246,0.13)', color: '#60A5FA', label: 'Update' },
  DELETE: { bg: 'rgba(239,68,68,0.13)', color: '#f87171', label: 'Delete' },
  IMPORT: { bg: 'rgba(168,85,247,0.13)', color: '#C084FC', label: 'Import' },
}

const ENTITY_COLORS = {
  'Deal': '#00D47E', 'Loot Deal': '#FBBF24', 'Store': '#A78BFA',
  'Coupon': '#34D399', 'Giveaway': '#F472B6', 'Credit Card': '#60A5FA',
  'Banner': '#FB923C', 'Settings': '#94A3B8',
}

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  } catch { return iso }
}

export default function AdminAuditLog() {
  const { auditLog, clearAuditLog } = useData()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 25

  const filtered = auditLog
    .filter(log => filter === 'all' || log.action === filter)
    .filter(log =>
      search === '' ||
      log.detail.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase())
    )

  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length

  const counts = {
    all: auditLog.length,
    CREATE: auditLog.filter(l => l.action === 'CREATE').length,
    UPDATE: auditLog.filter(l => l.action === 'UPDATE').length,
    DELETE: auditLog.filter(l => l.action === 'DELETE').length,
    IMPORT: auditLog.filter(l => l.action === 'IMPORT').length,
  }

  const exportCSV = () => {
    const rows = [['Timestamp', 'Action', 'Entity', 'Detail', 'Actor']]
    filtered.forEach(l => rows.push([l.timestamp, l.action, l.entity, `"${l.detail}"`, l.actor]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'audit_log.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout title="Audit Log">

      {/* Clear confirm dialog */}
      {confirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm p-8 text-center rounded-2xl shadow-2xl" style={{ background: '#0C1018', border: '1px solid rgba(255,255,255,0.10)' }}>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)' }}>
              <svg viewBox="0 0 20 20" className="h-7 w-7 fill-red-400"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4Z" clipRule="evenodd"/></svg>
            </div>
            <h3 className="text-lg font-black text-white">Clear Entire Audit Log?</h3>
            <p className="mt-2 text-sm text-white/40">This will permanently delete all {auditLog.length} log entries. This cannot be undone.</p>
            <div className="mt-7 flex gap-3">
              <button onClick={() => { clearAuditLog(); setConfirmClear(false) }} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Clear All</button>
              <button onClick={() => setConfirmClear(false)} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter pills + actions */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: `All (${counts.all})` },
            { key: 'CREATE', label: `Create (${counts.CREATE})` },
            { key: 'UPDATE', label: `Update (${counts.UPDATE})` },
            { key: 'DELETE', label: `Delete (${counts.DELETE})` },
            { key: 'IMPORT', label: `Import (${counts.IMPORT})` },
          ].map(f => (
            <button key={f.key} onClick={() => { setFilter(f.key); setPage(1) }}
              className="rounded-full px-4 py-1.5 text-xs font-black transition-all"
              style={filter === f.key
                ? { background: 'rgba(0,212,126,0.15)', border: '1px solid rgba(0,212,126,0.35)', color: G }
                : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.45)' }
              }>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={exportCSV} className="rounded-xl px-4 py-2 text-xs font-bold text-white/60 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
            ↓ Export CSV
          </button>
          {auditLog.length > 0 && (
            <button onClick={() => setConfirmClear(true)} className="rounded-xl px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors" style={{ background: 'rgba(239,68,68,0.08)' }}>
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search log entries..." className={searchInpCls} style={searchInpStyle} />
      </div>

      {auditLog.length === 0 ? (
        <div className="rounded-2xl p-20 text-center" style={cardStyle}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(168,85,247,0.12)' }}>
            <svg viewBox="0 0 20 20" className="h-7 w-7 fill-purple-400"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1zm3 8V5.5a3 3 0 1 0-6 0V9h6z" clipRule="evenodd"/></svg>
          </div>
          <p className="text-base font-black text-white">Audit log is empty</p>
          <p className="mt-2 text-sm text-white/40">Every create, update, delete and import action will be automatically logged here.</p>
        </div>
      ) : (
        <>
          <div style={tableWrapStyle}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr style={thStyle}>
                    {['Timestamp', 'Action', 'Entity', 'Description', 'By'].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-white/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No entries match your filter.</td></tr>
                  )}
                  {paginated.map(log => {
                    const am = ACTION_META[log.action] || ACTION_META.UPDATE
                    const entityColor = ENTITY_COLORS[log.entity] || 'rgba(255,255,255,0.6)'
                    return (
                      <tr key={log.id} style={trBorderStyle}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td className="px-5 py-3.5 text-[11px] text-white/35 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                        <td className="px-5 py-3.5">
                          <span className="rounded-full px-2.5 py-1 text-[10px] font-black whitespace-nowrap" style={{ background: am.bg, color: am.color }}>{am.label}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-bold" style={{ color: entityColor }}>{log.entity}</span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-white/55 max-w-xs truncate">{log.detail}</td>
                        <td className="px-5 py-3.5 text-xs text-white/35">{log.actor}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-white/30">{filtered.length} entries · showing {paginated.length}</p>
            {hasMore && (
              <button onClick={() => setPage(p => p + 1)}
                className="rounded-xl px-5 py-2.5 text-xs font-black transition-all hover:opacity-90"
                style={{ background: 'rgba(0,212,126,0.12)', border: '1px solid rgba(0,212,126,0.25)', color: G }}>
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}
