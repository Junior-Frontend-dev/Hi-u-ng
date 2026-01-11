import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ExperimentalNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const particles: {x: number, y: number, vx: number, vy: number}[] = [];
    for(let i=0; i<1000; i++) {
        particles.push({ x: Math.random()*width, y: Math.random()*height, vx: 0, vy: 0 });
    }

    const noise = (x: number, y: number) => {
        // Simple sin/cos field
        return Math.sin(x * 0.01) + Math.cos(y * 0.01);
    };

    const render = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,width,height);
        
        ctx.fillStyle = '#fff';
        
        particles.forEach(p => {
            const angle = noise(p.x, p.y) * Math.PI * 2;
            p.vx += Math.cos(angle) * 0.1;
            p.vy += Math.sin(angle) * 0.1;
            
            p.vx *= 0.99;
            p.vy *= 0.99;
            
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x < 0) p.x = width;
            if(p.x > width) p.x = 0;
            if(p.y < 0) p.y = height;
            if(p.y > height) p.y = 0;
            
            ctx.fillRect(p.x, p.y, 1, 1);
        });

        requestAnimationFrame(render);
    };
    const raf = requestAnimationFrame(render);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-4 right-4 text-white/50 text-xs">Perlin Flow</div>
      </div>
    </DemoContainer>
  );
}