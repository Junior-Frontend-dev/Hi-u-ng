import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ThreeFog() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-gray-900 perspective-[1000px]">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Object emerging from fog */}
                <div 
                    className="w-64 h-64 bg-red-600 rounded-lg shadow-2xl flex items-center justify-center text-white font-bold text-2xl"
                    style={{
                        transform: `translateZ(calc(-1000px + var(--scroll-percent, 0) * 1000px))`,
                        opacity: `calc(var(--scroll-percent, 0))` // Simulate fog fading
                    }}
                >
                    EMERGE
                </div>

                {/* Fog Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 pointer-events-none"></div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}