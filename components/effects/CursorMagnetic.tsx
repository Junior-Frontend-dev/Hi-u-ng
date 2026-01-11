import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { MousePointer2 } from 'lucide-react';

const MagneticButton = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const x = (e.clientX - centerX) * 0.4; // Magnetic strength
    const y = (e.clientY - centerY) * 0.4;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-white/10 rounded-full border border-white/10 text-white font-bold transition-transform duration-100 ease-out hover:bg-white/20"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </button>
  );
};

export default function CursorMagnetic() {
  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-black gap-16">
        <div className="text-center space-y-2">
            <MousePointer2 className="w-12 h-12 text-white mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-white">Magnetic Attraction</h2>
            <p className="text-gray-500">Buttons pull towards the cursor</p>
        </div>
        
        <div className="flex gap-8">
            <MagneticButton>Hover Me</MagneticButton>
            <MagneticButton>Snap To Me</MagneticButton>
            <MagneticButton>Physics</MagneticButton>
        </div>
      </div>
    </DemoContainer>
  );
}