import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollMorph() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                
                {/* The Morphing Shape */}
                <div 
                    className="w-64 h-64 bg-gradient-to-br from-pink-500 to-orange-400 shadow-[0_0_100px_rgba(244,114,182,0.4)] transition-all duration-100 will-change-[border-radius,transform]"
                    style={{
                        // 0% scroll: Circle (50%)
                        // 50% scroll: Square (0%)
                        // 100% scroll: Star-ish (polygon clip path maybe?)
                        
                        // Let's morph borderRadius
                        borderRadius: `calc(50% - var(--scroll-percent, 0) * 50%)`,
                        transform: `rotate(calc(var(--scroll-percent, 0) * 180deg)) scale(calc(1 + var(--scroll-percent, 0) * 0.5))`
                    }}
                ></div>

                {/* Overlay Text */}
                <h1 
                    className="absolute text-8xl font-black text-white mix-blend-difference"
                    style={{ opacity: `calc(0.2 + var(--scroll-percent, 0))` }}
                >
                    MORPH
                </h1>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}