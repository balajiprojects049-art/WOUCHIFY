export const GLOBAL_APP_MOUNT_TIME = Date.now();

export function getDealRemainingSeconds(deal, nowMs = Date.now()) {
  // Template/default items never expire
  if (deal?.id && (String(deal.id).startsWith('ld') || String(deal.id).startsWith('d'))) return null;

  // ── Priority 1: absolute expiry datetime (most accurate) ──────────────────
  // Executive sets a fixed end date like "05 July 2026 11:59 PM"
  if (deal?.expiresAt) {
    const expiryMs = new Date(deal.expiresAt).getTime()
    if (Number.isFinite(expiryMs)) {
      return Math.max(0, Math.floor((expiryMs - nowMs) / 1000))
    }
  }

  // ── Priority 2: relative seconds from createdAt (legacy fallback) ──────────
  const totalSeconds = Number(deal?.expiresInSeconds)
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return null

  const createdMs = deal?.createdAt ? new Date(deal.createdAt).getTime() : GLOBAL_APP_MOUNT_TIME
  const elapsedSeconds = Number.isFinite(createdMs)
    ? Math.floor((nowMs - createdMs) / 1000)
    : Math.floor((nowMs - GLOBAL_APP_MOUNT_TIME) / 1000)

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