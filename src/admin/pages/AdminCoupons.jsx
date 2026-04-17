import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import { CATEGORY_SECTIONS } from '../../utils/categories'
import {
  G, inp, lbl, cardStyle, tableWrapStyle, thStyle, trBorderStyle,
  searchInpCls, searchInpStyle, btnPrimary, btnPrimaryCls, btnCancelCls, btnCancelStyle,
  backLinkCls, editBtnCls, editBtnStyle, delBtnCls, delBtnStyle, badgePillStyle,
  confirmDialogStyle, inpStyle, inpFocus
} from '../components/adminStyles'

const EMPTY = {
  store: '', code: '', discount: '', category: 'All Categories',
  expiry: '', minOrder: '', success: '', badge: 'NEW', active: true, link: '', logo: '',
}
// CATEGORY_SECTIONS is now used to group categories.
const BADGES = ['HOT', 'POPULAR', 'NEW', 'ENDING SOON', 'TRENDING', 'EXCLUSIVE', 'FLASH', 'TRAVEL']

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
        <h3 className="text-lg font-black text-white">Delete this coupon?</h3>
        <p className="mt-2 text-sm text-white/40">This will remove it from the user panel immediately.</p>
        <div className="mt-7 flex gap-3">
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function CouponForm({ initial, onSave, onCancel, storeOptions }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }
  const selectProps = { className: `${inp} cursor-pointer`, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px] items-start">
        <div className="space-y-6">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Coupon Details" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Store Name <span style={{ color: G }}>*</span></label>
                <select {...selectProps} required value={form.store} onChange={e => set('store', e.target.value)}>
                  <option value="" className="bg-[#0C1018]">Select store</option>
                  {form.store && !storeOptions.includes(form.store) && <option value={form.store} className="bg-[#0C1018]">{form.store}</option>}
                  {storeOptions.map(s => <option key={s} value={s} className="bg-[#0C1018]">{s}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Coupon Code <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} placeholder="AMAZON10" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Discount / Benefit <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.discount} onChange={e => set('discount', e.target.value)} placeholder='e.g. "10% OFF" or "₹100 OFF"' />
              </div>
              <div>
                <label className={lbl}>Category</label>
                <select {...selectProps} value={form.category} onChange={e => set('category', e.target.value)}>
                  <option value="All Categories" className="bg-[#0C1018]">All Categories</option>
                  {CATEGORY_SECTIONS.map((section) => (
                    <optgroup key={section.id} label={`── ${section.label.toUpperCase()} ──`}>
                      {Object.values(section.data).flat().map(c => (
                        <option key={`${section.id}-${c}`} value={c} className="bg-[#0C1018]">{c}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className={lbl}>Badge</label>
                <select {...selectProps} value={form.badge} onChange={e => set('badge', e.target.value)}>
                  {BADGES.map(b => <option key={b} value={b} className="bg-[#0C1018]">{b}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Conditions & Meta" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Expiry Text <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.expiry} onChange={e => set('expiry', e.target.value)} placeholder="Expires in 3 days" />
              </div>
              <div>
                <label className={lbl}>Minimum Order</label>
                <input {...inputProps} value={form.minOrder} onChange={e => set('minOrder', e.target.value)} placeholder="₹499" />
              </div>
              <div>
                <label className={lbl}>Success Rate</label>
                <input {...inputProps} value={form.success} onChange={e => set('success', e.target.value)} placeholder="96%" />
              </div>
              <div>
                <label className={lbl}>Deal / Redirect URL <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required type="url" value={form.link || ''} onChange={e => set('link', e.target.value)} placeholder="https://amazon.in/..." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 sticky top-4 self-start">
          {/* Store Logo Upload */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Store Logo" />
            <ImageUpload
              label=""
              value={form.logo || ''}
              onChange={v => set('logo', v)}
              height="h-32"
            />
            <p className="mt-2 text-[10px] text-white/30">Upload the store brand logo. If left empty, initials will be shown automatically.</p>
          </div>

          {/* Preview */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Preview" />
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.12)' }}>
              <div className="flex items-center gap-3 mb-3">
                {form.logo ? (
                  <img src={form.logo} alt="" className="h-10 w-10 rounded-full object-cover" style={{ border: '1px solid rgba(255,255,255,0.12)' }} onError={e => e.target.style.display = 'none'} />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black" style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                    {(form.store || 'S').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: G }}>{form.store || 'Store'}</p>
                  <p className="text-[10px] text-white/30">{form.expiry || 'Expires soon'}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-white">{form.discount || 'Discount info'}</p>
              <div className="mt-4 flex items-center justify-between rounded-lg p-2" style={{ border: '1px solid rgba(0,212,126,0.2)', background: 'rgba(0,212,126,0.06)' }}>
                <span className="px-2 text-sm font-black tracking-widest" style={{ color: G }}>{form.code || 'CODE'}</span>
                <span className="rounded-lg px-3 py-1 text-[10px] font-black" style={badgePillStyle}>COPY</span>
              </div>
              {form.minOrder && <p className="mt-2 text-[11px] text-white/30">Min. order: {form.minOrder}</p>}
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Visibility" />
            <div onClick={() => set('active', !form.active)} className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all"
              style={{ border: form.active ? '1px solid rgba(0,212,126,0.25)' : '1px solid rgba(255,255,255,0.08)', background: form.active ? 'rgba(0,212,126,0.07)' : 'rgba(255,255,255,0.03)' }}>
              <div className="relative flex h-6 w-11 shrink-0 items-center rounded-full transition-all" style={{ background: form.active ? G : 'rgba(255,255,255,0.15)' }}>
                <span className={`absolute h-5 w-5 rounded-full bg-white shadow transition-all ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: form.active ? G : 'rgba(255,255,255,0.5)' }}>{form.active ? 'Active — visible to users' : 'Inactive — hidden'}</p>
                <p className="text-[11px] text-white/30 mt-0.5">Toggle to show/hide on the website</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <button type="submit" className={btnPrimaryCls} style={btnPrimary}>✓ Save Coupon</button>
            <button type="button" onClick={onCancel} className={btnCancelCls} style={btnCancelStyle}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function AdminCoupons() {
  const { coupons, stores, addCoupon, updateCoupon, deleteCoupon, analytics } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [confirm, setConfirm] = useState(null)

  const filtered = coupons.filter(c =>
    (c.store?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (c.code?.toLowerCase() || '').includes(search.toLowerCase())
  )

  const handleSave = (data) => {
    if (mode === 'add') addCoupon(data)
    else updateCoupon(editing.id, data)
    setMode(null); setEditing(null)
  }

  const storeOptions = Array.from(new Set((stores || []).map(s => s.name).filter(Boolean)))

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add Coupon' : 'Edit Coupon'}>
      <div className="mb-5"><button onClick={() => { setMode(null); setEditing(null) }} className={backLinkCls}>← Back to Coupons</button></div>
      <CouponForm initial={editing || EMPTY} storeOptions={storeOptions} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} />
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Coupons">
      {confirm && <ConfirmDialog onConfirm={() => { deleteCoupon(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:max-w-xs w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by store or code..." className={searchInpCls} style={searchInpStyle} />
        </div>
        <button onClick={() => { setMode('add'); setEditing(null) }} className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>+ Add Coupon</button>
      </div>

      <div style={tableWrapStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr style={thStyle}>
                {['Store', 'Code', 'Discount', 'Status', 'Uses', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 5 ? 'text-right' : 'text-left'} ${i === 2 ? 'hidden sm:table-cell' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No coupons yet.</td></tr>}
              {filtered.map((c) => (
                <tr key={c.id} style={trBorderStyle}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{c.store}</p>
                    <div className="mt-1">
                      <span className="text-[9px] font-medium text-[#3B82F6]/90 bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-1.5 py-0.5 rounded">
                        Added By: {c.addedBy || 'System Admin'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg px-3 py-1.5 text-xs font-black tracking-wider" style={badgePillStyle}>{c.code}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-sm hidden sm:table-cell" style={{ color: G }}>{c.discount}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => updateCoupon(c.id, { active: !c.active })}
                      className="rounded-full px-3 py-1 text-[10px] font-black transition-colors"
                      style={c.active
                        ? { background: 'rgba(0,212,126,0.12)', color: G }
                        : { background: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
                      {c.active ? '● Active' : '○ Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-xs font-semibold text-white/50">
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 border border-white/10" title="Total Coupon Reveals">
                      <span className="text-[10px]">🎟️</span>
                      <span style={{ color: G }}>{analytics?.couponCopies?.[c.id] || 0}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditing(c); setMode('edit') }} className={editBtnCls} style={editBtnStyle}>Edit</button>
                      <button onClick={() => setConfirm(c.id)} className={delBtnCls} style={delBtnStyle}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-white/30">{filtered.length} of {coupons.length} coupons</p>
    </AdminLayout>
  )
}
