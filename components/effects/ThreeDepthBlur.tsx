import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ThreeDepthBlur() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black perspective-[1000px]">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                
                {/* Objects at different depths */}
                {[0, 1, 2].map(i => (
                    <div 
                        key={i}
                        className="absolute w-64 h-64 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white font-bold text-4xl"
                        style={{
                            transform: `translateZ(calc(${i * -500}px + var(--scroll-percent, 0) * 1000px))`,
                            // Blur based on distance from 0 (focal plane)
                            filter: `blur(calc(abs(${i * -500} + var(--scroll-percent, 0) * 1000) * 0.02px))`
                        }}
                    >
                        Layer {i}
                    </div>
                ))}

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}