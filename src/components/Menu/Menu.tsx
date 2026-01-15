import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, FlaskConical, Filter, X, Sparkles } from 'lucide-react';
import { MenuCard } from './MenuCard';
import { ItemModal } from './ItemModal';
import { MENU_ITEMS, CATEGORIES } from '../../constants';
import { Category, MenuItem } from '../../types';

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Menu Executivo');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  const activeLabel = CATEGORIES.find(c => c.id === activeCategory)?.label;

  const handleCategorySelect = (id: Category) => {
    setTimeout(() => {
        setActiveCategory(id);
        setIsFilterOpen(false);
    }, 300);
  };

  return (
    <section id="menu" style={styles.section}>
      <div style={styles.container}>
        
        {/* Cabeçalho */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={styles.header}
        >
          <h2 style={styles.title}>Cardápio Oficial</h2>
          <div style={styles.divider}>
            <span style={styles.line}></span>
            <Scroll size={32} />
            <span style={styles.line}></span>
          </div>
        </motion.div>
        
        {/* Botão de Filtro */}
        <div style={styles.filterContainer}>
            <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(true)}
                style={styles.filterTriggerBtn}
            >
                <Filter size={20} />
                <span>{activeLabel || "Filtrar Cardápio"}</span>
                <span style={styles.filterBadge}>Alterar</span>
            </motion.button>
        </div>
        
        {/* Grid de Itens */}
        <motion.div layout style={styles.grid}>
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </motion.div>
        
        {/* Estado Vazio */}
        {filteredItems.length === 0 && (
          <div style={styles.emptyState}>
            <FlaskConical size={64} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-magic)' }}>Os duendes levaram tudo...</p>
            <p>Ainda não há itens nesta categoria.</p>
          </div>
        )}
      </div>

      {/* MODAL DE FILTRO */}
      <AnimatePresence>
        {isFilterOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.filterOverlay}
                onClick={() => setIsFilterOpen(false)}
            >
                <div style={styles.blurBackground}></div>
                
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    style={styles.filterContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Botão Fechar (X) - Agora com z-index alto e posição clara */}
                    <button 
                        onClick={() => setIsFilterOpen(false)} 
                        style={styles.closeFilterBtn}
                        aria-label="Fechar filtro"
                    >
                        <X size={28} />
                    </button>
                    
                    <h3 style={styles.filterTitle}>Escolha o Tipo</h3>
                    
                    {/* Lista com Rolagem */}
                    <div style={styles.scrollableArea}>
                        <div style={styles.categoriesList}>
                            {CATEGORIES.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <motion.button
                                        key={cat.id}
                                        onClick={() => handleCategorySelect(cat.id)}
                                        whileHover={{ 
                                            scale: 1.05, 
                                            textShadow: "0 0 15px rgba(212, 175, 55, 1), 0 0 30px rgba(255, 223, 0, 0.8)",
                                            color: "#fff"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            ...styles.categoryItemBtn,
                                            color: isActive ? '#fff' : 'rgba(212, 175, 55, 0.7)',
                                            textShadow: isActive ? '0 0 20px rgba(212, 175, 55, 0.8)' : 'none',
                                            border: isActive ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
                                            backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
                                        }}
                                    >
                                        {isActive && <Sparkles size={18} style={{ marginRight: '10px' }} />}
                                        {cat.label}
                                        {isActive && <Sparkles size={18} style={{ marginLeft: '10px' }} />}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Modal do Item */}
      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--color-wizard-parchment)',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
    color: 'var(--color-wizard-dark)',
    position: 'relative',
  },
  container: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', width: '100%'
  },
  header: { textAlign: 'center', marginBottom: '3rem' },
  title: {
    fontSize: '4rem', fontWeight: 'bold', color: 'var(--color-wizard-green)',
    marginBottom: '1rem', textShadow: '0 2px 0px rgba(255,255,255,0.1)'
  },
  divider: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', color: 'rgba(62, 39, 35, 0.6)' },
  line: { height: '2px', width: '4rem', backgroundColor: 'currentColor' },
  
  // Botão Trigger
  filterContainer: {
    display: 'flex', justifyContent: 'center', marginBottom: '4rem', position: 'sticky', top: '6rem', zIndex: 40
  },
  filterTriggerBtn: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    backgroundColor: 'rgba(26, 71, 42, 0.95)',
    color: 'var(--color-wizard-gold)',
    padding: '0.8rem 2rem',
    borderRadius: '50px',
    border: '2px solid var(--color-wizard-gold)',
    fontFamily: 'var(--font-magic)',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(5px)'
  },
  filterBadge: {
    fontSize: '0.7rem', textTransform: 'uppercase', 
    backgroundColor: 'var(--color-wizard-gold)', color: 'var(--color-wizard-deep)',
    padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold'
  },

  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem', minHeight: '400px'
  },
  emptyState: {
    textAlign: 'center', padding: '6rem 0', fontStyle: 'italic',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    color: 'var(--color-wizard-brown)', opacity: 0.6
  },

  // MODAL DE FILTRO
  filterOverlay: {
    position: 'fixed', inset: 0, zIndex: 2000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem'
  },
  blurBackground: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
    backdropFilter: 'blur(8px)',
  },
  filterContent: {
    position: 'relative', zIndex: 2001,
    width: '100%', maxWidth: '500px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '2.5rem 1.5rem',
    borderRadius: '20px',
    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(212,175,55,0.3)',
    maxHeight: '90vh', // Altura máxima para caber na tela
    backgroundColor: 'rgba(15, 23, 42, 0.5)', // Fundo levemente visível dentro do modal
  },
  closeFilterBtn: {
    position: 'absolute', top: '15px', right: '15px',
    background: 'rgba(255,255,255,0.1)', 
    border: 'none', 
    borderRadius: '50%',
    color: 'var(--color-wizard-gold)',
    cursor: 'pointer', 
    padding: '0.5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 10
  },
  filterTitle: {
    fontFamily: 'var(--font-magic)', fontSize: '2rem',
    color: 'var(--color-wizard-gold)', marginBottom: '2rem',
    borderBottom: '1px solid rgba(212,175,55,0.5)', paddingBottom: '1rem',
    width: '100%', textAlign: 'center'
  },
  
  // ÁREA DE ROLAGEM (Aqui acontece a mágica do scroll)
  scrollableArea: {
    width: '100%',
    overflowY: 'auto', // Permite rolar verticalmente
    maxHeight: '60vh', // Limita a altura da lista
    paddingRight: '0.5rem', // Espaço para a barra de rolagem não colar
    // Esconder scrollbar padrão para ficar mais bonito (funciona em Webkit/Chrome/Safari)
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--color-wizard-gold) transparent'
  },

  categoriesList: {
    display: 'flex', flexDirection: 'column', gap: '1rem',
    width: '100%', alignItems: 'center'
  },
  categoryItemBtn: {
    background: 'transparent',
    fontFamily: 'var(--font-magic)',
    fontSize: '1.5rem', 
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '100%', padding: '0.8rem',
    borderRadius: '12px',
    textAlign: 'center'
  }
};