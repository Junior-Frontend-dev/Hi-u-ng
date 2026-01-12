import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Loader2 } from 'lucide-react';

export default function ButtonLoading() {
  const [loading, setLoading] = useState(false);
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
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
      </div>
    </DemoContainer>
  );
}