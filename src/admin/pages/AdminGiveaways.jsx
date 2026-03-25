import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import { G, inp, lbl, cardStyle, btnPrimary, btnPrimaryCls, confirmDialogStyle, inpStyle, inpFocus, badgePillStyle } from '../components/adminStyles'

const COLORS = ['from-midnight to-navy', 'from-emerald-900 to-teal-900', 'from-slate-800 to-slate-700', 'from-red-900 to-red-800', 'from-orange-800 to-orange-700', 'from-purple-900 to-purple-800', 'from-blue-900 to-blue-800']
const TAGS = ['MEGA', 'HOT', 'NEW', 'JACKPOT', 'TRENDING', 'ENDING SOON', 'EXCLUSIVE', 'FLASH']
const EMPTY = { prize: '', value: '', entries: '0', endsIn: '', image: '', tag: 'HOT', color: 'from-midnight to-navy', active: true }

function addFocus(e) { Object.assign(e.target.style, inpFocus) }
function remFocus(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

function GiveawayForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div><label className={lbl}>Prize Name <span style={{ color: G }}>*</span></label><input required {...inputProps} value={form.prize} onChange={e => set('prize', e.target.value)} placeholder="Apple iPhone 15 Pro Max" /></div>
        <div><label className={lbl}>Prize Value <span style={{ color: G }}>*</span></label><input required {...inputProps} value={form.value} onChange={e => set('value', e.target.value)} placeholder="₹1,59,900" /></div>
        <div><label className={lbl}>Entries Count</label><input {...inputProps} value={form.entries} onChange={e => set('entries', e.target.value)} placeholder="12,450" /></div>
        <div><label className={lbl}>Ends In</label><input {...inputProps} value={form.endsIn} onChange={e => set('endsIn', e.target.value)} placeholder="2 days" /></div>
        <div>
          <label className={lbl}>Tag</label>
          <select className={`${inp} cursor-pointer`} style={inpStyle} onFocus={addFocus} onBlur={remFocus} value={form.tag} onChange={e => set('tag', e.target.value)}>
            {TAGS.map(t => <option key={t} value={t} className="bg-[#0C1018]">{t}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Card Color Theme</label>
          <select className={`${inp} cursor-pointer`} style={inpStyle} onFocus={addFocus} onBlur={remFocus} value={form.color} onChange={e => set('color', e.target.value)}>
            {COLORS.map(c => <option key={c} value={c} className="bg-[#0C1018]">{c}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2"><ImageUpload label="Image" value={form.image} onChange={v => set('image', v)} height="h-40" /></div>
        <div className="sm:col-span-2 flex items-center gap-3">
          <div onClick={() => set('active', !form.active)} className="relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all" style={{ background: form.active ? G : 'rgba(255,255,255,0.15)' }}>
            <span className={`absolute h-5 w-5 rounded-full bg-white shadow transition-all ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm font-semibold text-white/60">Active (show on user panel)</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className={`flex-1 ${btnPrimaryCls}`} style={btnPrimary}>Save Giveaway</button>
        <button type="button" onClick={onCancel} className="rounded-xl px-6 py-3.5 text-sm font-bold text-white/50 hover:text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>Cancel</button>
      </div>
    </form>
  )
}

export default function AdminGiveaways() {
  const { giveaways, addGiveaway, updateGiveaway, deleteGiveaway } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const handleSave = (data) => {
    if (mode === 'add') addGiveaway(data)
    else updateGiveaway(editing.id, data)
    setMode(null); setEditing(null)
  }

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add Giveaway' : 'Edit Giveaway'}>
      <div className="max-w-2xl">
        <button onClick={() => { setMode(null); setEditing(null) }} className="mb-6 text-sm font-semibold text-white/40 hover:text-white transition-colors">← Back</button>
        <div className="rounded-2xl p-6" style={cardStyle}>
          <GiveawayForm initial={editing || EMPTY} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} />
        </div>
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Giveaways">
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm p-7 text-center" style={confirmDialogStyle}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)' }}>
              <svg viewBox="0 0 20 20" className="h-6 w-6 fill-red-400"><path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5Z"/></svg>
            </div>
            <h3 className="text-lg font-black text-white">Delete this giveaway?</h3>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { deleteGiveaway(confirm); setConfirm(null) }} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
              <button onClick={() => setConfirm(null)} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <button onClick={() => { setMode('add'); setEditing(null) }} className="rounded-xl px-6 py-3 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>+ Add Giveaway</button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {giveaways.length === 0 && (
          <div className="col-span-full rounded-2xl p-10 text-center text-white/30" style={cardStyle}>No giveaways yet.</div>
        )}
        {giveaways.map((g) => (
          <div key={g.id} className="relative overflow-hidden rounded-2xl" style={{ border: g.active ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(239,68,68,0.2)', background: 'rgba(255,255,255,0.03)' }}>
            <div className={`h-3 w-full bg-gradient-to-r ${g.color}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="rounded-full px-2.5 py-1 text-[10px] font-black" style={badgePillStyle}>{g.tag}</span>
                <button onClick={() => updateGiveaway(g.id, { active: !g.active })}
                  className="rounded-full px-2.5 py-1 text-[10px] font-black transition-colors"
                  style={g.active ? { background: 'rgba(0,212,126,0.12)', color: G } : { background: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
                  {g.active ? 'Active' : 'Inactive'}
                </button>
              </div>
              <img src={g.image} alt="" className="h-28 w-full rounded-xl object-cover mb-4" onError={e => e.target.style.display = 'none'} />
              <h3 className="font-black text-white text-base leading-tight">{g.prize}</h3>
              <p className="text-xl font-black mt-1" style={{ color: G }}>{g.value}</p>
              <div className="mt-1 flex items-center justify-between text-xs text-white/40">
                <span>{g.entries} entries</span>
                <span>Ends in {g.endsIn}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => { setEditing(g); setMode('edit') }} className="flex-1 rounded-xl py-2 text-xs font-bold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>Edit</button>
                <button onClick={() => setConfirm(g.id)} className="rounded-xl px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors" style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
