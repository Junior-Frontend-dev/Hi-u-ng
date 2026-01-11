import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandDisintegrate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snapped, setSnapped] = useState(false);

  const drawLogo = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = 'white';
    ctx.font = '900 100px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("SNAP", w/2, h/2);
  };

  const handleSnap = () => {
    if (snapped) {
        // Reset
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawLogo(ctx, canvas.width, canvas.height);
        setSnapped(false);
        return;
    }

    setSnapped(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    
    const imageData = ctx.getImageData(0, 0, w, h);
    const pixels = imageData.data;
    const particles: {x: number, y: number, r: number, g: number, b: number, a: number, vx: number, vy: number}[] = [];

    // Sample pixels
    for(let y=0; y<h; y+=4) {
        for(let x=0; x<w; x+=4) {
            const i = (y * w + x) * 4;
            if (pixels[i+3] > 0) {
                particles.push({
                    x, y,
                    r: pixels[i], g: pixels[i+1], b: pixels[i+2], a: pixels[i+3],
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 1) * 2 - 1
                });
            }
        }
    }

    ctx.clearRect(0,0,w,h); // Clear original

    const animate = () => {
        if (!canvasRef.current) return; // Unmounted
        ctx.clearRect(0, 0, w, h);
        
        let stillAlive = false;
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.05; // Float up
            p.vx += (Math.random()-0.5) * 0.1;
            p.a -= 2;

            if (p.a > 0) {
                stillAlive = true;
                ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a/255})`;
                ctx.fillRect(p.x, p.y, 3, 3);
            }
        });

        if (stillAlive) requestAnimationFrame(animate);
    };
    animate();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if(canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 300;
        canvas.height = canvas.parentElement?.clientHeight || 300;
        const ctx = canvas.getContext('2d');
        if(ctx) drawLogo(ctx, canvas.width, canvas.height);
    }
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative cursor-pointer" onClick={handleSnap}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute bottom-10 w-full text-center text-white/30 text-sm">
            {snapped ? "Click to Reset" : "Click to Snap"}
        </div>
      </div>
    </DemoContainer>
  );
}