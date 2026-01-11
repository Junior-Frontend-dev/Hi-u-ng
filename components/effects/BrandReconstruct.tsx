import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function BrandReconstruct() {
  const [key, setKey] = useState(0);
  const [assembled, setAssembled] = useState(false);

  // Logo Parts: Just simple geometric shapes for demo
  const parts = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    targetX: (i % 3) * 60, // 3x3 grid
    targetY: Math.floor(i / 3) * 60,
    // Random start positions far away
    startX: (Math.random() - 0.5) * 800,
    startY: (Math.random() - 0.5) * 800,
    rotate: (Math.random() - 0.5) * 720,
    delay: i * 0.05
  }));

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setAssembled(true), 100);
    return () => clearTimeout(timer);
  }, [key]);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden">
        
        <div className="relative w-[180px] h-[180px]">
            {parts.map(p => (
                <div 
                    key={`${key}-${p.id}`}
                    className="absolute w-[60px] h-[60px] bg-white border border-black transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{
                        left: 0,
                        top: 0,
                        transform: assembled 
                            ? `translate(${p.targetX}px, ${p.targetY}px) rotate(0deg)` 
                            : `translate(${p.startX}px, ${p.startY}px) rotate(${p.rotate}deg) scale(0)`,
                        opacity: assembled ? 1 : 0,
                        transitionDelay: `${p.delay}s`
                    }}
                >
                    {/* Inner detail to show orientation */}
                    <div className="w-2 h-2 bg-black rounded-full absolute top-2 right-2 opacity-20"></div>
                </div>
            ))}
        </div>

        <div className={`absolute bottom-20 text-white transition-opacity duration-1000 ${assembled ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold tracking-[0.5em] text-center">STRUCTURE</h1>
        </div>

        <button 
            onClick={() => { setAssembled(false); setTimeout(() => setKey(k => k + 1), 50); }}
            className="absolute bottom-8 right-8 text-white/50 hover:text-white transition-colors"
        >
            <RefreshCcw />
        </button>

      </div>
    </DemoContainer>
  );
}