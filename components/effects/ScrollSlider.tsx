import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const SLIDES = ["One", "Two", "Three", "Four"];

export default function ScrollSlider() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900">
        <div className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                
                <div 
                    className="flex will-change-transform"
                    style={{
                        // 4 slides = 400vw width. 
                        // We scroll 0 -> 100% vertical. We translate 0 -> -300vw horizontal.
                        width: '400vw',
                        transform: `translateX(calc(var(--scroll-percent, 0) * -300vw))`
                    }}
                >
                    {SLIDES.map((slide, i) => (
                        <div key={i} className={`w-[100vw] h-screen flex items-center justify-center ${i%2===0 ? 'bg-black' : 'bg-neutral-800'}`}>
                            <h1 className="text-[20vw] font-bold text-white/10">{slide}</h1>
                        </div>
                    ))}
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}