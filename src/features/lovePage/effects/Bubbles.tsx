import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Bubbles() {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Criar 30 bolhas
    const newBubbles = [];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 40 + 20; // 20px a 60px
      const duration = Math.random() * 15 + 10; // 10s a 25s
      const initialX = Math.random() * 100; // posição inicial de 0% a 100%
      const delay = Math.random() * 15; // atraso de 0s a 15s
      
      // Definir cores pastel
      const hue = Math.floor(Math.random() * 360);
      const color = `hsla(${hue}, 70%, 80%, 0.4)`;
      
      newBubbles.push(
        <motion.div
          key={i}
          className="fixed rounded-full pointer-events-none"
          initial={{ 
            x: `${initialX}vw`, 
            y: '110vh'
          }}
          animate={{ 
            y: '-10vh',
            x: [
              `${initialX}vw`,
              `${initialX - 10 + Math.random() * 20}vw`,
              `${initialX}vw`
            ]
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
            x: {
              duration: 5,
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }}
          style={{ 
            left: `${initialX}%`,
            width: size,
            height: size,
            background: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
          }}
        />
      );
    }
    
    setBubbles(newBubbles);
  }, []);

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{bubbles}</div>;
} 