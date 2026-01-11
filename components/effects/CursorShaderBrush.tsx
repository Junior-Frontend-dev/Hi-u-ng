import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorShaderBrush() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const points: {x: number, y: number, hue: number, life: number}[] = [];
    let hue = 0;

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        points.push({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            hue: hue % 360,
            life: 1.0
        });
        hue += 5;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const animate = () => {
        // Fade out previous frame
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'lighter';

        for(let i=0; i<points.length; i++) {
            const p = points[i];
            if (p.life <= 0) continue;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, 20 * p.life, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 70%, 50%, ${p.life})`;
            ctx.fill();
            p.life -= 0.02;
        }
        
        // Remove dead points
        while(points.length > 0 && points[0].life <= 0) {
            points.shift();
        }

        requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        canvas.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </DemoContainer>
  );
}