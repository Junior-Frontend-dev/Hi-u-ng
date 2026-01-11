import React, { useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollInfinite() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
        // Logic: The content is duplicated. When we reach the midway point (end of set 1),
        // we instantly jump back to start (0).
        // If we go above 0 (scrolling up), we jump to midway.
        
        // Total height of content (2 sets)
        const totalHeight = el.scrollHeight;
        const viewHeight = el.clientHeight;
        const halfHeight = totalHeight / 2;

        if (el.scrollTop >= halfHeight - 100) { // -100 buffer
            el.scrollTop = 1; // Jump to start
        } else if (el.scrollTop === 0) {
            // Optional: If scrolling up past 0, jump to middle to allow infinite up-scroll
            // el.scrollTop = halfHeight - viewHeight - 1;
        }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  // Content block to be repeated
  const ContentBlock = () => (
    <div className="py-20 px-8 max-w-2xl mx-auto space-y-32">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-8 opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-6xl font-mono text-white/20">0{i}</span>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Chapter {i}</h3>
                    <p className="text-gray-400">The story continues in an eternal cycle. There is no beginning and no end, only the middle.</p>
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        {/* Set 1 */}
        <ContentBlock />
        {/* Set 2 (Duplicate for loop) */}
        <ContentBlock />
      </div>
    </DemoContainer>
  );
}