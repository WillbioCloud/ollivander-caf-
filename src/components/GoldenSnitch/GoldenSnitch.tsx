import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Isso ensina ao TypeScript que o elemento 'spline-viewer' existe
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { url: string }, HTMLElement>;
    }
  }
}

export const GoldenSnitch = () => {
  const { scrollY } = useScroll();

  // --- CONFIGURAÇÃO DA ROTA DO POMO ---
  // Ajuste os números [0, 500, ...] (pixels de scroll) conforme a altura real do seu site.
  
  // ROTA 1: HERO -> SOBRE (Direita para Esquerda, Descendo)
  // ROTA 2: DESTAQUES -> MENU (Esquerda para Direita, Subindo e Descendo)

  const x = useTransform(scrollY, 
    // Pontos de Scroll: [Inicio, Fim Hero,   Inicio Destaques, Fim Destaques]
    [0, 900,           1400, 2600], 
    // Posição X (vw):  [Direita, Esquerda,  Esquerda, Direita]
    ["120vw", "-30vw", "-20vw", "120vw"]
  );

  const y = useTransform(scrollY, 
    // Pontos de Scroll
    [0, 800,           1400, 2000, 2600], 
    // Posição Y (vh):  [Topo, Baixo,       Baixo, Alto, Meio]
    ["10vh", "70vh",   "80vh", "10vh", "40vh"]
  );

  const opacity = useTransform(scrollY,
    // Controla quando ele aparece e some
    // 0-700px: Visível
    // 700-800px: Fade Out (some ao chegar no Sobre)
    // 800-1400px: Invisível (enquanto rola o meio)
    // 1400-1500px: Fade In (aparece nos Destaques)
    // 2500-2600px: Fade Out (some no Cardápio)
    [0, 700, 800, 1400, 1500, 2500, 2600],
    [1, 1,   0,   0,    1,    1,    0]
  );
  
  const rotate = useTransform(scrollY, [0, 0], [0, 360]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        opacity,
        rotate,
        width: '300px', // Tamanho do Pomo na tela
        height: '300px',
        zIndex: 50, // Fica acima de tudo
        pointerEvents: 'none', // IMPORTANTE: Deixa clicar nos botões atrás dele
      }}
    >
      {/* O container precisa ter tamanho 100% para o Spline renderizar dentro */}
      <div style={{ width: '100%', height: '100%' }}>
        <spline-viewer 
            url="https://prod.spline.design/oVzk6rb-h4bU0wzk/scene.splinecode"
            style={{ width: '100%', height: '100%', background: 'transparent' }}
        ></spline-viewer>
      </div>
    </motion.div>
  );
};