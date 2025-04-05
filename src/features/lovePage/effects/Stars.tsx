import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Stars() {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newStars = [];
    
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 4 + 2; // 2px a 6px
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 1; // 1s a 4s
      
      newStars.push(
        <motion.div
          key={i}
          className="fixed bg-white rounded-full pointer-events-none"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      );
    }
    
    setStars(newStars);
  }, []);

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{stars}</div>;
} 