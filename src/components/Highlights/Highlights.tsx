import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Sparkles } from 'lucide-react';
import { ParallaxSection } from '../ParallaxSection/ParallaxSection';
import { MENU_ITEMS } from '../../constants'; // Ajuste o caminho se necessário
import { MenuItem } from '../../types'; // Ajuste o caminho
import { ItemModal } from '../Menu/ItemModal'; // Vamos criar esse arquivo já já

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
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: 'spring' }}
                onClick={() => setSelectedItem(item)}
                style={styles.card}
                whileHover={{ y: -12, borderColor: 'var(--color-wizard-gold)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              >
                <div style={styles.cardImageContainer}>
                  <div style={styles.sparkleIcon}>
                    <Sparkles size={64} strokeWidth={1} />
                  </div>
                  <div style={styles.badge}>Recomendado</div>
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

      {/* Modal Reutilizável */}
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
    cursor: 'pointer'
  },
  cardImageContainer: {
    height: '14rem',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 10, 12, 0.3)',
  },
  sparkleIcon: {
    transform: 'scale(1.5)',
    color: 'rgba(212, 175, 55, 0.8)',
    filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.4))'
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
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
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