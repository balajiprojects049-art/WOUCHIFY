import { Link } from 'react-router-dom'
import ScrollingPageBanner from '../components/ScrollingPageBanner'

const banners = [
  {
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    label: 'Terms & Conditions',
    title: 'Rules That Protect You',
    description: 'Clear, fair terms designed to ensure the best experience for every Wouchify user.',
    link: '/terms',
  },
]

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Wouchify platform, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time.`,
  },
  {
    title: '2. Use of the Platform',
    content: `Wouchify is a deal discovery platform. You agree to use it only for lawful purposes. You must not misuse coupons or deals, attempt to circumvent restrictions, or use automated tools to scrape content without our written permission.`,
  },
  {
    title: '3. Deals & Coupons Accuracy',
    content: `We strive to provide accurate, up-to-date deal information. However, Wouchify does not guarantee the validity, accuracy, or availability of any deal or coupon code listed. Final prices and terms are determined solely by the respective merchant.`,
  },
  {
    title: '4. Affiliate Disclosure',
    content: `Wouchify participates in affiliate programs. When you click on certain links and make a purchase, we may earn a commission at no additional cost to you. This does not influence our deal curation or recommendations.`,
  },
  {
    title: '5. Intellectual Property',
    content: `All content on Wouchify including but not limited to text, graphics, logos, and software is the property of Wouchify or its content suppliers and is protected by applicable intellectual property laws.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `Wouchify shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including failed coupon redemptions, price discrepancies, or unavailable deals.`,
  },
  {
    title: '7. Termination',
    content: `We reserve the right to suspend or terminate your access to Wouchify at any time, for any reason, including violation of these terms. Upon termination, all provisions that by nature should survive will remain in effect.`,
  },
  {
    title: '8. Governing Law',
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in India.`,
  },
]

function TermsOfUse() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-14">
        <ScrollingPageBanner banners={banners} />
      </section>

      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <span className="inline-block rounded-full bg-navy/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-navy">Legal</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">Terms of Use</h1>
          <p className="mt-4 text-base text-muted leading-relaxed">Last updated: March 2026 — Please read these terms carefully before using the Wouchify platform.</p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <article key={section.title} className="group rounded-3xl border border-line bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-lg font-black text-ink group-hover:text-gold transition-colors duration-300">{section.title}</h2>
              <p className="mt-4 text-sm leading-8 text-muted">{section.content}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-navy to-midnight p-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Need Help?</p>
          <h2 className="mt-3 text-2xl font-black text-white">Talk to Our Support Team</h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">If you have questions about our Terms of Use or need clarification on any point, we are happy to help.</p>
          <Link to="/about-contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black text-midnight transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gold/20">
            Contact Support →
          </Link>
        </div>
      </div>
    </main>
  )
}

export default TermsOfUse
