import { useState, useMemo } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import SearchableSelect from '../components/SearchableSelect'
import { CATEGORY_SECTIONS } from '../../utils/categories'
import { getDealRemainingSeconds } from '../../utils/dealExpiry'
import {
  G, inp, lbl, cardStyle, tableWrapStyle, thStyle, trBorderStyle,
  searchInpCls, searchInpStyle, btnPrimary, btnPrimaryCls, btnCancelCls, btnCancelStyle,
  backLinkCls, editBtnCls, editBtnStyle, delBtnCls, delBtnStyle,
  confirmDialogStyle, inpStyle, inpFocus
} from '../components/adminStyles'

const EMPTY = {
  slug: '', title: '', store: '', category: 'Electronics', discountPercent: 70,
  oldPrice: '', newPrice: '', grabbed: '', stockLabel: 'Only a few left!',
  urgency: 'Ending soon — grab it now!', expiresInSeconds: 21600, popularity: 90, image: '',
  description: '', steps: '', terms: '', link: '',
  publishAt: '', // empty = publish immediately
}

function addFocus(e) { Object.assign(e.target.style, inpFocus) }
function remFocus(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

function SectionHeader({ title }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '1rem', paddingBottom: '0.75rem' }}>
      <p className="text-xs font-black uppercase tracking-widest text-white/50">{title}</p>
    </div>
  )
}

