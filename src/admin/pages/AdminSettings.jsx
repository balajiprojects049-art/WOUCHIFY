import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import ImageUpload from '../components/ImageUpload'
import { G, inp, lbl, cardStyle, btnPrimary, btnPrimaryCls, inpStyle, inpFocus } from '../components/adminStyles'

function addFocus(e) { Object.assign(e.target.style, inpFocus) }
function remFocus(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

export default function AdminSettings() {
  const { adminSettings, updateAdminSettings, dbConnected, syncDataToDb } = useData()
  const [form, setForm] = useState(adminSettings)
  const [saved, setSaved] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncDone, setSyncDone] = useState(false)

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
          {/* Database Setup */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-white/40">Database Connection</h3>
            <div className="rounded-xl p-4 mb-5" style={{ background: dbConnected ? 'rgba(0,212,126,0.08)' : 'rgba(239,68,68,0.08)', border: dbConnected ? '1px solid rgba(0,212,126,0.2)' : '1px solid rgba(239,68,68,0.2)' }}>
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${dbConnected ? 'animate-pulse' : ''}`} style={{ background: dbConnected ? G : '#f87171' }} />
                <span className="text-sm font-black" style={{ color: dbConnected ? G : '#f87171' }}>
                  {dbConnected ? 'Neon DB Connected' : 'Local Storage Mode'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
