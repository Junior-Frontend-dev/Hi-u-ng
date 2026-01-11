import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Palette, Zap, Sparkles } from 'lucide-react';

export default function ScrollScale() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  const features = [
    { icon: <Palette size={20} />, title: 'Creative', desc: 'Stunning visuals' },
    { icon: <Zap size={20} />, title: 'Fast', desc: 'Optimized code' },
    { icon: <Sparkles size={20} />, title: 'Magic', desc: 'Smooth animations' },
  ];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        
        {/* Progress Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
            ))}
        </div>

        <div className="sticky top-0 h-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* The transforming element */}
          <div 
            className="relative flex items-center justify-center overflow-hidden will-change-transform"
            style={{ 
              width: '100%',
              height: '100%',
              // Scale down based on scroll
              transform: `scale(calc(1 - var(--scroll-percent, 0) * 0.55))`,
              borderRadius: `calc(var(--scroll-percent, 0) * 40px)`,
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Portal"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div 
              className="relative z-10 text-center px-8"
              style={{ 
                opacity: 'calc(1 - var(--scroll-percent, 0) * 2)', 
                transform: 'scale(calc(1 - var(--scroll-percent, 0) * 0.3))',
              }}
            >
              <h1 className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tight">PORTAL</h1>
              <p className="text-white/60 uppercase tracking-[0.5em] text-sm">Enter the void</p>
            </div>
          </div>

          {/* Content that appears */}
          <div 
            className="absolute inset-x-0 bottom-0 text-center transition-all duration-700 px-8 pb-8"
            style={{ 
              opacity: 'calc((var(--scroll-percent, 0) - 0.6) * 2.5)',
              transform: `translateY(calc(max(0px, 40px - (var(--scroll-percent, 0) - 0.6) * 200px)))`,
            }}
          >
            <div className="flex justify-center gap-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-32">
                  <div className="text-white mb-2 flex justify-center">{feature.icon}</div>
                  <h4 className="text-white text-xs font-semibold mb-1">{feature.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[250vh]" />
      </div>
    </DemoContainer>
  );
}