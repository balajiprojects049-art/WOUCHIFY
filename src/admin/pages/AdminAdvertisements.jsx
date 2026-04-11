import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import ImageUpload from '../components/ImageUpload'
import { useData } from '../../context/DataContext'
import { G, inp, lbl, cardStyle, btnPrimary, inpStyle, inpFocus, backLinkCls, confirmDialogStyle } from '../components/adminStyles'

const AD_POSITIONS = [
  { key: 'global_top', label: 'Global (Top of every page)' },
  { key: 'global_bottom', label: 'Global (Above footer)' },
  { key: 'home_middle', label: 'Home Page (Middle)' },
  { key: 'deals_grid', label: 'Deals Page (Inside Grid)' },
  { key: 'coupons_grid', label: 'Coupons Page' },
  { key: 'floating_bottom_right', label: 'Floating (Bottom Right Corner)' },
]

const EMPTY_AD = { image: '', mobileImage: '', title: '', link: '', position: 'deals_grid', active: true }

function addFocus(e) { Object.assign(e.target.style, inpFocus) }
function remFocus(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

function AdForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={lbl}>Desktop Image <span className="text-[10px] text-white/40 block mt-0.5">Advertisement Image (Desktop)</span></label>
          <ImageUpload value={form.image} onChange={v => set('image', v)} height="h-32" />
        </div>
        <div className="space-y-2">
          <label className={lbl}>Mobile Image <span className="text-[10px] text-white/40 block mt-0.5">Advertisement Image (Mobile)</span></label>
          <ImageUpload value={form.mobileImage} onChange={v => set('mobileImage', v)} height="h-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={lbl}>Advertisement Reference Title <span style={{ color: G }}>*</span></label>
          <input required {...inputProps} value={form.title} onChange={e => set('title', e.target.value)} placeholder="E.g., Diwali Flipkart Ad" />
        </div>
        <div>
          <label className={lbl}>Target URL / Link</label>
          <input {...inputProps} value={form.link} onChange={e => set('link', e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={lbl}>Position</label>
          <select {...inputProps} value={form.position} onChange={e => set('position', e.target.value)}>
            {AD_POSITIONS.map(p => (
              <option key={p.key} value={p.key} className="bg-gray-900 text-white">
                {p.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="sm:col-span-2 flex items-center gap-3">
          <div onClick={() => set('active', !form.active)} className="relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all" style={{ background: form.active ? G : 'rgba(255,255,255,0.15)' }}>
            <span className={`absolute h-5 w-5 rounded-full bg-white shadow transition-all ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm font-semibold text-white/60">Active (visible on website)</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 rounded-xl py-3.5 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>Save Advertisement</button>
        <button type="button" onClick={onCancel} className="rounded-xl px-6 py-3.5 text-sm font-bold text-white/50 hover:text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>Cancel</button>
      </div>
    </form>
  )
}

export default function AdminAdvertisements() {
  const { advertisements, addAdvertisement, updateAdvertisement, deleteAdvertisement } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const handleSave = (data) => {
    if (!data.image && !data.mobileImage) {
      alert('Please add at least one advertisement image (desktop or mobile).')
      return
    }

    if (mode === 'add') addAdvertisement(data)
    else updateAdvertisement(editing.id, data)
    setMode(null); setEditing(null)
  }

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add Advertisement' : 'Edit Advertisement'}>
      <div className="max-w-2xl">
        <button onClick={() => { setMode(null); setEditing(null) }} className={`mb-6 ${backLinkCls}`}>← Back to Advertisements</button>
        <div className="rounded-2xl p-6" style={cardStyle}>
          <AdForm initial={editing || { ...EMPTY_AD }} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} />
        </div>
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Advertisements">
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm p-7 text-center" style={confirmDialogStyle}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)' }}>
              <svg viewBox="0 0 20 20" className="h-6 w-6 fill-red-400"><path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5Z"/></svg>
            </div>
            <h3 className="text-lg font-black text-white">Delete this Ad?</h3>
            <p className="mt-2 text-sm text-white/40">It will be removed from the user panel immediately.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { deleteAdvertisement(confirm); setConfirm(null) }} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
              <button onClick={() => setConfirm(null)} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Section info + add button */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Website Advertisements</h2>
          <p className="mt-1 text-xs text-white/40">Manage ads displayed natively inside the user panel.</p>
        </div>
        <button onClick={() => { setMode('add'); setEditing(null) }} className="shrink-0 rounded-xl px-6 py-3 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>
          + Add Advertisement
        </button>
      </div>

      {/* Grid */}
      {advertisements.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed p-16 text-center" style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'rgba(0,212,126,0.10)' }}>
             <svg viewBox="0 0 20 20" className="h-6 w-6 fill-current" style={{ fill: G }}><path d="M2 3.25A2.25 2.25 0 0 1 4.25 1h11.5A2.25 2.25 0 0 1 18 3.25v9.5A2.25 2.25 0 0 1 15.75 15h-3.878l1.575 2.495a.75.75 0 0 1-1.274.805L10 15.5l-2.173 2.8a.75.75 0 0 1-1.274-.805L8.128 15H4.25A2.25 2.25 0 0 1 2 12.75v-9.5Z"/></svg>
          </div>
          <p className="text-base font-black text-white/30">No advertisements yet</p>
          <p className="mt-2 text-sm text-white/20">Click "+ Add Advertisement" to create one</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advertisements.map((ad) => (
            <div key={ad.id} className="relative overflow-hidden rounded-2xl" style={{ border: ad.active ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(239,68,68,0.2)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="relative h-40 overflow-hidden flex gap-0.5">
                <div className="relative flex-1 h-full overflow-hidden bg-white/5">
                  {ad.image ? (
                    <img src={ad.image} alt="Desktop Ad" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/10 text-[10px] font-bold">DESKTOP</div>
                  )}
                  <div className="absolute top-1 left-1 rounded bg-black/50 px-1 py-0.5 text-[8px] font-black text-white/70">W</div>
                </div>
                <div className="relative w-24 h-full overflow-hidden bg-white/5 border-l border-white/5">
                  {ad.mobileImage ? (
                    <img src={ad.mobileImage} alt="Mobile Ad" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/10 text-[10px] font-bold">MOB</div>
                  )}
                  <div className="absolute top-1 left-1 rounded bg-black/50 px-1 py-0.5 text-[8px] font-black text-white/70">M</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button onClick={() => updateAdvertisement(ad.id, { active: !ad.active })}
                  className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black backdrop-blur-sm"
                  style={ad.active ? { background: 'rgba(0,212,126,0.85)', color: '#070B12' } : { background: 'rgba(239,68,68,0.75)', color: 'white' }}>
                  {ad.active ? '● Active' : '● Inactive'}
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-black text-white leading-tight line-clamp-1">{ad.title}</h3>
                  <p className="mt-1 text-[10px] text-white/70">Pos: {AD_POSITIONS.find(p => p.key === ad.position)?.label || ad.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4">
                {ad.link && <span className="flex-1 truncate text-[10px] text-white/30 font-mono">{ad.link}</span>}
                <button onClick={() => { setEditing(ad); setMode('edit') }} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white/70 hover:text-white" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>Edit</button>
                <button onClick={() => setConfirm(ad.id)} className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-300" style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
