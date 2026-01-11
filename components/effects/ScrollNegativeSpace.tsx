import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollNegativeSpace() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                <div 
                    className="grid grid-cols-2 gap-4 transition-all duration-100 will-change-[gap,padding]"
                    style={{
                        gap: `calc(1rem + var(--scroll-percent, 0) * 10rem)`,
                        padding: `calc(var(--scroll-percent, 0) * 5rem)`
                    }}
                >
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-32 h-32 bg-black flex items-center justify-center text-white font-bold">
                            {i}
                        </div>
                    ))}
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}