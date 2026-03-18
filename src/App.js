import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RoomCarousel from './components/RoomCarousel';
import './App.css';

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="App">
      <Navbar />
      
      {/* SECTION ACCUEIL */}
      <Hero scrollToSection={scrollToSection} />
      
      {/* SECTION SALLES */}
      <section id="salles" className="section-salles">
        <RoomCarousel />
      </section>
      
      {/* SECTION À PROPOS */}
      <About />
      
      {/* SECTION CONTACT - Maintenant dans Contact.jsx */}
      <Contact />

      <Footer />
    </div>
  );
}

export default App;