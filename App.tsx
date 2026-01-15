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

// --- Componentes visuais ---

// Efeito de Partículas Mágicas (Mantido para atmosfera)
const MagicParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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

// Componente Card do Menu
const MenuCard: React.FC<{ item: MenuItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer 
        bg-wizard-parchment text-wizard-dark 
        p-6 rounded-lg shadow-lg border-2 
        transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]
        ${item.highlight ? 'border-wizard-gold ring-2 ring-wizard-gold/30' : 'border-transparent'}
        bg-texture-paper bg-cover
      `}
    >
      {item.highlight && (
        <div className="absolute -top-3 -right-3 bg-wizard-gold text-wizard-dark rounded-full p-2 shadow-md animate-pulse-slow z-20">
          <Star size={16} fill="currentColor" />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2 border-b border-wizard-brown/20 pb-2">
        <h3 className="font-magic font-bold text-lg md:text-xl leading-tight text-wizard-brown group-hover:text-wizard-gold transition-colors">
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

      {/* Efeito Mágico Hover Overlay */}
      <div className="absolute inset-0 bg-wizard-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </div>
  );
};

// Modal de Detalhes
const ItemModal: React.FC<{ item: MenuItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="relative bg-wizard-parchment max-w-md w-full rounded-xl p-8 shadow-2xl border-4 border-wizard-gold bg-texture-paper overflow-y-auto max-h-[90vh] scale-100 animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-wizard-brown hover:text-wizard-gold transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
           <div className="inline-block p-3 rounded-full bg-wizard-green/10 mb-4 shadow-inner">
            <Sparkles className="text-wizard-green" size={32} />
           </div>
           <h2 className="font-magic text-2xl font-bold text-wizard-brown mb-2">{item.name}</h2>
           <span className="inline-block bg-wizard-green text-wizard-gold px-4 py-1 rounded-full font-bold shadow-sm">
             R$ {item.price.toFixed(2).replace('.', ',')}
           </span>
        </div>

        {item.description && (
          <p className="font-body text-wizard-brown/90 text-center italic text-lg mb-8">
            "{item.description}"
          </p>
        )}

        {/* Ingredientes Mágicos */}
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

  // Controle de scroll para a navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  // Destaques (Drinks Mágicos e Sobremesas Especiais)
  const featuredItems = MENU_ITEMS.filter(item => 
    item.highlight === true
  );

  return (
    <div className="min-h-screen bg-wizard-deep font-body text-wizard-parchment overflow-x-hidden">
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-wizard-deep/95 backdrop-blur-md shadow-lg py-2 border-b border-wizard-gold/20' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 border border-wizard-gold rounded-full group-hover:rotate-180 transition-transform duration-700">
               <Sparkles className="text-wizard-gold" size={20} />
            </div>
            <span className="font-magic text-xl md:text-2xl text-wizard-gold font-bold tracking-wider group-hover:text-white transition-colors">
              Ollivander Café
            </span>
          </div>
          
          <div className="hidden md:flex gap-8 font-magic text-sm tracking-widest text-wizard-parchment/80 uppercase">
            <a href="#hero" className="hover:text-wizard-gold hover:underline decoration-wizard-gold underline-offset-4 transition-all">Início</a>
            <a href="#sobre" className="hover:text-wizard-gold hover:underline decoration-wizard-gold underline-offset-4 transition-all">Sobre</a>
            <a href="#destaques" className="hover:text-wizard-gold hover:underline decoration-wizard-gold underline-offset-4 transition-all">Destaques</a>
            <a href="#menu" className="hover:text-wizard-gold hover:underline decoration-wizard-gold underline-offset-4 transition-all">Cardápio</a>
          </div>

          <button className="md:hidden text-wizard-gold hover:text-white transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-wizard-deep border-b border-wizard-gold/20 p-6 flex flex-col gap-6 text-center font-magic shadow-xl bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
             <a href="#hero" onClick={() => setIsMenuOpen(false)} className="text-wizard-gold text-lg">Início</a>
             <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="text-wizard-parchment hover:text-wizard-gold">Sobre</a>
             <a href="#destaques" onClick={() => setIsMenuOpen(false)} className="text-wizard-parchment hover:text-wizard-gold">Destaques</a>
             <a href="#menu" onClick={() => setIsMenuOpen(false)} className="text-wizard-parchment hover:text-wizard-gold">Cardápio</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION COM PARALLAX --- */}
      {/* Usamos bg-fixed para o efeito parallax CSS puro */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center pt-16 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544965838-54ef8406f868?q=80&w=1920&auto=format&fit=crop')" // Imagem de biblioteca antiga/mágica
        }}
      >
        {/* Overlay Escuro para leitura */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-wizard-deep via-transparent to-black/30 z-0"></div>
        
        <MagicParticles />

        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-block animate-float mb-6">
            <Scroll size={80} className="text-wizard-gold mx-auto mb-4 opacity-90 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" strokeWidth={1} />
          </div>
          
          <h1 className="font-magic text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-wizard-gold to-yellow-800 drop-shadow-2xl mb-4 tracking-tight">
            Ollivander Café
          </h1>
          
          <p className="font-body italic text-xl md:text-2xl text-wizard-parchment/90 mb-10 max-w-2xl mx-auto drop-shadow-md border-t border-b border-wizard-gold/30 py-4">
            “Onde cada sabor escolhe você”
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a 
              href="#menu"
              className="px-10 py-4 bg-wizard-gold/90 backdrop-blur-sm text-wizard-deep font-magic font-bold text-lg rounded border border-wizard-gold hover:bg-wizard-gold hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Ver Cardápio
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-wizard-gold/70">
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </div>
      </section>

      {/* --- SOBRE NÓS COM PARALLAX --- */}
      <section 
        id="sobre" 
        className="py-24 relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1920')" // Imagem de cafeteria rústica
        }}
      >
        {/* Overlay pesado para destacar o texto sobre a imagem parallax */}
        <div className="absolute inset-0 bg-wizard-dark/90 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Coluna Imagem (Polaroid style) */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-wizard-gold/30 rounded-sm blur-xl transform -rotate-2 group-hover:rotate-0 transition-all duration-700 opacity-60"></div>
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
                alt="Detalhe do Café" 
                className="relative rounded-sm shadow-2xl border-4 border-wizard-parchment sepia-[0.3] group-hover:sepia-0 transition-all duration-700 transform rotate-2 group-hover:rotate-0"
              />
            </div>

            {/* Coluna Texto */}
            <div className="space-y-8 text-wizard-parchment">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-16 bg-wizard-gold"></div>
                  <span className="font-magic text-wizard-gold tracking-[0.2em] uppercase text-sm">Nossa História</span>
                </div>
                <h2 className="font-magic text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Magia em cada <span className="text-wizard-gold">detalhe</span>
                </h2>
              </div>
              
              <div className="space-y-4 font-body text-lg leading-relaxed text-gray-300">
                <p>
                  Inspirado nas lendas e encantos do mundo bruxo, o <strong className="text-wizard-gold font-normal">Ollivander Café</strong> não é apenas uma lanchonete, é um portal.
                  Aqui, as receitas são poções cuidadosamente preparadas para despertar memórias e criar novos momentos mágicos.
                </p>
                <p>
                  Do aroma envolvente do nosso Café na Prensa Francesa ao brilho misterioso da Cerveja Amanteigada, 
                  cada item do nosso cardápio foi escolhido para encantar seu paladar.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-8">
                <div className="flex items-center gap-3 text-wizard-gold">
                  <div className="p-2 border border-wizard-gold/30 rounded-full">
                    <Coffee size={24} />
                  </div>
                  <span className="font-magic text-sm tracking-wider">Cafés Especiais</span>
                </div>
                <div className="flex items-center gap-3 text-wizard-gold">
                  <div className="p-2 border border-wizard-gold/30 rounded-full">
                    <Sparkles size={24} />
                  </div>
                  <span className="font-magic text-sm tracking-wider">Ambiente Imersivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTAQUES COM PARALLAX --- */}
      <section 
        id="destaques" 
        className="py-24 relative bg-fixed bg-center bg-cover"
        style={{
           backgroundImage: "url('https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1920&auto=format&fit=crop')" // Imagem mística/livros/poções
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-wizard-deep/95 via-wizard-deep/80 to-wizard-parchment z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-2">
              <FlaskConical className="text-wizard-gold mx-auto animate-pulse" size={40} />
            </div>
            <h2 className="font-magic text-4xl md:text-6xl text-wizard-gold mb-4 drop-shadow-lg">
              Poções & Elixires
            </h2>
            <p className="text-wizard-parchment/70 italic text-xl font-body max-w-xl mx-auto">
              As especialidades da casa que você precisa provar antes que o feitiço acabe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.slice(0, 4).map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-black/40 backdrop-blur-sm border border-wizard-gold/30 rounded-xl overflow-hidden hover:border-wizard-gold hover:bg-black/60 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-2"
              >
                {/* Imagem Placeholder Decorativa */}
                <div className="h-48 relative overflow-hidden flex items-center justify-center bg-wizard-dark/50">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-wizard-gold/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Ícone representando o item se não houver imagem real */}
                  <div className="transform group-hover:scale-125 transition-transform duration-700 text-wizard-gold/80">
                    <Sparkles size={64} strokeWidth={1} />
                  </div>
                  
                  {/* Etiqueta de Destaque */}
                  <div className="absolute top-3 right-3 bg-wizard-gold text-wizard-deep text-xs font-bold px-2 py-1 rounded font-magic shadow-sm">
                    Recomendado
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-magic text-xl text-wizard-parchment mb-2 group-hover:text-wizard-gold transition-colors truncate">
                    {item.name}
                  </h3>
                  <div className="w-12 h-px bg-wizard-gold/50 mb-3 group-hover:w-full transition-all duration-500"></div>
                  <p className="text-sm text-wizard-parchment/60 line-clamp-2 font-body italic mb-4 h-10">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-wizard-green bg-wizard-green/10 px-3 py-1 rounded-full border border-wizard-green/20">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-wizard-gold text-xs uppercase tracking-widest group-hover:underline">
                      Ver detalhes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MENU COMPLETO --- */}
      <section id="menu" className="py-24 bg-wizard-parchment bg-texture-paper text-wizard-dark relative shadow-inner">
        {/* Borda rasgada (efeito visual simples com CSS gradient) */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-wizard-deep to-transparent opacity-40 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-magic text-5xl font-bold text-wizard-green mb-4 drop-shadow-sm">Cardápio Oficial</h2>
            <div className="flex items-center justify-center gap-4 text-wizard-brown/60">
              <span className="h-px w-12 bg-current"></span>
              <Scroll size={24} />
              <span className="h-px w-12 bg-current"></span>
            </div>
          </div>

          {/* Category Navigation - Sticky */}
          <div className="sticky top-20 z-30 bg-wizard-parchment/95 backdrop-blur-md py-4 mb-10 border-y border-wizard-gold/30 shadow-md -mx-4 px-4 md:mx-0 md:rounded-lg">
            <div className="flex overflow-x-auto gap-3 pb-2 md:pb-0 hide-scrollbar md:flex-wrap md:justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    whitespace-nowrap px-6 py-2 rounded-full font-magic font-bold text-xs md:text-sm transition-all duration-300
                    border
                    ${activeCategory === cat.id 
                      ? 'bg-wizard-green text-wizard-gold border-wizard-gold shadow-md scale-105' 
                      : 'bg-transparent text-wizard-brown border-wizard-brown/30 hover:bg-wizard-brown/10 hover:border-wizard-brown'}
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {filteredItems.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)} 
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-32 text-wizard-brown/50 italic flex flex-col items-center">
              <FlaskConical size={48} className="mb-4 opacity-50" />
              <p className="text-xl">Ainda não há itens nesta categoria.</p>
              <p className="text-sm mt-2">Os elfos domésticos estão trabalhando nisso.</p>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-wizard-deep to-transparent opacity-90 pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-wizard-deep text-wizard-parchment pt-20 pb-10 border-t-4 border-wizard-gold relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            
            {/* Brand */}
            <div className="space-y-6">
              <h3 className="font-magic text-3xl text-wizard-gold">Ollivander Café</h3>
              <p className="text-wizard-parchment/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Uma experiência gastronômica única, trazendo o encanto do mundo bruxo para o seu dia a dia. Prepare sua varinha e seu apetite.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-wizard-gold/30 flex items-center justify-center hover:bg-wizard-gold hover:text-wizard-deep transition-all duration-300">
                  <Instagram size={22} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-wizard-gold/30 flex items-center justify-center hover:bg-wizard-gold hover:text-wizard-deep transition-all duration-300">
                  <Facebook size={22} />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-3 text-wizard-gold font-magic text-xl">
                <Clock size={24} />
                <h4>Horário de Magia</h4>
              </div>
              <ul className="space-y-3 text-sm text-wizard-parchment/80 font-body">
                <li className="flex justify-between md:justify-start md:gap-12 border-b border-white/5 pb-2">
                  <span>Segunda - Sexta</span>
                  <span>08:00 - 20:00</span>
                </li>
                <li className="flex justify-between md:justify-start md:gap-12 border-b border-white/5 pb-2">
                  <span>Sábado</span>
                  <span>09:00 - 22:00</span>
                </li>
                <li className="flex justify-between md:justify-start md:gap-12 border-b border-white/5 pb-2">
                  <span>Domingo</span>
                  <span>14:00 - 20:00</span>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="space-y-6">
               <div className="flex items-center justify-center md:justify-start gap-3 text-wizard-gold font-magic text-xl">
                <MapPin size={24} />
                <h4>Localização</h4>
              </div>
              <p className="text-wizard-parchment/80 leading-relaxed font-body">
                Beco Diagonal, nº 93/4<br/>
                (Ou Centro da Cidade)<br/>
                São Paulo - SP
              </p>
              <button className="mt-4 px-8 py-3 border border-wizard-gold/50 rounded hover:bg-wizard-gold hover:text-wizard-deep transition-all font-magic text-xs uppercase tracking-widest">
                Ver no Mapa do Maroto
              </button>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-wizard-parchment/30 font-magic">
            <p>&copy; {new Date().getFullYear()} Ollivander Café. Todos os direitos reservados. Feito com magia.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile) */}
      <a 
        href="#menu"
        className={`md:hidden fixed bottom-6 right-6 bg-wizard-gold text-wizard-deep p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] z-50 transition-transform duration-300 hover:scale-110 active:scale-95 ${scrolled ? 'scale-100' : 'scale-0'}`}
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