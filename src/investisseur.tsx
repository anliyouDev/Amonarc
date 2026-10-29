import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowLeft, FiArrowRight, FiCheck, FiUsers, FiCompass, FiTrendingUp } from 'react-icons/fi';
import ContactForm from './ContactForm';
import useReveal from './useReveal';
import './investisseur.css';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;
const thesis = [
  { Icon: FiUsers, title: 'Le commerce part des personnes.', text: 'Notre conviction : la relation et la confiance doivent être au cœur de l’expérience d’achat, au même titre que la transaction.' },
  { Icon: FiCompass, title: 'Une conception ancrée dans les usages.', text: 'Partir des réalités des vendeurs et des acheteurs africains, tester sur le terrain, puis élargir progressivement le périmètre.' },
  { Icon: FiTrendingUp, title: 'Une ambition, des étapes mesurables.', text: 'Faire la preuve de la valeur sur un premier marché avant d’envisager une expansion. Chaque étape doit produire des enseignements.' },
];

export default function Investisseur() {
  useReveal();
  useEffect(() => {
    const previous = document.title;
    document.title = 'Investir dans Amonarc — Construire le commerce de demain';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);
  const meet = () => document.getElementById('invest-contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return <div className="corporate investor-site">
    <a className="skip-link" href="#invest-content" onClick={e => { e.preventDefault(); document.getElementById('invest-content')?.focus(); }}>Aller au contenu</a>
    <header className="site-header"><div className="nav-inner">
      <Link to="/" className="brand" aria-label="Amonarc, accueil"><img src={asset('media/amonarc-logo.png')} alt="Amonarc" width="186" height="47" /></Link>
      <Link className="back-home" to="/"><FiArrowLeft aria-hidden /> Le groupe Amonarc</Link>
      <button className="button primary" onClick={meet}>Échangeons <FiArrowUpRight aria-hidden /></button>
    </div></header>
    <main id="invest-content" tabIndex={-1}>
      <section className="invest-hero section-shell">
        <div className="invest-hero-copy"><p className="eyebrow"><span className="status-dot" /> Amonarc · Espace investisseurs</p>
          <h1>Le commerce africain a de l’avenir.<br /><span>Construisons la suite.</span></h1>
          <p className="invest-lead">Une nouvelle expérience de commerce, portée par les communautés. Une ambition : rendre les échanges plus accessibles, plus humains et plus fiables.</p>
          <div className="button-row"><button className="button primary" onClick={meet}>Rencontrer l’équipe <FiArrowUpRight aria-hidden /></button><button className="text-button" onClick={() => document.getElementById('invest-thesis')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Explorer notre vision <FiArrowRight aria-hidden /></button></div>
          <div className="invest-stage"><span className="status-dot" /><span>Prototype en développement<br /><strong>À la recherche de partenaires financiers et stratégiques</strong></span></div>
        </div>
        <figure className="invest-product"><span className="product-caption">LE COMMERCE PREND UNE AUTRE DIMENSION.</span><img src={asset('media/application-feed.webp')} width="780" height="1688" alt="Capture du fil d’actualité du prototype Flutter Amonarc" /><figcaption>Prototype Amonarc · Interface en développement</figcaption></figure>
      </section>
      <section className="invest-statement"><div className="section-shell" data-reveal><p className="eyebrow light">Notre conviction</p><h2>Le potentiel est dans les échanges.<br /><span>La différence se joue dans la confiance.</span></h2></div></section>
      <section className="section-shell invest-section" id="invest-thesis" data-reveal>
        <div className="section-heading"><div><p className="eyebrow">01 / Le point de départ</p><h2>Un parcours d’achat<br /><span>encore trop fragmenté.</span></h2></div><p>Découvrir une offre, échanger avec le vendeur et passer à l’achat impliquent souvent de changer d’outil. Notre projet part de cette friction.</p></div>
        <div className="invest-thesis-grid">{thesis.map(({Icon,title,text}) => <article key={title} className="thesis-card"><Icon aria-hidden /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="invest-vision section-shell invest-section" data-reveal>
        <div><p className="eyebrow">02 / La réponse Amonarc</p><h2>La communauté comme point de départ.<br /><span>Le commerce comme prolongement.</span></h2></div>
        <div className="vision-copy"><p>Nous développons une application qui rapproche découverte, relation et achat dans une expérience cohérente, pensée d’abord pour le mobile.</p><p>Notre différenciation se construit dans la qualité du parcours, l’adaptation aux usages locaux et la capacité à créer une relation durable entre vendeurs et acheteurs.</p><p className="private-note">Démonstration, stratégie produit et éléments de différenciation détaillés sont partagés lors d’un échange privé, dans un cadre de confidentialité adapté.</p></div>
      </section>
      <section className="invest-section invest-model"><div className="section-shell" data-reveal>
        <div className="section-heading"><div><p className="eyebrow">03 / Une entreprise à construire</p><h2>Créer de la valeur.<br /><span>Prouver sa viabilité.</span></h2></div><p>Le modèle économique sera validé avec les usages réels. Nous privilégions une progression fondée sur les preuves.</p></div>
        <div className="model-grid">{[
          ['La valeur pour les utilisateurs', 'Faciliter la découverte d’offres et la mise en relation, tout en donnant aux vendeurs un environnement adapté à leur activité.'],
          ['Les revenus envisagés', 'Étudier des revenus liés à l’activité commerciale et à des services à valeur ajoutée pour les professionnels. Tarification et adoption restent à tester.'],
          ['Les preuves attendues', 'Observer l’activation, le retour des utilisateurs, la conversion, les coûts d’acquisition et la qualité des échanges avant d’accélérer.'],
        ].map(([title,text],i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>
      <section className="section-shell invest-section" data-reveal>
        <div className="section-heading"><div><p className="eyebrow">04 / Où nous en sommes</p><h2>Une vision.<br /><span>Et un produit qui prend forme.</span></h2></div><p>Le prototype Flutter permet déjà d’explorer les parcours de l’application. Le lancement commercial reste à préparer.</p></div>
        <ol className="invest-roadmap">{[
          ['Aujourd’hui', 'Conception & prototype', 'Interface mobile et parcours en cours de développement ; itérations sur l’expérience utilisateur.'],
          ['Prochaine étape', 'Pilote & validation', 'Confronter le produit à des utilisateurs et à des vendeurs, mesurer les usages et ajuster les hypothèses.'],
          ['Puis', 'Lancement & consolidation', 'Renforcer la fiabilité, structurer les opérations et valider l’économie du service.'],
          ['À terme', 'Expansion progressive', 'Envisager de nouveaux marchés après validation du modèle et des conditions opérationnelles.'],
        ].map(([stage,title,text],i) => <li key={stage}><span className="roadmap-num">0{i+1}</span><p className="micro-label">{stage}</p><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>
      <section className="invest-team section-shell invest-section" data-reveal>
        <div><p className="eyebrow">05 / L’équipe</p><h2>Une culture technique.<br /><span>Une ambition entrepreneuriale.</span></h2></div>
        <div><h3>Jean Philippe Kokora</h3><p className="team-role">Fondateur & CEO · Doctorant en informatique</p><p>Le projet s’appuie sur l’expérience d’Amonarc en développement, design et communication. Cette complémentarité nourrit la construction du produit et de son expérience.</p><p>Nous recherchons des partenaires capables d’apporter du capital, mais aussi du recul stratégique, des connexions et une expérience du passage à l’échelle.</p></div>
      </section>
      <section className="invest-funding"><div className="section-shell funding-layout" data-reveal>
        <div><p className="eyebrow light">06 / Le prochain cap</p><h2>Financer les étapes<br /><span>qui font la différence.</span></h2><p>Nous souhaitons ouvrir des échanges avec des business angels, des fonds et des partenaires stratégiques alignés sur cette vision.</p><p className="funding-note">Montant recherché, structure du financement, budget et calendrier sont à préciser ensemble.</p></div>
        <ul>{['Consolider le produit et sa fiabilité', 'Conduire un pilote et mesurer la valeur créée', 'Préparer les opérations et l’acquisition initiale', 'Structurer l’équipe et la gouvernance'].map(x => <li key={x}><FiCheck aria-hidden />{x}</li>)}</ul>
      </div></section>
      <section className="section-shell investor-questions invest-section" data-reveal><div><p className="eyebrow">Avant notre rencontre</p><h2>Les bonnes questions.<br /><span>Un échange transparent.</span></h2></div><div className="faq-list">
        <details><summary>Quels éléments partagerons-nous ?</summary><p>Une présentation du projet, une démonstration du prototype et les hypothèses de développement. Les éléments sensibles sont discutés en privé ; les documents financiers seront partagés selon leur niveau de préparation.</p></details>
        <details><summary>Le projet est-il déjà commercialisé ?</summary><p>L’application est en développement. L’aperçu présenté est celui du prototype ; il ne constitue pas une annonce de lancement commercial.</p></details>
        <details><summary>Comment abordons-nous les risques ?</summary><p>L’adoption, l’exécution technique, les opérations, le financement et les conditions de chaque marché font partie des points à valider. Notre feuille de route prévoit des étapes de test avant l’expansion. Aucun rendement n’est garanti.</p></details>
      </div></section>
      <section className="contact-section" id="invest-contact"><div className="section-shell contact-layout"><div><p className="eyebrow">07 / Faisons connaissance</p><h2>Votre expérience.<br />Notre vision.<br /><span>Un premier échange.</span></h2><p>Présentez-nous votre intérêt pour Amonarc. Nous pourrons convenir d’une rencontre et du cadre de partage des informations.</p><a className="contact-phone" href="tel:+2250797704542">+225 07 97 70 45 42 <FiArrowUpRight aria-hidden /></a></div><ContactForm investor /></div></section>
    </main>
    <footer className="site-footer section-shell"><div className="footer-top"><Link className="brand" to="/"><img src={asset('media/amonarc-logo.png')} alt="Amonarc" width="186" height="47" /></Link><p>Voir nouveau. Voir loin.</p><Link to="/">Retour au site <FiArrowUpRight aria-hidden /></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Amonarc</span><span>Présentation du projet · Échanges investisseurs</span></div></footer>
  </div>;
}
