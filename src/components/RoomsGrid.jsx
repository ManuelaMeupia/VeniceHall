import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaWifi, FaWind, FaMusic, FaParking, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/RoomsGrid.css';

const RoomsGrid = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToReservation = () => {
    navigate('/reservation');
  };

  // Données des salles avec plusieurs images
  const rooms = [
    {
      id: 1,
      name: "Pack Premium",
      capacity: "600 personnes",
      // price: "1 500 000 FCFA",
      images: [
        "/img/img1.jpg",
        "/img/img1.jpg",
        "/img/img1.jpg",
        "/img/img1.jpg"
      ],
      description: "•	Expérience grandiose haut de gamme, Organisation sur-mesure, salle la plus spacieuse.",
      features: [
        { icon: FaUsers, text: "600 personnes" },
        { icon: FaWind, text: "Climatisation" },
        { icon: FaMusic, text: "Sonorisation pro" },
        { icon: FaWifi, text: "WiFi haut débit" },
        { icon: FaParking, text: "Parking privé" }
      ],
      highlight: true
    },
    {
      id: 2,
      name: "Salle Élégance",
      capacity: "350 personnes",
      // price: "800 000 FCFA",
      images: [
        "/img/salle2-1.jpg",
        "/img/salle2-2.jpg",
        "/img/salle2-3.jpg",
        "/img/salle2-4.jpg"
      ],
      description: "•	Espace élégant, raffiné et intimiste; Accompagnement personnalisé.",
      features: [
        { icon: FaUsers, text: "350 personnes" },
        { icon: FaWind, text: "Climatisation" },
        { icon: FaMusic, text: "Sonorisation" },
        { icon: FaWifi, text: "WiFi" },
        { icon: FaParking, text: "Parking" }
      ],
      highlight: false
    }
  ];

  // Ouvrir le modal avec l'image cliquée
  const openImageModal = (room, index) => {
    setSelectedRoom(room);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  // Fermer le modal
  const closeModal = () => {
    setSelectedRoom(null);
    document.body.style.overflow = 'unset';
  };

  // Image suivante
  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.images.length);
    }
  };

  // Image précédente
  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length);
    }
  };

  return (
    <section className="rooms-grid-section">
      <div className="rooms-container">
        <div className="rooms-header">
          <span className="rooms-badge">Nos Espaces</span>
          <h2 className="rooms-title">
            Deux salles pour <span className="text-gradient">tous vos événements</span>
          </h2>
          <p className="rooms-subtitle">
            Que vous organisiez un grand gala ou une réunion intimiste, 
            nous avons la salle parfaite pour vous.
          </p>
        </div>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className={`room-card ${room.highlight ? 'highlight' : ''}`}
            >
              {room.highlight && (
                <div className="room-badge">
                  <i className="fas fa-crown"></i>
                  Le plus spacieux
                </div>
              )}
              
              {/* Image principale cliquable */}
              <div className="room-image" onClick={() => openImageModal(room, 0)}>
                <img src={room.images[0]} alt={room.name} />
                <div className="image-overlay">
                  <i className="fas fa-search-plus"></i>
                  <span>Voir la galerie</span>
                </div>
              </div>

              {/* Miniatures des autres images */}
              <div className="room-thumbnails">
                {room.images.slice(1, 4).map((img, idx) => (
                  <div 
                    key={idx} 
                    className="thumbnail"
                    onClick={() => openImageModal(room, idx + 1)}
                  >
                    <img src={img} alt={`${room.name} ${idx + 2}`} />
                    {idx === 2 && room.images.length > 4 && (
                      <div className="thumbnail-overlay">
                        +{room.images.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="room-content">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-description">{room.description}</p>
                
                <div className="room-features">
                  {room.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <feature.icon />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* <div className="room-price">
                  <span className="price-label">À partir de</span>
                  <span className="price-amount">
                    {room.price}
                  </span>
                  <span className="price-period">/jour</span>
                </div> */}

                <button 
                  className="room-reserve-btn"
                  onClick={goToReservation}
                >
                  Réserver cette salle
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal d'agrandissement */}
      {selectedRoom && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <button className="modal-nav prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            
            <div className="modal-image-container">
              <img 
                src={selectedRoom.images[currentImageIndex]} 
                alt={selectedRoom.name}
                className="modal-image"
              />
              <div className="modal-info">
                <h3>{selectedRoom.name}</h3>
                <div className="modal-counter">
                  {currentImageIndex + 1} / {selectedRoom.images.length}
                </div>
              </div>
            </div>
            
            <button className="modal-nav next" onClick={nextImage}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomsGrid;