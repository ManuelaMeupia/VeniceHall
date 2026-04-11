import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaTrash, FaStar, FaUser, FaEnvelope, FaCalendar } from 'react-icons/fa';
import '../styles/AdminPanel.css';

const AdminPanel = ({ isOpen, onClose, testimonials, onUpdate }) => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  // Mot de passe admin (à changer)
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Séparer les avis en attente et approuvés
    const pending = testimonials.filter(t => !t.verified);
    const approved = testimonials.filter(t => t.verified);
    setPendingReviews(pending);
    setApprovedReviews(approved);
  }, [testimonials]);

  // Approuver un avis
  const approveReview = (id) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === id ? { ...t, verified: true } : t
    );
    onUpdate(updatedTestimonials);
  };

  // Rejeter/Supprimer un avis
  const rejectReview = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      onUpdate(updatedTestimonials);
    }
  };

  // Supprimer un avis approuvé
  const deleteReview = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      onUpdate(updatedTestimonials);
    }
  };

  if (!isOpen) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>Tableau de bord admin</h2>
          <button className="close-modal" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            En attente ({pendingReviews.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approuvés ({approvedReviews.length})
          </button>
        </div>

        <div className="admin-reviews-list">
          {activeTab === 'pending' && pendingReviews.length === 0 && (
            <div className="empty-state">
              <p>Aucun avis en attente de validation</p>
            </div>
          )}

          {activeTab === 'approved' && approvedReviews.length === 0 && (
            <div className="empty-state">
              <p>Aucun avis approuvé pour le moment</p>
            </div>
          )}

          {activeTab === 'pending' && pendingReviews.map(review => (
            <div key={review.id} className="admin-review-card pending">
              <div className="review-header">
                <div className="review-user">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div>
                    <h4>{review.name}</h4>
                    <div className="review-stars">{renderStars(review.rating)}</div>
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

          {activeTab === 'approved' && approvedReviews.map(review => (
            <div key={review.id} className="admin-review-card approved">
              <div className="review-header">
                <div className="review-user">
                  <div className="user-avatar approved">
                    <FaUser />
                  </div>
                  <div>
                    <h4>{review.name}</h4>
                    <div className="review-stars">{renderStars(review.rating)}</div>
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
                <button className="btn-delete" onClick={() => deleteReview(review.id)}>
                  <FaTrash />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-stats">
          <div className="stat">
            <span className="stat-label">Total avis</span>
            <span className="stat-value">{testimonials.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">En attente</span>
            <span className="stat-value pending">{pendingReviews.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Approuvés</span>
            <span className="stat-value approved">{approvedReviews.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;