import { Link } from 'react-router-dom'

const guides = [
  {
    num: '1',
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Visit the Homepage',
    desc: 'Browse categories — Deals, Loot, Coupons, Stores, Credit Cards.',
    link: '/',
    cta: 'Go to Home',
  },
  {
    num: '2',
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: 'Find Your Deal',
    desc: 'Search by store name, category, or browse latest drops.',
    link: '/deals',
    cta: 'Browse Deals',
  },
  {
    num: '3',
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Copy the Code',
    desc: 'Tap "Get Code" to reveal and copy the coupon instantly.',
    link: '/coupons',
    cta: 'See Coupons',
  },
  {
    num: '4',
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Apply at Checkout',
    desc: 'Paste the code at the store\'s checkout and enjoy your savings!',
    link: '/deals',
    cta: 'Start Saving',
  },
]

function UserGuideSection() {
  return (
    <section className="py-4 sm:py-6 rounded-3xl bg-gradient-to-br from-midnight via-navy to-navysoft px-5 sm:px-8" id="user-guide">
      <div className="mb-7 text-center sm:mb-9">
        <span className="inline-block rounded-full bg-gold/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold mb-3">
          Quick Start
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Your <span className="text-gold">Simple Guide</span> to Saving
        </h2>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Start saving in under 60 seconds — no account, no hassle.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {guides.map((g, i) => (
          <div key={i} className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-white/8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold text-midnight font-black text-sm">
                {g.num}
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-gold">
                {g.icon}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white sm:text-base">{g.title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">{g.desc}</p>
            </div>
            <Link
              to={g.link}
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-gold transition-all group-hover:gap-3"
            >
              {g.cta}
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UserGuideSection
