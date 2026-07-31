import React from 'react';
import { FaTimes, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Supprimer", cancelText = "Annuler" }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="confirm-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="confirm-modal-icon">
          <FaExclamationTriangle />
        </div>
        
        <h3>{title || "Confirmation"}</h3>
        <p>{message || "Êtes-vous sûr de vouloir effectuer cette action ?"}</p>
        
        <div className="confirm-modal-actions">
          <button className="confirm-modal-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button className="confirm-modal-confirm" onClick={onConfirm}>
            <FaTrash /> {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;