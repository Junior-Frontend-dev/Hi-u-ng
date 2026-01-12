import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight, Star, Heart, Share2, MoreHorizontal, Maximize2, Zap, Layers, CreditCard } from 'lucide-react';

interface ImplCardProps {
  variant: string;
}

export default function ImplCard({ variant }: ImplCardProps) {
  
  // --- 1. CARD FLIP: Real 3D Credit Card ---
  const CardFlip = () => {
    return (
      <div className="group w-96 h-60 [perspective:1000px] cursor-pointer">
        <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl p-8 bg-gradient-to-br from-neutral-900 to-black text-white [backface-visibility:hidden] shadow-2xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start">
                <div className="w-14 h-9 rounded bg-gradient-to-r from-yellow-400 to-yellow-200 shadow-lg" />
                <div className="font-mono text-xl tracking-widest opacity-80">PREMIUM</div>
            </div>
            <div className="relative z-10 mt-10 font-mono text-2xl tracking-[0.25em] drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                4242 8888 9999
            </div>
            <div className="relative z-10 mt-10 flex justify-between items-end">
                <div className="text-[10px] tracking-widest text-gray-400">CARD HOLDER<br/><span className="text-sm font-bold text-white mt-1 block">AN VIETNAM</span></div>
                <div className="text-[10px] tracking-widest text-gray-400">VALID THRU<br/><span className="text-sm font-bold text-white mt-1 block">12/30</span></div>
            </div>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 rounded-2xl bg-[#0a0a0a] text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl border border-white/10 overflow-hidden">
            <div className="mt-8 h-12 bg-black w-full" />
            <div className="mt-8 px-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 flex-1 bg-white/10 rounded flex items-center justify-end px-3 font-mono text-xs tracking-widest opacity-50">
                        AUTHORIZED SIGNATURE
                    </div>
                    <div className="h-10 w-16 bg-white text-black font-bold font-mono flex items-center justify-center rounded">
                        982
                    </div>
                </div>
                <p className="mt-6 text-[8px] text-gray-500 text-justify leading-relaxed">
                    This card is issued by An Vietnam Library. Use of this card constitutes acceptance of the terms and conditions. If found, please return to the nearest digital branch.
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 2. CARD HOVER LIFT: Apple TV Style Shadow ---
  const CardHoverLift = () => (
    <div className="group relative w-80 h-[28rem] rounded-[2rem] bg-[#050505] border border-white/5 transition-all duration-500 ease-out hover:-translate-y-6 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
        <div className="h-full w-full rounded-[2rem] overflow-hidden relative">
            <img 
                src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2 block">Cinematic</span>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Elevated Reality</h3>
                <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Experience depth like never before with smooth lifting physics and dynamic shadow casting.
                </p>
            </div>
        </div>
    </div>
  );

  // --- 3. CARD STACK: Shuffle Effect ---
  const CardStack = () => {
      const [order, setOrder] = useState([0, 1, 2]);
      
      const shuffle = () => {
          setOrder(prev => [prev[1], prev[2], prev[0]]);
      };

      return (
        <div 
            onClick={shuffle}
            className="relative w-72 h-96 cursor-pointer"
        >
            {order.map((index, i) => (
                <div 
                    key={index}
                    className="absolute inset-0 rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[#151515] p-6 flex flex-col justify-between overflow-hidden"
                    style={{ 
                        zIndex: 3 - i,
                        transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
                        opacity: 1 - i * 0.2,
                        filter: `blur(${i * 2}px)`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                            <Layers size={18} className="text-white" />
                        </div>
                        <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-1">Card {index + 1}</h4>
                        <p className="text-xs text-gray-500">Click to shuffle stack</p>
                    </div>
                </div>
            ))}
        </div>
      );
  };

  // --- 4. CARD SPREAD: Gallery Expand ---
  const CardSpread = () => (
    <div className="flex -space-x-24 hover:-space-x-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] h-80 items-center px-12">
        {[
            'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'
        ].map((img, i) => (
            <div 
                key={i}
                className="relative w-48 h-72 rounded-2xl shadow-2xl transition-all duration-500 hover:-translate-y-8 hover:scale-110 hover:z-50 border-4 border-[#050505] overflow-hidden group grayscale hover:grayscale-0"
                style={{ zIndex: i }}
            >
                <img src={img} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 font-bold text-white text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    Art {i + 1}
                </div>
            </div>
        ))}
    </div>
  );

  // --- 5. CARD CAROUSEL: 3D Spinner ---
  const CardCarousel = () => (
    <div className="relative w-full h-80 [perspective:1000px] flex justify-center items-center overflow-hidden">
        <div className="relative w-48 h-64 [transform-style:preserve-3d] animate-[spin_15s_linear_infinite] hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = i * (360 / 6);
                return (
                    <div 
                        key={i}
                        className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-black/80 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-lg"
                        style={{ transform: `rotateY(${angle}deg) translateZ(240px)` }}
                    >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Star size={20} className="text-yellow-400" fill="currentColor" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Item {i + 1}</h3>
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
      const [rotate, setRotate] = useState({ x: 0, y: 0 });
      
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
          
          setRotate({ x: rotateX, y: rotateY });
      };

      const handleLeave = () => {
          setRotate({ x: 0, y: 0 });
          if (cardRef.current) {
              cardRef.current.style.setProperty('--x', `-100%`);
              cardRef.current.style.setProperty('--y', `-100%`);
          }
      };

      return (
          <div 
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-80 h-[28rem] bg-[#111] rounded-[2rem] border border-white/10 overflow-hidden transition-transform duration-200 ease-out shadow-2xl"
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            }}
          >
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center">
                      <Zap className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white mb-2">Holographic</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Interactive foil shader that reacts to cursor position, creating a realistic metallic reflection.
                    </p>
                  </div>
              </div>
              
              {/* Glare Layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-300"
                style={{
                    background: `
                        radial-gradient(
                            circle at var(--x, 50%) var(--y, 50%), 
                            rgba(255,255,255,1) 0%, 
                            rgba(255,255,255,0) 50%
                        ),
                        linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 60%)
                    `
                }}
              />
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>
      );
  };

  // --- 7. CARD BORDER GRADIENT: Moving Border ---
  const CardBorderGradient = () => (
    <div className="relative w-80 h-96 group rounded-3xl overflow-hidden bg-black p-[2px]">
        {/* Animated Border */}
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#3b82f6_180deg,transparent_270deg)] animate-[spin_4s_linear_infinite]" />
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_180deg,transparent_0deg,transparent_90deg,#ec4899_180deg,transparent_270deg)] animate-[spin_4s_linear_infinite]" />
        
        {/* Inner Card */}
        <div className="relative h-full w-full bg-[#080808] rounded-[22px] p-8 flex flex-col items-center justify-center text-center z-10 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <CreditCard size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Neon Border</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
                Double conic gradients spinning in sync to create a flowing neon border effect.
            </p>
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
                relative bg-[#151515] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${expanded ? 'w-[30rem] h-[24rem]' : 'w-80 h-40'}
            `}
          >
              <div className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
                  <Maximize2 size={20}/>
              </div>
              <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Share2 size={20} />
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-white">Expandable</h3>
                          <p className="text-gray-500 text-xs uppercase tracking-wider">Click to view details</p>
                      </div>
                  </div>
                  
                  <div className={`flex-1 transition-all duration-500 delay-100 ${expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="space-y-4">
                          <p className="text-gray-300 text-sm leading-relaxed">
                              This component demonstrates a smooth layout transition. When clicked, it calculates the new bounding box and animates using high-performance CSS transforms. Perfect for master-detail views without navigation.
                          </p>
                          <div className="grid grid-cols-2 gap-3 mt-4">
                              <div className="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                              <div className="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                          </div>
                      </div>
                      <button className="mt-auto w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors">
                          Action
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  // --- 9. CARD FOCUS: Dim Others ---
  const CardFocus = () => (
    <div className="flex gap-4 group/container">
        {[1, 2, 3].map(i => (
            <div 
                key={i}
                className="w-48 h-64 bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 flex flex-col justify-end transition-all duration-500 ease-out hover:scale-105 hover:bg-[#222] hover:border-white/20 hover:shadow-2xl group-hover/container:[&:not(:hover)]:opacity-20 group-hover/container:[&:not(:hover)]:scale-95 group-hover/container:[&:not(:hover)]:blur-[2px] group-hover/container:[&:not(:hover)]:grayscale"
            >
                <h4 className="text-4xl font-black text-white/10 mb-auto">0{i}</h4>
                <h3 className="text-xl font-bold text-white">Focus</h3>
                <p className="text-xs text-gray-500 mt-2">Hover me to dim others.</p>
            </div>
        ))}
    </div>
  );

  // --- 10. CARD PATTERN: Moving Background ---
  const CardPattern = () => (
    <div className="group w-80 h-96 bg-black rounded-[2rem] border border-white/10 relative overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute inset-0 opacity-30 transition-opacity duration-500" 
             style={{ 
                 backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
             }} 
        >
            <div className="absolute inset-0 animate-[moveBackground_4s_linear_infinite]" 
                 style={{ 
                     backgroundImage: 'inherit', 
                     backgroundSize: 'inherit',
                     transformOrigin: 'center'
                 }} 
            />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight size={20} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Kinetic Grid</h3>
            <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 leading-relaxed">
                Background pattern animates continuously, creating a sense of infinite digital space.
            </p>
        </div>
        <style>{`@keyframes moveBackground { 
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); } 
            100% { transform: perspective(500px) rotateX(60deg) translateY(30px); } 
        }`}</style>
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
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#050505] p-8 perspective-1000 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-white/20 font-mono text-xs uppercase tracking-[0.3em] mb-16">
                {variant.replace('card-', '').replace('-', ' ')}
            </h2>
            {renderContent()}
        </div>
      </div>
    </DemoContainer>
  );
}