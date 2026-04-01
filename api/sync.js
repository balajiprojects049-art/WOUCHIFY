import { getPool, COLLECTIONS, ensureTables } from './db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const pool = getPool()
  if (!pool) return res.status(400).json({ error: 'No DATABASE_URL configured' })

  const state = req.body
  const client = await pool.connect()

  try {
    await ensureTables(client)
    await client.query('BEGIN')

    const tables = Object.values(COLLECTIONS).map((cfg) => cfg.table).join(', ')
    await client.query(`TRUNCATE TABLE ${tables}`)

    for (const [collection, payload] of Object.entries(state)) {
      const cfg = COLLECTIONS[collection]
      if (!cfg) continue

      if (cfg.mode === 'single') {
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          await client.query(
            `INSERT INTO ${cfg.table} (id, data) VALUES ($1, $2)
             ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
            ['single', payload]
          )
        }
      } else if (Array.isArray(payload)) {
        for (const item of payload) {
          const id = item?.slug || item?.id || Math.random().toString(36).slice(2)
          await client.query(
            `INSERT INTO ${cfg.table} (id, data) VALUES ($1, $2)
             ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
            [id, item]
          )
        }
      }
    }

    await client.query('COMMIT')
    return res.json({ success: true, message: 'All data synced to Neon.' })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('POST /api/sync error:', err)
    return res.status(500).json({ error: err.message })
  } finally {
    client.release()
  }
}
