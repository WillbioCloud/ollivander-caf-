import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Scroll, 
  Coffee, 
  MapPin, 
  Instagram, 
  Facebook, 
  Clock, 
  Menu,
  X,
  Star,
  FlaskConical
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from './constants';
import { Category, MenuItem } from './types';

// --- Sub-components defined here for single-file adherence, 
// usually would be in components/ folder ---

// Particle Effect Component
const MagicParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-wizard-gold rounded-full opacity-60 animate-sparkle"
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

// Menu Card Component
const MenuCard: React.FC<{ item: MenuItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer 
        bg-wizard-parchment text-wizard-dark 
        p-6 rounded-lg shadow-lg border-2 
        transition-all duration-300 hover:-translate-y-2
        ${item.highlight ? 'border-wizard-gold ring-2 ring-wizard-gold/30' : 'border-transparent'}
        bg-texture-paper bg-cover
      `}
    >
      {item.highlight && (
        <div className="absolute -top-3 -right-3 bg-wizard-gold text-wizard-dark rounded-full p-2 shadow-md animate-pulse-slow">
          <Star size={16} fill="currentColor" />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2 border-b border-wizard-brown/20 pb-2">
        <h3 className="font-magic font-bold text-lg md:text-xl leading-tight text-wizard-brown">
          {item.name}
        </h3>
        <span className="font-bold text-wizard-green text-lg whitespace-nowrap ml-4">
          R$ {item.price.toFixed(2).replace('.', ',')}
        </span>
      </div>
      
      {item.description && (
        <p className="font-body text-sm text-wizard-brown/80 italic leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Magical Hover Effect Overlay */}
      <div className="absolute inset-0 bg-wizard-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </div>
  );
};

// Modal Component for details
const ItemModal: React.FC<{ item: MenuItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative bg-wizard-parchment max-w-md w-full rounded-xl p-8 shadow-2xl border-4 border-wizard-gold bg-texture-paper overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-wizard-brown hover:text-wizard-gold transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
           <div className="inline-block p-3 rounded-full bg-wizard-green/10 mb-4">
            <Sparkles className="text-wizard-green" size={32} />
           </div>
           <h2 className="font-magic text-2xl font-bold text-wizard-brown mb-2">{item.name}</h2>
           <span className="inline-block bg-wizard-green text-wizard-gold px-4 py-1 rounded-full font-bold">
             R$ {item.price.toFixed(2).replace('.', ',')}
           </span>
        </div>

        {item.description && (
          <p className="font-body text-wizard-brown/90 text-center italic text-lg mb-8">
            "{item.description}"
          </p>
        )}

        {/* Magical Ingredients Section */}
        {item.magicalIngredients && (
          <div className="mb-8 border-t border-wizard-gold/30 pt-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wizard-parchment px-4 text-wizard-gold">
               <FlaskConical size={20} />
            </div>
            
            <h3 className="font-magic text-lg text-center text-wizard-brown mb-4 font-bold tracking-widest uppercase">
              Ingredientes Secretos
            </h3>
            
            <ul className="space-y-4">
              {item.magicalIngredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/40 p-3 rounded border border-wizard-gold/10 hover:border-wizard-gold/40 transition-colors">
                  <div className="mt-1 text-wizard-gold shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="font-magic font-bold text-wizard-brown/90 block text-base mb-0.5">
                      {ing.name}
                    </span>
                    <span className="text-sm text-wizard-brown/70 italic font-body">
                      {ing.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="w-full bg-wizard-green text-wizard-gold font-magic font-bold py-3 rounded hover:bg-wizard-dark transition-colors border border-wizard-gold shadow-md">
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

  // Handle scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  // Featured items logic
  const featuredDrinks = MENU_ITEMS.filter(item => 
    item.category === 'Drinks Mágicos' && item.highlight
  );

  return (
    <div className="min-h-screen bg-wizard-deep font-body text-wizard-parchment overflow-x-hidden">
      {/* Background Magic */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wizard-green/20 via-wizard-deep to-black -z-20"></div>
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-wizard-deep/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-wizard-gold animate-pulse-slow" />
            <span className="font-magic text-xl md:text-2xl text-wizard-gold font-bold tracking-wider">
              Ollivander Café
            </span>
          </div>
          
          <div className="hidden md:flex gap-8 font-magic text-sm tracking-widest text-wizard-parchment/80">
            <a href="#hero" className="hover:text-wizard-gold transition-colors">Início</a>
            <a href="#sobre" className="hover:text-wizard-gold transition-colors">Sobre</a>
            <a href="#menu" className="hover:text-wizard-gold transition-colors">Cardápio</a>
            <a href="#contact" className="hover:text-wizard-gold transition-colors">Contato</a>
          </div>

          <button className="md:hidden text-wizard-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-wizard-deep border-b border-wizard-gold/20 p-4 flex flex-col gap-4 text-center font-magic shadow-xl">
             <a href="#hero" onClick={() => setIsMenuOpen(false)}>Início</a>
             <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a>
             <a href="#menu" onClick={() => setIsMenuOpen(false)}>Cardápio</a>
             <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contato</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
        <MagicParticles />
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-block animate-float mb-6">
            <img 
              src="https://picsum.photos/150/150?grayscale&blur=2" 
              alt="Logo Placeholder" 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-wizard-gold shadow-[0_0_30px_rgba(212,175,55,0.3)] mx-auto object-cover opacity-80"
              style={{ display: 'none' }} // Hiding placeholder image to rely on typography and icons
            />
            <Scroll size={80} className="text-wizard-gold mx-auto mb-4 opacity-90" strokeWidth={1} />
          </div>
          
          <h1 className="font-magic text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-wizard-gold to-yellow-700 drop-shadow-lg mb-4">
            Ollivander Café
          </h1>
          
          <p className="font-body italic text-xl md:text-2xl text-wizard-parchment/90 mb-10 max-w-2xl mx-auto">
            “Onde cada sabor escolhe você”
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="#menu"
              className="px-8 py-4 bg-wizard-gold text-wizard-deep font-magic font-bold text-lg rounded hover:bg-wizard-goldlight transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Ver Cardápio
            </a>
            <button 
              className="px-8 py-4 border border-wizard-gold text-wizard-gold font-magic font-bold text-lg rounded hover:bg-wizard-gold/10 transition-all opacity-50 cursor-not-allowed"
              title="Em breve"
            >
              Fazer Pedido
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-wizard-gold/50">
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-wizard-dark relative overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-wizard-gold/20 rounded-lg blur-lg transform -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800" 
              alt="Café Interior" 
              className="relative rounded-lg shadow-2xl border border-wizard-gold/30 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-12 bg-wizard-gold"></div>
              <span className="font-magic text-wizard-gold tracking-widest uppercase">Nossa História</span>
            </div>
            <h2 className="font-magic text-4xl font-bold text-wizard-parchment">
              Magia em cada detalhe
            </h2>
            <p className="text-lg leading-relaxed text-wizard-parchment/80">
              Inspirado nas lendas e encantos do mundo bruxo, o <span className="text-wizard-gold font-bold">Ollivander Café</span> não é apenas uma lanchonete, é um portal.
              Aqui, as receitas são poções cuidadosamente preparadas para despertar memórias e criar novos momentos mágicos.
            </p>
            <p className="text-lg leading-relaxed text-wizard-parchment/80">
              Do aroma envolvente do nosso Café na Prensa Francesa ao brilho misterioso da Cerveja Amanteigada, 
              cada item do nosso cardápio foi escolhido para encantar seu paladar.
            </p>
            <div className="pt-4 flex items-center gap-4 text-wizard-gold">
              <Coffee size={28} />
              <span className="font-magic text-sm">Cafés Especiais</span>
              <span className="w-1 h-1 bg-wizard-gold rounded-full"></span>
              <Sparkles size={28} />
              <span className="font-magic text-sm">Ambiente Imersivo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drinks (Potions) */}
      <section className="py-20 bg-gradient-to-b from-wizard-dark to-wizard-deep relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-magic text-4xl md:text-5xl text-wizard-gold mb-4">Poções & Elixires</h2>
            <p className="text-wizard-parchment/70 italic">As especialidades da casa que você precisa provar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrinks.map((drink) => (
              <div 
                key={drink.id}
                onClick={() => setSelectedItem(drink)}
                className="group relative bg-wizard-dark/50 border border-wizard-gold/30 rounded-xl overflow-hidden hover:border-wizard-gold transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden bg-black/40 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10`} />
                  {/* Decorative Icon as placeholder for drink image */}
                  <div className="relative z-0 transform group-hover:scale-110 transition-transform duration-700">
                    <div className="w-32 h-32 rounded-full bg-wizard-gold/10 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    <img 
                       src={`https://picsum.photos/400/400?random=${drink.id}`} // Using generic distinct placeholders
                       className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                       alt={drink.name}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="font-magic text-xl text-wizard-gold mb-1">{drink.name}</h3>
                    <p className="text-sm text-wizard-parchment/80 line-clamp-2">{drink.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu Section */}
      <section id="menu" className="py-24 bg-wizard-parchment bg-texture-paper text-wizard-dark relative">
        {/* Top/Bottom ragged edge effect via CSS could be added here, using simple borders for now */}
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-wizard-deep to-transparent opacity-80"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Scroll className="mx-auto text-wizard-green mb-4" size={48} />
            <h2 className="font-magic text-5xl font-bold text-wizard-green mb-4">Cardápio Oficial</h2>
            <p className="font-body italic text-wizard-brown">Escolha sua categoria e descubra a magia</p>
          </div>

          {/* Category Navigation - Sticky under main nav */}
          <div className="sticky top-20 z-30 bg-wizard-parchment/95 backdrop-blur-sm py-4 mb-8 border-y-2 border-wizard-gold/20 shadow-md -mx-4 px-4 md:mx-0 md:rounded-lg">
            <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 hide-scrollbar md:flex-wrap md:justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    whitespace-nowrap px-6 py-2 rounded-full font-magic font-bold text-sm transition-all duration-300
                    border border-wizard-gold/50
                    ${activeCategory === cat.id 
                      ? 'bg-wizard-green text-wizard-gold shadow-lg scale-105' 
                      : 'bg-transparent text-wizard-brown hover:bg-wizard-brown/10'}
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {filteredItems.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)} 
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-wizard-brown/50 italic">
              Ainda não há itens nesta categoria. A magia está sendo preparada.
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-wizard-deep to-transparent opacity-90 pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-wizard-deep text-wizard-parchment pt-20 pb-10 border-t-4 border-wizard-gold">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-magic text-3xl text-wizard-gold">Ollivander Café</h3>
              <p className="text-wizard-parchment/60 text-sm">
                Uma experiência gastronômica única, trazendo o encanto do mundo bruxo para o seu dia a dia.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-wizard-gold/30 flex items-center justify-center hover:bg-wizard-gold hover:text-wizard-deep transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-wizard-gold/30 flex items-center justify-center hover:bg-wizard-gold hover:text-wizard-deep transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-wizard-gold font-magic text-xl">
                <Clock size={24} />
                <h4>Horário de Magia</h4>
              </div>
              <ul className="space-y-2 text-sm text-wizard-parchment/80">
                <li className="flex justify-between md:justify-start md:gap-8 border-b border-white/10 pb-1">
                  <span>Segunda - Sexta</span>
                  <span>08:00 - 20:00</span>
                </li>
                <li className="flex justify-between md:justify-start md:gap-8 border-b border-white/10 pb-1">
                  <span>Sábado</span>
                  <span>09:00 - 22:00</span>
                </li>
                <li className="flex justify-between md:justify-start md:gap-8 border-b border-white/10 pb-1">
                  <span>Domingo</span>
                  <span>14:00 - 20:00</span>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="space-y-4">
               <div className="flex items-center justify-center md:justify-start gap-2 text-wizard-gold font-magic text-xl">
                <MapPin size={24} />
                <h4>Localização</h4>
              </div>
              <p className="text-wizard-parchment/80">
                Beco Diagonal, nº 93/4<br/>
                (Ou Centro da Cidade)<br/>
                São Paulo - SP
              </p>
              <button className="mt-4 px-6 py-2 border border-wizard-gold/50 rounded hover:bg-wizard-gold hover:text-wizard-deep transition-colors text-sm">
                Ver no Mapa do Maroto
              </button>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-wizard-parchment/40">
            <p>&copy; {new Date().getFullYear()} Ollivander Café. Todos os direitos reservados.</p>
            <p className="mt-2">Site meramente ilustrativo. Imagens de Pexels/Unsplash.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile) */}
      <a 
        href="#menu"
        className={`md:hidden fixed bottom-6 right-6 bg-wizard-gold text-wizard-deep p-4 rounded-full shadow-lg z-50 transition-transform duration-300 ${scrolled ? 'scale-100' : 'scale-0'}`}
      >
        <Menu size={24} />
      </a>

      {/* Detail Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}