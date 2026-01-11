import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const CARDS = [
  { color: "bg-[#FF5F6D]", title: "Card One", desc: "The foundation of the stack." },
  { color: "bg-[#FFC371]", title: "Card Two", desc: "Building upon the previous layer." },
  { color: "bg-[#11998e]", title: "Card Three", desc: "Adding depth and context." },
  { color: "bg-[#38ef7d]", title: "Card Four", desc: "Reaching new heights." },
  { color: "bg-[#8E2DE2]", title: "Card Five", desc: "The final piece of the puzzle." },
];

export default function ScrollStacking() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900 px-6 pt-10 pb-40">
        <header className="mb-20 text-center pt-20">
          <h1 className="text-4xl font-bold text-white mb-4">Stacking Cards</h1>
          <p className="text-white/50">Sticky positioning creates a physical stacking effect.</p>
        </header>

        <div className="max-w-md mx-auto space-y-20 pb-[50vh]">
          {CARDS.map((card, i) => (
            <div 
              key={i}
              className="sticky"
              style={{ top: `${80 + i * 20}px` }}
            >
              <div 
                className={`${card.color} rounded-2xl p-8 shadow-2xl min-h-[300px] flex flex-col justify-between transform transition-transform origin-top hover:scale-[1.02]`}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-white/90">{card.title}</h2>
                  <span className="text-white/40 font-mono text-xl">0{i + 1}</span>
                </div>
                <p className="text-white/80 text-lg font-medium">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}