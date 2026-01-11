import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function TypeFill() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[200vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-8">
            
            <h2 className="text-white/40 text-sm font-mono mb-8 uppercase tracking-widest">Scroll to Fill</h2>

            <h1 
                className="text-9xl font-black text-transparent bg-clip-text leading-tight"
                style={{
                    backgroundImage: `linear-gradient(to top, #3b82f6 50%, #333 50%)`,
                    backgroundSize: '100% 200%',
                    // Map scroll (0-1) to position Y (0% to 100%)
                    // Note: Background position 100% shows top (gray), 0% shows bottom (blue) if size is 200%
                    // We want it to start Gray (top) and fill Blue (bottom)
                    backgroundPositionY: `calc(100% - var(--scroll-percent, 0) * 100%)`,
                    WebkitBackgroundClip: 'text',
                }}
            >
                LIQUID
            </h1>
            <h1 
                className="text-9xl font-black text-transparent bg-clip-text leading-tight"
                style={{
                    backgroundImage: `linear-gradient(to top, #ffffff 50%, #333 50%)`,
                    backgroundSize: '100% 200%',
                    backgroundPositionY: `calc(100% - max(0, var(--scroll-percent, 0) - 0.2) * 120%)`,
                    WebkitBackgroundClip: 'text',
                }}
            >
                DEPTH
            </h1>

          </div>
        </div>
      </div>
    </DemoContainer>
  );
}