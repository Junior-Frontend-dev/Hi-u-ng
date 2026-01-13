import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ScrollImageZoom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      
      // Scale from 0.5 to 2.5
      setScale(0.5 + progress * 2);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DemoContainer>
      <div 
        ref={scrollRef} 
        className="h-full w-full overflow-y-auto relative scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <div className="sticky top-0 h-full w-full flex items-center justify-center overflow-hidden bg-black">
            <div 
                className="relative w-64 h-64 md:w-96 md:h-96 transition-transform duration-100 ease-out will-change-transform"
                style={{ transform: `scale(${scale})` }}
            >
                <img 
                    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop" 
                    alt="Zoom Demo" 
                    className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end p-6">
                    <h2 className="text-white font-bold text-2xl drop-shadow-md">Deep Zoom</h2>
                </div>
            </div>
            
            <div className="absolute bottom-10 text-white/50 text-sm font-mono animate-pulse pointer-events-none mix-blend-difference">
                SCROLL TO ZOOM
            </div>
        </div>
        
        {/* Scroll spacer */}
        <div className="h-[300vh]"></div>
      </div>
    </DemoContainer>
  );
}
