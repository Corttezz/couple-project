'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, MessageCircleHeart } from 'lucide-react';
import { FormData } from './CreateLoveForm';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { SpotifyEmbed } from '@/components/SpotifyEmbed';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// Componentes de efeito específicos para o preview
const HeartsPreview = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Limpar corações antigos
    setHearts([]);
    
    // Obter dimensões do container
    const container = containerRef.current;
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    
    // Criar novos corações
    const newHearts = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 15 + 5;
      const duration = Math.random() * 10 + 5;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * containerHeight;
      const delay = Math.random() * 3;
      
      newHearts.push(
        <motion.div
          key={i}
          className="absolute text-primary pointer-events-none"
          initial={{ 
            x: `${initialX}%`, 
            y: containerHeight + size, // Começa abaixo do container
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: -size // Termina acima do container
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
    
    return () => {
      setHearts([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts}
    </div>
  );
};

// Implementações para outros efeitos
const StarsPreview = () => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const newStars = [];
    for (let i = 0; i < 30; i++) {
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
    
    return () => {
      setStars([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars}
    </div>
  );
};

const BubblesPreview = () => {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    
    const newBubbles = [];
    for (let i = 0; i < 15; i++) {
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
            y: containerHeight + size
          }}
          animate={{ 
            y: -size,
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
    
    return () => {
      setBubbles([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles}
    </div>
  );
};

const ConfettiPreview = () => {
  const [confetti, setConfetti] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    
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
            y: -size,
            rotate: rotation
          }}
          animate={{ 
            y: containerHeight + size,
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
    
    return () => {
      setConfetti([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti}
    </div>
  );
};

const FirefliesPreview = () => {
  const [fireflies, setFireflies] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
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
    
    return () => {
      setFireflies([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {fireflies}
    </div>
  );
};

// Componente para selecionar o efeito
const EffectBackground = ({ effect }) => {
  // Força a recriação completa do componente quando o efeito muda
  switch (effect) {
    case 'hearts':
      return <HeartsPreview key="hearts-effect" />;
    case 'stars':
      return <StarsPreview key="stars-effect" />;
    case 'bubbles':
      return <BubblesPreview key="bubbles-effect" />;
    case 'confetti':
      return <ConfettiPreview key="confetti-effect" />;
    case 'fireflies':
      return <FirefliesPreview key="fireflies-effect" />;
    default:
      return <HeartsPreview key="default-effect" />;
  }
};

export const LivePreview = ({ formData }: { formData: FormData }) => {
  const t = useTranslations('CreateLove.preview');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Referência para o container principal
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Função para validar URL do Spotify
  const isValidSpotifyUrl = (url: string) => {
    return url.trim() !== '' && 
           (url.includes('spotify.com/track/') || 
            url.includes('spotify.com/album/') || 
            url.includes('spotify.com/playlist/'));
  };
  
  // Calcular o tempo decorrido
  useEffect(() => {
    if (!formData.startDate) return;

    const updateTime = () => {
      const start = formData.startDate as Date;
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.436875);
      const years = Math.floor(months / 12);

      setTimeElapsed({
        years,
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [formData.startDate]);

  // Efeito para forçar a recriação do efeito de partículas
  const [key, setKey] = useState(0);
  useEffect(() => {
    // Incrementar a key para forçar a recriação
    setKey(prev => prev + 1);
  }, [formData.backgroundEffect]);
  
  // Converter fotos em URLs
  const photoUrls = formData.photos.map(photo => URL.createObjectURL(photo));
  
  return (
    <div 
      ref={containerRef}
      className="h-full bg-black text-white overflow-y-auto overflow-x-hidden relative"
      style={{ isolation: 'isolate' }}
    >
      <div className="min-h-full">
        {/* Efeito de fundo */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none"
          key={`effect-${formData.backgroundEffect}-${key}`} 
          style={{ 
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 0
          }}
        >
          <EffectBackground effect={formData.backgroundEffect} />
        </div>
        
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="h-[40vh] min-h-[200px] relative overflow-hidden">
            {photoUrls[0] ? (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                <img
                  src={photoUrls[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-black" />
            )}
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
                {formData.pageTitle || t('sample_title')}
              </h1>
              
              {formData.startDate && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  {Object.entries(timeElapsed)
                    .filter(([key]) => ['days', 'hours', 'minutes'].includes(key))
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1"
                      >
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-gray-300 capitalize">{key}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Mensagem */}
          <section className="py-8 px-4">
            <div className="max-w-full mx-auto">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-lg p-4 rounded-xl">
                <MessageCircleHeart className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-gray-200 break-words whitespace-pre-wrap">
                  {formData.message || t('sample_message')}
                </p>
              </div>
            </div>
          </section>

          {/* Galeria de Fotos */}
          {photoUrls.length > 0 && (
            <section className="py-8 px-4">
              <div className="grid grid-cols-2 gap-2">
                {photoUrls.map((photo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Spotify - Agora com iframe real */}
          {formData.spotifyLink && isValidSpotifyUrl(formData.spotifyLink) && (
            <section className="py-8 px-4">
              <div className="max-w-xl mx-auto">
                <div className="bg-white/5 p-2 rounded-xl backdrop-blur-sm">
                  <SpotifyEmbed url={formData.spotifyLink} />
                </div>
              </div>
            </section>
          )}
          
          {/* Alternativa visual quando o link não é válido mas existe */}
          {formData.spotifyLink && !isValidSpotifyUrl(formData.spotifyLink) && (
            <section className="py-8 px-4">
              <div className="max-w-xl mx-auto">
                <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3">
                  <Music className="text-primary" />
                  <div className="text-sm truncate">{formData.spotifyLink}</div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Modal de Foto */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <motion.img
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                src={selectedPhoto}
                alt=""
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 