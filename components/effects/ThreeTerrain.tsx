import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    let time = 0;
    const cols = 40;
    const rows = 40;
    const spacing = 30;

    const render = () => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2 - 100;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                // Generate 3D point
                const xPos = (x - cols / 2) * spacing;
                const zPos = (y) * spacing; // Moving away
                
                // Height based on noise
                const yPos = Math.sin(x * 0.2 + time) * 30 + Math.cos(y * 0.2 + time) * 30 + 200;

                // Project
                const fov = 300;
                const scale = fov / (fov + zPos);
                
                const px = cx + xPos * scale;
                const py = cy + yPos * scale;
                const size = 3 * scale;

                // Color based on height
                const hue = 180 + (yPos / 100) * 60;
                ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
                
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        time += 0.02;
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
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        <div className="absolute top-10 left-10 text-white/50 font-mono">TERRAIN GEN</div>
      </div>
    </DemoContainer>
  );
}