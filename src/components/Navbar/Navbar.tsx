import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mantemos 'Inicio' e 'Cardapio' sem acento para a fonte não quebrar
  const navItems = ['Inicio', 'Sobre', 'Destaques', 'Cardapio'];

  const getHref = (item: string) => {
    if (item === 'Inicio') return '#hero';
    if (item === 'Cardapio') return '#menu';
    return `#${item.toLowerCase()}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbarLogo(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navStyle: React.CSSProperties = {
    ...styles.nav,
    backgroundColor: showNavbarLogo ? 'rgba(15, 23, 42, 0.98)' : 'transparent',
    padding: showNavbarLogo ? '0.5rem 0' : '1.5rem 0',
    boxShadow: showNavbarLogo ? '0 4px 20px rgba(0, 0, 0, 0.4)' : 'none',
    borderBottom: showNavbarLogo ? '1px solid rgba(212, 175, 55, 0.3)' : 'none',
    background: showNavbarLogo 
      ? 'rgba(15, 23, 42, 0.98)' 
      : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)' 
  };

  return (
    <nav style={navStyle}>
      <div style={styles.container}>
        
        {/* LOGO DA NAVBAR */}
        <div style={styles.logoWrapper}>
            <AnimatePresence>
                {showNavbarLogo && (
                    <motion.a 
                        href="#hero"
                        initial={{ opacity: 0, scale: 0.8, filter: 'drop-shadow(0 0 0px rgba(212, 175, 55, 0))' }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            filter: [
                                'drop-shadow(0 0 0px rgba(212, 175, 55, 0))', 
                                'drop-shadow(0 0 15px rgba(212, 175, 55, 1))', 
                                'drop-shadow(0 0 0px rgba(212, 175, 55, 0))'
                            ]
                        }}
                        transition={{ 
                            opacity: { duration: 0.5 },
                            filter: { duration: 1, ease: "easeInOut" }
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <img src="/logo.png" alt="Ollivander" style={styles.logo} />
                    </motion.a>
                )}
            </AnimatePresence>
        </div>

        {/* LINKS DESKTOP */}
        {!isMobile && (
          <div style={styles.desktopLinks}>
            {navItems.map((item) => (
              <a 
                key={item} 
                href={getHref(item)} 
                style={styles.link}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* MODO MOBILE */}
        {isMobile && (
          <div style={styles.mobileControls}>
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={styles.mobileToggle}
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}
      </div>

      {/* DROPDOWN MOBILE */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={styles.mobileMenu}
          >
             {navItems.map((item) => (
              <a 
                key={item} 
                href={getHref(item)}
                style={styles.mobileLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
    transition: 'all 0.4s ease',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative', 
    minHeight: '60px'
  },
  logoWrapper: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '120px',
    transition: 'transform 0.3s ease',
  },
  desktopLinks: {
    gap: '3.5rem', // Mais espaçamento entre os itens
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    fontFamily: "'HarryP', cursive", 
    // AUMENTADO: Para destacar a irregularidade das letras (era 1.5rem)
    fontSize: '2rem', 
    // REMOVIDO: textTransform uppercase deixava tudo reto. 
    // Agora fica "Normal" (Title Case vindo do array)
    textTransform: 'none',
    // REDUZIDO: Letras mais juntas parecem mais "escritas à mão"
    letterSpacing: '0.02em', 
    color: '#fcf5e5',
    cursor: 'pointer',
    textDecoration: 'none',
    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
    transition: 'all 0.3s ease',
    // Importante para a fonte não cortar em cima ou embaixo
    lineHeight: '1', 
    padding: '0.5rem'
  },
  mobileControls: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  mobileToggle: {
    background: 'none',
    border: 'none',
    color: 'var(--color-wizard-gold)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem'
  },
  mobileMenu: {
    backgroundColor: 'rgba(15, 23, 42, 0.98)',
    borderBottom: '1px solid rgba(212,175,55,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem 0',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)'
  },
  mobileLink: {
    fontFamily: "'HarryP', cursive",
    fontSize: '2.5rem', // Bem grande no mobile também
    color: 'var(--color-wizard-parchment)',
    textDecoration: 'none',
    letterSpacing: '1px',
    textTransform: 'none' // Garante minúsculas irregulares no mobile
  }
};