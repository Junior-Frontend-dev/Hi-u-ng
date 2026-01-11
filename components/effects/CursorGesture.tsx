import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function CursorGesture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [message, setMessage] = useState("Draw a circle or line");
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    let points: {x: number, y: number}[] = [];
    let isDrawing = false;

    const startDraw = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        points = [{ x: e.clientX - rect.left, y: e.clientY - rect.top }];
        isDrawing = true;
    };

    const draw = (e: MouseEvent) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        
        // Render trail
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        if(points.length > 0) ctx.moveTo(points[0].x, points[0].y);
        for(const p of points) ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.stroke();
    };

    const endDraw = () => {
        isDrawing = false;
        analyzeGesture();
    };

    const analyzeGesture = () => {
        if (points.length < 10) return;
        
        // Simple bounding box analysis
        const xs = points.map(p => p.x);
        const ys = points.map(p => p.y);
        const minX = Math.min(...xs), maxX = Math.max(...xs);
        const minY = Math.min(...ys), maxY = Math.max(...ys);
        const w = maxX - minX;
        const h = maxY - minY;

        // Check for Horizontal Line (Wide width, tiny height)
        if (w > 100 && h < 50) {
            setMessage("Horizontal Line Detected: Next Slide");
        } 
        // Check for Circle (Roughly square bounding box)
        else if (Math.abs(w - h) < 50 && w > 50) {
            setMessage("Circle Detected: Refresh");
        } else {
            setMessage("Unknown Gesture");
        }
        
        // Fade out canvas
        setTimeout(() => ctx.clearRect(0, 0, width, height), 1000);
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        canvas.removeEventListener('mousedown', startDraw);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', endDraw);
        window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative select-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-white font-bold text-2xl bg-black/50 px-6 py-3 rounded-xl border border-white/10">
                {message}
            </h2>
        </div>
      </div>
    </DemoContainer>
  );
}