import React, { useState } from 'react';
import { FaTimes, FaWhatsapp, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import '../styles/PrivateVisitModal.css';

const PrivateVisitModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    guestCount: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const eventTypes = [
    { value: 'mariage', label: 'Mariage' },
    { value: 'gala', label: 'Gala' },
    { value: 'conference', label: 'Conférence' },
    { value: 'anniversaire', label: 'Anniversaire' },
    { value: 'autre', label: 'Autre' }
  ];

  const guestOptions = [
    { value: 'moins300', label: '-300 personnes' },
    { value: '300-500', label: '300 - 500 personnes' },
    { value: '500plus', label: '500+ personnes' }
  ];

  const budgetOptions = [
    { value: 'premium', label: 'Premium.', description: ' Salle + décoration de base' },
    { value: 'tres-premium', label: 'Très Premium.', description: ' Prestations haut de gamme sur mesure' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const message = 
`*VENICE HALL - DEMANDE DE VISITE PRIVÉE*

*CLIENT*
Nom : ${formData.name}
WhatsApp : ${formData.phone}

*ÉVÉNEMENT*
Type : ${eventTypes.find(e => e.value === formData.eventType)?.label || formData.eventType}
Nombre d'invités : ${guestOptions.find(g => g.value === formData.guestCount)?.label || formData.guestCount}
Budget : ${budgetOptions.find(b => b.value === formData.budget)?.label || formData.budget}

*Envoyé le :* ${new Date().toLocaleString('fr-FR')}

--- 
À recontacter pour organiser la visite privée.`;

    const whatsappNumber = "237620207726";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      
      setTimeout(() => {
        setIsConfirmed(false);
        onClose();
        setStep(1);
        setFormData({
          name: '',
          phone: '',
          eventType: '',
          guestCount: '',
          budget: ''
        });
      }, 3000);
    }, 1000);
  };

  const isStepValid = () => {
    switch(step) {
      case 1:
        return formData.name && formData.phone;
      case 2:
        return formData.eventType;
      case 3:
        return formData.guestCount;
      case 4:
        return formData.budget;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="private-visit-overlay" onClick={onClose}>
      <div className="private-visit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {!isConfirmed ? (
          <>
            <div className="modal-header">
              <div className="step-indicator">
                {[1, 2, 3, 4].map((s) => (
                  <div 
                    key={s} 
                    className={`step-dot ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}
                  >
                    {step > s ? <FaCheck /> : s}
                  </div>
                ))}
              </div>
              <h2>Demande de visite privée</h2>
              <p>Remplissez ce formulaire, un conseiller vous contactera sous 1h</p>
            </div>

            <div className="modal-body">
              {step === 1 && (
                <div className="step-content">
                  <h3>Comment vous appelez-vous ?</h3>
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Numéro WhatsApp</label>
                    <input
                      type="tel"
                      placeholder=""
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step-content">
                  <h3>Quel type d'événement organisez-vous ?</h3>
                  <div className="options-grid">
                    {eventTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`option-card ${formData.eventType === type.value ? 'selected' : ''}`}
                        onClick={() => handleChange('eventType', type.value)}
                      >
                        <span className="option-label">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="step-content">
                  <h3>Combien d'invités prévoyez-vous ?</h3>
                  <div className="options-grid">
                    {guestOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`option-card ${formData.guestCount === option.value ? 'selected' : ''}`}
                        onClick={() => handleChange('guestCount', option.value)}
                      >
                        <span className="option-label">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="step-content">
                  <h3>Quel est votre niveau de budget ?</h3>
                  <div className="options-grid">
                    {budgetOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`option-card ${formData.budget === option.value ? 'selected' : ''}`}
                        onClick={() => handleChange('budget', option.value)}
                      >
                        <div className="option-info">
                          <span className="option-label">{option.label}</span>
                          <span className="option-description">{option.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {step > 1 && (
                <button className="btn-prev" onClick={prevStep}>
                  <FaArrowLeft /> Retour
                </button>
              )}
              {step < 4 ? (
                <button 
                  className="btn-next" 
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Suivant <FaArrowRight />
                </button>
              ) : (
                <button 
                  className="btn-submit" 
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp /> Envoyer ma demande
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="confirmation-message">
            <div className="confirmation-icon">
              <FaCheck />
            </div>
            <h2>Demande envoyée !</h2>
            <p>✓ Un conseiller dédié vous contactera sous <strong>1 heure</strong> pour organiser votre visite privée.</p>
            <div className="confirmation-details">
              <p><strong>Récapitulatif :</strong></p>
              <p>{formData.phone}</p>
              <p>{eventTypes.find(e => e.value === formData.eventType)?.label}</p>
              <p>{guestOptions.find(g => g.value === formData.guestCount)?.label}</p>
              <p>{budgetOptions.find(b => b.value === formData.budget)?.label}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateVisitModal;