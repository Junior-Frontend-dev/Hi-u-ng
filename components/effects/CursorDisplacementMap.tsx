import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorDisplacementMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <DemoContainer>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="h-full w-full bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Simulated Displacement via CSS Gradients/Transforms */}
        <div 
            className="w-[80%] h-[80%] bg-cover bg-center transition-transform duration-75 ease-out rounded-xl"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1518818419601-72c8673f5852?w=1200&q=80)',
                transform: `
                    perspective(1000px) 
                    rotateY(${(pos.x - 50) * 0.2}deg) 
                    rotateX(${-(pos.y - 50) * 0.2}deg)
                    scale(1.05)
                `,
                // Note: True pixel displacement requires WebGL. 
                // We simulate "Warp" by scaling and rotating slightly.
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />
            <h1 className="absolute bottom-8 left-8 text-6xl font-black text-white">WARP</h1>
        </div>
      </div>
    </DemoContainer>
  );
}