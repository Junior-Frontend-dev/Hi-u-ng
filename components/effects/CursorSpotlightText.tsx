import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorSpotlightText() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center p-20 cursor-none"
        onMouseMove={handleMouseMove}
      >
        <p 
            className="text-4xl md:text-6xl font-serif text-justify leading-relaxed pointer-events-none"
            style={{
                color: 'rgba(255,255,255,0.1)',
                backgroundImage: `radial-gradient(circle 150px at ${pos.x}px ${pos.y}px, white 0%, transparent 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
        >
            In the deepest shadows, the faintest light becomes a beacon. 
            Words are merely vessels for ideas, waiting to be illuminated by the reader's attention. 
            Only what you focus on truly exists in this moment.
        </p>
      </div>
    </DemoContainer>
  );
}