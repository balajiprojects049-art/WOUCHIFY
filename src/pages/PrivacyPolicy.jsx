import { Link } from 'react-router-dom'
import ScrollingPageBanner from '../components/ScrollingPageBanner'
import { useData } from '../context/DataContext'

const fallbackBanners = [
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    label: 'Privacy First',
    title: 'Your Data Is Safe With Us',
    description: 'We are committed to full transparency about how we collect and use your information.',
    link: '/privacy-policy',
  },
]

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you voluntarily provide when using Wouchify, including email addresses submitted for newsletters, browsing preferences, and device/browser information collected automatically through analytics tools. We do not collect payment card details.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `Your information is used to personalize deal recommendations, send you newsletters you opted into, improve our platform, and communicate important service updates. We never sell your personal data to third parties.`,
  },
  {
    title: '3. Cookies & Tracking',
    content: `Wouchify uses cookies and similar technologies to remember your preferences (such as dark mode), measure site performance, and display relevant deals. You can control cookie settings through your browser, though some features may not function correctly if cookies are disabled.`,
  },
  {
    title: '4. Third-Party Links',
    content: `Our site links to third-party stores, coupon providers, and affiliate partners. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your data only for as long as necessary to provide our services or as required by law. You may request deletion of your account data at any time by contacting us.`,
  },
  {
    title: '6. Children\'s Privacy',
    content: `Wouchify is not directed at children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with their data, please contact us immediately.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us at privacy@wouchify.com. We will respond to all requests within 30 days.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy as our services evolve. Significant changes will be communicated via email or a prominent notice on the website. Continued use of Wouchify after changes constitutes your acceptance.`,
  },
]

function PrivacyPolicy() {
  const { banners } = useData()
  const activeBanners = (banners.privacyPolicy || []).filter((banner) => banner.active !== false)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-14">
        <ScrollingPageBanner banners={activeBanners.length > 0 ? activeBanners : fallbackBanners} />
      </section>

      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <span className="inline-block rounded-full bg-gold/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold">Legal</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-base text-muted leading-relaxed">Last updated: March 2026 — This policy explains how Wouchify collects, uses, and protects your personal information.</p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <article key={section.title} className="group rounded-3xl border border-line bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-lg font-black text-ink group-hover:text-gold transition-colors duration-300">{section.title}</h2>
              <p className="mt-4 text-sm leading-8 text-muted">{section.content}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-midnight p-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Questions?</p>
          <h2 className="mt-3 text-2xl font-black text-white">Contact Our Privacy Team</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">If you have any questions about this Privacy Policy or how your data is handled, we are here to help.</p>
          <Link to="/about-contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black text-midnight transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gold/20">
            Reach Out →
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy
