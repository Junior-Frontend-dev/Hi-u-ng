import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollSlicing() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[200vh] relative">
            
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Background Image */}
                <img 
                    src="https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=1600&q=80" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50" 
                />

                <div className="absolute inset-0 flex flex-col">
                    {/* Top Slice */}
                    <div 
                        className="h-1/2 w-full bg-black flex items-end justify-center overflow-hidden border-b border-white/20"
                        style={{
                            transform: `translateX(calc(var(--scroll-percent, 0) * 100%))`
                        }}
                    >
                        <h1 className="text-[20vw] font-black text-white leading-[0.8] mb-[-0.1em]">SLI</h1>
                    </div>
                    
                    {/* Bottom Slice */}
                    <div 
                        className="h-1/2 w-full bg-black flex items-start justify-center overflow-hidden border-t border-white/20"
                        style={{
                            transform: `translateX(calc(var(--scroll-percent, 0) * -100%))`
                        }}
                    >
                        <h1 className="text-[20vw] font-black text-white leading-[0.8] mt-[-0.1em]">CE</h1>
                    </div>
                </div>

                {/* Content Revealed Behind */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <h2 className="text-6xl font-bold text-white tracking-widest">REVEALED</h2>
                </div>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}