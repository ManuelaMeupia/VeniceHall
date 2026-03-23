import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RoomCarousel from './components/RoomCarousel';
import Reservation from './components/Reservation';
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
              <About />
              <Contact />
            </>
          } />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;