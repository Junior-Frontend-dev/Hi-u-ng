import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function ImplButton({ variant }: { variant: string }) {
  const [loading, setLoading] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'button-loading') {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
    if (variant === 'button-ripple-out') {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
      setTimeout(() => setRipples(prev => prev.slice(1)), 600);
    }
  };

  const baseClass = "relative px-10 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer";

  const renderButtonPulse = () => (
    <button className={`${baseClass} bg-blue-600 rounded-full animate-pulse hover:animate-none hover:bg-blue-500`}>
      Pulsing Button
    </button>
  );

  const renderButtonShine = () => (
    <button className={`${baseClass} bg-green-600 rounded-lg`}>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
      <span className="relative z-10">Shine Effect</span>
    </button>
  );

  const renderButtonRippleOut = () => (
    <button 
      onClick={handleClick}
      className={`${baseClass} bg-purple-600 rounded-full`}
    >
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}
      <span className="relative z-10">Ripple Out</span>
    </button>
  );

  const renderButtonMagnetic = () => (
    <button className={`${baseClass} bg-red-600 rounded-xl hover:scale-110 hover:-translate-y-1`}>
      Magnetic
    </button>
  );

  const renderButtonMorph = () => (
    <button 
      onClick={() => setLoading(!loading)}
      className={`${baseClass} bg-orange-600 rounded-xl transition-all duration-500 ${loading ? 'w-14 h-14 rounded-full' : ''}`}
    >
      {loading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <span>Morph to Loader</span>
      )}
    </button>
  );

  const renderButtonLiquid = () => (
    <button className={`${baseClass} bg-indigo-600 rounded-full`}>
      <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
      <span className="relative z-10">Liquid Fill</span>
    </button>
  );

  const renderButtonNeon = () => (
    <button className={`${baseClass} border-2 border-purple-500 text-purple-500 shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_30px_#a855f7] hover:bg-purple-500 hover:text-white rounded-lg`}>
      Neon Glow
    </button>
  );

  const renderButtonGhost = () => (
    <button className={`${baseClass} border border-white/50 rounded-full hover:bg-white hover:text-black`}>
      Ghost Button
    </button>
  );

  const renderButtonArrow = () => (
    <button className={`${baseClass} bg-gray-800 rounded-lg`}>
      <span className="flex items-center gap-2">
        Learn More
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </span>
    </button>
  );

  const renderButtonLoading = () => (
    <button 
      onClick={handleClick}
      className={`${baseClass} bg-blue-600 rounded-lg`}
    >
      <span className={`relative z-10 flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        Loading State
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
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
    <DemoContainer>
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        {renderContent()}
      </div>
    </DemoContainer>
  );
}
