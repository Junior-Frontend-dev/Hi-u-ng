import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Mic, Music, Volume2 } from 'lucide-react';

export default function BrandSound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    let time = 0;

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Background pulse based on simulated bass
        const bass = Math.sin(time * 0.1) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(59, 130, 246, ${bass * 0.1})`; // Blue tint
        ctx.fillRect(0,0,width,height);

        // Simulated Audio Data (Circular Waveform)
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 100 + bass * 20;
        const numPoints = 60;

        ctx.beginPath();
        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            // Noise function sim
            const noise = Math.sin(i * 0.5 + time * 0.2) * Math.cos(time * 0.3) * 30 * bass;
            const r = radius + noise;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Logo Text inside
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AUDIO', centerX, centerY);

        time++;
        requestAnimationFrame(render);
    };

    const raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex flex-col items-center justify-center relative">
        {!active && (
            <div className="text-center z-10">
                <button 
                    onClick={() => setActive(true)}
                    className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_40px_rgba(37,99,235,0.5)]"
                >
                    <PlayIcon />
                </button>
                <p className="mt-4 text-white/50">Start Sonic Brand</p>
            </div>
        )}
        
        {active && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />}
      </div>
    </DemoContainer>
  );
}

const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);