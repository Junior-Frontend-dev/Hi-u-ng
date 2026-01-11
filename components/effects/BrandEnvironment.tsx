import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandEnvironment() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ 
        x: (e.clientX - rect.left) / rect.width, 
        y: (e.clientY - rect.top) / rect.height 
    });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-gradient-to-b from-blue-900 to-black overflow-hidden relative perspective-[1000px]"
        onMouseMove={handleMouseMove}
      >
        {/* Floor */}
        <div 
            className="absolute bottom-[-50%] left-[-50%] w-[200%] h-[100%] bg-[linear-gradient(#4f46e5_1px,transparent_1px),linear-gradient(90deg,#4f46e5_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"
            style={{ 
                transform: `rotateX(60deg) translateY(${pos.y * 100}px) translateX(${pos.x * 50}px)` 
            }}
        />

        {/* Floating Brand Pillars */}
        <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
            {[1, 2, 3].map(i => (
                <div 
                    key={i}
                    className="absolute w-20 h-60 bg-blue-500/20 backdrop-blur border border-blue-400/50 shadow-[0_0_30px_#3b82f6]"
                    style={{
                        transform: `
                            translateX(${(i-1) * 200 + (pos.x - 0.5) * -100}px) 
                            translateZ(${(i-1) * 100}px)
                            rotateY(${(pos.x - 0.5) * 40}deg)
                        `
                    }}
                />
            ))}
        </div>
      </div>
    </DemoContainer>
  );
}