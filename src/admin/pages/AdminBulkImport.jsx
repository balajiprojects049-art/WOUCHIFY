import { useState, useRef } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import { G, cardStyle, btnPrimary, btnPrimaryCls, lbl } from '../components/adminStyles'

// ── CSV parser ────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase())
  return lines.slice(1).map(line => {
    const cells = []
    let cur = '', inQ = false
    for (const ch of line) {
      if (ch === '"') inQ = !inQ
      else if (ch === ',' && !inQ) { cells.push(cur); cur = '' }
      else cur += ch
    }
    cells.push(cur)
    const row = {}
    headers.forEach((h, i) => { row[h] = (cells[i] || '').trim().replace(/^"|"$/g, '') })
    return row
  }).filter(r => Object.values(r).some(v => v))
}

const TEMPLATES = {
  deals: `title,store,category,price,priceValue,discountLabel,discountValue,badge,code,expiry,description
"iPhone 15 Pro Max Deal","Amazon","Electronics","₹1,09,900","109900","Save ₹20,000","15","HOT","IPHONE15","Expires in 5 days","Get the latest iPhone at its lowest price ever"
"Nike Air Max Sneakers","Myntra","Fashion","₹8,999","8999","40% OFF","40","TRENDING","","Expires in 3 days","Premium running shoes with max cushioning"`,

  coupons: `store,code,discount,category,expiry,minOrder,success,badge
"Amazon India","AMAZON10","10% OFF","Electronics","Expires in 3 days","₹499","96%","HOT"
"Flipkart","FLIP15","15% OFF","All Categories","Expires in 2 days","₹999","91%","POPULAR"`,

  lootDeals: `title,category,oldPrice,newPrice,discountPercent,grabbed,stockLabel,urgency,description
"boAt Airdopes 141","Electronics","₹2,990","₹999","67","5k+","Only 50 left!","Ending in 2 hours","Premium wireless earbuds at loot price"
"MI Smart Band 8","Lifestyle","₹2,499","₹1,249","50","3k+","Few left!","Flash deal!","Track your fitness at half price"`,
}

const TYPE_OPTS = [
  { val: 'deals',     label: 'Deals' },
  { val: 'coupons',   label: 'Coupons' },
  { val: 'lootDeals', label: 'Loot Deals' },
]

function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2) }

