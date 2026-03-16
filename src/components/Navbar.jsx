import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('accueil');

  // Détection du scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour le défilement en douceur vers les sections
  const scrollToSection = (sectionId) => {
    setActiveLink(sectionId);
    setIsMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Hauteur de la navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Fermer le menu mobile quand on redimensionne l'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => scrollToSection('accueil')}>
          <span className="logo-icon">🎉</span>
          <span className="logo-text">VENICE</span>
        </div>

        {/* Menu de navigation */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('accueil')}
              className={`nav-link ${activeLink === 'accueil' ? 'active' : ''}`}
            >
              Accueil
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('salles')}
              className={`nav-link ${activeLink === 'salles' ? 'active' : ''}`}
            >
              Nos Salles
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('a-propos')}
              className={`nav-link ${activeLink === 'a-propos' ? 'active' : ''}`}
            >
              À Propos
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('contact')}
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
            >
              Contact
            </button>
          </li>
          <li className="nav-item mobile-only">
            <button 
              className="nav-btn-reservation mobile"
              onClick={() => scrollToSection('salles')}
            >
              Réserver maintenant
            </button>
          </li>
        </ul>

        {/* Bouton de réservation pour desktop */}
        <button 
          className="nav-btn-reservation desktop"
          onClick={() => scrollToSection('salles')}
        >
          Réserver maintenant
        </button>

        {/* Hamburger menu pour mobile */}
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;