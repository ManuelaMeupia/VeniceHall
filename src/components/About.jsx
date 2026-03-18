import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="a-propos" className="about">
      <div className="about-container">
        {/* En-tête de section */}
        <div className="about-header">
          <span className="about-badge">Qui sommes-nous ?</span>
          <h2 className="about-title">À Propos de <span className="text-gradient">Venice Hall</span></h2>
          <p className="about-subtitle">
            Nous créons des espaces uniques pour des moments inoubliables.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="about-content">
          {/* Partie gauche - Image avec statistiques */}
          <div className="about-image-container">
            <div className="about-image-main">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Notre équipe" 
                className="about-image"
              />
              {/* <div className="about-image-overlay">
                <div className="about-image-stats">
                  <div className="image-stat">
                    <span className="image-stat-number">10+</span>
                    <span className="image-stat-label">Années d'expertise</span>
                  </div>
                  <div className="image-stat">
                    <span className="image-stat-number">500+</span>
                    <span className="image-stat-label">Événements réussis</span>
                  </div>
                </div>
              </div> */}
            </div>
            
            {/* Miniatures d'images */}
            <div className="about-image-thumbnails">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Événement 1" />
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Événement 2" />
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Événement 3" />
            </div>
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

            {/* Statistiques supplémentaires */}
            {/* <div className="about-stats-grid">
              <div className="about-stat-card">
                <i className="fas fa-building stat-card-icon"></i>
                <span className="stat-card-number">50+</span>
                <span className="stat-card-label">Salles de prestige</span>
              </div>
              <div className="about-stat-card">
                <i className="fas fa-users stat-card-icon"></i>
                <span className="stat-card-number">20+</span>
                <span className="stat-card-label">Experts à votre service</span>
              </div>
              <div className="about-stat-card">
                <i className="fas fa-map-marker-alt stat-card-icon"></i>
                <span className="stat-card-number">5</span>
                <span className="stat-card-label">Villes couvertes</span>
              </div>
              <div className="about-stat-card">
                <i className="fas fa-smile stat-card-icon"></i>
                <span className="stat-card-number">100%</span>
                <span className="stat-card-label">Satisfaction client</span>
              </div>
            </div> */}

            {/* Bouton de contact */}
            <button className="about-contact-btn">
              <i className="fas fa-envelope"></i>
              Contactez notre équipe
            </button>
          </div>
        </div>

        {/* Section Équipe */}
        <div className="about-team">
          <h3 className="team-title">Notre Équipe</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/img/Logo.jpeg" alt="Jean Dupont" />
              </div>
              <h4>Personnel 1</h4>
              <p>Fondateur & Directeur</p>
              {/* <div className="member-social">
                <a href="/"><i className="fab fa-linkedin-in"></i></a>
                <a href="/"><i className="fab fa-twitter"></i></a>
              </div> */}
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/img/Logo.jpeg" alt="Marie Martin" />
              </div>
              <h4>Personnel 2</h4>
              <p>Directrice des Événements</p>
              {/* <div className="member-social">
                <a href="/"><i className="fab fa-linkedin-in"></i></a>
                <a href="/"><i className="fab fa-twitter"></i></a>
              </div> */}
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/img/Logo.jpeg" alt="Pierre Durand" />
              </div>
              <h4>Personnel 3</h4>
              <p>Responsable Commercial</p>
              {/* <div className="member-social">
                <a href="/"><i className="fab fa-linkedin-in"></i></a>
                <a href="/"><i className="fab fa-twitter"></i></a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;