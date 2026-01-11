export const CODE_MAP: Record<string, string> = {
  'parallax-basic': `import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Mountain, Compass, Wind } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ParallaxBasic() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

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
                left: \`\${Math.random() * 100}%\`,
                top: \`\${Math.random() * 100}%\`,
                transform: \`translateY(calc(var(--scroll-y, 0px) * \${0.1 + Math.random() * 0.3}))\`
              }}
            />
          ))}
        </div>

        {/* === CONTENT === */}
        <div className="relative z-10 px-8 pb-32">
          
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
}`,
  'scroll-trigger': `import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Zap, Shield, Smartphone, Globe, Cpu, Activity } from 'lucide-react';

const CARDS = [
  { title: "Lightning Fast", desc: "Optimized for speed.", icon: <Zap />, color: "bg-amber-500" },
  { title: "Secure Core", desc: "Bank-grade encryption.", icon: <Shield />, color: "bg-emerald-500" },
  { title: "Mobile First", desc: "Responsive by design.", icon: <Smartphone />, color: "bg-blue-500" },
  { title: "Global CDN", desc: "Deployed worldwide.", icon: <Globe />, color: "bg-purple-500" },
  { title: "AI Powered", desc: "Neural processing.", icon: <Cpu />, color: "bg-rose-500" },
  { title: "Real-time", desc: "Live data sync.", icon: <Activity />, color: "bg-cyan-500" },
];

const Card = ({ item, index }: { item: typeof CARDS[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={\`
        flex items-center gap-6 p-6 rounded-2xl
        bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm
        transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)
        hover:bg-white/[0.08] hover:scale-[1.02] hover:border-white/20
        \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
      \`}
      style={{ transitionDelay: \`\${index * 100}ms\` }}
    >
      <div className={\`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg \${item.color} shadow-\${item.color}/20\`}>
        {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
        <p className="text-white/40 text-sm">{item.desc}</p>
      </div>
      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
            className={\`h-full bg-white transition-transform duration-[1.5s] ease-out \${isVisible ? 'translate-x-0' : '-translate-x-full'}\`}
            style={{ transitionDelay: \`\${index * 100 + 300}ms\` }}
        />
      </div>
    </div>
  );
};

export default function ScrollTrigger() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto p-10 hide-scrollbar bg-neutral-950">
        <div className="min-h-[40vh] flex flex-col justify-center mb-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Features<span className="text-blue-500">.</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-md">
            Scroll down to trigger staggered reveal animations using Intersection Observer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl pb-20">
          {CARDS.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}`,
  'horizontal-scroll': `import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

const PHOTOS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
];

export default function HorizontalScroll() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-[#111]">
        
        {/* Intro */}
        <div className="h-[50vh] flex items-center justify-center">
            <h1 className="text-4xl text-white/50 font-light uppercase tracking-[0.5em] animate-pulse">
                Scroll Down
            </h1>
        </div>

        <div className="h-[400vh] relative">
          <div className="sticky top-0 h-full max-h-screen overflow-hidden flex items-center bg-[#111]">
            
            <div 
                className="flex gap-12 px-[20vw] will-change-transform"
                style={{
                    // Move Left based on scroll.
                    // Skew based on velocity (var(--scroll-velocity)) for physics feel
                    transform: \`
                        translateX(calc((var(--scroll-percent, 0) - 0.1) * -350%)) 
                        skewX(calc(var(--scroll-velocity, 0) * -0.1deg))
                    \`
                }}
            >
                {PHOTOS.map((src, i) => (
                    <div 
                        key={i} 
                        className="w-[40vh] md:w-[60vh] aspect-[3/4] relative group perspective-[1000px]"
                    >
                        <div className="w-full h-full overflow-hidden rounded-lg brightness-75 group-hover:brightness-100 transition-all duration-500 ease-out transform group-hover:scale-105">
                            <img src={src} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -bottom-12 left-0 text-6xl font-black text-white/10 group-hover:text-white transition-colors duration-300">
                            0{i+1}
                        </span>
                    </div>
                ))}
            </div>

          </div>
        </div>

        <div className="h-[50vh] flex items-center justify-center">
            <span className="text-white/20">End of Gallery</span>
        </div>

      </div>
    </DemoContainer>
  );
}`,
  'cursor-follower': `import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // State for animation loop
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = \`translate3d(\${e.clientX}px, \${e.clientY}px, 0)\`;
      }
    };

    let rafId: number;
    const animate = () => {
      // Physics for follower (Ease)
      const dx = mouse.current.x - follower.current.x;
      const dy = mouse.current.y - follower.current.y;
      
      follower.current.x += dx * 0.1;
      follower.current.y += dy * 0.1;

      // Calculate Velocity for "Jelly" effect (Squeeze/Stretch)
      const vel = Math.sqrt(dx*dx + dy*dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      // Squeeze: Scale X stretches with speed, Scale Y shrinks
      const scaleX = 1 + Math.min(vel * 0.005, 0.5);
      const scaleY = 1 - Math.min(vel * 0.005, 0.2);

      if (followerRef.current) {
        followerRef.current.style.transform = \`
            translate3d(\${follower.current.x}px, \${follower.current.y}px, 0) 
            rotate(\${angle}deg) 
            scale(\${scaleX}, \${scaleY})
        \`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
      {/* Dot (Instant) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 -ml-1 -mt-1 mix-blend-exclusion"
      />
      
      {/* Ring (Jelly Physics) */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-40 -ml-5 -mt-5 mix-blend-exclusion will-change-transform"
      />

      <div className="h-full w-full flex items-center justify-center bg-black">
        <div className="text-center space-y-4 cursor-none">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference">
                ELASTIC
            </h1>
            <p className="text-white/50">Move cursor fast to stretch</p>
        </div>
      </div>
    </DemoContainer>
  );
}`,
};