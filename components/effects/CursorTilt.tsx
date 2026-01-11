import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Center is (0,0)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalize -1 to 1
    const rotateY = ((x - centerX) / centerX) * 20; // Max rotation 20deg
    const rotateX = ((y - centerY) / centerY) * -20; // Inverted X for tilt feel

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center perspective-[1000px]">
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-80 h-96 bg-gradient-to-br from-neutral-800 to-black rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden transition-transform duration-100 ease-out"
            style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Glare effect */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)`,
                    transform: `translateX(${rotation.y * 2}%) translateY(${rotation.x * 2}%)`,
                    opacity: Math.abs(rotation.x) + Math.abs(rotation.y) > 0 ? 1 : 0,
                    transition: 'opacity 0.2s'
                }}
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 pointer-events-none transform translate-z-10" style={{ transform: 'translateZ(50px)' }}>
                <h2 className="text-3xl font-bold mb-2">3D Tilt</h2>
                <p className="text-center text-white/50">Move cursor to rotate</p>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}