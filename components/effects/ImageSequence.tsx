import React, { useEffect, useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const imageUrls = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600',
];

export default function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / maxScroll;
      const frameIndex = Math.min(
        imageUrls.length - 1,
        Math.floor(progress * imageUrls.length)
      );
      setCurrentFrame(frameIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="h-[400vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-[80%] max-w-[600px] aspect-video overflow-hidden rounded-lg">
              {imageUrls.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Frame ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                    index === currentFrame ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div className="absolute bottom-8 text-white/50 text-sm">
              Frame {currentFrame + 1} / {imageUrls.length} - Scroll to animate
            </div>
          </div>
        </div>
      </div>
    </DemoContainer>
  );
}
