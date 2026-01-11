import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function MotionReverse() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  // In this demo, we simulate the "reverse" logic using scroll percentage mapping.
  // Standard CSS animations run once. By mapping style properties to scroll progress,
  // we inherently get "rewind" behavior when scrolling up.

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                
                {/* Expanding Ring */}
                <div 
                    className="w-20 h-20 border-[20px] border-blue-500 rounded-full"
                    style={{
                        transform: `scale(calc(1 + var(--scroll-percent, 0) * 20)) rotate(calc(var(--scroll-percent, 0) * 360deg))`,
                        opacity: `calc(1 - var(--scroll-percent, 0))`
                    }}
                ></div>

                {/* Text that comes in and out */}
                <h1 
                    className="absolute text-6xl font-black text-white mix-blend-difference"
                    style={{
                        transform: `translateY(calc(100px - var(--scroll-percent, 0) * 200px))`,
                        opacity: `calc(1 - abs(var(--scroll-percent, 0) - 0.5) * 2)`
                    }}
                >
                    REVERSIBLE
                </h1>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}