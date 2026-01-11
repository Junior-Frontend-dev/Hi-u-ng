import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function Type3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20; // Dampening
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setRotation({ x: -y, y: x });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full flex items-center justify-center bg-black perspective-[1000px] overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div 
            className="relative text-[12vw] font-black leading-none uppercase select-none transition-transform duration-100 ease-out"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
            {/* Back Layers */}
            <span className="absolute inset-0 text-cyan-500 opacity-40" style={{ transform: 'translateZ(-50px)' }}>LAYER</span>
            <span className="absolute inset-0 text-purple-500 opacity-40" style={{ transform: 'translateZ(-25px)' }}>LAYER</span>
            
            {/* Main Layer */}
            <span className="relative text-white z-10 mix-blend-screen">LAYER</span>
            
            {/* Front Layers */}
            <span className="absolute inset-0 text-red-500 opacity-40 pointer-events-none" style={{ transform: 'translateZ(25px)' }}>LAYER</span>
            <span className="absolute inset-0 text-yellow-500 opacity-40 pointer-events-none" style={{ transform: 'translateZ(50px)' }}>LAYER</span>
        </div>

        <p className="absolute bottom-10 text-white/30 text-xs tracking-widest pointer-events-none">
            Move cursor to explore depth
        </p>
      </div>
    </DemoContainer>
  );
}