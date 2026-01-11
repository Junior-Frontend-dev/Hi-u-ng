import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorBlend() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div 
        className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full pointer-events-none mix-blend-difference z-50 -ml-12 -mt-12"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      />

      <div className="h-full w-full bg-white flex items-center justify-center relative">
        <div className="absolute inset-y-0 left-1/2 w-1/2 bg-black flex items-center justify-center">
            {/* Right side (Black bg) */}
        </div>

        <h1 className="relative z-10 text-9xl font-black text-black mix-blend-difference pointer-events-none">
            CONTRAST
        </h1>
      </div>
    </DemoContainer>
  );
}