import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandLivingLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate direction vector
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Limit movement radius (eye socket)
        const maxDist = 5; 
        const moveX = (dx / dist) * Math.min(dist, maxDist) || 0;
        const moveY = (dy / dist) * Math.min(dist, maxDist) || 0;

        setEyePos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <DemoContainer className="bg-white flex items-center justify-center">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg 
            ref={svgRef}
            width="120" height="120" viewBox="0 0 100 100" 
            className="transition-transform duration-300 group-hover:scale-110"
        >
            {/* Base Shape */}
            <circle cx="50" cy="50" r="45" fill="black" />
            
            {/* "Eyes" White Background */}
            <path d="M30 40 Q50 60 70 40 Q50 20 30 40" fill="white" />
            
            {/* Moving Pupil */}
            <circle 
                cx={50 + eyePos.x} 
                cy={40 + eyePos.y} 
                r={isHovering ? 6 : 4} 
                fill="black"
                className="transition-all duration-100"
            />

            {/* Mouth */}
            <path 
                d={isHovering ? "M35 70 Q50 85 65 70" : "M40 75 Q50 75 60 75"} 
                stroke="white" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
                className="transition-all duration-300"
            />
        </svg>
        <div className="text-center mt-8 font-bold tracking-widest text-black opacity-20">LIVING BRAND</div>
      </div>
    </DemoContainer>
  );
}