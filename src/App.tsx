import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Highlights } from './components/Highlights/Highlights';
import { Menu } from './components/Menu/Menu';
import { Footer } from './components/Footer/Footer';
import './index.css';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Highlights />
        <Menu />
      </main>

      <Footer />
      
      {/* Botão Flutuante (Floating Action Button) */}
      <a 
        href="#menu" 
        style={{
          position: 'fixed', 
          bottom: '2rem', 
          right: '2rem', 
          backgroundColor: 'var(--color-wizard-gold)', 
          color: 'var(--color-wizard-deep)', 
          padding: '1.2rem', 
          borderRadius: '50%', 
          boxShadow: '0 0 30px rgba(212,175,55,0.6)', 
          zIndex: 50, 
          display: scrolled ? 'flex' : 'none', 
          alignItems: 'center', 
          justifyContent: 'center', 
          transition: 'all 0.3s'
        }}
      >
        <MenuIcon size={28} />
      </a>
    </div>
  );
}