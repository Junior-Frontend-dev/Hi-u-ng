import React, { useMemo } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeGeometry() {
  // Generate random shapes
  const shapes = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 50 + 20,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative overflow-hidden">
        {shapes.map((s, i) => (
            <div 
                key={i}
                className="absolute border border-white/30 animate-grow-fade"
                style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    animationDelay: `${s.delay}s`
                }}
            />
        ))}
        
        <style>{`
            @keyframes grow-fade {
                0% { transform: scale(0); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
            .animate-grow-fade { animation: grow-fade 4s infinite ease-out; }
        `}</style>
      </div>
    </DemoContainer>
  );
}