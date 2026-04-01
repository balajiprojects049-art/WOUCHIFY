import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'

dotenv.config()
const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

const COLLECTIONS = {
  deals:         { table: 'wouchify_deals',          mode: 'list' },
  lootDeals:     { table: 'wouchify_loot_deals',     mode: 'list' },
  stores:        { table: 'wouchify_stores',          mode: 'list' },
  coupons:       { table: 'wouchify_coupons',         mode: 'list' },
  giveaways:     { table: 'wouchify_giveaways',       mode: 'list' },
  adminMembers:  { table: 'wouchify_admin_members',   mode: 'list' },
  auditLog:      { table: 'wouchify_audit_log',       mode: 'list' },
  adminSettings: { table: 'wouchify_admin_settings',  mode: 'single' },
  creditCards:   { table: 'wouchify_credit_cards',    mode: 'single' },
  banners:       { table: 'wouchify_banners',         mode: 'single' },
  analytics:     { table: 'wouchify_analytics',       mode: 'single' },
}

const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
}) : null

async function ensureTables() {
  if (!pool) return
  const ddl = Object.values(COLLECTIONS)
    .map(({ table }) => `
      CREATE TABLE IF NOT EXISTS ${table} (
        id VARCHAR(255) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .join('\n')
  await pool.query(ddl)
}

function getItemId(cfg, data) {
  if (cfg.mode === 'single') return 'single'
  return data?.slug || data?.id || Math.random().toString(36).slice(2)
}

async function upsertItem(db, cfg, data, forcedId = null) {
  const id = forcedId !== null ? forcedId : getItemId(cfg, data)
  await db.query(
    `INSERT INTO ${cfg.table} (id, data) VALUES ($1, $2)
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [id, data]
  )
  return id
}

// init
if (pool) {
  ensureTables()
    .then(() => console.log('✅ Neon DB connected and tables ensured.'))
    .catch(console.error)
}

// ── GET /api/data ─────────────────────────────────────────────────────────────
app.get('/api/data', async (req, res) => {
  if (!pool) return res.json({ isConnected: false, hasData: false, data: {} })

  try {
    const data = {}
    let rowCount = 0

    for (const [collection, cfg] of Object.entries(COLLECTIONS)) {
      if (cfg.mode === 'single') {
        const { rows } = await pool.query(`SELECT data FROM ${cfg.table} ORDER BY updated_at DESC LIMIT 1`)
        if (rows[0]) { data[collection] = rows[0].data; rowCount++ }
      } else {
        const { rows } = await pool.query(`SELECT data FROM ${cfg.table} ORDER BY updated_at DESC`)
        data[collection] = rows.map((r) => r.data)
        rowCount += rows.length
      }
    }

    res.json({ isConnected: true, hasData: rowCount > 0, data })
  } catch (err) {
    console.error('GET /api/data error:', err)
    res.status(500).json({ isConnected: false, error: err.message })
  }
})

// ── POST /api/sync ─────────────────────────────────────────────────────────
app.post('/api/sync', async (req, res) => {
  if (!pool) return res.status(400).json({ error: 'No DATABASE_URL' })

  const state = req.body
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const tables = Object.values(COLLECTIONS).map((cfg) => cfg.table).join(', ')
    await client.query(`TRUNCATE TABLE ${tables}`)

    for (const [collection, payload] of Object.entries(state)) {
      const cfg = COLLECTIONS[collection]
      if (!cfg) continue
      if (cfg.mode === 'single') {
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          await upsertItem(client, cfg, payload, 'single')
        }
      } else if (Array.isArray(payload)) {
        for (const item of payload) {
          await upsertItem(client, cfg, item)
        }
      }
    }

    await client.query('COMMIT')
    res.json({ success: true })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('POST /api/sync error:', err)
    res.status(500).json({ error: err.message })
  } finally {
    client.release()
  }
})

// ── POST /api/collection/:collection — upsert item ────────────────────────
app.post('/api/collection/:collection', async (req, res) => {
  if (!pool) return res.json({ skip: true })

  const { collection } = req.params
  const cfg = COLLECTIONS[collection]
  if (!cfg) return res.status(400).json({ error: `Unknown collection: ${collection}` })

  try {
    const id = await upsertItem(pool, cfg, req.body)
    res.json({ success: true, id })
  } catch (err) {
    console.error(`POST /api/collection/${collection} error:`, err)
    res.status(500).json({ error: err.message })
  }
})

// ── DELETE /api/collection/:collection/:id — delete item ──────────────────
app.delete('/api/collection/:collection/:id', async (req, res) => {
  if (!pool) return res.json({ skip: true })

  const { collection, id } = req.params
  const cfg = COLLECTIONS[collection]
  if (!cfg) return res.status(400).json({ error: `Unknown collection: ${collection}` })

  try {
    await pool.query(`DELETE FROM ${cfg.table} WHERE id = $1`, [id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── DELETE /api/collection/:collection — clear collection ─────────────────
app.delete('/api/collection/:collection', async (req, res) => {
  if (!pool) return res.json({ skip: true })

  const { collection } = req.params
  const cfg = COLLECTIONS[collection]
  if (!cfg) return res.status(400).json({ error: `Unknown collection: ${collection}` })

  try {
    await pool.query(`DELETE FROM ${cfg.table}`)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
