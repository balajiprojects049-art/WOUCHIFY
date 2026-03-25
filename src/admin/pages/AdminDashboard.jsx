import { useData } from '../../context/DataContext'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate } from 'react-router-dom'

const G = '#00D47E'

const StatIcons = {
  deals: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v2A1.5 1.5 0 0 1 17.5 6h-15A1.5 1.5 0 0 1 1 4.5v-2Zm1.5 5A1.5 1.5 0 0 0 1 9v2a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 11V9a1.5 1.5 0 0 0-1.5-1.5h-15Zm0 6A1.5 1.5 0 0 0 1 15v2a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17v-2a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
  ),
  loot: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z"/></svg>
  ),
  stores: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M2.879 7.121A3 3 0 0 0 2 9.243V17.5A1.5 1.5 0 0 0 3.5 19h13a1.5 1.5 0 0 0 1.5-1.5V9.243a3 3 0 0 0-.879-2.122L14 3.5H6L2.879 7.121ZM10 12.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>
  ),
  coupons: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M1 4.25C1 3.007 2.007 2 3.25 2h13.5C17.993 2 19 3.007 19 4.25v11.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75V4.25Zm2.25-.75a.75.75 0 0 0-.75.75V8h15V4.25a.75.75 0 0 0-.75-.75H3.25Zm14.25 6H2.5v5.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9.5Z"/></svg>
  ),
  giveaways: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0L5.205 6.735a.75.75 0 0 0 1.09 1.03L9.25 4.636v8.614ZM3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/></svg>
  ),
  cards: () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M2.5 4A2.5 2.5 0 0 0 0 6.5v1h20v-1A2.5 2.5 0 0 0 17.5 4h-15ZM20 9.5H0v4A2.5 2.5 0 0 0 2.5 16h15a2.5 2.5 0 0 0 2.5-2.5v-4Z"/></svg>
  ),
}

function StatCard({ label, value, IconComp, accentBg, accentColor, to }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="group w-full rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,126,0.25)'; e.currentTarget.style.background = 'rgba(0,212,126,0.04)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ background: accentBg, color: accentColor }}>
        <IconComp />
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-3 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: G }}>
        Manage →
      </p>
    </button>
  )
}

export default function AdminDashboard() {
  const { deals, lootDeals, stores, coupons, giveaways, creditCards } = useData()
  const allCards = [...(creditCards.shopping || []), ...(creditCards.lifetime || [])]

  const stats = [
    { label: 'Total Deals',  value: deals.length,     IconComp: StatIcons.deals,     accentBg: 'rgba(0,212,126,0.12)',  accentColor: G,           to: '/admin/deals' },
    { label: 'Loot Deals',   value: lootDeals.length,  IconComp: StatIcons.loot,      accentBg: 'rgba(251,191,36,0.12)', accentColor: '#FBBF24',   to: '/admin/loot-deals' },
    { label: 'Stores',       value: stores.length,     IconComp: StatIcons.stores,    accentBg: 'rgba(99,102,241,0.12)', accentColor: '#818CF8',   to: '/admin/stores' },
    { label: 'Coupons',      value: coupons.length,    IconComp: StatIcons.coupons,   accentBg: 'rgba(236,72,153,0.12)', accentColor: '#F472B6',   to: '/admin/coupons' },
    { label: 'Giveaways',    value: giveaways.length,  IconComp: StatIcons.giveaways, accentBg: 'rgba(14,165,233,0.12)', accentColor: '#38BDF8',   to: '/admin/giveaways' },
    { label: 'Credit Cards', value: allCards.length,   IconComp: StatIcons.cards,     accentBg: 'rgba(168,85,247,0.12)', accentColor: '#C084FC',   to: '/admin/credit-cards' },
  ]

  const recentDeals = deals.slice(0, 5)

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white">Overview</h2>
        <p className="mt-1 text-sm text-white/40">Everything you manage reflects instantly on the user panel.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-10">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* CMS Live banner */}
      <div className="mb-10 rounded-2xl p-5 flex items-center gap-4" style={{ background: 'rgba(0,212,126,0.07)', border: '1px solid rgba(0,212,126,0.18)' }}>
        <div className="h-3 w-3 rounded-full animate-pulse shrink-0" style={{ background: G }} />
        <div>
          <p className="text-sm font-black" style={{ color: G }}>CMS is Live</p>
          <p className="text-xs text-white/40 mt-0.5">All changes made here are instantly reflected on the user-facing website in real-time via shared state.</p>
        </div>
      </div>

      {/* Recent Deals table */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-black text-white">Recent Deals</h3>
          <span className="text-xs font-semibold text-white/40">{deals.length} total</span>
        </div>
        <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['Title', 'Store', 'Category', 'Price', 'Badge'].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-white/30 ${i === 1 ? 'hidden sm:table-cell' : ''} ${i === 2 ? 'hidden md:table-cell' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentDeals.map((deal) => (
                <tr key={deal.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td className="px-5 py-4 font-semibold text-white">{deal.title}</td>
                  <td className="px-5 py-4 text-white/50 hidden sm:table-cell">{deal.store}</td>
                  <td className="px-5 py-4 text-white/50 hidden md:table-cell">{deal.category}</td>
                  <td className="px-5 py-4 font-bold" style={{ color: G }}>{deal.price}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-black" style={{ background: 'rgba(0,212,126,0.12)', color: G }}>{deal.badge}</span>
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
