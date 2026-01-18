import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, FlaskConical } from 'lucide-react';
import { MenuItem } from '../../types';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<Props> = ({ item, onClose }) => {
  const [stage, setStage] = useState<'idle' | 'shaking' | 'expanding' | 'revealing' | 'done'>('idle');

  useEffect(() => {
    if (!item) return;
    
    // Sequência de animação automática
    const t1 = setTimeout(() => setStage('shaking'), 400);   // Treme
    const t2 = setTimeout(() => setStage('expanding'), 1100); // Expande
    const t3 = setTimeout(() => setStage('revealing'), 1600); // Partículas + Imagem
    const t4 = setTimeout(() => setStage('done'), 3500);      // Finaliza

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      setStage('idle');
    };
  }, [item]);

  if (!item) return null;

  // Gerador de Partículas de Alta Densidade (100 partículas)
  const renderParticles = () => {
    const particles = [];
    const particleCount = 100; // Quantidade alta para o efeito denso

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], // Pisca
            scale: [0, Math.random() * 2 + 1, 0], // Cresce e some
            x: (Math.random() - 0.5) * 20, // Pequeno movimento lateral
            y: (Math.random() - 0.5) * 20  // Pequeno movimento vertical
          }}
          transition={{ 
            duration: Math.random() * 1 + 0.5, // Duração aleatória
            delay: Math.random() * 1.5, // Atraso espalhado para criar o efeito "pouco a pouco"
            repeat: 0
          }}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 2 + 'px', // Tamanhos variados (2px a 6px)
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: Math.random() > 0.7 ? '#D4AF37' : '#fff', // Ouro e Branco
            borderRadius: '50%',
            boxShadow: '0 0 4px rgba(255,255,255,0.8)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      );
    }
    return particles;
  };

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
           
           {/* ÁREA DA ANIMAÇÃO MÁGICA */}
           {/* Substituímos a div estática do iconWrapper por este motion.div */}
           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
             <motion.div
               layout
               initial={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: 'rgba(26, 71, 42, 0.15)' }}
               animate={{ 
                 width: stage === 'idle' || stage === 'shaking' ? 60 : '100%',
                 height: stage === 'idle' || stage === 'shaking' ? 60 : 250, // Altura da imagem expandida
                 borderRadius: stage === 'idle' || stage === 'shaking' ? '50%' : '12px',
                 backgroundColor: stage === 'idle' || stage === 'shaking' ? 'rgba(26, 71, 42, 0.15)' : '#000'
               }}
               transition={{ type: "spring", stiffness: 80, damping: 15 }}
               style={{ 
                 position: 'relative', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 overflow: 'hidden',
                 // Mantendo estilo original do iconWrapper
                 padding: stage === 'expanding' || stage === 'revealing' || stage === 'done' ? 0 : '0.75rem'
               }}
             >
                {/* 1. O ÍCONE ORIGINAL (Treme e some) */}
                <AnimatePresence>
                  {(stage === 'idle' || stage === 'shaking') && (
                    <motion.div
                      animate={stage === 'shaking' ? {
                        rotate: [0, -20, 20, -20, 20, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1]
                      } : {}}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles style={{ color: 'var(--color-wizard-green)' }} size={36} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2. AS PARTÍCULAS (Formam a imagem) */}
                {(stage === 'revealing') && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {renderParticles()}
                  </div>
                )}

                {/* 3. A IMAGEM (Aparece suavemente por trás das partículas) */}
                {(stage === 'revealing' || stage === 'done') && (
                  <motion.img
                    src={item.image || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop"}
                    alt={item.name}
                    initial={{ opacity: 0, filter: 'blur(8px) grayscale(100%)' }}
                    animate={{ 
                      opacity: 1, 
                      filter: stage === 'done' ? 'blur(0px) grayscale(0%)' : 'blur(4px) grayscale(20%)'
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }} // Fade in lento acompanhando as partículas
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
             </motion.div>
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
  // O estilo iconWrapper original foi removido daqui pois agora é inline no motion.div para permitir animação
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