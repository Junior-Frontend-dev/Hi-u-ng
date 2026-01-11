import React, { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const IMAGES = [
    { title: "Mountain View", src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&q=80" },
    { title: "Ocean Breeze", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
    { title: "Forest Mist", src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&q=80" },
];

export default function CursorTooltip() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const onMouseMove = (e: MouseEvent) => {
        // We want tooltip relative to mouse, fixed works easiest if using global coords
        setPos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer>
      <div ref={containerRef} className="h-full w-full bg-black flex items-center justify-center gap-6 p-10">
        
        {/* Tooltip Element */}
        <div 
            className={`
                fixed z-50 pointer-events-none px-4 py-2 bg-white text-black text-sm font-bold rounded-lg shadow-xl
                transform -translate-y-full -translate-x-1/2 transition-all duration-300
                ${tooltip ? 'opacity-100 mt-[-16px]' : 'opacity-0 mt-[0px]'}
            `}
            style={{ 
                left: pos.x, 
                top: pos.y 
            }}
        >
            {tooltip}
        </div>

        {IMAGES.map((img, i) => (
            <div 
                key={i}
                className="w-1/3 aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden relative cursor-none grayscale hover:grayscale-0 transition-all duration-500"
                onMouseEnter={() => setTooltip(img.title)}
                onMouseLeave={() => setTooltip(null)}
            >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            </div>
        ))}
      </div>
    </DemoContainer>
  );
}