import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const CARDS = [
    { title: "Industrial", ease: "linear", desc: "Raw, mechanical, precise.", color: "bg-stone-600" },
    { title: "Corporate", ease: "cubic-bezier(0.4, 0, 0.2, 1)", desc: "Professional, smooth, reliable.", color: "bg-blue-600" },
    { title: "Playful", ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", desc: "Bouncy, energetic, friendly.", color: "bg-pink-500" }
];

export default function BrandMotionLang() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Motion Identity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {CARDS.map((card, i) => (
                <div 
                    key={i}
                    className="relative group h-80 bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                >
                    {/* The Moving Element */}
                    <div 
                        className={`absolute top-0 left-0 w-full h-full ${card.color} flex items-center justify-center p-6 text-white text-center transition-transform duration-700`}
                        style={{
                            transform: hovered === i ? 'translateY(0%)' : 'translateY(85%)',
                            transitionTimingFunction: card.ease
                        }}
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                            <p className="opacity-80">{card.desc}</p>
                            <p className="mt-4 text-xs font-mono bg-black/20 p-2 rounded">{card.ease}</p>
                        </div>
                    </div>

                    <div className="absolute top-4 left-0 w-full text-center text-gray-400 font-mono text-sm pointer-events-none">
                        Hover Me
                    </div>
                </div>
            ))}
        </div>
      </div>
    </DemoContainer>
  );
}