import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useData } from '../../context/DataContext'
import { G, inp, lbl, cardStyle, tableWrapStyle, thStyle, trBorderStyle, btnPrimary, btnPrimaryCls, delBtnCls, searchInpCls, searchInpStyle } from '../components/adminStyles'
import { Shield, ShieldAlert, ShieldCheck, PenTool, Headphones, X } from 'lucide-react'

const EMPTY_MEMBER = { name: '', email: '', phone: '', department: 'Content & Marketing', joinDate: '', role: 'Editors', password: '' }
const DEPARTMENTS = ['Content & Marketing', 'Engineering', 'Customer Support', 'Management', 'Finance', 'Human Resources']

const ROLE_DEFINITIONS = [
  { name: 'Manager', icon: ShieldAlert, color: '#C084FC', bg: 'rgba(168,85,247,0.15)', desc: 'Full control access including billing, settings, and team management.' },
  { name: 'Operational Manager', icon: ShieldCheck, color: '#00D47E', bg: 'rgba(0,212,126,0.15)', desc: 'Can manage all modules, stores, deals, and overview operations.' },
  { name: 'Operational Executive', icon: PenTool, color: '#38BDF8', bg: 'rgba(56,189,248,0.15)', desc: 'Creates and edits content (deals, stores, coupons). Cannot publish directly.' },
]

const ROLES = ROLE_DEFINITIONS.map(r => r.name)

// Updated input class to use native Tailwind focus styles instead of JS handlers which caused bugs
const safeInpCls = `${inp} border border-white/10 bg-white/5 focus:border-[#00D47E] focus:ring-2 focus:ring-[#00D47E]/20`

export default function AdminMembers() {
  const { adminMembers, addAdminMember, updateAdminMember, deleteAdminMember, currentUser } = useData()
  const [form, setForm] = useState(EMPTY_MEMBER)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  
  const role = currentUser?.role || 'Operational Executive'
  const isManager = role === 'Manager' || role === 'Owner'
  const canManageMembers = isManager

  const canEditMember = (targetRole) => {
    if (isManager) return true
    return false
  }

  const handleAddMember = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.role || !form.password) return
    addAdminMember({
      ...form,
      joinDate: form.joinDate || new Date().toISOString().split('T')[0] 
    })
    setForm(EMPTY_MEMBER)
    setIsModalOpen(false)
  }

  const getRoleConfig = (rName) => {
    if (rName === 'Owner') return ROLE_DEFINITIONS.find(r => r.name === 'Manager')
    const found = ROLE_DEFINITIONS.find(r => r.name === rName)
    if (found) return found
    return ROLE_DEFINITIONS[ROLE_DEFINITIONS.length - 1]
  }

  return (
    <AdminLayout title="Team Members">
      
      {/* Top Header & Add Button */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Manage Access</h1>
          <p className="text-xs text-white/50 mt-1">Control roles and permissions for your team.</p>
        </div>
        {canManageMembers && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-black transition-all hover:opacity-90 shadow-[0_4px_20px_rgba(0,212,126,0.25)]" 
            style={{ background: G, color: '#070B12' }}
          >
            + Add Team Member
          </button>
        )}
      </div>

      {/* Role Definitions Section */}
      <div className="mb-6 rounded-2xl p-6" style={cardStyle}>
        <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-white/40">Roles & Permissions</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {ROLE_DEFINITIONS.map(role => {
            const Icon = role.icon
            return (
              <div key={role.name} className="flex flex-col gap-3 rounded-xl p-4 transition-colors" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: role.bg, color: role.color }}>
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{role.name}</h3>
                </div>
                <p className="text-xs leading-relaxed text-white/50">{role.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Members table */}
      <div style={tableWrapStyle}>
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-sm">
            <thead>
              <tr style={thStyle}>
                {['Member', 'Contact & Dept', 'Role', 'Status', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminMembers.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No team members yet.</td></tr>
              )}
              {adminMembers.map(member => {
                const rConf = getRoleConfig(member.role)
                return (
                  <tr key={member.id} style={trBorderStyle}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: rConf.bg, color: rConf.color, border: `1px solid ${rConf.color}40` }}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white/80 font-bold mb-1">{member.email}</p>
                      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">{member.department || 'Unassigned'} {member.phone && `• ${member.phone}`}</p>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        className="rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer focus:outline-none"
                        style={{ background: rConf.bg, border: `1px solid ${rConf.color}40`, color: rConf.color, opacity: canEditMember(member.role) ? 1 : 0.5 }}
                        value={member.role}
                        onChange={e => {
                          updateAdminMember(member.id, { role: e.target.value })
                        }}
                      >
                        {ROLES.map(r => <option key={r} value={r} className="bg-[#0C1018]">{r}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button 
                        onClick={() => updateAdminMember(member.id, { active: !member.active })}
                        disabled={!canEditMember(member.role)}
                        className="rounded-full px-3 py-1 text-[10px] font-black transition-colors border"
                        style={{
                          ...(member.active
                            ? { background: 'rgba(0,212,126,0.12)', color: G, borderColor: 'rgba(0,212,126,0.2)' }
                            : { background: 'rgba(239,68,68,0.12)', color: '#f87171', borderColor: 'rgba(239,68,68,0.2)' }
                          ),
                          opacity: canEditMember(member.role) ? 1 : 0.5,
                          cursor: canEditMember(member.role) ? 'pointer' : 'not-allowed'
                        }}>
                        {member.active ? '● Active' : '○ Inactive'}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {canEditMember(member.role) && currentUser.id !== member.id && (
                        <button onClick={() => deleteAdminMember(member.id)} className={delBtnCls} style={{ background: 'rgba(239,68,68,0.08)' }}>Delete</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-[#070B12] shadow-2xl overflow-hidden transform transition-all" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <div>
                <h2 className="text-lg font-black text-white">Add New Team Member</h2>
                <p className="text-xs text-white/40 mt-1">Fill out the complete profile details to onboard a new associate.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddMember} className="p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                <div>
                  <label className={lbl}>Full Name</label>
                  <input required className={safeInpCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="E.g. John Doe" />
                </div>
                <div>
                  <label className={lbl}>Work Email</label>
                  <input required type="email" className={safeInpCls} value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@wouchify.com" />
                </div>
                <div>
                  <label className={lbl}>Mobile Number &nbsp;<span className="text-white/20 text-[9px]">(Optional)</span></label>
                  <input type="tel" className={safeInpCls} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className={lbl}>Department</label>
                  <select className={`${safeInpCls} cursor-pointer`} value={form.department} onChange={e => set('department', e.target.value)}>
                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#0C1018]">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Assign Role</label>
                  <select className={`${safeInpCls} cursor-pointer`} value={form.role} onChange={e => set('role', e.target.value)}>
                    {ROLES.map(r => <option key={r} value={r} className="bg-[#0C1018]">{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Initial Login Password</label>
                  <input required minLength={6} type="text" className={safeInpCls} value={form.password} onChange={e => set('password', e.target.value)} placeholder="Assign strong password..." />
                </div>
                <div>
                  <label className={lbl}>Date of Joining</label>
                  <input type="date" className={safeInpCls} value={form.joinDate} onChange={e => set('joinDate', e.target.value)} style={{ colorScheme: 'dark' }} />
                </div>
              </div>
              
              <div className="flex items-center gap-4 justify-end pt-5 border-t border-white/5">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-6 py-3 text-sm font-bold text-white/40 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="rounded-xl px-8 py-3 text-sm font-black transition-all hover:opacity-90 shadow-[0_4px_20px_rgba(0,212,126,0.25)]" style={btnPrimary}>
                  ✓ Add Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}
