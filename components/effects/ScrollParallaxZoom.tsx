import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollParallaxZoom() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Background Layer (Slow Zoom) */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=80)',
                        transform: `scale(calc(1 + var(--scroll-percent, 0) * 0.2))`,
                        filter: `brightness(0.6)`
                    }}
                />

                {/* Middle Layer (Medium Zoom) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 
                        className="text-[20vw] font-black text-white/10 mix-blend-overlay will-change-transform"
                        style={{
                            transform: `scale(calc(1 + var(--scroll-percent, 0) * 2))`
                        }}
                    >
                        NATURE
                    </h1>
                </div>

                {/* Foreground Layer (Fast Zoom / Clip) */}
                <div 
                    className="absolute w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl will-change-transform"
                    style={{
                        transform: `scale(calc(0.5 + var(--scroll-percent, 0) * 4))`, // Zooms past camera
                        opacity: `calc(1 - max(0, var(--scroll-percent, 0) - 0.8) * 5)` // Fades out at very end
                    }}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1501854140884-074bf86ed91c?w=800&q=80" 
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}