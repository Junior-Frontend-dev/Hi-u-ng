import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandExperience() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [vel, setVel] = useState(0);
  const lastPos = React.useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    
    const loop = () => {
        // Decay velocity
        setVel(v => v * 0.9);
        rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    setVel(Math.min(dist, 50));
    setPos({ x, y });
    lastPos.current = { x, y };
  };

  return (
    <DemoContainer className="cursor-none">
      <div 
        className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background Grid that warps */}
        <div 
            className="absolute inset-0 transition-transform duration-75 ease-out"
            style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                transform: `scale(${1 + vel * 0.01})`
            }}
        />

        {/* Custom Brand Cursor */}
        <div 
            className="fixed pointer-events-none z-50 w-24 h-24 rounded-full mix-blend-difference flex items-center justify-center" 
            style={{ 
                left: pos.x, 
                top: pos.y, 
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, #fff ${vel}%, transparent 70%)`
            }} 
        >
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>

        {/* Brand Content */}
        <div className="text-center relative z-10 pointer-events-none">
            <h1 
                className="text-9xl font-black text-white italic tracking-tighter mix-blend-difference transition-all duration-100"
                style={{
                    transform: `skewX(${vel * -0.5}deg) scaleY(${1 + vel * 0.01})`,
                    textShadow: `${vel}px 0px 0px rgba(255,0,0,0.5), ${-vel}px 0px 0px rgba(0,255,255,0.5)`
                }}
            >
                HYPE
            </h1>
            <p className="mt-8 font-mono text-white/50 tracking-[1em] text-sm">
                IMMERSIVE
            </p>
        </div>
      </div>
    </DemoContainer>
  );
}