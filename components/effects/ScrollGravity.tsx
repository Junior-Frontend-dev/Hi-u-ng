import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollGravity() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-sky-900">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                
                {/* Falling Objects */}
                {[...Array(10)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold"
                        style={{
                            left: `${10 + i * 10}%`,
                            top: '-50px',
                            // Accelerate descent based on scroll
                            // y = scroll * speed_factor + offset
                            transform: `translateY(calc(var(--scroll-y, 0px) * ${1 + i * 0.5}))`
                        }}
                    >
                        {i}
                    </div>
                ))}

                <div className="absolute bottom-0 w-full h-20 bg-green-800" />
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}