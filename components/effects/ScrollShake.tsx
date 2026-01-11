import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollShake() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 20 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const lastScroll = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;

    const loop = () => {
        const current = el.scrollTop;
        const velocity = Math.abs(current - lastScroll.current);
        lastScroll.current = current;

        // Apply shake if moving
        if (velocity > 0.5) {
            const intensity = Math.min(velocity * 0.5, 20); // Cap max shake
            setOffset({
                x: (Math.random() - 0.5) * intensity,
                y: (Math.random() - 0.5) * intensity
            });
        } else {
            setOffset({ x: 0, y: 0 });
        }

        rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafId);
  }, [scrollRef]);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-red-600 text-white">
        <div className="min-h-[300vh] flex flex-col items-center justify-center">
            
            <div 
                className="sticky top-1/2 -translate-y-1/2 text-center"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y - 50}%)` // Keep centered Y -50% + offset
                }}
            >
                <h1 className="text-[12vw] font-black uppercase leading-none">EARTH<br/>QUAKE</h1>
                <p className="text-xl font-bold mt-8 bg-black inline-block px-4 py-2">SCROLL FAST</p>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}