export function getDealRemainingSeconds(deal, nowMs = Date.now()) {
  const totalSeconds = Number(deal?.expiresInSeconds)
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return 0

  const createdMs = deal?.createdAt ? new Date(deal.createdAt).getTime() : NaN
  const elapsedSeconds = Number.isFinite(createdMs)
    ? Math.floor((nowMs - createdMs) / 1000)
    : 0

  return Math.max(totalSeconds - Math.max(elapsedSeconds, 0), 0)
}

export function formatExpiryFromSeconds(totalSeconds) {
  const safeSeconds = Math.max(Number(totalSeconds) || 0, 0)
  const days = Math.floor(safeSeconds / 86400)
  const hours = Math.floor((safeSeconds % 86400) / 3600)

  if (days > 1) return `Expires in ${days} days`
  if (days === 1) return 'Expires in 1 day'
  if (hours > 1) return `Expires in ${hours} hours`
  if (hours === 1) return 'Expires in 1 hour'
  return 'Expires soon'
}

export function formatLiveTimer(totalSeconds) {
  const safeSeconds = Math.max(Number(totalSeconds) || 0, 0)
  const h = Math.floor(safeSeconds / 3600)
  const m = Math.floor((safeSeconds % 3600) / 60)
  const s = safeSeconds % 60
  
  if (h >= 24) {
    const d = Math.floor(h / 24)
    const hr = h % 24
    return `${d}d ${hr.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
  }
  return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
}