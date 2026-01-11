import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const WORDS = ["TRUST", "INNOVATION", "SPEED", "QUALITY"];

export default function BrandExploration() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) / rect.width;
    const y = (e.clientY - rect.top - rect.height/2) / rect.height;
    setPos({ x, y });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center overflow-hidden perspective-[1000px]"
        onMouseMove={handleMouseMove}
      >
        <div className="relative w-full h-full transform-style-3d">
            {WORDS.map((word, i) => (
                <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 text-4xl font-bold text-white/80 transition-all duration-300 ease-out"
                    style={{
                        transform: `
                            translate(-50%, -50%) 
                            translate3d(${pos.x * (i+1) * 100}px, ${pos.y * (i+1) * 100}px, ${(i) * 50}px)
                            rotateX(${pos.y * 20}deg)
                            rotateY(${pos.x * 20}deg)
                        `,
                        opacity: 1 - Math.abs(pos.x * 2) // Fade at edges
                    }}
                >
                    {word}
                </div>
            ))}
            <p className="absolute bottom-10 left-0 w-full text-center text-white/30 pointer-events-none">Explore the cloud</p>
        </div>
      </div>
    </DemoContainer>
  );
}