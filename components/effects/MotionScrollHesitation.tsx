import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionScrollHesitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hesitating, setHesitating] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if(!el) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    let hesitateTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
        setScrolling(true);
        setHesitating(false);
        clearTimeout(scrollTimeout);
        clearTimeout(hesitateTimeout);

        scrollTimeout = setTimeout(() => {
            setScrolling(false);
            // If stopped in middle of content, detect hesitation
            const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
            if (p > 0.1 && p < 0.9) {
                hesitateTimeout = setTimeout(() => setHesitating(true), 500);
            }
        }, 100);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer>
      <div ref={containerRef} className="h-full w-full overflow-y-auto hide-scrollbar bg-neutral-900 relative scroll-smooth">
        
        {/* Floating Helper */}
        <div 
            className={`
                fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50
                transition-all duration-500 ease-out
                ${hesitating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}
            `}
        >
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl animate-bounce">
                Keep Scrolling 👇
            </div>
        </div>

        <div className="max-w-2xl mx-auto py-20 px-8 space-y-32 opacity-50">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/20">{i}</span>
                </div>
            ))}
        </div>
      </div>
    </DemoContainer>
  );
}