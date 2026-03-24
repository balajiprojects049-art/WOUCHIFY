function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-midnight text-slate-300">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-2xl font-bold tracking-tight text-white">WOUCHIFY</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              Premium deal discovery platform for coupons, price drops, rewards and credit card benefits  all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-gold hover:text-white">Teligram</a>
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-gold hover:text-white">Instagram</a>
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-gold hover:text-white">WhatsApp </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li><a href="#" className="transition-colors duration-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Press</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Affiliates</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Top Deals</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Coupon Codes</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Top Stores</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Credit Cards</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Support</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Safety Guide</a></li>
                <li><a href="#" className="transition-colors duration-300 hover:text-white">Community</a></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Stay Updated</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">Get weekly loot alerts and verified offers in your inbox.</p>

            <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 w-full rounded-lg bg-transparent px-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button className="mt-2 h-10 w-full rounded-lg bg-gold px-4 text-sm font-semibold text-midnight transition-all duration-300 hover:scale-[1.02]">
                Subscribe
              </button>
            </div>

            <div className="mt-5 space-y-1 text-xs text-slate-400">
              <p>hello@lootdeals.io</p>
              <p>+1 (555) 010-5456</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WOUCHIFY. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition-colors duration-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">Terms of Use</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">Cookie Policy</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
