import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
const vite=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
  const {render,pages,metadata,structuredData,origin}=await vite.ssrLoadModule('/src/prerender.tsx');
  const template=await fs.readFile('dist/index.html','utf8');
  if(!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) throw new Error('SEO template markers missing');
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  for(const route of [...Object.keys(pages),'/404']) {
    const data=metadata(route),url=origin+(route==='/'?'/':route);
    const head=`<title>${escape(data.title)}</title>\n<meta name="description" content="${escape(data.description)}" />\n<meta name="robots" content="${route==='/404'?'noindex,follow':'index,follow,max-image-preview:large'}" />\n<link rel="canonical" href="${url}" />\n<meta property="og:type" content="website" /><meta property="og:locale" content="fr_CI" /><meta property="og:site_name" content="Amonarc" /><meta property="og:title" content="${escape(data.title)}" /><meta property="og:description" content="${escape(data.description)}" /><meta property="og:url" content="${url}" /><meta property="og:image" content="${origin}/media/video-poster.webp" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(data.title)}" /><meta name="twitter:description" content="${escape(data.description)}" /><meta name="twitter:image" content="${origin}/media/video-poster.webp" />\n<script id="seo-structured-data" type="application/ld+json">${JSON.stringify(structuredData(route)).replaceAll('<','\\u003c')}</script>`;
    const html=template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/,head).replace('<div id="root"></div>',`<div id="root" data-prerendered="true">${await render(route)}</div>`);
    if(route==='/404'){await fs.writeFile('dist/404.html',html);continue;}
    const target=route==='/'?'dist/index.html':path.join('dist',route.slice(1),'index.html');
    await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,html);
    console.log('Prerendered',route);
  }
  await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(p=>`<url><loc>${origin}${p==='/'?'/':p}</loc></url>`).join('')}</urlset>`);
  await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`);
} finally { await vite.close(); }
