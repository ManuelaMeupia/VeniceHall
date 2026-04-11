import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RoomCarousel from './components/RoomCarousel';
import WhyChooseUs from './components/WhyChooseUs';
import Reservation from './components/Reservation';
import WhatsAppButton from './components/WhatsAppButton' ;
import Testimonials from './components/Testimonials';
import RoomsGrid  from './components/RoomsGrid';
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
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero scrollToSection={scrollToSection} />
              
              <section id="salles" className="section-salles">
                <RoomCarousel />
              </section>
              <RoomsGrid />
              <section id="offres" className="section-offres">
                <WhyChooseUs />
              </section>
              <About />
              <Testimonials />
              <Contact />
            </>
          } />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>

        <Footer />
        
        {/* Bouton WhatsApp - s'affiche sur toutes les pages */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;