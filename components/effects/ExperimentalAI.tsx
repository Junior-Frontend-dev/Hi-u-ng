import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCw } from 'lucide-react';

export default function ExperimentalAI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const initArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;

    // Generative Logic: Flow Field
    const particles: any[] = [];
    const numParticles = 2000; // Dense
    const noiseScale = 0.005;
    
    // Seed random colors
    const baseHue = Math.random() * 360;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            color: `hsla(${baseHue + Math.random() * 60}, 70%, 60%, 0.5)`
        });
    }

    // Perlin-ish noise approximation
    const noise = (x: number, y: number) => {
        return Math.sin(x * noiseScale) * Math.cos(y * noiseScale) * Math.PI * 2;
    };

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    const animate = () => {
        // Fade effect for trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            const angle = noise(p.x, p.y);
            p.vx += Math.cos(angle) * 0.1;
            p.vy += Math.sin(angle) * 0.1;
            
            // Limit speed
            p.vx *= 0.99;
            p.vy *= 0.99;

            p.x += p.vx * 2;
            p.y += p.vy * 2;

            // Wrap around
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 2, 2);
        });

        rafRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(rafRef.current);
    animate();
  };

  useEffect(() => {
    initArt();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-black">
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        <div className="absolute top-6 left-6 z-10 bg-black/50 backdrop-blur p-4 rounded-xl border border-white/10">
            <h2 className="text-white font-bold text-xl">Generative Flow</h2>
            <p className="text-white/50 text-sm mb-4">Algorithmic art created on the fly.</p>
            <button 
                onClick={initArt}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
            >
                <RefreshCw size={14} /> Regenerate
            </button>
        </div>
      </div>
    </DemoContainer>
  );
}