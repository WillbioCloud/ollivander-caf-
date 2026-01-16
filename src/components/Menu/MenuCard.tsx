import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { MenuItem } from '../../types';

interface Props {
  item: MenuItem;
  onClick: () => void;
}

export const MenuCard: React.FC<Props> = ({ item, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
      onClick={onClick}
      style={{
        ...styles.card,
        // Se for destaque, borda dourada. Se não, borda sutil.
        border: item.highlight ? '2px solid var(--color-wizard-gold)' : '1px solid rgba(212, 175, 55, 0.3)',
      }}
    >
      {item.highlight && (
        <div style={styles.starBadge}>
          <Star size={18} fill="currentColor" />
        </div>
      )}
      
      <div style={styles.header}>
        <h3 style={styles.title}>{item.name}</h3>
        <span style={styles.price}>
          R$ {item.price.toFixed(2).replace('.', ',')}
        </span>
      </div>
      
      {item.description && (
        <p style={styles.desc}>{item.description}</p>
      )}
      
      {/* Botão sutil "Ver mais" para incentivar o clique */}
      <div style={styles.footer}>
        <span style={styles.moreDetails}>Toque para detalhes</span>
      </div>
    </motion.div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    position: 'relative',
    // MUDANÇA PRINCIPAL: Fundo branco semi-transparente para contrastar com o fundo bege do site
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(5px)', // Efeito moderno
    padding: '1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', // Sombra inicial leve
    transition: 'border-color 0.3s ease',
  },
  starBadge: {
    position: 'absolute', top: '-10px', right: '-10px',
    backgroundColor: 'var(--color-wizard-gold)', color: 'var(--color-wizard-dark)',
    borderRadius: '50%', padding: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', zIndex: 20
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    borderBottom: '1px dashed rgba(62, 39, 35, 0.2)', // Linha pontilhada mais leve
    paddingBottom: '0.8rem', marginBottom: '0.8rem',
    gap: '1rem'
  },
  title: {
    fontFamily: 'var(--font-magic)', fontSize: '1.3rem', fontWeight: 'bold', 
    color: '#2c1810', lineHeight: 1.2
  },
  price: {
    fontWeight: 'bold', color: 'var(--color-wizard-green)', 
    fontSize: '1.1rem', whiteSpace: 'nowrap',
    backgroundColor: 'rgba(26, 71, 42, 0.1)', padding: '2px 8px', borderRadius: '4px'
  },
  desc: {
    fontFamily: 'var(--font-body)', fontSize: '0.95rem', 
    fontStyle: 'italic', opacity: 0.85, color: '#4a3b32',
    lineHeight: 1.5, marginBottom: '1rem'
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'right'
  },
  moreDetails: {
    fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px',
    color: 'var(--color-wizard-gold)', fontWeight: 'bold'
  }
};