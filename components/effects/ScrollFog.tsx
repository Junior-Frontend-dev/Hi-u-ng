import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollFog() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-slate-800 perspective-[500px]">
        <div className="h-[400vh] relative p-10">
            
            {/* Fog Overlay */}
            <div 
                className="fixed inset-0 bg-slate-800 pointer-events-none z-50"
                style={{
                    opacity: `calc(var(--scroll-percent, 0) * 0.9)`
                }}
            />

            <div className="space-y-[50vh] relative z-0">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="bg-white p-10 rounded-lg shadow-xl max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-2">Layer {i}</h2>
                        <p className="text-gray-600">The deeper you go, the harder it is to see.</p>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}