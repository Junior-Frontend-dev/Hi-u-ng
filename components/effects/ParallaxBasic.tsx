import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Mountain, Compass, Wind, Map, ArrowDown, BookOpen, Layers, MousePointer2 } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ParallaxBasic() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* === PROGRESS BAR (Horizontal Top) === */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 origin-left will-change-transform shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          style={{ transform: 'scaleX(var(--scroll-percent, 0))' }}
        />
      </div>

      {/* === FLOATING PROGRESS COUNTER === */}
      <div className="absolute bottom-8 right-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl transition-all">
          <div className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] mb-1 uppercase">Reading Progress</div>
          <div className="flex items-baseline gap-1">
             <span className="text-4xl font-black text-white tabular-nums">
               {/* Use CSS variable to drive the number */}
               <span style={{ 
                 counterReset: 'perc calc(var(--scroll-percent, 0) * 100)',
               }} className="before:content-[counter(perc)]"></span>
             </span>
             <span className="text-xl font-bold text-white/30">%</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="h-full overflow-y-auto relative scroll-smooth hide-scrollbar perspective-1000 bg-[#020205] text-white/90">
        
        {/* === BACKGROUND LAYERS === */}
        {/* Layer 1: Deep Space */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-40"
          style={{ 
            backgroundImage: 'radial-gradient(1px 1px at 10% 10%, #fff, transparent), radial-gradient(1px 1px at 20% 50%, #fff, transparent), radial-gradient(1px 1px at 80% 80%, #fff, transparent), radial-gradient(2px 2px at 40% 90%, #fff, transparent)',
            backgroundSize: '250px 250px',
            transform: 'translateY(calc(var(--scroll-y, 0px) * 0.1))',
          }}
        />

        {/* Layer 2: Main Mountain (Parallax) */}
        <div 
          className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none will-change-transform"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translate3d(0, calc(var(--scroll-y, 0px) * 0.4), -50px) scale(1.2)',
            filter: 'brightness(0.5)'
          }}
        />

        {/* Layer 3: Foreground Fog */}
        <div 
          className="absolute top-[80vh] left-0 w-full h-screen pointer-events-none z-20 mix-blend-screen opacity-40"
          style={{ 
            background: 'linear-gradient(to bottom, transparent, #1a1a2e, transparent)',
            transform: 'translateY(calc(var(--scroll-y, 0px) * -0.2))',
            filter: 'blur(60px)'
          }}
        />

        {/* === MAIN CONTENT === */}
        <div className="relative z-10">
          
          {/* SECTION 1: HERO */}
          <section className="min-h-[100vh] flex flex-col justify-center items-center text-center px-6">
            <div 
              className="will-change-transform"
              style={{ 
                transform: 'translateY(calc(var(--scroll-y, 0px) * -0.15))',
                opacity: 'calc(1 - var(--scroll-percent, 0) * 4)'
              }}
            >
              <h2 className="text-cyan-400 font-mono tracking-[0.5em] text-xs uppercase mb-8 animate-pulse">
                Expedition / Level 01
              </h2>
              <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
                DEPTH<br />SCROLL
              </h1>
              <div className="flex items-center justify-center gap-8 text-white/40">
                <div className="flex flex-col items-center">
                  <MousePointer2 size={20} className="mb-2" />
                  <span className="text-[10px] uppercase tracking-widest">Scroll to Begin</span>
                </div>
              </div>
            </div>
            
            <ArrowDown className="absolute bottom-12 animate-bounce text-white/20" size={32} />
          </section>

          {/* SECTION 2: THE ART OF SCROLL (THE CORE CONTENT) */}
          <section className="max-w-4xl mx-auto px-8 py-32">
            
            <div className="flex items-center gap-4 mb-12 text-cyan-400">
               <BookOpen size={24} />
               <div className="h-px flex-1 bg-cyan-400/20"></div>
               <span className="font-mono text-sm tracking-widest">CHAPTER 01</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">
              The Art of <span className="text-cyan-400 italic">Scroll</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-8 space-y-8 text-lg md:text-xl font-light leading-relaxed text-white/70">
                <p className="text-white text-2xl font-normal leading-snug">
                  Scrolling is the most fundamental interaction on the web. By visualizing progress, we give users a sense of place and control.
                </p>
                
                <p>
                  This demo combines a top-bar reading indicator with a floating progress widget. The feeling of depth is achieved by layering multiple elements that move at different speeds relative to the scroll position.
                </p>

                <div className="py-12">
                   <div 
                    className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group"
                    style={{ transform: 'rotate(-1deg)' }}
                   >
                     <img 
                      src="https://images.unsplash.com/photo-1492683962492-deef0ec456c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt="Texture" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                     <div className="absolute bottom-6 left-6">
                        <span className="text-[10px] font-mono text-cyan-400">VISUAL 01</span>
                        <h4 className="text-xl font-bold">Monochromatic Silence</h4>
                     </div>
                   </div>
                </div>

                <p>
                  In a world of instant gratification, the act of scrolling represents a deliberate commitment to content. It's a vertical journey where the designer and developer collaborate to maintain engagement through micro-interactions and visual rewards.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam ex nisl, placerat at arcu ut, interdum semper quam. In hac habitasse platea dictumst. Curabitur a fringilla lorem, ac imperdiet arcu.
                </p>

                <div className="h-64 flex items-center justify-center border-y border-white/5 my-12">
                   <div className="text-center">
                      <div className="text-6xl font-black text-white/5 mb-2 tracking-[1em] translate-x-[0.5em]">PERSPECTIVE</div>
                      <div className="text-xs font-mono text-white/30 tracking-widest">3D ENGINE ACTIVE</div>
                   </div>
                </div>

                <p>
                  The "parallax" effect specifically refers to the displacement or difference in the apparent position of an object viewed along two different lines of sight. When you scroll, the background (the stars and distant mountains) move slower than the text you are reading right now.
                </p>

                <p>
                   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                   <Layers className="text-cyan-400 mb-4" size={32} />
                   <h3 className="text-xl font-bold mb-2 text-white">Multi-Layer Strategy</h3>
                   <p className="text-sm">
                     We are currently rendering 5 distinct layers of parallax. Each layer uses a different calculation to map `var(--scroll-y)` to its transformation matrix. This creates a genuine sense of 3D volume on a flat screen.
                   </p>
                </div>

                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>

                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                </p>

                <div className="h-screen flex items-center justify-center">
                   <div className="text-center group cursor-help">
                      <div className="w-24 h-24 rounded-full border border-cyan-400/30 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                        <Compass className="text-cyan-400 animate-[spin_4s_linear_infinite]" size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Almost There</h3>
                      <p className="text-white/40 text-sm italic">You've scrolled quite a distance. Check the progress bar above.</p>
                   </div>
                </div>

                <p>
                  Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                </p>

                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                </p>
              </div>

              <div className="md:col-span-4 hidden md:block">
                <div className="sticky top-24 space-y-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-mono text-cyan-400 mb-4 tracking-widest uppercase">Reading Time</div>
                    <div className="text-3xl font-bold text-white mb-1">2 MIN</div>
                    <div className="text-xs text-white/40">Based on average scroll speed</div>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-mono text-cyan-400 mb-4 tracking-widest uppercase">Tech Stack</div>
                    <ul className="space-y-3 text-sm text-white/60">
                      <li className="flex justify-between"><span>CSS Vars</span><span className="text-white">Active</span></li>
                      <li className="flex justify-between"><span>Trans3D</span><span className="text-white">Smooth</span></li>
                      <li className="flex justify-between"><span>RAF</span><span className="text-white">60FPS</span></li>
                    </ul>
                  </div>

                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-center p-8">
                    <Mountain size={48} className="text-white/20 mb-4" />
                    <p className="text-[10px] uppercase tracking-[0.3em] leading-loose text-white/40">
                      Elevation<br />Discovery<br />Progress
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* SECTION 3: FOOTER */}
          <footer className="h-[80vh] flex flex-col items-center justify-center bg-gradient-to-t from-cyan-900/20 to-transparent">
             <div 
              className="w-px h-32 bg-gradient-to-b from-cyan-400/0 via-cyan-400 to-cyan-400/0 mb-12"
              style={{ transform: 'scaleY(calc(var(--scroll-percent, 0) * 2))' }}
             ></div>
             <Map className="w-16 h-16 text-cyan-400 mb-6 opacity-50" strokeWidth={1} />
             <h2 className="text-5xl font-black tracking-tighter text-white mb-4 uppercase">Expedition Complete</h2>
             <p className="text-white/40 font-mono text-sm tracking-widest uppercase">100% of the journey explored</p>
             
             <button 
              onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-12 px-8 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:bg-cyan-400 hover:text-black transition-colors"
             >
                Return to Surface
             </button>
          </footer>

        </div>
      </div>
    </DemoContainer>
  );
}