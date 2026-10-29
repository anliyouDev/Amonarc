import { lazy, Suspense, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiMenu,
  FiX,
  FiPlay,
  FiCode,
  FiPenTool,
  FiCamera,
  FiLayers,
  FiBookOpen,
  FiMessageCircle,
  FiCheck,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
const Investisseur = lazy(() => import("./investisseur"));
import ContactForm from "./ContactForm";
import useReveal from "./useReveal";
import "./App.css";

const services = [
  {
    name: "Développement",
    short: "Des outils qui font avancer votre activité.",
    description:
      "Sites web, applications mobiles et logiciels métiers : nous concevons des solutions adaptées à vos usages, à vos équipes et à vos clients.",
    items: [
      "Sites vitrines & e-commerce",
      "Applications web & mobiles",
      "API & systèmes de gestion",
      "Digitalisation & automatisation",
    ],
    tools: "Web · Mobile · Solutions métiers",
    icon: FiCode,
  },
  {
    name: "Design",
    short: "Une identité qui vous ressemble.",
    description:
      "De votre identité visuelle à l’expérience de vos utilisateurs, nous donnons une forme claire et cohérente à votre marque.",
    items: [
      "Identité visuelle & charte graphique",
      "Design d’interfaces UI/UX",
      "Prototypage",
      "Direction artistique & supports",
    ],
    tools: "Identité · Expérience · Création",
    icon: FiPenTool,
  },
  {
    name: "Multimédia",
    short: "Des images qui racontent votre histoire.",
    description:
      "Nous créons les contenus photo, vidéo et animés qui présentent votre activité et donnent vie à vos messages.",
    items: [
      "Photographie professionnelle",
      "Vidéographie",
      "Motion design",
      "Couverture d’événements",
    ],
    tools: "Photo · Vidéo · Animation",
    icon: FiCamera,
  },
  {
    name: "Pilotage de projet",
    short: "Une direction claire, à chaque étape.",
    description:
      "Nous vous accompagnons dans le cadrage et la coordination de vos projets numériques, avec une organisation adaptée à vos objectifs.",
    items: [
      "Cadrage du besoin",
      "Coordination des intervenants",
      "Méthodes agiles",
      "Gestion et suivi de projet",
    ],
    tools: "Cadrage · Coordination · Suivi",
    icon: FiLayers,
  },
  {
    name: "Formation",
    short: "Transmettre pour vous rendre autonome.",
    description:
      "Entreprises, équipes et particuliers : développez vos compétences grâce à un accompagnement et un transfert de savoir-faire.",
    items: [
      "Formation & accompagnement",
      "Transfert de compétences",
      "Alternance",
      "Stages",
    ],
    tools: "Apprendre · Pratiquer · Progresser",
    icon: FiBookOpen,
  },
  {
    name: "Marketing & communication",
    short: "Le bon message. Au bon endroit.",
    description:
      "Nous vous aidons à construire votre stratégie et votre image, avec des actions de communication adaptées à votre public, en ligne et hors ligne.",
    items: [
      "Études & diagnostic",
      "Stratégie de communication",
      "Contenus & supports de campagne",
      "Accompagnement de l’image",
    ],
    tools: "Stratégie · Image · Visibilité",
    icon: FiMessageCircle,
  },
];
const milestones = [
  [
    "2019",
    "Les premiers pas",
    "Incubation chez Kufanya et construction du projet.",
  ],
  [
    "2020",
    "Une étape structurante",
    "Obtention du label Startup Act en Tunisie.",
  ],
  [
    "2021",
    "Un environnement technologique",
    "Intégration du pôle technologique de Manouba.",
  ],
  [
    "2024",
    "Un ancrage à Abidjan",
    "Intégration du centre d’affaires KEY Abidjan.",
  ],
  [
    "2025",
    "Industrie & transformation",
    "Contribution à des travaux sur la transformation numérique de l’industrie en Côte d’Ivoire.",
  ],
];
const references = [
  {
    name: "MT Business Group",
    image: "mt-business-group",
    type: "Communication & création",
    ext: "webp",
  },
  { name: "DORANCO", image: "doranco", type: "Formation", ext: "webp" },
  {
    name: "Cloud Campus",
    image: "cloud-campus",
    type: "Formation",
    ext: "webp",
  },
  {
    name: "Next Formation",
    image: "next-formation",
    type: "Formation",
    ext: "webp",
  },
  { name: "La Poste", image: "la-poste", type: "Formation", ext: "webp" },
];
const faqs = [
  [
    "Travaillez-vous avec les entreprises et les particuliers ?",
    "Oui. Nous accompagnons les entreprises, entrepreneurs, institutions, associations et particuliers. Le périmètre de notre intervention se construit à partir de votre besoin.",
  ],
  [
    "Comment démarrer un projet avec Amonarc ?",
    "Présentez-nous votre objectif via le formulaire de contact ou par téléphone. Nous échangeons sur le besoin, les livrables et les contraintes avant de définir ensemble le périmètre et la proposition.",
  ],
  [
    "Amonak et Amonarc sont-ils la même entreprise ?",
    "Amonarc est le nouveau nom d’Amonak. Cette évolution de notre identité accompagne notre ambition dans les services informatiques, la création et la communication.",
  ],
  [
    "Quelle place occupe l’application e-commerce ?",
    "L’application sociale e-commerce est un produit développé par Amonarc. Elle possède son propre univers, distinct de l’offre de services présentée sur ce site. Son prototype est en développement.",
  ],
];
const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}${path}`;

function Home() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  useReveal();
  const video = useRef<HTMLVideoElement>(null);
  const current = services[active];
  const Icon = current.icon;

  function go(id: string) {
    setMenu(false);
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
  }
  async function play() {
    go("presentation");
    video.current?.focus({ preventScroll: true });
    try {
      await video.current?.play();
    } catch {
      setVideoError(true);
    }
  }

  return (
    <div className="corporate">
      <a
        className="skip-link"
        href="#contenu"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("contenu")?.focus();
          go("contenu");
        }}
      >
        Aller au contenu
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Link to="/" aria-label="Amonarc, accueil" className="brand">
            <img
              src={asset("media/amonarc-logo.png")}
              alt="Amonarc"
              width="186"
              height="47"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Navigation principale">
            {[
              ["expertises", "Expertises"],
              ["realisations", "Réalisations"],
              ["histoire", "Notre histoire"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>
                {label}
              </button>
            ))}
            <button onClick={() => go("application")}>L’application</button>
            <Link to="/investisseurs" className="nav-invest">Investisseurs ↗</Link>
          </nav>
          <button className="nav-contact" onClick={() => go("contact")}>
            Parlons de votre projet <FiArrowUpRight aria-hidden />
          </button>
          <button
            className="menu-toggle"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navigation mobile"
          >
            {[
              ["expertises", "Expertises"],
              ["realisations", "Réalisations"],
              ["histoire", "Notre histoire"],
              ["application", "L’application"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>
                {label}
                <FiArrowUpRight aria-hidden />
              </button>
            ))}
            <Link to="/investisseurs" className="mobile-invest">Investir dans Amonarc <FiArrowUpRight aria-hidden /></Link>
          </nav>
        )}
      </header>

      <main id="contenu" tabIndex={-1}>
        <section className="hero section-shell">
          <div className="hero-orb" aria-hidden />
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Technologie. Création. Impact.
            </p>
            <h1>
              Vos ambitions.
              <br />
              Notre expertise.
              <br />
              <span>Donnons-leur vie.</span>
            </h1>
            <p className="hero-description">
              Votre partenaire en services informatiques et communication. Nous
              accompagnons les entreprises et les particuliers, de l’idée à sa
              réalisation.
            </p>
            <div className="button-row">
              <button className="button primary" onClick={() => go("contact")}>
                Construisons votre projet <FiArrowUpRight aria-hidden />
              </button>
              <button className="text-button" onClick={() => go("expertises")}>
                Explorer nos expertises <FiArrowRight aria-hidden />
              </button>
            </div>
            <div className="hero-meta">
              <span>B2B & B2C</span>
              <i aria-hidden /> Une ambition africaine. Une ouverture
              internationale.
            </div>
          </div>
          <div className="hero-media" id="presentation">
            <div className="media-topline">
              <span>AMONARC EN MOUVEMENT</span>
              <span>00:35</span>
            </div>
            <div className="video-wrap">
              <video
                ref={video}
                controls
                playsInline
                preload="none"
                poster={asset("media/video-poster.webp")}
                aria-label="Présentation Amonarc : développement, design, multimédia, pilotage, formation et communication"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onError={() => setVideoError(true)}
              >
                <source
                  src={asset("media/amonarc-presentation.mp4")}
                  type="video/mp4"
                />
                Votre navigateur ne prend pas en charge cette vidéo.
              </video>
              {!playing && !videoError && (
                <button
                  className="video-play"
                  onClick={play}
                  aria-label="Lire la présentation Amonarc"
                >
                  <FiPlay aria-hidden />
                </button>
              )}
            </div>
            <div className="video-caption">
              <span>Une idée. Et après ?</span>
              <button onClick={play}>
                Découvrez Amonarc <FiArrowUpRight aria-hidden />
              </button>
            </div>
            {videoError && (
              <p className="video-fallback" role="status">
                La lecture n’a pas démarré. Utilisez les commandes du lecteur ou{" "}
                <a href={asset("media/amonarc-presentation.mp4")}>
                  ouvrez la vidéo
                </a>
                .
              </p>
            )}
            <div className="media-note">
              <span className="note-symbol" aria-hidden>
                ↗
              </span>
              <p>
                Des compétences qui se complètent.
                <br />
                <strong>Des solutions qui prennent forme.</strong>
              </p>
            </div>
          </div>
        </section>

        <section
          className="references section-shell"
          aria-labelledby="references-title"
        >
          <div className="reference-heading">
            <h2 id="references-title">
              Des collaborations.
              <br />
              <span>De la confiance.</span>
            </h2>
            <p>
              Une sélection de nos références
              <br />
              en communication et en formation.
            </p>
          </div>
          <div className="logo-grid">
            {references.map((ref) => (
              <figure key={ref.name}>
                <div className="client-logo">
                  <img
                    src={asset(`clients/${ref.image}.${ref.ext}`)}
                    alt={ref.name}
                    loading="lazy"
                  />
                </div>
                <figcaption>{ref.type}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="expertise-section" id="expertises">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / Nos expertises</p>
                <h2>
                  Le bon savoir-faire.
                  <br />
                  <span>Pour votre prochain pas.</span>
                </h2>
              </div>
              <p>
                Un besoin précis ou un projet complet :<br />
                mobilisons les compétences adaptées.
              </p>
            </div>
            <div className="expertise-layout">
              <div
                className="expertise-tabs"
                role="tablist"
                aria-label="Domaines d’expertise"
                aria-orientation="vertical"
              >
                {services.map((service, i) => {
                  const ItemIcon = service.icon;
                  return (
                    <button
                      id={`service-tab-${i}`}
                      key={service.name}
                      role="tab"
                      aria-selected={active === i}
                      aria-controls="service-panel"
                      tabIndex={active === i ? 0 : -1}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => {
                        let next = i;
                        if (e.key === "ArrowDown" || e.key === "ArrowRight")
                          next = (i + 1) % services.length;
                        else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                          next = (i - 1 + services.length) % services.length;
                        else if (e.key === "Home") next = 0;
                        else if (e.key === "End") next = services.length - 1;
                        else return;
                        e.preventDefault();
                        setActive(next);
                        document.getElementById(`service-tab-${next}`)?.focus();
                      }}
                    >
                      <span className="service-num">0{i + 1}</span>
                      <ItemIcon aria-hidden />
                      <span>{service.name}</span>
                      <FiArrowUpRight aria-hidden className="tab-arrow" />
                    </button>
                  );
                })}
              </div>
              <div
                className="service-panel"
                role="tabpanel"
                id="service-panel"
                aria-labelledby={`service-tab-${active}`}
                tabIndex={0}
              >
                <div className="service-illustration" aria-hidden>
                  <div className="illustration-orbit orbit-one" />
                  <div className="illustration-orbit orbit-two" />
                  <div className="illustration-icon">
                    <Icon />
                  </div>
                  <span className="illustration-dot dot-one" />
                  <span className="illustration-dot dot-two" />
                </div>
                <div className="service-detail" key={active}>
                  <p className="micro-label">{current.tools}</p>
                  <h3>{current.short}</h3>
                  <p>{current.description}</p>
                  <ul>
                    {current.items.map((item) => (
                      <li key={item}>
                        <FiCheck aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="text-button"
                    onClick={() => {
                      const select = document.getElementById(
                        "service",
                      ) as HTMLSelectElement | null;
                      if (select) select.value = current.name;
                      go("contact");
                    }}
                  >
                    Parlons de votre besoin <FiArrowUpRight aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects section-shell" id="realisations">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Nos réalisations</p>
              <h2>
                Des idées devenues
                <br />
                <span>des réalisations.</span>
              </h2>
            </div>
            <p>Des compétences complémentaires, réunies autour de votre projet.</p>
          </div>
          <div className="project-grid">
            {[
              [
                "mt-business-group",
                "MT Business Group",
                "Communication & création",
                "Une collaboration en communication et création, présentée parmi nos références.",
              ],
            ].map(([image, name, category, description], i) => (
              <article className={`project-card project-${i}`} key={name}>
                <div className="project-image">
                  <img
                    src={asset(`clients/${image}.webp`)}
                    alt={`Logo de ${name}`}
                    loading="lazy"
                    width="540"
                    height="770"
                  />
                  <span className="project-index">0{i + 1}</span>
                </div>
                <div className="project-info">
                  <p className="micro-label">{category}</p>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="source-note">
Une sélection publique. Certains projets restent confidentiels.
          </p>
        </section>

        <section className="approach-section">
          <div className="section-shell approach-layout">
            <div>
              <p className="eyebrow light">03 / Travailler ensemble</p>
              <h2>
                La confiance se construit.
                <br />
                <span>Étape par étape.</span>
              </h2>
              <p className="approach-intro">
                Un échange clair, des compétences complémentaires et un
                périmètre défini ensemble pour faire avancer votre projet.
              </p>
            </div>
            <ol className="process-list">
              {[
                [
                  "Comprendre",
                  "Votre contexte, vos usages et les objectifs qui comptent pour vous.",
                ],
                [
                  "Concevoir",
                  "Une réponse adaptée, un périmètre clair et des livrables identifiés.",
                ],
                [
                  "Réaliser",
                  "Développement, création et coordination des compétences du projet.",
                ],
                [
                  "Transmettre",
                  "Prise en main et transfert de compétences selon votre besoin.",
                ],
              ].map(([name, desc], i) => (
                <li key={name}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{desc}</p>
                  </div>
                  <FiArrowUpRight aria-hidden />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="history section-shell" id="histoire">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / Notre histoire</p>
              <h2>
                Une nouvelle identité.
                <br />
                <span>Une ambition qui continue.</span>
              </h2>
            </div>
          </div>
          <div className="history-intro">
            <div className="rebrand">
              <img
                src={asset("media/amonak-logo.png")}
                alt="Ancien logo Amonak"
                width="190"
                height="60"
                loading="lazy"
              />
              <span>
                devient <FiArrowRight aria-hidden />
              </span>
              <img
                src={asset("media/amonarc-logo.png")}
                alt="Nouveau logo Amonarc"
                width="240"
                height="60"
                loading="lazy"
              />
            </div>
            <div>
              <h3>Amonak devient Amonarc.</h3>
              <p>
                Notre parcours s’est construit entre technologie, création et
                entrepreneuriat. Amonarc porte aujourd’hui cette ambition :
                mettre l’innovation numérique au service du développement de
                l’Afrique et créer des solutions capables de rayonner à
                l’international.
              </p>
            </div>
          </div>
          <div className="timeline">
            {milestones.map(([year, title, desc]) => (
              <article key={year}>
                <span className="timeline-year">{year}</span>
                <div className="timeline-point" aria-hidden />
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
          <div className="founder-note">
            <span>Une équipe pluridisciplinaire</span>
            <p>
              Des profils techniques, créatifs, entrepreneuriaux et
              scientifiques réunis autour de vos projets.
            </p>
            <span>
              Jean Philippe Kokora
              <br />
              <strong>Fondateur & CEO · Doctorant en informatique</strong>
            </span>
          </div>
        </section>

        <section className="app-section section-shell" id="application">
          <div className="app-banner">
            <div>
              <p className="eyebrow">Aussi, un produit Amonarc</p>
              <h2>
                Le commerce.
                <br />
                <span>À la force des communautés.</span>
              </h2>
              <p>
                Notre application sociale e-commerce est un autre volet de
                l’aventure Amonarc. Un projet conçu pour rapprocher les
                vendeurs, les acheteurs et leurs communautés.
              </p>
              <div className="app-status">
                <span className="status-dot" /> Prototype en développement
              </div>
              <button
                className="text-button"
                onClick={() => {
                  const select = document.getElementById(
                    "service",
                  ) as HTMLSelectElement | null;
                  if (select) select.value = "Application e-commerce";
                  go("contact");
                }}
              >
                En savoir plus sur l’application <FiArrowUpRight aria-hidden />
              </button>
            </div>
            <figure className="phone-stage">
              <span className="phone-orbit" aria-hidden />
              <img
                src={asset("media/application-feed.webp")}
                width="780"
                height="1688"
                alt="Fil d’actualité du prototype Flutter Amonarc, avec une publication et sa navigation"
                loading="lazy"
              />
              <figcaption>Fil d’actualité · Prototype Flutter · Interface susceptible d’évoluer</figcaption>
            </figure>
          </div>
        </section>

        <section className="invest-teaser section-shell" data-reveal>
          <div className="invest-teaser-inner">
            <div><p className="eyebrow light">Investisseurs & partenaires</p><h2>Le prochain chapitre du commerce africain.<br /><span>Écrivons-le ensemble.</span></h2><p>Nous développons Amonarc, une nouvelle expérience de commerce portée par les communautés. Nous recherchons des partenaires pour transformer cette vision en une entreprise durable.</p></div>
            <Link to="/investisseurs" className="button investor-cta">Découvrir l’opportunité <FiArrowUpRight aria-hidden /></Link>
          </div>
        </section>

        <section className="faq-section section-shell">
          <div>
            <p className="eyebrow">Quelques réponses</p>
            <h2>
              Avant de
              <br />
              <span>se lancer.</span>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <FiPlus className="faq-plus" aria-hidden />
                  <FiMinus className="faq-minus" aria-hidden />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell contact-layout">
            <div>
              <p className="eyebrow">05 / Et maintenant ?</p>
              <h2>
                Une idée ?<br />
                <span>Parlons-en.</span>
              </h2>
              <p>
                Vous représentez une organisation ou vous portez un projet
                personnel ? Donnez-nous le point de départ.
              </p>
              <a className="contact-phone" href="tel:+2250797704542">
                +225 07 97 70 45 42 <FiArrowUpRight aria-hidden />
              </a>
              <a className="second-phone" href="tel:+2250712450586">
                +225 07 12 45 05 86
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <div className="footer-top">
          <Link to="/" className="brand">
            <img
              src={asset("media/amonarc-logo.png")}
              alt="Amonarc"
              width="186"
              height="47"
            />
          </Link>
          <p>Voir nouveau. Voir loin.</p>
          <a
            href="https://www.facebook.com/amonarc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook <FiArrowUpRight aria-hidden />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Amonarc · Anciennement Amonak
          </span>
          <span>Services informatiques · Création · Communication</span>
          <Link to="/investisseurs">
            Espace investisseurs <FiArrowUpRight aria-hidden />
          </Link>
        </div>
      </footer>
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/investisseurs"
        element={
          <div className="investor-page">
            <Suspense fallback={<p className="route-loading" role="status">Ouverture de l’espace investisseurs…</p>}><Investisseur /></Suspense>
          </div>
        }
      />
      <Route
        path="*"
        element={
          <div className="corporate not-found">
            <h1>Cette page n’existe pas.</h1>
            <Link className="button primary" to="/">
              Retour à l’accueil <FiArrowRight />
            </Link>
          </div>
        }
      />
    </Routes>
  );
}
