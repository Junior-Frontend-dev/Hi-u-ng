import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Fill with "Fog"
    ctx.fillStyle = '#e5e7eb'; // Gray-200
    ctx.fillRect(0, 0, width, height);
    
    // Add text instruction
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', width/2, height/2);

    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const move = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        const { x, y } = getPos(e);
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();

        // Calculate progress (expensive, do sparsely)
        if (Math.random() > 0.8) {
            // Simplified progress check
            setPercent(p => Math.min(100, p + 1));
        }
    };

    const start = () => isDrawing = true;
    const end = () => isDrawing = false;

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', move);
    canvas.addEventListener('touchend', end);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
        // Reset
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('SCRATCH HERE', width/2, height/2);
    };
    window.addEventListener('resize', resize);

    return () => {
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousedown', start);
        canvas.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-blue-600 relative flex items-center justify-center">
        {/* Underlying Brand Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none select-none">
            <div className="text-9xl mb-4">💎</div>
            <h1 className="text-6xl font-black tracking-tighter">PREMIUM</h1>
            <p className="text-blue-200 mt-2">Exclusive Membership Unlocked</p>
        </div>

        {/* Scratch Canvas */}
        <canvas 
            ref={canvasRef} 
            className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${percent > 50 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
        />
      </div>
    </DemoContainer>
  );
}