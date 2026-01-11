import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollDistortion() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white text-black">
        
        {/* Hidden SVG Filter */}
        <svg className="hidden">
            <defs>
                <filter id="liquid">
                    <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="displacement" />
                </filter>
            </defs>
        </svg>

        {/* Note: In a real app we'd update the filter scale JS attribute via RAF. 
            Here we simulate via CSS transform or simplified SVG property if supported, 
            or fallback to scale/skew if SVG filter animation is too heavy for simple CSS var binding without JS logic.
            
            Let's do a CSS transform trick that mimics distortion for stability in this demo.
        */}
        
        <div className="min-h-[200vh] py-20 flex flex-col items-center justify-center">
            {["LIQUID", "DISTORT", "FLOW", "RIPPLE"].map((word, i) => (
                <h1 
                    key={i}
                    className="text-9xl font-black tracking-tighter will-change-transform"
                    style={{
                        // Simple Skew/Scale simulation of liquid motion based on velocity
                        transform: `
                            scaleY(calc(1 + abs(var(--scroll-velocity, 0)) * 0.01)) 
                            skewX(calc(var(--scroll-velocity, 0) * 1deg))
                        `,
                        opacity: `calc(1 - abs(var(--scroll-velocity, 0)) * 0.01)`
                    }}
                >
                    {word}
                </h1>
            ))}
        </div>
        
        <div className="fixed bottom-10 left-0 w-full text-center text-xs uppercase tracking-widest opacity-50">
            Scroll fast to distort
        </div>

      </div>
    </DemoContainer>
  );
}