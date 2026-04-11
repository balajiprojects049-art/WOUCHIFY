import { useState, useEffect } from 'react'

const initialForm = {
  fullName: '',
  email: '',
  company: '',
  website: '',
  budget: '',
  message: '',
}

function AdvertiseWithUsSection() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    const handleOpenForm = () => {
      setIsFormVisible(true)
      setIsSubmitted(false)
      // Smoothly scroll the section directly into view
      document.getElementById('advertise-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.addEventListener('openAdvertiseForm', handleOpenForm)
    return () => window.removeEventListener('openAdvertiseForm', handleOpenForm)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <section id="advertise-section" className="mt-10 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6 scroll-m-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Partnerships</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">Advertise With Us</h3>
          <p className="mt-2 text-sm text-muted">Promote your brand, product, or campaign to our deal-seeking audience.</p>
        </div>

        <button
          onClick={() => {
            setIsFormVisible((previous) => !previous)
            setIsSubmitted(false)
          }}
          className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
        >
          {isFormVisible ? 'Hide Form' : 'Advertise With Us'}
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="h-11 rounded-xl border border-line bg-cream px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="h-11 rounded-xl border border-line bg-cream px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
            required
            className="h-11 rounded-xl border border-line bg-cream px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website URL"
            className="h-11 rounded-xl border border-line bg-cream px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="h-11 rounded-xl border border-line bg-cream px-3 text-sm text-ink focus:outline-none"
          >
            <option value="">Budget range</option>
            <option value="under-500">Under $500</option>
            <option value="500-2000">$500 - $2,000</option>
            <option value="2000-5000">$2,000 - $5,000</option>
            <option value="above-5000">Above $5,000</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your campaign"
            rows={4}
            required
            className="sm:col-span-2 rounded-xl border border-line bg-cream px-3 py-3 text-sm text-ink placeholder:text-muted focus:outline-none"
          />

          <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted">Email integration will be connected in next step.</p>
            <button
              type="submit"
              className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-midnight transition-all duration-300 hover:scale-105"
            >
              Submit Request
            </button>
          </div>

          {isSubmitted && <p className="sm:col-span-2 text-sm font-semibold text-emerald-600">Form submitted. We will connect mail sending next.</p>}
        </form>
      )}
    </section>
  )
}

export default AdvertiseWithUsSection