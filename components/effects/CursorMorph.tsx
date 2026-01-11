import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorMorph() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prevPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    let rafId: number;

    const update = () => {
        // We can't poll mouse position without event, so we rely on event listener to set target
        // and here we just smooth it? 
        // For simplicity, let's just do velocity calculation on mousemove for now, or use a loop if we had a target.
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        
        const dx = e.clientX - prevPos.current.x;
        const dy = e.clientY - prevPos.current.y;
        const velocity = Math.sqrt(dx*dx + dy*dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        // Stretch based on velocity
        const scaleX = 1 + Math.min(velocity * 0.05, 1); // Max stretch 2x
        const scaleY = 1 - Math.min(velocity * 0.02, 0.4); // Max squeeze

        cursorRef.current.style.transform = `
            translate3d(${e.clientX}px, ${e.clientY}px, 0) 
            translate(-50%, -50%) 
            rotate(${angle}deg) 
            scale(${scaleX}, ${scaleY})
        `;

        prevPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 bg-lime-400 rounded-full pointer-events-none z-50 mix-blend-exclusion transition-transform duration-100 ease-linear will-change-transform"
      />

      <div className="h-full w-full bg-black flex items-center justify-center">
        <p className="text-white/50">Move fast to stretch</p>
      </div>
    </DemoContainer>
  );
}