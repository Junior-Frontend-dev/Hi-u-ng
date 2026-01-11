import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorSpeedScale() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        
        const dx = e.clientX - prevPos.current.x;
        const dy = e.clientY - prevPos.current.y;
        const velocity = Math.sqrt(dx*dx + dy*dy);
        
        // Scale based on speed
        const scale = 1 + Math.min(velocity * 0.1, 4); // Max scale 5x
        
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${scale})`;
        
        prevPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-orange-500 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out mix-blend-screen"
      />

      <div className="h-full w-full bg-black flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white/20">Move Fast</h1>
      </div>
    </DemoContainer>
  );
}