import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function MotionPath() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white text-black">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                <svg className="w-[80%] h-full overflow-visible" viewBox="0 0 400 800" preserveAspectRatio="none">
                    {/* The Path */}
                    <path 
                        id="motionPath"
                        d="M 200 0 C 50 200 350 300 200 400 S 50 600 200 800"
                        fill="none"
                        stroke="#e5e5e5"
                        strokeWidth="4"
                    />
                    
                    {/* The Follower Object */}
                    <circle r="10" fill="#3b82f6">
                        <animateMotion 
                            dur="1s" 
                            repeatCount="indefinite"
                            calcMode="linear"
                            keyPoints="0;1"
                            keyTimes="0;1"
                        >
                            <mpath href="#motionPath" />
                        </animateMotion>
                    </circle>
                    
                    {/* 
                        Note: Syncing SVG animateMotion 'seek' with scroll via CSS is tricky.
                        Standard approach involves offset-path in CSS.
                    */}
                </svg>

                {/* CSS Offset Path Implementation (Modern Browsers) */}
                <div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center"
                >
                    <div 
                        className="w-10 h-10 bg-black rounded-lg shadow-xl flex items-center justify-center text-white font-bold"
                        style={{
                            offsetPath: `path("M 200 0 C 50 200 350 300 200 400 S 50 600 200 800")`, // Relative to container, tricky to match SVG exactly without viewbox sync
                            // We map scroll 0-1 to offset-distance 0-100%
                            // Need to ensure the container width matches path logic or use percentages in path
                            offsetDistance: `calc(var(--scroll-percent, 0) * 100%)`,
                            offsetRotate: 'auto 90deg'
                        }}
                    >
                        GO
                    </div>
                </div>

                {/* Fallback visual for older browsers / simplicity: Just moving down with wiggle */}
                <div 
                    className="absolute w-4 h-4 bg-red-500 rounded-full"
                    style={{
                        top: `calc(var(--scroll-percent, 0) * 100%)`,
                        left: `calc(50% + sin(var(--scroll-percent, 0) * 10) * 100px)`
                    }}
                />

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}