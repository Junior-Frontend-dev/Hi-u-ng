import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ThreeDolly() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black perspective-[1000px]">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Background - Scales UP (Moves closer/zooms in) */}
                <div 
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&q=80')] bg-cover bg-center"
                    style={{ transform: `scale(calc(1 + var(--scroll-percent, 0)))` }}
                />

                {/* Foreground - Scales DOWN (Counteracts zoom to stay same size) - Vertigo Effect */}
                <div 
                    className="relative z-10 text-white font-black text-9xl"
                    style={{ transform: `scale(calc(1 - var(--scroll-percent, 0) * 0.5))` }}
                >
                    VERTIGO
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}