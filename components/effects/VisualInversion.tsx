import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function VisualInversion() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar">
        
        {/* Fixed Element - MUST be White for Difference mode to work correctly on black/white */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none mix-blend-difference text-white text-center">
             <div className="w-6 h-6 bg-white rounded-full mx-auto mb-6"></div>
             <h2 className="text-6xl font-black tracking-tighter">INVERT</h2>
        </div>

        {/* Section 1: White Background (Text becomes Black) */}
        <div className="w-full bg-white min-h-[100vh] flex items-center justify-center p-20">
            <span className="text-black/20 font-mono absolute top-10">Background: White</span>
        </div>

        {/* Section 2: Black Background (Text becomes White) */}
        <div className="w-full bg-black min-h-[100vh] flex items-center justify-center p-20">
             <span className="text-white/20 font-mono absolute top-10">Background: Black</span>
        </div>

        {/* Section 3: Color Background (Text becomes Complementary) */}
        <div className="w-full bg-[#ff00ff] min-h-[100vh] flex items-center justify-center p-20">
             <span className="text-white/50 font-mono absolute top-10">Background: Magenta</span>
        </div>

      </div>
    </DemoContainer>
  );
}