import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VietnamFlag() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;
    let time = 0;

    // Particles for "Glory" effect (Golden dust)
    const particles: {x: number, y: number, vy: number, alpha: number, size: number}[] = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vy: Math.random() * 1 + 0.5,
            alpha: Math.random(),
            size: Math.random() * 2
        });
    }

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, outerRadius: number, innerRadius: number) => {
        const spikes = 5;
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    };

    const render = () => {
        ctx.clearRect(0, 0, width, height);

        // --- 1. Flag Surface Physics (Sine Wave Mesh) ---
        // Amplitude and frequency for the "wind"
        const amplitude = 15;
        const wavelength = 0.015;
        const speed = 0.15;
        
        for (let x = 0; x < width; x++) {
            // Complex wave: Main wave + secondary ripples for realism
            const wave1 = Math.sin(x * wavelength + time * speed);
            const wave2 = Math.sin(x * wavelength * 2.5 + time * speed * 1.5) * 0.3;
            const displacement = (wave1 + wave2) * amplitude;
            
            // Lighting based on slope (derivative of sine is cosine)
            // Slope determines if part of the cloth is facing light source (top-left)
            const slope = Math.cos(x * wavelength + time * speed);
            
            // Shadow intensity (-1 to 1) mapped to brightness multiplier
            const lighting = 1 + slope * 0.25; 

            // Red Background color modulated by lighting
            // Base Red: #DA251D (RGB: 218, 37, 29)
            const r = Math.min(255, 218 * lighting);
            const g = Math.min(255, 37 * lighting);
            const b = Math.min(255, 29 * lighting);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            
            // Draw vertical slice
            // Add slight Y skew based on X to simulate perspective/wind shear
            // This creates the "flapping" visual
            ctx.fillRect(x, 0 + displacement, 1, height);
        }

        // --- 2. The Star (Deformed by wind) ---
        // To properly deform the star with the flag, we calculate its center position relative to the wave
        const centerX = width / 2;
        // Calculate the wave displacement at the center of the screen
        const centerWave = Math.sin(centerX * wavelength + time * speed) * amplitude;
        const centerSlope = Math.cos(centerX * wavelength + time * speed);
        
        ctx.save();
        // Move to center, applying vertical wave displacement
        ctx.translate(centerX, height / 2 + centerWave);
        // Rotate slightly based on wave slope to simulate cloth tilting
        ctx.rotate(centerSlope * 0.08); 
        
        // Star Glow / Bloom
        ctx.shadowBlur = 40 + Math.sin(time * 0.1) * 20;
        ctx.shadowColor = 'rgba(255, 255, 0, 0.6)';
        
        ctx.fillStyle = '#FFFF00';
        // Draw standard star shape
        drawStar(ctx, 0, 0, 120, 48);
        ctx.fill();
        ctx.restore();

        // --- 3. Glory Particles (Golden dust rising) ---
        // Simulates "Hào khí" (Aura)
        particles.forEach(p => {
            p.y -= p.vy; // Move up
            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            
            // Wiggle movement
            const pX = p.x + Math.sin(time * 0.05 + p.y * 0.01) * 20;
            const pAlpha = p.alpha * (0.5 + Math.sin(time * 0.1 + p.y * 0.01) * 0.5); // Twinkle
            
            ctx.fillStyle = `rgba(255, 215, 0, ${pAlpha})`;
            ctx.beginPath();
            ctx.arc(pX, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // --- 4. Cinematic Vignette & Noise Overlay ---
        // Adds depth and film look
        const grad = ctx.createRadialGradient(width/2, height/2, width/4, width/2, height/2, width);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.5)'); // Dark corners
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,width,height);

        time += 1;
        requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    const raf = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-[#8b0000] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute bottom-12 w-full text-center z-20 pointer-events-none">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-2xl tracking-[0.2em] uppercase" style={{ fontFamily: 'serif' }}>
                Việt Nam
            </h1>
            <div className="h-px w-24 bg-yellow-500/50 mx-auto mt-4"></div>
            <p className="text-yellow-100/60 text-sm mt-4 font-mono tracking-widest uppercase">Hào Khí Ngàn Năm</p>
        </div>
      </div>
    </DemoContainer>
  );
}