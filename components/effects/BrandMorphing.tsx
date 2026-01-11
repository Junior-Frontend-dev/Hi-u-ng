import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandMorphing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;
    let time = 0;

    const render = () => {
        // Create dynamic gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        
        // Brand Colors: Cyan, Magenta, Yellow (CMY)
        // Oscillate hue/positions
        const c1 = `hsl(${180 + Math.sin(time * 0.01) * 30}, 80%, 60%)`; // Cyan-ish
        const c2 = `hsl(${300 + Math.cos(time * 0.02) * 30}, 80%, 60%)`; // Pink-ish
        const c3 = `hsl(${60 + Math.sin(time * 0.03) * 30}, 80%, 60%)`; // Yellow-ish

        gradient.addColorStop(0, c1);
        gradient.addColorStop(0.5 + Math.sin(time * 0.01) * 0.2, c2);
        gradient.addColorStop(1, c3);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Overlay Pattern (Brand Texture)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for(let i=0; i<10; i++) {
            const x = (Math.sin(time * 0.02 + i) + 1) * width / 2;
            const y = (Math.cos(time * 0.03 + i) + 1) * height / 2;
            const size = 100 + Math.sin(time * 0.05 + i) * 50;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        time++;
        requestAnimationFrame(render);
    };
    
    const raf = requestAnimationFrame(render);
    
    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 shadow-2xl">
                <h1 className="text-6xl font-black text-white tracking-tighter">BRAND.</h1>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}