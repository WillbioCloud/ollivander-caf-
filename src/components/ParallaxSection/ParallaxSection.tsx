import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Props {
  bgImage: string;
  children: React.ReactNode;
  id?: string;
  overlayColor?: string;
}

export const ParallaxSection: React.FC<Props> = ({ 
  bgImage, 
  children, 
  id, 
  overlayColor = "rgba(15, 23, 42, 0.4)" 
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animações
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], ["0px", "50px"]), {
    stiffness: 70, damping: 20
  });

  return (
    <div id={id} ref={ref} style={styles.container}>
      {/* Imagem de Fundo */}
      <motion.div 
        style={{ 
          ...styles.bgImage, // Pega o estilo base
          y: bgY,            // Aplica animação
          backgroundImage: `url(${bgImage})` 
        }} 
      />
      
      {/* Overlay de Cor */}
      <div style={{ ...styles.overlay, backgroundColor: overlayColor }}></div>
      
      {/* Degradês (Bordas) */}
      <div style={styles.fadeTop}></div>
      <div style={styles.fadeBottom}></div>

      {/* Conteúdo */}
      <motion.div style={{ ...styles.content, y: textY }}>
        {children}
      </motion.div>
    </div>
  );
};

// --- CSS DENTRO DO ARQUIVO ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    // Espaçamento generoso para não encavalar seções
    paddingTop: '8rem', 
    paddingBottom: '8rem',
    minHeight: '100vh',
    display: 'block', // Garante comportamento de bloco padrão
  },
  bgImage: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '-15%',
    left: 0,
    right: 0,
    bottom: '-15%',
    height: '130%',
    zIndex: 0,
    willChange: 'transform',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '80px',
    background: 'linear-gradient(to bottom, var(--color-wizard-deep), transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '80px',
    background: 'linear-gradient(to top, var(--color-wizard-deep), transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};