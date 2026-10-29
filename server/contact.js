import { createHash } from 'node:crypto';
import nodemailer from 'nodemailer';

export const recipients = Object.freeze(['jeanpkokora@gmail.com', 'konanalain94@gmail.com']);
const defaultOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:8787', 'http://localhost:8787', 'https://amonarc.com', 'https://www.amonarc.com'];
const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;
const maxBytes = 16000;

function config(env) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null;
  const port = Number(env.SMTP_PORT || 465);
  const from = env.SMTP_FROM || env.SMTP_USER;
  if (![465, 587].includes(port) || !emailPattern.test(from)) return null;
  return { from, transport: { host: env.SMTP_HOST, port, secure: port === 465,
    requireTLS: true, auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000 } };
}

function validate(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const limits = { name: [1,120], email:[3,254], organization:[0,160], profile:[1,100], service:[1,120], message:[10,3000] };
  const result = {};
  for (const [key,[min,max]] of Object.entries(limits)) {
    if (raw[key] !== undefined && typeof raw[key] !== 'string') return null;
    const value = (raw[key] || '').trim();
    if (value.length < min || value.length > max || (key !== 'message' && /[\r\n\0]/.test(value)) || /\0/.test(value)) return null;
    result[key] = value;
  }
  return emailPattern.test(result.email) ? result : null;
}

// Injection point is used by local tests; production always constructs a TLS SMTP transport.
export function createContactHandler({ env = process.env, transportFactory = nodemailer.createTransport, now = Date.now } = {}) {
  const limits = new Map();
  const requests = new Map();
  let transport;
  const origins = new Set((env.CONTACT_ALLOWED_ORIGINS || defaultOrigins.join(',')).split(',').map(s => s.trim()).filter(Boolean));
  return async function contact(req, res) {
    const reply = (status, body) => { res.statusCode = status; res.setHeader('Content-Type','application/json; charset=utf-8'); res.setHeader('Cache-Control','no-store'); res.setHeader('X-Content-Type-Options','nosniff'); res.end(JSON.stringify(body)); };
    if (req.method !== 'POST') { res.setHeader('Allow','POST'); return reply(405,{ok:false,code:'method'}); }
    // Origin plus JSON-only requests block cross-origin browser form posts. No permissive CORS.
    if (typeof req.headers.origin !== 'string' || !origins.has(req.headers.origin)) return reply(403,{ok:false,code:'origin'});
    if (!(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return reply(415,{ok:false,code:'content_type'});
    let raw;
    try {
      if (Number(req.headers['content-length'] || 0) > maxBytes) return reply(413,{ok:false,code:'too_large'});
      if (req.body !== undefined) {
        const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        if (Buffer.byteLength(body) > maxBytes) return reply(413,{ok:false,code:'too_large'});
        raw = typeof req.body === 'string' ? JSON.parse(body) : req.body;
      } else {
        const chunks = []; let size = 0;
        for await (const chunk of req) { size += chunk.length; if (size > maxBytes) return reply(413,{ok:false,code:'too_large'}); chunks.push(chunk); }
        raw = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }
    } catch { return reply(400,{ok:false,code:'invalid_json'}); }
    if (raw && typeof raw === 'object' && raw.website) return reply(400,{ok:false,code:'invalid'});
    const data = validate(raw);
    if (!data) return reply(400,{ok:false,code:'invalid'});
    const settings = config(env);
    if (!settings) return reply(503,{ok:false,code:'not_configured'});
    const time = now();
    for (const [key,item] of limits) if (item.expires <= time) limits.delete(key);
    for (const [key,item] of requests) if (item.expires <= time) requests.delete(key);
    const digest = createHash('sha256').update(JSON.stringify(data)).digest('hex');
    const previous = requests.get(digest);
    if (previous) { const result = await previous.result; return reply(result.status,result.body); }
    const emailKey = createHash('sha256').update(data.email.toLowerCase()).digest('hex');
    const bucket = limits.get(emailKey) || { count:0, expires:time+600000 };
    if (bucket.count >= 5 || limits.size >= 10000 || requests.size >= 10000) { res.setHeader('Retry-After','600'); return reply(429,{ok:false,code:'rate_limit'}); }
    bucket.count++; limits.set(emailKey,bucket);
    const send = async () => {
      try {
        transport ||= transportFactory(settings.transport);
        const info = await transport.sendMail({
          from: { name:'Amonarc — Contact', address:settings.from },
          to: [...recipients], replyTo: { name:data.name, address:data.email },
          subject: data.service === 'Investissement — Application Amonarc' ? 'Amonarc — Demande investisseur' : 'Amonarc — Nouvelle demande',
          text: `Nom : ${data.name}\nEmail : ${data.email}\nOrganisation : ${data.organization || 'Non précisée'}\nProfil : ${data.profile}\nSujet : ${data.service}\n\n${data.message}`,
          disableFileAccess:true, disableUrlAccess:true,
        });
        const accepted = (info.accepted || []).map(x => String(x).toLowerCase());
        if (!recipients.every(x => accepted.includes(x))) return {status:502,body:{ok:false,code:'delivery_unconfirmed'}};
        return {status:200,body:{ok:true}};
      } catch { return {status:502,body:{ok:false,code:'delivery_unconfirmed'}}; }
    };
    const result = send();
    // Deduplicate concurrent identical submissions and retries for ten minutes.
    requests.set(digest,{result,expires:time+600000});
    const outcome = await result;
    if (outcome.status !== 200) requests.delete(digest);
    return reply(outcome.status,outcome.body);
  };
}

export default createContactHandler();
