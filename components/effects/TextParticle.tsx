import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextParticle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Draw text to canvas then sample it
    ctx.fillStyle = 'white';
    ctx.font = 'bold 100px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DISSOLVE', width/2, height/2);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const particles: {x: number, y: number, vx: number, vy: number}[] = [];

    // Create particles from pixels
    for(let y=0; y<height; y+=4) {
        for(let x=0; x<width; x+=4) {
            if(data[(y * width + x) * 4 + 3] > 128) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }
    }

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        
        particles.forEach(p => {
            // Mouse interaction logic would go here
            p.x += p.vx + (Math.random()-0.5);
            p.y += p.vy + (Math.random()-0.5);
            ctx.fillRect(p.x, p.y, 2, 2);
        });
        requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </DemoContainer>
  );
}