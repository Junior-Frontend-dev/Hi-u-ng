import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorReveal() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      setPos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative overflow-hidden">
        
        {/* The hidden image */}
        <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
                // The Mask
                maskImage: `radial-gradient(circle 200px at ${pos.x}px ${pos.y}px, black 10%, transparent 90%)`,
                WebkitMaskImage: `radial-gradient(circle 200px at ${pos.x}px ${pos.y}px, black 10%, transparent 90%)`,
            }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white/20 text-sm tracking-[0.5em] uppercase">Use the light</p>
        </div>

      </div>
    </DemoContainer>
  );
}