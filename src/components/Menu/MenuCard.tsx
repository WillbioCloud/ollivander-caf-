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
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(212, 175, 55, 0.25)" }}
      onClick={onClick}
      style={{
        ...styles.card,
        border: item.highlight ? '2px solid var(--color-wizard-gold)' : '1px solid rgba(62, 39, 35, 0.1)',
        boxShadow: item.highlight ? '0 0 15px rgba(212, 175, 55, 0.2)' : '0 4px 6px rgba(0,0,0,0.1)'
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
    </motion.div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    position: 'relative',
    backgroundColor: '#fcf5e5',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
    padding: '1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  starBadge: {
    position: 'absolute', top: '-10px', right: '-10px',
    backgroundColor: 'var(--color-wizard-gold)', color: 'var(--color-wizard-dark)',
    borderRadius: '50%', padding: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', zIndex: 20
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    borderBottom: '1px solid rgba(62, 39, 35, 0.15)', paddingBottom: '0.8rem', marginBottom: '0.8rem'
  },
  title: {
    fontFamily: 'var(--font-magic)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-wizard-brown)'
  },
  price: {
    fontWeight: 'bold', color: 'var(--color-wizard-green)', fontSize: '1.1rem', marginLeft: '1rem', whiteSpace: 'nowrap'
  },
  desc: {
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.8, color: 'var(--color-wizard-brown)'
  }
};