import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const Char: React.FC<{ char: string }> = ({ char }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 100) {
            const pull = (100 - dist) / 100; // 0 to 1
            setPos({ x: dx * pull * 0.5, y: dy * pull * 0.5 });
        } else {
            setPos({ x: 0, y: 0 });
        }
    };

    const reset = () => setPos({ x: 0, y: 0 });

    return (
        <span 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="inline-block transition-transform duration-100 ease-out cursor-default"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    );
};

export default function CursorMagneticText() {
  const text = "MAGNETIC ATTRACTION";

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        <h1 className="text-6xl font-black text-white flex pointer-events-auto p-20">
            {text.split('').map((c, i) => <Char key={i} char={c} />)}
        </h1>
      </div>
    </DemoContainer>
  );
}