import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionBloom() {
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
    setTrail(prev => [...prev.slice(-20), newPoint]);
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {trail.map((point) => (
            <div 
                key={point.id}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur-[40px] opacity-20 pointer-events-none animate-fade-out"
                style={{ 
                    left: point.x, 
                    top: point.y, 
                    transform: 'translate(-50%, -50%)' 
                }}
            />
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-6xl font-bold text-white mix-blend-overlay">BLOOM</h1>
        </div>

        <style>{`
            @keyframes fade-out {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.5; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
            .animate-fade-out {
                animation: fade-out 1s forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}