import { useEffect, useMemo, useState } from 'react'

function formatCountdown(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

function CountdownTimer({ initialSeconds, label = 'Ends in' }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const remainingSeconds = useMemo(() => initialSeconds - elapsedSeconds, [initialSeconds, elapsedSeconds])

  return (
    <p className="inline-flex rounded-md bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
      {label} {formatCountdown(remainingSeconds)}
    </p>
  )
}

export default CountdownTimer
