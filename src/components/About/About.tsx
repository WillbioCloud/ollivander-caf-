import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';
import { ParallaxSection } from '../ParallaxSection/ParallaxSection';

// Sub-componente interno para a imagem que flutua
const ScrollFloatingImage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Movimento inverso ao scroll
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 });
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.div ref={ref} style={{ ...styles.imageWrapper, y, rotate }}>
      <img 
        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
        alt="Detalhe do Café" 
        style={styles.floatingImage}
      />
    </motion.div>
  );
};

export const About = () => {
  return (
    <ParallaxSection 
      id="sobre" 
      bgImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1920"
      overlayColor="rgba(26, 26, 29, 0.7)"
    >
      <div style={styles.grid}>
        <ScrollFloatingImage />

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={styles.textContent}
        >
          <div>
            <div style={styles.headerLine}>
              <div style={styles.line}></div>
              <span style={styles.label}>Nossa História</span>
            </div>
            <h2 style={styles.title}>
              Magia em cada <span style={{ color: 'var(--color-wizard-gold)' }}>detalhe</span>
            </h2>
          </div>
          
          <div style={styles.paragraphContainer}>
            <p>Inspirado nas lendas e encantos do mundo bruxo, o <strong style={{ color: 'var(--color-wizard-gold)' }}>Ollivander Café</strong> não é apenas uma lanchonete, é um portal para outro mundo.</p>
            <p>Do aroma envolvente do nosso Café na Prensa Francesa ao brilho misterioso da Cerveja Amanteigada, cada item do nosso cardápio foi escolhido para encantar seu paladar.</p>
          </div>
          
          <div style={styles.features}>
            <div style={styles.featureItem}>
              <Coffee size={28} /> <span>Cafés Especiais</span>
            </div>
            <div style={styles.featureItem}>
              <Sparkles size={28} /> <span>Ambiente Imersivo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
};

// --- ESTILOS ---
const styles: { [key: string]: React.CSSProperties } = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsivo
    gap: '3rem',
    alignItems: 'center',
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    zIndex: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  floatingImage: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '12px',
    border: '4px solid #fcf5e5',
    boxShadow: '0 25px 30px -10px rgba(0, 0, 0, 0.6)',
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '2rem',
    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
  },
  headerLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  line: {
    height: '2px',
    width: '3rem',
    backgroundColor: 'var(--color-wizard-gold)',
  },
  label: {
    fontFamily: 'var(--font-magic)',
    color: 'var(--color-wizard-gold)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
  },
  title: {
    fontSize: '3rem',
    lineHeight: 1.1,
  },
  paragraphContainer: {
    fontSize: '1.2rem',
    color: '#e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    lineHeight: 1.8,
  },
  features: {
    display: 'flex',
    gap: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '2rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: 'var(--color-wizard-gold)',
    fontFamily: 'var(--font-magic)',
    fontSize: '1rem',
  }
};