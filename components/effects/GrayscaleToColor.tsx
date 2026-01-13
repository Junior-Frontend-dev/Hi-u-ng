import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function GrayscaleToColor() {
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
        1 - (rect.top - containerRect.top) / (containerRect.height / 2)
      ));
      const grayscale = 100 - progress * 100;
      image.style.filter = `grayscale(${grayscale}%)`;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-white/50 text-lg">Scroll to reveal colors</p>
        </div>
        <div className="h-[100vh] flex items-center justify-center">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800"
            alt="Grayscale to color"
            className="w-[80%] max-w-[600px] rounded-lg transition-all duration-100"
            style={{ filter: 'grayscale(100%)' }}
          />
        </div>
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-white/50 text-lg">Full color revealed</p>
        </div>
      </div>
    </DemoContainer>
  );
}
