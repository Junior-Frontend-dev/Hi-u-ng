import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight, Star, Heart, Share2, MoreHorizontal, Maximize2, Zap } from 'lucide-react';

interface ImplCardProps {
  variant: string;
}

export default function ImplCard({ variant }: ImplCardProps) {
  
  // --- 1. CARD FLIP: Real 3D Credit Card ---
  const CardFlip = () => {
    return (
      <div className="group w-80 h-52 [perspective:1000px]">
        <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl p-6 bg-gradient-to-br from-violet-600 to-indigo-900 text-white [backface-visibility:hidden] shadow-2xl border border-white/10">
            <div className="flex justify-between items-start">
                <div className="w-12 h-8 rounded bg-yellow-500/20 border border-yellow-500/50 backdrop-blur-sm" />
                <div className="font-mono text-xl tracking-widest">VISA</div>
            </div>
            <div className="mt-8 font-mono text-xl tracking-[0.2em] drop-shadow-md">
                4242 8888 9999 0000
            </div>
            <div className="mt-8 flex justify-between items-end">
                <div className="text-xs opacity-70">CARD HOLDER<br/><span className="text-sm font-bold opacity-100">AN VIETNAM</span></div>
                <div className="text-xs opacity-70">EXPIRES<br/><span className="text-sm font-bold opacity-100">12/28</span></div>
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-2xl bg-slate-900 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl border border-white/10 overflow-hidden">
            <div className="mt-6 h-10 bg-black/80 w-full" />
            <div className="mt-6 px-6">
                <div className="h-8 bg-white/20 rounded flex items-center justify-end px-2 font-mono text-black text-sm font-bold">
                    123
                </div>
                <p className="mt-4 text-[10px] text-gray-400 text-justify">
                    This card is property of An VietNam Library. Misuse is subject to severe design penalties.
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 2. CARD HOVER LIFT: Apple TV Style Shadow ---
  const CardHoverLift = () => (
    <div className="group relative w-72 h-96 rounded-3xl bg-[#111] border border-white/10 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="h-1/2 rounded-t-3xl bg-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="p-6">
            <div className="w-12 h-1 bg-blue-500 rounded-full mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Elevate</h3>
            <p className="text-gray-400 text-sm">Smooth lifting animation with diffused shadow blooming underneath.</p>
        </div>
    </div>
  );

  // --- 3. CARD STACK: Fan Effect ---
  const CardStack = () => (
    <div className="group relative w-64 h-80 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
            <div 
                key={i}
                className="absolute w-full h-full rounded-2xl border border-white/10 shadow-xl transition-all duration-500 ease-out bg-[#151515] p-6 flex flex-col justify-between"
                style={{ 
                    zIndex: 3 - i,
                    transform: `translateY(${i * 8}px) scale(${1 - i * 0.05})`,
                }}
            >
                <div className={`transition-all duration-500 ${i === 0 ? 'group-hover:-translate-y-4 group-hover:-rotate-6' : i === 1 ? 'group-hover:translate-x-12' : 'group-hover:translate-y-4 group-hover:rotate-6'}`}>
                    <div className="w-8 h-8 rounded-full bg-white/10 mb-4" />
                    <h4 className="text-white font-bold">Stack {i}</h4>
                </div>
            </div>
        ))}
        {/* Helper logic: In a real component, this would use CSS hover on parent to target children nth-child */}
        <style>{`
            .group:hover div:nth-child(1) { transform: translate(-40px, -10px) rotate(-10deg); }
            .group:hover div:nth-child(2) { transform: translate(0, -20px) scale(1.05) z-index: 10; }
            .group:hover div:nth-child(3) { transform: translate(40px, -10px) rotate(10deg); }
        `}</style>
    </div>
  );

  // --- 4. CARD SPREAD: Gallery Expand ---
  const CardSpread = () => (
    <div className="flex -space-x-12 hover:-space-x-4 transition-all duration-500 ease-out h-64 items-center">
        {['#ef4444', '#f59e0b', '#10b981', '#3b82f6'].map((color, i) => (
            <div 
                key={i}
                className="relative w-40 h-56 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-4 hover:scale-110 hover:z-50 border border-white/10 overflow-hidden"
                style={{ backgroundColor: '#111', zIndex: i }}
            >
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: color }} />
                <div className="absolute bottom-4 left-4 font-bold text-white text-xl opacity-50">{0 + i + 1}</div>
            </div>
        ))}
    </div>
  );

  // --- 5. CARD CAROUSEL: 3D Spinner ---
  const CardCarousel = () => (
    <div className="relative w-full h-64 [perspective:1000px] flex justify-center items-center overflow-hidden">
        <div className="relative w-48 h-64 [transform-style:preserve-3d] animate-[spin_10s_linear_infinite]">
            {[0, 1, 2, 3, 4].map((i) => {
                const angle = i * (360 / 5);
                return (
                    <div 
                        key={i}
                        className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-black border border-white/10 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-white/20"
                        style={{ transform: `rotateY(${angle}deg) translateZ(150px)` }}
                    >
                        {i + 1}
                    </div>
                );
            })}
        </div>
        <style>{`
            @keyframes spin {
                from { transform: rotateY(0deg); }
                to { transform: rotateY(360deg); }
            }
        `}</style>
    </div>
  );

  // --- 6. CARD GLARE: Holo Effect ---
  const CardGlare = () => {
      const cardRef = useRef<HTMLDivElement>(null);
      
      const handleMove = (e: React.MouseEvent) => {
          if (!cardRef.current) return;
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          cardRef.current.style.setProperty('--x', `${x}px`);
          cardRef.current.style.setProperty('--y', `${y}px`);
          
          // Rotation
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          
          cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const handleLeave = () => {
          if (cardRef.current) {
              cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
              cardRef.current.style.setProperty('--x', `-100%`);
              cardRef.current.style.setProperty('--y', `-100%`);
          }
      };

      return (
          <div 
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-72 h-96 bg-[#111] rounded-2xl border border-white/10 overflow-hidden transition-transform duration-100 ease-linear shadow-2xl"
          >
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
                  <h3 className="text-3xl font-bold text-white">Holo</h3>
                  <p className="text-gray-400">Interactive holographic foil effect.</p>
              </div>
              
              {/* Glare Layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
                style={{
                    background: `radial-gradient(
                        circle at var(--x, 50%) var(--y, 50%), 
                        rgba(255,255,255,0.8) 0%, 
                        rgba(255,255,255,0) 60%
                    )`
                }}
              />
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>
      );
  };

  // --- 7. CARD BORDER GRADIENT: Moving Border ---
  const CardBorderGradient = () => (
    <div className="relative w-72 h-96 group rounded-2xl overflow-hidden">
        {/* Animated Border */}
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#ff0000_180deg,transparent_270deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Inner Card */}
        <div className="absolute inset-[2px] bg-[#050505] rounded-2xl p-6 flex flex-col items-center justify-center text-center z-10">
            <Zap size={48} className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-bold text-white mb-2">Neon Border</h3>
            <p className="text-gray-500 text-sm">Conic gradient spinning behind content.</p>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // --- 8. CARD EXPAND: Detail Reveal ---
  const CardExpand = () => {
      const [expanded, setExpanded] = useState(false);
      return (
          <div 
            onClick={() => setExpanded(!expanded)}
            className={`
                relative bg-[#151515] rounded-3xl border border-white/10 shadow-xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${expanded ? 'w-96 h-96' : 'w-72 h-40'}
            `}
          >
              <div className="absolute top-4 right-4 text-white/50"><Maximize2 size={16}/></div>
              <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Expandable</h3>
                  <p className="text-gray-400 text-sm">Click to reveal details.</p>
                  
                  <div className={`mt-6 space-y-3 transition-all duration-500 ${expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-3/4 bg-white/10 rounded" />
                      <div className="h-2 w-1/2 bg-white/10 rounded" />
                      <div className="mt-4 p-4 bg-white/5 rounded-xl text-xs text-gray-300">
                          Additional content revealed smoothly using CSS transitions on height and width.
                      </div>
                  </div>
              </div>
          </div>
      );
  };

  // --- 9. CARD FOCUS: Dim Others ---
  const CardFocus = () => (
    <div className="grid grid-cols-2 gap-4 group/container">
        {[1, 2, 3, 4].map(i => (
            <div 
                key={i}
                className="w-32 h-32 bg-[#1a1a1a] rounded-xl border border-white/5 flex items-center justify-center text-white/20 text-2xl font-bold transition-all duration-300 hover:scale-105 hover:bg-[#222] hover:text-white hover:border-white/20 hover:shadow-2xl group-hover/container:[&:not(:hover)]:opacity-30 group-hover/container:[&:not(:hover)]:scale-95 group-hover/container:[&:not(:hover)]:blur-[2px]"
            >
                {i}
            </div>
        ))}
    </div>
  );

  // --- 10. CARD PATTERN: Moving Background ---
  const CardPattern = () => (
    <div className="group w-72 h-96 bg-black rounded-2xl border border-white/10 relative overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
             style={{ 
                 backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', 
                 backgroundSize: '20px 20px' 
             }} 
        >
            <div className="absolute inset-0 animate-[moveBackground_20s_linear_infinite]" 
                 style={{ backgroundImage: 'inherit', backgroundSize: 'inherit' }} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white mb-2">Pattern Shift</h3>
            <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Background pattern animates continuously, creating a sense of depth and motion.
            </p>
        </div>
        <style>{`@keyframes moveBackground { from { background-position: 0 0; } to { background-position: 40px 40px; } }`}</style>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'card-flip': return <CardFlip />;
      case 'card-hover-lift': return <CardHoverLift />;
      case 'card-stack': return <CardStack />;
      case 'card-spread': return <CardSpread />;
      case 'card-carousel': return <CardCarousel />;
      case 'card-glare': return <CardGlare />;
      case 'card-border-gradient': return <CardBorderGradient />;
      case 'card-expand': return <CardExpand />;
      case 'card-focus': return <CardFocus />;
      case 'card-pattern': return <CardPattern />;
      default: return <CardFlip />;
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#050505] p-8 perspective-1000 overflow-hidden">
        <h2 className="relative z-10 text-white/20 font-mono text-xs uppercase tracking-[0.3em] mb-12">
            {variant.replace('card-', '').replace('-', ' ')}
        </h2>
        {renderContent()}
      </div>
    </DemoContainer>
  );
}