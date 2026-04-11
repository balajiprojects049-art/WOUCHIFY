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
  deals: { table: 'wouchify_deals', mode: 'list' },
  lootDeals: { table: 'wouchify_loot_deals', mode: 'list' },
  stores: { table: 'wouchify_stores', mode: 'list' },
  coupons: { table: 'wouchify_coupons', mode: 'list' },
  giveaways: { table: 'wouchify_giveaways', mode: 'list' },
  adminMembers: { table: 'wouchify_admin_members', mode: 'list' },
  auditLog: { table: 'wouchify_audit_log', mode: 'list' },
  adminSettings: { table: 'wouchify_admin_settings', mode: 'single' },
  creditCards: { table: 'wouchify_credit_cards', mode: 'single' },
  banners: { table: 'wouchify_banners', mode: 'single' },
  analytics: { table: 'wouchify_analytics', mode: 'single' },
}

const LEGACY_SINGLETON_KEYS = new Set(['adminSettings', 'creditCards', 'banners', 'analytics'])

const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
}) : null

function getCollectionConfig(collection) {
  return COLLECTIONS[collection] || null
}

function getItemId(data) {
  return data?.slug || data?.id || Math.random().toString(36).slice(2)
}

async function createTables() {
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

async function isAllNewTablesEmpty() {
  const results = await Promise.all(
    Object.values(COLLECTIONS).map(({ table }) =>
      pool.query(`SELECT COUNT(*)::int AS count FROM ${table}`)
    )
  )
  return results.every((r) => (r.rows[0]?.count || 0) === 0)
}

async function upsertCollectionItem(db, collection, data, forcedId = null) {
  const cfg = getCollectionConfig(collection)
  if (!cfg) throw new Error(`Unknown collection: ${collection}`)

  const id = cfg.mode === 'single' ? 'single' : (forcedId || getItemId(data))
  await db.query(
    `INSERT INTO ${cfg.table} (id, data) VALUES ($1, $2)
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [id, data]
  )
}

async function deleteCollectionItem(db, collection, id) {
  const cfg = getCollectionConfig(collection)
  if (!cfg) throw new Error(`Unknown collection: ${collection}`)

  if (cfg.mode === 'single') {
    await db.query(`DELETE FROM ${cfg.table}`)
    return
  }

  if (!id) throw new Error(`Missing id for collection: ${collection}`)
  await db.query(`DELETE FROM ${cfg.table} WHERE id = $1`, [id])
}

async function clearCollection(db, collection) {
  const cfg = getCollectionConfig(collection)
  if (!cfg) throw new Error(`Unknown collection: ${collection}`)
  await db.query(`DELETE FROM ${cfg.table}`)
}

async function migrateFromLegacyItemsIfNeeded() {
  if (!pool) return

  const legacyCheck = await pool.query("SELECT to_regclass('public.wouchify_items') AS table_name")
  if (!legacyCheck.rows[0]?.table_name) return

  const shouldMigrate = await isAllNewTablesEmpty()
  if (!shouldMigrate) return

  const { rows } = await pool.query('SELECT collection, id, data FROM wouchify_items')
  if (!rows.length) return

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    for (const row of rows) {
      const { collection, id, data } = row
      const cfg = getCollectionConfig(collection)
      if (!cfg) continue

      const forcedId = cfg.mode === 'list' ? (data?.slug || data?.id || id) : null
      await upsertCollectionItem(client, collection, data, forcedId)
    }

    await client.query('COMMIT')
    console.log('✅ Migrated legacy wouchify_items data into module tables.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Legacy migration error:', err)
  } finally {
    client.release()
  }
}

async function migrateFromSingletonBridgeIfNeeded() {
  if (!pool) return

  const singletonCheck = await pool.query("SELECT to_regclass('public.wouchify_singletons') AS table_name")
  if (!singletonCheck.rows[0]?.table_name) return

  const { rows } = await pool.query('SELECT key, data FROM wouchify_singletons')
  if (!rows.length) return

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    for (const row of rows) {
      if (!LEGACY_SINGLETON_KEYS.has(row.key)) continue
      if (!getCollectionConfig(row.key)) continue
      await upsertCollectionItem(client, row.key, row.data)
    }

    await client.query('COMMIT')
    console.log('✅ Migrated singleton bridge data into module tables.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Singleton migration error:', err)
  } finally {
    client.release()
  }
}

async function initDB() {
  if (!pool) return
  await createTables()
  await migrateFromLegacyItemsIfNeeded()
  await migrateFromSingletonBridgeIfNeeded()
  console.log('✅ Neon Database connected and module tables ensured.')
}

if (pool) initDB().catch(console.error)

app.get('/api/data', async (req, res) => {
  if (!pool) return res.json({ isConnected: false })

  try {
    const data = {}
    let rowCount = 0

    for (const [collection, cfg] of Object.entries(COLLECTIONS)) {
      if (cfg.mode === 'single') {
        const { rows } = await pool.query(`SELECT data FROM ${cfg.table} ORDER BY updated_at DESC LIMIT 1`)
        if (rows[0]) {
          data[collection] = rows[0].data
          rowCount += 1
        }
      } else {
        const { rows } = await pool.query(`SELECT data FROM ${cfg.table} ORDER BY updated_at DESC`)
        data[collection] = rows.map((r) => r.data)
        rowCount += rows.length
      }
    }

    res.json({ isConnected: true, hasData: rowCount > 0, data })
  } catch (err) {
    console.error('DB fetch error:', err)
    res.status(500).json({ isConnected: false, error: err.message })
  }
})

app.post('/api/sync', async (req, res) => {
  if (!pool) return res.status(400).json({ error: 'No DATABASE_URL configured' })

  const state = req.body
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const tables = Object.values(COLLECTIONS).map((cfg) => cfg.table).join(', ')
    await client.query(`TRUNCATE TABLE ${tables}`)

    for (const [collection, payload] of Object.entries(state)) {
      const cfg = getCollectionConfig(collection)
      if (!cfg) continue

      if (cfg.mode === 'single') {
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          await upsertCollectionItem(client, collection, payload)
        }
      } else if (Array.isArray(payload)) {
        for (const item of payload) {
          await upsertCollectionItem(client, collection, item)
        }
      }
    }

    await client.query('COMMIT')
    res.json({ success: true, message: 'Successfully synced all module data to Neon tables.' })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Sync error:', err)
    res.status(500).json({ error: err.message })
  } finally {
    client.release()
  }
})

app.post('/api/:collection', async (req, res) => {
  if (!pool) return res.json({ skip: true })

  const { collection } = req.params
  const data = req.body

  try {
    await upsertCollectionItem(pool, collection, data)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/:collection/:id', async (req, res) => {
  if (!pool) return res.json({ skip: true })

  const { collection, id } = req.params

  try {
    await deleteCollectionItem(pool, collection, id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/:collection', async (req, res) => {
  if (!pool) return res.json({ skip: true })

  const { collection } = req.params

  try {
    await clearCollection(pool, collection)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
