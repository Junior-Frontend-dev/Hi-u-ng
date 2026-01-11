import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Camera } from 'lucide-react';

export default function ScrollBlur() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar">
        <div className="sticky top-0 h-full w-full overflow-hidden">
          {/* Background Image - Blurs on scroll */}
          <div
            className="absolute inset-0 bg-cover bg-center will-change-[filter,transform]"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
              filter: `blur(calc(var(--scroll-percent, 0) * 20px)) brightness(calc(1 - var(--scroll-percent, 0) * 0.4))`,
              transform: `scale(calc(1 + var(--scroll-percent, 0) * 0.1))`
            }}
          />

          {/* Content Card */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{
              opacity: 'calc(var(--scroll-percent, 0) * 4)', // Fades in quickly
              transform: 'translateY(calc(20px - var(--scroll-percent, 0) * 20px))'
            }}
          >
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl max-w-md text-center shadow-2xl">
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/10">
                <Camera size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Focus Shift</h2>
              <p className="text-white/70">Blurring the background directs attention to the foreground.</p>
            </div>
          </div>
        </div>
        <div className="h-[200vh]" />
      </div>
    </DemoContainer>
  );
}