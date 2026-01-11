import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Eye, Play, MousePointer2 } from 'lucide-react';

export default function CursorContextShape() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [type, setType] = useState<'default' | 'eye' | 'play'>('default');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div 
        className="fixed top-0 left-0 pointer-events-none z-50 transition-all duration-200 ease-out text-black"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)` }}
      >
        <div className={`
            flex items-center justify-center bg-white rounded-full transition-all duration-300
            ${type === 'default' ? 'w-4 h-4' : 'w-16 h-16'}
        `}>
            {type === 'eye' && <Eye size={24} />}
            {type === 'play' && <Play size={24} fill="currentColor" />}
        </div>
      </div>

      <div className="h-full w-full bg-black flex justify-around items-center">
        <div 
            className="w-64 h-64 bg-neutral-800 flex items-center justify-center text-white/50 border border-white/10"
            onMouseEnter={() => setType('eye')}
            onMouseLeave={() => setType('default')}
        >
            Image Area
        </div>
        
        <div 
            className="w-64 h-64 bg-neutral-800 flex items-center justify-center text-white/50 border border-white/10"
            onMouseEnter={() => setType('play')}
            onMouseLeave={() => setType('default')}
        >
            Video Area
        </div>
      </div>
    </DemoContainer>
  );
}