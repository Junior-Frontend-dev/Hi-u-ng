import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VietnamDrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;
    let time = 0;

    // Helper to draw repetitive ring patterns
    const drawPatternRing = (radius: number, count: number, type: 'triangle' | 'circle' | 'bird' | 'deer', rotation: number) => {
        ctx.save();
        ctx.rotate(rotation);
        const angleStep = (Math.PI * 2) / count;
        
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI/2); // Face center

            if (type === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -5);
                ctx.lineTo(4, 5);
                ctx.lineTo(-4, 5);
                ctx.closePath();
                ctx.fill();
            } else if (type === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(0, 0, 1, 0, Math.PI * 2); // Center dot
                ctx.fillStyle = '#78350f'; // Darker center
                ctx.fill();
                ctx.fillStyle = 'rgba(252, 211, 77, 0.4)'; // Reset
            } else if (type === 'bird') {
                // Stylized Lac Bird (Chim Lạc)
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-12, 6); // Wing L
                ctx.lineTo(0, -18); // Head / Beak
                ctx.lineTo(12, 6);  // Wing R
                ctx.lineTo(0, 22);  // Tail feathers
                ctx.closePath();
                ctx.stroke();
            } else if (type === 'deer') {
                // Stylized Deer (Hươu)
                ctx.beginPath();
                ctx.moveTo(-5, 0);
                ctx.lineTo(5, 0);
                ctx.lineTo(0, -10);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
        }
        ctx.restore();
    };

    const render = () => {
        ctx.fillStyle = '#0f0c05'; // Deep dark bronze background
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        
        // Interaction: Mouse moves influence the base rotation speed
        // If mouse is active, rotate towards it slightly or spin faster
        const baseRot = time * 0.001 + (mouseRef.current.x / width) * 0.2;

        // --- Metallic Shader Gradient for Drum Face ---
        // Simulates light hitting a bronze surface
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 320);
        grad.addColorStop(0, '#f59e0b');   // Amber 500 (Center highlight)
        grad.addColorStop(0.2, '#b45309'); // Amber 700
        grad.addColorStop(0.5, '#78350f'); // Amber 900
        grad.addColorStop(0.9, '#292524'); // Stone 800
        grad.addColorStop(1, '#0c0a09');   // Stone 950 (Edge)
        
        ctx.save();
        ctx.translate(cx, cy);
        
        // Draw Main Drum Face
        ctx.beginPath();
        ctx.arc(0, 0, 300, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        
        // Outer Rim Glow
        ctx.strokeStyle = '#fcd34d'; 
        ctx.lineWidth = 4;
        ctx.stroke();

        // --- THE SUN (Center Star) ---
        ctx.fillStyle = '#fffbeb'; // Pale Gold
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#fbbf24';
        const sunSpikes = 14; // Traditional number
        ctx.beginPath();
        for(let i=0; i<sunSpikes * 2; i++) {
            const r = i % 2 === 0 ? 50 : 15;
            const a = (Math.PI * 2 * i) / (sunSpikes * 2) + time * 0.005; // Slow rotate
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for rings

        // --- CONCENTRIC RINGS OF HISTORY ---
        // Styles for patterns
        ctx.fillStyle = 'rgba(252, 211, 77, 0.5)'; 
        ctx.strokeStyle = 'rgba(252, 211, 77, 0.7)';
        ctx.lineWidth = 1.5;
        
        // Ring 1: Inner Geometric
        drawPatternRing(70, 30, 'triangle', baseRot);
        ctx.beginPath(); ctx.arc(0,0, 85, 0, Math.PI*2); ctx.stroke(); // Separator

        // Ring 2: Circles (Anticlockwise)
        drawPatternRing(100, 40, 'circle', -baseRot * 1.5); 
        ctx.beginPath(); ctx.arc(0,0, 115, 0, Math.PI*2); ctx.stroke();

        // Ring 3: Lac Birds (Flying Clockwise - Faster)
        ctx.lineWidth = 2;
        drawPatternRing(160, 16, 'bird', baseRot * 2 + time * 0.002);
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0,0, 200, 0, Math.PI*2); ctx.stroke();

        // Ring 4: Deer/Animals (Anticlockwise)
        drawPatternRing(230, 24, 'triangle', -baseRot + 0.5); // Simplified to triangles for visual balance
        ctx.beginPath(); ctx.arc(0,0, 260, 0, Math.PI*2); ctx.stroke();

        // Ring 5: Outer Teeth
        drawPatternRing(280, 80, 'triangle', baseRot * 0.5);
        
        ctx.restore();

        // --- DYNAMIC LIGHTING OVERLAY ---
        // Simulates a light source moving with the mouse or time
        const mx = mouseRef.current.active ? mouseRef.current.x : width/2 + Math.cos(time*0.02)*150;
        const my = mouseRef.current.active ? mouseRef.current.y : height/2 + Math.sin(time*0.02)*150;
        
        const shine = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
        shine.addColorStop(0, 'rgba(255,255,255,0.2)'); // Hotspot
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        
        // Composite mode to add light on top
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = shine;
        ctx.fillRect(0,0,width,height);
        ctx.globalCompositeOperation = 'source-over';

        // --- CULTURAL PARTICLES ---
        // Gold dust floating
        ctx.fillStyle = '#fbbf24';
        for(let i=0; i<30; i++) {
            const angle = (time * 0.01 + i) % (Math.PI*2);
            const radius = 300 + Math.sin(time * 0.03 + i) * 30;
            const px = cx + Math.cos(angle) * radius;
            const py = cy + Math.sin(angle) * radius;
            
            ctx.globalAlpha = 0.3 + Math.sin(time * 0.1 + i) * 0.3;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI*2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        time += 1;
        requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true
        };
    };
    
    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    const raf = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-[#0f0c05] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute top-10 left-10 z-20 select-none pointer-events-none">
            <h2 className="text-yellow-500 font-serif text-3xl tracking-widest drop-shadow-md">ĐÔNG SƠN</h2>
            <p className="text-yellow-700 text-xs mt-1 uppercase tracking-[0.5em]">Bronze Drum</p>
        </div>
      </div>
    </DemoContainer>
  );
}