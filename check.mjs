import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_i64YPwCxSnqb@ep-super-dawn-am4kg16e-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  const r = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'wouchify_deals'");
  console.log('Cols:', r.rows);
  await pool.end();
}
go().catch(console.error);
