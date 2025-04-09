'use client';

import 'simplebar-react/dist/simplebar.min.css';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MessageCircleHeart, Music } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { SpotifyEmbed } from '@/components/SpotifyEmbed';

import type { FormData } from './CreateLoveForm';
import type { BackgroundEffect } from './types/backgroundEffects';

// Componentes de efeito específicos para o preview
const HeartsPreview = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Limpar corações antigos
    setHearts([]);

    // Obter dimensões do container
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const containerHeight = container.clientHeight;

    // Criar novos corações
    const newHearts = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 15 + 5;
      const duration = Math.random() * 10 + 5;
      const initialX = Math.random() * 100;
      const delay = Math.random() * 3;

      newHearts.push(
        <motion.div
          key={i}
          className="pointer-events-none absolute text-primary"
          initial={{
            x: `${initialX}%`,
            y: containerHeight + size, // Começa abaixo do container
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: -size, // Termina acima do container
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'linear',
          }}
          style={{
            left: `${initialX}%`,
            width: size,
            height: size,
          }}
        >
          <Heart size={size} fill="currentColor" />
        </motion.div>,
      );
    }

    setHearts(newHearts);

    return () => {
      setHearts([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
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
    if (!container) {
      return;
    }

    const newStars = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 2 + 1;

      newStars.push(
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />,
      );
    }

    setStars(newStars);

    return () => {
      setStars([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars}
    </div>
  );
};

const BubblesPreview = () => {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

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
          className="pointer-events-none absolute rounded-full"
          initial={{
            x: `${initialX}%`,
            y: containerHeight + size,
          }}
          animate={{
            y: -size,
            x: [
              `${initialX}%`,
              `${initialX - 10 + Math.random() * 20}%`,
              `${initialX}%`,
            ],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
            x: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'mirror',
            },
          }}
          style={{
            left: `${initialX}%`,
            width: size,
            height: size,
            background: color,
            boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
          }}
        />,
      );
    }

    setBubbles(newBubbles);

    return () => {
      setBubbles([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles}
    </div>
  );
};

const ConfettiPreview = () => {
  const [confetti, setConfetti] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

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
          className="pointer-events-none absolute"
          initial={{
            x: `${initialX}%`,
            y: -size,
            rotate: rotation,
          }}
          animate={{
            y: containerHeight + size,
            rotate: rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
            x: [
              `${initialX}%`,
              `${initialX - 10 + Math.random() * 20}%`,
              `${initialX - 5 + Math.random() * 10}%`,
            ],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'linear',
            x: {
              duration: duration / 2,
              repeat: 2,
              repeatType: 'mirror',
            },
          }}
          style={{
            left: `${initialX}%`,
            width,
            height,
            backgroundColor: color,
          }}
        />,
      );
    }

    setConfetti(newConfetti);

    return () => {
      setConfetti([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {confetti}
    </div>
  );
};

const FirefliesPreview = () => {
  const [fireflies, setFireflies] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

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
          className="pointer-events-none absolute rounded-full"
          initial={{
            x: `${x}%`,
            y: `${y}%`,
            opacity: 0,
          }}
          animate={{
            x: [
              `${x}%`,
              `${x - 5 + Math.random() * 10}%`,
              `${x}%`,
            ],
            y: [
              `${y}%`,
              `${y - 5 + Math.random() * 10}%`,
              `${y}%`,
            ],
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
          }}
        />,
      );
    }

    setFireflies(newFireflies);

    return () => {
      setFireflies([]);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {fireflies}
    </div>
  );
};

