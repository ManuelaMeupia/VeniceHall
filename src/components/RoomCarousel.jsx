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
      // name: "Salle Élégance",
      // capacity: "150 personnes",
      // price: "800 000 FCFA",
      image: "/img/imgg1.jpg",
      // description: "Magnifique salle avec lustres en cristal et parquet"
  //     loading="lazy"
  // decoding="async"
    },
    {
      id: 2,
      // name: "Jardin d'Été",
      // capacity: "200 personnes",
      // price: "750€",
      image: "/img/img2.png",
      // description: "Espace extérieur couvert avec jardin paysager"
    }
    // {
    //   id: 3,
    //   // name: "Loft Moderne",
    //   // capacity: "100 personnes",
    //   // price: "400€",
    //   image: "/img/imgg2.jpg",
    //   // description: "Style industriel avec équipements high-tech"
    // },
    // {
    //   id: 4,
    //   // name: "Salle Royale",
    //   // capacity: "300 personnes",
    //   // price: "1200€",
    //   image: "/img/imgg3.jpg",
    //   // description: "Espace prestigieux pour grands événements"
    // },
    // {
    //   id: 5,
    //   // name: "Espace Contemporain",
    //   // capacity: "80 personnes",
    //   // price: "400 000 FCFA",
    //   image: "/img/imgg4.jpg",
    //   // description: "Design moderne et épuré"
    // },
    // {
    //   id: 6,
    //   // name: "Espace Contemporain",
    //   // capacity: "80 personnes",
    //   // price: "300 000 FCFA",
    //   image: "/img/imgg5.jpg",
    //   // description: "Design moderne et épuré"
    // },
    // // {
    // // id: 1,
    // // image: "/videos/salle1.mp4", 
    
    // // }

    // {
    //   id: 7,
    //   image: "/img/photo1 copie.jpg",
    // },
    // {
    //   id: 8,
    //   image: "/img/photo2 copie.jpg",
    // },
    // {
    //   id: 9,
    //   image: "/img/photo3 copie.jpg",
    // },
    // {
    //   id: 10,
    //   image: "/img/photo4 copie.jpg",
    // },
    // {
    //   id: 11,
    //   image: "/img/photo5 copie.jpg",
    // },
    // {
    //   id: 12,
    //   image: "/img/photo6 copie.jpg",
    // },
    // {
    //   id: 13,
    //   image: "/img/photo7 copie.jpg",
    // },
    // {
    //   id: 14,
    //   image: "/img/photo8 copie.jpg",
    // },
    // {
    //   id: 15,
    //   image: "/img/photo9 copie.jpg",
    // },
    // {
    //   id: 16,
    //   image: "/img/photo10 copie.jpg",
    // },
    // {
    //   id: 17,
    //   image: "/img/photo11 copie.jpg",
    // },
    // {
    //   id: 18,
    //   image: "/img/photo12 copie.jpg",
    // },
    // {
    //   id: 19,
    //   image: "/img/photo13 copie.jpg",
    // },
    // {
    //   id: 20,
    //   image: "/img/photo14 copie.jpg",
    // },
    // {
    //   id: 21,
    //   image: "/img/photo15 copie.jpg",
    // },
    // {
    //   id: 22,
    //   image: "/img/photo16 copie.jpg",
    // },
    // {
    //   id: 23,
    //   image: "/img/photo17 copie.jpg",
    // },
    
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