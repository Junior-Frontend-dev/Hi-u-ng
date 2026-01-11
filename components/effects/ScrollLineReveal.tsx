import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollLineReveal() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black font-sans">
        <div className="h-[250vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-8 md:p-16">
            
            <h2 className="text-accent text-xs font-mono tracking-[0.3em] uppercase mb-8 opacity-80">
                Manifesto 2.0
            </h2>

            {/* 
              Line-by-line Reveal logic:
              1. Gradient Top (50%): White (The revealed color)
              2. Gradient Bottom (50%): Dark Gray (The hidden/dim color)
              3. background-size-y: 200% (Doubles the height so we can scroll through it)
              4. background-position-y: Moves from 100% (viewing bottom/dark) to 0% (viewing top/white)
            */}
            <div className="max-w-4xl mx-auto">
                <p 
                  className="text-4xl md:text-6xl font-bold leading-[1.3] will-change-[background-position]"
                  style={{
                    background: `linear-gradient(to bottom, #ffffff 50%, #222222 50%)`,
                    backgroundSize: `100% 200%`,
                    // We map scroll-percent (0->1) to position-y (100%->0%)
                    // Added a multiplier (0.8) and offset (10%) to ensure it starts fully dark and ends fully lit within comfortable scroll range
                    backgroundPositionY: `calc(100% - var(--scroll-percent, 0) * 120% + 10%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'background-position 0.1s linear'
                  }}
                >
                  Design is not just what it looks like and feels like. 
                  Design is how it works. 
                  In a world of infinite scrolling, attention is the currency we pay. 
                  By guiding the eye gently down the page, we create a narrative rhythm 
                  that respects the reader's pace. 
                  Light reveals truth, line by line, 
                  turning information into understanding.
                </p>
            </div>

            <div className="mt-12 opacity-50 flex flex-col items-center gap-2">
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll to Read</span>
            </div>

          </div>
        </div>
      </div>
    </DemoContainer>
  );
}