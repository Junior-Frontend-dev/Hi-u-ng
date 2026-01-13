import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorMultiFollower() {
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useRef<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Init positions off-screen
    positions.current = Array(5).fill({ x: -1000, y: -1000 });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      // Reset all positions to prevent ghost effect
      positions.current = Array(5).fill({ x: -1000, y: -1000 });
    };

    const animate = () => {
        positions.current = positions.current.map((pos, i) => {
            // Each circle has slower lerp factor
            const factor = 0.5 - (i * 0.08); 
            return {
                x: pos.x + (mouse.current.x - pos.x) * factor,
                y: pos.y + (mouse.current.y - pos.y) * factor
            };
        });

        circlesRef.current.forEach((el, i) => {
            if (el) {
                el.style.transform = `translate3d(${positions.current[i].x}px, ${positions.current[i].y}px, 0) translate(-50%, -50%)`;
            }
        });

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
      {/* Circles */}
      {[...Array(5)].map((_, i) => (
        <div 
            key={i}
            ref={el => { if(el) circlesRef.current[i] = el }}
            className="fixed top-0 left-0 rounded-full border border-white pointer-events-none z-50 mix-blend-difference"
            style={{ 
                width: `${60 - i * 10}px`, 
                height: `${60 - i * 10}px`,
                opacity: 1 - i * 0.15 
            }}
        />
      ))}

      <div className="h-full w-full bg-white flex items-center justify-center">
        <h1 className="text-4xl font-bold text-black tracking-widest">TUNNEL</h1>
      </div>
    </DemoContainer>
  );
}