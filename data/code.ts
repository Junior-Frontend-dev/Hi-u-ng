export const CODE_MAP: Record<string, string> = {
  'parallax-basic': 
`import React from 'react';
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
        <div 
          className="fixed inset-0 pointer-events-none opacity-40"
          style={{ 
            backgroundImage: 'radial-gradient(1px 1px at 10% 10%, #fff, transparent), radial-gradient(1px 1px at 20% 50%, #fff, transparent), radial-gradient(1px 1px at 80% 80%, #fff, transparent), radial-gradient(2px 2px at 40% 90%, #fff, transparent)',
            backgroundSize: '250px 250px',
            transform: 'translateY(calc(var(--scroll-y, 0px) * 0.1))',
          }}
        />

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

        {/* === MAIN CONTENT === */}
        <div className="relative z-10"> 
          
          {/* HERO */}
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
              <p className="max-w-md mx-auto text-white/40 text-sm tracking-widest uppercase mb-12">
                 Scroll to explore 3D dimensions
              </p>
            </div>
            <ArrowDown className="absolute bottom-12 animate-bounce text-white/20" size={32} />
          </section>

          {/* LONG CONTENT */}
          <section className="max-w-4xl mx-auto px-8 py-32 space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">The Art of <span className="text-cyan-400 italic">Scroll</span></h2>
            <p className="text-xl text-white/70 leading-relaxed">Scrolling is the most fundamental interaction on the web. By visualizing progress, we give users a sense of place and control. This demo combines a top-bar reading indicator with a floating progress widget. The feeling of depth is achieved by layering multiple elements that move at different speeds relative to the scroll position.</p>
            <p className="text-xl text-white/70 leading-relaxed">In a world of instant gratification, the act of scrolling represents a deliberate commitment to content. It's a vertical journey where the designer and developer collaborate to maintain engagement through micro-interactions and visual rewards.</p>
            <div className="h-screen bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
               <span className="text-white/20 font-mono tracking-widest">LONG SECTION FOR PROGRESS TESTING</span>
            </div>
            <p className="text-xl text-white/70 leading-relaxed">You've reached the end of the journey. The progress indicators should now show 100% completion.</p>
          </section>
        </div>
      </div>
    </DemoContainer>
  );
`,
  'scroll-progress': 
`import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { BookOpen, CheckCircle2, Clock, Menu, ChevronDown, Sparkles } from 'lucide-react';

export default function ScrollProgress() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  const contentSections = [
    {
      id: 
`
}