import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorRipple() {
  const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, {x, y, id}]);
    
    // Remove ripple after animation
    setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-[#1a1a1a] relative overflow-hidden cursor-pointer" 
        onClick={handleClick}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white/30 text-xl font-light">Click anywhere</p>
        </div>

        {ripples.map(ripple => (
            <div 
                key={ripple.id}
                className="absolute rounded-full border border-white/50 animate-ripple pointer-events-none"
                style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: 'translate(-50%, -50%)',
                    width: '0px',
                    height: '0px',
                }}
            />
        ))}

        <style>{`
            @keyframes ripple {
                0% { width: 0px; height: 0px; opacity: 1; border-width: 5px; }
                100% { width: 500px; height: 500px; opacity: 0; border-width: 0px; }
            }
            .animate-ripple {
                animation: ripple 0.8s ease-out forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}