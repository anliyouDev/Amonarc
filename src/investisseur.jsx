import { useState } from 'react'
import { LiaSignInAltSolid } from "react-icons/lia"
import { FaFacebook } from "react-icons/fa";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { IoLogoApple } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { HiCalendarDateRange } from "react-icons/hi2";
import { MdHomeRepairService } from "react-icons/md";
import './investisseur.css'
import { Routes, Route, Link } from "react-router-dom"
// import './App.css'
function Investisseur() {
  return (
    <>

      <header class="headers">
        <div className="imageLogos desktop tablet">
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
        <nav class="Menus desktop tablet">
          <a href="#">Services aux entreprises</a>
          <a href="#">Vendre sur Amonak</a>
          <a href="#">&Agrave; propos</a>
          <Link to="/investisseurs">Investisseurs</Link>
          <a href="#">Stages</a>

        </nav>
             <nav class="MenuMobile">
          <a href="#">Entreprises</a>
          <a href="#">Vendeurs</a>
          <a href="#">&Agrave; propos</a>
          <Link to="/investisseurs">Investisseurs</Link>
          <a href="#">Stages</a>
        </nav>
        <div className="logins desktop tablet">
          <a href="#"><LiaSignInAltSolid size={27} /> Se connecter</a>
        </div>

      </header>


      <section className="investir">
        <div className="les-liens">
          <nav>
            <a href="#">Investisseurs</a>
            <div className="liens-droite">
              <a href="#">Business angel (BA)</a>
              <a href="#">Venture Capitalists</a>
              <a href="#">Private Equity</a>
              <a href="#">Investisseurs Corporate</a>
            </div>
          </nav>
        </div>
      </section>

      <section className="Investirs">
        <div class="Amonak">
          <h1>Investir dans Amonak</h1>
          <p>Amonak élabore une nouvelle génération de plateforme de commerce en ligne,
            dans laquelle la relation est privilégiée avant la transaction et où la communauté est un facteur propulseur de croissance.
            Nous répondons à une problématique pressante : rétablir la confiance entre client et vendeur dans un contexte numérique saturé.
            Placer des fonds dans Amonak,
            c'est contribuer à la mise en place d'un écosystème novateur avec un grand potentiel de croissance économique et de développement durable.
          </p>
        </div>
      </section>


      <section className="colonne">
        <div className="colonne-un">

          <div className="carte-investir">
            <div className="carte-investir-gauche">
              <div>
                <h3>Une innovation utile</h3>
                <p>pas une simple plateforme</p>
              </div>
              <a href="#">Voir plus →</a>
            </div>
            <div className="carte-investir-droite">
              {/* <img src="src/assets/Images/Photo/pexels-darlene-alderson-7971695.jpg" alt="fond"/> */}
              <img src="src\assets\Images\Photo\Gemini_Generated_Image_9r78st9r78st9r78.png" alt="fond degrade" />
              <div className='coverss'>
                <ul>
                  <li>Fusion d'un réseau social et d'un système e-commerce automatisé.</li>
                  <li>Chaque profil fonctionne comme un site e-commerce sans coût de création.</li>
                  <li>Vente par vidéo pour apporter transparence et preuve visuelle.</li>
                  <li>Système intégré de paiement et de livraison garantis.</li>
                  <li>Automatisation du processus de vente auparavant géré en messages privés.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carte-investir">
            <div className="carte-investir-gauche">
              <div>
                <h3>Un problème urgent et réel</h3>
                <p>qui freine l'expansion de l'e-commerce en Afrique</p>
              </div>
              <a href="#">Voir plus →</a>
            </div>
            <div className="carte-investir-droite">
              {/* <img src="src/assets/Images/Photo/pexels-tima-miroshnichenko-6266310.jpg" alt="fond"/> */}
              <img src="src\assets\Images\Photo\Gemini_Generated_Image_9r78st9r78st9r78.png" alt="fond degrade" />

              <div className="coverss">
                <ul>
                  <li>Fraude à l'image qui détruit la confiance dans l'e-commerce.</li>
                  <li>Impossibilité pour beaucoup de vendre à l'international.</li>
                  <li>Temps perdu à gérer manuellement des centaines de conversations.</li>
                  <li>Coût élevé de création d'un site e-commerce professionnel.</li>
                  <li>Manque d'infrastructures adaptées aux jeunes entrepreneurs digitaux.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carte-investir">
            <div className="carte-investir-gauche">
              <div>
                <h3>Un impact social mesurable</h3>
                <p>Et devenir pionnier d'une révolution qui changera l'e-commerce</p>
              </div>
              <a href="#">Voir plus →</a>
            </div>
            <div className="carte-investir-droite">
              {/* <img src="src/assets/Images/Photo/pexels-picha-stock-2210122-3894379.jpg" alt="fond"/> */}
              <img src="src\assets\Images\Photo\Gemini_Generated_Image_9r78st9r78st9r78.png" alt="fond degrade" />

              <div className="coverss">
                <ul>
                  <li>Être pionnier du premier réseau social e-commerce.</li>
                  <li>Positionnement précoce dans une phase structurante du projet.</li>
                  <li>Réponse directe à un problème urgent qui freine l'e-commerce africain.</li>
                  <li>Positionnement sur une jeunesse majoritaire et ambitieuse.</li>
                  <li>Infrastructure prête à capter la croissance du digital africain.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carte-investir">
            <div className="carte-investir-gauche">
              <div>
                <h3>Pourquoi investir maintenant ?</h3>
                <p>Et devenir pionnier d'une révolution qui changera l'e-commerce</p>
              </div>
              <a href="#">Voir plus →</a>
            </div>
            <div className="carte-investir-droite">
              {/* <img src="src/assets/Images/Photo/pexels-jakubzerdzicki-30332440.jpg" alt="fond"/> */}
              <img src="src\assets\Images\Photo\Gemini_Generated_Image_9r78st9r78st9r78.png" alt="fond degrade" />

              <div className="coverss">
                <ul>
                  <li>Être pionnier du premier réseau social e-commerce africain.</li>
                  <li>Positionnement précoce dans une phase structurante du projet.</li>
                  <li>Réponse directe à un problème urgent qui freine l'e-commerce africain.</li>
                  <li>Positionnement sur une jeunesse majoritaire et ambitieuse.</li>
                  <li>Infrastructure prête à capter la croissance du digital africain.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carte-investir">
            <div className="carte-investir-gauche">
              <div>
                <h3>Notre ambition</h3>
                <p>Pour l'avenir de la tech et une nouvelle génération d'entrepreneurs digitaux</p>
              </div>
              <a href="#">Voir plus →</a>
            </div>
            <div className="carte-investir-droite">
              {/* <img src="src/assets/Images/Photo/pexels-rdne-10376029.jpg" alt="fond"/> */}
              <img src="src\assets\Images\Photo\Gemini_Generated_Image_9r78st9r78st9r78.png" alt="fond degrade" />

              <div className="coverss">
                <ul>
                  <li>Devenir le réseau social de référence dédié à l'e-commerce en Afrique.</li>
                  <li>Exporter le savoir-faire africain vers 255 pays.</li>
                  <li>Créer un standard de confiance dans le commerce digital.</li>
                  <li>Donner à chaque jeune entrepreneur un outil professionnel, gratuit et sécurisé.</li>
                  <li>Construire une plateforme simple, fiable et inclusive à grande échelle.</li>
                </ul>
              </div>
            </div>
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

export default Investisseur