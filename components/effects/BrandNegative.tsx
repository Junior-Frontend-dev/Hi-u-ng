import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandNegative() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const particles: {x: number, y: number, ox: number, oy: number, vx: number, vy: number}[] = [];
    const spacing = 15;
    const mouse = { x: -1000, y: -1000 };

    // Initialize Grid
    for(let x = 0; x < width; x += spacing) {
        for(let y = 0; y < height; y += spacing) {
            particles.push({
                x, y,
                ox: x, oy: y,
                vx: 0, vy: 0
            });
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    const render = () => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        // Draw "Hidden" Logo (Visible only where particles are NOT)
        ctx.fillStyle = '#222';
        ctx.font = '900 150px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("VOID", width/2, height/2);

        ctx.fillStyle = '#fff';

        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const force = Math.max(0, 150 - dist) / 150;

            if (force > 0) {
                const angle = Math.atan2(dy, dx);
                const push = force * 20;
                p.vx -= Math.cos(angle) * push;
                p.vy -= Math.sin(angle) * push;
            }

            // Return to origin
            p.vx += (p.ox - p.x) * 0.05;
            p.vy += (p.oy - p.y) * 0.05;
            
            // Damping
            p.vx *= 0.8;
            p.vy *= 0.8;

            p.x += p.vx;
            p.y += p.vy;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
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
        canvas.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-none" />
        <div className="absolute bottom-8 left-0 w-full text-center text-white/30 pointer-events-none">
            Displace particles to reveal the brand
        </div>
      </div>
    </DemoContainer>
  );
}