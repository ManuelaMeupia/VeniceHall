import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('accueil');
  
  // Références pour détecter les clics en dehors du menu
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          !hamburgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('no-scroll');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('no-scroll');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  // Fermer le menu quand on redimensionne l'écran (passage en desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Fermer le menu avec la touche Echap
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  // Détection du swipe pour fermer le menu sur mobile
  useEffect(() => {
    if (!isMenuOpen) return;

    let touchStart = null;
    let touchEnd = null;

    const handleTouchStart = (e) => {
      touchStart = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEnd = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50; // Swipe vers la gauche
      
      if (isLeftSwipe && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      touchStart = null;
      touchEnd = null;
    };

    const menuElement = menuRef.current;
    
    if (menuElement) {
      menuElement.addEventListener('touchstart', handleTouchStart);
      menuElement.addEventListener('touchmove', handleTouchMove);
      menuElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener('touchstart', handleTouchStart);
        menuElement.removeEventListener('touchmove', handleTouchMove);
        menuElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMenuOpen]);

  // Navigation vers les sections
  const scrollToSection = (sectionId) => {
    setActiveLink(sectionId);
    setIsMenuOpen(false); // Fermer le menu après clic
    
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

  // Fonction pour basculer le menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour fermer le menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => scrollToSection('accueil')} role="button" tabIndex={0}>
          <span className="logo-icon">🎉</span>
          <span className="logo-text">Venice Hall</span>
        </div>

        {/* Menu de navigation */}
        <ul 
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`} 
          ref={menuRef}
        >
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('accueil')}
              className={`nav-link ${activeLink === 'accueil' ? 'active' : ''}`}
            > <AiFillHome /> 
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
          
          {/* Bouton de fermeture explicite pour mobile */}
          <li className="nav-item mobile-only close-menu-item">
            <button 
              className="close-menu-btn"
              onClick={closeMenu}
              aria-label="Fermer le menu"
            >
              <i className="fas fa-times"></i>
              Fermer
            </button>
          </li>
          
          {/* Bouton de réservation pour mobile */}
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
          Réserver
        </button>

        {/* Hamburger menu pour mobile */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          ref={hamburgerRef}
          aria-label="Menu principal"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;