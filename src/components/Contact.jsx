import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [errors, setErrors] = useState({});

  const eventTypes = [
    'Mariage',
    'Anniversaire',
    'Séminaire d\'entreprise',
    'Conférence',
    'Cocktail',
    'Soirée privée',
    'Autre'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Veuillez sélectionner un type d\'événement';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.guests) {
      newErrors.guests = 'Le nombre d\'invités est requis';
    } else if (parseInt(formData.guests) < 1) {
      newErrors.guests = 'Le nombre d\'invités doit être au moins 1';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulation d'envoi du formulaire
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    });

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        guests: '',
        message: ''
      });
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 3000);

    // Ici, vous pouvez ajouter votre logique d'envoi vers un backend
    console.log('Données du formulaire:', formData);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        {/* En-tête de section */}
        <div className="contact-header">
          <span className="contact-badge">Parlons de votre projet</span>
          <h2 className="contact-title">
            Contactez-<span className="text-gradient">Nous</span>
          </h2>
          <p className="contact-subtitle">
            Prêt à organiser votre événement ? Remplissez le formulaire ci-dessous 
            et notre équipe vous répondra sous 24h.
          </p>
        </div>

        <div className="contact-content">
          {/* Partie gauche - Informations de contact */}
          <div className="contact-info">
            <div className="info-card">
              <h3 className="info-title">Informations de contact</h3>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-details">
                    <h4>Adresse</h4>
                    <p>Texaco Omnisport, Yaoundé</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="info-details">
                    <h4>Téléphone</h4>
                    <p>+237 6</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-details">
                    <h4>Email</h4>
                    <p>contact@venicehall.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-details">
                    <h4>Horaires</h4>
                    <p>Lun - Sam : 9h00 - 20h00</p>
                    <p>Dim : Sur rendez-vous</p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="contact-social">
                <h4>Suivez-nous</h4>
                <div className="social-links">
                  <a href="/" className="social-link" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="/" className="social-link" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="/" className="social-link" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="/" className="social-link" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="contact-map">
              <iframe
                title="Notre emplacement"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647891234567!5m2!1sfr!2sfr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Partie droite - Formulaire */}
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className={`form-status ${formStatus.success ? 'success' : 'error'}`}>
                <i className={`fas ${formStatus.success ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                <p>{formStatus.message}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Envoyez-nous un message</h3>

                {/* Nom et Email */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Nom complet <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Votre nom"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                {/* Téléphone */}
                <div className="form-group">
                  <label htmlFor="phone">
                    Téléphone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="+237..."
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                {/* Type d'événement et Date */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventType">
                      Type d'événement <span className="required">*</span>
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className={errors.eventType ? 'error' : ''}
                    >
                      <option value="">Sélectionnez</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.eventType && <span className="error-message">{errors.eventType}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="date">
                      Date souhaitée <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={errors.date ? 'error' : ''}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>
                </div>

                {/* Nombre d'invités */}
                <div className="form-group">
                  <label htmlFor="guests">
                    Nombre d'invités <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className={errors.guests ? 'error' : ''}
                    placeholder="Ex: 100"
                    min="1"
                  />
                  {errors.guests && <span className="error-message">{errors.guests}</span>}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Décrivez votre projet, vos besoins spécifiques..."
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                {/* Bouton d'envoi */}
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Envoyer le message
                </button>

                {/* Mention légale */}
                <p className="form-mention">
                  <i className="fas fa-lock"></i>
                  Vos données sont confidentielles et ne seront jamais partagées.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Section FAQ rapide */}
        <div className="contact-faq">
          <h3 className="faq-title">Questions fréquentes</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <i className="fas fa-clock"></i>
              <h4>Délai de réponse</h4>
              <p>Nous répondons à toutes les demandes sous 24h ouvrées</p>
            </div>
            <div className="faq-item">
              <i className="fas fa-calendar-check"></i>
              <h4>Réservation</h4>
              <p>Réservation possible jusqu'à 6 mois à l'avance</p>
            </div>
            <div className="faq-item">
              <i className="fas fa-money-bill"></i>
              <h4>Devis gratuit</h4>
              <p>Demandez un devis personnalisé sans engagement</p>
            </div>
            <div className="faq-item">
              <i className="fas fa-home"></i>
              <h4>Visite des lieux</h4>
              <p>Visite possible sur rendez-vous du lundi au samedi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;