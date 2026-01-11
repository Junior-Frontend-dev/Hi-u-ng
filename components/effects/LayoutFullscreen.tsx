import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const SLIDES = [
    { bg: "bg-blue-600", title: "Immerse" },
    { bg: "bg-purple-600", title: "Engage" },
    { bg: "bg-pink-600", title: "Inspire" },
];

export default function LayoutFullscreen() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* Snap Scroll Container */}
      <div 
        ref={scrollRef} 
        className="h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory"
      >
        {SLIDES.map((slide, i) => (
            <div 
                key={i} 
                className={`h-full w-full snap-start ${slide.bg} flex items-center justify-center relative overflow-hidden`}
            >
                <h1 className="text-[15vw] font-black text-white opacity-20 absolute select-none">
                    0{i+1}
                </h1>
                <div className="relative z-10 text-center">
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4">
                        {slide.title}
                    </h2>
                    <p className="text-white/60 text-lg uppercase tracking-widest">
                        Fullscreen Section
                    </p>
                </div>
            </div>
        ))}
      </div>
    </DemoContainer>
  );
}