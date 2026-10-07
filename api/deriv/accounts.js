export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers.authorization;
  const appId = process.env.DERIV_APP_ID || process.env.VITE_DERIV_APP_ID;

  if (!token) return res.status(401).json({ error: 'Authorization header is required' });
  if (!appId) return res.status(500).json({ error: 'DERIV_APP_ID is not configured on Vercel' });

  try {
    const r = await fetch('https://api.derivws.com/trading/v1/options/accounts', {
      headers: {
        Authorization: token,
        'Deriv-App-ID': String(appId),
        'Content-Type': 'application/json'
      }
    });
    const text = await r.text();
    res.status(r.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (e) {
    res.status(502).json({ error: e?.message || 'Unable to reach Deriv' });
  }
}