// Componente para selecionar o efeito
const EffectBackground = ({ effect }: { effect: BackgroundEffect }) => {
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
  const timeT = useTranslations('CreateLove.time');
  const dateT = useTranslations('CreateLove.dateTexts');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Referência para o container principal
  const containerRef = useRef<HTMLDivElement>(null);

  // Função para validar URL do Spotify
  const isValidSpotifyUrl = (url: string) => {
    return url.trim() !== ''
      && (url.includes('spotify.com/track/')
        || url.includes('spotify.com/album/')
        || url.includes('spotify.com/playlist/'));
  };

  // Calcular o tempo decorrido
  useEffect(() => {
    if (!formData.startDate.date) {
      return;
    }

    const updateTime = () => {
      const start = formData.startDate.date as Date;
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
        seconds: seconds % 60,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [formData.startDate.date]);

  // Efeito para forçar a recriação do efeito de partículas
  const [key, setKey] = useState(0);
  useEffect(() => {
    // Incrementar a key para forçar a recriação
    setKey(prev => prev + 1);
    return () => {}; // Add an empty cleanup function
  }, [formData.backgroundEffect]);

  // Alternância de fotos
  useEffect(() => {
    if (formData.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % formData.photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
    return () => {}; // Add an empty cleanup function for other paths
  }, [formData.photos]);

  // Converter fotos em URLs
  const photoUrls = formData.photos.map(photo => URL.createObjectURL(photo));

  const formatTimeElapsed = (timeElapsed: { years: number; months: number; days: number; hours: number; minutes: number; seconds: number }) => {
    const parts = [];

    if (timeElapsed.years > 0) {
      parts.push(`${timeElapsed.years} ${timeT(timeElapsed.years === 1 ? 'year_one' : 'year_other')}`);
    }
    if (timeElapsed.months > 0) {
      parts.push(`${timeElapsed.months} ${timeT(timeElapsed.months === 1 ? 'month_one' : 'month_other')}`);
    }
    if (timeElapsed.days > 0) {
      parts.push(`${timeElapsed.days} ${timeT(timeElapsed.days === 1 ? 'day_one' : 'day_other')}`);
    }
    if (timeElapsed.hours > 0) {
      parts.push(`${timeElapsed.hours} ${timeT(timeElapsed.hours === 1 ? 'hour_one' : 'hour_other')}`);
    }
    if (timeElapsed.minutes > 0) {
      parts.push(`${timeElapsed.minutes} ${timeT(timeElapsed.minutes === 1 ? 'minute_one' : 'minute_other')}`);
    }
    if (timeElapsed.seconds > 0) {
      parts.push(`${timeElapsed.seconds} ${timeT(timeElapsed.seconds === 1 ? 'second_one' : 'second_other')}`);
    }

    return parts;
  };

  const getDateText = (textType: string) => {
    return dateT(textType);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Barra de endereço simulada */}
      <div className="flex items-center gap-2 rounded-t-lg bg-[#2D2D2D] p-2">
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-[#FF5F56]"></div>
          <div className="size-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="size-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="flex-1 rounded-md bg-[#1D1D1D] px-3 py-1.5 text-center text-sm text-gray-300">
          withloove.com/
          {formData.pageName || t('your_page_name')}
        </div>
      </div>

      {/* Conteúdo com scroll */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-y-auto overflow-x-hidden bg-black text-white"
        style={{ isolation: 'isolate' }}
      >
        <div className="min-h-full">
          {/* Efeito de fundo */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            key={`effect-${formData.backgroundEffect}-${key}`}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 11,
            }}
          >
            <EffectBackground effect={formData.backgroundEffect} />
          </div>

          <div className="relative z-10">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[200px] overflow-hidden">
              {photoUrls[0]
                ? (
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                      <img
                        src={photoUrls[0]}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  )
                : (
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-black" />
                  )}

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="mb-4 text-xl font-bold text-white md:text-2xl">
                  {formData.pageTitle || t('sample_title')}
                </h1>

                {formData.startDate.date && formData.startDate.textType && (
                  <div className="mb-4 text-center">
                    <p className="mb-2 text-lg text-gray-300">
                      {getDateText(formData.startDate.textType)}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-center md:grid-cols-3">
                      {formatTimeElapsed(timeElapsed).map((text, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-white/10 px-3 py-1 backdrop-blur-sm"
                        >
                          <div className="text-sm font-bold text-primary md:text-lg">{text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Spotify - Mover para cá e aumentar o tamanho */}
            {formData.spotifyLink && isValidSpotifyUrl(formData.spotifyLink) && (
              <section className="px-4 py-8">
                <div className="mx-auto max-w-2xl">
                  {' '}
                  {/* Aumentado para max-w-2xl */}
                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                    {' '}
                    {/* Aumentado o padding */}
                    <SpotifyEmbed url={formData.spotifyLink} />
                  </div>
                </div>
              </section>
            )}

            {/* Mensagem */}
            <section className="px-4 py-8">
              <div className="mx-auto max-w-full">
                <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 p-4 backdrop-blur-lg">
                  <MessageCircleHeart className="mb-2 size-6 text-primary" />
                  <p className="whitespace-pre-wrap break-words text-sm text-gray-200">
                    {formData.message || t('sample_message')}
                  </p>
                </div>
              </div>
            </section>

            {/* Galeria de Fotos */}
            {photoUrls.length > 0 && (
              <section className="px-4 py-8">
                <div className="flex justify-center">
                  <div className="size-48 overflow-hidden rounded-md">
                    <img
                      src={photoUrls[currentPhotoIndex]}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Alternativa visual quando o link não é válido mas existe */}
            {formData.spotifyLink && !isValidSpotifyUrl(formData.spotifyLink) && (
              <section className="px-4 py-8">
                <div className="mx-auto max-w-xl">
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                    <Music className="text-primary" />
                    <div className="truncate text-sm">{formData.spotifyLink}</div>
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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              >
                <motion.img
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.5 }}
                  src={selectedPhoto}
                  alt=""
                  className="max-h-[90vh] max-w-full rounded-lg object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
