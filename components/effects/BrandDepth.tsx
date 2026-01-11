import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandDepth() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) / 20;
    const y = (e.clientY - rect.top - rect.height/2) / 20;
    setOffset({ x, y });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden perspective-[1000px]"
        onMouseMove={handleMouseMove}
      >
        <div className="relative text-center select-none">
            {/* Layer 1 (Deepest) */}
            <h1 
                className="text-[12rem] font-black text-[#1a1a1a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                style={{ transform: `translate(-50%, -50%) translate(${offset.x * 0.5}px, ${offset.y * 0.5}px) scale(0.9)` }}
            >
                DEPTH
            </h1>

            {/* Layer 2 */}
            <h1 
                className="text-[12rem] font-black text-[#2a2a2a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                style={{ transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)` }}
            >
                DEPTH
            </h1>

            {/* Layer 3 (Front) */}
            <h1 
                className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600 relative z-10 whitespace-nowrap"
                style={{ transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)` }}
            >
                DEPTH
            </h1>
        </div>
      </div>
    </DemoContainer>
  );
}