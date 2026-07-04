/**
 * /api/poll — Lightweight polling endpoint for Vercel production.
 *
 * Returns a "version" timestamp (the latest updated_at across all tables).
 * The client compares stored version vs server version — if different, it
 * fetches fresh data from /api/data. No full data payload in this call.
 */
import { getPool, COLLECTIONS, ensureTables } from './db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const pool = getPool()
  if (!pool) return res.json({ version: null })

  try {
    await ensureTables(pool)

    // Get the latest updated_at timestamp AND total count across all tables
    const queries = Object.values(COLLECTIONS).map(({ table }) =>
      `SELECT MAX(updated_at) AS ts, COUNT(*) AS c FROM ${table}`
    )
    const results = await Promise.all(queries.map(q => pool.query(q)))
    
    let maxTs = 0
    let totalCount = 0
    
    results.forEach(r => {
      const row = r.rows[0]
      if (row) {
        const t = new Date(row.ts).getTime() || 0
        if (t > maxTs) maxTs = t
        totalCount += parseInt(row.c || 0, 10)
      }
    })

    const version = `${maxTs}_${totalCount}`
    return res.json({ version })
  } catch (err) {
    console.error('Poll error:', err)
    return res.status(500).json({ error: err.message })
  }
}
