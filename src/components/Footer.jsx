import { Link } from 'react-router-dom'

const footerLinks = {
  Explore: [
    { label: 'All Deals', to: '/deals' },
    { label: 'Loot Deals', to: '/loot-deals' },
    { label: 'Coupon Codes', to: '/coupons' },
    { label: 'Top Stores', to: '/stores' },
    { label: 'Credit Cards', to: '/credit-cards' },
    { label: 'Help & FAQ', to: '/faq' },
  ],
  Company: [
    { label: 'About Us', to: '/about-contact' },
    { label: 'Contact Us', to: '/about-contact' },
    { label: 'Advertise With Us', to: '/' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Use', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
}

const socials = [
  {
    label: 'Telegram',
    href: 'https://t.me/wouchify',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.84 1.16-5.17 3.39-.48.33-.92.5-1.32.48-.43-.01-1.26-.24-1.87-.44-.75-.24-1.34-.37-1.29-.79.03-.22.34-.44.93-.68 3.58-1.55 5.96-2.58 7.14-3.08 3.39-1.41 4.1-1.65 4.56-1.66.1 0 .32.02.46.12.12.08.16.2.17.29.01.07 0 .14-.02.24z" />
      </svg>
    ),
    bg: 'bg-[#0088cc]',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/wouchify',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.86 3.89 2.31 7.15 2.16c1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.68.27.27 2.68.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.61 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.38-.2 6.79-2.61 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.38-2.61-6.79-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm5.23-10.38a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z" />
      </svg>
    ),
    bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/wouchify',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    bg: 'bg-[#25D366]',
  },
]

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-midnight text-slate-300" aria-label="Site footer">
      <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8">

        {/* Top row */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl">
              WOUCHIFY
            </Link>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gold">Save More Every Day</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              India's #1 free deal discovery platform. Verified coupons, loot deals, and rewards — all in one place, zero cost.
            </p>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['100% Free', 'No Signup', 'Verified Deals'].map(b => (
                <span key={b} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold text-slate-300 sm:text-xs">
                  ✅ {b}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`flex flex-col items-center gap-1.5 group`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${s.bg}`}>
                    {s.icon}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="text-xs font-bold uppercase tracking-widest text-white">{section}</p>
                <ul className="mt-4 space-y-3">
                  {links.map(l => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-slate-400 transition-colors duration-300 hover:text-gold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter / Contact */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">Stay Updated</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Get daily loot alerts & exclusive codes — join our Telegram!
            </p>
            <a
              href="https://t.me/wouchify"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0088cc] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.84 1.16-5.17 3.39-.48.33-.92.5-1.32.48-.43-.01-1.26-.24-1.87-.44-.75-.24-1.34-.37-1.29-.79.03-.22.34-.44.93-.68 3.58-1.55 5.96-2.58 7.14-3.08 3.39-1.41 4.1-1.65 4.56-1.66.1 0 .32.02.46.12.12.08.16.2.17.29.01.07 0 .14-.02.24z" /></svg>
              Join Our Telegram
            </a>
            <div className="mt-5 space-y-1.5 text-xs text-slate-500">
              <p>📧 hello@wouchify.com</p>
              <p>📍 India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WOUCHIFY. All rights reserved. Made with ❤️ in India.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="transition-colors duration-300 hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors duration-300 hover:text-gold">Terms of Use</Link>
            <Link to="/cookies" className="transition-colors duration-300 hover:text-gold">Cookie Policy</Link>
            <Link to="/about-contact" className="transition-colors duration-300 hover:text-gold">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
