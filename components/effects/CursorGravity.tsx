import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

const Particle: React.FC<{ x: number, y: number, mouseX: number, mouseY: number }> = ({ x, y, mouseX, mouseY }) => {
    const dx = mouseX - x;
    const dy = mouseY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const maxDist = 200;
    const strength = Math.max(0, (maxDist - dist) / maxDist);
    
    const moveX = strength * dx * 0.5;
    const moveY = strength * dy * 0.5;

    return (
        <div 
            className="absolute w-2 h-2 bg-blue-400 rounded-full transition-transform duration-75 ease-out"
            style={{
                left: x,
                top: y,
                transform: `translate(${moveX}px, ${moveY}px)`,
                opacity: 0.3 + strength
            }}
        />
    )
}

export default function CursorGravity() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [particles, setParticles] = useState<{x: number, y: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const parts = [];
      for(let i=0; i<10; i++) {
          for(let j=0; j<10; j++) {
              parts.push({ x: 50 + i * 80, y: 50 + j * 60 });
          }
      }
      setParticles(parts);

      const onMouseMove = (e: MouseEvent) => {
          if(!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      };

      const onMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseleave', onMouseLeave);
      return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseleave', onMouseLeave);
      };
  }, []);

  return (
    <DemoContainer>
      <div ref={containerRef} className="h-full w-full bg-black relative overflow-hidden">
        {particles.map((p, i) => (
            <Particle key={i} x={p.x} y={p.y} mouseX={mousePos.x} mouseY={mousePos.y} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-white/20 font-bold text-2xl">Gravity Field</h2>
        </div>
      </div>
    </DemoContainer>
  );
}
