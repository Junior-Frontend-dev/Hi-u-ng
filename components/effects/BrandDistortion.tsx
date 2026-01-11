import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    let time = 0;

    const render = () => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        const text = "SIGNAL";
        const fontSize = 150;
        ctx.font = `900 ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const cx = width / 2;
        const cy = height / 2;

        // Draw distorted slices
        const numSlices = 20;
        const sliceHeight = fontSize / numSlices;

        for (let i = 0; i < numSlices; i++) {
            // Wave calculation
            const offset = Math.sin(time * 0.05 + i * 0.5) * 20 * Math.sin(time * 0.02);
            const y = cy - fontSize/2 + i * sliceHeight;

            ctx.save();
            // Clip region for this slice
            ctx.beginPath();
            ctx.rect(0, y, width, sliceHeight + 1); // +1 to prevent gaps
            ctx.clip();

            // RGB Split for Brand Style
            // R
            ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.fillText(text, cx + offset + 5, cy);
            
            // B
            ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            ctx.globalCompositeOperation = 'screen';
            ctx.fillText(text, cx + offset - 5, cy);

            // G/White
            ctx.fillStyle = '#fff';
            ctx.fillText(text, cx + offset, cy);

            ctx.restore();
        }

        time++;
        requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    const raf = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute bottom-8 left-8 text-white/40 font-mono text-sm">
            ERROR_LOG_2049: INTEGRITY_FAIL
        </div>
      </div>
    </DemoContainer>
  );
}