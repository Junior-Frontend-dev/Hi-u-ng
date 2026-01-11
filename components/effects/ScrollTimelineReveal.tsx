import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollTimelineReveal() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black text-white">
        <div className="max-w-4xl mx-auto px-10 py-32 relative">
            
            {/* SVG Path */}
            <svg 
                className="absolute top-0 left-10 md:left-1/2 h-full w-20 md:-translate-x-1/2 overflow-visible"
                style={{ height: '100%' }}
            >
                <path 
                    d="M 10 0 V 2000" // Simplified vertical line for demo, could be curved
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                />
                <path 
                    d="M 10 0 V 2000"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    style={{
                        strokeDashoffset: `calc(2000px - var(--scroll-percent, 0) * 2000px)`
                    }}
                />
            </svg>

            <div className="space-y-40">
                {[1, 2, 3, 4, 5].map((item, i) => (
                    <div key={i} className="relative pl-12 md:pl-0 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:order-1' : 'md:order-3 md:text-right'}`}>
                            <div className="p-6 bg-neutral-900 rounded-xl border border-white/10 transition-all duration-500"
                                style={{
                                    opacity: `calc((var(--scroll-percent, 0) * 5) - ${i - 0.5})`,
                                    transform: `translateY(calc(20px - ((var(--scroll-percent, 0) * 5) - ${i - 0.5}) * 20px))`
                                }}
                            >
                                <h3 className="font-bold text-xl mb-2">Milestone 0{item}</h3>
                                <p className="text-gray-400 text-sm">Revealed as the path travels down.</p>
                            </div>
                        </div>
                        <div className="md:w-2/12 md:order-2 flex justify-center">
                            {/* Dot */}
                            <div className="w-4 h-4 bg-black border-2 border-blue-500 rounded-full z-10 transition-transform duration-300"
                                style={{ transform: `scale(calc(clamp(0, (var(--scroll-percent, 0) * 5) - ${i - 0.2}, 1) * 1.5))` }}
                            />
                        </div>
                        <div className="md:w-5/12 md:order-3"></div>
                    </div>
                ))}
            </div>
            
            <div className="h-40"></div>
        </div>
      </div>
    </DemoContainer>
  );
}