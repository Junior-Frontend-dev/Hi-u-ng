import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollBlend() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        
        {/* 
            The trick for mix-blend-mode: difference:
            1. Background must be black.
            2. Fixed text must be WHITE.
            3. Overlay shapes must be WHITE.
            
            White Text (on Black Bg) = White.
            White Text (under White Shape) -> White - White = Black.
        */}

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
            <h1 className="text-[12vw] font-black text-white leading-none tracking-tighter mix-blend-difference text-center">
                BLEND<br/>MODE
            </h1>
        </div>

        <div className="relative z-0">
            {/* Spacer */}
            <div className="h-[50vh]"></div>

            {/* Shape 1: Circle expanding */}
            <div className="h-[100vh] w-full flex items-center justify-center pointer-events-none">
                <div 
                    className="bg-white rounded-full aspect-square w-[10px] will-change-transform"
                    style={{
                        transform: `scale(calc(1 + var(--scroll-percent, 0) * 150))`
                    }}
                />
            </div>

            {/* Shape 2: Rect sweeping */}
            <div className="h-[100vh] w-full relative">
                 <div 
                    className="absolute inset-0 bg-white origin-bottom will-change-transform"
                    style={{
                        transform: `scaleY(calc(max(0, (var(--scroll-percent, 0) - 0.5) * 2)))`
                    }}
                 />
            </div>
            
            <div className="h-[50vh]"></div>
        </div>
      </div>
    </DemoContainer>
  );
}