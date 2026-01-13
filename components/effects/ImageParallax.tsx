import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

const layers = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', speed: 0.2, scale: 1.3 },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', speed: 0.5, scale: 1.2 },
  { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800', speed: 0.8, scale: 1.1 },
];

export default function ImageParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      layerRefs.current.forEach((layer, index) => {
        if (layer) {
          const speed = layers[index].speed;
          layer.style.transform = `translateY(${scrollTop * speed}px) scale(${layers[index].scale})`;
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="relative h-[200vh]">
          {layers.map((layer, index) => (
            <div
              key={index}
              ref={(el) => { layerRefs.current[index] = el; }}
              className="absolute inset-0 flex items-start justify-center pt-20"
              style={{ zIndex: index }}
            >
              <img
                src={layer.src}
                alt={`Layer ${index + 1}`}
                className="w-[60%] max-w-[500px] rounded-lg opacity-80"
                style={{ transform: `scale(${layer.scale})` }}
              />
            </div>
          ))}
          <div className="absolute top-8 left-0 right-0 text-center">
            <p className="text-white/70 text-lg">Scroll to see parallax effect</p>
          </div>
        </div>
      </div>
    </DemoContainer>
  );
}
