import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Rocket, Sparkles, Layers, Globe, Star, ArrowDown, Zap, Compass } from 'lucide-react';

export default function ParallaxMulti() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.2 });
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

      {/* === TOP PROGRESS BAR === */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-[100] backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 origin-left will-change-transform shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          style={{ transform: 'scaleX(var(--scroll-percent, 0))' }}
        />
      </div>

      {/* === FLOATING PERCENTAGE === */}
      <div className="absolute bottom-8 right-8 z-[100] pointer-events-none group">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl flex flex-col items-center min-w-[80px]">
           <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-1">Depth</span>
           <div className="text-3xl font-black text-white tabular-nums">
              <span style={{ counterReset: 'perc calc(var(--scroll-percent, 0) * 100)' }} className="before:content-[counter(perc)]" />
              <span className="text-lg ml-0.5 opacity-30">%</span>
           </div>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="h-full overflow-y-auto relative perspective-1000 hide-scrollbar bg-[#020205] text-white selection:bg-indigo-500/30"
        onMouseMove={handleMouseMove}
      >
        
        {/* ==========================================================
            PARALLAX BACKGROUND LAYERS (FIXED/STICKY POSITIONING)
            ========================================================== */}
        
        {/* Layer 1: Deep Space (Slowest) */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{ 
            backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0))',
            backgroundSize: '300px 300px',
            transform: `translate3d(${mousePos.x * 20}px, calc(var(--scroll-y, 0px) * 0.1 + ${mousePos.y * 20}px), -100px) scale(1.5)`,
            opacity: 0.4
          }}
        />

        {/* Layer 2: Nebula Fog */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-20 z-0 blur-[100px]"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.2), transparent 70%)',
            transform: `translate3d(${mousePos.x * 40}px, calc(var(--scroll-y, 0px) * 0.2 + ${mousePos.y * 40}px), 0)`,
          }}
        />

        {/* Layer 3: Distant Planet */}
        <div 
          className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full blur-sm opacity-60 pointer-events-none z-0"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, #4f46e5, #1e1b4b)',
            transform: `translate3d(${mousePos.x * -30}px, calc(var(--scroll-y, 0px) * 0.3 + ${mousePos.y * -30}px), -20px)`,
            boxShadow: '0 0 100px rgba(79, 70, 229, 0.4)'
          }}
        />

        {/* ==========================================================
            CONTENT SCROLL LAYERS
            ========================================================== */}
        
        <div className="relative z-10">
          
          {/* SECTION 1: HERO */}
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
             <div 
              className="will-change-transform"
              style={{ 
                transform: `translate3d(${mousePos.x * -10}px, calc(var(--scroll-y, 0px) * -0.2 + ${mousePos.y * -10}px), 0)`,
                opacity: 'calc(1 - var(--scroll-percent, 0) * 4)'
              }}
             >
                <div className="flex items-center justify-center gap-3 text-indigo-400 mb-6">
                   <Star size={16} className="animate-pulse" />
                   <span className="text-xs font-mono tracking-[0.5em] uppercase">Multi-Layer Experience</span>
                   <Star size={16} className="animate-pulse" />
                </div>
                <h1 className="text-7xl md:text-[11rem] font-black leading-none tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                   SPACE<br />DEPTH
                </h1>
                <p className="max-w-md mx-auto text-white/50 text-sm tracking-widest uppercase leading-relaxed">
                   Explore the intersection of mathematics, <br />motion, and digital aesthetics.
                </p>
             </div>
             
             <div 
              className="absolute bottom-12 flex flex-col items-center gap-2 text-white/20"
              style={{ opacity: 'calc(1 - var(--scroll-percent, 0) * 5)' }}
             >
                <span className="text-[10px] uppercase tracking-widest">Initiate Launch</span>
                <ArrowDown size={20} className="animate-bounce" />
             </div>
          </section>

          {/* SECTION 2: LONG ARTICLE */}
          <div className="max-w-4xl mx-auto px-8 py-32 space-y-32">
            
            {/* Chapter 1 */}
            <section className="relative group">
               <div className="absolute -left-12 top-0 text-6xl font-black text-white/5 pointer-events-none">01</div>
               <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1">
                     <div className="flex items-center gap-2 text-indigo-400 mb-4 font-mono text-xs uppercase tracking-widest">
                        <Layers size={14} />
                        <span>The Z-Axis Illusion</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Relative Motion</h2>
                     <p className="text-lg text-white/60 leading-relaxed mb-6">
                        Parallax scrolling is a technique in computer graphics where background images move past the camera more slowly than foreground images, creating an illusion of depth in a 2D scene and adding to the sense of immersion in the virtual experience.
                     </p>
                     <p className="text-white/40 leading-relaxed">
                        In this demonstration, we use seven distinct layers of data. Each layer is assigned a specific "scroll coefficient" that determines its velocity relative to the user's input.
                     </p>
                  </div>
                  <div className="w-full md:w-80 aspect-square rounded-3xl bg-indigo-500/10 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                     <Globe size={120} className="text-indigo-400/20 group-hover:scale-110 transition-transform duration-700" strokeWidth={0.5} />
                     <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
                  </div>
               </div>
            </section>

            {/* Chapter 2: Mid-scroll visual */}
            <section className="py-20 border-y border-white/5">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'LAYERS', val: '07', icon: <Layers size={16} /> },
                    { label: 'FPS', val: '60+', icon: <Zap size={16} /> },
                    { label: 'DEPTH', val: '3D', icon: <Compass size={16} /> },
                    { label: 'ENGINE', val: 'RAF', icon: <Rocket size={16} /> }
                  ].map((stat, i) => (
                    <div key={i} className="text-center group">
                       <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/30 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                          {stat.icon}
                       </div>
                       <div className="text-2xl font-black mb-1 tabular-nums tracking-tighter">{stat.val}</div>
                       <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Chapter 3 */}
            <section className="relative">
               <div className="absolute -right-12 top-0 text-6xl font-black text-white/5 pointer-events-none">02</div>
               <div className="max-w-2xl mx-auto text-center space-y-8">
                  <h2 className="text-4xl font-bold tracking-tight">Mathematical Immersion</h2>
                  <p className="text-xl text-white/70 font-light leading-relaxed">
                     "The soul of motion design lies in the curves between the keyframes."
                  </p>
                  <p className="text-white/40 leading-relaxed">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
               </div>
            </section>

            {/* Big Visual Break */}
            <div className="relative h-[60vh] rounded-3xl overflow-hidden border border-white/5 group">
               <img 
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000"
                alt="Outer space"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8 text-left">
                  <div className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.3em]">ORBITAL VIEW / STATION 09</div>
                  <h3 className="text-3xl font-black tracking-tighter">THE INFINITE REACH</h3>
               </div>
            </div>

            {/* Chapter 4 */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 text-white/20 mb-8">
                  <Sparkles size={18} />
                  <div className="h-px flex-1 bg-white/10" />
               </div>
               <p className="text-white/60 leading-relaxed text-lg">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
               </p>
               <p className="text-white/60 leading-relaxed text-lg">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
               </p>
            </section>

          </div>

          {/* SECTION 3: FOOTER */}
          <footer className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
             {/* Bottom Flare */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-indigo-600/20 blur-[120px] rounded-full" />
             
             <div className="relative z-10 text-center space-y-8">
                <div className="w-20 h-20 rounded-full border border-indigo-500/30 flex items-center justify-center mx-auto animate-[spin_10s_linear_infinite]">
                   <Rocket className="text-indigo-400" size={32} />
                </div>
                <div>
                   <h2 className="text-6xl font-black tracking-tighter mb-2">END OF VOYAGE</h2>
                   <p className="text-white/30 font-mono text-xs tracking-[0.4em] uppercase">100% Signal Strength Received</p>
                </div>
                <button 
                  onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-10 py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105"
                >
                   Restart Mission
                </button>
             </div>
          </footer>

        </div>
      </div>
    </DemoContainer>
  );
}