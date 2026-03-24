import { useState } from 'react'
import ScrollingPageBanner from '../components/ScrollingPageBanner'

const banners = [
  {
    image: 'https://images.unsplash.com/photo-1630450202872-e0829c9d6172?auto=format&fit=crop&w=1200&q=80',
    label: '🏆 Weekly Giveaway',
    title: 'Win Premium Gadgets Worth ₹50,000',
    description: 'Enter our weekly draw for a chance to win the latest smartphones, earbuds, and more.',
    link: '/giveaways',
  },
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    label: '🎁 Points Rewards',
    title: 'Claim Your Reward Points Today',
    description: 'Earn points on every deal you grab and redeem them for exclusive discounts.',
    link: '/giveaways',
  },
]

const activeGiveaways = [
  {
    id: 1,
    prize: 'Apple iPhone 15 Pro Max',
    value: '₹1,59,900',
    entries: '12,450',
    endsIn: '2 days',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    tag: 'MEGA',
    color: 'from-midnight to-navy',
    tagColor: 'bg-gold text-midnight',
  },
  {
    id: 2,
    prize: 'Sony WH-1000XM5 Headphones',
    value: '₹29,990',
    entries: '8,320',
    endsIn: '4 days',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    tag: 'HOT',
    color: 'from-gold to-[#c9940a]',
    tagColor: 'bg-midnight text-white',
  },
  {
    id: 3,
    prize: 'Samsung Galaxy Watch 6',
    value: '₹34,999',
    entries: '6,100',
    endsIn: '5 days',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    tag: 'NEW',
    color: 'from-slate-800 to-slate-700',
    tagColor: 'bg-emerald-500 text-white',
  },
  {
    id: 4,
    prize: 'ASUS ROG Gaming Laptop',
    value: '₹89,990',
    entries: '4,800',
    endsIn: '7 days',
    image: 'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?auto=format&fit=crop&w=800&q=80',
    tag: 'JACKPOT',
    color: 'from-red-900 to-red-800',
    tagColor: 'bg-white text-red-600',
  },
  {
    id: 5,
    prize: 'Nike Air Jordan Bundle',
    value: '₹18,500',
    entries: '9,700',
    endsIn: '3 days',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    tag: 'TRENDING',
    color: 'from-orange-800 to-orange-700',
    tagColor: 'bg-white text-orange-600',
  },
  {
    id: 6,
    prize: 'Boat Airdopes + Smartwatch',
    value: '₹8,998',
    entries: '14,200',
    endsIn: '1 day',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    tag: 'ENDING SOON',
    color: 'from-purple-900 to-purple-800',
    tagColor: 'bg-gold text-midnight',
  },
]

function GiveawayCard({ item }) {
  const [entered, setEntered] = useState(false)

  return (
    <article className={`group relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${item.color} p-5 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl`}>
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.prize}
          className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${item.tagColor}`}>
          {item.tag}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          {item.endsIn} left
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-black text-white leading-tight">{item.prize}</h3>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Prize Value</p>
            <p className="text-2xl font-black text-gold">{item.value}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Entries</p>
            <p className="text-base font-bold text-white">{item.entries}</p>
          </div>
        </div>

        <button
          onClick={() => setEntered(!entered)}
          className={`mt-5 w-full rounded-2xl py-3.5 text-sm font-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
            entered ? 'bg-emerald-500 text-white' : 'bg-gold text-midnight'
          }`}
        >
          {entered ? '✓ You are Entered!' : 'Enter Giveaway'}
        </button>
      </div>
    </article>
  )
}

function Giveaways() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-14">
        <ScrollingPageBanner banners={banners} />
      </section>

      {/* Stats Bar */}
      <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Active Giveaways', value: '6' },
          { label: 'Total Winners', value: '1,240+' },
          { label: 'Prize Value Given', value: '₹12L+' },
          { label: 'Active Participants', value: '55,570' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-white p-5 text-center shadow-sm">
            <p className="text-2xl font-black text-ink sm:text-3xl">{stat.value}</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-line" />
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-ink">Active Giveaways</h2>
          <div className="h-px flex-1 bg-line" />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {activeGiveaways.map((item) => (
            <GiveawayCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-24 rounded-[2.5rem] bg-midnight py-16 px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Simple Process</p>
        <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">How Giveaways Work</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { step: '01', title: 'Browse & Choose', desc: 'Pick any active giveaway you are interested in winning.' },
            { step: '02', title: 'Click Enter', desc: 'Hit "Enter Giveaway" — no credit card or payment required.' },
            { step: '03', title: 'Win & Claim', desc: 'Winners are notified via email and prizes shipped within 7 days.' },
          ].map((s) => (
            <div key={s.step} className="rounded-3xl bg-white/5 p-8 border border-white/10">
              <p className="text-5xl font-black text-gold/30">{s.step}</p>
              <h3 className="mt-4 text-lg font-black text-white">{s.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Giveaways
