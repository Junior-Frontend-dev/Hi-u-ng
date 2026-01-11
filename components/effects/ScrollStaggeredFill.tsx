import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollStaggeredFill() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1 });

  const LINES = [
    "We start with a single thought,",
    "expanding into a universe of ideas.",
    "Each line represents a step forward,",
    "a journey through the digital void.",
    "As you scroll, you breathe life",
    "into these static words,",
    "transforming code into experience."
  ];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black font-sans">
        {/* We adjust height based on number of lines to give enough scroll distance per line */}
        <div className="h-[350vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-8 md:p-16">
            
            <div className="flex flex-col gap-2 md:gap-4 max-w-5xl mx-auto">
                {LINES.map((line, i) => {
                    const N = LINES.length;
                    return (
                        <div key={i} className="relative">
                            {/* We use gradient with hard stop to create fill effect */}
                            <h2 
                                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight will-change-[background-size]"
                                style={{
                                    // Base color is transparent so background shows through
                                    color: 'transparent',
                                    
                                    // Gradient: 50% White (Active), 50% Dark Gray (Inactive)
                                    // We double width (200%) so we can slide between the two halves
                                    backgroundImage: 'linear-gradient(to right, #ffffff 50%, #222222 50%)',
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    
                                    // Position logic:
                                    // 100% = Showing Right side (Gray)
                                    // 0%   = Showing Left side (White)
                                    // Logic:
                                    // START = i / N
                                    // SCALE = N * 1.0 (to fill exactly within its share)
                                    // (scroll - START) * SCALE gives us 0->1 for this line
                                    // We want position to go 100% -> 0%
                                    backgroundPositionX: `calc(100% - clamp(0, (var(--scroll-percent, 0) - ${i / N}) * ${N}, 1) * 100%)`
                                }}
                            >
                                {line}
                            </h2>
                        </div>
                    )
                })}
            </div>

            <div className="mt-16 text-center opacity-40">
                <div className="w-[1px] h-8 bg-white mx-auto mb-2"></div>
                <p className="text-white text-[10px] uppercase tracking-[0.3em]">Keep Scrolling</p>
            </div>

          </div>
        </div>
      </div>
    </DemoContainer>
  );
}