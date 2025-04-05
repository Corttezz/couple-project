import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Fireflies() {
  const [fireflies, setFireflies] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Criar 40 vaga-lumes
    const newFireflies = [];
    
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 6 + 4; // 4px a 10px
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 5; // 5s a 15s
      
      // Cores amareladas para vaga-lumes
      const hue = 40 + Math.random() * 20; // amarelo-laranja
      const color = `hsla(${hue}, 100%, 70%, 0.8)`;
      
      newFireflies.push(
        <motion.div
          key={i}
          className="fixed rounded-full pointer-events-none"
          initial={{ 
            x: `${x}vw`, 
            y: `${y}vh`,
            opacity: 0
          }}
          animate={{ 
            x: [
              `${x}vw`,
              `${x - 10 + Math.random() * 20}vw`,
              `${x + 5 - Math.random() * 10}vw`,
              `${x}vw`
            ],
            y: [
              `${y}vh`,
              `${y - 10 + Math.random() * 20}vh`,
              `${y + 5 - Math.random() * 10}vh`,
              `${y}vh`
            ],
            opacity: [0, 1, 0.5, 0]
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ 
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`
          }}
        />
      );
    }
    
    setFireflies(newFireflies);
  }, []);

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{fireflies}</div>;
} 