import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorSpotlightVideo() {
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
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-overlay">
            <h1 className="text-white text-9xl font-black opacity-50">DISCOVER</h1>
        </div>

        {/* Video Layer */}
        <div 
            className="absolute inset-0 bg-black"
            style={{
                // Smoother mask with noise
                maskImage: `radial-gradient(circle 250px at ${pos.x}px ${pos.y}px, black 20%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 250px at ${pos.x}px ${pos.y}px, black 20%, transparent 100%)`,
            }}
        >
            <video 
                src="https://cdn.coverr.co/videos/coverr-colorful-powder-in-slow-motion-4864/1080p.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            />
            {/* Grain Overlay inside spotlight */}
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
        </div>
        
        {/* Helper text */}
        <div className="absolute bottom-10 left-0 w-full text-center text-white/30 pointer-events-none">
            Search in the dark
        </div>
      </div>
    </DemoContainer>
  );
}