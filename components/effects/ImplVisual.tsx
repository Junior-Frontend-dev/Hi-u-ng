import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

interface ImplVisualProps {
  variant: string;
}

export default function ImplVisual({ variant }: ImplVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- CANVAS EFFECTS (Noise, Glitch, etc.) ---
  useEffect(() => {
    if (!['visual-noise', 'visual-glitch-image', 'visual-cinematic'].includes(variant)) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas context not available for', variant);
      return;
    }

    let w = canvas.width;
    let h = canvas.height;
    let animationId: number;
    let tick = 0;
    let isMounted = true;

    const resize = () => {
        if (!isMounted || !canvas || !canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        w = canvas.width;
        h = canvas.height;
    };
    window.addEventListener('resize', resize);
    resize();

    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop";

    const render = () => {
        if (!isMounted) return;
        
        tick++;
        
        if (variant === 'visual-noise') {
            try {
                const idata = ctx.createImageData(w, h);
                const buffer = new Uint32Array(idata.data.buffer);
                for (let i = 0; i < buffer.length; i++) {
                    if (Math.random() < 0.1) buffer[i] = 0xffffffff; 
                }
                ctx.putImageData(idata, 0, 0);
            } catch (e) {
                console.warn('Visual noise render error:', e);
            }
        } else if (variant === 'visual-glitch-image') {
            if (img.complete && !img.naturalWidth) {
                return;
            }
            try {
                if (img.complete) {
                    const scale = Math.max(w/img.width, h/img.height);
                    const x = (w - img.width*scale)/2;
                    const y = (h - img.height*scale)/2;
                    ctx.drawImage(img, x, y, img.width*scale, img.height*scale);
                    
                    if(Math.random() > 0.9) {
                        const shift = (Math.random()-0.5)*20;
                        const hSlice = Math.random()*100;
                        const ySlice = Math.random()*h;
                        try {
                            const slice = ctx.getImageData(0, ySlice, w, hSlice);
                            ctx.putImageData(slice, shift, ySlice);
                        } catch (e) {
                            // Ignore slice errors
                        }
                    }
                }
            } catch (e) {
                console.warn('Glitch render error:', e);
            }
        } else if (variant === 'visual-cinematic') {
             if (img.complete && !img.naturalWidth) {
                return;
            }
            try {
                if (img.complete) {
                    const scale = Math.max(w/img.width, h/img.height);
                    const x = (w - img.width*scale)/2;
                    const y = (h - img.height*scale)/2;
                    ctx.filter = 'contrast(1.2) saturate(1.2) brightness(0.8)';
                    ctx.drawImage(img, x, y, img.width*scale, img.height*scale);
                    ctx.filter = 'none';
                    
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, w, h*0.1);
                    ctx.fillRect(0, h*0.9, w, h*0.1);
                    
                    const idata = ctx.getImageData(0,0,w,h);
                    const data = idata.data;
                    for(let i=0; i<data.length; i+=4) {
                        const grain = (Math.random()-0.5)*20;
                        data[i]+=grain; data[i+1]+=grain; data[i+2]+=grain;
                    }
                    ctx.putImageData(idata, 0, 0);
                }
            } catch (e) {
                console.warn('Cinematic render error:', e);
            }
        }

        animationId = requestAnimationFrame(render);
    };

    img.onerror = () => {
      console.warn('Image failed to load for', variant);
    };
    img.src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop";

    render();

    return () => {
        isMounted = false;
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
    };
  }, [variant]);

  // --- CSS COMPONENT RENDERERS ---
  const renderGlassmorphism = () => (
      <div className="relative w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000')] bg-cover">
          <div className="w-96 h-64 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <h2 className="text-3xl font-bold mb-4">Glass UI</h2>
              <p className="text-center text-white/70">Backdrop blur filters creating depth and hierarchy.</p>
              <button className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full border border-white/10 transition-all">Explore</button>
          </div>
      </div>
  );

  const renderNeumorphism = () => (
      <div className="w-full h-full flex items-center justify-center bg-[#e0e5ec]">
          <div className="w-64 h-64 rounded-[30px] bg-[#e0e5ec] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#e0e5ec] shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] flex items-center justify-center text-gray-500">
                  Soft
              </div>
          </div>
      </div>
  );

  const renderMasking = () => (
      <div className="w-full h-full flex items-center justify-center bg-black relative">
          <h1 className="text-[150px] font-black text-transparent bg-clip-text bg-[url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000')] bg-cover animate-pulse">
              MASK
          </h1>
      </div>
  );

  const renderClipPath = () => (
      <div className="w-full h-full flex items-center justify-center bg-[#111] overflow-hidden">
          <div className="relative w-80 h-80 group">
              {[1,2,3,4].map(i => (
                  <div key={i} 
                       className="absolute inset-0 bg-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                       style={{
                           backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000)',
                           clipPath: i===1 ? 'polygon(0 0, 100% 0, 50% 50%)' :
                                     i===2 ? 'polygon(100% 0, 100% 100%, 50% 50%)' :
                                     i===3 ? 'polygon(100% 100%, 0 100%, 50% 50%)' :
                                             'polygon(0 100%, 0 0, 50% 50%)',
                           transform: `translate(${i===1?0:i===2?10:i===3?0:-10}px, ${i===1?-10:i===2?0:i===3?10:0}px)`
                       }}
                  />
              ))}
          </div>
      </div>
  );

  const renderBrutalist = () => (
      <div className="w-full h-full flex items-center justify-center bg-[#ffdf00] font-mono">
          <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <h1 className="text-6xl font-black uppercase tracking-tighter">Brutal</h1>
              <div className="mt-4 bg-black text-white p-2 inline-block font-bold">RAW AESTHETIC</div>
          </div>
      </div>
  );

  const renderContent = () => {
      switch (variant) {
          case 'visual-glassmorphism': return renderGlassmorphism();
          case 'visual-neumorphism': return renderNeumorphism();
          case 'visual-masking': return renderMasking();
          case 'visual-clip-path': return renderClipPath();
          case 'visual-brutalist': return renderBrutalist();
          // Canvas fallbacks
          case 'visual-noise':
          case 'visual-glitch-image':
          case 'visual-cinematic':
              return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
          default:
              return (
                  <div className="flex flex-col items-center justify-center h-full text-white/30">
                      <div className="w-16 h-16 border-2 border-current rounded-full flex items-center justify-center mb-4">?</div>
                      <span className="font-mono uppercase tracking-widest">{variant}</span>
                  </div>
              );
      }
  };

  return (
    <DemoContainer>
        <div className="w-full h-full relative overflow-hidden bg-[#050505]">
            {renderContent()}
        </div>
    </DemoContainer>
  );
}