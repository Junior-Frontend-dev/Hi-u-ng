import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function SignatureEmotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<'calm' | 'agitated'>('calm');
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if(!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
        const current = el.scrollTop;
        const velocity = Math.abs(current - lastScrollPos.current);
        lastScrollPos.current = current;

        if (velocity > 50) {
            setMood('agitated');
            clearTimeout(timeout);
            timeout = setTimeout(() => setMood('calm'), 500);
        }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer>
      <div 
        ref={containerRef}
        className={`h-full w-full overflow-y-auto hide-scrollbar transition-colors duration-500 ${mood === 'agitated' ? 'bg-red-900' : 'bg-blue-900'}`}
      >
        <div className="h-[200vh] flex items-center justify-center sticky top-0">
            <h1 className="text-9xl font-black text-white transition-all duration-300 transform">
                {mood === 'agitated' ? '😡' : '😌'}
            </h1>
        </div>
      </div>
    </DemoContainer>
  );
}