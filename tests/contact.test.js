import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createContactHandler, recipients } from '../server/contact.js';

const data = {name:'Test Amonarc', email:'visitor@example.org', profile:'Particulier', service:'Développement', message:'Un message de test pour notre projet.'};
const env = {SMTP_HOST:'smtp.example.org',SMTP_USER:'contact@example.org',SMTP_PASS:'local-test-value'};

test('accepts the presentation spaces of a Google app password',async t => {
  let options;
  const f = await fixture(t,{env:{...env,SMTP_HOST:'smtp.gmail.com',SMTP_PASS:'abcd efgh ijkl mnop'},transportFactory:value => {options=value;return {sendMail:async() => ({accepted:[...recipients]})};}});
  assert.equal((await f.post()).status,200);
  assert.equal(options.auth.pass,'abcdefghijklmnop');
});

async function fixture(t, options = {}) {
  const sent = [];
  const handler = createContactHandler({env,transportFactory:() => ({sendMail:async message => { sent.push(message); return {accepted:[...recipients]}; }}),...options});
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return {sent,post:async (body=data,headers={}) => {
    const response = await fetch(`http://127.0.0.1:${server.address().port}`,{method:'POST',headers:{Origin:'http://127.0.0.1:5173','Content-Type':'application/json',...headers},body:JSON.stringify(body)});
    return {status:response.status,body:await response.json()};
  }};
}

test('uses only the two fixed recipients, with visitor reply-to and text-only content',async t => {
  const f = await fixture(t);
  assert.equal((await f.post({...data,to:'attacker@example.org',message:'<script>alert(1)</script> Ceci reste du texte.'})).status,200);
  assert.deepEqual(f.sent[0].to,recipients);
  assert.equal(f.sent[0].replyTo.address,data.email);
  assert.equal(f.sent[0].from.address,env.SMTP_USER);
  assert.equal(f.sent[0].html,undefined);
  assert.match(f.sent[0].text,/<script>/);
});
test('rejects bad input, header injection, cross-origin requests and oversized bodies without sending',async t => {
  const f = await fixture(t);
  assert.equal((await f.post({...data,email:'wrong'})).status,400);
  assert.equal((await f.post({...data,name:'Name\r\nBcc: other@example.org'})).status,400);
  assert.equal((await f.post(data,{Origin:'https://untrusted.example.org'})).status,403);
  assert.equal((await f.post({...data,message:'x'.repeat(18000)})).status,413);
  assert.equal((await f.post({...data,website:'bot'})).status,400);
  assert.equal(f.sent.length,0);
});
test('fails clearly when SMTP is unconfigured or one recipient is rejected',async t => {
  const missing = await fixture(t,{env:{}});
  assert.deepEqual(await missing.post(),{status:503,body:{ok:false,code:'not_configured'}});
  const partial = await fixture(t,{transportFactory:() => ({sendMail:async() => ({accepted:[recipients[0]]})})});
  assert.equal((await partial.post()).status,502);
});
test('deduplicates concurrent retries and rate limits repeated messages from one email',async t => {
  const f = await fixture(t);
  const results = await Promise.all([f.post(),f.post()]);
  assert.ok(results.every(x => x.status===200));
  assert.equal(f.sent.length,1);
  for(let i=0;i<4;i++) assert.equal((await f.post({...data,message:`Message différent suffisamment long ${i}`})).status,200);
  assert.equal((await f.post({...data,message:'Sixième message suffisamment long.'})).status,429);
  assert.equal(f.sent.length,5);
});
