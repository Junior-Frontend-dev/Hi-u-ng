import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionParallaxStack() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2);
    const y = (e.clientY - rect.top - rect.height/2);
    setPos({ x, y });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-[#eee] flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="relative w-64 h-80">
            {/* Layer 1 (Bottom - Slow) */}
            <div 
                className="absolute inset-0 bg-blue-500 rounded-xl shadow-xl transition-transform duration-100 ease-out"
                style={{ transform: `translate(${pos.x * 0.05}px, ${pos.y * 0.05}px) rotate(-5deg)` }}
            ></div>
            
            {/* Layer 2 (Mid) */}
            <div 
                className="absolute inset-0 bg-yellow-400 rounded-xl shadow-xl transition-transform duration-100 ease-out"
                style={{ transform: `translate(${pos.x * 0.1}px, ${pos.y * 0.1}px) rotate(2deg)` }}
            ></div>

            {/* Layer 3 (Top - Fast) */}
            <div 
                className="absolute inset-0 bg-white rounded-xl shadow-2xl transition-transform duration-100 ease-out flex items-center justify-center p-8 border border-black/5"
                style={{ transform: `translate(${pos.x * 0.2}px, ${pos.y * 0.2}px)` }}
            >
                <h1 className="text-4xl font-black text-black">STACK</h1>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}