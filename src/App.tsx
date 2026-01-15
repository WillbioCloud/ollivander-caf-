import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Scroll, Coffee, MapPin, Instagram, Facebook, Clock, Menu, X, Star, FlaskConical
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from './constants';
import { Category, MenuItem } from './types';
import './index.css';

// --- Componentes visuais ---

const MagicParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="magic-particle animate-sparkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
    </div>
  );
};

const MenuCard: React.FC<{ item: MenuItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`menu-card ${item.highlight ? 'highlight' : ''}`}
    >
      {item.highlight && (
        <div className="absolute -top-3 -right-3 bg-[var(--color-wizard-gold)] text-[var(--color-wizard-dark)] rounded-full p-2 shadow-md animate-pulse z-20">
          <Star size={16} fill="currentColor" />
        </div>
      )}
      
      <div className="menu-card-header">
        <h3 className="menu-card-title">
          {item.name}
        </h3>
        <span className="menu-card-price">
          R$ {item.price.toFixed(2).replace('.', ',')}
        </span>
      </div>
      
      {item.description && (
        <p className="font-body text-sm italic opacity-80" style={{ color: 'var(--color-wizard-brown)' }}>
          {item.description}
        </p>
      )}
    </div>
  );
};

const ItemModal: React.FC<{ item: MenuItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-wizard-brown)', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
           <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(26, 71, 42, 0.1)' }}>
            <Sparkles style={{ color: 'var(--color-wizard-green)' }} size={32} />
           </div>
           <h2 className="font-magic text-2xl font-bold mb-2" style={{ color: 'var(--color-wizard-brown)' }}>
             {item.name}
           </h2>
           <span className="inline-block px-4 py-1 rounded-full font-bold shadow-sm" style={{ backgroundColor: 'var(--color-wizard-green)', color: 'var(--color-wizard-gold)' }}>
             R$ {item.price.toFixed(2).replace('.', ',')}
           </span>
        </div>

        {item.description && (
          <p className="text-center italic text-lg mb-8" style={{ color: 'rgba(62, 39, 35, 0.9)' }}>
            "{item.description}"
          </p>
        )}

        {item.magicalIngredients && (
          <div className="mb-8 pt-6 relative" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fcf5e5', padding: '0 1rem', color: 'var(--color-wizard-gold)' }}>
               <FlaskConical size={20} />
            </div>
            <h3 className="font-magic text-lg text-center mb-4 font-bold uppercase" style={{ color: 'var(--color-wizard-brown)', letterSpacing: '2px' }}>
              Ingredientes Secretos
            </h3>
            <ul className="flex flex-col gap-4">
              {item.magicalIngredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-4 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                  <div style={{ color: 'var(--color-wizard-gold)', marginTop: '4px' }}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="font-magic font-bold block text-base mb-1" style={{ color: 'rgba(62, 39, 35, 0.9)' }}>
                      {ing.name}
                    </span>
                    <span className="text-sm italic" style={{ color: 'rgba(62, 39, 35, 0.7)' }}>
                      {ing.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn btn-gold" style={{ width: '100%', marginTop: '1rem' }}>
          Adicionar ao Pedido (Em Breve)
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Menu Executivo');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  const featuredItems = MENU_ITEMS.filter(item => item.highlight === true);

  return (
    <div className="app-container">
      
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-4" style={{ cursor: 'pointer' }}>
            {/* LOGO NA NAVBAR */}
            <img src="/logo.png" alt="Ollivander Café" className="logo-img navbar-logo" />
          </a>
          
          <div className="hidden md:flex gap-8">
            <a href="#hero" className="nav-link">Início</a>
            <a href="#sobre" className="nav-link">Sobre</a>
            <a href="#destaques" className="nav-link">Destaques</a>
            <a href="#menu" className="nav-link">Cardápio</a>
          </div>

          <button className="md:hidden" style={{ color: 'var(--color-wizard-gold)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMenuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'var(--color-wizard-deep)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
             <a href="#hero" className="nav-link" onClick={() => setIsMenuOpen(false)}>Início</a>
             <a href="#sobre" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sobre</a>
             <a href="#destaques" className="nav-link" onClick={() => setIsMenuOpen(false)}>Destaques</a>
             <a href="#menu" className="nav-link" onClick={() => setIsMenuOpen(false)}>Cardápio</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="parallax-section bg-hero">
        <div className="overlay-dark"></div>
        <MagicParticles />
        <div className="container text-center relative-z10 flex flex-col items-center">
          <div className="animate-float" style={{ marginBottom: '1.5rem' }}>
            <Scroll size={60} style={{ color: 'var(--color-wizard-gold)', opacity: 0.9 }} strokeWidth={1} />
          </div>
          
          {/* LOGO PRINCIPAL NO HERO */}
          <img src="/logo.png" alt="Ollivander Café" className="logo-img hero-logo animate-pulse" />
          
          <p className="hero-subtitle">
            “Onde cada sabor escolhe você”
          </p>
          
          <div>
            <a href="#menu" className="btn btn-gold">
              Ver Cardápio
            </a>
          </div>
        </div>
      </section>

      {/* --- SOBRE NÓS --- */}
      <section id="sobre" className="parallax-section bg-about section-padding">
        <div className="overlay-dark" style={{ backgroundColor: 'rgba(26, 26, 29, 0.9)' }}></div>
        <div className="container relative-z10">
          <div className="grid md:grid-cols-2">
            
            <div className="rotate-on-hover-desktop">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
                alt="Detalhe do Café" 
                style={{ width: '100%', borderRadius: '4px', border: '4px solid #fcf5e5', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', filter: 'sepia(30%)' }}
              />
            </div>

            <div className="flex flex-col justify-center gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--color-wizard-gold)' }}></div>
                  <span className="font-magic" style={{ color: 'var(--color-wizard-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.875rem' }}>Nossa História</span>
                </div>
                <h2 style={{ fontSize: '3rem', lineHeight: 1.1 }}>
                  Magia em cada <span style={{ color: 'var(--color-wizard-gold)' }}>detalhe</span>
                </h2>
              </div>
              <div style={{ fontSize: '1.125rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>Inspirado nas lendas e encantos do mundo bruxo, o <strong style={{ color: 'var(--color-wizard-gold)' }}>Ollivander Café</strong> não é apenas uma lanchonete, é um portal.</p>
                <p>Do aroma envolvente do nosso Café na Prensa Francesa ao brilho misterioso da Cerveja Amanteigada, cada item do nosso cardápio foi escolhido para encantar seu paladar.</p>
              </div>
              <div className="flex gap-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div className="flex items-center gap-3" style={{ color: 'var(--color-wizard-gold)' }}>
                  <Coffee size={24} /> <span className="font-magic text-sm">Cafés Especiais</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: 'var(--color-wizard-gold)' }}>
                  <Sparkles size={24} /> <span className="font-magic text-sm">Ambiente Imersivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTAQUES --- */}
      <section id="destaques" className="parallax-section bg-featured section-padding">
        <div className="overlay-gradient"></div>
        <div className="container relative-z10">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem' }} className="animate-pulse">
              <FlaskConical style={{ color: 'var(--color-wizard-gold)' }} size={40} />
            </div>
            {/* Título com acento corrigido pelo CSS global */}
            <h2 style={{ fontSize: '3.5rem', color: 'var(--color-wizard-gold)', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Poções & Elixires
            </h2>
            <p className="italic text-xl opacity-80" style={{ maxWidth: '600px', margin: '0 auto' }}>As especialidades da casa que você precisa provar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {featuredItems.slice(0, 4).map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.4)', 
                  backdropFilter: 'blur(4px)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '0.75rem', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                className="hover:translate-y-[-5px]"
              >
                <div style={{ height: '12rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(26, 26, 29, 0.5)' }}>
                  <div style={{ transform: 'scale(1.2)', color: 'rgba(212, 175, 55, 0.8)' }}>
                    <Sparkles size={64} strokeWidth={1} />
                  </div>
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', backgroundColor: 'var(--color-wizard-gold)', color: 'var(--color-wizard-deep)', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontFamily: 'var(--font-magic)' }}>Recomendado</div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 className="font-magic" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fcf5e5' }}>{item.name}</h3>
                  <div style={{ width: '3rem', height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.5)', marginBottom: '0.75rem' }}></div>
                  <p className="text-sm italic opacity-60 mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.5rem' }}>{item.description}</p>
                  <div className="flex justify-between items-center font-bold">
                    <span style={{ color: 'var(--color-wizard-green)', backgroundColor: 'rgba(26, 71, 42, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(26, 71, 42, 0.2)', fontSize: '0.875rem' }}>R$ {item.price.toFixed(2).replace('.', ',')}</span>
                    <span style={{ color: 'var(--color-wizard-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ver detalhes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MENU COMPLETO --- */}
      <section id="menu" className="section-padding menu-grid-bg">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            {/* Título com acento corrigido */}
            <h2 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--color-wizard-green)', marginBottom: '1rem' }}>Cardápio Oficial</h2>
            <div className="flex items-center justify-center gap-4" style={{ color: 'rgba(62, 39, 35, 0.6)' }}><span style={{ height: '1px', width: '3rem', backgroundColor: 'currentColor' }}></span><Scroll size={24} /><span style={{ height: '1px', width: '3rem', backgroundColor: 'currentColor' }}></span></div>
          </div>
          <div style={{ position: 'sticky', top: '5rem', zIndex: 30, backgroundColor: 'rgba(252, 245, 229, 0.95)', backdropFilter: 'blur(8px)', padding: '1rem 0', marginBottom: '2.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.3)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <div className="category-scroll flex justify-center">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ minHeight: '400px' }}>
            {filteredItems.map((item) => <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />)}
          </div>
          {filteredItems.length === 0 && <div className="text-center py-20 italic flex flex-col items-center" style={{ color: 'rgba(62, 39, 35, 0.5)' }}><FlaskConical size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} /><p className="text-xl">Ainda não há itens nesta categoria.</p></div>}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="grid md:grid-cols-3 text-center md:text-left gap-8">
            <div className="flex flex-col gap-4 items-center md:items-start">
              {/* LOGO NO FOOTER */}
              <img src="/logo.png" alt="Ollivander Café" className="logo-img footer-logo" />
              <p className="text-sm opacity-60 leading-relaxed mt-4">Uma experiência gastronômica única, trazendo o encanto do mundo bruxo para o seu dia a dia.</p>
              <div className="flex justify-center md:justify-start gap-4 mt-2">
                <a href="#" style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-wizard-gold)' }}><Instagram size={20} /></a>
                <a href="#" style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-wizard-gold)' }}><Facebook size={20} /></a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* Título com acento corrigido */}
              <div className="flex items-center justify-center md:justify-start gap-3" style={{ color: 'var(--color-wizard-gold)' }}><Clock size={24} /><h4 className="font-magic text-xl">Horário de Magia</h4></div>
              <ul className="text-sm opacity-80 flex flex-col gap-2">
                <li className="flex justify-between md:justify-start md:gap-8 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span>Segunda - Sexta</span><span>08:00 - 20:00</span></li>
                <li className="flex justify-between md:justify-start md:gap-8 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span>Sábado</span><span>09:00 - 22:00</span></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
               {/* Título com acento corrigido */}
               <div className="flex items-center justify-center md:justify-start gap-3" style={{ color: 'var(--color-wizard-gold)' }}><MapPin size={24} /><h4 className="font-magic text-xl">Localização</h4></div>
              <p className="opacity-80 leading-relaxed">Beco Diagonal, nº 93/4<br/>São Paulo - SP</p>
            </div>
          </div>
          <div className="text-center text-xs opacity-30 mt-16 pt-8 font-magic" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}><p>&copy; {new Date().getFullYear()} Ollivander Café. Todos os direitos reservados. Feito com magia.</p></div>
        </div>
      </footer>
      <a href="#menu" className={scrolled ? 'visible' : 'hidden'} style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', backgroundColor: 'var(--color-wizard-gold)', color: 'var(--color-wizard-deep)', padding: '1rem', borderRadius: '50%', boxShadow: '0 0 20px rgba(212,175,55,0.5)', zIndex: 50, display: scrolled ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}><Menu size={24} /></a>
      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}