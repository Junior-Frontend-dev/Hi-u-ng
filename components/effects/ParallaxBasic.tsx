import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Mountain, Compass, Wind } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ParallaxBasic() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-white origin-left will-change-transform"
          style={{ transform: 'scaleX(var(--scroll-percent, 0))' }}
        />
      </div>

      <div ref={scrollRef} className="h-full overflow-y-auto relative scroll-smooth hide-scrollbar perspective-1000 bg-[#050505]">
        
        {/* === LAYER 1: Background Image === */}
        <div 
          className="absolute top-0 left-0 w-full h-[140%] will-change-transform"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Parallax + Blur effect on scroll
            // Fixed calc syntax with spaces for safety
            transform: 'translate3d(0, calc(var(--scroll-y, 0px) * 0.2), 0) scale(1.1)',
            filter: 'brightness(0.6) blur(calc(var(--scroll-percent, 0) * 10px))'
          }}
        />

        {/* === LAYER 2: Particles === */}
        <div className="absolute inset-0 pointer-events-none h-[200%] overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translateY(calc(var(--scroll-y, 0px) * ${0.1 + Math.random() * 0.3}))`
              }}
            />
          ))}
        </div>

        {/* === CONTENT === */}
        <div className="relative z-10 px-8 pb-32">
          
          {/* Hero Title */}
          <div className="min-h-screen flex flex-col justify-center items-center text-center">
            <div 
              className="will-change-transform mix-blend-overlay"
              style={{ 
                transform: 'translateY(calc(var(--scroll-y, 0px) * -0.2))',
                opacity: 'calc(1 - var(--scroll-percent, 0) * 2.5)' 
              }}
            >
              <h2 className="text-sm font-mono tracking-[1em] text-white/80 mb-6 uppercase">Expedition 01</h2>
              <h1 className="text-8xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter">
                NORDIC<br />PEAKS
              </h1>
            </div>
          </div>

          {/* Info Cards - Staggered Entry */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-[-20vh]">
            
            <div 
              className="bg-black/40 backdrop-blur-2xl p-10 rounded-t-3xl border-t border-white/10"
              style={{ 
                transform: 'translateY(calc(100px - var(--scroll-percent, 0) * 100px))',
                opacity: 'calc((var(--scroll-percent, 0) - 0.1) * 3)'
              }}
            >
              <Mountain className="w-12 h-12 text-white mb-6" strokeWidth={1} />
              <h3 className="text-3xl font-bold text-white mb-4">Elevation</h3>
              <p className="text-white/60 leading-relaxed">
                Ascending beyond the tree line, where the air thins and silence reigns. 
                The parallax effect mimics the optical depth of field experienced at high altitudes.
              </p>
            </div>

            <div 
              className="bg-white/5 backdrop-blur-2xl p-10 rounded-b-3xl border-b border-white/10 md:mt-32"
              style={{ 
                transform: 'translateY(calc(150px - var(--scroll-percent, 0) * 150px))',
                opacity: 'calc((var(--scroll-percent, 0) - 0.2) * 3)'
              }}
            >
              <div className="flex gap-4 mb-6">
                <Compass className="w-8 h-8 text-white/80" />
                <Wind className="w-8 h-8 text-white/80" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Coordinates</h3>
              <ul className="text-white/60 space-y-2 font-mono text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>LATITUDE</span>
                  <span>61.234° N</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>LONGITUDE</span>
                  <span>8.543° E</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>ELEVATION</span>
                  <span>2,469M</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="h-[20vh]"></div>
        </div>
      </div>
    </DemoContainer>
  );
}