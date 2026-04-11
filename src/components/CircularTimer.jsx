import { useMemo } from 'react'

export default function CircularTimer({ remainingSeconds }) {
  const isExpired = remainingSeconds <= 0

  const { days, hours, minutes, seconds } = useMemo(() => {
    const d = Math.floor(remainingSeconds / 86400)
    const h = Math.floor((remainingSeconds % 86400) / 3600)
    const m = Math.floor((remainingSeconds % 3600) / 60)
    const s = Math.floor(remainingSeconds % 60)
    return { days: d, hours: h, minutes: m, seconds: s }
  }, [remainingSeconds])

  if (isExpired) {
    return (
      <span className="rounded px-2.5 py-1 text-[10px] font-black tracking-widest text-red-500 bg-red-500/10 uppercase">
        Expired
      </span>
    )
  }

  // Calculate progress portions
  const progressD = days > 0 ? (days / 30) : 0 // Assume 30 days max for progress mapping
  const progressH = hours / 24
  const progressM = minutes / 60
  const progressS = seconds / 60

  const items = [
    { label: 'Days', value: days, progress: progressD, show: days > 0 },
    { label: 'Hours', value: hours, progress: progressH, show: true },
    { label: 'Mins', value: minutes, progress: progressM, show: true },
    { label: 'Secs', value: seconds, progress: progressS, show: true },
  ].filter(x => x.show)

  // Determine size based on how many circles we render to fit the card wrapper neatly
  // We'll keep them tiny for cards.
  const radius = 18
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex items-center gap-2.5">
      {items.map((item, idx) => {
        // strokeDasharray sets the dot size and gap. 
        // strokeDashoffset animates the removal of dots.
        const activeLength = circumference * item.progress
        
        return (
          <div key={item.label} className="flex flex-col items-center gap-1.5">
            <div className="relative flex items-center justify-center h-12 w-12 bg-white/50 rounded-full shadow-inner border border-black/5">
              {/* Background dotted ring */}
              <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 40 40">
                <circle
                  cx="20" cy="20" r={radius}
                  fill="transparent"
                  stroke="rgba(255, 179, 0, 0.15)"
                  strokeWidth="2.5"
                  strokeDasharray="2.5 2.5"
                />
                {/* Foreground active ring */}
                <circle
                  cx="20" cy="20" r={radius}
                  fill="transparent"
                  stroke="#ffb300"
                  strokeWidth="2.5"
                  strokeDasharray={`${activeLength} ${circumference}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear drop-shadow-sm"
                />
              </svg>
              <span className="text-[13px] font-bold text-ink leading-none mt-0.5 font-mono tracking-tighter">
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[7px] font-black uppercase tracking-widest text-muted">
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
