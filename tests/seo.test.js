import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const pages=['','services-entreprises','ecommerce-afrique','investisseurs'];
test('all public pages expose substantial content, one H1 and unique metadata before JavaScript runs',async()=>{
  const titles=new Set();
  for(const page of pages){
    const html=await fs.readFile(`dist/${page?page+'/':''}index.html`,'utf8');
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1,page);
    assert.equal((html.match(/name="description"/g)||[]).length,1,page);
    assert.match(html,/data-prerendered="true"/);
    assert.match(html,/<main[\s\S]*<h1/);
    assert.match(html,/<form/);
    assert.match(html,new RegExp(`rel="canonical" href="https://www\\.amonarc\\.com/${page}"`));
    const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);
    const schema=JSON.parse(html.match(/id="seo-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.ok(schema['@graph'].some(x=>x['@type']==='Organization'));
    assert.doesNotMatch(html,/href="\/#\//);
  }
});
test('regional service and ecommerce pages cover different user needs without claiming local offices',async()=>{
  const service=await fs.readFile('dist/services-entreprises/index.html','utf8');
  const ecommerce=await fs.readFile('dist/ecommerce-afrique/index.html','utf8');
  assert.match(service,/Développement web et mobile/);assert.match(service,/Sénégal/);assert.match(service,/Bénin/);
  assert.match(service,/ne constituent pas une liste de bureaux/);
  assert.match(ecommerce,/application est en développement/);
  assert.match(ecommerce,/création de sites marchands|Créer un site e-commerce/);
});
test('sitemap, robots and error page support crawl discovery without indexing errors',async()=>{
  const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
  assert.equal((sitemap.match(/<loc>/g)||[]).length,4);
  assert.doesNotMatch(sitemap,/#|localhost|127\.0\.0\.1/);
  const robots=await fs.readFile('dist/robots.txt','utf8');
  assert.match(robots,/Sitemap: https:\/\/www.amonarc.com\/sitemap.xml/);
  assert.match(await fs.readFile('dist/404.html','utf8'),/noindex,follow/);
});
