import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const IMAGES = [
  "https://images.unsplash.com/photo-1501854140884-074bf86ed91c?w=800&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
];

export default function ScrollSplit() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* 
        This is a bit tricky with CSS vars only because we need a wrapper to scroll 
        but the content needs to move in opposite directions.
        We simulate it by moving the 'Reverse' side UP as we scroll DOWN.
      */}
      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[300vh] relative">
            <div className="sticky top-0 h-full max-h-screen w-full flex overflow-hidden">
                
                {/* Left Side: Natural Scroll (simulated by syncing transform with scrollY) */}
                {/* Actually, since we are in a sticky container, we need to translate content upwards manually to mimic scroll,
                    OR translate it downwards for the "reverse" feel depending on perspective.
                    
                    Let's make Left side move UP (Natural) and Right side move DOWN (Reverse).
                 */}
                
                <div className="w-1/2 h-full relative overflow-hidden bg-neutral-900">
                    <div 
                        className="absolute top-0 left-0 w-full will-change-transform"
                        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * -1))` }}
                    >
                        {IMAGES.map((img, i) => (
                            <div key={i} className="h-screen w-full relative flex items-center justify-center p-10">
                                <img src={img} className="w-full h-[60%] object-cover rounded-xl shadow-2xl opacity-80" />
                                <span className="absolute text-9xl font-black text-white mix-blend-overlay opacity-50 left-4 top-4">0{i+1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Reverse Scroll */}
                <div className="w-1/2 h-full relative overflow-hidden bg-white">
                     <div 
                        className="absolute bottom-0 left-0 w-full will-change-transform"
                        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * 1))` }}
                    >
                        {/* We map in reverse order visually or just standard */}
                        {[...IMAGES].reverse().map((img, i) => (
                            <div key={i} className="h-screen w-full relative flex items-center justify-center p-10">
                                <div className="space-y-4 max-w-sm text-black p-8">
                                    <h3 className="text-4xl font-bold">Nature #{4-i}</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        The duality of nature allows us to see perspective from both sides.
                                        As one rises, the other falls, creating perfect equilibrium.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}