import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return { text: 'Good Morning,', sub: 'The Wouchify engine is optimized and ready for your oversight.' }
  if (hour >= 12 && hour < 17) return { text: 'Good Afternoon,', sub: 'The Wouchify engine is optimized and ready for your oversight.' }
  if (hour >= 17 && hour < 21) return { text: 'Good Evening,', sub: 'Review today\'s performance and plan tomorrow\'s deals.' }
  return { text: 'Good Night,', sub: 'Burning the midnight oil for Wouchify.' }
}

function formatTimeParts(date) {
  const h = date.getHours()
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = String(h % 12 || 12).padStart(2, '0')
  return { time: `${h12}:${m}:${s}`, ampm }
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()
}

// Subtle dot-grid background texture
function BgPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,212,126,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  )
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [keepSigned, setKeepSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const hour = now.getHours()
  const greeting = getGreeting(hour)
  const { time, ampm } = formatTimeParts(now)

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      setShake(true); setTimeout(() => setShake(false), 600)
      return
    }
    setLoading(true)
    setTimeout(() => {
      if (email === 'admin@wouchify.com' && password === 'admin123') {
        navigate('/admin/dashboard')
      } else {
        setLoading(false)
        setError('Invalid credentials. Please try again.')
        setShake(true); setTimeout(() => setShake(false), 600)
      }
    }, 1400)
  }

  return (
    <div className="relative min-h-screen bg-[#070B12] flex items-stretch overflow-hidden">
      <BgPattern />

      {/* ── LEFT PANEL (60%) ── */}
      <div className="relative hidden lg:flex flex-col justify-between w-[60%] flex-shrink-0 px-14 py-12 overflow-hidden">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[130px]" style={{background:'rgba(0,212,126,0.10)'}} />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full blur-[100px]" style={{background:'rgba(0,212,126,0.05)'}} />
        </div>

        {/* Circuit-board texture overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <path d='M0 55 H55 V110 H110 V55 H165 V110 H220' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <path d='M0 165 H55 V110' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <path d='M110 220 V165 H165 V220' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <path d='M55 0 V55' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <path d='M165 0 V55' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <path d='M220 110 H165 V165 H220' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <path d='M0 110 H55' stroke='rgba(0,212,126,0.07)' stroke-width='1' fill='none'/>
  <circle cx='55' cy='55' r='3.5' fill='none' stroke='rgba(0,212,126,0.12)' stroke-width='1'/>
  <circle cx='110' cy='55' r='2.5' fill='rgba(0,212,126,0.10)'/>
  <circle cx='165' cy='55' r='3.5' fill='none' stroke='rgba(0,212,126,0.12)' stroke-width='1'/>
  <circle cx='55' cy='110' r='2.5' fill='rgba(0,212,126,0.10)'/>
  <circle cx='110' cy='110' r='4' fill='none' stroke='rgba(0,212,126,0.15)' stroke-width='1.5'/>
  <circle cx='165' cy='110' r='2.5' fill='rgba(0,212,126,0.10)'/>
  <circle cx='55' cy='165' r='3.5' fill='none' stroke='rgba(0,212,126,0.12)' stroke-width='1'/>
  <circle cx='110' cy='165' r='2.5' fill='rgba(0,212,126,0.10)'/>
  <circle cx='165' cy='165' r='3.5' fill='none' stroke='rgba(0,212,126,0.12)' stroke-width='1'/>
</svg>`)}")`,
            backgroundSize: '220px 220px',
            opacity: 0.9,
          }}
        />


        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-base shadow-lg" style={{background:'#00D47E',color:'#070B12',boxShadow:'0 4px 20px rgba(0,212,126,0.35)'}}>
            W
          </div>
          <span className="text-sm font-black tracking-widest uppercase text-white">Wouchify</span>
        </div>

        {/* Greeting + Clock */}
        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white leading-tight xl:text-6xl">
            {greeting.text}
          </h1>
          <h1 className="text-5xl font-black leading-tight xl:text-6xl" style={{color:'#00D47E'}}>
            Admin
          </h1>
          <p className="mt-5 text-sm text-white/45 max-w-sm leading-relaxed">{greeting.sub}</p>

          {/* Big Clock */}
          <div className="mt-12 rounded-3xl bg-white/5 border border-white/8 px-8 py-7 backdrop-blur-sm inline-block w-full max-w-md">
            <div className="flex items-end gap-3">
              <p className="font-black text-white tabular-nums tracking-tight" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                {time}
              </p>
              <p className="text-white/40 font-bold text-lg mb-1">{ampm}</p>
            </div>
            <p className="mt-3 text-[11px] font-bold tracking-[0.15em] text-white/35 flex items-center gap-2">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M6 2a1 1 0 0 0-2 0v1H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V2a1 1 0 1 0-2 0v1H6V2Zm-3 5h14v10H3V7Z"/></svg>
              {formatDate(now)}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: 'Active Deals', value: '240+', badge: '+12%', badgeStyle: 'color:#00D47E;background:rgba(0,212,126,0.12)' },
            { label: 'Coupons Live', value: '89', badge: 'Stable', badgeStyle: 'color:rgba(255,255,255,0.45);background:rgba(255,255,255,0.06)' },
            { label: 'Stores', value: '120+', badge: '+ 2', badgeStyle: 'color:#00D47E;background:rgba(0,212,126,0.12)' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border px-5 py-5" style={{background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.07)'}}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.label}</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{...Object.fromEntries(s.badgeStyle.split(';').filter(Boolean).map(p => p.split(':').map(v=>v.trim())))}}>{s.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL (40%) ── */}
      <div className="relative flex flex-col justify-center flex-1 bg-[#0C1018] border-l border-white/5 px-10 py-12 lg:px-14 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-sm" style={{background:'#00D47E',color:'#070B12'}}>W</div>
          <span className="text-sm font-black tracking-widest uppercase text-white">Wouchify</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-white/45 leading-relaxed">Authenticated access only. Enter your credentials below.</p>
        </div>

        <form onSubmit={handleLogin} className={shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="admin-email" className="block mb-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
              Email Address
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wouchify.com"
                className="w-full rounded-xl border py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all duration-300" style={{borderColor:'rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.04)'}} onFocus={e=>{e.target.style.borderColor='rgba(0,212,126,0.5)';e.target.style.boxShadow='0 0 0 2px rgba(0,212,126,0.1)'}} onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.08)';e.target.style.boxShadow='none'}}
                autoComplete="email"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25">
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M2 5.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9Zm2 0 6 5.25L16 5.5H4Zm12 1.75-5.46 4.77a1 1 0 0 1-1.08 0L4 7.25V14.5h12V7.25Z" /></svg>
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="admin-password" className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Password
              </label>
              <button type="button" className="text-[11px] font-bold transition-colors" style={{color:'#00D47E'}}>
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all duration-300" style={{borderColor:'rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.04)'}} onFocus={e=>{e.target.style.borderColor='rgba(0,212,126,0.5)';e.target.style.boxShadow='0 0 0 2px rgba(0,212,126,0.1)'}} onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.08)';e.target.style.boxShadow='none'}}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
              >
                {showPass ? (
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M2.22 2.22a.75.75 0 0 0-1.06 1.06l2.1 2.1a9.15 9.15 0 0 0-2.1 4.62.75.75 0 0 0 1.49.2 7.64 7.64 0 0 1 1.56-3.62L5.73 8.1A3 3 0 0 0 10 13l1.17 1.17a9.05 9.05 0 0 1-1.17.09C5.37 14.25 2 10 2 10s.7-1.04 1.85-2.15L2.22 2.22Zm9.56 9.56A3 3 0 0 1 7.22 7.22l4.56 4.56ZM10 6a3 3 0 0 1 2.78 4.12l1.08 1.08A7.67 7.67 0 0 0 18 10s-3.37-4.25-8-4.25c-.4 0-.8.03-1.19.09L10 6Zm0 0" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M10 4a4 4 0 0 0-3.35 1.82l-.07.12A6 6 0 0 0 4 10a6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-2.58-4.06l-.07-.06A4 4 0 0 0 10 4Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Keep signed in */}
          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => setKeepSigned(!keepSigned)}
              className="h-4 w-4 rounded flex-shrink-0 border transition-all duration-200 flex items-center justify-center" style={keepSigned ? {background:'#00D47E',borderColor:'#00D47E'} : {background:'rgba(255,255,255,0.05)',borderColor:'rgba(255,255,255,0.2)'}}
            >
              {keepSigned && (
                <svg className="h-2.5 w-2.5 text-[#070B12] fill-current" viewBox="0 0 12 12"><path d="M1 6l3.5 3.5L11 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              )}
            </button>
            <span className="text-xs text-white/40">Keep me signed in for 24 hours</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
              <span className="text-red-400 text-sm">⚠️</span>
              <p className="text-sm font-semibold text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-4 text-sm font-black transition-all duration-300 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed" style={{background:'#00D47E',color:'#070B12',boxShadow:'0 4px 20px rgba(0,212,126,0.30)'}}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </svg>
                Signing In...
              </span>
            ) : 'Sign In to Admin'}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 rounded-xl border border-white/8 bg-white/3 px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0" style={{background:'rgba(0,212,126,0.15)'}}>
              <svg className="h-3 w-3" viewBox="0 0 20 20" style={{fill:'#00D47E'}}><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z"/></svg>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-white/50">Demo Credentials</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/35">Account:</span>
              <span className="text-xs font-bold" style={{color:'#00D47E'}}>admin@wouchify.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/35">Password:</span>
              <span className="text-xs font-bold text-white/50 tracking-widest">admin123</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] text-white/20 font-semibold tracking-wide">
          © {new Date().getFullYear()} WOUCHIFY ADMIN PORTAL. ALL RIGHTS RESERVED.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        .fill-green { fill: #00D47E; }
        .bg-white\/3 { background-color: rgba(255,255,255,0.03); }
        .bg-white\/4 { background-color: rgba(255,255,255,0.04); }
        .bg-white\/4:focus { background-color: rgba(255,255,255,0.06); }
        .bg-white\/5 { background-color: rgba(255,255,255,0.05); }
        .border-white\/6 { border-color: rgba(255,255,255,0.06); }
        .border-white\/8 { border-color: rgba(255,255,255,0.08); }
        .bg-white\/4 { background: rgba(255,255,255,0.04); }
      `}</style>
    </div>
  )
}
