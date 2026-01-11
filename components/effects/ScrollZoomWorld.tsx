import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollZoomWorld() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                
                {/* The World Map */}
                <div 
                    className="w-[100vw] h-[100vh] bg-cover bg-center will-change-transform"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&q=80)',
                        // Start at scale 10 (zoomed in to center), end at scale 1 (full view)
                        transform: `scale(calc(10 - var(--scroll-percent, 0) * 9))`
                    }}
                >
                    {/* Markers visible only when zoomed in close */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[1px] bg-red-500 w-[10px] h-[10px] rounded-full" />
                </div>

                <div 
                    className="absolute bottom-10 left-10 text-white"
                    style={{ opacity: `var(--scroll-percent, 0)` }}
                >
                    <h2 className="text-4xl font-bold">Planet Earth</h2>
                    <p>Sector 7G</p>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}