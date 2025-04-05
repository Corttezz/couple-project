import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Confetti() {
  const [confetti, setConfetti] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Criar 100 confetes
    const newConfetti = [];
    
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 10 + 5; // 5px a 15px
      const initialX = Math.random() * 100; // posição inicial de 0% a 100%
      const duration = Math.random() * 10 + 5; // 5s a 15s
      const delay = Math.random() * 10; // atraso de 0s a 10s
      
      // Cores vibrantes para confete
      const colors = ['#ff6b81', '#ff4757', '#5352ed', '#2ed573', '#ffa502', '#1e90ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Forma aleatória (quadrado ou retângulo)
      const isSquare = Math.random() > 0.5;
      const width = size;
      const height = isSquare ? size : size * 2;
      const rotation = Math.random() * 360;
      
      newConfetti.push(
        <motion.div
          key={i}
          className="fixed pointer-events-none"
          initial={{ 
            x: `${initialX}vw`, 
            y: '-10vh',
            rotate: rotation
          }}
          animate={{ 
            y: '110vh',
            rotate: rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
            x: [
              `${initialX}vw`,
              `${initialX - 20 + Math.random() * 40}vw`,
              `${initialX - 10 + Math.random() * 20}vw`
            ]
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'linear',
            x: {
              duration: duration / 2,
              repeat: 2,
              repeatType: 'mirror'
            }
          }}
          style={{ 
            left: `${initialX}%`,
            width,
            height,
            backgroundColor: color
          }}
        />
      );
    }
    
    setConfetti(newConfetti);
  }, []);

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{confetti}</div>;
} 