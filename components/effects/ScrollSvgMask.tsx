import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollSvgMask() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                
                {/* Background Video */}
                <img 
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80" 
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* White Overlay with Mask */}
                <div 
                    className="absolute inset-0 bg-white"
                    style={{
                        // Circle mask growing from 0% to 200%
                        maskImage: `radial-gradient(circle at center, transparent calc(var(--scroll-percent, 0) * 100%), black calc(var(--scroll-percent, 0) * 100% + 1px))`,
                        WebkitMaskImage: `radial-gradient(circle at center, transparent calc(var(--scroll-percent, 0) * 100%), black calc(var(--scroll-percent, 0) * 100% + 1px))`
                    }}
                >
                    <div className="flex items-center justify-center h-full text-black">
                        <h1 className="text-6xl font-black">PEEK</h1>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}