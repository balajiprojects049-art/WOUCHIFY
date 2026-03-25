import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import { G, inp, lbl, cardStyle, btnPrimary, btnPrimaryCls, inpStyle, inpFocus } from '../components/adminStyles'

function addFocus(e) { Object.assign(e.target.style, inpFocus) }
function remFocus(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

export default function AdminSettings() {
  const { adminSettings, updateAdminSettings } = useData()
  const [form, setForm] = useState(adminSettings)
  const [saved, setSaved] = useState(false)

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateAdminSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AdminLayout title="Admin Settings">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-white/40">General Settings</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={lbl}>Site Name</label>
                <input {...inputProps} value={form.siteName || ''} onChange={e => set('siteName', e.target.value)} placeholder="Wouchify Admin" />
              </div>
              <div>
                <label className={lbl}>Support Email</label>
                <input type="email" {...inputProps} value={form.supportEmail || ''} onChange={e => set('supportEmail', e.target.value)} placeholder="admin@wouchify.com" />
              </div>
              <div className="sm:col-span-2">
                <label className={lbl}>Timezone</label>
                <input {...inputProps} value={form.timezone || ''} onChange={e => set('timezone', e.target.value)} placeholder="Asia/Kolkata" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className={`rounded-xl px-6 py-3 text-sm font-black transition-all hover:opacity-90`} style={btnPrimary}>
              Save Settings
            </button>
            {saved && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: G }} />
                <span className="text-xs font-bold" style={{ color: G }}>Saved successfully</span>
              </div>
            )}
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="mb-5 text-sm font-black uppercase tracking-widest text-white/40">Admin Avatar</h3>
            <ImageUpload label="Profile Image" value={form.avatar || ''} onChange={value => set('avatar', value)} height="h-44" />
          </div>

          {/* Theme info card */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(0,212,126,0.07)', border: '1px solid rgba(0,212,126,0.18)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: G }} />
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: G }}>Theme</p>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Admin panel uses the <span style={{ color: G, fontWeight: 700 }}>Executive Prism</span> dark theme with vivid green (<code className="text-[11px] text-white/60">#00D47E</code>) accent throughout all pages.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