function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-sm p-8 text-center shadow-2xl" style={confirmDialogStyle}>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)' }}>
          <svg viewBox="0 0 20 20" className="h-7 w-7 fill-red-400"><path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4Z" /></svg>
        </div>
        <h3 className="text-lg font-black text-white">Delete this loot deal?</h3>
        <p className="mt-2 text-sm text-white/40">This will remove it from the user panel immediately.</p>
        <div className="mt-7 flex gap-3">
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function LootForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    const startMs = initial.createdAt ? new Date(initial.createdAt).getTime() : Date.now()
    const expiresMs = startMs + (initial.expiresInSeconds || 21600) * 1000
    const d = new Date(expiresMs)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    // Spread EMPTY first so all fields (like 'store') are always defined
    return { ...EMPTY, ...initial, expiresAt: d.toISOString().slice(0, 16) }
  })
  const [showAdvanced, setShowAdvanced] = useState(!!initial.publishAt)
  
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }
  const flatCategories = useMemo(() => Array.from(new Set(CATEGORY_SECTIONS.flatMap(s => Object.values(s.data).flat()))).sort(), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Always stamp createdAt at save-time for new deals (no existing createdAt)
    const nowIso = new Date().toISOString()
    const createdAt = form.createdAt || nowIso
    const createdAtMs = new Date(createdAt).getTime()
    const expiresAtMs = new Date(form.expiresAt).getTime()
    const expiresInSeconds = Math.max(0, Math.round((expiresAtMs - createdAtMs) / 1000))
    
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    onSave({
      ...form, slug,
      createdAt,        // ← always persisted so timer survives page reload
      expiresInSeconds, // ← calculated from real createdAt → real expiresAt
      discountPercent: Number(form.discountPercent),
      popularity: Number(form.popularity),
      steps: typeof form.steps === 'string' ? form.steps.split('\n').filter(Boolean) : form.steps,
      publishAt: showAdvanced && form.publishAt ? new Date(form.publishAt).toISOString() : '',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px] items-start">
        <div className="space-y-6">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Basic Information" />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={lbl}>Deal Title <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. iPhone 15 Mega Loot Drop" />
              </div>
              <div>
                <label className={lbl}>Store Name <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.store} onChange={e => set('store', e.target.value)} placeholder="e.g. Amazon, Flipkart, Myntra" />
              </div>
              <div>
                <label className={lbl}>Category</label>
                <SearchableSelect 
                  value={form.category} 
                  onChange={v => set('category', v)} 
                  options={flatCategories} 
                  placeholder="Search categories..."
                />
              </div>
              <div>
                <label className={lbl}>Popularity (0–100)</label>
                <input type="number" min="0" max="100" {...inputProps} value={form.popularity} onChange={e => set('popularity', e.target.value)} placeholder="90" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>URL Slug <span className="normal-case font-normal text-[10px] text-white/20">(auto if blank)</span></label>
                <input {...inputProps} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="iphone-15-mega-drop" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Product Link <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.link} onChange={e => set('link', e.target.value)} placeholder="https://amazon.in/dp/..." />
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Pricing & Discount" />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>Original Price <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.oldPrice} onChange={e => set('oldPrice', e.target.value)} placeholder="₹1,999" />
              </div>
              <div>
                <label className={lbl}>Loot Price <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.newPrice} onChange={e => set('newPrice', e.target.value)} placeholder="₹599" />
              </div>
              <div>
                <label className={lbl}>Discount %</label>
                <input type="number" min="1" max="99" {...inputProps} value={form.discountPercent} onChange={e => set('discountPercent', e.target.value)} placeholder="70" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Urgency & Timing" />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className={lbl}>Exact Expiry Date & Time <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required type="datetime-local" value={form.expiresAt || ''} onChange={e => set('expiresAt', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Grabbed Count</label>
                <input {...inputProps} value={form.grabbed} onChange={e => set('grabbed', e.target.value)} placeholder="5k+" />
              </div>
              <div>
                <label className={lbl}>Stock Label</label>
                <input {...inputProps} value={form.stockLabel} onChange={e => set('stockLabel', e.target.value)} placeholder="Only a few left!" />
              </div>
              <div>
                <label className={lbl}>Urgency Line</label>
                <input {...inputProps} value={form.urgency} onChange={e => set('urgency', e.target.value)} placeholder="Ending soon!" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Content" />
            <div className="space-y-4">
              <div>
                <label className={lbl}>Description</label>
                <textarea {...inputProps} rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Grab this incredible loot deal while stock lasts..." />
              </div>
              <div>
                <label className={lbl}>Steps to Claim <span className="normal-case font-normal text-[10px] text-white/20">(one per line)</span></label>
                <textarea {...inputProps} rows={4} value={Array.isArray(form.steps) ? form.steps.join('\n') : form.steps} onChange={e => set('steps', e.target.value)} placeholder={"Click 'Grab Deal'\nSign in or create account\nAdd to cart\nDiscount applies automatically"} />
              </div>
              <div>
                <label className={lbl}>Terms & Conditions</label>
                <textarea {...inputProps} rows={2} value={form.terms} onChange={e => set('terms', e.target.value)} placeholder="Valid while stock lasts. One per customer." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 sticky top-4 self-start">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Deal Image" />
            <ImageUpload label="" value={form.image} onChange={v => set('image', v)} height="h-52" />
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Preview" />
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {form.image && <img src={form.image} alt="" className="h-28 w-full rounded-lg object-cover mb-3" onError={e => e.target.style.display = 'none'} />}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white line-clamp-2">{form.title || 'Deal Title'}</p>
                <span className="ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black text-red-400" style={{ background: 'rgba(239,68,68,0.15)' }}>{form.discountPercent}% OFF</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-black text-white">{form.newPrice || '₹0'}</span>
                <span className="text-xs text-white/30 line-through">{form.oldPrice}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold" style={{ color: '#FBBF24' }}>
                ⚡ {form.urgency || 'Ending soon'}
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Advanced Scheduling */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.04)' }}>
              <button
                type="button"
                onClick={() => { setShowAdvanced(v => !v); if (showAdvanced) set('publishAt', '') }}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2">
                  <span>🗓️</span>
                  <div>
                    <p className="text-sm font-black text-white">Schedule Publishing</p>
                    <p className="text-[10px] text-white/40">{showAdvanced && form.publishAt ? `Live: ${new Date(form.publishAt).toLocaleString('en-IN')}` : 'Auto-publish at a future time'}</p>
                  </div>
                </div>
                <div className={`flex h-5 w-9 items-center rounded-full transition-all ${showAdvanced ? 'justify-end' : 'justify-start'}`} style={{ background: showAdvanced ? G : 'rgba(255,255,255,0.15)', padding: '2px' }}>
                  <span className="h-4 w-4 rounded-full bg-white shadow" />
                </div>
              </button>
              {showAdvanced && (
                <div className="px-4 pb-4 space-y-2 border-t" style={{ borderColor: 'rgba(251,191,36,0.15)' }}>
                  <p className="text-[10px] text-white/40 pt-3">Hidden from users until this date &amp; time.</p>
                  <input
                    type="datetime-local"
                    className={inp}
                    style={inpStyle}
                    value={form.publishAt ? new Date(new Date(form.publishAt).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                    min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                    onChange={e => set('publishAt', e.target.value)}
                  />
                  {form.publishAt && (
                    <div className="rounded-lg px-3 py-2 text-[11px] font-bold" style={{ background: 'rgba(251,191,36,0.1)', color: '#FBBF24' }}>
                      ⏰ Goes live: {new Date(form.publishAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button type="submit" className={btnPrimaryCls} style={btnPrimary}>
              {showAdvanced && form.publishAt ? '🗓️ Schedule Loot Deal' : '✓ Save Loot Deal'}
            </button>
            <button type="button" onClick={onCancel} className={btnCancelCls} style={btnCancelStyle}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function AdminLootDeals() {
  const { lootDeals, addLootDeal, updateLootDeal, deleteLootDeal, analytics } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [confirm, setConfirm] = useState(null)

  const filtered = lootDeals.filter(d => (d.title?.toLowerCase() || '').includes(search.toLowerCase()))
  const handleSave = (data) => {
    if (mode === 'add') addLootDeal(data)
    else updateLootDeal(editing.slug, data)
    setMode(null); setEditing(null)
  }

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add Loot Deal' : 'Edit Loot Deal'}>
      <div className="mb-5"><button onClick={() => { setMode(null); setEditing(null) }} className={backLinkCls}>← Back to Loot Deals</button></div>
      <LootForm initial={editing || EMPTY} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} />
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Loot Deals">
      {confirm && <ConfirmDialog onConfirm={() => { deleteLootDeal(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:max-w-xs w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search loot deals..." className={searchInpCls} style={searchInpStyle} />
        </div>
        <button onClick={() => { setMode('add'); setEditing(null) }} className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>+ Add Loot Deal</button>
      </div>

      <div style={tableWrapStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={thStyle}>
                {['Deal', 'Category', 'Status', 'Discount', 'New Price', 'Visits', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 6 ? 'text-right' : 'text-left'} ${i === 1 || i === 3 ? 'hidden sm:table-cell' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-white/30">No loot deals yet.</td></tr>}
              {filtered.map((d) => {
                const remaining = d.expiresInSeconds === undefined ? 1 : getDealRemainingSeconds(d)
                const isDead = remaining <= 0 || d.status === 'Expired'
                return (
                <tr key={d.slug} style={trBorderStyle}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {d.image
                        ? <img src={d.image} alt="" className={`h-9 w-9 rounded-lg object-cover shrink-0 ${isDead ? 'opacity-50 grayscale' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.10)' }} onError={e => e.target.style.display = 'none'} />
                        : <div className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 text-sm font-black" style={{ background: 'rgba(251,191,36,0.12)', color: '#FBBF24' }}>⚡</div>
                      }
                      <div>
                        <p className={`font-semibold text-sm ${isDead ? 'text-white/40 line-through' : 'text-white'}`}>{d.title}</p>
                        <div className="mt-1">
                          <span className="text-[9px] font-medium text-[#FBBF24]/90 bg-[#FBBF24]/10 border border-[#FBBF24]/20 px-1.5 py-0.5 rounded">
                            Added By: {d.addedBy || 'System Admin'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/50 hidden sm:table-cell">{d.category}</td>
                  <td className="px-5 py-4 text-sm">
                    {isDead ? (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-black bg-red-500/20 text-red-500">Expired</span>
                    ) : (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-black bg-[#00D47E]/20 text-[#00D47E]">Active</span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-black text-red-400" style={{ background: 'rgba(239,68,68,0.12)' }}>{d.discountPercent}% OFF</span>
                  </td>
                  <td className="px-5 py-4 font-bold" style={{ color: G }}>{d.newPrice}</td>
                  <td className="px-5 py-4 text-xs font-semibold text-white/50">
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 border border-white/10" title="Total Page Views">
                      <span className="text-[10px]">👁️</span>
                      <span style={{ color: G }}>{analytics?.dealClicks?.[d.slug] || 0}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditing(d); setMode('edit') }} className={editBtnCls} style={editBtnStyle}>Edit</button>
                      <button onClick={() => setConfirm(d.slug)} className={delBtnCls} style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-white/30">{filtered.length} of {lootDeals.length} loot deals</p>
    </AdminLayout>
  )
}
