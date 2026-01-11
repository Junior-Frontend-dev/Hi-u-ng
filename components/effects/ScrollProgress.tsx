import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollProgress() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1 });

  const sections = [1, 2, 3, 4, 5];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* 
        NOTE: The progress bar must be INSIDE the scroll container to access the 
        --scroll-percent CSS variable set by useScrollAnimation on the ref element.
        We use position: sticky to keep it visible.
      */}
      <div 
        ref={scrollRef} 
        className="h-full overflow-y-auto hide-scrollbar bg-gradient-to-b from-gray-950 via-black to-gray-950 relative"
      >
        {/* Sticky Progress Bar */}
        <div className="sticky top-0 left-0 w-full h-1.5 z-50">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 origin-left will-change-transform"
                style={{ 
                    width: '100%',
                    transform: 'scaleX(var(--scroll-percent, 0))' 
                }}
            />
        </div>

        {/* Floating Circular Indicator (Sticky Trick) 
            Placing it sticky with a high top value keeps it at the bottom of the viewport
            as long as we are scrolling within the container.
        */}
        <div className="sticky top-[85vh] float-right right-6 mr-6 z-40 pointer-events-none mix-blend-screen">
             <div className="relative w-16 h-16 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
                 <svg className="w-full h-full -rotate-90 transform p-1" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                     <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="6" 
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        strokeLinecap="round"
                        style={{
                            strokeDashoffset: `calc(283 - (283 * var(--scroll-percent, 0)))`
                        }}
                     />
                 </svg>
                 <span className="absolute text-[10px] font-mono font-bold text-white">
                    %
                 </span>
             </div>
        </div>

        <div className="max-w-2xl mx-auto px-8 md:px-12 pb-32 pt-10">
          <header className="mb-24">
            <h1 className="text-6xl text-white font-bold mb-6 tracking-tighter">Reading Progress</h1>
            <p className="text-xl text-white/50">
                Visualizing scroll position using CSS variables propagated from the container. 
                Move the scrollbar to see the bar and circle update instantly.
            </p>
          </header>

          {sections.map((i) => (
            <section key={i} className="mb-24 group">
              <div className="flex items-baseline gap-4 mb-6 border-b border-white/10 pb-4">
                  <span className="text-4xl font-black text-white/20">0{i}</span>
                  <h2 className="text-2xl text-white font-semibold">Section Title</h2>
              </div>
              <p className="text-lg text-white/60 leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="mt-8 h-40 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
                  <span className="text-white/20 font-mono text-sm">Visual Content Placeholder</span>
              </div>
            </section>
          ))}
          
          <div className="h-20 flex items-center justify-center text-white/30 text-sm uppercase tracking-widest">
              End of content
          </div>
        </div>
      </div>
    </DemoContainer>
  );
}