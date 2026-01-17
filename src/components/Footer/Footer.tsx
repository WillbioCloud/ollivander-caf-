import React from 'react';
import { Instagram, MessageCircle, Clock, MapPin, Phone, ExternalLink } from 'lucide-react';

export const Footer = () => {
  // Gera o link de busca exato para o Google Maps
  const addressQuery = encodeURIComponent("R. Cap. João Crisóstomo, qd 10 - lt 05 - Centro, Caldas Novas - GO, 75680-029");
  const mapLink = 'https://maps.app.goo.gl/zsm4wQWpsXE6GbUP7';
  
  // Link do WhatsApp
  const whatsappLink = "https://web.whatsapp.com/send/?phone=5564992094814&text=Ol%C3%A1%2C+conheci+voc%C3%AAs+pelo+Instagram.+Quero+saber+mais+informa%C3%A7%C3%B5es."; 

  return (
    <footer id="contact" style={styles.footer}>
      {/* Detalhe decorativo no topo */}
      <div style={styles.topBorder}></div>

      <div style={styles.container}>
        <div style={styles.grid}>
          
          {/* Coluna 1: Marca e Redes */}
          <div style={styles.col}>
            <img src="/logo.png" alt="Ollivander Café" style={styles.logo} />
            <p style={styles.text}>
              Uma experiência gastronômica única, onde a magia acontece em cada detalhe e sabor.
            </p>
            <div style={styles.socials}>
              <a href="https://www.instagram.com/ollivandercafe/" target="_blank" rel="noreferrer" style={styles.socialIcon} title="Instagram">
                <Instagram size={20} />
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" style={styles.socialIcon} title="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          {/* Coluna 2: Horário (Separado) */}
          <div style={styles.col}>
            <h4 style={styles.columnTitle}>Horário de Magia</h4>
            <div style={styles.infoItem}>
              <Clock size={24} style={styles.iconGold} />
              <div>
                <span style={styles.infoLabel}>Todos os dias</span>
                <span style={styles.infoValue}>10:00 - 22:00</span>
              </div>
            </div>
          </div>

          {/* Coluna 3: Onde Estamos (Separado e com link manuscrito) */}
          <div style={styles.col}>
            <h4 style={styles.columnTitle}>Onde Estamos</h4>
            <div style={styles.infoItem}>
              <MapPin size={24} style={styles.iconGold} />
              <div>
                <span style={styles.infoLabel}>Toque para abrir o mapa</span>
                
                {/* Link Manuscrito */}
                <a 
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.addressLink}
                  title="Traçar rota no Google Maps"
                >
                  R. Cap. João Crisóstomo, qd 10 <br/>
                  lt 05 - Centro, Caldas Novas - GO <br/>
                  CEP: 75680-029
                  <ExternalLink size={18} style={{ marginLeft: '8px', opacity: 0.7, verticalAlign: 'middle' }} />
                </a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div style={styles.copyrightBar}>
          <p>© {new Date().getFullYear()} Ollivander Bistrô & Café.</p>
          <p style={styles.madeWith}>Feito com <span style={{color: '#e25555'}}>❤</span> e magia.</p>
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#0f1014',
    color: '#e5e5e5',
    paddingTop: '4rem',
    position: 'relative',
    zIndex: 10,
    borderTop: '1px solid #333'
  },
  topBorder: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
    background: 'linear-gradient(90deg, #0f1014 0%, #D4AF37 50%, #0f1014 100%)',
    boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
  },
  container: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%'
  },
  grid: {
    display: 'grid',
    // Garante 3 colunas se houver espaço, ou quebra responsivamente
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
    gap: '3rem',
    alignItems: 'start'
  },
  
  // Estilo genérico para as colunas
  col: { display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' },

  // Elementos da Marca
  logo: { width: '160px', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.1))' },
  text: { fontSize: '0.95rem', color: '#a1a1aa', lineHeight: 1.6, maxWidth: '300px' },
  socials: { display: 'flex', gap: '1rem' },
  socialIcon: {
    width: '40px', height: '40px', borderRadius: '50%', 
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--color-wizard-gold)', 
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },

  // Títulos e Infos
  columnTitle: { 
    fontFamily: 'var(--font-magic)', fontSize: '1.4rem', color: '#fcf5e5', marginBottom: '0.2rem',
    letterSpacing: '1px'
  },
  infoItem: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },
  iconGold: { color: 'var(--color-wizard-gold)', marginTop: '4px', flexShrink: 0 },
  infoLabel: { display: 'block', fontSize: '0.85rem', color: '#71717a', textTransform: 'uppercase', marginBottom: '6px' },
  infoValue: { display: 'block', fontSize: '1.1rem', color: '#e4e4e7' },

  // O LINK DO ENDEREÇO
  addressLink: {
    display: 'inline-block',
    fontFamily: "'HarryP', cursive", // Fonte Harry Potter
    fontSize: '1.2rem', // Fonte grande
    color: 'var(--color-wizard-gold)', 
    textDecoration: 'none',
    lineHeight: '1.1',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },

  // Copyright
  copyrightBar: {
    marginTop: '4rem',
    padding: '2rem 0',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#52525b'
  },
  madeWith: { fontSize: '0.8rem', opacity: 0.8 }
};