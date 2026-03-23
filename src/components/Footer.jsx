import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      {/* Wave decoration */}
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-container">
          {/* Section 1 - À propos */}
          <div className="footer-section">
            <div className="footer-logo" onClick={() => scrollToSection('accueil')}>
              <span className="logo-icon"><img src="/img/Logo.jpeg" alt="Venice Hall" className="logo-image" /></span>
              <span className="logo-text">VENICE HALL</span>
            </div>
            <p className="footer-description">
              Votre partenaire de confiance pour l'organisation d'événements 
              mémorables. Des salles magnifiques pour des moments inoubliables.
            </p>
            
            {/* Social Media Links */}
            <div className="social-links">
              <a href="https://www.facebook.com/share/1JzxV1fNWh/" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/venicehallc?igsh=MW1pNmZ6ZjRnNHg3dg==" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/" className="social-link" aria-label="Tiktok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="/" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              {/* <a href="/" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a> */}
            </div>
          </div>

          {/* Section 2 - Liens rapides */}
          <div className="footer-section">
            <h3 className="footer-title">Liens rapides</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection('accueil')}>
                  <i className="fas fa-chevron-right"></i>
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('salles')}>
                  <i className="fas fa-chevron-right"></i>
                  Nos salles
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('a-propos')}>
                  <i className="fas fa-chevron-right"></i>
                  À propos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')}>
                  <i className="fas fa-chevron-right"></i>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Section 3 - Contact */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt" style={{color:"#5c2abd"}}></i>
                <div className="contact-detail">
                  <span className="contact-label">Adresse</span>
                  <span>Yaoundé, Texaco Omnisport</span>
                </div>
              </li>
              <li>
                <i className="fas fa-phone-alt"  style={{color:"#5c2abd"}}></i>
                <div className="contact-detail">
                  <span className="contact-label">Téléphone</span>
                  <span>+237 6</span>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope"  style={{color:"#5c2abd"}}></i>
                <div className="contact-detail">
                  <span className="contact-label">Email</span>
                  <span>contact@venicehall.com</span>
                </div>
              </li>
              <li>
                <i className="fas fa-clock" style={{color:"#5c2abd"}}></i>
                <div className="contact-detail">
                  <span className="contact-label">Horaires</span>
                  <span>Lun-Ven: 8h - 17h</span>
                  <span>Sam: 8h - 14h</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 4 - Newsletter */}
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="newsletter-text">
              Inscrivez-vous pour recevoir nos offres spéciales et actualités
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  required
                />
                <button type="submit" aria-label="S'inscrire">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>

            {/* <div className="payment-methods">
              <span className="payment-title">Paiement sécurisé</span>
              <div className="payment-icons">
                <i className="fab fa-cc-visa" title="Visa"></i>
                <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                <i className="fab fa-cc-paypal" title="PayPal"></i>
                <i className="fab fa-cc-amex" title="American Express"></i>
              </div>
            </div> */}
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="footer-divider"></div>

        {/* Bottom footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="copyright">
              &copy; {currentYear} Venice Hall. Tous droits réservés.
            </p>
            <div className="footer-bottom-links">
              <a href="/" className="bottom-link">
                <i className="fas fa-shield-alt"></i>
                Mentions légales
              </a>
              <a href="/" className="bottom-link">
                <i className="fas fa-lock"></i>
                Politique de confidentialité
              </a>
              {/* <a href="/" className="bottom-link">
                <i className="fas fa-file-contract"></i>
                CGV
              </a> */}
              <a href="/" className="bottom-link">
                <i className="fas fa-cookie-bite"></i>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;