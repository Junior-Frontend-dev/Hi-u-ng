import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ScrollImageGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [gap, setGap] = useState(1);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      
      // Gap expands from 1rem to 4rem (approx 4px to 64px)
      setGap(4 + progress * 60);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528164344705-475426879893?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <DemoContainer>
      <div 
        ref={scrollRef} 
        className="h-full w-full overflow-y-auto relative scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <div className="sticky top-0 h-full w-full flex items-center justify-center overflow-hidden bg-black p-8">
            <div 
                className="grid grid-cols-2 w-full max-w-2xl transition-all duration-100 ease-out"
                style={{ gap: `${gap}px` }}
            >
                {images.map((src, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-lg">
                        <img 
                            src={src} 
                            alt={`Grid ${i}`} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                ))}
            </div>
            
            <div className="absolute bottom-6 text-white/50 text-sm font-mono animate-pulse pointer-events-none mix-blend-difference">
                SCROLL TO EXPAND GRID
            </div>
            <div className="absolute top-6 left-6 text-white/90 font-bold text-xl drop-shadow-md pointer-events-none">
                Grid Expansion
            </div>
        </div>
        
        {/* Scroll spacer */}
        <div className="h-[250vh]"></div>
      </div>
    </DemoContainer>
  );
}
