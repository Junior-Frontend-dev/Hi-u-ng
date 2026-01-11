import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const SECTIONS = [
    { title: "Introduction", color: "bg-neutral-800" },
    { title: "Methodology", color: "bg-blue-900" },
    { title: "Results", color: "bg-emerald-900" },
    { title: "Conclusion", color: "bg-rose-900" },
];

export default function LayoutOverlapping() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black pb-20">
        
        <div className="pt-20 px-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Vertical Stack</h1>
            
            <div className="flex flex-col">
                {SECTIONS.map((sec, i) => (
                    <div 
                        key={i} 
                        className="sticky top-10 mb-[-50px] last:mb-0" // Negative margin creates visual overlap space, sticky does the stacking
                    >
                        <div 
                            className={`${sec.color} rounded-t-3xl p-10 h-[60vh] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center transform transition-transform`}
                        >
                            <span className="text-white/20 text-6xl font-black mb-4">0{i+1}</span>
                            <h2 className="text-4xl font-bold text-white">{sec.title}</h2>
                            <p className="text-white/60 mt-4 text-center max-w-sm">
                                As you scroll, this card sticks to the top until covered by the next one.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="h-[20vh]"></div>
        </div>

      </div>
    </DemoContainer>
  );
}