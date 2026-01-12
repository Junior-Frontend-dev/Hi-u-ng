import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowDown, Clock } from 'lucide-react';

interface ImplScrollProps {
  variant: string;
}

export default function ImplScroll({ variant }: ImplScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted || !container) return;
      
      const totalScroll = container.scrollTop;
      const windowHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      
      if (scrollHeight === windowHeight || scrollHeight === 0) {
          setProgress(0);
      } else {
          const currentProgress = (totalScroll / (scrollHeight - windowHeight)) * 100;
          setProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      const sections = container.querySelectorAll('section');
      if (sections.length === 0) return;
      
      sections.forEach((sec, index) => {
          const rect = sec.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          if (rect.top >= containerRect.top - windowHeight/2 && rect.top < containerRect.top + windowHeight/2) {
              setActiveSection(index);
          }
      });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      isMounted = false;
      container.removeEventListener('scroll', handleScroll);
    };
  }, [variant]);

  // --- 1. PROGRESS INDICATOR ---
  const renderProgress = () => (
    <div className="relative w-full h-full bg-neutral-950 text-neutral-400">
        {/* Type A: Top Bar (Rainbow Gradient) */}
        <div className="sticky top-0 left-0 w-full h-1.5 z-50 bg-neutral-800">
            <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>

        {/* Type B: Circular Floating Indicator */}
        <div className="absolute bottom-8 right-8 z-50">
            <div className="relative w-16 h-16 flex items-center justify-center bg-black/80 backdrop-blur rounded-full border border-white/10 shadow-2xl">
                <svg className="w-12 h-12 -rotate-90">
                    <circle 
                        cx="24" cy="24" r="20" 
                        className="stroke-neutral-800" 
                        strokeWidth="4" fill="none" 
                    />
                    <circle 
                        cx="24" cy="24" r="20" 
                        className="stroke-white transition-all duration-100" 
                        strokeWidth="4" fill="none"
                        strokeDasharray="125.6"
                        strokeDashoffset={125.6 - (125.6 * progress) / 100}
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-white">{Math.round(progress)}%</span>
            </div>
        </div>

        {/* Type C: Vertical Sidebar Tracker */}
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
            {[0, 1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-2">
                    <div 
                        className={`w-1 transition-all duration-300 rounded-full ${
                            activeSection === i ? 'h-8 bg-blue-500' : 'h-2 bg-neutral-700'
                        }`} 
                    />
                </div>
            ))}
        </div>

        {/* Dummy Content */}
        <div className="max-w-2xl mx-auto p-8 space-y-20 py-20">
            {[0, 1, 2, 3].map((i) => (
                <section key={i} className="min-h-[80vh] flex flex-col justify-center">
                    <span className="text-blue-500 font-mono text-xs mb-4">SECTION 0{i + 1}</span>
                    <h2 className="text-4xl font-bold text-white mb-6">The Art of Scroll</h2>
                    <p className="text-lg leading-relaxed">
                        Scrolling is the most fundamental interaction on the web. By visualizing progress, we give users a sense of place and control. 
                        This demo combines a top-bar reading indicator with a circular floating progress widget.
                    </p>
                    <div className="mt-8 p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                        <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                            <Clock size={16} />
                            <span>Reading time: 2 min</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-800 rounded mb-2" />
                        <div className="h-2 w-3/4 bg-neutral-800 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-neutral-800 rounded" />
                    </div>
                </section>
            ))}
            
            <div className="h-96 flex items-center justify-center text-neutral-600">
                End of content
            </div>
        </div>
    </div>
  );

  // --- 2. GENERIC SCROLL FALLBACK (Fixes Black Screen) ---
  const renderGeneric = () => (
      <div className="relative w-full h-full bg-[#050505] overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
          <div className="sticky top-0 z-50 p-4 bg-black/50 backdrop-blur border-b border-white/5 flex justify-between items-center">
              <span className="text-xs font-mono text-white/50 uppercase">{variant}</span>
              <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
          </div>
          
          <div className="p-8 space-y-32">
              <div className="h-[50vh] flex flex-col justify-center items-center text-center">
                  <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-6">
                      {variant.replace('scroll-', '').replace(/-/g, ' ').toUpperCase()}
                  </h1>
                  <p className="text-gray-400 max-w-md">
                      This is a generic scroll container placeholder. The specific effect logic for <span className="text-white">"{variant}"</span> is visualized here using standard scroll mechanics.
                  </p>
                  <ArrowDown className="mt-12 animate-bounce text-white/30" />
              </div>

              {[1, 2, 3].map(i => (
                  <div key={i} className={`
                      transition-all duration-700 transform 
                      ${progress > i * 20 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}>
                      <div className="w-full h-64 rounded-3xl bg-neutral-900 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <span className="text-9xl font-bold text-white/5">{i}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  // --- 3. SCROLL SNAP ---
  const renderSnap = () => (
      <div className="w-full h-full overflow-y-auto snap-y snap-mandatory bg-black">
          {[1, 2, 3, 4].map(i => (
              <section key={i} className="h-full w-full snap-start flex items-center justify-center border-b border-white/10 relative overflow-hidden group">
                  <span className="absolute top-4 left-4 font-mono text-xs text-white/30">SECTION {i}</span>
                  <div className="text-center">
                      <h2 className="text-6xl font-black text-white mb-4 transition-transform duration-500 group-hover:scale-110">SNAP</h2>
                      <p className="text-white/50">Scroll to feel the magnetic lock.</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </section>
          ))}
      </div>
  );

  // --- 4. MIX BLEND MODE (Ultra Beautiful) ---
  const renderBlend = () => (
    <div className="relative w-full h-full bg-black overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Sticky Text Container */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference">
        <h1 className="text-[12vw] font-black text-white leading-none tracking-tighter text-center">
          IMPACT<br/>DESIGN
        </h1>
      </div>

      {/* Section 1: Black (Text is White) */}
      <section className="h-[100vh] w-full bg-black flex items-center justify-center relative">
        <div className="absolute bottom-10 text-white/30 font-mono text-sm">SCROLL TO BLEND</div>
      </section>

      {/* Section 2: White (Text becomes Black) */}
      <section className="h-[100vh] w-full bg-white flex items-center justify-center relative">
        <div className="absolute top-10 text-black/30 font-mono text-sm uppercase tracking-widest">Inverted Reality</div>
      </section>

      {/* Section 3: Vibrant Gradient (Text becomes colored) */}
      <section className="h-[100vh] w-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center relative">
         <div className="w-[80%] h-[80%] border-[20px] border-white/20 rounded-[3rem]"></div>
      </section>

      {/* Section 4: Image (Text interacts with detail) */}
      <section className="h-[100vh] w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=1920&q=80" 
          className="w-full h-full object-cover grayscale contrast-150 brightness-50"
          alt="Blend background"
        />
      </section>

      {/* Section 5: Complex Patterns */}
      <section className="h-[100vh] w-full bg-[#000] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 opacity-50" 
              style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>
         <div className="w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse"></div>
      </section>
    </div>
  );

  const active = activeSection; 

  const renderContent = () => {
      switch(variant) {
          case 'progress-indicator': return renderProgress();
          case 'scroll-snap': return renderSnap();
          case 'scroll-blend': return renderBlend();
          default: return renderGeneric();
      }
  };

  return (
    <DemoContainer>
      <div ref={containerRef} className="w-full h-full relative overflow-hidden">
        {renderContent()}
      </div>
    </DemoContainer>
  );
}