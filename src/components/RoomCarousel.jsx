import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ← AJOUTER CET IMPORT
import '../styles/RoomCarousel.css';

const RoomCarousel = () => {
  const navigate = useNavigate();  // ← AJOUTER CETTE LIGNE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fonction pour naviguer vers la page de réservation
  const goToReservation = () => {
    navigate('/reservation');
  };

  const rooms = [
    {
      id: 1,
      name: "Salle Élégance",
      capacity: "150 personnes",
      price: "800 000 FCFA",
      image: "/img/img1.jpg",
      description: "Magnifique salle avec lustres en cristal et parquet"
    },
    {
      id: 2,
      name: "Jardin d'Été",
      capacity: "200 personnes",
      price: "750€",
      image: "/img/img2.jpg",
      description: "Espace extérieur couvert avec jardin paysager"
    },
    {
      id: 3,
      name: "Loft Moderne",
      capacity: "100 personnes",
      price: "400€",
      image: "/img/img3.jpg",
      description: "Style industriel avec équipements high-tech"
    },
    {
      id: 4,
      name: "Salle Royale",
      capacity: "300 personnes",
      price: "1200€",
      image: "/img/img4.jpg",
      description: "Espace prestigieux pour grands événements"
    },
    {
      id: 5,
      name: "Espace Contemporain",
      capacity: "80 personnes",
      price: "400 000 FCFA",
      image: "/img/img5.jpg",
      description: "Design moderne et épuré"
    },
    {
      id: 6,
      name: "Espace Contemporain",
      capacity: "80 personnes",
      price: "300 000 FCFA",
      image: "/img/img6.jpg",
      description: "Design moderne et épuré"
    }
  ];

  // Auto-play du carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, rooms.length]);

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

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Nos Salles</h2>
      
      <div 
        className="carousel-wrapper"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
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
              <img src={room.image} alt={room.name} />
              <div className="carousel-overlay">
                <h3>{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-details">
                  <span className="room-capacity">
                    <i className="fas fa-users"></i> {room.capacity}
                  </span>
                  <span className="room-price">
                    <i className="fas fa-franc-sign"></i> {room.price}
                  </span>
                </div>
                {/* BOUTON RÉSERVER MODIFIÉ */}
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
            <img src={room.image} alt={room.name} />
            <span className="thumbnail-name">{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCarousel;