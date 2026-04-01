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