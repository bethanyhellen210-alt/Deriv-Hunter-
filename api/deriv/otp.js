export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    const auth=req.headers.authorization||'';
    const {account_id}=req.body||{};
    if(!auth||!account_id) return res.status(400).json({error:'Authorization and account_id are required'});
    const r=await fetch('https://api.derivws.com/trading/v1/options/accounts/'+encodeURIComponent(account_id)+'/otp',{
      method:'POST',
      headers:{Authorization:auth,'Content-Type':'application/json'},
      body:JSON.stringify({})
    });
    const data=await r.json();
    return res.status(r.status).json(data);
  }catch(e){return res.status(500).json({error:e.message})}
}
