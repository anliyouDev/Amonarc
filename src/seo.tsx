import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const origin = 'https://www.amonarc.com';
export const pages = {
  '/': { title:'Amonarc | Services numériques en Côte d’Ivoire', description:'Développement web et mobile, design, multimédia, formation et communication en Côte d’Ivoire. Collaborations numériques en Afrique de l’Ouest.', label:'Accueil' },
  '/services-entreprises': { title:'Services numériques aux entreprises en Côte d’Ivoire | Amonarc', description:'Sites web, applications mobiles, design, vidéo, formation et communication : Amonarc accompagne les entreprises en Côte d’Ivoire et les projets régionaux.', label:'Services aux entreprises' },
  '/ecommerce-afrique': { title:'E-commerce en Afrique de l’Ouest : projet Amonarc', description:'Découvrez le projet e-commerce Amonarc en développement et nos services de création de sites marchands pour les entreprises en Côte d’Ivoire et en Afrique de l’Ouest.', label:'E-commerce en Afrique' },
  '/investisseurs': { title:'Investir dans le projet e-commerce Amonarc en Afrique', description:'Échangez avec Amonarc autour d’un projet e-commerce africain en développement : vision, prototype, prochaines étapes et partenariats financiers ou stratégiques.', label:'Investisseurs' },
};
export type PagePath = keyof typeof pages;
export const pathOf = (path:string) => path.replace(/\/$/,'') || '/';
export function metadata(path:string) {
  return pages[pathOf(path) as PagePath] || {title:'Page introuvable | Amonarc',description:'Retrouvez les services et le projet e-commerce Amonarc.',label:'Page introuvable'};
}
export function structuredData(path:string) {
  const current = metadata(path);
  const url = origin + (pathOf(path) === '/' ? '/' : pathOf(path));
  const graph:object[] = [
    {'@type':'Organization','@id':origin+'/#organization',name:'Amonarc',alternateName:'Amonak',url:origin+'/',logo:origin+'/media/amonarc-logo.png',telephone:['+2250797704542','+2250712450586'],sameAs:['https://www.facebook.com/amonarc'],description:'Services informatiques, création et communication en Côte d’Ivoire ; développement du projet e-commerce Amonarc.',knowsAbout:['Développement web et mobile','Design UI/UX','Multimédia','Pilotage de projet','Formation','Marketing et communication','E-commerce']},
    {'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Amonarc',inLanguage:'fr',publisher:{'@id':origin+'/#organization'}},
    {'@type':'WebPage','@id':url+'#webpage',url,name:current.title,description:current.description,inLanguage:'fr',isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#organization'}},
  ];
  if (pathOf(path) !== '/') graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:origin+'/'},{'@type':'ListItem',position:2,name:current.label,item:url}]});
  if (pathOf(path) === '/services-entreprises') graph.push({'@type':'Service',name:'Services numériques aux entreprises',provider:{'@id':origin+'/#organization'},areaServed:{'@type':'Country',name:'Côte d’Ivoire'},serviceType:['Développement web et mobile','Design','Multimédia','Formation','Pilotage de projet','Marketing et communication'],url});
  return {'@context':'https://schema.org','@graph':graph};
}
export default function Seo() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const data = metadata(pathname);
    document.title = data.title;
    const set = (selector:string,attr:string,value:string) => {
      let el=document.head.querySelector(selector);
      if(!el){el=document.createElement(selector.startsWith('link')?'link':'meta');const m=selector.match(/\[(name|property|rel)="([^"]+)"\]/);if(m)el.setAttribute(m[1],m[2]);document.head.appendChild(el);}
      el.setAttribute(attr,value);
    };
    const url=origin+(pathOf(pathname)==='/'?'/':pathOf(pathname));
    set('meta[name="description"]','content',data.description);
    set('meta[name="robots"]','content',pages[pathOf(pathname) as PagePath]?'index,follow,max-image-preview:large':'noindex,follow');
    set('link[rel="canonical"]','href',url);
    for(const [key,value] of Object.entries({'og:title':data.title,'og:description':data.description,'og:url':url,'og:locale':'fr_CI','og:type':'website','og:image':origin+'/media/video-poster.webp','twitter:card':'summary_large_image','twitter:title':data.title,'twitter:description':data.description,'twitter:image':origin+'/media/video-poster.webp'}))set(`meta[${key.startsWith('og:')?'property':'name'}="${key}"]`,'content',value);
    let script=document.getElementById('seo-structured-data');if(!script){script=document.createElement('script');script.id='seo-structured-data';script.setAttribute('type','application/ld+json');document.head.appendChild(script);}script.textContent=JSON.stringify(structuredData(pathname));
    if(hash){let id=hash.slice(1);try{id=decodeURIComponent(id);}catch{/* Ignore malformed external anchors. */}document.getElementById(id)?.scrollIntoView();}else window.scrollTo(0,0);
  },[pathname,hash]);
  return null;
}
