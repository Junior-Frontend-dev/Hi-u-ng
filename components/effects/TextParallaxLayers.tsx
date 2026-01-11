import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextParallaxLayers() {
  const [mousePos, setMousePos] = useState({ x: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 100 });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="relative text-white font-black text-9xl text-center">
            
            {/* Back Layer */}
            <div 
                className="opacity-30 absolute top-0 left-0 w-full"
                style={{ transform: `translateX(${mousePos.x * 0.5}px) scale(0.9)` }}
            >
                PARALLAX
            </div>

            {/* Mid Layer */}
            <div 
                className="opacity-60 absolute top-0 left-0 w-full"
                style={{ transform: `translateX(${mousePos.x * 1}px) scale(0.95)` }}
            >
                PARALLAX
            </div>

            {/* Front Layer */}
            <div 
                className="relative z-10 mix-blend-overlay"
                style={{ transform: `translateX(${mousePos.x * 1.5}px)` }}
            >
                PARALLAX
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}