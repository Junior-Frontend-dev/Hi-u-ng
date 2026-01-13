import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const cards = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', title: 'Mountain' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600', title: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600', title: 'Lake' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', title: 'Valley' },
];

export default function StickyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const offset = scrollTop - index * 300;
        const progress = Math.max(0, Math.min(1, offset / 300));
        const scale = 1 - progress * 0.05;
        const translateY = Math.min(offset * 0.3, 50);
        card.style.transform = `scale(${scale}) translateY(${-translateY}px)`;
        card.style.opacity = String(1 - progress * 0.3);
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer className="bg-neutral-900">
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="h-[100px]" />
        <div className="relative">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="sticky top-20 mx-auto w-[80%] max-w-[400px] bg-neutral-800 rounded-xl overflow-hidden shadow-2xl mb-8"
              style={{ zIndex: cards.length - index }}
            >
              <img src={card.src} alt={card.title} className="w-full aspect-video object-cover" />
              <div className="p-4">
                <h3 className="text-white text-lg font-semibold">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[400px]" />
      </div>
    </DemoContainer>
  );
}
