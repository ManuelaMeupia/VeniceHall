import React, { useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/ImageModal.css';

const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  // Fermer avec la touche Echap
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <button className="modal-nav prev" onClick={onPrev}>
          <FaChevronLeft />
        </button>
        
        <div className="modal-image-container">
          <img 
            src={images[currentIndex]?.image} 
            alt={images[currentIndex]?.name}
            className="modal-image"
          />
          <div className="modal-info">
            <h3>{images[currentIndex]?.name}</h3>
            <p>{images[currentIndex]?.description}</p>
            <div className="modal-details">
              <span>
                <i className="fas fa-users"></i> {images[currentIndex]?.capacity}
              </span>
              <span>
                <i className="fas fa-franc-sign"></i> {images[currentIndex]?.price}
              </span>
            </div>
          </div>
        </div>
        
        <button className="modal-nav next" onClick={onNext}>
          <FaChevronRight />
        </button>
        
        <div className="modal-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;