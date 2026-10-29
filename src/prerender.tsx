import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App';
export { pages, metadata, structuredData, origin } from './seo';

export function render(path:string):Promise<string> {
  return new Promise((resolve,reject)=>{
    const output=new PassThrough();let html='';
    output.on('data',chunk=>{html+=chunk;});output.on('end',()=>resolve(html));output.on('error',reject);
    const stream=renderToPipeableStream(<StrictMode><StaticRouter location={path}><App /></StaticRouter></StrictMode>,{onAllReady(){stream.pipe(output);},onShellError:reject,onError:reject});
  });
}
