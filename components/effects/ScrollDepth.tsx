import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollDepth() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 4 });

  // Create many layers for density
  const layers = Array.from({ length: 40 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black perspective-[300px]">
        <div className="h-[500vh] relative transform-style-3d">
            
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full transform-style-3d">
                    
                    {layers.map((_, i) => {
                        // Random positions
                        const x = (Math.random() - 0.5) * 200;
                        const y = (Math.random() - 0.5) * 200;
                        const rotation = Math.random() * 360;
                        const delay = i * -100; // Stagger initial Z

                        return (
                            <div 
                                key={i}
                                className="absolute top-1/2 left-1/2 w-40 h-40 border border-cyan-500/40 rounded-full"
                                style={{
                                    // Logic: Move from -2000px (far) to 500px (behind camera) based on scroll
                                    // Use mod to loop
                                    transform: `
                                        translate3d(${x}vw, ${y}vh, calc(
                                            (var(--scroll-percent, 0) * 4000px + ${delay}px) % 4000px - 3500px
                                        ))
                                        rotate(${rotation}deg)
                                    `,
                                    boxShadow: '0 0 20px rgba(6,182,212,0.2)'
                                }}
                            />
                        )
                    })}

                    <div className="absolute inset-0 flex items-center justify-center bg-radial-gradient(circle, transparent 0%, black 100%) pointer-events-none"></div>
                    
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-white mix-blend-overlay italic tracking-widest">
                        WARP SPEED
                    </h1>
                </div>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}