import { useState, useMemo } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import SearchableSelect from '../components/SearchableSelect'
import { CATEGORY_SECTIONS } from '../../utils/categories'
import { formatExpiryFromSeconds, getDealRemainingSeconds } from '../../utils/dealExpiry'
import {
  G, inp, lbl, sel, cardStyle, tableWrapStyle, thStyle, trBorderStyle,
  searchInpCls, searchInpStyle, btnPrimary, btnPrimaryCls, btnCancelCls, btnCancelStyle,
  backLinkCls, editBtnCls, editBtnStyle, delBtnCls, delBtnStyle, badgePillStyle,
  confirmDialogStyle, inpStyle, inpFocus
} from '../components/adminStyles'

const EMPTY_DEAL = {
  slug: '', title: '', store: '', category: 'Electronics', discountLabel: '', discountValue: 0,
  type: 'offer', price: '', originalPrice: '', priceValue: 0, usageCount: '', expiresInSeconds: 7200,
  successRate: 90, expiry: '', badge: 'HOT', code: '', image: '', description: '',
  terms: '', steps: '', highlights: '', link: '', createdAt: new Date().toISOString(),
  priority: 'Medium', status: 'Active', featured: false, trending: false, telegramSync: true,
  publishAt: '', // Scheduled publish date — empty = publish immediately
}
// CATEGORY_SECTIONS is now used to group categories.
const BADGES = ['HOT', 'TRENDING', 'EXCLUSIVE', 'LIMITED', 'COUPON', 'TRAVEL', 'NEW', 'FLASH']
const TYPES = ['offer', 'coupon', 'reward']
const PRIORITIES = ['High', 'Medium', 'Low']
const STATUSES = ['Active', 'Draft', 'Expired']

function addFocusBlur(e) { Object.assign(e.target.style, inpFocus) }
function remFocusBlur(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

function SectionHeader({ title }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '1rem', paddingBottom: '0.75rem' }}>
      <p className="text-xs font-black uppercase tracking-widest text-white/50">{title}</p>
    </div>
  )
}