export default function AdminBulkImport() {
  const { addDeal, addCoupon, addLootDeal, addAuditLog, currentUser } = useData()
  const [type, setType] = useState('deals')
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState(null) // { ok, msg }
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const rows = parseCSV(e.target.result)
        if (rows.length === 0) { setStatus({ ok: false, msg: 'No valid rows found in CSV.' }); return }
        setPreview(rows)
        setStatus(null)
      } catch (err) {
        setStatus({ ok: false, msg: 'Failed to parse CSV. Check file format.' })
      }
    }
    reader.readAsText(file)
  }

  const handleImport = () => {
    if (!preview || preview.length === 0) return
    let imported = 0
    const actor = currentUser?.name || 'System Auto'
    preview.forEach(row => {
      try {
        if (type === 'deals') {
          addDeal({
            slug: '', title: row.title || '', store: row.store || '', category: row.category || 'Electronics',
            price: row.price || '', priceValue: Number(row.pricevalue || 0),
            discountLabel: row.discountlabel || '', discountValue: Number(row.discountvalue || 0),
            badge: row.badge || 'HOT', code: row.code || '', expiry: row.expiry || '',
            description: row.description || '', expiresInSeconds: 7200, successRate: 90,
            usageCount: '', steps: [], highlights: [], terms: '', createdAt: new Date().toISOString(),
            addedBy: actor
          })
        } else if (type === 'coupons') {
          addCoupon({
            store: row.store || '', code: row.code || '', discount: row.discount || '',
            category: row.category || 'All Categories', expiry: row.expiry || '',
            minOrder: row.minorder || '', success: row.success || '', badge: row.badge || 'NEW', active: true,
            addedBy: actor
          })
        } else if (type === 'lootDeals') {
          addLootDeal({
            slug: '', title: row.title || '', category: row.category || 'Electronics',
            oldPrice: row.oldprice || '', newPrice: row.newprice || '',
            discountPercent: Number(row.discountpercent || 0), grabbed: row.grabbed || '',
            stockLabel: row.stocklabel || 'Limited stock!', urgency: row.urgency || 'Ending soon!',
            expiresInSeconds: 21600, popularity: 80, image: '', description: row.description || '',
            steps: [], terms: '', addedBy: actor
          })
        }
        imported++
      } catch (_) {}
    })
    if (addAuditLog) addAuditLog('IMPORT', type === 'deals' ? 'Deal' : type === 'coupons' ? 'Coupon' : 'Loot Deal', `Bulk imported ${imported} ${type}`)
    setStatus({ ok: true, msg: `✓ Successfully imported ${imported} ${type}!` })
    setPreview(null)
  }

  const downloadTemplate = () => {
    const csv = TEMPLATES[type]
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `wouchify_${type}_template.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout title="Bulk Import via CSV">
      <div className="max-w-3xl space-y-6">

        {/* Type selector */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <p className={lbl + ' mb-3'}>Select Import Type</p>
          <div className="flex gap-3 flex-wrap">
            {TYPE_OPTS.map(t => (
              <button key={t.val} onClick={() => { setType(t.val); setPreview(null); setStatus(null) }}
                className="flex-1 min-w-[120px] rounded-xl py-3 text-sm font-black transition-all"
                style={type === t.val
                  ? { background: G, color: '#070B12' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.5)' }
                }>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Download template */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(0,212,126,0.07)', border: '1px solid rgba(0,212,126,0.20)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black text-white">Download CSV Template</p>
              <p className="text-xs text-white/40 mt-1">Use this template as a starting point. Fill it in with your data and import.</p>
            </div>
            <button onClick={downloadTemplate} className="shrink-0 rounded-xl px-4 py-2.5 text-xs font-black transition-all hover:opacity-90 whitespace-nowrap" style={btnPrimary}>
              ↓ Download Template
            </button>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer rounded-2xl p-14 text-center transition-all"
          style={{
            border: `2px dashed ${dragging ? G : 'rgba(255,255,255,0.12)'}`,
            background: dragging ? 'rgba(0,212,126,0.06)' : 'rgba(255,255,255,0.02)',
          }}
        >
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => handleFile(e.target.files[0])} />
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'rgba(0,212,126,0.12)' }}>
            <svg viewBox="0 0 20 20" className="h-7 w-7" style={{ fill: G }}><path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75V9h5.25a.75.75 0 0 1 0 1.5H10.75v5.25a.75.75 0 0 1-1.5 0V10.5H4a.75.75 0 0 1 0-1.5h5.25V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd"/></svg>
          </div>
          <p className="text-sm font-black text-white">Drag & Drop CSV here</p>
          <p className="mt-1 text-xs text-white/40">or click to browse · .csv files only</p>
        </div>

        {/* Status message */}
        {status && (
          <div className="rounded-xl p-4 text-sm font-bold" style={status.ok
            ? { background: 'rgba(0,212,126,0.12)', border: '1px solid rgba(0,212,126,0.30)', color: G }
            : { background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.30)', color: '#f87171' }
          }>{status.msg}</div>
        )}

        {/* Preview table */}
        {preview && preview.length > 0 && (
          <div className="rounded-2xl p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-black text-white">{preview.length} rows ready to import</p>
              <div className="flex gap-2">
                <button onClick={() => { setPreview(null); setStatus(null) }} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white" style={{ background: 'rgba(255,255,255,0.07)' }}>Cancel</button>
                <button onClick={handleImport} className="rounded-lg px-4 py-1.5 text-xs font-black hover:opacity-90" style={btnPrimary}>Import All</button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <table className="w-full text-xs min-w-[500px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                    {Object.keys(preview[0]).slice(0, 6).map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 10).map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {Object.values(row).slice(0, 6).map((val, j) => (
                        <td key={j} className="px-4 py-2.5 text-white/60 max-w-[160px] truncate">{val || '—'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {preview.length > 10 && <p className="mt-2 text-center text-[11px] text-white/30">+{preview.length - 10} more rows not shown</p>}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
