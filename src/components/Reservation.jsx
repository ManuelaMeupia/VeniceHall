import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaGlassCheers, FaTimes, FaCheck } from 'react-icons/fa';
import ReservationPDF from './ReservationPDF';
import '../styles/Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeEvenement: '',
    dateDebut: '',
    dateFin: '',
    nombreInvites: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(null);

  // Types d'événements disponibles
  const typesEvenement = [
    'Mariage',
    'Anniversaire',
    'Séminaire d\'entreprise',
    'Conférence',
    'Cocktail',
    'Soirée privée',
    'Réunion de famille',
    'Autre'
  ];

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^[0-9+\s-]{8,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }

    if (!formData.typeEvenement) {
      newErrors.typeEvenement = 'Veuillez sélectionner un type d\'événement';
    }

    if (!formData.dateDebut) {
      newErrors.dateDebut = 'La date de début est requise';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(formData.dateDebut);
      if (startDate < today) {
        newErrors.dateDebut = 'La date ne peut pas être dans le passé';
      }
    }

    if (!formData.dateFin) {
      newErrors.dateFin = 'La date de fin est requise';
    } else if (formData.dateDebut && formData.dateFin) {
      const startDate = new Date(formData.dateDebut);
      const endDate = new Date(formData.dateFin);
      if (endDate <= startDate) {
        newErrors.dateFin = 'La date de fin doit être postérieure à la date de début';
      }
    }

    if (formData.nombreInvites && parseInt(formData.nombreInvites) <= 0) {
      newErrors.nombreInvites = 'Le nombre d\'invités doit être supérieur à 0';
    }

    return newErrors;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'envoi API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Réservation envoyée:', formData);
      setReservationComplete(formData);
      setShowSuccess(true);
      setIsSubmitting(false);
      
    } catch (error) {
      console.error('Erreur:', error);
      setIsSubmitting(false);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Annulation de la réservation
  const handleCancel = () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler la réservation ? Toutes les données seront perdues.')) {
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        typeEvenement: '',
        dateDebut: '',
        dateFin: '',
        nombreInvites: '',
        message: ''
      });
      setErrors({});
      navigate('/');
    }
  };

  // Nouvelle réservation
  const handleNewReservation = () => {
    setFormData({
      nom: '',
      email: '',
      telephone: '',
      typeEvenement: '',
      dateDebut: '',
      dateFin: '',
      nombreInvites: '',
      message: ''
    });
    setShowSuccess(false);
    setReservationComplete(null);
  };

  // Téléchargement terminé
  const handleDownloadComplete = () => {
    console.log('PDF téléchargé avec succès!');
  };

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        {/* En-tête */}
        <div className="reservation-header">
          <span className="reservation-badge">Réservez votre espace</span>
          <h1 className="reservation-title">
            Réserver une <span className="text-gradient">salle</span>
          </h1>
          <p className="reservation-subtitle">
            Remplissez le formulaire ci-dessous pour réserver l'une de nos salles.
            Après validation, vous pourrez télécharger votre confirmation en PDF.
          </p>
        </div>

        {/* Formulaire ou message de succès */}
        <div className="reservation-form-container">
          {showSuccess && reservationComplete ? (
            <div className="success-message">
              <div className="success-icon">
                <FaCheck />
              </div>
              <h2>Réservation envoyée !</h2>
              <p>Votre demande de réservation a bien été reçue.</p>
              
              {/* Composant PDF */}
              <div className="pdf-download-container">
                <ReservationPDF 
                  reservationData={reservationComplete} 
                  onDownloadComplete={handleDownloadComplete}
                />
              </div>
              
              <p className="info-text">
                Un email de confirmation vous sera également envoyé.
                Nous vous contacterons sous 24h pour valider votre réservation.
              </p>
              
              <button className="btn-new-reservation" onClick={handleNewReservation}>
                Faire une nouvelle réservation
              </button>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={handleSubmit}>
              {/* Nom */}
              <div className="form-group">
                <label htmlFor="nom">
                  <FaUser className="input-icon" />
                  Nom complet <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={errors.nom ? 'error' : ''}
                  placeholder="Ela Manu"
                />
                {errors.nom && <span className="error-message">{errors.nom}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="manuela237@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Téléphone */}
              <div className="form-group">
                <label htmlFor="telephone">
                  <FaPhone className="input-icon" />
                  Téléphone <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={errors.telephone ? 'error' : ''}
                  placeholder=""
                />
                {errors.telephone && <span className="error-message">{errors.telephone}</span>}
              </div>

              {/* Type d'événement */}
              <div className="form-group">
                <label htmlFor="typeEvenement">
                  <FaGlassCheers className="input-icon" />
                  Type d'événement <span className="required">*</span>
                </label>
                <select
                  id="typeEvenement"
                  name="typeEvenement"
                  value={formData.typeEvenement}
                  onChange={handleChange}
                  className={errors.typeEvenement ? 'error' : ''}
                >
                  <option value="">Sélectionnez un type d'événement</option>
                  {typesEvenement.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.typeEvenement && <span className="error-message">{errors.typeEvenement}</span>}
              </div>

              {/* Dates */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateDebut">
                    <FaCalendarAlt className="input-icon" />
                    Date de début <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    value={formData.dateDebut}
                    onChange={handleChange}
                    className={errors.dateDebut ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dateDebut && <span className="error-message">{errors.dateDebut}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="dateFin">
                    <FaCalendarAlt className="input-icon" />
                    Date de fin <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    value={formData.dateFin}
                    onChange={handleChange}
                    className={errors.dateFin ? 'error' : ''}
                    min={formData.dateDebut || new Date().toISOString().split('T')[0]}
                  />
                  {errors.dateFin && <span className="error-message">{errors.dateFin}</span>}
                </div>
              </div>

              {/* Nombre d'invités */}
              <div className="form-group">
                <label htmlFor="nombreInvites">
                  <FaUser className="input-icon" />
                  Nombre d'invités (estimatif)
                </label>
                <input
                  type="number"
                  id="nombreInvites"
                  name="nombreInvites"
                  value={formData.nombreInvites}
                  onChange={handleChange}
                  className={errors.nombreInvites ? 'error' : ''}
                  placeholder="Ex: 100"
                  min="1"
                />
                {errors.nombreInvites && <span className="error-message">{errors.nombreInvites}</span>}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message / Demandes spéciales</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Avez-vous des demandes particulières ? (traiteur, décoration, horaires spécifiques...)"
                ></textarea>
              </div>

              {/* Boutons */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  <FaTimes />
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Réserver
                    </>
                  )}
                </button>
              </div>

              {/* Mention légale */}
              <p className="form-mention">
                <i className="fas fa-lock"></i>
                Vos informations sont confidentielles et ne seront jamais partagées.
                Un email de confirmation vous sera envoyé après validation.
              </p>
            </form>
          )}
        </div>

        {/* Informations complémentaires */}
        <div className="reservation-info">
          <h3>Informations utiles</h3>
          <div className="info-grid">
            <div className="info-card">
              <i className="fas fa-clock"></i>
              <h4>Horaires</h4>
              <p>Lundi - Samedi: 9h - 20h</p>
              <p>Dimanche: Sur rendez-vous</p>
            </div>
            <div className="info-card">
              <i className="fas fa-euro-sign"></i>
              <h4>Paiement</h4>
              <p>Arrhes de 30% à la réservation</p>
              <p>Solde 7 jours avant l'événement</p>
            </div>
            <div className="info-card">
              <i className="fas fa-shield-alt"></i>
              <h4>Annulation</h4>
              <p>Gratuite jusqu'à 30 jours avant</p>
              <p>50% de frais entre 30 et 15 jours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;