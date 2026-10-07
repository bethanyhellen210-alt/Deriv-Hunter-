export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    const {code,code_verifier,redirect_uri}=req.body||{};
    const client_id=process.env.DERIV_CLIENT_ID||process.env.DERIV_APP_ID||'';
    if(!client_id) return res.status(500).json({error:'DERIV_APP_ID is not configured'});
    if(!code||!code_verifier||!redirect_uri) return res.status(400).json({error:'Missing OAuth parameters'});
    const body=new URLSearchParams({
      grant_type:'authorization_code',
      client_id,
      code,
      code_verifier,
      redirect_uri
    });
    const r=await fetch('https://auth.deriv.com/oauth2/token',{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body
    });
    const data=await r.json();
    return res.status(r.status).json(data);
  }catch(e){return res.status(500).json({error:e.message})}
}
