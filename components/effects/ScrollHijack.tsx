import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollHijack() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900">
        <div className="h-[400vh] relative">
            <div className="sticky top-0 h-screen overflow-hidden">
                
                {/* Section 1: Slides Up */}
                <div 
                    className="absolute inset-0 bg-blue-900 flex items-center justify-center transition-transform will-change-transform"
                    style={{ transform: 'translateY(calc(var(--scroll-percent, 0) * -100% * 1.5))' }}
                >
                    <h1 className="text-9xl font-black text-blue-300 opacity-20">01</h1>
                    <div className="absolute text-center">
                        <h2 className="text-4xl font-bold text-white mb-2">Sticky Flow</h2>
                        <p className="text-blue-200">Standard scroll, hijacked feel.</p>
                    </div>
                </div>

                {/* Section 2: Appears from bottom */}
                <div 
                    className="absolute inset-0 bg-purple-900 flex items-center justify-center transition-transform will-change-transform"
                    style={{ 
                        transform: 'translateY(calc(100% + var(--scroll-percent, 0) * -100% * 1.5))',
                        // Logic: Starts at 100% (offscreen bottom).
                        // At 33% scroll, it should be at 0%.
                    }}
                >
                    {/* Updated to 06 as per request */}
                    <h1 className="text-9xl font-black text-purple-300 opacity-20">06</h1>
                    <div className="absolute text-center">
                         <h2 className="text-4xl font-bold text-white mb-2">Seamless</h2>
                         <p className="text-purple-200">Transitions controlled by container height.</p>
                    </div>
                </div>

                {/* Section 3: Wipes in */}
                <div 
                    className="absolute inset-0 bg-emerald-900 flex items-center justify-center transition-transform will-change-transform"
                    style={{ 
                         clipPath: 'circle(calc((var(--scroll-percent, 0) - 0.6) * 300%) at center)',
                         // Logic: Starts expanding at 60% scroll
                    }}
                >
                    <h1 className="text-9xl font-black text-emerald-300 opacity-20">03</h1>
                    <div className="absolute text-center">
                         <h2 className="text-4xl font-bold text-white mb-2">Reveal</h2>
                         <p className="text-emerald-200">Using clip-path for masking.</p>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}