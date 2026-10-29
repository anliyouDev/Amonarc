import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import contact from './contact.js';

const dist = path.resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4','.ico':'image/x-icon'};
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (pathname === '/api/contact') return await contact(req,res);
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{'Allow':'GET, HEAD'}).end(); return; }
    if (pathname.split('/').some(p => p.startsWith('.'))) { res.writeHead(404).end(); return; }
    const pagePaths=new Set(['/services-entreprises','/ecommerce-afrique','/investisseurs']);
    const clean=pathname.replace(/\/$/,'') || '/';
    if(clean!=='/' && pathname.endsWith('/') && pagePaths.has(clean)){res.writeHead(301,{Location:clean}).end();return;}
    const target=pathname === '/' ? '/index.html' : pagePaths.has(clean) ? clean+'/index.html' : pathname;
    const file = path.resolve(dist,'.'+target);
    if (!file.startsWith(dist+path.sep)) { res.writeHead(404).end(); return; }
    const info = await stat(file);
    if (!info.isFile()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Content-Length',info.size);
    res.setHeader('Cache-Control',pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache');
    if (req.method === 'HEAD') return res.end();
    const stream = createReadStream(file);
    stream.on('error',() => res.destroy()); stream.pipe(res);
  } catch { if (!res.headersSent) res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':'noindex'}); res.end('<!doctype html><html lang="fr"><title>Page introuvable | Amonarc</title><h1>Page introuvable</h1><a href="/">Retour à l’accueil Amonarc</a></html>'); }
});
server.requestTimeout = 20000;
server.headersTimeout = 10000;
server.listen(Number(process.env.PORT || 8787),process.env.HOST || '127.0.0.1',() => console.log('Amonarc server ready'));
