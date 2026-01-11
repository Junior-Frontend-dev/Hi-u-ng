import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollAssembly() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Center Target */}
                <div className="w-64 h-64 border-2 border-white/10 rounded-xl flex items-center justify-center relative">
                    <span className="text-white/20 font-mono">ASSEMBLY ZONE</span>
                    
                    {/* Part 1: Top Left */}
                    <div 
                        className="absolute w-20 h-20 bg-blue-500 rounded-lg top-0 left-0"
                        style={{
                            transform: `translate(calc((1 - var(--scroll-percent, 0)) * -300px), calc((1 - var(--scroll-percent, 0)) * -300px)) rotate(calc((1 - var(--scroll-percent, 0)) * 90deg))`
                        }}
                    />
                    
                    {/* Part 2: Bottom Right */}
                    <div 
                        className="absolute w-20 h-20 bg-purple-500 rounded-lg bottom-0 right-0"
                        style={{
                            transform: `translate(calc((1 - var(--scroll-percent, 0)) * 300px), calc((1 - var(--scroll-percent, 0)) * 300px)) rotate(calc((1 - var(--scroll-percent, 0)) * -90deg))`
                        }}
                    />

                    {/* Part 3: Center Fill */}
                    <div 
                        className="absolute w-full h-full bg-white/10 backdrop-blur-md rounded-xl"
                        style={{
                            transform: `scale(var(--scroll-percent, 0))`,
                            opacity: `var(--scroll-percent, 0)`
                        }}
                    />
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}