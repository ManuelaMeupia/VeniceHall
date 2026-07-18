import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTestimonials, updateTestimonial, deleteTestimonial } from '../services/testimonialService';
import { FaCheck, FaTimes, FaTrash, FaStar, FaUser, FaEnvelope, FaCalendar } from 'react-icons/fa';
import '../styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  // Mot de passe admin (à changer)
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Vérifier si déjà authentifié
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadTestimonials();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadTestimonials();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/');
  };

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

  const approveReview = async (id) => {
    try {
      await updateTestimonial(id, { verified: true });
      await loadTestimonials();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const rejectReview = async (id) => {
    if (window.confirm('Supprimer cet avis ?')) {
      try {
        await deleteTestimonial(id);
        await loadTestimonials();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h2>🔐 Espace Administrateur</h2>
          <p>Veuillez entrer le mot de passe pour accéder au panneau</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    );
  }

  const pendingReviews = testimonials.filter(t => !t.verified);
  const approvedReviews = testimonials.filter(t => t.verified);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>📊 Panneau d'administration</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-number">{testimonials.length}</span>
          <span className="stat-label">Total avis</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-number">{pendingReviews.length}</span>
          <span className="stat-label">En attente</span>
        </div>
        <div className="stat-card approved">
          <span className="stat-number">{approvedReviews.length}</span>
          <span className="stat-label">Approuvés</span>
        </div>
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

      <div className="admin-reviews">
        {loading ? (
          <p>Chargement...</p>
        ) : activeTab === 'pending' && pendingReviews.length === 0 ? (
          <p className="empty-state">Aucun avis en attente</p>
        ) : activeTab === 'approved' && approvedReviews.length === 0 ? (
          <p className="empty-state">Aucun avis approuvé</p>
        ) : (
          (activeTab === 'pending' ? pendingReviews : approvedReviews).map((review) => (
            <div key={review.id} className={`admin-review-card ${activeTab === 'pending' ? 'pending' : 'approved'}`}>
              <div className="review-header">
                <div className="review-user">
                  <FaUser />
                  <div>
                    <strong>{review.name}</strong>
                    <div className="review-stars">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <div className="review-date">
                  <FaCalendar />
                  {new Date(review.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <div className="review-contact">
                <FaEnvelope /> {review.email || 'Non renseigné'}
              </div>
              <p className="review-comment">{review.comment}</p>
              {activeTab === 'pending' ? (
                <div className="review-actions">
                  <button className="btn-approve" onClick={() => approveReview(review.id)}>
                    <FaCheck /> Approuver
                  </button>
                  <button className="btn-reject" onClick={() => rejectReview(review.id)}>
                    <FaTimes /> Rejeter
                  </button>
                </div>
              ) : (
                <div className="review-actions">
                  <button className="btn-delete" onClick={() => rejectReview(review.id)}>
                    <FaTrash /> Supprimer
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;