import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scroll } from 'lucide-react';
import { ParallaxSection } from '../ParallaxSection/ParallaxSection';

export const Hero = () => {
  // Hook para detectar o scroll global ou relativo
  const { scrollY } = useScroll();

  // --- LÓGICA DA ANIMAÇÃO DO LOGO ---
  // 0px a 300px de scroll:
  // 1. Zoom (Scale): Vai de 1 (normal) até 1.8 (grande)
  // 2. Opacidade: Começa em 1, mantém até 150px, e some totalmente aos 300px
  const logoScale = useTransform(scrollY, [0, 300], [1, 1.8]);
  const logoOpacity = useTransform(scrollY, [0, 200, 300], [1, 1, 0]);
  
  // O ícone de scroll também some rapidinho para limpar a tela
  const scrollIconOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <ParallaxSection 
      id="hero" 
      bgImage="/hero-bg.jpg" 
      overlayColor="rgba(0,0,0,0.3)"
    >
      <div style={styles.wrapper}>
        
        {/* Ícone de Scroll (Some ao rolar) */}
        <motion.div 
          style={{ ...styles.iconWrapper, opacity: scrollIconOpacity }}
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1.5 }}
        >
          <Scroll 
            size={70} 
            color="#D4AF37" 
            strokeWidth={1} 
            style={styles.icon} 
          />
        </motion.div>
        
        {/* LOGO HERO (Zoom In + Fade Out) */}
        <motion.img 
          src="/logo.png" 
          alt="Ollivander Café" 
          style={{ 
            ...styles.logo, 
            scale: logoScale,      // Aplica o zoom
            opacity: logoOpacity   // Aplica o fade out
          }}
          // Mantemos a flutuação original, mas agora controlada pelo scroll também
          animate={{ y: [0, -12, 0] }}
          transition={{ 
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
          }}
        />
        
        <motion.p 
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          “Onde cada sabor escolhe você”
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a href="#menu" style={styles.btnGold}>
            Ver Cardápio
          </a>
        </motion.div>
      </div>
    </ParallaxSection>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '2rem',
    position: 'relative', // Importante para o z-index funcionar bem
    zIndex: 10
  },
  iconWrapper: {
    marginBottom: '2rem',
  },
  icon: {
    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))'
  },
  logo: {
    width: '400px',
    maxWidth: '50vw',
    marginBottom: '1.5rem',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
    willChange: 'transform, opacity', // Otimização para animação
  },
  subtitle: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
    marginBottom: '2.5rem',
    color: 'var(--color-wizard-parchment)',
    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
    padding: '1rem 2rem',
    borderTop: '1px solid rgba(212, 175, 55, 0.5)',
    borderBottom: '1px solid rgba(212, 175, 55, 0.5)',
    background: 'rgba(0,0,0,0.2)',
    backdropFilter: 'blur(2px)',
  },
  btnGold: {
    background: 'linear-gradient(45deg, #D4AF37, #F4D03F)',
    color: 'var(--color-wizard-deep)',
    padding: '1rem 2.5rem',
    fontFamily: 'var(--font-magic)',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid #F4D03F',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'inline-block',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
  }
};