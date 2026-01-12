import React, { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxResistance() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    // --- RESISTANCE LOGIC ---
    // Instead of linear mapping, we use a logarithmic scale to simulate resistance
    // The further you pull, the less it moves (diminishing returns)
    const distance = Math.sqrt(dx*dx + dy*dy);
    const maxDist = 200; // Pixels
    const resistance = 0.3 * (1 - Math.min(distance, maxDist) / (maxDist * 1.5)); // Resistance increases
    
    setPos({ x: dx * Math.max(0.1, resistance), y: dy * Math.max(0.1, resistance) });
  };

  const handleEnd = () => {
    setIsDragging(false);
    setPos({ x: 0, y: 0 }); // Snap back
  };

  return (
    <DemoContainer className="bg-[#050505] cursor-default">
      <div 
        ref={containerRef}
        className="w-full h-full flex flex-col items-center justify-center select-none"
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className="text-center mb-16 pointer-events-none">
            <h2 className="text-white/20 text-xs font-mono tracking-[0.5em] uppercase mb-4">Physics Simulation</h2>
            <h3 className="text-white text-3xl font-bold italic tracking-tighter">TACTILE FRICTION</h3>
        </div>

        <div 
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            style={{ 
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.x * 0.05}deg)`,
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' // Elastic snap back
            }}
            className={`
                w-40 h-40 rounded-3xl cursor-grab active:cursor-grabbing
                flex items-center justify-center relative group z-10
                ${isDragging ? 'bg-white scale-110' : 'bg-[#111] border border-white/10 hover:border-white/30'}
                transition-colors duration-300
            `}
        >
            {/* Inner Glow */}
            <div className={`absolute inset-0 rounded-3xl bg-blue-500/20 blur-xl transition-opacity duration-300 ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className={`relative z-10 font-black text-lg tracking-widest uppercase transition-colors ${isDragging ? 'text-black' : 'text-white'}`}>
                {isDragging ? 'RELEASE' : 'DRAG ME'}
            </div>
        </div>

        {/* Tension Line (Visualizing the force) */}
        {isDragging && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line 
                    x1="50%" y1="50%" 
                    x2={`calc(50% + ${pos.x}px)`} y2={`calc(50% + ${pos.y}px)`} 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="2" 
                    strokeDasharray="6 6"
                />
                <circle cx="50%" cy="50%" r="4" fill="rgba(255,255,255,0.2)" />
            </svg>
        )}

        <p className="mt-16 text-white/30 text-xs font-mono max-w-xs text-center leading-relaxed pointer-events-none">
            Logarithmic resistance curve simulates physical weight and friction.
        </p>
      </div>
    </DemoContainer>
  );
}