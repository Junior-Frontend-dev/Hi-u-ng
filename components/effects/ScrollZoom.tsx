import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollZoom() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                
                {/* Background Image scaling up */}
                <div 
                    className="absolute inset-0 bg-cover bg-center will-change-transform origin-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80)',
                        transform: `scale(calc(1 + var(--scroll-percent, 0) * 15))`
                    }}
                />
                
                {/* Overlay Text fading out */}
                <div 
                    className="relative z-10 text-center"
                    style={{ opacity: `calc(1 - var(--scroll-percent, 0) * 5)` }}
                >
                    <h1 className="text-6xl font-bold text-white mb-2">MACRO</h1>
                    <p className="text-white/70">Dive deeper</p>
                </div>

                {/* Hidden content revealed at end */}
                <div 
                    className="relative z-10 text-center bg-black/50 p-8 backdrop-blur-xl rounded-xl border border-white/20"
                    style={{ 
                        opacity: `calc((var(--scroll-percent, 0) - 0.8) * 10)`,
                        transform: `scale(calc(0.5 + var(--scroll-percent, 0) * 0.5))`
                    }}
                >
                    <h2 className="text-4xl font-bold text-white">THE CORE</h2>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}