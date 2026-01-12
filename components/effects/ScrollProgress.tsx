import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { BookOpen, CheckCircle2, Clock, Share2, Bookmark, Menu, ChevronDown, Sparkles } from 'lucide-react';

export default function ScrollProgress() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  const contentSections = [
    {
      id: "01",
      title: "The Infinite Scroll",
      text: "We are now scrolling through a deep purple dimension. The background color has been shifted to verify that the Hot Module Replacement is working correctly. If you see this purple hue, the update was successful.",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "02",
      title: "Visual Feedback",
      text: "Notice the floating circular indicator on the right. It tracks your journey precisely. As you read this text, the circle fills up, providing a subtle dopamine hit that encourages you to keep going.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "03",
      title: "Fluid Dynamics",
      text: "The scroll animation is decoupled from the main thread where possible, using CSS variables for high-performance rendering. This ensures that even on high-refresh-rate displays, the experience remains buttery smooth.",
      img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "04",
      title: "Cognitive Load",
      text: "By showing how much content remains, we reduce the user's cognitive load. They don't have to guess when the article will end. This predictability builds trust and increases the likelihood of completion.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "05",
      title: "The Final Pixel",
      text: "You have reached the end of the demonstration. The progress bar should now be at 100%, and the circular indicator fully closed. Thank you for testing the scroll progress effect.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div 
        ref={scrollRef} 
        className="h-full overflow-y-auto hide-scrollbar bg-[#0f0720] relative text-white/90 selection:bg-pink-500/30"
      >
        {/* === TOP PROGRESS BAR === */}
        <div className="sticky top-0 left-0 w-full h-2 z-[60]">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
            <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left will-change-transform shadow-[0_0_20px_rgba(236,72,153,0.6)]"
                style={{ 
                    width: '100%',
                    transform: 'scaleX(var(--scroll-percent, 0))' 
                }}
            />
        </div>

        {/* === HEADER BAR === */}
        <nav className="sticky top-2 left-0 w-[95%] mx-auto px-6 py-4 flex justify-between items-center z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mt-4 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest text-white uppercase">Scroll Master</span>
            </div>
            <div className="flex gap-4">
                <Bookmark size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                <Share2 size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
            </div>
        </nav>

        {/* === FLOATING CIRCULAR INDICATOR === */}
        <div className="sticky top-[80vh] float-right right-8 mr-8 z-40 pointer-events-none group">
             <div className="relative w-24 h-24 flex items-center justify-center bg-[#1a103c]/80 backdrop-blur-2xl rounded-full border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] group-hover:scale-105 transition-transform duration-500">
                 <svg className="w-full h-full -rotate-90 transform p-2" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                     <circle 
                        cx="50" cy="50" r="42" 
                        fill="none" 
                        stroke="url(#progressGradient)" 
                        strokeWidth="6" 
                        strokeDasharray="264"
                        strokeDashoffset="264"
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-linear"
                        style={{
                            strokeDashoffset: `calc(264 - (264 * var(--scroll-percent, 0)))`
                        }}
                     />
                     <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                     </defs>
                 </svg>
                 <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
                        <span style={{ counterReset: 'perc calc(var(--scroll-percent, 0) * 100)' }} className="before:content-[counter(perc)]" />
                    </span>
                    <span className="text-[9px] font-bold text-purple-400 tracking-widest uppercase mt-0.5">Complete</span>
                 </div>
             </div>
        </div>

        {/* === HERO SECTION === */}
        <section className="min-h-[85vh] flex flex-col justify-center px-8 md:px-32 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-5xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-pink-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                    <Clock size={12} />
                    <span>Updated Version</span>
                </div>
                <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.9] tracking-tighter mb-10">
                    SCROLL<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">MASTER</span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-200/60 max-w-2xl font-light leading-relaxed mb-12">
                    A deep dive into scroll-linked animations. Observe the progress bar at the top and the circular indicator on the right as you traverse this page.
                </p>
                <div 
                  onClick={() => {
                    const nextSection = document.getElementById('section-01');
                    nextSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-4 text-white/40 group cursor-pointer w-fit"
                >
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center animate-bounce group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                        <ChevronDown size={28} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">Begin Scroll</span>
                </div>
            </div>
        </section>

        {/* === ARTICLE BODY === */}
        <div className="max-w-4xl mx-auto px-6 md:px-0 pb-32">
          
          {contentSections.map((section, idx) => (
            <section id={`section-${section.id}`} key={section.id} className="mb-48 group scroll-mt-32">
              <div className="flex items-baseline gap-6 mb-12 border-b border-white/5 pb-8">
                  <span className="text-6xl font-black text-white/5 group-hover:text-purple-500/20 transition-colors duration-500">{section.id}</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{section.title}</h2>
              </div>
              
              <div className="mb-12 relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/5 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-700">
                  <img 
                    src={section.img} 
                    alt={section.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0720] via-transparent to-transparent" />
                  <div className="absolute bottom-6 right-8 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Live Render</span>
                  </div>
              </div>

              <div className="flex gap-8">
                 <div className="hidden md:flex flex-col items-center gap-2 pt-2">
                    <div className="w-3 h-3 rounded-full border-2 border-purple-500 bg-[#0f0720]" />
                    <div className="w-px h-full bg-gradient-to-b from-purple-500/50 to-transparent" />
                 </div>
                 <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-purple-100/80">
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:float-left first-letter:mr-4 first-letter:mt-[-6px]">
                        {section.text}
                    </p>
                    <p>
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                 </div>
              </div>
            </section>
          ))}

          {/* === FOOTER SECTION === */}
          <footer className="py-32 border-t border-white/5 text-center relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/5 to-transparent">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm"></div>
             
             <div className="inline-block p-6 rounded-full bg-purple-500/10 text-purple-400 mb-8 animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <CheckCircle2 size={64} strokeWidth={1.5} />
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Journey<br/>Complete</h2>
             <p className="text-white/40 font-mono text-sm tracking-widest uppercase mb-12">Scroll Progress: 100%</p>
             
             <div className="flex justify-center gap-4 relative z-10">
                <button 
                  onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-10 py-4 bg-white text-[#0f0720] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-purple-400 hover:text-white transition-all hover:scale-105 shadow-xl"
                >
                    Return to Top
                </button>
             </div>
          </footer>
          
        </div>
      </div>
    </DemoContainer>
  );
}