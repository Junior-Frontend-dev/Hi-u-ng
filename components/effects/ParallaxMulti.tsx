import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Rocket, Sparkles, Layers } from 'lucide-react';

export default function ParallaxMulti() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div 
        ref={scrollRef} 
        className="h-full overflow-y-auto relative perspective-1000 hide-scrollbar bg-[#0f0c29] bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]"
        onMouseMove={handleMouseMove}
      >
        <div className="h-[180vh] relative overflow-hidden">
            
            {/* ========== LAYER 0: STARS ========== */}
            <div 
              className="absolute inset-0 will-change-transform" 
              style={{ transform: `translate3d(${mousePos.x * 10}px, calc(var(--scroll-y, 0px) * 0.1 + ${mousePos.y * 10}px), 0)` }}
            >
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${1 + Math.random() * 2}px`,
                    height: `${1 + Math.random() * 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>

            {/* ========== LAYER 1: AURORA ========== */}
            <div 
              className="absolute top-0 left-0 w-full h-[60%] pointer-events-none overflow-hidden opacity-30 will-change-transform"
              style={{ transform: 'translateY(calc(var(--scroll-y, 0px) * 0.15))' }}
            >
              <div className="absolute top-0 left-[10%] w-[40%] h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-[60px]" />
              <div className="absolute top-0 right-[20%] w-[30%] h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent blur-[60px]" />
            </div>

            {/* ========== LAYER 2: THE MOON ========== */}
            <div 
              className="absolute top-20 right-10 w-64 h-64 will-change-transform"
              style={{ 
                transform: `translate3d(${mousePos.x * -20}px, calc(var(--scroll-y, 0px) * 0.2 + ${mousePos.y * -20}px), 0)` 
              }} 
            >
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 shadow-[0_0_80px_rgba(255,255,255,0.3)]">
                {/* Moon Details using simple divs */}
                <div className="absolute top-[20%] left-[30%] w-8 h-8 rounded-full bg-gray-300/50" />
                <div className="absolute top-[50%] left-[20%] w-5 h-5 rounded-full bg-gray-400/40" />
              </div>
            </div>

            {/* ========== LAYER 3: FLOATING PARTICLES ========== */}
            <div 
              className="absolute inset-0 pointer-events-none will-change-transform"
              style={{ transform: 'translateY(calc(var(--scroll-y, 0px) * 0.3))' }}
            >
              {[...Array(15)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-blue-400/30"
                  style={{
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                />
              ))}
            </div>

            {/* ========== LAYER 5: FOREGROUND CARD ========== */}
            <div className="absolute top-[600px] left-0 w-full flex justify-center z-10 px-4">
              <div 
                className="relative max-w-lg w-full transition-all duration-1000 will-change-transform"
                style={{ 
                  transform: `translate3d(${mousePos.x * -15}px, calc(var(--scroll-y, 0px) * -0.1 + ${mousePos.y * -15}px), 0)`,
                  opacity: 'min(1, var(--scroll-percent, 0) * 4)'
                }} 
              >
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-3xl shadow-2xl overflow-hidden group">
                  
                  {/* Floating Icons */}
                  <div className="absolute top-4 right-4 text-purple-400/30"><Rocket size={48} /></div>
                  <div className="absolute bottom-4 left-4 text-pink-400/30"><Sparkles size={32} /></div>

                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                    Deep Space
                  </h2>
                  
                  <p className="text-gray-300 font-light leading-relaxed relative z-10">
                    Multi-plane parallax creates an immersive theatre effect. 
                    By moving the background slower than the foreground, we simulate the relative motion of distant objects.
                  </p>

                  <div className="flex gap-3 mt-6 flex-wrap">
                    {['Parallax', 'Multi-Layer', '3D Depth'].map((tag, i) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full border border-white/20 text-white/60 flex items-center gap-1">
                        <Layers size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}