import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorHoverGravity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const mouse = { x: -1000, y: -1000 };
    const points: {ox: number, oy: number, x: number, y: number}[] = [];
    const spacing = 40;

    // Create Grid
    for(let x = 0; x < width; x += spacing) {
        for(let y = 0; y < height; y += spacing) {
            points.push({ ox: x, oy: y, x, y });
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const update = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

        points.forEach(p => {
            const dx = mouse.x - p.ox;
            const dy = mouse.y - p.oy;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const maxDist = 200;
            
            // Attraction
            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                const angle = Math.atan2(dy, dx);
                const moveDist = force * 30; // Max movement 30px
                p.x = p.ox + Math.cos(angle) * moveDist;
                p.y = p.oy + Math.sin(angle) * moveDist;
            } else {
                // Reset
                p.x += (p.ox - p.x) * 0.1;
                p.y += (p.oy - p.y) * 0.1;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(update);
    };
    const rafId = requestAnimationFrame(update);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
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