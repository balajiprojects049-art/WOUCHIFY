import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import {
  G, inp, lbl, cardStyle, tableWrapStyle, thStyle, trBorderStyle,
  searchInpCls, searchInpStyle, btnPrimary, btnPrimaryCls, btnCancelCls, btnCancelStyle,
  backLinkCls, editBtnCls, editBtnStyle, delBtnCls,
  confirmDialogStyle, inpStyle, inpFocus, badgePillStyle
} from '../components/adminStyles'

const EMPTY_STORE = {
  slug: '', name: '', category: 'Electronics', logoText: '', logo: '',
  cashback: '', highlight: '', description: '', website: '', offers: []
}
const CATEGORIES = ['Electronics', 'Fashion', 'Travel', 'Food', 'Beauty', 'Lifestyle', 'Shopping', 'Sports']

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
          <svg viewBox="0 0 20 20" className="h-7 w-7 fill-red-400"><path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4Z"/></svg>
        </div>
        <h3 className="text-lg font-black text-white">Delete this store?</h3>
        <p className="mt-2 text-sm text-white/40">This will remove it from the user panel immediately.</p>
        <div className="mt-7 flex gap-3">
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function StoreForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const handleSubmit = (e) => {
    e.preventDefault()
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    onSave({ ...form, slug, offers: form.offers || [] })
  }
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }
  const selectProps = { className: `${inp} cursor-pointer`, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px] items-start">
        <div className="space-y-6">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Store Identity" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Store Name <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Myntra, Amazon, Ajio" />
              </div>
              <div>
                <label className={lbl}>Category</label>
                <select {...selectProps} value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0C1018]">{c}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>URL Slug <span className="normal-case font-normal text-[10px] text-white/20">(auto if blank)</span></label>
                <input {...inputProps} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="myntra" />
              </div>
              <div>
                <label className={lbl}>Website URL</label>
                <input type="url" {...inputProps} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://www.myntra.com" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Store Info & Benefits" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Cashback / Rewards <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.cashback} onChange={e => set('cashback', e.target.value)} placeholder="Up to 6.8% cashback" />
              </div>
              <div>
                <label className={lbl}>Highlight Tagline</label>
                <input {...inputProps} value={form.highlight} onChange={e => set('highlight', e.target.value)} placeholder="Fashion coupons with premium brands" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Description <span style={{ color: G }}>*</span></label>
                <textarea required rows={4} {...inputProps} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Myntra is India's leading fashion e-commerce platform..." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 sticky top-4 self-start">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Store Logo" />
            <ImageUpload label="" value={form.logo} onChange={v => set('logo', v)} height="h-36" />
            <div className="mt-4">
              <label className={lbl}>Logo Text (fallback initials)</label>
              <input {...inputProps} maxLength={2} value={form.logoText} onChange={e => set('logoText', e.target.value.toUpperCase())} placeholder="MY" />
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Preview" />
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3 mb-3">
                {form.logo
                  ? <img src={form.logo} alt="" className="h-12 w-12 rounded-full object-cover" style={{ border: '1px solid rgba(255,255,255,0.12)' }} onError={e => e.target.style.display = 'none'} />
                  : <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-black" style={{ background: 'rgba(0,212,126,0.12)', border: '1px solid rgba(0,212,126,0.2)', color: G }}>
                    {form.logoText || (form.name || '').slice(0, 2).toUpperCase() || 'ST'}
                  </div>
                }
                <div>
                  <p className="font-black text-white text-sm">{form.name || 'Store Name'}</p>
                  <p className="text-[11px] text-white/40">{form.category}</p>
                </div>
              </div>
              <p className="text-xs font-bold" style={{ color: G }}>{form.cashback || 'Cashback info'}</p>
              {form.highlight && <p className="text-[11px] text-white/40 mt-1">{form.highlight}</p>}
            </div>
          </div>

          <div className="space-y-2.5">
            <button type="submit" className={btnPrimaryCls} style={btnPrimary}>✓ Save Store</button>
            <button type="button" onClick={onCancel} className={btnCancelCls} style={btnCancelStyle}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function AdminStores() {
  const { stores, addStore, updateStore, deleteStore } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [confirm, setConfirm] = useState(null)

  const filtered = stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  const handleSave = (data) => {
    if (mode === 'add') addStore(data)
    else updateStore(editing.slug, data)
    setMode(null); setEditing(null)
  }

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add Store' : 'Edit Store'}>
      <div className="mb-5"><button onClick={() => { setMode(null); setEditing(null) }} className={backLinkCls}>← Back to Stores</button></div>
      <StoreForm initial={editing || EMPTY_STORE} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} />
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Stores">
      {confirm && <ConfirmDialog onConfirm={() => { deleteStore(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:max-w-xs w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stores..." className={searchInpCls} style={searchInpStyle} />
        </div>
        <button onClick={() => { setMode('add'); setEditing(null) }} className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>+ Add Store</button>
      </div>

      <div style={tableWrapStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={thStyle}>
                {['Store', 'Category', 'Cashback', 'Offers', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 4 ? 'text-right' : 'text-left'} ${i === 2 || i === 3 ? 'hidden md:table-cell' : ''} ${i === 1 ? 'hidden sm:table-cell' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No stores yet.</td></tr>}
              {filtered.map((s) => (
                <tr key={s.slug} style={trBorderStyle}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {s.logo
                        ? <img src={s.logo} alt={s.name} className="h-9 w-9 rounded-full object-cover shrink-0" style={{ border: '1px solid rgba(255,255,255,0.10)' }} onError={e => e.target.style.display = 'none'} />
                        : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black" style={{ background: 'rgba(0,212,126,0.12)', color: G }}>{s.logoText || (s.name || '').slice(0, 2).toUpperCase()}</div>
                      }
                      <div>
                        <p className="font-semibold text-white text-sm">{s.name}</p>
                        <p className="text-[11px] text-white/30">{s.highlight?.slice(0, 40)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/50 hidden sm:table-cell">{s.category}</td>
                  <td className="px-5 py-4 text-white/50 hidden md:table-cell text-xs" style={{ color: G }}>{s.cashback}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white/50" style={{ background: 'rgba(255,255,255,0.07)' }}>{(s.offers || []).length} offers</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditing(s); setMode('edit') }} className={editBtnCls} style={editBtnStyle}>Edit</button>
                      <button onClick={() => setConfirm(s.slug)} className={delBtnCls} style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-white/30">{filtered.length} of {stores.length} stores</p>
    </AdminLayout>
  )
}
