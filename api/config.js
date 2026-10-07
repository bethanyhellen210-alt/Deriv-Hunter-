export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    derivAppId: process.env.DERIV_APP_ID || process.env.VITE_DERIV_APP_ID || '1089'
  });
}
