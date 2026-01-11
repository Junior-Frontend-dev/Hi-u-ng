import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollMorphLogo() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-100">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
                
                {/* 
                    Morphing shape using border-radius and size.
                    Starts as large square, becomes small circle.
                */}
                <div 
                    className="bg-black flex items-center justify-center text-white font-bold overflow-hidden transition-all duration-75"
                    style={{
                        width: `calc(300px - var(--scroll-percent, 0) * 200px)`, // 300 -> 100
                        height: `calc(300px - var(--scroll-percent, 0) * 200px)`,
                        borderRadius: `calc(var(--scroll-percent, 0) * 50%)`, // 0 -> 50%
                        transform: `rotate(calc(var(--scroll-percent, 0) * 360deg))`
                    }}
                >
                    <span 
                        className="text-4xl"
                        style={{ opacity: `calc(1 - var(--scroll-percent, 0) * 2)` }}
                    >
                        BOX
                    </span>
                    <span 
                        className="text-xl absolute"
                        style={{ opacity: `calc((var(--scroll-percent, 0) - 0.5) * 5)` }}
                    >
                        O
                    </span>
                </div>

                <div className="absolute bottom-20 opacity-50">
                    <p>Scroll to morph</p>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}