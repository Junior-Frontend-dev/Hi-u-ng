import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Loader2, RefreshCw, Zap } from 'lucide-react';

const DoomGlitchLoader = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;
    
    // Configuration for "Mạnh" (Intensity)
    const GLITCH_INTENSITY = 0.4; // Probability of glitch per frame
    const RGB_SHIFT_AMOUNT = 4;   // Max pixel shift for RGB
    const SLICE_HEIGHT = 5;       // Height of horizontal slices
    const SLICE_OFFSET = 15;      // Max horizontal offset for slices

    const render = () => {
      frameCount++;
      
      // Set canvas size (optimize: do this on resize only if needed, but for loader safe here)
      canvas.width = 300;
      canvas.height = 100;
      
      // Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Base Text Settings
      ctx.font = 'italic 900 48px "Inter", sans-serif'; // Brutal font
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = 'LOADING';
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // 1. Draw Red Channel (Left Shift)
      if (Math.random() < GLITCH_INTENSITY) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillText(text, cx - (Math.random() * RGB_SHIFT_AMOUNT), cy - (Math.random() * RGB_SHIFT_AMOUNT));
      }

      // 2. Draw Blue Channel (Right Shift)
      if (Math.random() < GLITCH_INTENSITY) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText(text, cx + (Math.random() * RGB_SHIFT_AMOUNT), cy + (Math.random() * RGB_SHIFT_AMOUNT));
      }

      // 3. Draw White Channel (Main)
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, cx, cy);

      // 4. "Doom" Slicing / Tearing Effect
      // "Bớt lag" -> We manipulate pixels or use clipping regions. 
      // Clipping is faster than getImageData for simple tearing.
      const slices = Math.floor(canvas.height / SLICE_HEIGHT);
      
      for (let i = 0; i < slices; i++) {
        // Randomly offset some slices
        if (Math.random() < 0.1) { // 10% of slices glitch
          const y = i * SLICE_HEIGHT;
          const offset = (Math.random() - 0.5) * SLICE_OFFSET * 2;
          
          // Grab the slice from the canvas we just drew
          // Note: readback is slow, but for small loader size (300x100) it's acceptable.
          // For MAX speed ("bớt lag"), we might skip this or use drawImage with source rect.
          // Using drawImage(canvas, ...) is better.
          
          ctx.drawImage(
            canvas, 
            0, y, canvas.width, SLICE_HEIGHT, // Source
            offset, y, canvas.width, SLICE_HEIGHT // Destination
          );
        }
      }

      // 5. Random Noise Blocks (Rects)
      if (Math.random() < 0.2) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        const blockX = Math.random() * canvas.width;
        const blockY = Math.random() * canvas.height;
        const blockW = Math.random() * 50;
        const blockH = Math.random() * 5;
        ctx.fillRect(blockX, blockY, blockW, blockH);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-[300px] h-[100px]" // Explicit size to prevent layout shift
    />
  );
};

export default function ImplLoader({ variant }: { variant?: string }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (variant === 'loader-progress') {
      const interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 1));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const renderLoader = () => {
    switch (variant) {
      case 'loader-circle':
        return (
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-white/5" />
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-0 rounded-full border-4 border-white/10 blur-sm animate-spin" />
          </div>
        );

      case 'loader-bar':
        return (
          <div className="w-64 space-y-4 text-center">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 w-full -translate-x-full animate-[loading-bar_2s_infinite_ease-in-out]" />
            </div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">System Synchronizing</p>
            <style>{`
              @keyframes loading-bar {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </div>
        );

      case 'loader-dots':
        return (
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );

      case 'loader-glitch':
        return <DoomGlitchLoader />;

      case 'loader-skeleton':
        return (
          <div className="w-72 p-6 bg-white/5 border border-white/10 rounded-3xl space-y-6 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-2/3 bg-white/10 rounded-full relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
                <div className="h-2 w-1/2 bg-white/5 rounded-full" />
              </div>
            </div>
            <div className="h-32 w-full bg-white/5 rounded-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
            <style>{`
              @keyframes shimmer {
                100% { transform: translateX(100%); }
              }
            `}</style>
          </div>
        );

      case 'loader-text':
        return (
          <div className="flex gap-1">
            {'LOADING'.split('').map((char, i) => (
              <span 
                key={i} 
                className="text-2xl font-black text-white animate-pulse" 
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        );

      case 'loader-svg':
        return (
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                className="animate-[dash_2s_ease-in-out_infinite]"
                strokeDasharray="283"
                strokeDashoffset="283"
              />
            </svg>
            <style>{`
              @keyframes dash {
                0% { stroke-dashoffset: 283; transform: rotate(0deg); }
                50% { stroke-dashoffset: 75; transform: rotate(180deg); }
                100% { stroke-dashoffset: 283; transform: rotate(360deg); }
              }
            `}</style>
          </div>
        );

      case 'loader-mask':
        return (
          <div className="relative w-24 h-24 bg-white/10 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-blue-500 animate-[fill-up_2s_ease-in-out_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold mix-blend-overlay">
              LOAD
            </div>
            <style>{`
              @keyframes fill-up {
                0% { transform: translateY(100%); }
                100% { transform: translateY(-10%); }
              }
            `}</style>
          </div>
        );

      case 'loader-blur':
        return (
          <div className="text-4xl font-bold text-white animate-[blur-in_1.5s_infinite_alternate]">
            FOCUS
            <style>{`
              @keyframes blur-in {
                0% { filter: blur(10px); opacity: 0; }
                100% { filter: blur(0); opacity: 1; }
              }
            `}</style>
          </div>
        );

      case 'loader-progress':
        return (
          <div className="text-center">
            <div className="text-8xl font-black text-white tabular-nums tracking-tighter mb-4">
              {progress}<span className="text-2xl text-white/20 ml-2">%</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-indigo-400 text-[10px] font-bold tracking-widest uppercase">
               <Zap size={12} className="animate-pulse" />
               <span>Optimizing Engine</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center gap-8">
            <Loader2 className="w-12 h-12 text-white/20 animate-spin" />
            <p className="text-white/40 font-mono text-xs tracking-widest uppercase italic">Component Module Not Found</p>
          </div>
        );
    }
  };

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]" />
      <div className="relative z-10">
        {renderLoader()}
      </div>
    </DemoContainer>
  );
}