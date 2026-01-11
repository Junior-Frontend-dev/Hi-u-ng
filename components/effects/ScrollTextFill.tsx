import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollTextFill() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[200vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center p-8 md:p-16">
            
            {/* 
              We map --scroll-percent (0 to 1) to background-size or position.
              Since --scroll-percent covers the whole container, we multiply to adjust timing.
            */}
            <p 
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight will-change-[background-size]"
              style={{
                background: `linear-gradient(to right, #ffffff 50%, #333333 50%)`,
                backgroundSize: `200% 100%`,
                backgroundPositionX: `calc(100% - var(--scroll-percent, 0) * 150%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'background-position 0.1s linear'
              }}
            >
              We believe in a web that moves with you. 
              Not just static pages, but living, breathing interfaces 
              that respond to every gesture. As you scroll, 
              you aren't just viewing content; you are revealing it, 
              painting it onto the screen with your intent. 
              The future of interaction is fluid.
            </p>

          </div>
        </div>
      </div>
    </DemoContainer>
  );
}