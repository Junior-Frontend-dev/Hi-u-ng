import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollFreeze() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white text-black">
        
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-4xl">Keep Scrolling</h1>
        </div>

        {/* Frozen Section */}
        {/* Container is 300vh tall, giving us 200vh of "scroll time" for the animation while sticky */}
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
                
                {/* Frame 1: Circle grows */}
                <div 
                    className="absolute w-20 h-20 bg-blue-500 rounded-full"
                    style={{
                        transform: `scale(calc(1 + var(--scroll-percent, 0) * 50))` // 0 to 1 over container height
                    }}
                />

                {/* Frame 2: Text appears */}
                <div className="relative z-10 text-center">
                    <h2 
                        className="text-9xl font-black mb-4"
                        style={{
                            opacity: `calc((var(--scroll-percent, 0) - 0.2) * 5)`, // Starts at 20%
                            transform: `translateY(calc(100px - (var(--scroll-percent, 0) - 0.2) * 200px))`
                        }}
                    >
                        FROZEN
                    </h2>
                    <p 
                        className="text-2xl font-light"
                        style={{
                            opacity: `calc((var(--scroll-percent, 0) - 0.5) * 5)` // Starts at 50%
                        }}
                    >
                        Time stops while you scroll
                    </p>
                </div>

            </div>
        </div>

        <div className="h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-4xl">Released</h1>
        </div>

      </div>
    </DemoContainer>
  );
}