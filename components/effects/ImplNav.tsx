import React, { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function ImplNav({ variant }: { variant: string }) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const items = ['Home', 'Work', 'About', 'Contact'];

  useEffect(() => {
    if (!navRef.current) return;
    
    const buttons = navRef.current.querySelectorAll('button[data-nav-item]');
    const indicator = navRef.current.querySelector('.nav-indicator') as HTMLElement;
    
    if (indicator && buttons[active]) {
      const activeBtn = buttons[active];
      const rect = activeBtn.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      
      indicator.style.left = `${rect.left - navRect.left + rect.width / 2}px`;
      indicator.style.width = `${rect.width}px`;
      indicator.style.height = `${rect.height}px`;
    }
  }, [active]);

  const renderNavMorph = () => (
    <nav ref={navRef} className="relative flex gap-2 p-2 bg-neutral-800 rounded-full border border-neutral-700">
      <div 
        className="nav-indicator absolute rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100"
        style={{ 
          left: 0, top: 0, width: 80, height: 44,
          transform: 'scale(0.9)',
        }}
      />
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            active === i ? 'text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  const renderNavUnderline = () => (
    <nav ref={navRef} className="relative flex gap-8 p-4">
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative pb-2 font-medium transition-all duration-300 ${
            active === i ? 'text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {item}
          {active === i && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
          )}
        </button>
      ))}
    </nav>
  );

  const renderNavPill = () => (
    <nav ref={navRef} className="relative flex gap-2 p-2 bg-neutral-800 rounded-full border border-neutral-700">
      <div 
        className="nav-indicator absolute rounded-full bg-blue-500 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ 
          left: 0, top: 0, width: 80, height: 44,
          transform: 'scale(0.9)',
        }}
      />
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            active === i ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  const renderNavFloat = () => (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-3 bg-neutral-900/80 backdrop-blur-lg rounded-full border border-white/10 z-50">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            active === i ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  const renderNavSidebar = () => (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-4 bg-neutral-900 rounded-2xl border border-neutral-800 z-50">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left ${
            active === i ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-neutral-800'
          }`}
        >
          <span className="text-sm">{item}</span>
        </button>
      ))}
    </nav>
  );

  const renderNavMega = () => (
    <nav className="relative w-full">
      <div className="flex items-center justify-center gap-8 px-8 py-4 bg-neutral-900 border-b border-neutral-800">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 font-medium text-gray-300 hover:text-white transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-800 border-b border-neutral-700 p-8 animate-in slide-in-from-top-2">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Section 1</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Subitem 1</li>
                <li className="hover:text-white cursor-pointer">Subitem 2</li>
                <li className="hover:text-white cursor-pointer">Subitem 3</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Section 2</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Subitem 4</li>
                <li className="hover:text-white cursor-pointer">Subitem 5</li>
                <li className="hover:text-white cursor-pointer">Subitem 6</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Section 3</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Subitem 7</li>
                <li className="hover:text-white cursor-pointer">Subitem 8</li>
                <li className="hover:text-white cursor-pointer">Subitem 9</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const renderNavCircle = () => (
    <nav className="relative w-80 h-80">
      <div className="absolute inset-0 border-2 border-neutral-700 rounded-full" />
      <div 
        className="absolute inset-0 border-2 border-blue-500 rounded-full"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      {items.map((item, i) => {
        const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`absolute w-16 h-16 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              active === i ? 'bg-blue-500 text-white scale-110' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
            }`}
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          >
            {item[0]}
          </button>
        );
      })}
    </nav>
  );

  const renderNavLiquid = () => (
    <nav ref={navRef} className="relative flex gap-4 p-3 bg-neutral-900 rounded-full border border-neutral-800">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div 
        className="nav-indicator absolute bg-blue-500 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: 0, top: 0, width: 100, height: 50, opacity: 1 }}
      />
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative z-10 px-6 py-3 font-medium transition-all duration-300 ${
            active === i ? 'text-white' : 'text-gray-400'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  const renderNavMagnetic = () => (
    <nav className="flex gap-4 px-8 py-4 bg-neutral-900 rounded-full border border-neutral-800">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            active === i ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  const renderNavIndicator = () => (
    <nav ref={navRef} className="relative flex gap-2 p-2 bg-neutral-800 rounded-full border border-neutral-700">
      <div 
        className="nav-indicator absolute rounded-full bg-white/20 border border-white/30 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: 0, top: 0, width: 80, height: 44 }}
      />
      {items.map((item, i) => (
        <button
          key={i}
          data-nav-item
          onClick={() => setActive(i)}
          className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            active === i ? 'text-white' : 'text-gray-400'
          }`}
        >
          {item}
          {active === i && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />}
        </button>
      ))}
    </nav>
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
      default: return renderNavPill();
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-neutral-900 p-8">
        <h2 className="text-white/30 font-mono text-sm uppercase tracking-widest mb-8">{variant.replace('nav-', '').replace('-', ' ')}</h2>
        {renderContent()}
        <div className="mt-20 text-white text-4xl font-bold">
          {items[active]}
        </div>
      </div>
    </DemoContainer>
  );
}
