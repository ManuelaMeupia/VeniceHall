import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

// Import des icônes React
import { 
  AiFillHome, 
  AiOutlineSearch,
} from "react-icons/ai";
import { 
  FaImages, 
  FaInfoCircle,
  FaGift,
  FaStar,
  FaCalendarAlt,
  // FaBell,
  // FaUserCircle 
} from "react-icons/fa";
import { 
  IoMdMail, 
  IoMdMenu, 
  IoMdClose 
} from "react-icons/io";
import { 
  MdEvent 
} from 'react-icons/md';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('accueil');
  const [showSearch, setShowSearch] = useState(false);
  const [pendingScroll, setPendingScroll] = useState(null);
  
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const searchRef = useRef(null);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gérer le scroll après la navigation depuis la page de réservation
  useEffect(() => {
    if (pendingScroll && location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          const offset = 80;
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
        setPendingScroll(null);
      }, 200);
    }
  }, [location.pathname, pendingScroll]);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          !hamburgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      
      if (showSearch && 
          searchRef.current && 
          !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, showSearch]);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Navigation vers les sections
  const scrollToSection = (sectionId) => {
    setActiveLink(sectionId);
    setIsMenuOpen(false);
    
    // Si on n'est pas sur la page d'accueil, on y va d'abord
    if (location.pathname !== '/') {
      setPendingScroll(sectionId);
      navigate('/');
    } else {
      // Si on est sur l'accueil, on scroll directement
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Navigation vers la page de réservation
  const goToReservation = () => {
    navigate('/reservation');
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => scrollToSection('accueil')}>
          <div className="logo-wrapper">
            <span className="logo-icon">
              <img src="/img/Logo.jpeg" alt="Venice Hall" className="logo-image" />
            </span>
            <div className="logo-text-wrapper">
              <span className="logo-text-primary">Venice Hall</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className={`search-wrapper ${showSearch ? 'active' : ''}`} ref={searchRef}>
          <input 
            type="text" 
            placeholder="Rechercher une salle..."
            className="search-input"
          />
          <button className="search-btn">
            <AiOutlineSearch />
          </button>
        </div>

        {/* Menu de navigation */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          {/* Accueil */}
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('accueil')}
              className={`nav-link ${activeLink === 'accueil' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <AiFillHome />
              </span>
              <span className="nav-text">Accueil</span>
              {activeLink === 'accueil' && <span className="nav-dot"></span>}
            </button>
          </li>

          {/* Nos espaces/Nos Salles */}
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('salles')}
              className={`nav-link ${activeLink === 'salles' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <FaImages />
              </span>
              <span className="nav-text">Salles</span>
              {activeLink === 'salles' && <span className="nav-dot"></span>}
            </button>
          </li>

          {/* Nos offres */}
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('offres')}
              className={`nav-link ${activeLink === 'offres' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <FaGift />
              </span>
              <span className="nav-text">Offres</span>
              {activeLink === 'offres' && <span className="nav-dot"></span>}
            </button>
          </li>

          {/* Événements */}
          {/* <li className="nav-item">
            <button
              onClick={() => scrollToSection('evenements')}
              className={`nav-link ${activeLink === 'evenements' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <FaCalendarAlt />
              </span>
              <span className="nav-text">Événements</span>
              {activeLink === 'evenements' && <span className="nav-dot"></span>}
            </button>
          </li> */}
          
          {/* À propos */}
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('a-propos')}
              className={`nav-link ${activeLink === 'a-propos' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <FaInfoCircle />
              </span>
              <span className="nav-text">À Propos</span>
              {activeLink === 'a-propos' && <span className="nav-dot"></span>}
            </button>
          </li>

          {/* Témoignages */}
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('temoignages')}
              className={`nav-link ${activeLink === 'temoignages' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <FaStar />
              </span>
              <span className="nav-text">Témoignages</span>
              {activeLink === 'temoignages' && <span className="nav-dot"></span>}
            </button>
          </li>

          {/* Contact */}
          <li className="nav-item">
            <button
              onClick={() => scrollToSection('contact')}
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <IoMdMail />
              </span>
              <span className="nav-text">Contact</span>
              {activeLink === 'contact' && <span className="nav-dot"></span>}
            </button>
          </li>

          {/* Éléments visibles UNIQUEMENT sur mobile */}
          <li className="nav-item mobile-only reservation-item">
            <button 
              className="nav-reservation-btn"
              onClick={goToReservation}
            >
              <MdEvent className="btn-icon" />
              <span>Réserver maintenant</span>
            </button>
          </li>

          <li className="nav-item mobile-only close-item">
            <button 
              className="close-menu-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoMdClose className="close-icon" />
              <span>Fermer</span>
            </button>
          </li>
        </ul>

        {/* Actions à droite (visibles UNIQUEMENT sur desktop) */}
        <div className="nav-actions desktop-only">
          <button 
            className="reservation-btn"
            onClick={goToReservation}
          >
            <MdEvent className="btn-icon" />
            <span>Réserver</span>
          </button>
        </div>

        {/* Hamburger menu (visible UNIQUEMENT sur mobile) */}
        <button 
          className="hamburger mobile-only"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          ref={hamburgerRef}
        >
          <IoMdMenu className="hamburger-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;