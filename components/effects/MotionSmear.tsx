import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionSmear() {
  const ballRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
        // Relative to window for simplicity in demo
        // but ideally container relative.
        mouse.current = { x: e.clientX, y: e.clientY };
    };

    let raf: number;
    const animate = () => {
        if (!ballRef.current) return;

        // Lerp
        const lastX = pos.current.x;
        const lastY = pos.current.y;
        
        pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
        pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

        // Calculate velocity
        const vx = pos.current.x - lastX;
        const vy = pos.current.y - lastY;
        const vel = Math.sqrt(vx*vx + vy*vy);
        const angle = Math.atan2(vy, vx);

        // Smear: Stretch scaleX based on velocity
        const scale = 1 + Math.min(vel * 0.1, 2); 
        
        ballRef.current.style.transform = `
            translate3d(${pos.current.x}px, ${pos.current.y}px, 0) 
            rotate(${angle}rad) 
            scaleX(${scale}) 
            scaleY(${1/scale}) 
            translate(-50%, -50%)
        `;

        raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div className="fixed top-0 left-0 pointer-events-none z-50">
          <div ref={ballRef} className="w-16 h-16 bg-red-600 rounded-full mix-blend-screen opacity-80 shadow-[0_0_30px_rgba(220,38,38,0.6)]"></div>
      </div>
      <div className="h-full w-full bg-black flex items-center justify-center">
          <h1 className="text-6xl font-black text-white italic">SMEAR</h1>
      </div>
    </DemoContainer>
  );
}