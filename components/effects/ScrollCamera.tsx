import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollCamera() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 10 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* 
        Fix: Use a large perspective value.
        The content needs to start deep in negative Z (far away) 
        and translate to positive Z (behind camera).
      */}
      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black perspective-[200px]">
        <div className="h-[800vh] relative transform-style-3d">
            
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transform-style-3d">
                <div className="relative w-full h-full transform-style-3d">
                    
                    {/* Tunnel Elements */}
                    {[...Array(20)].map((_, i) => {
                        const zStart = -2000 - (i * 500); // Start far away
                        
                        return (
                            <div 
                                key={i}
                                className="absolute top-1/2 left-1/2 border-2 border-white/30 flex items-center justify-center"
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    // Move towards camera based on scroll
                                    transform: `
                                        translate(-50%, -50%) 
                                        translateZ(calc(${zStart}px + var(--scroll-percent, 0) * 12000px)) 
                                        rotate(${i * 15}deg)
                                    `,
                                    opacity: `calc(1 - max(0, (var(--scroll-percent, 0) * 12000 + ${zStart}) / 500))` // Fade out when too close
                                }}
                            >
                                <span className="text-white font-mono text-xs">{zStart}</span>
                            </div>
                        )
                    })}

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h1 className="text-white text-2xl tracking-[1em] animate-pulse">APPROACHING</h1>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}