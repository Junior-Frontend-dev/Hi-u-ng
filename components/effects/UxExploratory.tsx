import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxExploratory() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-20 p-20 pointer-events-none opacity-20">
            {/* Hidden content */}
            {[...Array(12)].map((_, i) => (
                <div key={i} className="w-32 h-32 border border-white/20 flex items-center justify-center text-white/50 font-mono">
                    NODE_{i}
                </div>
            ))}
        </div>

        {/* Flashlight Mask Layer */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                background: `radial-gradient(circle 150px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`
            }}
        />

        {/* Revealed Content Highlight */}
        <div 
            className="absolute w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-overlay"
            style={{ 
                left: pos.x, 
                top: pos.y, 
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 100px 50px rgba(255,255,255,0.1)'
            }}
        />
      </div>
    </DemoContainer>
  );
}