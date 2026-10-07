export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
  try{
    const auth=req.headers.authorization||'';
    if(!auth) return res.status(401).json({error:'Authorization required'});
    const r=await fetch('https://api.derivws.com/trading/v1/options/accounts',{
      headers:{Authorization:auth,'Content-Type':'application/json'}
    });
    const data=await r.json();
    return res.status(r.status).json(data);
  }catch(e){return res.status(500).json({error:e.message})}
}
