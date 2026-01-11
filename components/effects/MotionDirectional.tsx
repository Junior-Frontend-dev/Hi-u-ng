import React, { useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionDirectional() {
  const [direction, setDirection] = useState<'left' | 'right' | 'idle'>('idle');
  const lastX = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const delta = e.clientX - lastX.current;
    if (Math.abs(delta) > 2) {
        setDirection(delta > 0 ? 'right' : 'left');
    } else {
        // setDirection('idle'); // Optional: reset on stop
    }
    lastX.current = e.clientX;
  };

  return (
    <DemoContainer>
      <div 
        className={`h-full w-full flex items-center justify-center transition-colors duration-500
            ${direction === 'right' ? 'bg-emerald-500' : direction === 'left' ? 'bg-rose-500' : 'bg-gray-200'}
        `}
        onMouseMove={handleMouseMove}
      >
        <div className="text-center text-white mix-blend-hard-light">
            <h1 className="text-9xl font-black transition-transform duration-300 transform">
                {direction === 'right' ? '→' : direction === 'left' ? '←' : '↔'}
            </h1>
            <p className="text-2xl font-bold uppercase tracking-widest mt-4">
                {direction === 'right' ? 'Proceed' : direction === 'left' ? 'Reject' : 'Move'}
            </p>
        </div>
      </div>
    </DemoContainer>
  );
}