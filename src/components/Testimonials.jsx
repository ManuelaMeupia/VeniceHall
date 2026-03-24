import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaUser, FaQuoteLeft, FaTrash, FaCheck, FaTimes, FaEnvelope, FaCalendar } from 'react-icons/fa';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  // Charger les avis depuis le localStorage au chargement
  useEffect(() => {
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      // Avis par défaut
      const defaultTestimonials = [
        //{
        //   id: 1,
        //   name: 'Marie',
        //   email: 'marie@email.com',
        //   rating: 5,
        //   comment: 'Une salle magnifique ! Tout était parfait pour notre mariage. Le service est irréprochable, je recommande vivement Venice Hall.',
        //   date: '2024-02-15',
        //   verified: true
        // },
        // {
        //   id: 2,
        //   name: 'Manu',
        //   email: 'manu@email.com',
        //   rating: 5,
        //   comment: 'Organisation parfaite pour notre anniversaire. La salle est superbe et l\'équipe très professionnelle.',
        //   date: '2024-01-20',
        //   verified: true
        // },
        // {
        //   id: 3,
        //   name: 'Meups',
        //   email: 'meups@email.com',
        //   rating: 4,
        //   comment: 'Très belle salle, ambiance chaleureuse. Petit bémol sur la sono mais le reste était parfait.',
        //   date: '2024-02-01',
        //   verified: true
        // }
      ];
      setTestimonials(defaultTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
    }
  }, []);

  // Sauvegarder les avis dans localStorage
  const saveTestimonials = (newTestimonials) => {
    localStorage.setItem('testimonials', JSON.stringify(newTestimonials));
    setTestimonials(newTestimonials);
  };

  // Gestion du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion de la note
  const handleRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.comment.trim()) {
      setSubmitStatus({
        show: true,
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires.'
      });
      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 3000);
      return;
    }

    setIsSubmitting(true);

    // Créer un nouvel avis
    const newTestimonial = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    const updatedTestimonials = [newTestimonial, ...testimonials];
    saveTestimonials(updatedTestimonials);

    setSubmitStatus({
      show: true,
      success: true,
      message: 'Merci pour votre avis ! Il sera visible après validation.'
    });

    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      rating: 5,
      comment: ''
    });
    setShowForm(false);
    setIsSubmitting(false);

    setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 3000);
  };

  // Supprimer un avis (admin)
  const deleteTestimonial = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      saveTestimonials(updatedTestimonials);
    }
  };

  // Approuver un avis
  const approveReview = (id) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === id ? { ...t, verified: true } : t
    );
    saveTestimonials(updatedTestimonials);
  };

  // Rejeter/Supprimer un avis
  const rejectReview = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      saveTestimonials(updatedTestimonials);
    }
  };

  // Vérification admin
  const handleAdminAccess = () => {
    if (adminPassword === 'admin123') {
      setShowPasswordPrompt(false);
      setShowAdminPanel(true);
      setAdminPassword('');
    } else {
      alert('Mot de passe incorrect');
      setAdminPassword('');
    }
  };

  // Calcul de la note moyenne
  const verifiedTestimonials = testimonials.filter(t => t.verified);
  const averageRating = verifiedTestimonials.length > 0 
    ? (verifiedTestimonials.reduce((sum, t) => sum + t.rating, 0) / verifiedTestimonials.length).toFixed(1)
    : 0;

  // Calcul du pourcentage d'avis 5 étoiles
  const fiveStarPercentage = verifiedTestimonials.length > 0
    ? ((verifiedTestimonials.filter(t => t.rating === 5).length / verifiedTestimonials.length) * 100).toFixed(0)
    : 0;

  // Rendu des étoiles
  const renderStars = (rating, interactive = false, onHover = null, onClick = null) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (interactive ? hoverRating || rating : rating);
      
      if (interactive) {
        return (
          <FaStar
            key={index}
            className={`star ${isFilled ? 'filled' : 'empty'}`}
            onMouseEnter={() => onHover(starValue)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onClick(starValue)}
          />
        );
      }
      
      return isFilled ? (
        <FaStar key={index} className="star filled" />
      ) : (
        <FaRegStar key={index} className="star empty" />
      );
    });
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        {/* En-tête */}
        <div className="testimonials-header">
          <span className="testimonials-badge">⭐ Avis Clients</span>
          <h2 className="testimonials-title">
            Ce que disent <span className="text-gradient">nos clients</span>
          </h2>
          <p className="testimonials-subtitle">
            Découvrez les expériences de ceux qui ont choisi Venice Hall pour leurs événements
          </p>
        </div>

        {/* Statistiques */}
        <div className="testimonials-stats">
          <div className="stats-card">
            <div className="stats-rating">
              <span className="rating-number">{averageRating}</span>
              <span className="rating-outof">/5</span>
            </div>
            <div className="stats-stars">
              {renderStars(parseFloat(averageRating))}
            </div>
            <p className="stats-count">Basé sur {verifiedTestimonials.length} avis</p>
          </div>
          <div className="stats-card">
            <div className="stats-percentage">
              <span className="percentage-number">{fiveStarPercentage}%</span>
              <span className="percentage-label">de clients satisfaits</span>
            </div>
            <div className="stats-bar">
              <div className="bar-fill" style={{ width: `${fiveStarPercentage}%` }}></div>
            </div>
            <p className="stats-note">Note 5 étoiles</p>
          </div>
        </div>

        {/* Bouton pour ajouter un avis */}
        <div className="add-review-btn-container">
          <button 
            className="add-review-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <FaTimes /> : <FaStar />}
            {showForm ? 'Fermer' : 'Donner votre avis'}
          </button>
        </div>

        {/* Formulaire d'ajout d'avis */}
        {showForm && (
          <div className="testimonial-form-container">
            <h3 className="form-title">Partagez votre expérience</h3>
            <form className="testimonial-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Votre nom <span className="required">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Votre email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Votre note <span className="required">*</span></label>
                <div className="rating-input">
                  {renderStars(formData.rating, true, setHoverRating, handleRating)}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Votre avis <span className="required">*</span></label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Décrivez votre expérience chez Venice Hall..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-review-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-small"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Publier mon avis
                  </>
                )}
              </button>

              <p className="form-note">
                <i className="fas fa-lock"></i>
                Votre avis sera publié après validation par notre équipe.
              </p>
            </form>
          </div>
        )}

        {/* Message de statut */}
        {submitStatus.show && (
          <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
            <i className={`fas ${submitStatus.success ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <p>{submitStatus.message}</p>
          </div>
        )}

        {/* Liste des avis approuvés */}
        <div className="testimonials-grid">
          {verifiedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <div className="testimonial-header">
                <div className="testimonial-user">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div className="user-info">
                    <h4>{testimonial.name}</h4>
                    <div className="user-stars">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <div className="testimonial-date">
                  <FaCalendar />
                  <span>{new Date(testimonial.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>
              <p className="testimonial-comment">{testimonial.comment}</p>
              {testimonial.verified && (
                <div className="testimonial-verified">
                  <FaCheck />
                  <span>Expérience vérifiée</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {verifiedTestimonials.length === 0 && (
          <div className="no-reviews">
            <p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
          </div>
        )}

        {/* Bouton Admin */}
        <div className="admin-access">
          <button 
            className="admin-btn"
            onClick={() => setShowPasswordPrompt(true)}
          >
            <i className="fas fa-user-shield"></i>
            Espace Admin
          </button>
        </div>

        {/* Popup mot de passe */}
        {showPasswordPrompt && (
          <div className="password-modal-overlay" onClick={() => setShowPasswordPrompt(false)}>
            <div className="password-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Accès administrateur</h3>
              <input
                type="password"
                placeholder="Mot de passe"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
              />
              <div className="password-actions">
                <button className="btn-cancel" onClick={() => setShowPasswordPrompt(false)}>
                  Annuler
                </button>
                <button className="btn-confirm" onClick={handleAdminAccess}>
                  Valider
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel Modal */}
        {showAdminPanel && (
          <div className="admin-modal-overlay" onClick={() => setShowAdminPanel(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>Tableau de bord admin</h2>
                <button className="close-modal" onClick={() => setShowAdminPanel(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="admin-tabs">
                <button
                  className={`tab-btn ${!showAdminPanel ? 'active' : ''}`}
                  onClick={() => setShowAdminPanel(true)}
                >
                  En attente ({testimonials.filter(t => !t.verified).length})
                </button>
                <button
                  className={`tab-btn ${!showAdminPanel ? 'active' : ''}`}
                  onClick={() => setShowAdminPanel(true)}
                >
                  Approuvés ({testimonials.filter(t => t.verified).length})
                </button>
              </div>

              <div className="admin-reviews-list">
                {/* Avis en attente */}
                {testimonials.filter(t => !t.verified).map(review => (
                  <div key={review.id} className="admin-review-card pending">
                    <div className="review-header">
                      <div className="review-user">
                        <div className="user-avatar">
                          <FaUser />
                        </div>
                        <div>
                          <h4>{review.name}</h4>
                          <div className="review-stars">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="review-date">
                        <FaCalendar />
                        <span>{new Date(review.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="review-contact">
                      <FaEnvelope />
                      <span>{review.email || 'Non renseigné'}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <div className="review-actions">
                      <button className="btn-approve" onClick={() => approveReview(review.id)}>
                        <FaCheck />
                        Approuver
                      </button>
                      <button className="btn-reject" onClick={() => rejectReview(review.id)}>
                        <FaTimes />
                        Rejeter
                      </button>
                    </div>
                  </div>
                ))}

                {/* Avis approuvés */}
                {testimonials.filter(t => t.verified).map(review => (
                  <div key={review.id} className="admin-review-card approved">
                    <div className="review-header">
                      <div className="review-user">
                        <div className="user-avatar approved">
                          <FaUser />
                        </div>
                        <div>
                          <h4>{review.name}</h4>
                          <div className="review-stars">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="review-date">
                        <FaCalendar />
                        <span>{new Date(review.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="review-contact">
                      <FaEnvelope />
                      <span>{review.email || 'Non renseigné'}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <div className="review-actions">
                      <button className="btn-delete" onClick={() => deleteTestimonial(review.id)}>
                        <FaTrash />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}

                {testimonials.filter(t => !t.verified).length === 0 && (
                  <div className="empty-state">
                    <p>Aucun avis en attente de validation</p>
                  </div>
                )}
              </div>

              <div className="admin-stats">
                <div className="stat">
                  <span className="stat-label">Total avis</span>
                  <span className="stat-value">{testimonials.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">En attente</span>
                  <span className="stat-value pending">{testimonials.filter(t => !t.verified).length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Approuvés</span>
                  <span className="stat-value approved">{testimonials.filter(t => t.verified).length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;