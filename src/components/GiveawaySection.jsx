import { useNavigate } from 'react-router-dom'

function GiveawaySection() {
  const navigate = useNavigate()

  return (
    <section className="mt-20 grid gap-5 md:grid-cols-2">
      <article className="rounded-2xl bg-midnight p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Weekly Giveaway</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">Win premium gadgets</h3>
        <p className="mt-3 max-w-sm text-sm text-slate-200">Enter this week’s draw for smart devices and accessories worth over ₹50,000.</p>
        <button
          onClick={() => navigate('/giveaways')}
          className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:scale-105"
        >
          Enter Now
        </button>
      </article>

      <article className="rounded-2xl bg-gold p-7 text-ink shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest">Points Rewards</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">Claim Big Rewards</h3>
        <p className="mt-3 max-w-sm text-sm text-ink/80">Collect points from every purchase and redeem exclusive discounts instantly.</p>
        <button
          onClick={() => navigate('/giveaways')}
          className="mt-5 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105"
        >
          Get Started
        </button>
      </article>
    </section>
  )
}

export default GiveawaySection
