import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TypeDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const text = "SYSTEM ERROR";
    const fontSize = 100;
    
    let time = 0;
    let glitchIntensity = 0; // 0 to 1

    const render = () => {
        // Clear
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        
        ctx.font = `900 ${fontSize}px "Fira Code", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dynamic Jitter
        const shakeX = (Math.random() - 0.5) * glitchIntensity * 20;
        const shakeY = (Math.random() - 0.5) * glitchIntensity * 5;

        // RGB Split Offsets
        const offsetR = (Math.random() - 0.5) * glitchIntensity * 40;
        const offsetG = (Math.random() - 0.5) * glitchIntensity * 10;
        const offsetB = (Math.random() - 0.5) * glitchIntensity * 40;

        // --- Draw Channels ---
        
        // Red Channel
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(255, 0, 0, ${0.7 + Math.random() * 0.3})`;
        drawSlicedText(ctx, text, centerX + shakeX + offsetR, centerY + shakeY, width, height, glitchIntensity);
        ctx.restore();

        // Blue/Cyan Channel
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(0, 255, 255, ${0.7 + Math.random() * 0.3})`;
        drawSlicedText(ctx, text, centerX + shakeX + offsetB, centerY + shakeY, width, height, glitchIntensity);
        ctx.restore();
        
        // Green/White Channel (Base)
        // Flicker effect: sometimes don't draw base for pure RGB split look
        if (Math.random() > glitchIntensity * 0.3) {
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#ffffff'; 
            // Use 'lighten' to mix nicely with the colored layers below if they overlap
            ctx.globalCompositeOperation = 'lighten';
            drawSlicedText(ctx, text, centerX + shakeX, centerY + shakeY, width, height, glitchIntensity);
            ctx.restore();
        }

        // --- Scanlines & Noise ---
        ctx.fillStyle = `rgba(0, 0, 0, ${0.3})`;
        for(let i=0; i<height; i+=3) {
            ctx.fillRect(0, i, width, 1);
        }

        // Random horizontal noise bars
        if (Math.random() < glitchIntensity) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
            const h = Math.random() * 10;
            const y = Math.random() * height;
            ctx.fillRect(0, y, width, h);
        }

        time++;
        requestAnimationFrame(render);
    };

    // Helper to draw text with random horizontal slice offsets
    const drawSlicedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number, intensity: number) => {
        // Threshold: Only slice if intensity is high enough or random chance
        if (intensity < 0.05 && Math.random() > 0.05) {
            ctx.fillText(text, x, y);
            return;
        }

        const numSlices = 5 + Math.floor(intensity * 40); // More slices = more chaos
        const sliceHeight = h / numSlices;

        for (let i = 0; i < numSlices; i++) {
            // Determine shift for this slice
            let shift = 0;
            if (Math.random() < intensity + 0.1) {
                // High intensity -> larger shifts
                shift = (Math.random() - 0.5) * intensity * 200; 
            }

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, i * sliceHeight, w, sliceHeight);
            ctx.clip();
            ctx.fillText(text, x + shift, y);
            ctx.restore();
        }
    };

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    
    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const dx = e.clientX - rect.left - width/2;
        const dy = e.clientY - rect.top - height/2;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = width / 1.5;
        
        // Closer to center = higher intensity
        let val = 1 - Math.min(dist / maxDist, 1);
        // Ease the intensity
        val = val * val; 
        glitchIntensity = Math.max(0.02, val); // Min 0.02 base glitch
    };
    // Default low glitch
    glitchIntensity = 0.02;

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', () => glitchIntensity = 0.02);

    const raf = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden group">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair" />
        <div className="absolute bottom-10 text-red-500/50 font-mono text-xs tracking-widest pointer-events-none animate-pulse">
            // WARNING: SIGNAL UNSTABLE
        </div>
      </div>
    </DemoContainer>
  );
}