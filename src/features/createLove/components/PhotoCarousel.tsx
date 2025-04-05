import { useEffect, useState } from 'react';

interface PhotoCarouselProps {
  photos: File[];
  interval?: number;
}

export const PhotoCarousel = ({ photos, interval = 3000 }: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [photos.length, interval]);

  if (photos.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      <img
        src={URL.createObjectURL(photos[currentIndex])}
        alt={`Foto ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500"
      />
    </div>
  );
}; 