import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'
import path from 'path'

dotenv.config()
const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// If no DATABASE_URL, server will run but return empty/unconnected state
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}) : null

// Create generic table for Wouchify entities
async function initDB() {
  if (!pool) return
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wouchify_items (
      collection VARCHAR(50) NOT NULL,
      id VARCHAR(255) NOT NULL,
      data JSONB NOT NULL,
      PRIMARY KEY (collection, id)
    );
  `)
  console.log('✅ Neon Database connected and tables ensured.')
}
if (pool) initDB().catch(console.error)

// ── GET all data ──
app.get('/api/data', async (req, res) => {
  if (!pool) return res.json({ isConnected: false })
  
  try {
    const { rows } = await pool.query('SELECT collection, data FROM wouchify_items')
    const grouped = {}
    
    // Group back into arrays/objects based on collection type
    rows.forEach(r => {
      if (!grouped[r.collection]) grouped[r.collection] = []
      grouped[r.collection].push(r.data)
    })

    // Special handling for single objects instead of arrays
    if (grouped['adminSettings']?.length) grouped['adminSettings'] = grouped['adminSettings'][0]
    if (grouped['banners']?.length) grouped['banners'] = grouped['banners'][0]
    if (grouped['creditCards']?.length) grouped['creditCards'] = grouped['creditCards'][0]

    const hasData = rows.length > 0
    res.json({ isConnected: true, hasData, data: grouped })
  } catch (err) {
    console.error('DB fetch error:', err)
    res.status(500).json({ isConnected: false, error: err.message })
  }
})

// ── FULL SYNC (from browser localStorage to Neon DB) ──
app.post('/api/sync', async (req, res) => {
  if (!pool) return res.status(400).json({ error: 'No DATABASE_URL configured' })
  
  const state = req.body
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('TRUNCATE TABLE wouchify_items') // Clear and replace

    const insertQ = 'INSERT INTO wouchify_items (collection, id, data) VALUES ($1, $2, $3)'
    
    for (const [collection, items] of Object.entries(state)) {
      if (Array.isArray(items)) {
        for (const item of items) {
          const id = item.slug || item.id || Math.random().toString(36).slice(2)
          await client.query(insertQ, [collection, id, item])
        }
      } else if (items && typeof items === 'object') {
        // Objects like banners, creditCards, adminSettings
        await client.query(insertQ, [collection, 'single', items])
      }
    }
    
    await client.query('COMMIT')
    res.json({ success: true, message: 'Successfully synced all data to Neon Database!' })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Migration error:', err)
    res.status(500).json({ error: err.message })
  } finally {
    client.release()
  }
})

// ── INDIVIDUAL CRUD OPERATIONS (to keep DB in sync on edits) ──
// We'll fire off background fetches when admin edits a deal
app.post('/api/:collection', async (req, res) => {
  if (!pool) return res.json({ skip: true })
  const { collection } = req.params
  const data = req.body
  const id = data.slug || data.id || 'single'
  
  try {
    await pool.query(
      'INSERT INTO wouchify_items (collection, id, data) VALUES ($1, $2, $3) ON CONFLICT (collection, id) DO UPDATE SET data = EXCLUDED.data',
      [collection, id, data]
    )
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/:collection/:id', async (req, res) => {
  if (!pool) return res.json({ skip: true })
  const { collection, id } = req.params
  try {
    await pool.query('DELETE FROM wouchify_items WHERE collection = $1 AND id = $2', [collection, id])
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
