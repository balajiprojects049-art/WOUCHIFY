import { useState } from 'react'
import { Link } from 'react-router-dom'

const LIMITED_OFFERS = [
  {
    store: 'Amazon',
    badge: '⚡ Flash',
    title: 'Up to 60% off Electronics',
    discount: '60% OFF',
    expiry: '2h 14m left',
    link: '/deals',
    urgent: true,
  },
  {
    store: 'Flipkart',
    badge: '🔥 Hot',
    title: 'Fashion Sale — Extra 40% off',
    discount: '40% OFF',
    expiry: '5h 30m left',
    link: '/deals',
    urgent: false,
  },
  {
    store: 'Myntra',
    badge: '🎁 Gift',
    title: 'Buy 2 Get 1 Free on Apparel',
    discount: 'B2G1',
    expiry: '12h left',
    link: '/coupons',
    urgent: false,
  },
]

const DAILY_TASKS = [
  { icon: '🔗', task: 'Visit Wouchify daily', pts: '+5 pts', done: true },
  { icon: '📢', task: 'Share a deal', pts: '+15 pts', done: false },
  { icon: '🛒', task: 'Explore Loot Deals', pts: '+5 pts', done: false },
  { icon: '🎁', task: 'Check Giveaways', pts: '+10 pts', done: false },
]

function DailyRewardsSection() {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <section className="py-4 sm:py-6" id="rewards">
      {/* Header */}
      <div className="mb-6 text-center sm:mb-8">
        <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold mb-3">
          Earn &amp; Win
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Daily <span className="text-gold">Rewards</span> Hub
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Earn points &amp; grab limited deals before they're gone.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {['tasks', 'offers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 sm:text-sm ${
              activeTab === tab
                ? 'bg-gold text-midnight shadow-md shadow-gold/30'
                : 'bg-white border border-line text-muted hover:text-ink'
            }`}
          >
            {tab === 'tasks' ? '✅ Daily Tasks' : '⚡ Limited Offers'}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="rounded-2xl border border-line bg-gradient-to-br from-[#1a1a1f] via-[#141417] to-[#0f0f12] p-5 shadow-xl sm:p-8">
        {activeTab === 'tasks' && (
          <div className="mx-auto max-w-md space-y-3">
            <p className="mb-4 text-center text-xs text-slate-400">Complete tasks to earn reward points daily</p>
            {DAILY_TASKS.map((task, i) => (
              <div key={i} className={`flex items-center justify-between rounded-xl border p-4 transition-all ${task.done ? 'border-gold/30 bg-gold/5' : 'border-white/10 bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{task.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${task.done ? 'text-gold' : 'text-white'}`}>{task.task}</p>
                    {task.done && <p className="text-[10px] text-slate-400">Completed ✓</p>}
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${task.done ? 'bg-gold/20 text-gold' : 'bg-white/10 text-slate-300'}`}>
                  {task.pts}
                </span>
              </div>
            ))}
            <Link to="/loot-deals" className="mt-4 flex items-center justify-center rounded-xl bg-gold py-3 text-sm font-bold text-midnight transition-all duration-300 hover:scale-[1.02]">
              View All Rewards →
            </Link>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="space-y-3">
            <p className="mb-4 text-center text-xs text-slate-400">⚡ Limited time offers — grab before they expire!</p>
            {LIMITED_OFFERS.map((offer, i) => (
              <Link
                key={i}
                to={offer.link}
                className={`group flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:scale-[1.01] ${offer.urgent ? 'border-red-500/30 bg-red-500/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-xs font-bold text-gold">
                    {offer.store[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-gold">{offer.badge}</span>
                      <span className="text-[10px] text-slate-400">{offer.store}</span>
                    </div>
                    <p className="truncate text-sm font-semibold text-white">{offer.title}</p>
                    <p className={`text-[10px] mt-0.5 ${offer.urgent ? 'text-red-400 font-bold' : 'text-slate-400'}`}>⏱ {offer.expiry}</p>
                  </div>
                </div>
                <span className="ml-3 shrink-0 rounded-lg bg-gold px-3 py-1.5 text-xs font-black text-midnight">
                  {offer.discount}
                </span>
              </Link>
            ))}
            <Link to="/deals" className="mt-2 flex items-center justify-center rounded-xl border border-gold/30 py-3 text-sm font-bold text-gold transition-all duration-300 hover:bg-gold/10">
              See All Offers →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default DailyRewardsSection
