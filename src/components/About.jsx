import React from 'react';
import '../styles/About.css';

const About = () => {
 const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  return (
    <section id="a-propos" className="about">
      <div className="about-container">
        {/* En-tête de section */}
        <div className="about-header">
          <span className="about-badge">Qui sommes-nous ?</span>
          <h2 className="about-title">À Propos de <span className="text-gradient">Venice Hall</span></h2>
          
          <div className="about-subtitle-container">
            <p className="about-subtitle">
              Venice Hall est une salle de réception moderne et élégante, pensée pour accueillir vos événements les plus prestigieux.
              Après un rebranding complet, nous offrons aujourd'hui un espace :
            </p>
            
            <div className="about-features-list">
              <div className="feature-point">
                <i className="fas fa-check-circle"></i>
                <span>Raffiné</span>
              </div>
              {/* <div className="feature-point">
                <i className="fas fa-check-circle"></i>
                <span>Modulable</span>
              </div> */}
              <div className="feature-point">
                <i className="fas fa-check-circle"></i>
                <span>Adapté aux exigences haut de gamme</span>
              </div>
            </div>
            
            <div className="about-mission">
              {/* <i className="fas fa-star"></i> */}
              <p>Notre mission : faire de chaque événement une expérience unique</p>
              {/* <i className="fas fa-star"></i> */}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="about-content">
          <div className="about-image-container">
            <div className="about-image-main">
              <img 
                src="/img/image20.jpeg" 
                alt="Notre équipe" 
                className="about-image"
              />
            </div>
            
            {/* Miniatures d'images */}
            {/* <div className="about-image-thumbnails">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Événement 1" />
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Événement 2" />
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Événement 3" />
              </div> */}
          </div>

          {/* Partie droite - Texte et valeurs */}
          <div className="about-text-container">
            <h3 className="about-text-title">
              Votre partenaire de confiance pour l'organisation d'événements
            </h3>
            
            <p className="about-text-description">
              Venice Hall est né d'une passion : créer des moments magiques. 
              Notre mission est de vous offrir des espaces uniques, adaptés à 
              chaque type d'événement, avec un service personnalisé et une 
              attention aux moindres détails.
            </p>

            <p className="about-text-description">
              Que ce soit pour un mariage de rêve, un anniversaire mémorable 
              ou un séminaire professionnel, nous mettons notre expertise à 
              votre service pour faire de votre événement une réussite.
            </p>

            {/* Valeurs de l'entreprise */}
            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="value-content">
                  <h4>Passion</h4>
                  <p>Nous aimons ce que nous faisons et cela se ressent dans chaque détail</p>
                </div>
              </div>

              <div className="value-item">
                <div className="value-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="value-content">
                  <h4>Excellence</h4>
                  <p>Nous visons l'excellence dans tout ce que nous entreprenons</p>
                </div>
              </div>

              <div className="value-item">
                <div className="value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="value-content">
                  <h4>Confiance</h4>
                  <p>La relation de confiance est au cœur de notre philosophie</p>
                </div>
              </div>
            </div>

            {/* Bouton de contact */}
            <button className="about-contact-btn" onClick={scrollToContact}>
              <i className="fas fa-envelope"></i>
              Contactez notre équipe
            </button>
          </div>
        </div>

        {/* Section Prestations */}
        <section id='offres'>
              <div className="about-prestations">
          <h3 className="section-title-purple">NOS OFFRES</h3>
          <div className="prestations-grid">
            <div className="prestation-card">
              <i className="fas fa-ring"></i>
              <h4>Mariages</h4>
              <p>Un cadre chic pour célébrer le plus beau jour de votre vie</p>
            </div>
            <div className="prestation-card">
              <i className="fas fa-birthday-cake"></i>
              <h4>Anniversaires & événements privés</h4>
              <p>Ambiance élégante et personnalisée</p>
            </div>
            <div className="prestation-card">
              <i className="fas fa-briefcase"></i>
              <h4>Séminaires & événements professionnels</h4>
              <p>Un espace adapté pour vos rencontres corporate</p>
            </div>
          </div>
        </div>

        {/* Section Salle */}
        <div className="about-salle">
          <h3 className="section-title-purple"> LA SALLE</h3>
          <div className="salle-features">
            <div className="salle-feature">
              <i className="fas fa-users"></i>
              <div>
                <strong>Capacité :</strong> 350 et 600 places 
              </div>
            </div>
            <div className="salle-feature">
              <i className="fas fa-wind"></i>
              <div>
                <strong>Espace climatisé</strong>
              </div>
            </div>
            <div className="salle-feature">
              <i className="fas fa-parking"></i>
              <div>
                <strong>Parking disponible</strong>
              </div>
            </div>
            <div className="salle-feature">
              <i className="fas fa-palette"></i>
              <div>
                <strong>Décoration moderne</strong>
              </div>
            </div>
            <div className="salle-feature">
              <i className="fas fa-music"></i>
              <div>
                <strong>Sonorisation et buffet inclus</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Section Galerie
        <div className="about-galerie">
          <h3 className="section-title-purple"> GALERIE</h3>
          <div className="galerie-grid">
            <img src="/img/img1.jpg" alt="Salle 1" />
            <img src="/img/img2.jpg" alt="Salle 2" />
            <img src="/img/img3.jpg" alt="Salle 3" />
            <img src="/img/img4.jpg" alt="Salle 4" />
          </div>
        </div> */}

        {/* Section Formules */}
        <div className="about-formules">
          <h3 className="section-title-purple"> NOS FORMULES</h3>
          <div className="formules-grid">
            <div className="formule-card confort">
              <div className="formule-icon">💎💎</div>
              <h4>Formule VIP / Corporate</h4>
              <p>Salle + décoration de base</p>
              <p>Expérience élégante et intimiste</p>
              <p>Accompagnement personnalisé</p>
            </div>
            <div className="formule-card premium">
              <div className="formule-icon">💎💎💎</div>
              <h4>Formule Premium</h4>
              <p>Salle + décoration + accompagnement événementiel</p>
              <p>Expérience grandiose haut de gamme</p>
              <p>Organisation sur-mesure</p>
            </div>
          </div>
          <p className="tarif-note"> Tarifs sur demande</p>
          <button className="btn-demande-devis" onClick={scrollToContact}>
            Demander un devis
          </button>
        </div>
        </section>
        
      </div>
    </section>
  );
};

export default About;