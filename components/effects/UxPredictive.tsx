import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxPredictive() {
  const [hovered, setHovered] = useState(false);
  const [proximity, setProximity] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDist = 300;
      
      // Calculate proximity (0 to 1)
      // 1 = extremely close, 0 = far
      const val = Math.max(0, (maxDist - dist) / maxDist);
      setProximity(val); // Non-linear curve for smoother feeling
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
        <button
            ref={btnRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative px-12 py-6 bg-blue-600 rounded-2xl text-white font-bold text-xl transition-all duration-100 ease-out"
            style={{
                transform: `scale(${1 + proximity * 0.2}) translateY(${proximity * -20}px)`,
                boxShadow: `0 ${proximity * 30}px ${proximity * 50}px rgba(37,99,235,${proximity * 0.5})`
            }}
        >
            <span className="relative z-10">{hovered ? "Welcome!" : "Approach Me"}</span>
            {/* Anticipatory Glow */}
            <div 
                className="absolute inset-0 bg-white rounded-2xl blur-xl transition-opacity duration-100"
                style={{ opacity: proximity * 0.3 }}
            />
        </button>
      </div>
    </DemoContainer>
  );
}