import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorScale() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'zoom'>('default');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      setPos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
        {/* Cursor Element */}
        <div 
            className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)` }}
        >
            <div 
                className={`
                    transition-all duration-300 ease-in-out flex items-center justify-center text-[10px] font-bold text-black
                    ${cursorType === 'default' && 'w-4 h-4 rounded-full bg-white'}
                    ${cursorType === 'text' && 'w-1 h-8 bg-white'}
                    ${cursorType === 'zoom' && 'w-20 h-20 rounded-full bg-white'}
                `}
            >
                {cursorType === 'zoom' && "OPEN"}
            </div>
        </div>

        <div className="h-full w-full bg-black flex flex-col items-center justify-center gap-16 p-8">
            <h1 
                className="text-4xl text-white font-serif italic cursor-none"
                onMouseEnter={() => setCursorType('text')}
                onMouseLeave={() => setCursorType('default')}
            >
                Hover over this text content
            </h1>

            <div 
                className="w-64 h-40 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden cursor-none"
                onMouseEnter={() => setCursorType('zoom')}
                onMouseLeave={() => setCursorType('default')}
            >
                <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=80" className="opacity-50" />
            </div>
        </div>
    </DemoContainer>
  );
}