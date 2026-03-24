import React from 'react';
import { FaBuilding, FaCrown, FaGem, FaMapMarkerAlt } from 'react-icons/fa';
import { GiPalace, GiSparkles } from 'react-icons/gi';
import { MdLocationOn, MdEmojiEvents } from 'react-icons/md';
import '../styles/WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaBuilding />,
      title: "Lieu d'exception",
      description: "Des espaces uniques au design raffiné, pensés pour vos moments les plus précieux."
    },
    {
      icon: <FaCrown />,
      title: "Service personnalisé",
      description: "Une équipe dédiée pour vous accompagner de la réservation jusqu'au jour J."
    },
    {
      icon: <GiSparkles />,
      title: "Prestations haut de gamme",
      description: "Sonorisation professionnelle, éclairage d'ambiance, décoration sur mesure."
    },
    {
      icon: <MdLocationOn />,
      title: "Emplacement privilégié",
      description: "Situé à Texaco Omnisport, Yaoundé, facilement accessible et parking privé."
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Pourquoi Venice Hall ?</span>
          <h2>L'excellence à chaque <span className="text-gradient">détail</span></h2>
          <p>Découvrez ce qui fait de Venice Hall la référence des salles de prestige</p>
        </div>
        
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;