'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { backgroundEffects, BackgroundEffect } from '../types/backgroundEffects';
import { Heart } from 'lucide-react';

// Mini componentes para os previews
const HeartsPreview = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newHearts = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 20 + 5;
      const duration = Math.random() * 10 + 5;
      const initialX = Math.random() * 100;
      const delay = Math.random() * 3;
      
      newHearts.push(
        <motion.div
          key={i}
          className="absolute text-primary pointer-events-none"
          initial={{ 
            x: `${initialX}%`, 
            y: '110%', 
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: '-10%' 
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
  }, []);

  return <div className="absolute inset-0 overflow-hidden">{hearts}</div>;
};

const StarsPreview = () => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 2 + 1;
      
      newStars.push(
        <motion.div
          key={i}
          className="absolute bg-white rounded-full pointer-events-none"
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

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{stars}</div>;
};

const BubblesPreview = () => {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newBubbles = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 20 + 10;
      const duration = Math.random() * 8 + 5;
      const initialX = Math.random() * 100;
      const delay = Math.random() * 3;
      const hue = Math.floor(Math.random() * 360);
      const color = `hsla(${hue}, 70%, 80%, 0.4)`;
      
      newBubbles.push(
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          initial={{ 
            x: `${initialX}%`, 
            y: '110%'
          }}
          animate={{ 
            y: '-10%',
            x: [
              `${initialX}%`,
              `${initialX - 10 + Math.random() * 20}%`,
              `${initialX}%`
            ]
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
            x: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }}
          style={{ 
            left: `${initialX}%`,
            width: size,
            height: size,
            background: color,
            boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`
          }}
        />
      );
    }
    setBubbles(newBubbles);
  }, []);

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{bubbles}</div>;
};

const ConfettiPreview = () => {
  const [confetti, setConfetti] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newConfetti = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 6 + 3;
      const initialX = Math.random() * 100;
      const duration = Math.random() * 6 + 3;
      const delay = Math.random() * 3;
      const colors = ['#ff6b81', '#ff4757', '#5352ed', '#2ed573', '#ffa502', '#1e90ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isSquare = Math.random() > 0.5;
      const width = size;
      const height = isSquare ? size : size * 1.5;
      const rotation = Math.random() * 360;
      
      newConfetti.push(
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          initial={{ 
            x: `${initialX}%`, 
            y: '-10%',
            rotate: rotation
          }}
          animate={{ 
            y: '110%',
            rotate: rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
            x: [
              `${initialX}%`,
              `${initialX - 10 + Math.random() * 20}%`,
              `${initialX - 5 + Math.random() * 10}%`
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

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{confetti}</div>;
};

const FirefliesPreview = () => {
  const [fireflies, setFireflies] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newFireflies = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 5 + 3;
      const hue = 40 + Math.random() * 20;
      const color = `hsla(${hue}, 100%, 70%, 0.8)`;
      
      newFireflies.push(
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          initial={{ 
            x: `${x}%`, 
            y: `${y}%`,
            opacity: 0
          }}
          animate={{ 
            x: [
              `${x}%`,
              `${x - 5 + Math.random() * 10}%`,
              `${x}%`
            ],
            y: [
              `${y}%`,
              `${y - 5 + Math.random() * 10}%`,
              `${y}%`
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

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{fireflies}</div>;
};

// Componente para selecionar o preview com base no tipo
const EffectPreview = ({ effect }: { effect: BackgroundEffect }) => {
  switch (effect) {
    case 'hearts':
      return <HeartsPreview />;
    case 'stars':
      return <StarsPreview />;
    case 'bubbles':
      return <BubblesPreview />;
    case 'confetti':
      return <ConfettiPreview />;
    case 'fireflies':
      return <FirefliesPreview />;
    default:
      return <HeartsPreview />;
  }
};

export const BackgroundEffectStep = ({ 
  value, 
  onChange, 
  onNext,
  onPrev
}: { 
  value: BackgroundEffect;
  onChange: (value: BackgroundEffect) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const t = useTranslations('CreateLove.form');

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-3">{t('step6_title')}</h2>
        <p className="text-muted-foreground mb-6 text-lg">{t('step6_description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.entries(backgroundEffects) as [BackgroundEffect, typeof backgroundEffects.hearts][]).map(([key, effect]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(key)}
            className={`relative h-60 rounded-xl overflow-hidden cursor-pointer border-2 transition-colors ${
              value === key ? 'border-primary shadow-lg' : 'border-transparent'
            }`}
          >
            <div className="absolute inset-0 bg-black overflow-hidden" style={{ isolation: 'isolate' }}>
              <EffectPreview effect={key} />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-semibold text-white mb-1">{effect.name}</h3>
              <p className="text-base text-gray-200">{effect.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="border border-input px-6 py-3 rounded-md text-base"
        >
          {t('prev_button')}
        </button>
        <button
          onClick={onNext}
          disabled={!value}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-base disabled:opacity-50"
        >
          {t('next_button')}
        </button>
      </div>
    </div>
  );
}; 