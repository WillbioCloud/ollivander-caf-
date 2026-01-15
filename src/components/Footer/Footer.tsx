import React from 'react';
import { Instagram, Facebook, Clock, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Coluna 1: Info */}
          <div style={styles.col}>
            <img src="/logo.png" alt="Ollivander Café" style={styles.logo} />
            <p style={styles.text}>Uma experiência gastronômica única, trazendo o encanto e a magia para o seu dia a dia.</p>
            <div style={styles.socials}>
              <a href="#" style={styles.socialIcon}><Instagram size={22} /></a>
              <a href="#" style={styles.socialIcon}><Facebook size={22} /></a>
            </div>
          </div>
          
          {/* Coluna 2: Horário */}
          <div style={styles.col}>
            <div style={styles.titleWrapper}>
              <Clock size={28} />
              <h4 style={styles.title}>Horário de Magia</h4>
            </div>
            <ul style={styles.list}>
              <li style={styles.listItem}><span>Aberto todos os dias</span><span>10:00 - 22:00</span></li>
            </ul>
          </div>
          
          {/* Coluna 3: Local */}
          <div style={styles.col}>
             <div style={styles.titleWrapper}>
               <MapPin size={28} />
               <h4 style={styles.title}>Localização</h4>
             </div>
            <p style={{...styles.text, fontSize: '1.1rem'}}>Rua Capitão João Crisóstomo, Qd 10, Lt 05, Centro<br/>Caldas Novas -</p>
          </div>
        </div>
        
        <div style={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Ollivander Bistrô & Café. Todos os direitos reservados. Feito com magia.</p>
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: 'var(--color-wizard-deep)',
    color: 'var(--color-wizard-parchment)',
    padding: '5rem 0 2rem 0',
    borderTop: '4px solid var(--color-wizard-gold)',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
    position: 'relative', zIndex: 10
  },
  container: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', width: '100%'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem', textAlign: 'left'
  },
  col: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  logo: { width: '180px', opacity: 0.9 },
  text: { fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.6 },
  socials: { display: 'flex', gap: '1rem' },
  socialIcon: {
    padding: '0.75rem', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.3)',
    color: 'var(--color-wizard-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  titleWrapper: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-wizard-gold)' },
  title: { fontFamily: 'var(--font-magic)', fontSize: '1.5rem' },
  list: { fontSize: '0.9rem', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '1rem' },
  listItem: {
    display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  },
  copyright: {
    textAlign: 'center', fontSize: '0.75rem', opacity: 0.4, marginTop: '5rem',
    paddingTop: '2rem', fontFamily: 'var(--font-magic)', borderTop: '1px solid rgba(255,255,255,0.1)'
  }
};