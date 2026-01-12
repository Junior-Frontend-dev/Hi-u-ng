import React, { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight, Loader2, Zap, Sparkles, Send, Fingerprint } from 'lucide-react';

export default function ImplButton({ variant }: { variant: string }) {
  const [loading, setLoading] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'button-loading') {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
    if (variant === 'button-ripple-out') {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
      setTimeout(() => setRipples(prev => prev.slice(1)), 1000);
    }
  };

  // --- MAGNETIC EFFECT LOGIC ---
  useEffect(() => {
    if (variant !== 'button-magnetic') return;
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Calculate distance
      const distance = Math.sqrt(x*x + y*y);
      const hoverArea = 150;

      if (distance < hoverArea) {
         btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
         btn.style.transition = 'transform 0.1s ease-out';
      } else {
         btn.style.transform = 'translate(0px, 0px)';
         btn.style.transition = 'transform 0.5s ease-out';
      }
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s ease-out';
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        btn?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [variant]);


  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  // 1. PULSE (Heartbeat Glow)
  const renderButtonPulse = () => (
    <button className={`${baseClass} rounded-full bg-rose-600 shadow-[0_0_0_0_rgba(225,29,72,0.7)] animate-[pulse-ring_2s_infinite]`}>
      <Zap className="fill-white" size={18} />
      <span>LIVE ACTION</span>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(225, 29, 72, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
        }
      `}</style>
    </button>
  );

  // 2. SHINE (Glassy Sweep)
  const renderButtonShine = () => (
    <button className={`${baseClass} rounded-xl bg-black border border-white/10 backdrop-blur-md overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out skew-x-[-20deg] w-[200%]" />
      <Sparkles size={16} className="text-yellow-400" />
      <span className="relative z-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">PREMIUM SHINE</span>
    </button>
  );

  // 3. RIPPLE (Material Ink)
  const renderButtonRippleOut = () => (
    <button 
      onClick={handleClick}
      className={`${baseClass} bg-indigo-600 rounded-lg shadow-lg hover:shadow-indigo-500/50 active:scale-95`}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-[ripple_0.6s_linear]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      <Fingerprint size={18} />
      <span className="relative z-10">CLICK ME</span>
      <style>{`
        @keyframes ripple {
          to { width: 400px; height: 400px; opacity: 0; }
        }
      `}</style>
    </button>
  );

  // 4. MAGNETIC (Physics)
  const renderButtonMagnetic = () => (
    <button ref={btnRef} className={`${baseClass} bg-black border border-white/20 rounded-full px-12 py-6 hover:bg-white hover:text-black transition-colors duration-300`}>
      <span className="pointer-events-none text-lg">MAGNETIC</span>
    </button>
  );

  // 5. MORPH (Button -> Loader)
  const renderButtonMorph = () => (
    <button 
      onClick={() => setLoading(!loading)}
      className={`${baseClass} bg-emerald-600 rounded-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${loading ? 'w-14 h-14 p-0 bg-white text-emerald-600' : 'w-48'}`}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <span className="whitespace-nowrap">SUBMIT ORDER</span>
      )}
    </button>
  );

  // 6. LIQUID (Fill Up)
  const renderButtonLiquid = () => (
    <button className={`${baseClass} bg-transparent border border-blue-500 text-blue-500 rounded-full hover:text-white`}>
      <div className="absolute inset-0 w-full h-[200%] bg-blue-500 top-[100%] left-0 rounded-[50%] transition-all duration-500 ease-in-out group-hover:top-[-40%] group-hover:rounded-none" />
      <span className="relative z-10 font-bold tracking-widest">LIQUID FILL</span>
    </button>
  );

  // 7. NEON (Cyberpunk Glow)
  const renderButtonNeon = () => (
    <button className={`${baseClass} bg-transparent border-2 border-[#ff00ff] text-[#ff00ff] rounded-lg shadow-[0_0_10px_#ff00ff,inset_0_0_10px_#ff00ff] hover:shadow-[0_0_20px_#ff00ff,inset_0_0_20px_#ff00ff] hover:bg-[#ff00ff] hover:text-white transition-all duration-300 font-mono`}>
      CYBER_NEON
    </button>
  );

  // 8. GHOST (Minimalist)
  const renderButtonGhost = () => (
    <button className={`${baseClass} bg-transparent text-white border border-white/30 rounded-full hover:border-white hover:bg-white/10 backdrop-blur-sm`}>
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">GHOST UI</span>
    </button>
  );

  // 9. ARROW (Slide Reveal)
  const renderButtonArrow = () => (
    <button className={`${baseClass} bg-white text-black rounded-full pl-8 pr-6 hover:pr-8 hover:pl-6 transition-all duration-300`}>
      <span className="font-bold">EXPLORE</span>
      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:rotate-45">
        <ArrowRight size={14} />
      </div>
    </button>
  );

  // 10. LOADING (Inline State)
  const renderButtonLoading = () => (
    <button 
      onClick={handleClick}
      className={`${baseClass} bg-slate-800 rounded-lg overflow-hidden border border-slate-700`}
      disabled={loading}
    >
      <div className={`absolute inset-0 bg-blue-600 transition-transform duration-[2000ms] ease-linear ${loading ? 'translate-x-0' : '-translate-x-full'}`} />
      <span className={`relative z-10 flex items-center gap-2 ${loading ? 'opacity-100' : 'opacity-100'}`}>
        {loading ? 'PROCESSING...' : 'START UPLOAD'}
        {loading && <Loader2 className="animate-spin" size={16} />}
      </span>
    </button>
  );

  const renderContent = () => {
    switch (variant) {
      case 'button-pulse': return renderButtonPulse();
      case 'button-shine': return renderButtonShine();
      case 'button-ripple-out': return renderButtonRippleOut();
      case 'button-magnetic': return renderButtonMagnetic();
      case 'button-morph': return renderButtonMorph();
      case 'button-liquid': return renderButtonLiquid();
      case 'button-neon': return renderButtonNeon();
      case 'button-ghost': return renderButtonGhost();
      case 'button-arrow': return renderButtonArrow();
      case 'button-loading': return renderButtonLoading();
      default: return renderButtonPulse();
    }
  };

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      {/* Dynamic Background for Context */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.4)_0%,black_100%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        {renderContent()}
        <div className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase mt-12">
            Interactive Component
        </div>
      </div>
    </DemoContainer>
  );
}