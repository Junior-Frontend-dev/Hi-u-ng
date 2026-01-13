import React, { useEffect, useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const SLICES = 10;

export default function SliceReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const slicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsRevealed(false);
    setTimeout(() => setIsRevealed(true), 100);
  };

  return (
    <DemoContainer className="bg-black">
      <div className="w-full h-full flex flex-col items-center justify-center gap-8">
        <div
          className="relative w-[80%] max-w-[500px] aspect-video overflow-hidden rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          {Array.from({ length: SLICES }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { slicesRef.current[index] = el; }}
              className="absolute top-0 overflow-hidden transition-transform duration-700 ease-out"
              style={{
                left: `${(index / SLICES) * 100}%`,
                width: `${100 / SLICES + 0.5}%`,
                height: '100%',
                transform: isRevealed ? 'translateY(0)' : `translateY(${index % 2 === 0 ? '-100%' : '100%'})`,
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                alt="Slice reveal"
                className="absolute top-0 h-full object-cover"
                style={{
                  left: `${-(index / SLICES) * 100}%`,
                  width: `${SLICES * 100}%`,
                }}
              />
            </div>
          ))}
        </div>
        <p className="text-white/50 text-sm">Click image to replay</p>
      </div>
    </DemoContainer>
  );
}
