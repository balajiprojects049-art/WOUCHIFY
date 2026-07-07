import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import LootProductCard from './LootProductCard'

export default function LatestLootDealsSection() {
  const navigate = useNavigate()
  const { userLootDeals: lootDeals } = useData()

  const latest = [...(lootDeals || [])]
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || a.publishAt || 0)
      const bDate = new Date(b.createdAt || b.publishAt || 0)
      return bDate - aDate
    })
    .slice(0, 4)

  if (!latest.length) return null

  return (
    <section>
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">Grab Before Gone</p>
            <h2 className="text-xl font-extrabold tracking-tight text-[#121826] dark:text-white">Flash Loot Offers</h2>
          </div>
        </div>

        <button
          onClick={() => navigate('/loot-deals')}
          className="group flex items-center gap-1.5 rounded-full border border-[#E6E2DA] bg-white px-4 py-2 text-[11px] font-bold text-[#667085] shadow-sm transition-all hover:border-red-400 hover:bg-red-500 hover:text-white"
        >
          View All
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      {/* ── 4-Card Uniform Row ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {latest.map(item => (
          <LootProductCard key={item.slug || item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
