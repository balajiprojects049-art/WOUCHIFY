import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import {
  G, inp, lbl, cardStyle, btnPrimary, btnPrimaryCls, btnCancelCls, btnCancelStyle,
  backLinkCls, confirmDialogStyle, inpStyle, inpFocus, badgePillStyle,
  searchInpCls, searchInpStyle
} from '../components/adminStyles'

const EMPTY = { bank: '', card: '', cashback: '', partners: '', rewards: '', applyUrl: '', type: 'shopping', cardImage: '', bankLogo: '', active: true }

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
        <h3 className="text-lg font-black text-white">Delete this card?</h3>
        <p className="mt-2 text-sm text-white/40">This will remove it from the user panel immediately.</p>
        <div className="mt-7 flex gap-3">
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600">Delete</button>
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function CardForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px] items-start">
        <div className="space-y-6">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Card Identity" />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-2">
                <p className="text-xs font-bold text-white/50 mb-3 uppercase tracking-wider">Quick Add Presets</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { bank: 'TIDE', card: 'Tide Credit Card', logo: 'https://www.google.com/s2/favicons?sz=256&domain=tide.co' },
                    { bank: 'INDUSIND BANK', card: 'IndusInd Credit Card', logo: 'https://www.google.com/s2/favicons?sz=256&domain=indusind.com' },
                    { bank: 'ICICI BANK', card: 'ICICI CC', logo: 'https://www.google.com/s2/favicons?sz=256&domain=icicibank.com' },
                    { bank: 'IDFC FIRST BANK', card: 'IDFC CC', logo: 'https://www.google.com/s2/favicons?sz=256&domain=idfcfirstbank.com' },
                    { bank: 'TATA NEU', card: 'Tata Neu Card', logo: 'https://www.google.com/s2/favicons?sz=256&domain=tatadigital.com' },
                    { bank: 'AXIS BANK', card: 'Axis CC', logo: 'https://www.google.com/s2/favicons?sz=256&domain=axisbank.com' },
                    { bank: 'BAJAJ FINSERV', card: 'Bajaj Finserv EMI Card', logo: 'https://www.google.com/s2/favicons?sz=256&domain=bajajfinserv.in' }
                  ].map(b => (
                    <button key={b.bank} type="button" onClick={() => { set('bank', b.bank); set('card', b.card); set('bankLogo', b.logo); }}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold transition-all hover:bg-white/10"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                      {b.bank}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={lbl}>Bank Name <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.bank} onChange={e => set('bank', e.target.value.toUpperCase())} placeholder="HDFC BANK" />
              </div>
              <div>
                <label className={lbl}>Card Name <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.card} onChange={e => set('card', e.target.value)} placeholder="Millennia Card" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Card Type</label>
                <div className="flex gap-3 mt-1">
                  {[
                    { val: 'shopping', label: 'Shopping Card' },
                    { val: 'lifetime', label: 'Lifetime Free' },
                  ].map(opt => (
                    <button key={opt.val} type="button" onClick={() => set('type', opt.val)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-black transition-all"
                      style={form.type === opt.val
                        ? { border: `1px solid rgba(0,212,126,0.4)`, background: 'rgba(0,212,126,0.12)', color: G }
                        : { border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }
                      }>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Benefits & Rewards" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Top Cashback / Benefit <span style={{ color: G }}>*</span></label>
                <input {...inputProps} required value={form.cashback} onChange={e => set('cashback', e.target.value)} placeholder="5% Cashback on top merchants" />
              </div>
              <div>
                <label className={lbl}>Rewards / Joining Fee</label>
                <input {...inputProps} value={form.rewards} onChange={e => set('rewards', e.target.value)} placeholder="Flat ₹1,100 Rewards" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Partner Stores</label>
                <input {...inputProps} value={form.partners} onChange={e => set('partners', e.target.value)} placeholder="Amazon • Myntra • Flipkart and more" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Apply URL / Link <span style={{ color: G }}>*</span></label>
                <input {...inputProps} type="url" value={form.applyUrl || ''} onChange={e => set('applyUrl', e.target.value)} placeholder="https://www.bank.com/apply/..." />
                <p className="mt-1 text-xs text-white/40">Users will be redirected to this link when they click "Apply Now".</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 sticky top-4 self-start">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Card Image" />
            <ImageUpload label="" value={form.cardImage} onChange={v => set('cardImage', v)} height="h-44" />
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Bank Logo" />
            <p className="text-xs text-white/40 mb-3">Upload bank logo for clear identification (PNG with transparent background recommended)</p>
            <ImageUpload label="" value={form.bankLogo} onChange={v => set('bankLogo', v)} height="h-24" />
          </div>

          {/* Preview */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <SectionHeader title="Preview" />
            <div className="relative overflow-hidden rounded-2xl p-5" style={{
              background: form.type === 'lifetime'
                ? 'linear-gradient(135deg,#0D1520,#0a1628)'
                : 'linear-gradient(135deg,rgba(0,212,126,0.08),rgba(0,212,126,0.03))',
              border: '1px solid rgba(0,212,126,0.15)'
            }}>
              <div className="inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-bold mb-3" style={{ background: 'rgba(255,255,255,0.9)', color: '#0D1117' }}>
                {form.bankLogo && <img src={form.bankLogo} alt="" className="h-5 w-10 object-contain" onError={e => e.target.style.display='none'} />}
                <div>
                  <p>{form.bank || 'BANK NAME'}</p>
                  <p className="text-[9px] font-semibold text-gray-500 uppercase">{form.card || 'Card Name'}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-white leading-tight">{form.cashback || 'Cashback info here'}</p>
              <p className="text-[11px] mt-1 text-white/40">{form.partners || 'Partner stores'}</p>
              <p className="text-lg font-black mt-2" style={{ color: G }}>{form.rewards || 'Rewards'}</p>
              {form.cardImage && <img src={form.cardImage} alt="" className="absolute right-3 top-3 h-16 w-24 rounded-xl object-cover opacity-80" style={{ border: '1px solid rgba(255,255,255,0.15)' }} onError={e => e.target.style.display = 'none'} />}
            </div>
          </div>

          {/* Visibility */}
          <div onClick={() => set('active', !form.active)} className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all"
            style={{ border: form.active ? '1px solid rgba(0,212,126,0.25)' : '1px solid rgba(255,255,255,0.08)', background: form.active ? 'rgba(0,212,126,0.07)' : 'rgba(255,255,255,0.03)' }}>
            <div className="relative flex h-6 w-11 shrink-0 items-center rounded-full transition-all" style={{ background: form.active ? G : 'rgba(255,255,255,0.15)' }}>
              <span className={`absolute h-5 w-5 rounded-full bg-white shadow transition-all ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <p className="text-sm font-bold" style={{ color: form.active ? G : 'rgba(255,255,255,0.5)' }}>{form.active ? 'Active — visible to users' : 'Inactive — hidden'}</p>
          </div>

          <div className="space-y-2.5">
            <button type="submit" className={btnPrimaryCls} style={btnPrimary}>✓ Save Card</button>
            <button type="button" onClick={onCancel} className={btnCancelCls} style={btnCancelStyle}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function AdminCreditCards() {
  const { creditCards, addCreditCard, updateCreditCard, deleteCreditCard } = useData()
  const [mode, setMode] = useState(null)
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [tab, setTab] = useState('shopping')
  const [search, setSearch] = useState('')

  const allCards = tab === 'shopping' ? (creditCards.shopping || []) : (creditCards.lifetime || [])
  const filtered = allCards.filter(c => (c.card?.toLowerCase() || '').includes(search.toLowerCase()) || (c.bank?.toLowerCase() || '').includes(search.toLowerCase()))

  const handleSave = (data) => {
    if (mode === 'add') addCreditCard(data)
    else updateCreditCard(editing.id, data)
    setMode(null); setEditing(null)
  }

  if (mode) return (
    <AdminLayout title={mode === 'add' ? 'Add Credit Card' : 'Edit Credit Card'}>
      <div className="mb-5"><button onClick={() => { setMode(null); setEditing(null) }} className={backLinkCls}>← Back to Credit Cards</button></div>
      <CardForm initial={editing || { ...EMPTY, type: tab }} onSave={handleSave} onCancel={() => { setMode(null); setEditing(null) }} />
    </AdminLayout>
  )

  return (
    <AdminLayout title="Manage Credit Cards">
      {confirm && <ConfirmDialog onConfirm={() => { deleteCreditCard(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tab switcher */}
        <div className="flex rounded-xl p-1 gap-1 w-fit" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {[{ val: 'shopping', label: 'Shopping Cards' }, { val: 'lifetime', label: 'Lifetime Free' }].map(t => (
            <button key={t.val} onClick={() => setTab(t.val)}
              className="rounded-lg px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all"
              style={tab === t.val ? { background: G, color: '#070B12' } : { color: 'rgba(255,255,255,0.4)' }}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by bank or card..." className={searchInpCls} style={searchInpStyle} />
        </div>
        <button onClick={() => { setMode('add'); setEditing(null) }} className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>
          + Add Card
        </button>
      </div>

      {allCards.length === 0 ? (
        <div className="rounded-2xl p-14 text-center" style={cardStyle}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'rgba(168,85,247,0.12)' }}>
            <svg viewBox="0 0 20 20" className="h-7 w-7 fill-purple-400"><path d="M2.5 4A2.5 2.5 0 0 0 0 6.5v1h20v-1A2.5 2.5 0 0 0 17.5 4h-15ZM20 9.5H0v4A2.5 2.5 0 0 0 2.5 16h15a2.5 2.5 0 0 0 2.5-2.5v-4Z"/></svg>
          </div>
          <p className="text-white/40 text-sm">No {tab === 'shopping' ? 'shopping' : 'lifetime free'} cards yet.</p>
          <button onClick={() => { setMode('add'); setEditing(null) }} className="mt-5 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors" style={badgePillStyle}>+ Add First Card</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-2xl transition-all"
              style={{ border: c.active ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(239,68,68,0.2)', background: 'rgba(255,255,255,0.03)', opacity: c.active ? 1 : 0.7 }}>
              {c.cardImage ? (
                <img src={c.cardImage} alt="" className="h-24 w-full object-cover" onError={e => e.target.style.display = 'none'} />
              ) : (
                <div className="h-24 w-full flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.10)' }}>
                  <svg viewBox="0 0 20 20" className="h-8 w-8 fill-purple-400"><path d="M2.5 4A2.5 2.5 0 0 0 0 6.5v1h20v-1A2.5 2.5 0 0 0 17.5 4h-15ZM20 9.5H0v4A2.5 2.5 0 0 0 2.5 16h15a2.5 2.5 0 0 0 2.5-2.5v-4Z"/></svg>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      {c.bankLogo && <img src={c.bankLogo} alt={c.bank} className="h-4 w-8 object-contain" onError={e => e.target.style.display='none'} />}
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: G }}>{c.bank}</p>
                    </div>
                    <p className="text-sm font-black text-white mt-0.5">{c.card}</p>
                  </div>
                  <button onClick={() => updateCreditCard(c.id, { active: !c.active })}
                    className="rounded-full px-2.5 py-1 text-[10px] font-black transition-colors shrink-0 ml-2"
                    style={c.active ? { background: 'rgba(0,212,126,0.12)', color: G } : { background: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
                    {c.active ? 'Active' : 'Off'}
                  </button>
                </div>
                <p className="text-xs text-white/40 mt-2">{c.cashback}</p>
                <p className="text-sm font-bold mt-1" style={{ color: G }}>{c.rewards}</p>
                <div className="mt-2 text-left">
                  <span className="text-[10px] font-medium text-[#C084FC]/90 bg-[#C084FC]/10 border border-[#C084FC]/20 px-1.5 py-0.5 rounded">
                    Added By: {c.addedBy || 'System Admin'}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => { setEditing(c); setMode('edit') }} className="flex-1 rounded-xl py-2 text-xs font-bold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>Edit</button>
                  <button onClick={() => setConfirm(c.id)} className="rounded-xl px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors" style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-white/30">{filtered.length} of {allCards.length} {tab} cards</p>
    </AdminLayout>
  )
}
