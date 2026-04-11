import { useEffect, useMemo, useState } from 'react'

function CountdownTimer({ initialSeconds, createdAt, label = 'Expires' }) {
  const [nowMs, setNowMs] = useState(Date.now())
  // 🎯 SESSION ANCHOR: If a deal has no createdAt, we anchor it to when this component was first mounted
  const [mountTime] = useState(Date.now())

  useEffect(() => {
    const timerId = setInterval(() => {
      setNowMs(Date.now())
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  const remainingSeconds = useMemo(() => {
    const totalDuration = Number(initialSeconds) || 0
    if (totalDuration <= 0) return 0

    // Use the stored birth time OR the mount time as a fallback
    const birthTimeMs = createdAt ? new Date(createdAt).getTime() : mountTime
    const elapsedSeconds = Math.floor((nowMs - birthTimeMs) / 1000)

    // Formula: Total - Elapsed
    return Math.max(totalDuration - Math.max(elapsedSeconds, 0), 0)
  }, [initialSeconds, createdAt, nowMs, mountTime])

  const isExpired = remainingSeconds <= 0
  const isExpiringSoon = remainingSeconds > 0 && remainingSeconds < 3600

  const days = Math.floor(remainingSeconds / 86400)
  const hours = Math.floor((remainingSeconds % 86400) / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60

  // Calculate progress portions
  const progressD = days > 0 ? (days / 30) : 0 // Assume 30 days max for mapping
  const progressH = hours / 24
  const progressM = minutes / 60
  const progressS = seconds / 60

  const items = [
    { label: 'Days', value: days, progress: progressD, show: days > 0 },
    { label: 'Hours', value: hours, progress: progressH, show: true },
    { label: 'Mins', value: minutes, progress: progressM, show: true },
    { label: 'Secs', value: seconds, progress: progressS, show: true },
  ].filter(x => x.show)

  const radius = 18
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5 px-0.5">
        <svg className="h-3.5 w-3.5 text-[#ffb300]/80" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink">{label}</span>
      </div>

      {!isExpired ? (
        <div className="flex items-center gap-2.5 mt-1">
          {items.map((item) => {
            const activeLength = circumference * item.progress
            return (
              <div key={item.label} className="flex flex-col items-center gap-1.5">
                <div className="relative flex items-center justify-center h-12 w-12 bg-white rounded-full shadow-sm border border-line">
                  <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r={radius} fill="transparent" stroke="rgba(255, 179, 0, 0.15)" strokeWidth="2.5" strokeDasharray="2.5 2.5" />
                    <circle cx="20" cy="20" r={radius} fill="transparent" stroke="#ffb300" strokeWidth="2.5" strokeDasharray={`${activeLength} ${circumference}`} strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
                  </svg>
                  <span className="text-[13px] font-bold text-ink leading-none mt-0.5 font-mono">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="h-10 flex items-center justify-center rounded-xl bg-red-600/10 border border-red-500/20 w-fit px-4">
           <span className="text-xs font-black tracking-[0.2em] text-red-500 uppercase animate-pulse">EXPIRED</span>
        </div>
      )}
    </div>
  )
}

export default CountdownTimer
