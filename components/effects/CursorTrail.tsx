import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    const resize = () => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if(rect) {
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
    };
    window.addEventListener('resize', resize);
    resize();

    const points: {x: number, y: number, age: number}[] = [];
    const maxAge = 50;

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, age: 0 });
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Update points
        for(let i = points.length - 1; i >= 0; i--) {
            points[i].age++;
            if(points[i].age > maxAge) {
                points.splice(i, 1);
            }
        }

        // Draw trail
        if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for(let i = 1; i < points.length; i++) {
                // Smooth quadratic curve
                const p0 = points[i-1];
                const p1 = points[i];
                const midX = (p0.x + p1.x) / 2;
                const midY = (p0.y + p1.y) / 2;
                ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
            }
            ctx.lineTo(points[points.length-1].x, points[points.length-1].y);
            
            // Gradient stroke
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#00f260');
            gradient.addColorStop(1, '#0575E6');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        requestAnimationFrame(render);
    };
    render();

    return () => {
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-white/20 font-mono">Move cursor to draw</h2>
        </div>
      </div>
    </DemoContainer>
  );
}