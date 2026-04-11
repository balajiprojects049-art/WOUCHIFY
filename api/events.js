/**
 * /api/events — Server-Sent Events endpoint for Vercel (serverless compatible)
 *
 * NOTE: Vercel serverless functions are stateless — each request runs in its own
 * process, so a simple in-memory Set won't broadcast across concurrent requests.
 * For a single-server local dev setup (node server.js) this works perfectly.
 * On Vercel, the client will automatically fall back to long-polling via
 * the polling endpoint (/api/poll) that is handled by DataContext.
 *
 * For production real-time on Vercel, consider Vercel KV + polling or
 * upgrade to Vercel Edge Functions which support streaming.
 */

export const config = {
  // Required for streaming responses on Vercel
  api: { bodyParser: false },
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.flushHeaders()

  // Send a heartbeat every 20s to prevent Vercel's 30s timeout
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n')
    } catch {
      clearInterval(heartbeat)
    }
  }, 20000)

  req.on('close', () => {
    clearInterval(heartbeat)
  })
}
