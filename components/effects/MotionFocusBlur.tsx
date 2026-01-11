import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionFocusBlur() {
  const [blur, setBlur] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const vel = Math.sqrt(dx*dx + dy*dy);
        
        // Map velocity to blur
        setBlur(Math.min(vel * 0.2, 10)); // Max 10px blur
        
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    // Decay loop to restore focus when stopped
    const interval = setInterval(() => {
        setBlur(b => Math.max(0, b - 1));
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(interval);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center">
        <div 
            className="text-center transition-all duration-75 ease-out"
            style={{ filter: `blur(${blur}px)` }}
        >
            <h1 className="text-8xl font-black text-black mb-4">FOCUS</h1>
            <p className="text-gray-500 text-xl">Stop moving to see clearly</p>
        </div>
      </div>
    </DemoContainer>
  );
}