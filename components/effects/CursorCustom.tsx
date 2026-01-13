import React, { useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorCustom() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
      
      {/* Custom Cursor Element */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        <div 
          className={`
            relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-all duration-300
            ${hovering ? 'w-16 h-16 bg-white/20' : 'w-4 h-4 bg-white'}
          `} 
        />
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center bg-black gap-12">
        <h2 className="text-4xl font-bold text-white mb-8">Custom Cursor</h2>
        
        <div className="flex gap-8">
            <button 
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-110 transition-transform"
            >
                Hover Me
            </button>
            <button 
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
                Or Me
            </button>
        </div>
      </div>
    </DemoContainer>
  );
}