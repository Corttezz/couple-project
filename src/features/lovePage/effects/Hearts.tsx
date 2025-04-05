'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Hearts() {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Criar corações
    const newHearts = [];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 30 + 10;
      const duration = Math.random() * 15 + 10;
      const initialX = Math.random() * 100;
      const delay = Math.random() * 10;
      
      newHearts.push(
        <motion.div
          key={i}
          className="absolute text-primary pointer-events-none"
          initial={{ 
            x: `${initialX}vw`, 
            y: '110vh', 
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: '-10vh' 
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'linear'
          }}
          style={{ 
            left: `${initialX}%`,
            width: size,
            height: size
          }}
        >
          <Heart size={size} fill="currentColor" />
        </motion.div>
      );
    }
    
    setHearts(newHearts);
    
    // Cleanup função
    return () => {
      setHearts([]);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts}
    </div>
  );
} 