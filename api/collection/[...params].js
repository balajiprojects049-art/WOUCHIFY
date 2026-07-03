import { getPool, COLLECTIONS, ensureTables, getItemId } from '../db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // Parse the URL path directly to extract parameters safely
  // req.url is like "/api/collection/deals" or "/api/collection/deals/some-slug"
  const urlPath = req.url.split('?')[0]
  const urlParts = urlPath.split('/').filter(Boolean) // ['api', 'collection', 'deals', ...]
  
  // Find where 'collection' is in the path
  const collectionIdx = urlParts.indexOf('collection')
  const collection = collectionIdx !== -1 ? urlParts[collectionIdx + 1] : null
  const itemId = collectionIdx !== -1 ? (urlParts[collectionIdx + 2] || null) : null

  const pool = getPool()
  if (!pool) return res.json({ skip: true })

  const cfg = COLLECTIONS[collection]
  if (!cfg) return res.status(400).json({ error: `Unknown collection: ${collection}` })

  try {
    await ensureTables(pool)

    // ── POST: upsert item ───────────────────────────────────────────────────
    if (req.method === 'POST') {
      const data = req.body
      const id = getItemId(cfg, data)

      await pool.query(
        `INSERT INTO ${cfg.table} (id, data) VALUES ($1, $2)
         ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [id, data]
      )
      return res.json({ success: true, id })
    }

    // ── DELETE ──────────────────────────────────────────────────────────────
    if (req.method === 'DELETE') {
      if (cfg.mode === 'single' || !itemId) {
        // clear entire collection / singleton
        await pool.query(`DELETE FROM ${cfg.table}`)
      } else {
        await pool.query(`DELETE FROM ${cfg.table} WHERE id = $1`, [itemId])
      }
      return res.json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error(`Error on ${req.method} /api/collection/${params.join('/')}:`, err)
    return res.status(500).json({ error: err.message })
  }
}