function ConfirmDialog({ onConfirm, onCancel, message = 'This will immediately remove it from the user panel.' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-sm p-8 text-center shadow-2xl" style={confirmDialogStyle}>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)' }}>
          <svg viewBox="0 0 20 20" className="h-7 w-7 fill-red-400"><path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" /></svg>
        </div>
        <h3 className="text-lg font-black text-white">Delete this deal?</h3>
        <p className="mt-2 text-sm text-white/40">{message}</p>
        <div className="mt-7 flex gap-3">
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function DealForm({ initial, onSave, onCancel, role }) {
  const isEditor = role === 'Operational Executive'
  
  const [form, setForm] = useState(() => {
    const startMs = initial.createdAt ? new Date(initial.createdAt).getTime() : Date.now()
    const expiresMs = startMs + (initial.expiresInSeconds || 86400) * 1000
    const d = new Date(expiresMs)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return { ...initial, expiresAt: d.toISOString().slice(0, 16), status: isEditor ? 'Draft' : initial.status || 'Active' }
  })
  const [showAdvanced, setShowAdvanced] = useState(!!initial.publishAt)
  
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const flatCategories = useMemo(() => Array.from(new Set(CATEGORY_SECTIONS.flatMap(s => Object.values(s.data).flat()))).sort(), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const createdAtMs = form.createdAt ? new Date(form.createdAt).getTime() : Date.now()
    const expiresAtMs = new Date(form.expiresAt).getTime()
    const expiresInSeconds = Math.max(0, Math.round((expiresAtMs - createdAtMs) / 1000))
    
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    
    // Auto-generate clear expiry text
    const expDate = new Date(form.expiresAt)
    const expiryText = `Expires ${expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`

    onSave({
      ...form, slug,
      discountValue: Number(form.discountValue),
      priceValue: Number(form.priceValue),
      expiresInSeconds,
      successRate: Number(form.successRate),
      expiry: expiryText,
      steps: typeof form.steps === 'string' ? form.steps.split('\n').filter(Boolean) : form.steps,
      highlights: typeof form.highlights === 'string' ? form.highlights.split('\n').filter(Boolean) : form.highlights,
      createdAt: form.createdAt || new Date().toISOString(),
      publishAt: showAdvanced && form.publishAt ? new Date(form.publishAt).toISOString() : '',
    })
  }

  const inputProps = { className: inp, style: inpStyle, onFocus: addFocusBlur, onBlur: remFocusBlur }
  const selectProps = { className: `${inp} cursor-pointer`, style: inpStyle, onFocus: addFocusBlur, onBlur: remFocusBlur }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px] items-start">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Basic Info */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Basic Information" />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className={lbl}>Deal Title <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. iPhone 15 Pro Max – Amazon Deal" />
              </div>
              <div>
                <label className={lbl}>Store Name <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.store} onChange={e => set('store', e.target.value)} placeholder="e.g. Amazon, Flipkart" />
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
                <label className={lbl}>Deal Type</label>
                <select {...selectProps} value={form.type} onChange={e => set('type', e.target.value)}>
                  {TYPES.map(t => <option key={t} value={t} className="bg-[#0C1018]">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Status (Auto update tracking) {isEditor && <span className="text-red-400 font-normal lowercase">(Locked to Draft for Executive)</span>}</label>
                <select {...selectProps} value={form.status} onChange={e => set('status', e.target.value)} disabled={isEditor}>
                  {STATUSES.map(s => <option key={s} value={s} className="bg-[#0C1018]">{s}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Priority Level</label>
                <select {...selectProps} value={form.priority} onChange={e => set('priority', e.target.value)}>
                  {PRIORITIES.map(s => <option key={s} value={s} className="bg-[#0C1018]">{s}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Badge / Tag</label>
                <select {...selectProps} value={form.badge} onChange={e => set('badge', e.target.value)}>
                  {BADGES.map(b => <option key={b} value={b} className="bg-[#0C1018]">{b}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Coupon Code</label>
                <input {...inputProps} value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} placeholder="e.g. IPHONE18" />
              </div>
              <div>
                <label className={lbl}>URL Slug <span className="normal-case font-normal text-[10px] text-white/20">(auto if blank)</span></label>
                <input {...inputProps} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="iphone-15-pro-max" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className={lbl}>Deal URL / Redirect Link</label>
                <input {...inputProps} type="url" value={form.link || form.url || ''} onChange={e => set('link', e.target.value)} placeholder="https://amazon.in/dp/..." />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Pricing & Discount" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { lbl: 'Current Price', key: 'price', ph: '₹1,049', req: true },
                { lbl: 'Original Price (MRP)', key: 'originalPrice', ph: '₹1,299' },
                { lbl: 'Price Value', key: 'priceValue', ph: '1049', type: 'number' },
                { lbl: 'Discount Label', key: 'discountLabel', ph: 'Save 18%', req: true },
                { lbl: 'Discount %', key: 'discountValue', ph: '18', type: 'number', max: 100 },
                { lbl: 'Success Rate %', key: 'successRate', ph: '90', type: 'number', max: 100 },
              ].map(f => (
                <div key={f.key}>
                  <label className={lbl}>{f.lbl}{f.req && <span style={{ color: G }}> *</span>}</label>
                  <input {...inputProps} type={f.type || 'text'} min={f.min} max={f.max} required={f.req} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.ph} />
                </div>
              ))}
              <div className="col-span-2 sm:col-span-3">
                <label className={lbl}>Exact Expiry Date & Time <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required type="datetime-local" value={form.expiresAt || ''} onChange={e => set('expiresAt', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Content & Details" />
            <div className="space-y-4">
              <div>
                <label className={lbl}>Description <span style={{ color: G }}>*</span></label>
                <textarea {...inputProps} required rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short description shown on deal card and detail page..." />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={lbl}>How to Redeem <span className="normal-case font-normal text-[10px] text-white/20">(one step per line)</span></label>
                  <textarea {...inputProps} rows={5} value={Array.isArray(form.steps) ? form.steps.join('\n') : form.steps} onChange={e => set('steps', e.target.value)} placeholder={"Click 'Get Deal'\nAdd to cart\nApply coupon at checkout\nComplete payment"} />
                </div>
                <div>
                  <label className={lbl}>Highlights <span className="normal-case font-normal text-[10px] text-white/20">(one per line)</span></label>
                  <textarea {...inputProps} rows={5} value={Array.isArray(form.highlights) ? form.highlights.join('\n') : form.highlights} onChange={e => set('highlights', e.target.value)} placeholder={"M3 chip performance\n8-hour battery\nFree Prime delivery"} />
                </div>
              </div>
              <div>
                <label className={lbl}>Terms & Conditions</label>
                <textarea {...inputProps} rows={2} value={form.terms} onChange={e => set('terms', e.target.value)} placeholder="Valid on selected variants only. Subject to stock availability." />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5 sticky top-4 self-start">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Deal Image" />
            <ImageUpload label="" value={form.image} onChange={v => set('image', v)} height="h-48" />
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Visibility & Automation" />
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="h-4 w-4 rounded accent-[#00D47E]" />
                <span className="text-sm font-semibold text-white">⭐ Featured Deal (Top page)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.trending} onChange={e => set('trending', e.target.checked)} className="h-4 w-4 rounded accent-[#00D47E]" />
                <span className="text-sm font-semibold text-white">🔥 Trending Tag</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.telegramSync} onChange={e => set('telegramSync', e.target.checked)} className="h-4 w-4 rounded accent-[#00D47E]" />
                <span className="text-sm font-semibold text-white">📱 Post to Telegram</span>
              </label>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Preview" />
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {form.image && <img src={form.image} alt="" className="h-28 w-full rounded-lg object-cover mb-3" onError={e => e.target.style.display = 'none'} />}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: G }}>{form.store || 'Store'}</span>
                {form.badge && <span className="rounded-full px-2 py-0.5 text-[10px] font-black" style={badgePillStyle}>{form.badge}</span>}
              </div>
              <p className="line-clamp-2 text-sm font-semibold text-white">{form.title || 'Deal Title'}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-base font-black text-white">{form.price || '₹0'}</span>
                <span className="text-xs font-bold" style={{ color: G }}>{form.discountLabel || 'Discount'}</span>
              </div>
              {form.code && (
                <div className="mt-2 rounded-lg px-3 py-1.5 text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(0,212,126,0.25)', color: G, background: 'rgba(0,212,126,0.07)' }}>
                  {form.code}
                </div>
              )}
            </div>
          </div>

          {/* ── Advanced Scheduling ── */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.04)' }}>
            <button
              type="button"
              onClick={() => { setShowAdvanced(v => !v); if (showAdvanced) set('publishAt', '') }}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🗓️</span>
                <div>
                  <p className="text-sm font-black text-white">Advanced Scheduling</p>
                  <p className="text-[10px] text-white/40">{showAdvanced && form.publishAt ? `Goes live: ${new Date(form.publishAt).toLocaleString('en-IN')}` : 'Set a future date to auto-publish'}</p>
                </div>
              </div>
              <div className={`flex h-5 w-9 items-center rounded-full transition-all ${showAdvanced ? 'justify-end' : 'justify-start'}`} style={{ background: showAdvanced ? G : 'rgba(255,255,255,0.15)', padding: '2px' }}>
                <span className="h-4 w-4 rounded-full bg-white shadow" />
              </div>
            </button>
            {showAdvanced && (
              <div className="px-5 pb-5 space-y-3 border-t" style={{ borderColor: 'rgba(251,191,36,0.15)' }}>
                <p className="text-[10px] text-white/40 pt-3">The deal will be hidden from users until this date &amp; time. Leave it OFF to publish immediately.</p>
                <div>
                  <label className={lbl}>📅 Publish Date &amp; Time <span style={{ color: G }}>*</span></label>
                  <input
                    type="datetime-local"
                    className={inp}
                    style={inpStyle}
                    value={form.publishAt ? new Date(new Date(form.publishAt).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                    min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                    onChange={e => set('publishAt', e.target.value)}
                  />
                </div>
                {form.publishAt && (
                  <div className="rounded-xl px-4 py-3 text-xs font-bold" style={{ background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.2)' }}>
                    ⏰ This deal will automatically go live on: {new Date(form.publishAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            <button type="submit" className={btnPrimaryCls} style={btnPrimary}>
              {showAdvanced && form.publishAt ? '🗓️ Schedule Deal' : '✓ Save Deal'}
            </button>
            <button type="button" onClick={onCancel} className={btnCancelCls} style={btnCancelStyle}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function AdminDeals() {
  const { deals, addDeal, updateDeal, deleteDeal, currentUser, analytics } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [confirm, setConfirm] = useState(null)
  const [selected, setSelected] = useState([])

  const role = currentUser?.role || 'Support'
  const canPublish = ['Owner', 'Manager', 'Operational Manager'].includes(role)
  const canDelete = ['Owner', 'Manager', 'Operational Manager'].includes(role)
  const canEdit = ['Owner', 'Manager', 'Operational Manager', 'Operational Executive'].includes(role)

  const filtered = deals.filter(d => {
    const term = search.toLowerCase()
    const matchesSearch = (d.title?.toLowerCase() || '').includes(term) || (d.store?.toLowerCase() || '').includes(term)
    if (!matchesSearch) return false
    
    // Auto detect expired for filtering
    const remainingHours = d.expiresInSeconds / 3600
    const isExpiredState = remainingHours <= 0 || d.status === 'Expired'
    if (statusFilter === 'Active') return !isExpiredState && d.status !== 'Draft'
    if (statusFilter === 'Expired') return isExpiredState
    if (statusFilter === 'Draft') return d.status === 'Draft'
    return true
  })

  const toggleSelect = (slug) => {
    if (selected.includes(slug)) setSelected(selected.filter(s => s !== slug))
    else setSelected([...selected, slug])
  }
  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([])
    else setSelected(filtered.map(d => d.slug))
  }

  const handleBulkAction = (action) => {
    if (!selected.length) return alert('Select deals first')
    if (!window.confirm(`Perform "${action}" on ${selected.length} deals?`)) return
    
    selected.forEach(slug => {
      const existing = deals.find(d => d.slug === slug)
      if (!existing) return
      if (action === 'delete') deleteDeal(slug)
      else if (action === 'mark_featured') updateDeal(slug, { ...existing, featured: true })
      else if (action === 'mark_expired') updateDeal(slug, { ...existing, status: 'Expired', expiresInSeconds: 0 })
    })
    setSelected([])
  }

  const handleSave = (data) => {
    if (mode === 'add') addDeal(data)
    else updateDeal(editing.slug, data)
    setMode(null); setEditing(null)
  }

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add New Deal' : 'Edit Deal'}>
      <div className="mb-5">
        <button onClick={() => { setMode(null); setEditing(null) }} className={backLinkCls}>← Back to Deals</button>
      </div>
      <DealForm initial={editing || EMPTY_DEAL} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} role={role} />
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Deals">
      {confirm && <ConfirmDialog onConfirm={() => { deleteDeal(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}

      <div className="mb-5 flex flex-col gap-4">
        {/* Top Actions Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative sm:max-w-xs w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals by title or store..." className={searchInpCls} style={searchInpStyle} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={searchInpCls} style={{...searchInpStyle, width: '130px', paddingLeft: '1rem'}}>
              {['All', 'Active', 'Expired', 'Draft'].map(s => <option key={s} value={s} className="bg-[#0C1018]">{s}</option>)}
            </select>
          </div>
          {canEdit && (
            <button onClick={() => { setMode('add'); setEditing(null) }} className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-black transition-all hover:opacity-90 shadow-[0_4px_20px_rgba(0,212,126,0.25)]" style={{ background: G, color: '#070B12' }}>+ Add New Deal</button>
          )}
        </div>

        {/* Bulk Actions Row */}
        {selected.length > 0 && (
          <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: 'rgba(0,212,126,0.1)', border: '1px solid rgba(0,212,126,0.2)' }}>
            <span className="text-sm font-bold text-white px-2">{selected.length} Selected</span>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <button onClick={() => handleBulkAction('mark_featured')} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white/80 transition-all hover:bg-white/10">⭐ Feature</button>
              {canPublish && (
                <button onClick={() => handleBulkAction('mark_expired')} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white/80 transition-all hover:bg-white/10">⏳ Expire</button>
              )}
              {canDelete && (
                <button onClick={() => handleBulkAction('delete')} className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20">🗑️ Delete</button>
              )}
            </div>
            <button onClick={() => setSelected([])} className="ml-auto text-xs font-bold text-white/40 hover:text-white px-2">Cancel</button>
          </div>
        )}
      </div>

      <div style={tableWrapStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={thStyle}>
                <th className="px-5 py-3.5 w-[50px]"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="accent-[#00D47E]" /></th>
                {['Deal', 'Status/Priority', 'Price', 'Visits', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No deals matched your criteria.</td></tr>}
              {filtered.map((deal) => {
                const isSelected = selected.includes(deal.slug)
                const remaining = deal.expiresInSeconds === undefined ? 1 : getDealRemainingSeconds(deal)
                const isDead = remaining <= 0 || deal.status === 'Expired'
                
                return (
                <tr key={deal.slug} className={`transition-colors ${isSelected ? 'bg-white/5' : ''}`} style={trBorderStyle}
                  onMouseEnter={e => !isSelected && (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => !isSelected && (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-4"><input type="checkbox" checked={isSelected} onChange={() => toggleSelect(deal.slug)} className="accent-[#00D47E]" /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {deal.image
                        ? <img src={deal.image} alt="" className={`h-11 w-11 rounded-lg object-cover shrink-0 ${isDead ? 'opacity-50 grayscale' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.10)' }} onError={e => e.target.style.display = 'none'} />
                        : <div className={`flex h-11 w-11 items-center justify-center rounded-lg shrink-0 ${isDead ? 'opacity-50' : ''}`} style={{ background: 'rgba(0,212,126,0.10)', color: G, fontSize: '1rem', fontWeight: 900 }}>D</div>
                      }
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold leading-tight ${isDead ? 'text-white/40 line-through' : 'text-white'}`}>{deal.title}</p>
                          {deal.featured && <span title="Featured" className="text-[10px]">⭐</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-bold text-white/40">{deal.category}</span>
                          <span className="text-[10px] text-white/30">{deal.store}</span>
                          <span className="text-[9px] font-medium text-[#00D47E]/90 bg-[#00D47E]/10 border border-[#00D47E]/20 px-1.5 py-0.5 rounded ml-1">
                            Added By: {deal.addedBy || 'System Admin'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <div className="flex flex-col gap-1 items-start">
                      {isDead ? (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-black bg-red-500/20 text-red-500">Expired</span>
                      ) : (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-black bg-[#00D47E]/20 text-[#00D47E]">{deal.status || 'Active'}</span>
                      )}
                      {deal.priority === 'High' && <span className="rounded px-1.5 py-0.5 text-[9px] font-bold text-amber-500 bg-amber-500/20">High Priority</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold" style={{ color: isDead ? 'rgba(255,255,255,0.3)' : G }}>{deal.price}</td>
                  <td className="px-5 py-4 text-xs font-semibold text-white/50">
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 border border-white/10" title="Total Page Views/Clicks">
                      <span className="text-[10px]">👁️</span>
                      <span style={{ color: G }}>{analytics?.dealClicks?.[deal.slug] || 0}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {canEdit && (
                        <button onClick={() => { setEditing(deal); setMode('edit') }} className={editBtnCls} style={editBtnStyle}>Edit</button>
                      )}
                      {canDelete && (
                        <button onClick={() => setConfirm(deal.slug)} className={delBtnCls} style={delBtnStyle}>Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-white/30">{filtered.length} of {deals.length} deals • Select multiple deals for bulk actions</p>
    </AdminLayout>
  )
}
