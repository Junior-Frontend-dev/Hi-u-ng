import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const CHAPTERS = [
    { 
        id: 1, 
        text: "In the beginning, there was only the grid. A rigid structure defining the boundaries of the digital world.", 
        bg: "bg-blue-900", 
        visual: <div className="grid grid-cols-4 gap-4 w-64 h-64">{[...Array(16)].map((_, i) => <div key={i} className="border border-white/20"></div>)}</div> 
    },
    { 
        id: 2, 
        text: "Then came color, emotion, and chaos. Rules were broken to make way for expression.", 
        bg: "bg-purple-900", 
        visual: <div className="w-64 h-64 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full blur-xl animate-pulse"></div> 
    },
    { 
        id: 3, 
        text: "Finally, intelligence emerged. The machine began to dream, generating worlds of its own.", 
        bg: "bg-emerald-900", 
        visual: <div className="text-9xl font-mono text-emerald-400 opacity-50">{`{AI}`}</div> 
    },
];

export default function ExperimentalStory() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        
        {/* Sticky Background Visuals */}
        <div className={`sticky top-0 h-screen w-full transition-colors duration-1000 ${CHAPTERS[activeChapter].bg} flex items-center justify-center overflow-hidden`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            {/* Central Visual */}
            <div className="scale-150 transition-all duration-700 transform">
                {CHAPTERS[activeChapter].visual}
            </div>
        </div>

        {/* Scrolling Narrative Overlay */}
        <div className="relative z-10 -mt-[100vh]">
            <div className="h-[50vh]"></div> {/* Spacer */}
            
            {CHAPTERS.map((chapter, i) => (
                <div 
                    key={chapter.id}
                    className="h-screen flex items-center justify-center"
                    onMouseEnter={() => setActiveChapter(i)} // Simple trigger, IntersectionObserver better for prod
                >
                    <div className="bg-black/80 backdrop-blur-xl p-10 rounded-3xl border border-white/10 max-w-lg shadow-2xl mx-6">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4 block">Chapter 0{chapter.id}</span>
                        <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
                            {chapter.text}
                        </p>
                    </div>
                </div>
            ))}

            <div className="h-[50vh]"></div> {/* Spacer */}
        </div>

      </div>
    </DemoContainer>
  );
}