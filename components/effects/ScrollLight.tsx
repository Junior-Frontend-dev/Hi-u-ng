import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollLight() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-200 text-neutral-800">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                
                <div 
                    className="w-64 h-64 bg-neutral-200 rounded-3xl flex items-center justify-center font-bold text-2xl transition-all duration-75"
                    style={{
                        // Shadow moves opposite to light
                        // Start: Light Left -> Shadow Right
                        // End: Light Right -> Shadow Left
                        boxShadow: `
                            calc(20px - var(--scroll-percent, 0) * 40px) 
                            calc(20px - var(--scroll-percent, 0) * 10px) 
                            60px #bebebe, 
                            calc(-20px + var(--scroll-percent, 0) * 40px) 
                            calc(-20px + var(--scroll-percent, 0) * 10px) 
                            60px #ffffff
                        `
                    }}
                >
                    Shadow
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}