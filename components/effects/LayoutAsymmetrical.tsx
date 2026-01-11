import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function LayoutAsymmetrical() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-[#f2f0ea] text-black">
        <div className="max-w-6xl mx-auto p-8 grid grid-cols-12 gap-y-24 gap-x-8 pt-20">
            
            {/* Header */}
            <div className="col-span-12 md:col-span-8 md:col-start-2 mb-20">
                <h1 className="text-7xl md:text-9xl font-serif leading-none tracking-tight">
                    ASYM<br/>METRY
                </h1>
                <p className="text-xl mt-8 font-light max-w-sm ml-auto">
                    Breaking the balance to create tension and visual interest in digital composition.
                </p>
            </div>

            {/* Item 1 */}
            <div className="col-span-10 col-start-2 md:col-span-5 md:col-start-2">
                <div className="aspect-[3/4] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <span className="block mt-4 font-mono text-xs uppercase tracking-widest">01 / Figure</span>
            </div>

            {/* Item 2 - Offset */}
            <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-8 mt-12 md:mt-32">
                 <p className="text-2xl font-serif leading-relaxed mb-8">
                     "Order is repetition of units. Chaos is multiplicity without rhythm."
                 </p>
                 <div className="aspect-square overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                 </div>
            </div>

            {/* Item 3 - Large Span */}
            <div className="col-span-12 md:col-span-8 md:col-start-4 mt-20 relative">
                 <div className="absolute -left-20 top-20 text-9xl font-black text-black/5 -z-10 rotate-90 origin-left">
                     STRUCTURE
                 </div>
                 <div className="aspect-video overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                 </div>
            </div>

            <div className="col-span-12 h-40"></div>
        </div>
      </div>
    </DemoContainer>
  );
}