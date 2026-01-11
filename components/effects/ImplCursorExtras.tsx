import React, { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ImplCursorExtras({ variant }: { variant: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [clickRipples, setClickRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      prevPosRef.current = pos;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    
    const el = containerRef.current;
    if (el) el.addEventListener('mousemove', handleMove);
    return () => el?.removeEventListener('mousemove', handleMove);
  }, [pos]);

  useEffect(() => {
    if (variant.includes('trail') || variant.includes('emoji')) {
      const interval = setInterval(() => {
        setTrail(prev => [...prev.slice(-20), { x: pos.x, y: pos.y, id: Date.now() }]);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [pos, variant]);

  const handleClick = (e: React.MouseEvent) => {
    if (variant.includes('ripple')) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setClickRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
      }
      setTimeout(() => {
        setClickRipples(prev => prev.slice(1));
      }, 600);
    }
  };

  const getAngle = () => {
    const dx = pos.x - prevPosRef.current.x;
    const dy = pos.y - prevPosRef.current.y;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  };

  const renderCursorHoverMask = () => (
    <div className="relative w-full h-full bg-black overflow-hidden cursor-none" onClick={handleClick}>
      <div 
        className="absolute w-32 h-32 rounded-full pointer-events-none mix-blend-difference transition-transform"
        style={{ left: pos.x - 64, top: pos.y - 64, transform: 'scale(1)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-6xl font-bold text-gray-600">HOVER ME</p>
      </div>
      {clickRipples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full border-2 border-white pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            animation: 'ripple-expand 0.6s ease-out forwards',
          }}
        />
      ))}
    </div>
  );

  const renderCursorTextReplace = () => (
    <div className="relative w-full h-full bg-neutral-900 cursor-none" onClick={handleClick}>
      <div 
        className="absolute pointer-events-none text-2xl font-bold text-white mix-blend-difference z-50"
        style={{ left: pos.x + 20, top: pos.y - 10 }}
      >
        VIEW
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-48 h-32 bg-neutral-800 rounded-xl border border-neutral-700 flex items-center justify-center">
              <span className="text-neutral-500">Image {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCursorImageFloat = () => (
    <div className="relative w-full h-full bg-neutral-100 cursor-none" onClick={handleClick}>
      <div 
        className="absolute w-48 h-32 rounded-xl overflow-hidden pointer-events-none z-50 shadow-2xl"
        style={{ left: pos.x + 30, top: pos.y - 16, transform: 'rotate(5deg)' }}
      >
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 p-10">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg" />
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-48 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCursorBlendText = () => (
    <div className="relative w-full h-full bg-white cursor-none overflow-hidden" onClick={handleClick}>
      <div 
        className="absolute w-24 h-24 rounded-full pointer-events-none mix-blend-difference bg-white z-50"
        style={{ left: pos.x - 48, top: pos.y - 48 }}
      />
      <div className="absolute inset-0 flex items-center justify-center flex-wrap p-20 gap-8">
        {['CURSOR', 'HOVER', 'EFFECT', 'BLEND', 'MODE', 'DIFFERENCE'].map((word, i) => (
          <span key={i} className="text-5xl font-black text-gray-300">{word}</span>
        ))}
      </div>
    </div>
  );

  const renderCursorCircleExpand = () => (
    <div className="relative w-full h-full bg-neutral-900 cursor-none" onClick={handleClick}>
      <div 
        className="absolute pointer-events-none mix-blend-difference z-50"
        style={{ 
          left: hoveredCard !== null ? '50%' : pos.x - 25, 
          top: hoveredCard !== null ? '50%' : pos.y - 25,
          transform: hoveredCard !== null ? 'translate(-50%, -50%) scale(20)' : 'scale(1)',
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'white',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button 
          className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white cursor-pointer relative z-10"
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          Hover Me
        </button>
      </div>
    </div>
  );

  const renderCursorEmojiTrail = () => (
    <div className="relative w-full h-full bg-neutral-900 cursor-none overflow-hidden" onClick={handleClick}>
      {trail.map((point, i) => (
        <div
          key={point.id}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            opacity: Math.max(0, 1 - i / 20),
            transform: `scale(${Math.max(0.5, 1 - i / 20)})`,
          }}
        >
          {['✨', '🌟', '💫', '⭐'][i % 4]}
        </div>
      ))}
      <div 
        className="absolute w-8 h-8 bg-yellow-400 rounded-full pointer-events-none z-50"
        style={{ left: pos.x - 16, top: pos.y - 16 }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white/30">
        <p>Move your mouse to leave a trail!</p>
      </div>
    </div>
  );

  const renderCursorDirectionArrow = () => (
    <div className="relative w-full h-full bg-neutral-900 cursor-none" onClick={handleClick}>
      <div 
        className="absolute pointer-events-none text-4xl z-50"
        style={{ 
          left: pos.x - 16, 
          top: pos.y - 16,
          transform: `rotate(${getAngle() + 90}deg)`,
        }}
      >
        ➜
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/50 text-center">
          <p className="text-2xl font-bold mb-2">Direction Arrow</p>
          <p>Arrow points in movement direction</p>
          <p className="mt-4 text-xl">{getAngle().toFixed(1)}°</p>
        </div>
      </div>
      {trail.slice(-5).map((point, i) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: i / 5,
          }}
        />
      ))}
    </div>
  );

  const renderCursorDotGrid = () => (
    <div className="relative w-full h-full bg-neutral-900 overflow-hidden cursor-crosshair">
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-8">
        {[...Array(48)].map((_, i) => {
           // Calculate distance from mouse for each dot (approximate center position)
           // This is a simplified version; real grid logic would need exact rects
           return (
             <div key={i} className="flex items-center justify-center">
                <div 
                  className="w-3 h-3 bg-neutral-600 rounded-full transition-transform duration-75 ease-out"
                  ref={el => {
                     if (el) {
                        const rect = el.getBoundingClientRect();
                        const containerRect = containerRef.current?.getBoundingClientRect();
                        if (containerRect) {
                            const dotX = rect.left - containerRect.left + 6;
                            const dotY = rect.top - containerRect.top + 6;
                            const dx = pos.x - dotX;
                            const dy = pos.y - dotY;
                            const dist = Math.sqrt(dx*dx + dy*dy);
                            const maxDist = 200;
                            if (dist < maxDist) {
                                const force = (maxDist - dist) / maxDist;
                                el.style.transform = `translate(${-dx * force * 0.5}px, ${-dy * force * 0.5}px) scale(${1 + force})`;
                                el.style.backgroundColor = `hsl(${200 + force * 60}, 100%, 60%)`;
                            } else {
                                el.style.transform = 'none';
                                el.style.backgroundColor = '#525252';
                            }
                        }
                     }
                  }}
                />
             </div>
           );
        })}
      </div>
    </div>
  );

  const renderCursorLineTether = () => (
    <div className="relative w-full h-full bg-neutral-900 cursor-crosshair">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full relative z-10" id="tether-anchor" />
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line 
                x1="50%" y1="50%" 
                x2={pos.x} y2={pos.y} 
                stroke="white" strokeWidth="2" strokeDasharray="5,5" 
                className="opacity-50"
            />
        </svg>
        <div 
            className="absolute w-8 h-8 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: pos.x, top: pos.y }}
        />
    </div>
  );

  const renderCursorColorInvert = () => (
    <div className="relative w-full h-full bg-white cursor-none" onClick={handleClick}>
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {[...Array(16)].map((_, i) => (
                <div key={i} className={`flex items-center justify-center ${i % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <span className="text-4xl font-bold">{i}</span>
                </div>
            ))}
        </div>
        <div 
            className="absolute w-64 h-64 bg-white rounded-full mix-blend-difference pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50"
            style={{ left: pos.x, top: pos.y }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white">
            <h1 className="text-6xl font-black">INVERT</h1>
        </div>
    </div>
  );

  const renderCursorVideoReveal = () => (
    <div className="relative w-full h-full bg-black cursor-none">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-800">
            <h1 className="text-[20vw] font-black select-none">VIDEO</h1>
        </div>
        <div 
            className="absolute w-64 h-64 rounded-full pointer-events-none overflow-hidden -translate-x-1/2 -translate-y-1/2 z-50 border-4 border-white"
            style={{ left: pos.x, top: pos.y }}
        >
            <video 
                src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-286-large.mp4" 
                className="w-full h-full object-cover"
                autoPlay loop muted
            />
        </div>
    </div>
  );

  const renderCursorMagneticBorder = () => (
    <div className="relative w-full h-full bg-neutral-100 flex items-center justify-center">
        <button 
            className="px-12 py-6 bg-white text-black font-bold text-xl rounded-xl border border-gray-300 transition-transform duration-100 ease-out relative group"
            style={{
                transform: `translate(${(pos.x - (containerRef.current?.offsetWidth || 0)/2) * 0.1}px, ${(pos.y - (containerRef.current?.offsetHeight || 0)/2) * 0.1}px)`
            }}
        >
            Magnetic Button
            <div 
                className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    transform: `translate(${(pos.x - (containerRef.current?.offsetWidth || 0)/2) * 0.2}px, ${(pos.y - (containerRef.current?.offsetHeight || 0)/2) * 0.2}px)`
                }}
            />
        </button>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'cursor-hover-mask': return renderCursorHoverMask();
      case 'cursor-text-replace': return renderCursorTextReplace();
      case 'cursor-image-float': return renderCursorImageFloat();
      case 'cursor-blend-text': return renderCursorBlendText();
      case 'cursor-circle-expand': return renderCursorCircleExpand();
      case 'cursor-emoji-trail': return renderCursorEmojiTrail();
      case 'cursor-directional-arrow': return renderCursorDirectionArrow();
      case 'cursor-dot-grid': return renderCursorDotGrid();
      case 'cursor-line-tether': return renderCursorLineTether();
      case 'cursor-color-invert': return renderCursorColorInvert();
      case 'cursor-video-reveal': return renderCursorVideoReveal();
      case 'cursor-magnetic-border': return renderCursorMagneticBorder();
      default: return renderDefault();
    }
  };

  return (
    <DemoContainer>
      <div ref={containerRef} className="h-full w-full relative overflow-hidden">
        {renderContent()}
      </div>
    </DemoContainer>
  );
}
