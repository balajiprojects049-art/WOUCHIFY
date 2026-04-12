import { Link } from 'react-router-dom'

const sections = [
  {
    id: 'what-are-cookies',
    title: '1. What Are Cookies?',
    icon: '🍪',
    content: `Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and to provide a better, more personalised experience for the user.

Cookies do not harm your device and cannot access any other information on your device beyond what the website places in them.`,
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Cookies',
    icon: '⚙️',
    content: `Wouchify uses cookies for several purposes to ensure the platform works correctly and to improve your experience. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).`,
    list: [
      'Remember your preferences and settings across visits',
      'Keep you signed in to your account (if applicable)',
      'Understand how you use our site to improve performance',
      'Measure the effectiveness of our content and promotions',
      'Prevent fraud and ensure platform security',
    ],
  },
  {
    id: 'types',
    title: '3. Types of Cookies We Use',
    icon: '📋',
    cards: [
      {
        name: 'Essential Cookies',
        badge: 'Always Active',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        desc: 'These cookies are strictly necessary for the website to function. They enable core features such as page navigation, security, network management, and accessibility. You cannot opt out of these.',
      },
      {
        name: 'Performance Cookies',
        badge: 'Analytics',
        badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        desc: 'These cookies collect anonymous information about how visitors use our website, such as which pages are visited most often and if users receive error messages. All data is aggregated and anonymous.',
      },
      {
        name: 'Functional Cookies',
        badge: 'Optional',
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        desc: 'These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personal features.',
      },
      {
        name: 'Targeting / Advertising Cookies',
        badge: 'Optional',
        badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        desc: 'These cookies are used to deliver advertisements more relevant to you and your interests. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.',
      },
    ],
  },
  {
    id: 'third-party',
    title: '4. Third-Party Cookies',
    icon: '🔗',
    content: `Some cookies on our site are placed by third parties. These may include analytics providers such as Google Analytics, and advertising partners. Third-party cookies are governed by each provider's privacy policy and we do not control the data they collect.

Third parties we may work with include:`,
    list: [
      'Google Analytics — to understand website traffic and usage',
      'Google AdSense — to show contextual advertisements',
      'Affiliate networks (Amazon Associates, Flipkart Affiliate, etc.)',
      'Social sharing platforms (Telegram, WhatsApp, Instagram)',
    ],
  },
  {
    id: 'manage',
    title: '5. How to Manage Cookies',
    icon: '🛡️',
    content: `You have the right to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Note that disabling cookies may affect your experience on our website.`,
    list: [
      'Chrome: Settings → Privacy & Security → Cookies',
      'Firefox: Options → Privacy & Security → Cookies',
      'Safari: Preferences → Privacy → Cookies',
      'Edge: Settings → Privacy, Search & Services → Cookies',
    ],
  },
  {
    id: 'local-storage',
    title: '6. Local Storage & Similar Technologies',
    icon: '💾',
    content: `In addition to cookies, Wouchify uses local storage (a feature of your browser) to save your preferences, such as saved deals and notification settings. This data stays on your device and is not transmitted to our servers automatically. You can clear this data at any time through your browser settings.`,
  },
  {
    id: 'updates',
    title: '7. Updates to This Policy',
    icon: '📅',
    content: `We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Cookie Policy on this page with an updated effective date.`,
  },
  {
    id: 'contact',
    title: '8. Contact Us',
    icon: '📬',
    content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us at:`,
    contact: true,
  },
]

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#0D0F14]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#12151C] via-[#1a1d26] to-[#0D0F14] py-16 sm:py-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#C89B1E]/8 blur-[100px]" />
          <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-amber-400/5 blur-[80px]" />
          <div className="absolute bottom-0 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-[60px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C89B1E]/30 bg-[#C89B1E]/10 text-3xl shadow-[0_0_30px_rgba(200,155,30,0.15)]">
            🍪
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C89B1E]">Legal</p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Cookie Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            We believe in full transparency. Here's exactly how and why Wouchify uses cookies on our platform.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Effective date: 1 January 2025 &nbsp;·&nbsp; Last updated: April 2025
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">

        {/* Quick nav */}
        <div className="mb-12 rounded-2xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-[#C89B1E]">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60 transition-all duration-200 hover:border-[#C89B1E]/40 hover:bg-[#C89B1E]/10 hover:text-[#C89B1E]"
              >
                {s.icon} {s.title.replace(/^\d+\. /, '')}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8 transition-all duration-300 hover:border-[#C89B1E]/20"
            >
              {/* Section header */}
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C89B1E]/20 bg-[#C89B1E]/10 text-lg">
                  {section.icon}
                </div>
                <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">{section.title}</h2>
              </div>

              {/* Text content */}
              {section.content && (
                <div className="mb-4 space-y-3 text-sm leading-7 text-white/50">
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* Bullet list */}
              {section.list && (
                <ul className="mb-4 space-y-2">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C89B1E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Cookie type cards */}
              {section.cards && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {section.cards.map((card) => (
                    <div key={card.name} className="rounded-xl border border-white/8 bg-white/3 p-4 transition-all duration-200 hover:border-white/15">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-sm font-black text-white">{card.name}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${card.badgeColor}`}>{card.badge}</span>
                      </div>
                      <p className="text-xs leading-6 text-white/40">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact block */}
              {section.contact && (
                <div className="mt-4 rounded-xl border border-[#C89B1E]/20 bg-[#C89B1E]/5 p-5">
                  <div className="space-y-2 text-sm text-white/60">
                    <p>📧 <a href="mailto:hello@wouchify.com" className="text-[#C89B1E] hover:underline">hello@wouchify.com</a></p>
                    <p>🌐 <Link to="/" className="text-[#C89B1E] hover:underline">wouchify.com</Link></p>
                    <p>📍 India</p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-12 rounded-2xl border border-white/8 bg-white/3 p-6 text-center">
          <p className="mb-4 text-sm text-white/40">Read our other legal policies</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy-policy" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/50 transition-all hover:border-[#C89B1E]/40 hover:text-[#C89B1E]">
              🔒 Privacy Policy
            </Link>
            <Link to="/terms" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/50 transition-all hover:border-[#C89B1E]/40 hover:text-[#C89B1E]">
              📜 Terms of Use
            </Link>
            <Link to="/" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/50 transition-all hover:border-[#C89B1E]/40 hover:text-[#C89B1E]">
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
