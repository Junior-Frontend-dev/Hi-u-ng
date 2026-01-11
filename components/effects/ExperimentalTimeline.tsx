import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const EVENTS = [
    { year: "1990", title: "The Web is Born", desc: "Tim Berners-Lee invents the World Wide Web." },
    { year: "1995", title: "JavaScript", desc: "Brendan Eich creates Mocha, later JavaScript." },
    { year: "2008", title: "HTML5", desc: "A new era of multimedia and semantic web." },
    { year: "2013", title: "React", desc: "Facebook releases React, changing UI development." },
    { year: "2024", title: "The AI Era", desc: "Generative interfaces redefine interaction." },
];

export default function ExperimentalTimeline() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-32 relative">
            
            {/* Central Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
                {/* Progress Fill */}
                <div 
                    className="absolute top-0 left-0 w-full bg-blue-500 transition-all duration-100 ease-linear origin-top"
                    style={{ height: 'calc(var(--scroll-percent, 0) * 100%)' }}
                ></div>
            </div>

            <div className="space-y-32">
                {EVENTS.map((event, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div 
                            key={i} 
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Side */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 text-left md:text-right">
                                <div className={`p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors ${!isEven && 'md:text-left'}`}>
                                    <span className="text-blue-400 font-mono font-bold text-xl mb-2 block">{event.year}</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                                    <p className="text-gray-400">{event.desc}</p>
                                </div>
                            </div>

                            {/* Dot on Line */}
                            <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-black border-2 border-white rounded-full transform -translate-x-1/2 z-10">
                                <div className="w-full h-full bg-blue-500 rounded-full scale-0 transition-transform duration-500 delay-100" style={{ transform: 'scale(1)' }}></div>
                            </div>

                            {/* Empty Side for spacing */}
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                    )
                })}
            </div>

            <div className="h-40"></div>
        </div>
      </div>
    </DemoContainer>
  );
}