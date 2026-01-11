import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Waves, Flame, Trees, Sparkles, ArrowDown } from 'lucide-react';

const SECTIONS = [
  { title: "Azure", desc: "The depth of the ocean", bg: "bg-gradient-to-br from-blue-900 via-slate-900 to-black", accent: "from-blue-400 to-cyan-400", icon: <Waves size={64} /> },
  { title: "Crimson", desc: "The heat of the moment", bg: "bg-gradient-to-bl from-red-900 via-rose-950 to-black", accent: "from-red-400 to-orange-400", icon: <Flame size={64} /> },
  { title: "Emerald", desc: "The silence of the forest", bg: "bg-gradient-to-tr from-emerald-900 via-teal-950 to-black", accent: "from-emerald-400 to-teal-400", icon: <Trees size={64} /> },
  { title: "Amethyst", desc: "The mystery of the void", bg: "bg-gradient-to-br from-purple-900 via-violet-950 to-black", accent: "from-purple-400 to-pink-400", icon: <Sparkles size={64} /> },
];

export default function ScrollSnap() {
  // Use speed 3 for snappier auto-scroll
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 3 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / sectionHeight);
      setActiveIndex(Math.min(newIndex, SECTIONS.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  const scrollToSection = (index: number) => {
    scrollRef.current?.scrollTo({
      top: index * (scrollRef.current?.clientHeight || 0),
      behavior: 'smooth'
    });
  };

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* Navigation Dots */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {SECTIONS.map((section, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="group relative flex items-center justify-end"
          >
            <div className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${activeIndex === i ? `bg-gradient-to-r ${section.accent} scale-125` : 'bg-white/30 hover:bg-white/50'}
            `} />
          </button>
        ))}
      </div>

      <div 
        ref={scrollRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar"
      >
        {SECTIONS.map((section, i) => (
          <div 
            key={i} 
            className={`h-full w-full snap-start ${section.bg} flex flex-col items-center justify-center relative p-10 overflow-hidden`}
          >
            <div 
              className={`text-center max-w-2xl z-10 transition-all duration-700 ${activeIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="text-white mb-6 animate-bounce inline-block opacity-80">
                {section.icon}
              </div>

              <h2 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
                <span className={`bg-gradient-to-r ${section.accent} bg-clip-text text-transparent drop-shadow-2xl`}>
                  {section.title}
                </span>
              </h2>

              <p className="text-xl text-white/60 font-light mb-8 italic">"{section.desc}"</p>
            </div>
          </div>
        ))}
      </div>
    </DemoContainer>
  );
}