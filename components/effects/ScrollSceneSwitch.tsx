import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollSceneSwitch() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Scene 1: Base (Always there) */}
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                    <h1 className="text-9xl font-black text-neutral-800">BASE</h1>
                </div>

                {/* Scene 2: Blue Circle Wipe */}
                <div 
                    className="absolute inset-0 bg-blue-600 flex items-center justify-center"
                    style={{ 
                        // Start expanding at 0%, full at 33%
                        clipPath: `circle(calc((var(--scroll-percent, 0) * 3) * 100%) at center)`,
                        zIndex: 10
                    }}
                >
                    <h1 className="text-9xl font-black text-white">BLUE</h1>
                </div>

                {/* Scene 3: White Swipe from bottom */}
                <div 
                    className="absolute inset-0 bg-white flex items-center justify-center"
                    style={{ 
                        // Start at 33%, full at 66%
                        clipPath: `inset(calc(100% - (var(--scroll-percent, 0) - 0.33) * 300%) 0 0 0)`,
                        zIndex: 20
                    }}
                >
                    <h1 className="text-9xl font-black text-black">LIGHT</h1>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}