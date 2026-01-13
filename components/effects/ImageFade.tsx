import React, { useEffect, useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
];

export default function ImageFade() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-[80%] max-w-[600px] aspect-video overflow-hidden rounded-lg">
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentIndex
                  ? isTransitioning ? 'opacity-0' : 'opacity-100'
                  : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-8 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}
