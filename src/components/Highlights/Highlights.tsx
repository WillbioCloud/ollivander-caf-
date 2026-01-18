import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion'; // Adicionado useInView
import { FlaskConical } from 'lucide-react';
import { ParallaxSection } from '../ParallaxSection/ParallaxSection';
import { MENU_ITEMS } from '../../constants';
import { MenuItem } from '../../types';
import { ItemModal } from '../Menu/ItemModal';

// --- SUB-COMPONENTE PARA A IMAGEM MÁGICA ---
const MagicCardImage = ({ src, alt }: { src?: string, alt: string }) => {
  const [revealed, setRevealed] = useState(false);
  
  // 1. Criamos uma referência para este componente
  const ref = useRef(null);
  
  // 2. O hook useInView vigia essa referência. 
  // 'once: true' garante que a animação só roda na primeira vez que aparecer.
  // 'margin: "-50px"' faz disparar só quando o elemento já estiver um pouco dentro da tela.
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    // 3. Só iniciamos o timer SE o componente estiver visível (isInView)
    if (isInView) {
      const timer = setTimeout(() => setRevealed(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]); // O efeito roda quando isInView mudar para true

  // Gera partículas fixas (memoizadas)
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1,
      duration: Math.random() * 1 + 1,
      size: Math.random() * 3 + 1
    }));
  }, []);

  return (
    // Conectamos a ref ao container principal
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      
      {/* 1. PARTICULAS (Só aparecem se ainda não revelou e se já estiver visível na tela) */}
      {!revealed && isInView && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: -20 
              }}
              transition={{ 
                duration: p.duration, 
                delay: p.delay,
                repeat: Infinity 
              }}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                backgroundColor: Math.random() > 0.6 ? 'var(--color-wizard-gold)' : '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 5px rgba(255,255,255,0.8)'
              }}
            />
          ))}
        </div>
      )}

      {/* 2. A IMAGEM REAL */}
      <motion.img
        src={src || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop"} 
        alt={alt}
        initial={{ opacity: 0, filter: 'blur(8px) grayscale(100%)' }}
        // A animação agora depende explicitamente do estado 'revealed'
        animate={{ 
          opacity: revealed ? 1 : 0, 
          filter: revealed ? 'blur(0px) grayscale(0%)' : 'blur(5px) grayscale(50%)' 
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transform: 'scale(1.1)'
        }}
      />
      
      <div style={{ 
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' 
      }} />
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (O restante permanece igual, apenas reexportando) ---
export const Highlights = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const featuredItems = MENU_ITEMS.filter(item => item.highlight === true);

  return (
    <>
      <ParallaxSection 
        id="destaques" 
        bgImage="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1920&auto=format&fit=crop"
        overlayColor="rgba(15, 23, 42, 0.6)"
      >
        <div style={{ padding: '2rem 0' }}>
          {/* Cabeçalho */}
          <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 10 }}>
            <motion.div 
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ display: 'inline-block', marginBottom: '1.5rem' }}
            >
              <FlaskConical style={{ color: 'var(--color-wizard-gold)' }} size={50} />
            </motion.div>
            <h2 style={styles.title}>Poções & Elixires</h2>
            <p style={styles.subtitle}>As especialidades da casa que você precisa provar.</p>
          </div>
          
          {/* Grid de Cards */}
          <div style={styles.grid}>
            {featuredItems.slice(0, 4).map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, type: 'spring' }}
                onClick={() => setSelectedItem(item)}
                style={styles.card}
                whileHover={{ 
                  y: -12, 
                  borderColor: 'var(--color-wizard-gold)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
                }}
              >
                <div style={styles.cardImageContainer}>
                  <div style={styles.badge}>Recomendado</div>
                  <MagicCardImage src={item.image} alt={item.name} />
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={styles.cardTitle}>{item.name}</h3>
                  <div style={styles.separator}></div>
                  <p style={styles.cardDesc}>{item.description}</p>
                  <div style={styles.cardFooter}>
                    <span style={styles.priceTag}>R$ {item.price.toFixed(2).replace('.', ',')}</span>
                    <span style={styles.detailsLink}>Ver detalhes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  );
};

// --- ESTILOS ---
const styles: { [key: string]: React.CSSProperties } = {
  title: {
    fontSize: '4rem',
    color: 'var(--color-wizard-gold)',
    marginBottom: '1rem',
    textShadow: '0 4px 8px rgba(0,0,0,0.6)',
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: '1.25rem',
    opacity: 0.9,
    color: '#e5e7eb',
    maxWidth: '600px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    position: 'relative',
    zIndex: 10,
  },
  card: {
    backgroundColor: 'rgba(20, 20, 25, 0.6)', 
    backdropFilter: 'blur(10px)', 
    border: '1px solid rgba(212, 175, 55, 0.3)', 
    borderRadius: '1rem', 
    overflow: 'hidden', 
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  },
  cardImageContainer: {
    height: '14rem',
    position: 'relative',
    backgroundColor: 'rgba(10, 10, 12, 0.5)',
    overflow: 'hidden'
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'var(--color-wizard-gold)',
    color: 'var(--color-wizard-deep)',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '0.3rem 0.8rem',
    borderRadius: '4px',
    fontFamily: 'var(--font-magic)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    zIndex: 20
  },
  cardTitle: {
    fontFamily: 'var(--font-magic)',
    fontSize: '1.4rem',
    marginBottom: '0.5rem',
    color: '#fcf5e5',
  },
  separator: {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(to right, var(--color-wizard-gold), transparent)',
    marginBottom: '1rem',
    opacity: 0.5,
  },
  cardDesc: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    opacity: 0.7,
    marginBottom: '1.25rem',
    color: '#d1d5db',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '2.6rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  priceTag: {
    color: 'var(--color-wizard-green)',
    backgroundColor: 'rgba(26, 71, 42, 0.2)',
    padding: '0.4rem 1rem',
    borderRadius: '50px',
    border: '1px solid rgba(26, 71, 42, 0.4)',
    fontSize: '0.9rem',
  },
  detailsLink: {
    color: 'var(--color-wizard-gold)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  }
};