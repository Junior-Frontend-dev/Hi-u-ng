import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeDepthMap() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ 
        x: (e.clientX - rect.left - rect.width/2) / 20, 
        y: (e.clientY - rect.top - rect.height/2) / 20 
    });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="relative w-[80%] h-[80%] overflow-hidden rounded-xl">
            {/* Background (Moves less) */}
            <div 
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80)',
                    transform: `translate(${pos.x * 0.5}px, ${pos.y * 0.5}px)`
                }}
            />
            {/* Foreground Overlay (Moves more to simulate depth) */}
            <h1 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-white mix-blend-overlay"
                style={{ transform: `translate(calc(-50% + ${pos.x * 2}px), calc(-50% + ${pos.y * 2}px))` }}
            >
                DEPTH
            </h1>
        </div>
      </div>
    </DemoContainer>
  );
}