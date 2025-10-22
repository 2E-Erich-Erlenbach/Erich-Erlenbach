import sgMail from '@sendgrid/mail'
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({message:'Method not allowed'});
  const {email,name}=req.body; if(!email) return res.status(400).json({message:'Email required'});
  const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY; const EMAIL_TO=process.env.EMAIL_TO||'2e.erich.erlenbach@gmail.com'; const EMAIL_FROM=process.env.EMAIL_FROM||'2e.erich.erlenbach@gmail.com';
  if(!SENDGRID_API_KEY) return res.status(500).json({message:'SendGrid API key not configured'});
  try{ sgMail.setApiKey(SENDGRID_API_KEY); await sgMail.send({to:EMAIL_TO,from:EMAIL_FROM,subject:`New subscriber: ${email}`,text:`New subscription from ${email}${name?(' - '+name):''}`}); return res.status(200).json({message:'Thank you for subscribing!'});}catch(err){console.error(err); return res.status(500).json({message:'Error sending email'})}
}
