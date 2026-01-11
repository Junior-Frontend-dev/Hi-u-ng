import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionEcho() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPos({ x, y });
    setTrail(prev => [...prev.slice(-10), { x, y, id: Date.now() }]);
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Echoes */}
        {trail.map((p, i) => (
            <div 
                key={p.id}
                className="absolute w-12 h-12 bg-cyan-500 rounded-full pointer-events-none mix-blend-screen"
                style={{
                    left: p.x,
                    top: p.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: (i / trail.length) * 0.5,
                    scale: 1 - ((trail.length - i) * 0.05)
                }}
            />
        ))}

        {/* Main Cursor */}
        <div 
            className="absolute w-12 h-12 bg-white rounded-full pointer-events-none mix-blend-difference z-10"
            style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)'
            }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-white/20 font-bold tracking-widest">ECHO</h2>
        </div>
      </div>
    </DemoContainer>
  );
}