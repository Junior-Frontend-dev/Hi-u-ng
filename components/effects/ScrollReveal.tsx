import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Lock } from 'lucide-react';

export default function ScrollReveal() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative bg-black hide-scrollbar">
        <div className="sticky top-0 h-full w-full overflow-hidden flex items-center justify-center">

          {/* Background Content */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1534067783941-51c9c2363090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(0)' }} // Initial state
            />
             <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-8xl font-black text-white mix-blend-overlay">REVEALED</h1>
             </div>
          </div>

          {/* Curtain Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center z-30 transition-all"
            style={{
              clipPath: `inset(0 0 calc(var(--scroll-percent, 0) * 100%) 0)`
            }}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <Lock size={32} className="text-white/40" />
              </div>
              <h2 className="text-6xl font-black text-white/20">HIDDEN</h2>
            </div>
          </div>
        </div>
        <div className="h-[200vh]" />
      </div>
    </DemoContainer>
  );
}