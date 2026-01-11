import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollColor() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      {/* 
        We can't easily animate backgroundColor via single variable without complex RGB calc.
        Instead, we layer divs with different colors and change opacity based on scroll percent.
      */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* 25% - Blue */}
      <div className="absolute inset-0 bg-blue-600 z-0 opacity-0" 
           style={{ opacity: 'calc(max(0, 1 - abs(var(--scroll-percent, 0) - 0.25) * 4))' }} />

      {/* 50% - White */}
      <div className="absolute inset-0 bg-white z-0 opacity-0" 
           style={{ opacity: 'calc(max(0, 1 - abs(var(--scroll-percent, 0) - 0.5) * 4))' }} />
      
      {/* 75% - Orange */}
      <div className="absolute inset-0 bg-orange-500 z-0 opacity-0" 
           style={{ opacity: 'calc(max(0, 1 - abs(var(--scroll-percent, 0) - 0.75) * 4))' }} />


      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar z-10">
        <div className="h-[400vh] flex flex-col justify-between p-10">
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-6xl font-black text-white mix-blend-difference">Start Black</h1>
            </div>
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-6xl font-black text-white mix-blend-difference">Fade Blue</h1>
            </div>
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-6xl font-black text-white mix-blend-difference">Flash White</h1>
            </div>
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-6xl font-black text-white mix-blend-difference">End Orange</h1>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}