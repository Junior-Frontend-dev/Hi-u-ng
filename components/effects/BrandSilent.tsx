import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandSilent() {
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

        const cx = width / 2;
        const cy = height / 2;
        const baseSize = 100;

        // Animate Shape: Circle -> Square -> Triangle -> Circle
        // Cycle is 0 to 3
        const cycle = (time * 0.01) % 3;
        
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;

        if (cycle < 1) {
            // Circle to Square
            const t = cycle; // 0 to 1
            const r = baseSize;
            // Draw rounded rect that becomes sharp
            const corner = r * (1 - t);
            ctx.roundRect(cx - r, cy - r, r*2, r*2, corner);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.fillText("ADAPT", cx - 20, cy + 150);
        } else if (cycle < 2) {
            // Square to Triangle
            const t = cycle - 1; // 0 to 1
            const r = baseSize;
            
            // Square points
            const s1 = {x: cx - r, y: cy - r};
            const s2 = {x: cx + r, y: cy - r};
            const s3 = {x: cx + r, y: cy + r};
            const s4 = {x: cx - r, y: cy + r};

            // Triangle points
            const tr1 = {x: cx, y: cy - r * 1.2};
            const tr2 = {x: cx + r, y: cy + r};
            const tr3 = {x: cx - r, y: cy + r};

            // Interpolate
            const p1 = { x: s1.x + (tr1.x - s1.x) * t, y: s1.y + (tr1.y - s1.y) * t };
            const p2 = { x: s2.x + (tr1.x - s2.x) * t, y: s2.y + (tr1.y - s2.y) * t }; // Merge top corners
            const p3 = { x: s3.x + (tr2.x - s3.x) * t, y: s3.y + (tr2.y - s3.y) * t };
            const p4 = { x: s4.x + (tr3.x - s4.x) * t, y: s4.y + (tr3.y - s4.y) * t };

            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillText("TRANSFORM", cx - 35, cy + 150);
        } else {
            // Triangle to Circle
            const t = cycle - 2; // 0 to 1
            const r = baseSize;
            
            // Just fade in circle over triangle for simplicity of this stage or use complex bezier morph
            // Let's do simple scale bounce
            ctx.beginPath();
            ctx.moveTo(cx, cy - r * 1.2 * (1-t));
            ctx.lineTo(cx + r * (1-t), cy + r * (1-t));
            ctx.lineTo(cx - r * (1-t), cy + r * (1-t));
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx, cy, r * t, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.fillText("EVOLVE", cx - 25, cy + 150);
        }

        time++;
        requestAnimationFrame(render);
    };
    const raf = requestAnimationFrame(render);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
        ctx.font = '12px monospace';
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-black">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </DemoContainer>
  );
}