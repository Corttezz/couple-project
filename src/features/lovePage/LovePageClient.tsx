'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { SpotifyEmbed } from '@/components/SpotifyEmbed';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, MessageCircleHeart } from 'lucide-react';
import { Tilt } from 'react-tilt';
import Typewriter from 'typewriter-effect';
import { Parallax } from 'react-parallax';
import { BackgroundEffect } from './effects/BackgroundEffect';
import { useTranslations } from 'use-intl';
import { jwtDecode } from 'jwt-decode';

interface PageData {
  pageTitle: string;
  startDate: {
    date: string;
    textType: string;
  };
  message: string;
  photos: string[];
  spotifyUrl?: string;
  backgroundEffect?: string;
}

export function LovePageClient({ params }: { params: { pageName: string } }) {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const timeT = useTranslations('CreateLove.time');
  const dateT = useTranslations('CreateLove.dateTexts');

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      const pageName = url.split('/').pop();

      if (!pageName) {
        console.error('Page name is undefined');
        return;
      }

      try {
        const response = await fetch(`/api/page/getPage?url_identifier=${pageName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        const decoded = jwtDecode(data.data.jwt) as PageData;
        if (decoded) {
          setPageData(decoded);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        notFound();
      }
    };

    fetchData();
  }, [params.pageName]);

  useEffect(() => {
    if (!pageData?.startDate?.date) return;
    //console.log('pageData', pageData);

    const updateTime = () => {
      const start = new Date(pageData.startDate.date);
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
  }, [pageData?.startDate?.date]);

  useEffect(() => {
    if (pageData?.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % pageData.photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [pageData?.photos]);

  const formatTimeElapsed = (timeElapsed) => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-16 h-16 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!pageData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden love-preview-scroll">

      {/* Efeito de background */}

      <BackgroundEffect effect={pageData.backgroundEffect || 'hearts'} />

      {/* Hero Section com Parallax - Ocupando toda a largura */}
      <Parallax
        blur={0}
        bgImage={pageData.photos[0]}
        bgImageAlt="Background"
        strength={200}
        className="h-screen w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black w-full" />
        <div className="relative h-screen flex flex-col items-center justify-center text-center p-4">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="mb-8 text-5xl md:text-7xl font-bold"
            >
              <Typewriter
                options={{
                  strings: [pageData.pageTitle],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50
                }}
              />
            </motion.div>

            {pageData.startDate.date && pageData.startDate.textType && (
              <div className="text-center mb-8">
                <p className="text-2xl text-gray-300 mb-4">
                  {getDateText(pageData.startDate.textType)}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  {formatTimeElapsed(timeElapsed).map((text, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    >
                      <div className="text-2xl md:text-4xl font-bold text-primary">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Parallax>

      {/* Conteúdo restante com largura máxima */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Spotify */}
        {pageData.spotifyUrl && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-10 px-4"
          >
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <SpotifyEmbed url={pageData.spotifyUrl} />
              </div>
            </div>
          </motion.section>
        )}
        {/* Mensagem */}
        <section className="py-20">
          <Tilt
            options={{ max: 25, scale: 1.05 }}
            className="max-w-3xl mx-auto px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
            >
              <MessageCircleHeart className="w-12 h-12 text-primary mb-4" />
              <p className="text-xl leading-relaxed whitespace-pre-wrap break-words text-gray-200">
                {pageData.message}
              </p>
            </motion.div>
          </Tilt>
        </section>

        {/* Galeria de Fotos */}
        <section className="py-20 px-4">
          <div className="container mx-auto flex justify-center">
            <div className="w-96 h-96 rounded-xl overflow-hidden">
              <img
                src={pageData.photos[currentPhotoIndex]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
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
    </main>
  );
} 