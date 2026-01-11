import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const PHOTOS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
];

export default function HorizontalScroll() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-[#111]">
        
        {/* Intro */}
        <div className="h-[50vh] flex items-center justify-center">
            <h1 className="text-4xl text-white/50 font-light uppercase tracking-[0.5em] animate-pulse">
                Scroll Down
            </h1>
        </div>

        {/* 
            Container Height = 400vh.
            Sticky Section = 100vh.
            Scrollable Distance = 300vh.
            We map 300vh of vertical scroll to horizontal movement.
        */}
        <div className="h-[400vh] relative">
          <div className="sticky top-0 h-full max-h-screen overflow-hidden flex items-center bg-[#111]">
            
            <div 
                className="flex gap-12 px-[20vw] will-change-transform"
                style={{
                    // Move Left based on scroll.
                    // Skew based on velocity (var(--scroll-velocity)) for physics feel
                    transform: `
                        translateX(calc((var(--scroll-percent, 0) - 0.1) * -350%)) 
                        skewX(calc(var(--scroll-velocity, 0) * -0.1deg))
                    `
                }}
            >
                {PHOTOS.map((src, i) => (
                    <div 
                        key={i} 
                        className="w-[40vh] md:w-[60vh] aspect-[3/4] relative group perspective-[1000px]"
                    >
                        <div className="w-full h-full overflow-hidden rounded-lg brightness-75 group-hover:brightness-100 transition-all duration-500 ease-out transform group-hover:scale-105">
                            <img src={src} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -bottom-12 left-0 text-6xl font-black text-white/10 group-hover:text-white transition-colors duration-300">
                            0{i+1}
                        </span>
                    </div>
                ))}
            </div>

          </div>
        </div>

        <div className="h-[50vh] flex items-center justify-center">
            <span className="text-white/20">End of Gallery</span>
        </div>

      </div>
    </DemoContainer>
  );
}