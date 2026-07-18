import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal';
import '../styles/RoomCarousel.css';

const RoomCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const rooms = [
    {
      id: 1,
      image: "/img/image1.jpg",
  //     loading="lazy"
  // decoding="async"
    },
    {
      id: 2,
      image: "/img/image2.jpg",
    },
    {
      id: 3,
      image: "/img/image3.jpg",
    },
    {
      id: 4,
      image: "/img/image4.jpg",
    },
    {
      id: 5,
      image: "/img/image5.jpg",
    },
    {
      id: 6,
      image: "/img/image6.jpg",
    },
        {
      id: 7,
      image: "/img/image7.jpg",
    },
    {
      id: 8,
      image: "/img/image8.jpg",
    },
    {
      id: 9,
      image: "/img/image9.jpg",
    },
    {
      id: 10,
      image: "/img/image10.jpg",
    },
    {
      id: 11,
      image: "/img/image11.jpg",
    },
    {
      id: 12,
      image: "/img/image12.jpg",
    },
    {
      id: 13,
      image: "/img/image13.jpg",
    },
    {
      id: 14,
      image: "/img/image14.jpg",
    },
    {
      id: 15,
      image: "/img/image15.jpg",
    },
    {
      id: 16,
      image: "/img/image16.jpg",
    },
    {
      id: 17,
      image: "/img/image17.jpg",
    },
    {
      id: 18,
      image: "/img/image18.jpg",
    },
    {
      id: 19,
      image: "/img/image19.jpg",
    },
    {
      id: 20,
      image: "/img/image200.jpg",
    },
    
  ];

  // Ouvrir le modal avec l'image cliquée
  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
    setIsAutoPlaying(false);
  };

  // Fermer le modal
  const closeModal = () => {
    setModalOpen(false);
    setIsAutoPlaying(true);
  };

  // Image suivante dans le modal
  const nextImage = () => {
    setModalIndex((prev) => (prev + 1) % rooms.length);
  };

  // Image précédente dans le modal
  const prevImage = () => {
    setModalIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  // Auto-play du carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying && !modalOpen) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, rooms.length, modalOpen]);

  // Navigation
  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % rooms.length
    );
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Gestion du swipe tactile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  // Fonction pour naviguer vers la page de réservation
  const goToReservation = () => {
    navigate('/reservation');
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Nos Salles</h2>
      
      <div 
        className="carousel-wrapper"
        onMouseEnter={() => !modalOpen && setIsAutoPlaying(false)}
        onMouseLeave={() => !modalOpen && setIsAutoPlaying(true)}
      >
        {/* Images principales */}
        <div 
          className="carousel-slide"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`
              }}
            >
              {/* Image cliquable pour zoom */}
              <img 
                src={room.image} 
                alt={room.name} 
                onClick={() => openModal(index)}
                className="carousel-image"
                style={{ cursor: 'pointer' }}
              />
              <div className="carousel-overlay">
                {/* <h3>{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-details">
                  <span className="room-capacity">
                    <i className="fas fa-users"></i> {room.capacity}
                  </span>
                  <span className="room-price">
                    <i className="fas fa-franc-sign"></i> {room.price}
                  </span>
                </div> */}
                <button 
                  className="room-btn"
                  onClick={goToReservation}
                >
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Flèches de navigation */}
        <button className="carousel-arrow prev" onClick={goToPrevious}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-arrow next" onClick={goToNext}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Indicateurs (dots) */}
        <div className="carousel-dots">
          {rooms.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller à la salle ${index + 1}`}
            />
          ))}
        </div>

        {/* Indicateur de lecture automatique */}
        <div className="auto-play-indicator">
          <div className={`auto-play-bar ${isAutoPlaying ? 'playing' : 'paused'}`} />
        </div>
      </div>

      {/* Miniatures */}
      <div className="carousel-thumbnails">
        {rooms.map((room, index) => (
          <div
            key={room.id}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <img 
              src={room.image} 
              alt={room.name}
              onClick={(e) => {
                e.stopPropagation();
                openModal(index);
              }}
              style={{ cursor: 'pointer' }}
            />
            <span className="thumbnail-name">{room.name}</span>
          </div>
        ))}
      </div>

      {/* Modal d'agrandissement */}
      {modalOpen && (
        <ImageModal
          images={rooms}
          currentIndex={modalIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export default RoomCarousel;