import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const SECTIONS = [
  { id: 1, title: "Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  { id: 2, title: "Develop", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80" },
  { id: 3, title: "Deploy", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
];

export default function ScrollPinning() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="flex flex-col md:flex-row">
            
            {/* Left Side: Scrollable Text */}
            <div className="w-full md:w-1/2 p-10 pt-[50vh] pb-[50vh] space-y-[80vh]">
                {SECTIONS.map(s => (
                    <div key={s.id} className="min-h-[20vh] flex flex-col justify-center">
                        <h2 className="text-5xl font-bold text-white mb-4">{s.title}</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            This content scrolls naturally. As it passes the viewport center, 
                            the pinned image on the right should update to match.
                        </p>
                    </div>
                ))}
            </div>

            {/* Right Side: Sticky Images */}
            <div className="hidden md:block w-1/2 h-screen sticky top-0 overflow-hidden bg-neutral-900 border-l border-white/10">
                {SECTIONS.map((s, i) => (
                    <div 
                        key={s.id}
                        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                        style={{
                            // Logic: Show image based on scroll percent relative to total sections
                            // Rough approximation using generic scroll percent for demo
                            opacity: `calc(1 - max(0, abs(var(--scroll-percent, 0) * 3 - ${i} - 0.2)) * 5)` 
                            // Complex CSS math to fade in/out based on index `i` approx
                        }}
                    >
                        <img src={s.img} className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                ))}
                
                <div className="absolute bottom-10 left-10">
                    <div className="text-xs uppercase tracking-widest text-white/50">Pinned Gallery</div>
                </div>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}