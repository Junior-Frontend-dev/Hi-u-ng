import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function LayoutBrokenGrid() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto p-12 py-32 space-y-32">
            
            {/* Section 1 */}
            <div className="relative">
                <h2 className="text-6xl font-bold relative z-20 mix-blend-exclusion">
                    Breaking<br/>Boundaries
                </h2>
                <div className="absolute top-0 right-0 w-64 h-80 bg-blue-600 z-10 -mt-10 -mr-10"></div>
                <div className="absolute top-20 left-20 w-80 h-64 overflow-hidden z-0 opacity-60">
                     <img src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Section 2 */}
            <div className="relative flex justify-end">
                <div className="w-2/3 relative">
                    <div className="absolute -left-20 top-10 w-40 h-40 bg-orange-500 rounded-full mix-blend-multiply z-20"></div>
                    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" className="w-full h-auto grayscale relative z-10" />
                    <p className="absolute -bottom-10 -left-10 bg-white text-black p-8 max-w-xs z-30 shadow-2xl text-lg font-serif">
                        Alignments are meant to be ignored when the composition demands tension.
                    </p>
                </div>
            </div>

             {/* Section 3 */}
             <div className="relative pt-20">
                <div className="w-full h-px bg-white/20 mb-8"></div>
                <div className="grid grid-cols-2 gap-12">
                     <div className="mt-20">
                         <h3 className="text-4xl font-light mb-4">Overlap</h3>
                         <p className="text-gray-400">Content that bleeds into other sections creates a continuous flow rather than segmented blocks.</p>
                     </div>
                     <div className="relative">
                         <div className="absolute inset-0 bg-purple-900 transform translate-x-4 translate-y-4 z-0"></div>
                         <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" className="relative z-10 w-full" />
                     </div>
                </div>
             </div>

        </div>
      </div>
    </DemoContainer>
  );
}