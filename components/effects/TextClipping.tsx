import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function TextClipping() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                
                {/* Image Obstacle */}
                <div className="relative z-10 w-64 h-80 bg-black rounded-lg shadow-2xl rotate-6">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" className="w-full h-full object-cover rounded-lg opacity-80" />
                </div>

                {/* Text moving out from behind */}
                <h1 
                    className="text-9xl font-black text-black absolute"
                    style={{
                        transform: `translateX(calc(100px - var(--scroll-percent, 0) * 300px))`,
                        zIndex: 0
                    }}
                >
                    BEHIND
                </h1>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}