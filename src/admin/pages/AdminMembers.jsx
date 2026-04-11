import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import { G, inp, lbl, cardStyle, tableWrapStyle, thStyle, trBorderStyle, btnPrimary, inpStyle, inpFocus, delBtnCls, badgePillStyle } from '../components/adminStyles'

const EMPTY_MEMBER = { name: '', email: '', role: 'Editor' }
const ROLES = ['Owner', 'Manager', 'Editor', 'Support']

function addFocus(e) { Object.assign(e.target.style, inpFocus) }
function remFocus(e) { Object.assign(e.target.style, { borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' }) }

const ROLE_COLORS = {
  Owner:   { background: 'rgba(168,85,247,0.15)', color: '#C084FC' },
  Manager: { background: 'rgba(0,212,126,0.12)',  color: '#00D47E' },
  Editor:  { background: 'rgba(59,130,246,0.15)', color: '#60A5FA' },
  Support: { background: 'rgba(251,191,36,0.15)', color: '#FBBF24' },
}

export default function AdminMembers() {
  const { adminMembers, addAdminMember, updateAdminMember, deleteAdminMember } = useData()
  const [form, setForm] = useState(EMPTY_MEMBER)
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const inputProps = { className: inp, style: inpStyle, onFocus: addFocus, onBlur: remFocus }

  const handleAddMember = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    addAdminMember(form)
    setForm(EMPTY_MEMBER)
  }

  return (
    <AdminLayout title="Admin Members">
      {/* Add member form */}
      <div className="mb-6 rounded-2xl p-6" style={cardStyle}>
        <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-white/40">Add New Admin Member</h2>
        <form onSubmit={handleAddMember} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className={lbl}>Name</label>
            <input {...inputProps} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Member name" />
          </div>
          <div>
            <label className={lbl}>Email</label>
            <input type="email" {...inputProps} value={form.email} onChange={e => set('email', e.target.value)} placeholder="member@wouchify.com" />
          </div>
          <div>
            <label className={lbl}>Role</label>
            <select className={`${inp} cursor-pointer`} style={inpStyle} onFocus={addFocus} onBlur={remFocus} value={form.role} onChange={e => set('role', e.target.value)}>
              {ROLES.map(role => <option key={role} value={role} className="bg-[#0C1018]">{role}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full rounded-xl py-3 text-sm font-black transition-all hover:opacity-90" style={btnPrimary}>
              + Add Member
            </button>
          </div>
        </form>
      </div>

      {/* Members table */}
      <div style={tableWrapStyle}>
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-sm">
            <thead>
              <tr style={thStyle}>
                {['Member', 'Email', 'Role', 'Status', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminMembers.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No admin members yet.</td></tr>
              )}
              {adminMembers.map(member => (
                <tr key={member.id} style={trBorderStyle}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white" style={{ background: `rgba(0,212,126,0.15)`, color: G }}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/50">{member.email}</td>
                  <td className="px-5 py-4">
                    <select
                      className="rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.8)' }}
                      value={member.role}
                      onChange={e => updateAdminMember(member.id, { role: e.target.value })}
                    >
                      {ROLES.map(role => <option key={role} value={role} className="bg-[#0C1018]">{role}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => updateAdminMember(member.id, { active: !member.active })}
                      className="rounded-full px-3 py-1 text-[10px] font-black transition-colors"
                      style={member.active
                        ? { background: 'rgba(0,212,126,0.12)', color: G }
                        : { background: 'rgba(239,68,68,0.12)', color: '#f87171' }
                      }>
                      {member.active ? '● Active' : '○ Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => deleteAdminMember(member.id)} className={delBtnCls} style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
