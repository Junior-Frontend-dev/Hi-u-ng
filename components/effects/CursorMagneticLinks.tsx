import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const MagneticLink = ({ text }: { text: string }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Attraction range
        const x = (e.clientX - centerX) * 0.5;
        const y = (e.clientY - centerY) * 0.5;
        
        setPos({ x, y });
    };

    const reset = () => setPos({ x: 0, y: 0 });

    return (
        <a 
            href="#"
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="text-4xl font-bold text-white relative group block w-max"
            style={{ 
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)'
            }}
        >
            <span className="relative z-10">{text}</span>
            <div className="absolute inset-x-0 bottom-0 h-2 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            {/* Magnetic Glow */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
        </a>
    );
};

export default function CursorMagneticLinks() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#111] flex flex-col items-center justify-center gap-12 p-8">
        <MagneticLink text="Instagram" />
        <MagneticLink text="Twitter" />
        <MagneticLink text="LinkedIn" />
        <MagneticLink text="Dribbble" />
      </div>
    </DemoContainer>
  );
}