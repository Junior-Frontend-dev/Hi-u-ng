import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function SignatureAiBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    const w = canvas.width = canvas.parentElement?.clientWidth || 300;
    const h = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Generative Art Simulation
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,w,h);

    for(let i=0; i<100; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random()*w, Math.random()*h);
        ctx.bezierCurveTo(Math.random()*w, Math.random()*h, Math.random()*w, Math.random()*h, Math.random()*w, Math.random()*h);
        ctx.strokeStyle = `hsla(${Math.random()*360}, 70%, 50%, 0.5)`;
        ctx.lineWidth = Math.random() * 5;
        ctx.stroke();
    }
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative">
        <canvas ref={canvasRef} className="block w-full h-full" />
        <button onClick={generate} className="absolute bottom-6 right-6 bg-white text-black p-3 rounded-full hover:scale-110 transition-transform">
            <RefreshCcw size={20} />
        </button>
      </div>
    </DemoContainer>
  );
}