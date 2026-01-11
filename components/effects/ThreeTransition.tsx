import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ThreeTransition() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black perspective-[2000px]">
        <div className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center transform-style-3d">
                
                {/* Rotating Cube Simulation */}
                <div 
                    className="relative w-full h-full transform-style-3d transition-transform duration-100 ease-out"
                    style={{
                        transform: `rotateX(calc(var(--scroll-percent, 0) * 90deg))`
                    }}
                >
                    {/* Face 1 */}
                    <div className="absolute inset-0 bg-blue-600 flex items-center justify-center text-white text-6xl font-bold backface-hidden" style={{ transform: 'translateZ(50vh)' }}>
                        FACE 1
                    </div>
                    {/* Face 2 */}
                    <div className="absolute inset-0 bg-red-600 flex items-center justify-center text-white text-6xl font-bold backface-hidden" style={{ transform: 'rotateX(-90deg) translateZ(50vh)' }}>
                        FACE 2
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}