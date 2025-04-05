'use client';

import { motion } from 'framer-motion';
import { Heart, Music, MessageCircleHeart } from 'lucide-react';
import { FormData } from './CreateLoveForm';
import { BackgroundEffect } from './types/backgroundEffects';
import { useTranslations } from 'next-intl';

// Mini componentes de preview para os efeitos de fundo
import { useState, useEffect } from 'react';

const HeartsBackground = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newHearts = [];
    for (let i = 0; i < 5; i++) {
      const size = Math.random() * 15 + 5;
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

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{hearts}</div>;
};

// Adicione componentes similares para os outros efeitos (stars, bubbles, etc.)

// Componente para selecionar o efeito de fundo com base no tipo
const EffectBackground = ({ effect }: { effect: BackgroundEffect }) => {
  switch (effect) {
    case 'hearts':
      return <HeartsBackground />;
    // Adicione casos para outros efeitos
    default:
      return <HeartsBackground />;
  }
};

export const Preview = ({ formData }: { formData: FormData }) => {
  const t = useTranslations('CreateLove.preview');
  
  // Verificar se há fotos para exibir
  const hasPhotos = formData.photos.length > 0;
  const photoUrl = hasPhotos ? URL.createObjectURL(formData.photos[0]) : null;

  // Calcular dias desde a data inicial (se existir)
  const daysCount = formData.startDate 
    ? Math.floor((new Date().getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="mt-8 border border-border rounded-lg overflow-hidden">
      <div className="bg-card p-3 border-b border-border">
        <h3 className="text-lg font-medium">{t('preview_title')}</h3>
      </div>
      
      <div className="relative h-[400px] bg-black overflow-hidden">
        {/* Efeito de fundo */}
        <div className="absolute inset-0">
          <EffectBackground effect={formData.backgroundEffect} />
        </div>
        
        {/* Conteúdo principal */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Cabeçalho com foto (se houver) */}
          <div className="h-1/2 relative overflow-hidden">
            {photoUrl ? (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                <img
                  src={photoUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-black" />
            )}
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                {formData.pageTitle || t('sample_title')}
              </h1>
              
              {formData.startDate && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 px-3">
                  <span className="text-xl font-bold text-primary">{daysCount}</span>
                  <span className="text-sm text-gray-300 ml-1">{t('days')}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Mensagem */}
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-lg p-4 rounded-xl max-w-[90%] max-h-[90%] overflow-auto">
              <MessageCircleHeart className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm text-gray-200 line-clamp-4">
                {formData.message || t('sample_message')}
              </p>
            </div>
          </div>
          
          {/* Spotify (se houver) */}
          {formData.spotifyLink && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                <Music className="w-5 h-5 text-primary" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Miniaturas das fotos */}
      {hasPhotos && formData.photos.length > 1 && (
        <div className="bg-card p-3 border-t border-border flex gap-2 overflow-x-auto">
          {formData.photos.slice(0, 5).map((photo, index) => (
            <div key={index} className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={URL.createObjectURL(photo)}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {formData.photos.length > 5 && (
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary text-xs">
              +{formData.photos.length - 5}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 