import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorInertia() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      // Reset position to prevent ghost effect on re-entry
      pos.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
        // Heavy Lerp (0.05)
        pos.current.x += (mouse.current.x - pos.current.x) * 0.05;
        pos.current.y += (mouse.current.y - pos.current.y) * 0.05;

        // Calculate rotation based on movement
        const dx = mouse.current.x - pos.current.x;
        const rot = dx * 0.1;

        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
        }
        requestAnimationFrame(animate);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    const rafId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
        cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 bg-white/20 backdrop-blur border border-white rounded-lg pointer-events-none z-50 will-change-transform"
      />
      <div className="h-full w-full bg-black flex items-center justify-center">
        <h1 className="text-4xl text-white/30 font-bold">Heavy Drag</h1>
      </div>
    </DemoContainer>
  );
}