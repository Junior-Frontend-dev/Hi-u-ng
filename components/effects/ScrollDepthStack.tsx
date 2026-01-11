import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollDepthStack() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-slate-900 perspective-[1000px]">
        <div className="h-[400vh] relative p-10 transform-style-3d">
            
            {[0, 1, 2, 3].map(i => (
                <div 
                    key={i}
                    className="sticky top-20 w-full max-w-md mx-auto aspect-[3/4] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex items-center justify-center text-4xl font-bold text-white mb-[50vh]"
                    style={{
                        transform: `translateZ(calc(-100px * ${i} + var(--scroll-percent, 0) * 100px)) scale(calc(1 - ${i} * 0.05 + var(--scroll-percent, 0) * 0.05))`,
                        zIndex: 10 - i,
                        top: `${20 + i * 20}px`
                    }}
                >
                    Layer {i + 1}
                </div>
            ))}

        </div>
      </div>
    </DemoContainer>
  );
}