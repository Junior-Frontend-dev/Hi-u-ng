import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ImageZoomScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      const scale = 1 + scrollProgress * 0.5;
      image.style.transform = `scale(${scale})`;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-white/50 text-lg">Scroll down to see zoom effect</p>
        </div>
        <div className="h-[100vh] flex items-center justify-center overflow-hidden">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Mountain landscape"
            className="w-[80%] max-w-[600px] object-cover rounded-lg transition-transform duration-100"
          />
        </div>
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-white/50 text-lg">Continue scrolling</p>
        </div>
      </div>
    </DemoContainer>
  );
}
