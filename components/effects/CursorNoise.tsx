import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorNoise() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative overflow-hidden">
        
        {/* Clean Top Layer */}
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <h1 className="text-8xl font-black text-neutral-800 select-none">SILENCE</h1>
        </div>

        {/* Noise Mask following cursor */}
        <div 
            className="absolute inset-0 z-20 pointer-events-none bg-noise"
            style={{
                maskImage: `radial-gradient(circle 150px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 150px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
            }}
        >
             {/* Text revealed in noise */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <h1 className="text-8xl font-black text-white select-none">NOISE</h1>
             </div>
        </div>

      </div>
    </DemoContainer>
  );
}