import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollShader() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* SVG Filter Definition */}
      <svg className="hidden">
        <defs>
            <filter id="scroll-displacement">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
                    {/* We can animate scale via JS, or simulate with CSS if supported (rare), 
                        so we fallback to CSS transform skew for stability in this 'pure' CSS/React demo without heavier WebGL libs */}
                </feDisplacementMap>
            </filter>
        </defs>
      </svg>

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="min-h-[300vh] py-20 flex flex-col items-center justify-center overflow-hidden">
            
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <div className="relative">
                    <h1 
                        className="text-[12vw] font-black text-white leading-none tracking-tighter mix-blend-difference will-change-transform"
                        style={{
                            // Simulating shader distortion using standard CSS transforms based on velocity
                            transform: `
                                scaleY(calc(1 + abs(var(--scroll-velocity, 0)) * 0.05)) 
                                skewX(calc(var(--scroll-velocity, 0) * 2deg))
                            `,
                            filter: `blur(calc(abs(var(--scroll-velocity, 0)) * 0.5px))`
                        }}
                    >
                        LIQUID
                    </h1>
                    <h1 
                        className="text-[12vw] font-black text-red-500 leading-none tracking-tighter absolute top-0 left-0 mix-blend-screen opacity-50 will-change-transform"
                        style={{
                            transform: `
                                scaleY(calc(1 + abs(var(--scroll-velocity, 0)) * 0.08)) 
                                skewX(calc(var(--scroll-velocity, 0) * -1deg))
                                translateX(calc(var(--scroll-velocity, 0) * 1px))
                            `
                        }}
                    >
                        LIQUID
                    </h1>
                    <h1 
                        className="text-[12vw] font-black text-blue-500 leading-none tracking-tighter absolute top-0 left-0 mix-blend-screen opacity-50 will-change-transform"
                        style={{
                            transform: `
                                scaleY(calc(1 + abs(var(--scroll-velocity, 0)) * 0.03)) 
                                skewX(calc(var(--scroll-velocity, 0) * 1deg))
                                translateX(calc(var(--scroll-velocity, 0) * -1px))
                            `
                        }}
                    >
                        LIQUID
                    </h1>
                </div>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}