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

    // Get the latest updated_at timestamp across all tables
    const queries = Object.values(COLLECTIONS).map(({ table }) =>
      `SELECT MAX(updated_at) AS ts FROM ${table}`
    )
    const results = await Promise.all(queries.map(q => pool.query(q)))
    const timestamps = results
      .map(r => r.rows[0]?.ts)
      .filter(Boolean)
      .map(t => new Date(t).getTime())

    const version = timestamps.length > 0 ? Math.max(...timestamps) : 0
    return res.json({ version })
  } catch (err) {
    console.error('Poll error:', err)
    return res.status(500).json({ error: err.message })
  }
}
