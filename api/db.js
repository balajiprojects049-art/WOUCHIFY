import pkg from 'pg'
const { Pool } = pkg

let pool = null

export function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
    })
  }
  return pool
}

export const COLLECTIONS = {
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

export async function ensureTables(db) {
  const ddl = Object.values(COLLECTIONS)
    .map(({ table }) => `
      CREATE TABLE IF NOT EXISTS ${table} (
        id VARCHAR(255) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .join('\n')
  await db.query(ddl)
}

export function getItemId(cfg, data) {
  if (cfg.mode === 'single') return 'single'
  return data?.slug || data?.id || Math.random().toString(36).slice(2)
}
