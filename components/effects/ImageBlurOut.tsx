import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ImageBlurOut() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handleScroll = () => {
      const rect = image.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 
        (containerRect.top + containerRect.height / 2 - rect.top) / (containerRect.height / 2)
      ));
      const blur = progress * 20;
      const opacity = 1 - progress * 0.7;
      image.style.filter = `blur(${blur}px)`;
      image.style.opacity = String(opacity);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-white/50 text-lg">Scroll down to blur image</p>
        </div>
        <div className="h-[100vh] flex items-center justify-center">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Blur effect"
            className="w-[80%] max-w-[600px] rounded-lg transition-all duration-100"
          />
        </div>
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-white/50 text-lg">Image blurred out</p>
        </div>
      </div>
    </DemoContainer>
  );
}
