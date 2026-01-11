import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionMemory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const path: {x: number, y: number}[] = [];
    const ghostPath: {x: number, y: number}[] = [];
    let isDrawing = false;

    const onMouseDown = () => { isDrawing = true; path.length = 0; };
    const onMouseUp = () => {
        isDrawing = false;
        // Start replay
        replay();
    };
    const onMouseMove = (e: MouseEvent) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        path.push(p);
        
        // Draw live
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    };

    const replay = () => {
        let i = 0;
        ctx.clearRect(0, 0, width, height); // Clear live drawing
        
        const loop = () => {
            if (i >= path.length) return;
            
            // Fade effect
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(0, 0, width, height);

            const p = path[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
            
            i++;
            requestAnimationFrame(loop);
        };
        loop();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
        <div className="absolute top-4 left-0 w-full text-center text-white/30 pointer-events-none">
            Draw a path, then release to see it replayed
        </div>
      </div>
    </DemoContainer>
  );
}