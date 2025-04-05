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

interface PageData {
  pageTitle: string;
  startDate: string;
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

  useEffect(() => {
    try {
      const data = localStorage.getItem(params.pageName);
      if (!data) {
        notFound();
        return;
      }
      console.log("Dados carregados:", JSON.parse(data));
      setPageData(JSON.parse(data));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      notFound();
    }
  }, [params.pageName]);

  useEffect(() => {
    if (!pageData?.startDate) return;

    const updateTime = () => {
      const start = new Date(pageData.startDate);
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
  }, [pageData?.startDate]);

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

      {/* Conteúdo principal */}
      <div className="relative z-10">
        {/* Hero Section com Parallax */}
        <Parallax
          blur={0}
          bgImage={pageData.photos[0]}
          bgImageAlt="Background"
          strength={200}
          className="h-screen"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="relative h-screen flex flex-col items-center justify-center text-center p-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="mb-8 text-4xl md:text-6xl font-bold"
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              {Object.entries(timeElapsed).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="text-4xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-gray-300 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </Parallax>

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
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {pageData.photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="cursor-pointer aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Spotify */}
        {pageData.spotifyUrl && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20 px-4"
          >
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute -top-10 -left-10">
                  <Music className="w-20 h-20 text-primary opacity-20" />
                </div>
                <div className="bg-white/5 p-1 rounded-xl backdrop-blur-sm">
                  <SpotifyEmbed url={pageData.spotifyUrl} />
                </div>
              </div>
            </div>
          </motion.section>
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
    </main>
  );
} 