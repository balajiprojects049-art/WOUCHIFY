import { getPool, COLLECTIONS, ensureTables } from './db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const pool = getPool()
  if (!pool) return res.json({ isConnected: false, hasData: false, data: {} })

  try {
    await ensureTables(pool)

    const data = {}
    let rowCount = 0

    for (const [collection, cfg] of Object.entries(COLLECTIONS)) {
      if (cfg.mode === 'single') {
        const { rows } = await pool.query(
          `SELECT data FROM ${cfg.table} ORDER BY updated_at DESC LIMIT 1`
        )
        if (rows[0]) {
          data[collection] = rows[0].data
          rowCount++
        }
      } else {
        const { rows } = await pool.query(
          `SELECT data FROM ${cfg.table} ORDER BY updated_at DESC`
        )
        data[collection] = rows.map((r) => r.data)
        rowCount += rows.length
      }
    }

    return res.json({ isConnected: true, hasData: rowCount > 0, data })
  } catch (err) {
    console.error('GET /api/data error:', err)
    return res.status(500).json({ isConnected: false, error: err.message })
  }
}
