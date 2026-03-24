import { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      return
    }
    setSubscribed(true)
    setEmail('')
    setTimeout(() => {
      setSubscribed(false)
    }, 1600)
  }

  return (
    <footer className="mt-20 border-t border-white/5 bg-midnight text-slate-300">
      <div className="mx-auto max-w-6xl px-3 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">WOUCHIFY</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              Premium deal discovery platform for coupons, price drops, rewards and credit card benefits  all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href="https://t.me" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-gold hover:text-white">Telegram</a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-gold hover:text-white">Telegram Group</a>
              <a href="https://wa.me" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-gold hover:text-white">WhatsApp</a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li><Link to="/" className="transition-colors duration-300 hover:text-white">About Us</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Careers</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Press</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Affiliates</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Top Deals</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Coupon Codes</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Top Stores</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Credit Cards</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Support</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Help Center</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Contact Us</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Safety Guide</Link></li>
                <li><Link to="/deals" className="transition-colors duration-300 hover:text-white">Community</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Stay Updated</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">Get weekly loot alerts and verified offers in your inbox.</p>

            <form onSubmit={handleSubscribe} className="mt-4 rounded-xl border border-white/15 bg-white/5 p-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-10 w-full rounded-lg bg-transparent px-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button type="submit" className="mt-2 h-10 w-full rounded-lg bg-gold px-4 text-sm font-semibold text-midnight transition-all duration-300 hover:scale-[1.02]">
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>

            <div className="mt-5 space-y-1 text-xs text-slate-400">
              <p>hello@lootdeals.io</p>
              <p>+1 (555) 010-5456</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WOUCHIFY. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/deals" className="transition-colors duration-300 hover:text-white">Privacy Policy</Link>
            <Link to="/deals" className="transition-colors duration-300 hover:text-white">Terms of Use</Link>
            <Link to="/deals" className="transition-colors duration-300 hover:text-white">Cookie Policy</Link>
            <Link to="/deals" className="transition-colors duration-300 hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
