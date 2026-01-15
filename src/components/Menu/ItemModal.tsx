import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, FlaskConical } from 'lucide-react';
import { MenuItem } from '../../types';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<Props> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={styles.content}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={styles.closeBtn}>
          <X size={28} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
           <div style={styles.iconWrapper}>
            <Sparkles style={{ color: 'var(--color-wizard-green)' }} size={36} />
           </div>
           <h2 style={styles.title}>{item.name}</h2>
           <span style={styles.priceTag}>
             R$ {item.price.toFixed(2).replace('.', ',')}
           </span>
        </div>

        {item.description && (
          <p style={styles.description}>"{item.description}"</p>
        )}

        {item.magicalIngredients && (
          <div style={styles.ingredientsSection}>
            <div style={styles.flaskIcon}>
               <FlaskConical size={24} />
            </div>
            <h3 style={styles.ingredientsTitle}>Segredos da Receita</h3>
            <ul style={styles.list}>
              {item.magicalIngredients.map((ing, idx) => (
                <li key={idx} style={styles.listItem}>
                  <div style={{ color: 'var(--color-wizard-gold)', marginTop: '4px' }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span style={styles.ingName}>{ing.name}</span>
                    <span style={styles.ingDesc}>{ing.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button style={styles.btnAdd}>Adicionar ao Pedido (Em Breve)</button>
      </motion.div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', zIndex: 2000, padding: '1rem',
  },
  content: {
    backgroundColor: 'var(--color-wizard-parchment)',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
    width: '100%', maxWidth: '500px', borderRadius: '12px', padding: '2.5rem',
    border: '4px double var(--color-wizard-gold)', maxHeight: '90vh',
    overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    color: 'var(--color-wizard-brown)',
  },
  closeBtn: {
    position: 'absolute', top: '1rem', right: '1rem',
    color: 'var(--color-wizard-brown)', cursor: 'pointer', background: 'none', border: 'none'
  },
  iconWrapper: {
    display: 'inline-block', padding: '0.75rem', borderRadius: '50%',
    marginBottom: '1rem', backgroundColor: 'rgba(26, 71, 42, 0.15)'
  },
  title: {
    fontFamily: 'var(--font-magic)', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem'
  },
  priceTag: {
    display: 'inline-block', padding: '0.4rem 1.25rem', borderRadius: '50px',
    fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'var(--color-wizard-green)', color: 'var(--color-wizard-gold)', fontSize: '1.1rem'
  },
  description: {
    textAlign: 'center', fontStyle: 'italic', fontSize: '1.25rem',
    marginBottom: '2rem', lineHeight: 1.6, color: 'rgba(62, 39, 35, 0.9)'
  },
  ingredientsSection: {
    marginBottom: '2rem', paddingTop: '1.5rem', position: 'relative',
    borderTop: '2px dashed rgba(212, 175, 55, 0.4)'
  },
  flaskIcon: {
    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
    backgroundColor: '#fcf5e5', padding: '0 1rem', color: 'var(--color-wizard-gold)'
  },
  ingredientsTitle: {
    fontFamily: 'var(--font-magic)', fontSize: '1.1rem', textAlign: 'center',
    marginBottom: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px',
    marginTop: '0.5rem'
  },
  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  listItem: {
    display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem',
    borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(212, 175, 55, 0.2)'
  },
  ingName: {
    fontFamily: 'var(--font-magic)', fontWeight: 'bold', display: 'block', fontSize: '1rem', color: '#3e2723'
  },
  ingDesc: { fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(62, 39, 35, 0.8)' },
  btnAdd: {
    width: '100%', padding: '1rem', background: 'linear-gradient(45deg, #D4AF37, #F4D03F)',
    color: '#0f172a', border: '1px solid #F4D03F', fontWeight: 'bold', fontFamily: 'var(--font-magic)',
    cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase'
  }
};