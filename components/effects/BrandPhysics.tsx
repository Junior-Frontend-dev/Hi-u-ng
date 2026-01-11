import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    interface Body {
        x: number, y: number, w: number, h: number, 
        vx: number, vy: number, 
        angle: number, vAngle: number, 
        color: string, isDragging: boolean
    }

    const bodies: Body[] = [];
    const gravity = 0.5;
    const bounce = -0.6;
    const friction = 0.99;
    let dragBody: Body | null = null;

    const addLogo = (x: number, y: number) => {
        bodies.push({
            x, y, 
            w: 60, h: 60, 
            vx: (Math.random() - 0.5) * 10, 
            vy: (Math.random() - 0.5) * 10,
            angle: Math.random() * Math.PI * 2,
            vAngle: (Math.random() - 0.5) * 0.2,
            color: Math.random() > 0.5 ? '#171717' : '#2563eb',
            isDragging: false
        });
    };

    // Initial drops
    for(let i=0; i<5; i++) addLogo(width/2 + (Math.random()-0.5)*100, 50 + i * -100);

    const update = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < bodies.length; i++) {
            const b = bodies[i];
            
            if (b.isDragging) {
                // Drag logic handled in mousemove
                b.vx = 0;
                b.vy = 0;
            } else {
                // Physics
                b.vy += gravity;
                b.vx *= friction;
                b.vy *= friction;
                b.x += b.vx;
                b.y += b.vy;
                b.angle += b.vAngle;

                // Floor Collision
                if (b.y + b.h/2 > height) {
                    b.y = height - b.h/2;
                    b.vy *= bounce;
                    b.vx *= 0.8; // Floor friction
                    b.vAngle *= 0.9;
                }
                // Walls
                if (b.x + b.w/2 > width) { b.x = width - b.w/2; b.vx *= bounce; }
                if (b.x - b.w/2 < 0) { b.x = b.w/2; b.vx *= bounce; }
            }

            // Render
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.rotate(b.angle);
            ctx.shadowBlur = 20;
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.fillStyle = b.color;
            // Rounded Rect
            const r = 10;
            ctx.beginPath();
            ctx.roundRect(-b.w/2, -b.h/2, b.w, b.h, r);
            ctx.fill();
            
            // Text "B"
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 30px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('B', 0, 0);
            
            ctx.restore();
        }

        requestAnimationFrame(update);
    };
    
    const raf = requestAnimationFrame(update);

    const getMousePos = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseDown = (e: MouseEvent) => {
        const m = getMousePos(e);
        // Check collision (simple circle approx)
        for(let i=bodies.length-1; i>=0; i--) {
            const b = bodies[i];
            const dist = Math.sqrt((m.x - b.x)**2 + (m.y - b.y)**2);
            if (dist < 40) {
                b.isDragging = true;
                dragBody = b;
                return;
            }
        }
        // If clicked empty space, spawn
        addLogo(m.x, m.y);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragBody) {
            const m = getMousePos(e);
            // Calculate velocity for throw
            dragBody.vx = (m.x - dragBody.x) * 0.5;
            dragBody.vy = (m.y - dragBody.y) * 0.5;
            dragBody.x = m.x;
            dragBody.y = m.y;
        }
    };

    const handleMouseUp = () => {
        if (dragBody) {
            dragBody.isDragging = false;
            dragBody = null;
        }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
        <div className="absolute top-8 left-0 w-full text-center text-black/30 pointer-events-none select-none">
            Click to Spawn. Drag to Throw.
        </div>
      </div>
    </DemoContainer>
  );
}