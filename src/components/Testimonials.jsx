import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaUser, FaQuoteLeft, FaCheck, FaTimes, FaCalendar } from 'react-icons/fa';
import { getTestimonials, addTestimonial } from '../services/testimonialService';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Charger les avis
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
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

    const newTestimonial = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    try {
      await addTestimonial(newTestimonial);
      await loadTestimonials();
      
      setSubmitStatus({
        show: true,
        success: true,
        message: 'Merci pour votre avis ! Il sera visible après validation.'
      });
      
      setFormData({ name: '', email: '', rating: 5, comment: '' });
      setShowForm(false);
    } catch (error) {
      setSubmitStatus({
        show: true,
        success: false,
        message: 'Erreur lors de l\'envoi. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 3000);
    }
  };

  const verifiedTestimonials = testimonials.filter(t => t.verified);

  const averageRating = verifiedTestimonials.length > 0 
    ? (verifiedTestimonials.reduce((sum, t) => sum + t.rating, 0) / verifiedTestimonials.length).toFixed(1)
    : 0;

  const fiveStarPercentage = verifiedTestimonials.length > 0
    ? ((verifiedTestimonials.filter(t => t.rating === 5).length / verifiedTestimonials.length) * 100).toFixed(0)
    : 0;

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

  if (loading && testimonials.length === 0) {
    return (
      <div className="testimonials-loading">
        <div className="spinner-large"></div>
        <p>Chargement des avis...</p>
      </div>
    );
  }

  return (
    <section id="temoignages" className="testimonials">
      <div className="testimonials-container">
        {/* En-tête */}
        <div className="testimonials-header">
          <span className="testimonials-badge">⭐ Avis Clients</span>
          <h2 className="testimonials-title">
            Ce que disent <span className="text-gradient">nos clients</span>
          </h2>
          <p className="testimonials-subtitle">
            Découvrez les expériences de ceux qui ont choisi Venice Hall
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

        {/* Bouton ajouter avis */}
        <div className="add-review-btn-container">
          <button className="add-review-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? <FaTimes /> : <FaStar />}
            {showForm ? 'Fermer' : 'Donner votre avis'}
          </button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="testimonial-form-container">
            <h3 className="form-title">Partagez votre expérience</h3>
            <form className="testimonial-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Votre nom <span className="required">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Votre email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Votre note <span className="required">*</span></label>
                <div className="rating-input">
                  {renderStars(formData.rating, true, setHoverRating, handleRating)}
                </div>
              </div>
              <div className="form-group">
                <label>Votre avis <span className="required">*</span></label>
                <textarea name="comment" rows="4" value={formData.comment} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="submit-review-btn" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner-small"></span> : <><FaCheck /> Publier mon avis</>}
              </button>
            </form>
          </div>
        )}

        {/* Message statut */}
        {submitStatus.show && (
          <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
            <p>{submitStatus.message}</p>
          </div>
        )}

        {/* Liste des avis */}
        <div className="testimonials-grid">
          {verifiedTestimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <div className="testimonial-header">
                <div className="testimonial-user">
                  <div className="user-avatar"><FaUser /></div>
                  <div className="user-info">
                    <h4>{t.name}</h4>
                    <div className="user-stars">{renderStars(t.rating)}</div>
                  </div>
                </div>
                <div className="testimonial-date">
                  <FaCalendar /> {new Date(t.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <p className="testimonial-comment">{t.comment}</p>
              <div className="testimonial-verified"><FaCheck /> Expérience vérifiée</div>
            </div>
          ))}
        </div>

        {verifiedTestimonials.length === 0 && !loading && (
          <div className="no-reviews"><p>Soyez le premier à donner votre avis !</p></div>
        )}

        {/* Bouton Admin - Redirige vers /admin */}
        {/* <div className="admin-access">
          <a 
            href="/admin" 
            className="admin-btn"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/admin';
            }}
          >
            <i className="fas fa-user-shield"></i> 
            Administration
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;