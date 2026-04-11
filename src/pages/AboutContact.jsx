import { useState } from 'react'
import HowItWorksSection from '../components/HowItWorksSection'
import AdvertiseWithUsSection from '../components/AdvertiseWithUsSection'

function AboutContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Here as per document, eventually connect to real email
  }

  return (
    <div className="bg-cream transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* About Section */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">About Wouchify</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">Your Trusted Deals and Savings Companion</h1>
            
            <div className="mt-8 space-y-6 text-base text-muted dark:text-slate-300 sm:text-lg">
              <p>
                WOUCHIFY is a premiere deals and coupon discovery platform dedicated to helping you find the absolute best online discounts, loot offers, verified promo codes, and reward opportunities.
              </p>
              <p>
                Founded in 2023, our singular vision was to simplify the complex world of online shopping by bringing all major savings opportunities under one roof. We understand the thrill of a great deal and the frustration of an expired coupon—that's why our team works tirelessly to curate and verify every offer we share.
              </p>
              <div className="rounded-2xl border border-line bg-white/40 p-6 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-bold text-ink underline decoration-gold/30 underline-offset-4 dark:text-white">Why Wouchify?</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">✓</span>
                    <span className="text-slate-700 dark:text-slate-200">Verified and working promo codes for top 500+ brands.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">✓</span>
                    <span className="text-slate-700 dark:text-slate-200">Real-time Loot deals that save you up to 90% on electronics and fashion.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">✓</span>
                    <span className="text-slate-700 dark:text-slate-200">Community-driven submissions ensuring we never miss a hidden gem.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="rounded-3xl border border-line bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl dark:border-white/10 dark:bg-midnight">
            <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-3xl">Get In Touch</h2>
            <p className="mt-3 text-sm text-muted">For advertising, partnerships, deal submissions, or general support, we're here to help.</p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted">Full Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-navy dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-navy dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted">Subject</label>
                  <input
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Partnership Opportunity"
                    className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-navy dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted">Message</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you have in mind..."
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-navy dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-navy py-4 font-bold text-cream shadow-lg transition-transform hover:scale-[1.02] dark:bg-gold dark:text-midnight"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="mt-12 text-center py-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-3xl">🎉</div>
                <h3 className="mt-4 text-xl font-bold text-ink">Thank You!</h3>
                <p className="mt-2 text-sm text-muted">Your message has been received. Our team will get back to you within 24-48 hours.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-semibold text-gold underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Advertise With Us Banner */}
        <div className="mt-16 sm:mt-20">
          <AdvertiseWithUsSection />
        </div>

        {/* How It Works Section */}
        <div className="mt-16 border-t border-line pt-16 dark:border-white/10">
          <HowItWorksSection />
        </div>
      </div>
    </div>
  )
}

export default AboutContact
