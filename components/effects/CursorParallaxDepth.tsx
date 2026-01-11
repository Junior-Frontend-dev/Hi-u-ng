import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorParallaxDepth() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20; // Max rotation factor
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setPos({ x, y });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center perspective-[1000px] overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div 
            className="relative w-80 h-96 bg-gray-900 border border-white/10 rounded-xl shadow-2xl transition-transform duration-100 ease-out"
            style={{ transform: `rotateX(${-pos.y}deg) rotateY(${pos.x}deg)` }}
        >
            {/* Layer 1 (Back) */}
            <div 
                className="absolute inset-0 bg-blue-500/10 rounded-xl" 
                style={{ transform: 'translateZ(-50px) scale(0.9)' }} 
            />
            
            {/* Layer 2 (Middle) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-white">Depth</h2>
                <p className="text-white/50">Holographic UI</p>
            </div>

            {/* Layer 3 (Front - Floating Element) */}
            <div 
                className="absolute top-10 right-10 w-12 h-12 bg-purple-500 rounded-full blur-md opacity-60"
                style={{ transform: 'translateZ(60px)' }}
            />
            <div 
                className="absolute bottom-10 left-10 w-20 h-2 bg-blue-400 rounded-full"
                style={{ transform: 'translateZ(40px)' }}
            />
        </div>
      </div>
    </DemoContainer>
  );
}