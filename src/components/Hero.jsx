import React, { useState } from 'react';
import PrivateVisitModal from './PrivateVisitModal';
import '../styles/Hero.css';

const Hero = ({ scrollToSection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section id="accueil" className="hero">
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <span className="hero-badge">
            Salle de prestige
          </span>
          
          <h1 className="hero-title">
            VENICE HALL Salle de fête chic et haut de gamme
          </h1>
          
          <p className="hero-subtitle">
            Découvrez Venice Hall, l'écrin idéal pour vos célébrations d'exception. 
            Situé au cœur de Yaoundé, nos espaces allient raffinement et modernité. Offrez à vos événements un cadre d’exception à Yaoundé pour vos : Mariages  Anniversaires  Événements privés  Corporate.
          </p>
          
          <div className="hero-features-premium">
            <div className="feature-premium">
              <i className="fas fa-gem" style={{color:"#ffffff"}}></i>
              <span>Prestige</span>
            </div>
            <div className="feature-premium">
              <i className="fas fa-champagne-glasses" style={{color:"#ffffff"}}></i>
              <span>Service d'exception</span>
            </div>
            <div className="feature-premium">
              <i className="fas fa-crown" style={{color:"#ffffff"}}></i>
              <span>Standing unique</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection('salles')}>
              Découvrir nos espaces
              <i className="fas fa-arrow-right"></i>
            </button>

            <button className="btn-outline-premium" onClick={openModal}>
              Demander une visite privée
            </button>
          </div>
        </div>
      </section>

      {/* Modal de demande de visite privée */}
      <PrivateVisitModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Hero;