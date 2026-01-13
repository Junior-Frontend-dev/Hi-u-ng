import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    // Reset position to prevent spotlight staying at edge
    setPos({ x: -1000, y: -1000 });
  };

  return (
    <DemoContainer>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full w-full bg-black p-8 grid grid-cols-3 gap-4 relative overflow-hidden"
      >
        {/* Spotlight Overlay */}
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
                opacity,
                background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.1), transparent 40%)`
            }}
        />

        {[...Array(6)].map((_, i) => (
            <div key={i} className="relative bg-neutral-900 border border-white/5 rounded-xl p-6 flex flex-col justify-end group overflow-hidden">
                {/* Individual card spotlight border using before/after pattern is popular, but here we used global container spotlight above. 
                    Let's add a subtle individual highlight too. 
                */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />
                <h3 className="text-white font-bold text-xl relative z-20">Card {i+1}</h3>
                <p className="text-white/40 text-sm relative z-20">Spotlight illuminates borders.</p>
            </div>
        ))}
      </div>
    </DemoContainer>
  );
}