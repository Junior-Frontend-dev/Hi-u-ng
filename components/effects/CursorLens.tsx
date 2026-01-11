import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorLens() {
  const [pos, setPos] = useState({ xPx: 0, yPx: 0, xPct: 0, yPct: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate percentages for background position
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Store exact pixels for lens position
    setPos({ 
        xPx: e.clientX - rect.left, 
        yPx: e.clientY - rect.top,
        xPct: x, 
        yPct: y 
    });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-neutral-900 relative overflow-hidden group cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Base Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850523011-8f49ffc73908?w=1600&q=80)' }}
        />

        {/* Lens */}
        <div 
            className="absolute w-40 h-40 rounded-full border-2 border-white/50 shadow-2xl pointer-events-none z-10"
            style={{
                top: pos.yPx,
                left: pos.xPx,
                transform: 'translate(-50%, -50%)',
                backgroundImage: 'url(https://images.unsplash.com/photo-1614850523011-8f49ffc73908?w=1600&q=80)',
                backgroundSize: '300% 300%', // Magnification
                backgroundPosition: `${pos.xPct}% ${pos.yPct}%`,
            }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-6xl font-black text-white mix-blend-overlay">MAGNIFY</h1>
        </div>
      </div>
    </DemoContainer>
  );
}