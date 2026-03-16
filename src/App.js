import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      {/* Sections de test */}
      <section id="accueil" style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Section Accueil</h1>
      </section>
      
      <section id="salles" style={{ height: '100vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Section Salles</h1>
      </section>
      
      <section id="a-propos" style={{ height: '100vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Section À Propos</h1>
      </section>
      
      <section id="contact" style={{ height: '100vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Section Contact</h1>
      </section>

      <Footer />
    </div>
  );
}

export default App;