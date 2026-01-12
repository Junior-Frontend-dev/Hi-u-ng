import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ButtonMagnetic() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      const distance = Math.sqrt(x*x + y*y);
      const hoverArea = 150;

      if (distance < hoverArea) {
         btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
         btn.style.transition = 'transform 0.1s ease-out';
      } else {
         btn.style.transform = 'translate(0px, 0px)';
         btn.style.transition = 'transform 0.5s ease-out';
      }
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s ease-out';
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        btn?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button ref={btnRef} className={`${baseClass} bg-black border border-white/20 rounded-full px-12 py-6 hover:bg-white hover:text-black transition-colors duration-300`}>
          <span className="pointer-events-none text-lg">MAGNETIC</span>
        </button>
      </div>
    </DemoContainer>
  );
}