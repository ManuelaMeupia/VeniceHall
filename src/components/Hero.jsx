import React from 'react';
import '../styles/Hero.css';

const Hero = ({ scrollToSection }) => {
  return (
    // <section id="accueil" className="hero">
    //   <div className="hero-overlay"></div>
      
    //   <div className="hero-content">
    //     {/* Badge de bienvenue */}
    //     <span className="hero-badge">
    //       <i className="fas fa-sparkles"></i>
    //       Bienvenue chez Venice Hall
    //     </span>

    //     {/* Titre principal */}
    //     <h1 className="hero-title">
    //       Créez des souvenirs 
    //       <span className="text-gradient"> inoubliables</span>
    //     </h1>

    //     {/* Sous-titre */}
    //     <p className="hero-subtitle">
    //       Découvrez nos salles d'exception pour vos mariages, anniversaires, 
    //       séminaires et tous vos événements spéciaux.
    //     </p>

    //     {/* Boutons d'action */}
    //     <div className="hero-buttons">
    //       <button 
    //         className="btn btn-primary"
    //         onClick={() => scrollToSection('salles')}
    //       >
    //         <i className="fas fa-calendar-check"></i>
    //         Voir nos salles
    //       </button>
    //       <button 
    //         className="btn btn-secondary"
    //         onClick={() => scrollToSection('contact')}
    //       >
    //         <i className="fas fa-phone-alt"></i>
    //         Nous contacter
    //       </button>
    //     </div>

    //     {/* Statistiques */}
    //     {/* <div className="hero-stats">
    //       <div className="stat-item">
    //         <span className="stat-number">50+</span>
    //         <span className="stat-label">Salles disponibles</span>
    //       </div>
    //       <div className="stat-item">
    //         <span className="stat-number">1000+</span>
    //         <span className="stat-label">Clients satisfaits</span>
    //       </div>
    //       <div className="stat-item">
    //         <span className="stat-number">10+</span>
    //         <span className="stat-label">Ans d'expérience</span>
    //       </div>
    //     </div> */}

    //     {/* Avis clients */}
    //     {/* <div className="hero-reviews">
    //       <div className="review-stars">
    //         <i className="fas fa-star"></i>
    //         <i className="fas fa-star"></i>
    //         <i className="fas fa-star"></i>
    //         <i className="fas fa-star"></i>
    //         <i className="fas fa-star"></i>
    //         <span className="review-rating">4.9</span>
    //       </div>
    //       <span className="review-text">Basé sur 500+ avis vérifiés</span>
    //     </div> */}

    //     {/* Features rapides */}
    //     <div className="hero-features">
    //       <div className="feature-tag">
    //         <i className="fas fa-shield-alt"></i>
    //         Paiement sécurisé
    //       </div>
    //       <div className="feature-tag">
    //         <i className="fas fa-clock"></i>
    //         Annulation gratuite
    //       </div>
    //       <div className="feature-tag">
    //         <i className="fas fa-headset"></i>
    //         Support 24/7
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section id="accueil" className="hero">
  <div className="hero-overlay"></div>
  
  <div className="hero-content">
    <span className="hero-badge">
      <i className="fas fa-crown"></i>
      Salle de prestige
    </span>
    
    <h1 className="hero-title">
      VENICE HALL Salle de fête chic et haut de gamme
      {/* <span className="text-gradient"> vos plus beaux événements</span> */}
    </h1>
    
    <p className="hero-subtitle">
      Découvrez Venice Hall, l'écrin idéal pour vos célébrations d'exception. 
      Situé au cœur de Yaoundé, nos espaces allient raffinement et modernité. Offrez à vos événements un cadre d’exception à Yaoundé pour vos : Mariages  Anniversaires  Événements privés  Corporate.
    </p>
    
    <div className="hero-features-premium">
      <div className="feature-premium">
        <i className="fas fa-gem"></i>
        <span>Prestige</span>
      </div>
      <div className="feature-premium">
        <i className="fas fa-champagne-glasses"></i>
        <span>Service d'exception</span>
      </div>
      <div className="feature-premium">
        <i className="fas fa-crown"></i>
        <span>Standing unique</span>
      </div>
    </div>
    
    <div className="hero-buttons">
      <button className="btn-primary" onClick={() => scrollToSection('salles')}>
        Découvrir nos espaces
        <i className="fas fa-arrow-right"></i>
      </button>
      <button className="btn-outline-premium" onClick={() => scrollToSection('contact')}>
        Demander un devis
      </button>
    </div>
  </div>
</section>
  );
};

export default Hero;