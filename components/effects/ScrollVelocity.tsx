import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollVelocity() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });

  const lines = [
    "ACCELERATION", "MOMENTUM", "VELOCITY", "KINETICS", 
    "SPEED", "MOTION", "PHYSICS", "INERTIA"
  ];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white text-black">
        <div className="min-h-[200vh] py-20 flex flex-col items-center justify-center overflow-hidden">
          
          <div className="space-y-4">
            {lines.map((text, i) => (
              <div 
                key={i} 
                className="w-full flex justify-center will-change-transform transition-transform duration-100 ease-out"
                style={{
                  // Skew based on scroll velocity CSS var
                  // Clamp the value to prevent extreme distortion
                  transform: `skewX(clamp(-20deg, calc(var(--scroll-velocity, 0) * ${i % 2 === 0 ? '0.2deg' : '-0.2deg'}), 20deg))`
                }}
              >
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter hover:text-outline transition-colors cursor-default whitespace-nowrap">
                  {text} &nbsp; {text}
                </h2>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center max-w-md mx-auto px-6">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
              Scroll quickly to see the skew
            </p>
          </div>
        </div>
        
        <style>{`
          .text-outline {
            -webkit-text-stroke: 1px black;
            color: transparent;
          }
          .hover\\:text-outline:hover {
            -webkit-text-stroke: 1px black;
            color: transparent;
          }
        `}</style>
      </div>
    </DemoContainer>
  );
}