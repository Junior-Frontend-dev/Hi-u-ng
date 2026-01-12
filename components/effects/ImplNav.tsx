import React, { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Menu, X, ChevronRight, Home, User, Briefcase, Mail, Settings, Bell } from 'lucide-react';

interface ImplNavProps {
  variant: string;
}

export default function ImplNav({ variant }: ImplNavProps) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  
  // Icon map for cleaner UI
  const icons = [Home, Briefcase, User, Mail];
  const items = ['Home', 'Projects', 'Studio', 'Connect'];

  // --- Logic tính toán vị trí Indicator (Dùng chung cho các style trượt) ---
  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const buttons = navRef.current.querySelectorAll('button[data-nav-item]');
      const activeBtn = buttons[active] as HTMLElement;
      
      if (activeBtn) {
        const rect = activeBtn.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        
        setIndicatorStyle({
          left: `${rect.left - navRect.left}px`,
          top: `${rect.top - navRect.top}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          opacity: 1,
          transform: 'none' // Reset transform for clean calculation
        });
      }
    };

    // Delay nhẹ để đảm bảo DOM đã render xong font/style
    const timeout = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    
    return () => {
        window.removeEventListener('resize', updateIndicator);
        clearTimeout(timeout);
    };
  }, [active, variant]);

  // 1. NAV MORPH: Cyberpunk/Glass Style
  const renderNavMorph = () => (
    <nav ref={navRef} className="relative flex p-1.5 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]">
      {/* Background Glow */}
      <div 
        className="absolute rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ ...indicatorStyle, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }} 
      />
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
          <button
            key={i}
            data-nav-item
            onClick={() => setActive(i)}
            className={`relative z-10 px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors duration-300 ${
              active === i ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon size={16} />
            <span>{item}</span>
          </button>
        )
      })}
    </nav>
  );

  // 2. NAV UNDERLINE: Laser Beam
  const renderNavUnderline = () => (
    <nav ref={navRef} className="relative flex gap-8">
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative pb-4 font-medium text-lg tracking-wide transition-all duration-500 ${
            active === i ? 'text-white text-shadow-glow' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {item}
          {/* Text Glow Effect for Active */}
          <span className={`absolute inset-0 blur-lg transition-opacity duration-500 ${active === i ? 'opacity-50 text-cyan-400' : 'opacity-0'}`}>
            {item}
          </span>
        </button>
      ))}
      <div 
        className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          left: indicatorStyle.left, 
          width: indicatorStyle.width,
          boxShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee'
        }} 
      />
    </nav>
  );

  // 3. NAV PILL: Floating Island (Apple Dynamic Island Vibes)
  const renderNavPill = () => (
    <nav ref={navRef} className="relative flex items-center gap-1 p-1.5 bg-[#111] rounded-full border border-white/5 shadow-2xl">
      <div 
        className="absolute rounded-full bg-[#222] border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ ...indicatorStyle, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)' }} 
      />
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative z-10 px-5 py-2.5 rounded-full font-medium text-sm transition-colors duration-300 ${
            active === i ? 'text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  // 4. NAV FLOAT: MacOS Dock Style with Hover scaling
  const renderNavFloat = () => (
    <div className="flex items-end gap-3 px-4 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 ${
              active === i ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-black/80 px-2 py-1 rounded text-white whitespace-nowrap pointer-events-none">
              {item}
            </span>
            {active === i && <span className="absolute -bottom-1 w-1 h-1 bg-white/50 rounded-full" />}
          </button>
        );
      })}
    </div>
  );

  // 5. NAV SIDEBAR: Modern Dashboard
  const renderNavSidebar = () => (
    <nav className="flex flex-col w-64 bg-[#0F0F0F] rounded-2xl border border-white/5 p-3 relative overflow-hidden">
        {/* Active Background Line */}
        <div 
            className="absolute left-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ 
                top: (active * 52) + 12 + 'px', // approximate calculation
                height: '40px',
                opacity: 1
            }}
        />
        
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
            <button
            key={i}
            onClick={() => setActive(i)}
            className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                active === i ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
            >
            {/* Hover/Active Background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-300 ${active === i ? 'opacity-100' : 'group-hover:opacity-50'}`} />
            
            <Icon size={18} className={`relative z-10 transition-colors ${active === i ? 'text-red-500' : 'group-hover:text-white'}`} />
            <span className="relative z-10">{item}</span>
            <ChevronRight size={14} className={`relative z-10 ml-auto transition-transform duration-300 ${active === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </button>
        )
      })}
    </nav>
  );

  // 6. NAV LIQUID: Hyper-Fluid Neon
  const renderNavLiquid = () => (
    <div className="relative w-full max-w-xl mx-auto">
        {/* SVG Filter Definition - Refined for "Full Bubble" look */}
        <svg className="absolute w-0 h-0">
            <defs>
            <filter id="liquid-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
            </defs>
        </svg>

        <nav ref={navRef} className="relative bg-[#111] rounded-[2rem] p-3 border border-white/5 shadow-2xl">
            {/* Layer 1: The Liquid Background */}
            <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden" style={{ filter: 'url(#liquid-glow)' }}>
                {/* The Moving Droplet - Upscaled slightly for better fill */}
                <div 
                    className="absolute bg-[#3b82f6] rounded-full transition-all duration-700 ease-[cubic-bezier(0.5,1.5,0.5,1)]"
                    style={{ 
                        left: indicatorStyle.left,
                        top: indicatorStyle.top,
                        width: indicatorStyle.width,
                        height: indicatorStyle.height,
                        opacity: 1,
                        // Make the blob slightly larger than the target to account for SVG erosion
                        transform: 'scale(1.1)' 
                    }}
                />
                
                {/* Static base - barely visible connection track */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-12 bg-[#3b82f6] opacity-20 rounded-full blur-xl" />
            </div>

            {/* Layer 2: The Content (Crisp) */}
            <div className="relative z-10 flex justify-between gap-2">
                {items.map((item, i) => {
                    const Icon = icons[i];
                    return (
                        <button
                        key={i}
                        data-nav-item
                        onClick={() => setActive(i)}
                        className={`flex-1 flex flex-col items-center justify-center py-5 rounded-2xl transition-colors duration-300 ${
                            active === i ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                        >
                        <Icon size={24} strokeWidth={2} className={`mb-1 transition-all duration-300 ${active === i ? 'scale-110 -translate-y-1' : ''}`} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{item}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    </div>
  );

  // 7. NAV MAGNETIC: Sophisticated Physics
  const MagneticButton = ({ children, isActive, onClick }: any) => {
      const btnRef = useRef<HTMLButtonElement>(null);
      const [pos, setPos] = useState({ x: 0, y: 0 });

      const handleMouseMove = (e: React.MouseEvent) => {
          if (!btnRef.current) return;
          const rect = btnRef.current.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          setPos({ x: x * 0.3, y: y * 0.3 }); // Attraction strength
      };

      const handleMouseLeave = () => setPos({ x: 0, y: 0 });

      return (
          <button
              ref={btnRef}
              onClick={onClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
              className={`
                  relative px-6 py-3 rounded-full border transition-all duration-200 ease-out
                  ${isActive 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}
              `}
          >
              {children}
          </button>
      );
  };

  const renderNavMagnetic = () => (
      <nav className="flex gap-4">
          {items.map((item, i) => (
              <MagneticButton key={i} isActive={active === i} onClick={() => setActive(i)}>
                  {item}
              </MagneticButton>
          ))}
      </nav>
  );

  // 8. NAV INDICATOR: Cyberpunk Dot
  const renderNavIndicator = () => (
    <nav ref={navRef} className="relative flex gap-12 border-b border-white/10 pb-4">
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative font-medium text-lg transition-all duration-500 ${
            active === i ? 'text-green-400' : 'text-gray-600 hover:text-gray-400'
          }`}
        >
          {item}
        </button>
      ))}
      <div 
        className="absolute -bottom-[5px] h-[3px] bg-green-400 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          left: `calc(${indicatorStyle.left} + ${parseFloat(indicatorStyle.width as string || '0') / 2}px - 2px)`, 
          width: '4px',
          boxShadow: '0 0 10px #4ade80, 0 0 20px #4ade80'
        }} 
      />
      {/* Ghost trail element could go here for extra effect */}
    </nav>
  );

  // 9. NAV CIRCLE: Sci-Fi Revolver
  const renderNavCircle = () => {
      const radius = 100;
      const rotation = -active * (360 / items.length);
      
      return (
        <div className="relative w-[300px] h-[300px] flex items-center justify-center overflow-hidden rounded-full bg-black border border-white/5">
            {/* Center Hub */}
            <div className="absolute w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center z-20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <span className="font-bold text-xl text-white">{active + 1}</span>
            </div>

            {/* Rotating Ring */}
            <div 
                className="absolute w-full h-full rounded-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {items.map((item, i) => {
                    const angle = (i * (360 / items.length)) * (Math.PI / 180);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const Icon = icons[i];

                    return (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`
                                absolute w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500
                                ${active === i ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]' : 'bg-neutral-900 border-white/10 text-gray-500 hover:border-white/30'}
                            `}
                            style={{ 
                                left: `calc(50% + ${x}px - 28px)`, 
                                top: `calc(50% + ${y}px - 28px)`,
                                transform: `rotate(${-rotation}deg)` // Counter-rotate icon to keep it upright
                            }}
                        >
                            <Icon size={20} />
                        </button>
                    );
                })}
            </div>
            
            {/* Pointer */}
            <div className="absolute right-0 w-8 h-[2px] bg-red-500 z-10" />
        </div>
      );
  };

  // 10. NAV MEGA: Cinematic Reveal
  const renderNavMega = () => (
      <div className="w-full max-w-2xl">
          <nav className="flex items-center justify-center gap-2 p-2 bg-neutral-900/80 rounded-t-2xl border border-white/10 border-b-0">
              {items.map((item, i) => (
                  <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`flex-1 py-3 rounded-xl font-medium text-sm transition-colors ${active === i ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                      {item}
                  </button>
              ))}
          </nav>
          
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-b-2xl rounded-tr-2xl p-8 min-h-[200px] relative overflow-hidden">
              {items.map((item, i) => (
                  <div 
                    key={i}
                    className={`absolute inset-0 p-8 transition-all duration-500 ease-out ${
                        active === i 
                        ? 'opacity-100 translate-y-0 pointer-events-auto delay-100' 
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                      <h3 className="text-2xl font-bold text-white mb-2">{item}</h3>
                      <p className="text-gray-400 mb-6">Experience the next generation of {item.toLowerCase()} navigation.</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map(n => (
                              <div key={n} className="h-16 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors" />
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  // 11. NAV HAMBURGER: Fluid Morph & Stagger
  const renderNavHamburger = () => (
    <div className="relative w-full h-96 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-2xl overflow-hidden group/container">
        {/* Toggle Button - Enhanced Visibility */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-6 right-6 z-50 w-14 h-14 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex flex-col gap-1.5 items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg group-hover/container:border-white/20"
        >
            <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`} 
            />
            <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0 translate-x-4' : ''}`} 
            />
            <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} 
            />
        </button>

        {/* Content Placeholder */}
        <div className="text-center space-y-4 p-8 transition-opacity duration-500" style={{ opacity: isOpen ? 0.3 : 1 }}>
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 shadow-lg shadow-blue-500/20 animate-pulse" />
            <h3 className="text-2xl font-bold text-white">Interactive UI</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Click the menu button to reveal the staggered navigation sequence.</p>
        </div>

        {/* Menu Overlay - Semi-transparent */}
        <div 
            className={`absolute inset-0 bg-black/80 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ 
                clipPath: isOpen ? 'circle(150% at 90% 10%)' : 'circle(0% at 90% 10%)',
            }}
        >
            <div className="flex flex-col gap-6 text-center">
                {items.map((item, i) => (
                    <div 
                        key={i} 
                        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                        style={{ transitionDelay: `${isOpen ? 100 + (i * 100) : 0}ms` }}
                    >
                        <button 
                            onClick={() => { setActive(i); setIsOpen(false); }}
                            className={`text-4xl font-bold tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600 transition-all ${active === i ? 'text-white' : 'text-white/40'}`}
                        >
                            {item}
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Close Hint */}
            <button 
                onClick={() => setIsOpen(false)}
                className={`absolute bottom-8 text-xs font-mono text-white/30 uppercase tracking-widest hover:text-white transition-colors ${isOpen ? 'opacity-100 delay-500' : 'opacity-0'}`}
            >
                [ Close Menu ]
            </button>
        </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'nav-morph': return renderNavMorph();
      case 'nav-underline': return renderNavUnderline();
      case 'nav-pill': return renderNavPill();
      case 'nav-float': return renderNavFloat();
      case 'nav-sidebar': return renderNavSidebar();
      case 'nav-mega': return renderNavMega();
      case 'nav-circle': return renderNavCircle();
      case 'nav-liquid': return renderNavLiquid();
      case 'nav-magnetic': return renderNavMagnetic();
      case 'nav-indicator': return renderNavIndicator();
      case 'nav-hamburger': return renderNavHamburger();
      default: return renderNavUnderline();
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#050505] p-8 perspective-1000 overflow-hidden">
        {/* Background Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        <h2 className="relative z-10 text-white/20 font-mono text-xs uppercase tracking-[0.3em] mb-16">
            {variant.replace('nav-', '').replace('-', ' ')}
        </h2>
        
        <div className="relative z-20">
            {renderContent()}
        </div>
      </div>
    </DemoContainer>
  );
}