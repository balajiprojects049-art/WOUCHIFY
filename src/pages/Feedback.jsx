import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    suggestions: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // Persist to DB or send email in real impl
    console.log('Feedback submitted:', { rating, ...formData })
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {!submitted ? (
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid lg:grid-cols-12">
            
            {/* Left Col: Info */}
            <div className="bg-midnight p-8 text-white lg:col-span-4 lg:p-12">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-gold">We value your voice.</h1>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                WOUCHIFY is built for you. Whether it's a bug, a suggestion, or just a small shoutout, we read every piece of feedback we receive.
              </p>
              
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">🤝</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gold/60">Community First</p>
                    <p className="text-sm font-bold">100% User focused</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">⚡</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gold/60">Fast Support</p>
                    <p className="text-sm font-bold">24h Response Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="p-8 lg:col-span-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Rating */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Overall Experience</label>
                  <div className="mt-4 flex gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`h-12 w-12 rounded-2xl text-xl transition-all duration-300 ${
                          rating === num 
                            ? 'bg-midnight text-gold scale-110 shadow-lg' 
                            : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-500'
                        }`}
                      >
                        {num === 1 ? '😠' : num === 2 ? '😕' : num === 3 ? '😐' : num === 4 ? '😊' : '🤩'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Your specific feedback</label>
                  <textarea
                    required
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3.5 text-sm transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5"
                    placeholder="Tell us what you liked or what we can improve..."
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!rating}
                  className={`w-full rounded-2xl py-4 text-sm font-black text-white shadow-xl transition-all duration-300 ${
                    rating ? 'bg-midnight hover:scale-[1.02] hover:shadow-2xl' : 'bg-slate-200 cursor-not-allowed opacity-50'
                  }`}
                >
                  Submit Official Feedback
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-16 text-center shadow-2xl ring-1 ring-black/5">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-midnight text-5xl shadow-xl">💌</div>
            <h2 className="mt-8 text-3xl font-black text-midnight">Thank you for your feedback!</h2>
            <p className="mt-4 text-slate-500 max-w-md mx-auto leading-7">
              Your insights have been sent directly to our team. We'll use your suggestions to make WOUCHIFY even better for everyone.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-10 rounded-2xl bg-gold px-8 py-3.5 text-sm font-black text-midnight shadow-lg transition-transform hover:scale-110"
            >
              Back to Home
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
