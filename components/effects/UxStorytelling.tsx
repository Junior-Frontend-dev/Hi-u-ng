import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight } from 'lucide-react';

export default function UxStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const p = scrollLeft / (scrollWidth - clientWidth);
    
    // Determine direction for character facing
    if (p > progress) setDirection('right');
    if (p < progress) setDirection('left');
    
    setProgress(p);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [progress]);

  // Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if(!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <DemoContainer>
      <div 
        ref={containerRef}
        className="h-full w-full overflow-x-auto overflow-y-hidden hide-scrollbar bg-[#111] relative flex cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {/* Fixed Character */}
        <div className="sticky left-10 md:left-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className={`
                w-12 h-20 bg-white rounded-full relative transition-transform duration-300
                ${direction === 'left' ? 'scale-x-[-1]' : 'scale-x-1'}
            `}>
                {/* Backpack/Cape */}
                <div className="absolute top-4 -left-2 w-4 h-12 bg-blue-500 rounded-lg -z-10 rotate-12 origin-top animate-pulse"></div>
                {/* Eye */}
                <div className="absolute top-6 right-2 w-3 h-3 bg-black rounded-full"></div>
                {/* Legs (Simulated walk cycle based on progress modulo) */}
                <div 
                    className="absolute bottom-0 left-2 w-3 h-8 bg-gray-300 rounded-full origin-top"
                    style={{ transform: `rotate(${Math.sin(progress * 50) * 30}deg)` }}
                ></div>
                <div 
                    className="absolute bottom-0 right-2 w-3 h-8 bg-gray-400 rounded-full origin-top"
                    style={{ transform: `rotate(${Math.sin(progress * 50 + Math.PI) * 30}deg)` }}
                ></div>
            </div>
        </div>

        {/* Scene Container - Width determines scroll length */}
        <div className="flex h-full min-w-[400vw] relative items-center select-none">
            
            {/* Background Parallax Layers */}
            <div className="absolute inset-0 flex items-end pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="w-64 h-64 bg-white/10 rounded-t-full mx-20"
                        style={{ height: `${Math.random() * 50 + 20}%` }}
                    />
                ))}
            </div>

            {/* Story Elements */}
            <div className="absolute left-[10vw] top-1/2 -translate-y-1/2 text-white/50 w-64 pointer-events-none">
                <div className="flex items-center gap-4 animate-bounce-right">
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                        <ArrowRight />
                    </div>
                    <span>Drag to Walk</span>
                </div>
            </div>

            <div className="absolute left-[80vw] bottom-[20%] w-64 h-64 bg-blue-900/50 rounded-full blur-3xl"></div>
            <div className="absolute left-[85vw] text-white font-bold text-4xl">The Beginning</div>

            <div className="absolute left-[150vw] top-[20%] w-32 h-32 bg-yellow-500 rounded-full shadow-[0_0_100px_rgba(234,179,8,0.5)]"></div>
            <div className="absolute left-[160vw] text-white font-bold text-4xl">Discovery</div>

            <div className="absolute left-[220vw] h-full w-px bg-white/10"></div>
            <div className="absolute left-[240vw] text-white font-bold text-4xl flex gap-8 items-center">
                <div className="w-20 h-20 bg-red-500 rotate-45"></div>
                Conflict
            </div>

            <div className="absolute left-[320vw] top-1/2 -translate-y-1/2 flex gap-4">
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-10 h-32 bg-gradient-to-t from-purple-500 to-transparent opacity-50"
                        style={{ transform: `scaleY(${1 + Math.sin(progress * 20 + i)})` }}
                    ></div>
                ))}
            </div>
            <div className="absolute left-[350vw] text-white font-bold text-6xl">Resolution</div>

        </div>
      </div>
    </DemoContainer>
  );
}