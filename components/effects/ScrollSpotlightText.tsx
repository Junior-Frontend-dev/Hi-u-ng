import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollSpotlightText() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center p-12">
                
                <p 
                    className="text-4xl md:text-5xl font-serif text-transparent leading-relaxed text-center will-change-[background-position]"
                    style={{
                        color: 'rgba(255,255,255,0.1)', // Dim text
                        backgroundImage: 'radial-gradient(circle 200px at var(--spotlight-x, 50%) 50%, #ffffff 0%, transparent 100%)',
                        backgroundSize: '200% 200%', // Make bg large enough to move
                        backgroundPosition: `calc(100% - var(--scroll-percent, 0) * 120%) 50%`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        // Fallback color logic handled by having color set then overriding with clip? 
                        // Actually better to have a duplicate layer or just use mix-blend.
                        // Here we use background-clip on transparent text with a dim color shadow or fallback.
                        // Let's try simple gradient clip over dim text.
                    }}
                >
                    In the shadows of the digital realm, only what is illuminated matters. 
                    The spotlight of attention reveals truth, one word at a time, 
                    guiding the eye through the darkness of information overload.
                </p>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}