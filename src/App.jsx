// import { useState } from 'react'
import { LiaSignInAltSolid } from "react-icons/lia"
import { FaFacebook } from "react-icons/fa";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { IoLogoApple } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { HiCalendarDateRange } from "react-icons/hi2";
import { MdHomeRepairService } from "react-icons/md";
import { TbBrandWhatsapp } from "react-icons/tb";
import { Routes, Route, Link } from "react-router-dom"
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillOpenAI } from "react-icons/ai";

import Investisseur from "./investisseur"
// import tete from './src\navbar.jsx'
import './App.css'

function Home() {
  return (
    <>
      <header class="header">
        <div class="imageLogo desktop tablet">
          <Link to="/"><img src="src/assets/Images/logo/logoAmonakTexteSansFond.png" alt="Logo Amonak" width={150} /></Link>
        </div>

        <div className="enteteMobile">
          <div class="imageLogo">
            <Link to="/"><img src="src/assets/Images/logo/logoAmonakTexteSansFond.png" alt="Logo Amonak" width={150} /></Link>
          </div>
          <div className="login">
            <a href="#"><LiaSignInAltSolid size={25} /> Se connecter</a>
          </div>
        </div>

        <nav class="Menu">
          <a href="#services">Services aux entreprises</a>
          <a href="#vendeurs">Vendre sur Amonak</a>
          <a href="#apropos">&Agrave; propos</a>
          <Link to="/investisseurs">Investisseurs</Link>
          <a href="https://www.ytsuccesslab.com/" target="_black">Stages</a>
        </nav>

        <nav class="MenuMobile">
          <a href="#">Entreprises</a>
          <a href="#">Vendeurs</a>
          <a href="#">&Agrave; propos</a>
          <Link to="/investisseurs">Investisseurs</Link>
          <a href="#">Stages</a>
        </nav>

        <div className="login desktop tablet">
          <a href="#"><LiaSignInAltSolid size={27} /> Se connecter</a>
        </div>

      </header>
        {/* <En-tete/> */}
      <section className="sections-un">
        <div className="reseaux-sociaux desktop tablet">
          <a href="https://www.facebook.com/Seenew.seefar" target='_blank'>  <FaFacebook size={30} /></a>
          <a href="https://www.linkedin.com/company/amonak/posts/?feedView=all" target='_blank'><TbBrandLinkedinFilled size={30} /></a>
          <a href="#"><AiFillTikTok size={30} /></a>


        </div>
        <div className="Deviens-scoial">
          <h1>Vendre,</h1>
          <h1 class="devient-social ">devient social</h1>
          <p >Amonak est <b>le premier réseau social e-commerce</b> qui réunit vendeurs, créateurs et acheteurs dans un espace simple, social et ouvert à tous. Ici,<b> chaque produit raconte une histoire, chaque partage crée une opportunité</b>. Vendre, acheter, grandir.
            <b>Tout commence par une connexion</b>.</p>
          <div className="commencer">
            <a href="#"> <LiaSignInAltSolid size={27} />Commencer maintenant </a>
          </div>
        </div>
        <div class="mention mobile mt-3"><i>Restez informé</i></div>
        <div className="reseaux-sociaux mobile ">
          <a href="https://www.facebook.com/Seenew.seefar" target='_blank'>  <FaFacebook size={30} /></a>
          <a href="https://www.linkedin.com/company/amonak/posts/?feedView=all" target='_blank'><TbBrandLinkedinFilled size={30} /></a>
          <a href="#"><AiFillTikTok size={30} /></a>
        </div>

        <div className="phone">
          <img src="src\assets\Images\Telephone\c5.png" alt="telephone" width={250} />
        </div>

      </section>


      <section className="ligness desktop tablet">

        <div class="carte">
          <div class="carte-texte">
            <h3>Vendre par vidéo</h3>
            <p>Sur Amonak, la vente se fait exclusivement par vidéo pour créer plus de confiance entre vendeurs et acheteurs.</p>
          </div>
          <img src="src\assets\Images\Telephone\c1.png" alt="image_1" width={80} />
        </div>

        <div class="carte">
          <div class="carte-texte">
            <h3>Vendeurs vérifiés</h3>
            <p>le vendeur et sa boutique sont examinés avant tout droit de mettre des articles en ventes.</p>
          </div>
          <img src="src\assets\Images\Telephone\c2.png" alt="image_2" width={80} />
        </div>

        <div className="carte">
          <div class="carte-texte">
            <h3>Paiement facile via mobile money</h3>
            <p>Chaque article peut être acheté rapidement via tous les opérateurs de service mobile money.</p>
          </div>
          <img src="src\assets\Images\Telephone\c7.png" alt="image_3" width={80} />
        </div>

        <div className="carte">
          <div class="carte-texte">
            <h3>Sécurité garantie</h3>
            <p>Le vendeur récupère l’argent de votre paiement uniquement après livraison.</p>
          </div>
          <img src="src\assets\Images\Telephone\cc.png" alt="image_4" width={80} />
        </div>

        <div className="carte">
          <div class="carte-texte">
            <h3>Créer et entretenir sa communauté</h3>
            <p>Stories, publications, messagerie et bien d’autre opportunités de créer de l’impact.</p>

          </div>
          <img src="src\assets\Images\Telephone\c6.png" alt="image_5" width={80} />
        </div>

      </section>

      <section class="section-application">
        <div class="application">
          <img src="src\assets\Images\Photo\Gemini_Generated_Image_9r78st9r78st9r78.png" alt="fond-arriere" className='fond-arriere' />
          <div className="conteneur">
            <h2>Notre application bientôt disponible et gratuite </h2>
            <p>Réalisons ensemble votre plus grand rêve, devenir votre propre patron.</p>
            <div className="app-buttons">
              <a href="#" className='app-btn'>
                <IoLogoApple size={30} />
                <div>
                  <span>Download on the </span>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className='app-btn'>
                <img src="src\assets\Images\logo\Google-Play-Logo-No-Background.png" alt="google play" width={20} />
                <div>
                  <span>GET IN ON</span>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </div>

      </section>

      <section className="services padding-zero" id="services">
        <div className="container ">
          <div className='gauche'>
            <div className='containers'>
              <h3>
                Nos   Services aux entreprises
              </h3>
              <p>Forte de son expérience, et fidèle à sa mission, notre équipe accompagne
                chaque client jusqu’à la satisfaction de ses objectifs professionnels.
                Nous accompagnons chaque client dans la conception,
                le développement et l’optimisation de solutions numériques adaptée à chaque besoin.</p>
            </div>

            <div className="rdv">

              <a href="#"><HiCalendarDateRange />Prendre un rendez-vous</a>
            </div>
          </div>

          <div class="Options">
            <img src="src\assets\Images\Photo\ChatGPT Image 21 févr. 2026, 21_17_30.png" alt="image des personnes assisents au tour d'une table" />


            <div className="Plateforme-marketing">
              <img src="src\assets\Images\Photo\pexels-shoper-pl-550490863-16675632.jpg" alt="ordinateur" width={100} />
              <div className="carte-info">
                <h5>Plateforme & application  </h5>
                <p>Conception et développement de plateformes web sur mesure : sites vitrines, plateformes SaaS, marketplaces, portails clients et solutions métiers.</p>
              </div>
            </div>
            <div className="mobile-multimeida">
              <img src="src\assets\Images\Photo\pexels-tdcat-54284.jpg" alt="Telephone" width={100} />
              <div className="carte-info">
                <h5>Application mobile</h5>
                <p>Création d’applications mobiles performantes (Android & iOS) pour digitaliser vos services, améliorer l’engagement utilisateur et optimiser vos opérations.</p>
              </div>
            </div>
            <div className="Plateforme-marketing">
              <img src="src\assets\Images\Photo\pexels-negativespace-110078.jpg" alt="ordinateur" width={100} />
              <div className="carte-info">
                <h5>Marketing & com digital</h5>
                <p>Stratégies digitales et campagnes ciblées : branding, charte graphique, gestion des réseaux sociaux, publicité en ligne, email marketing et positionnement de marque.</p>
              </div>
            </div>
            <div className="mobile-multimeida">
              <img src="src\assets\Images\Photo\pexels-george-zografidis-1705219-10181269.jpg" alt="appareil-photo" width={100} />
              <div className="carte-info">
                <h5>Multimédia</h5>
                <p>Production de contenus visuels professionnels : photographie, vidéo, motion design, identité visuelle et supports digitaux.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="vendre-amonak" id="vendeurs">
        <div>
          <div className="les-h">
            <h3>Pourquoi</h3>
            <h3>vendre sur Amonak</h3>
          </div>
          <div className='general desktop tablet'>
            <div>
              <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Chaque compte créé est l’équivalent d’un site e-commerce</h4>
              <p className='le-texte'>Plus besoin de discuter avec chaque client avant de vendre.
                Les paiements se font directement via mobile money ou carte bancaire.
                Après livraison, transférer le gain de vos ventes se fait à la minute
                vers le compte de votre choix.</p>
            </div>
            <div>
              <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Modèle hybride : social + e-commerce</h4>
              <p>Créer des relations fortes, et bâtir une communauté solide autour sa boutique, afin de vendre davantage via la visibilité sociale.</p>
            </div>
            <div>
              <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Devenir une référence incontournable</h4>
              <p>En rejoignant maintenant Amonarc, vous faites partie des pionniers et vous devenez une référence pour tous les futures utilisateurs. </p>
            </div>
            <div>
              <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Votre marque devient plus puissante et plus visible</h4>
              <p>En vendant sur Amonarc, c’est votre boutique qui est mise en avant. La notoriété et la gloire vous revient.
                Contrairement aux marketplace, Votre marque n’est pas mise en second plan, mais devient un pilier centrale.</p>
            </div>
            <div>
              <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Regagner la confiance du client</h4>
              <p>Le profil et la boutique de chaque vendeur sont maintenant vérifiés par Amonarc.  Ainsi plus aucun client ne peut craindre de se faire arnaquer.</p>
            </div>
          </div>
        </div>

        {/* LISTE SUR MOBILE */}
        <div class="scroll-container mobile">
          <div class="scroll-item">
            
              <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Chaque compte créé est l’équivalent d’un site e-commerce</h4>
              <p className='le-texte'>Plus besoin de discuter avec chaque client avant de vendre.
                Les paiements se font directement via mobile money ou carte bancaire.
                Après livraison, transférer le gain de vos ventes se fait à la minute
                vers le compte de votre choix.</p>
            
          </div>
          <div class="scroll-item">
            <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Modèle hybride : social + e-commerce</h4>
              <p>Créer des relations fortes, et bâtir une communauté solide autour sa boutique, afin de vendre davantage via la visibilité sociale.</p>
          </div>
          <div class="scroll-item">
            <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Devenir une référence incontournable</h4>
              <p>En rejoignant maintenant Amonarc, vous faites partie des pionniers et vous devenez une référence pour tous les futures utilisateurs. </p>
          </div>
          <div class="scroll-item">
            <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Votre marque devient plus puissante et plus visible</h4>
              <p>En vendant sur Amonarc, c’est votre boutique qui est mise en avant. La notoriété et la gloire vous revient.
                Contrairement aux marketplace, Votre marque n’est pas mise en second plan, mais devient un pilier centrale.</p>
          </div>
          <div class="scroll-item">
            <div className="Iconess">
                <MdHomeRepairService />
              </div>
              <h4>Regagner la confiance du client</h4>
              <p>Le profil et la boutique de chaque vendeur sont maintenant vérifiés par Amonarc.  Ainsi plus aucun client ne peut craindre de se faire arnaquer.</p>
          </div>
        </div>
      </section>

      <section className="propos" id="apropos">

        <div className="propos-header">
          <h2>À Propos</h2>
          <p className="propos-subtitle">L'entreprise qui réinvente l'e-commerce et le service aux entreprises</p>
        </div>


        <div className="propos-body">


          <div className="propos-texte carte-propos">
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </div>


          <div className="propos-droite">


            <div className="carte-propos">
              <h3 className="carte-titre">Société</h3>
              <p className="label">Raison social</p>
              <p className="valeur">Amonarc</p>
              <div className="deux-colonnes">
                <div>
                  <p className="label">Forme juridique</p>
                  <p className="valeur">SARL</p>
                </div>
                <div>
                  <p className="label">Adresse</p>
                  <p className="valeur">15 Avenue Bictogo</p>
                </div>
              </div>
            </div>


            <div className="carte-propos fondateur">
              <div className="fondateur-info">
                <p className="label-upper">FONDATEUR & CEO</p>
                <p className="valeur">Jean Philippe KOKORA</p>
                <p className="formation"><i>Informaticien chercheur</i></p>
                <div className="reseaux-fondateur">
                  <a href="https://www.facebook.com/jeanphilippe.kokora" target="_blank"> <FaFacebook size={20} /></a>
                  <a href="https://www.linkedin.com/in/jean-philippe-kokora/" target="_blank"><TbBrandLinkedinFilled size={20} /></a>
                  <a href="https://www.tiktok.com/@jeanphilippekokora" target="_blank"> <AiFillTikTok size={20} /></a>
                  <a href="https://wa.me/21656058706" target="_blank"><IoLogoWhatsapp size={20} /> </a>

                </div>
              </div>
              <img src="src\assets\Images\Photo\P1137182-Avec accentuation-Bruit.jpg" alt="Fondateur" className="photo-fondateur" />
            </div>

          </div>
        </div>
      </section>
      
      <section className="chatgpt">
        <h1>Pourquoi choisir <br /><span>Amonarc</span></h1>
          <div class="row">
            <div className="commencer">
            
            <a href="https://chat.openai.com/?q=Pourquoi%20choisir%20Amonak%20en%20tant%20que%20%3A%20entreprise%2C%20vendeur%20en%20ligne%2C%20acheteur%20en%20ligne%2C%20investisseurs%20%3F" target="_blank">  <AiFillOpenAI size={27} /> Demander à ChatGPT</a>
          </div>
          </div>
      </section>

      <section className="footers">

        <footer>
          <p>Nous devenons ce à quoi nous pensons.</p>
          <div className="footers-icons">
            <a href="https://www.facebook.com/Seenew.seefar"><FaFacebook size={20} /></a>
            <a href="https://www.linkedin.com/company/amonak/posts/?feedView=all"><TbBrandLinkedinFilled size={20} /></a>
            <a href="#"><AiFillTikTok size={20} /></a>

          </div>
          <p>Amonak &copy; 2026</p>
        </footer>


      </section>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/investisseurs" element={<Investisseur />} />
    </Routes>
  )
}
export default App
