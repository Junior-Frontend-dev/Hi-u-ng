import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const Particle: React.FC<{ x: number, y: number, mouseX: number, mouseY: number }> = ({ x, y, mouseX, mouseY }) => {
    // Calculate distance
    const dx = mouseX - x;
    const dy = mouseY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Attraction force (stronger when closer, but clamped)
    const maxDist = 200;
    const strength = Math.max(0, (maxDist - dist) / maxDist);
    
    // Move towards mouse based on strength
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

  useEffect(() => {
      // Create grid of particles
      const parts = [];
      for(let i=0; i<10; i++) {
          for(let j=0; j<10; j++) {
              parts.push({ x: 50 + i * 80, y: 50 + j * 60 });
          }
      }
      setParticles(parts);

      const onMouseMove = (e: MouseEvent) => {
          // Ideally relative to container
          const rect = document.getElementById('gravity-container')?.getBoundingClientRect();
          if(rect) {
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
      };
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer>
      <div id="gravity-container" className="h-full w-full bg-black relative overflow-hidden">
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