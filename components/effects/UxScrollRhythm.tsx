import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxScrollRhythm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if(!el) return;

    let raf: number;
    let velocity = 0;

    const loop = () => {
        const scrollTop = el.scrollTop;
        const delta = Math.abs(scrollTop - lastScroll.current);
        lastScroll.current = scrollTop;
        
        // Smooth velocity decay
        velocity += (delta - velocity) * 0.1;

        if (ballRef.current) {
            // Pulse speed based on scroll velocity
            const scale = 1 + Math.min(velocity * 0.05, 1.5);
            // Rotate based on scroll position
            const rotate = scrollTop * 0.5;
            
            ballRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
            ballRef.current.style.filter = `hue-rotate(${rotate}deg)`;
        }

        raf = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <DemoContainer>
      <div ref={containerRef} className="h-full w-full overflow-y-auto hide-scrollbar bg-neutral-900 relative">
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div 
                ref={ballRef}
                className="w-40 h-40 bg-gradient-to-tr from-purple-500 to-orange-500 rounded-[3rem] transition-transform duration-75"
            />
        </div>
        
        {/* Scroll Content */}
        <div className="relative z-10 flex flex-col items-center gap-96 py-96">
            {[1,2,3,4,5].map(i => (
                <h2 key={i} className="text-8xl font-black text-white mix-blend-overlay">BEAT {i}</h2>
            ))}
        </div>
      </div>
    </DemoContainer>
  );
}