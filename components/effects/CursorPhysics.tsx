import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const mouse = { x: width/2, y: height/2 };
    // Ball props
    const ball = { x: width/2, y: height/2, vx: 0, vy: 0, r: 20 };
    const springStrength = 0.05;
    const friction = 0.9;

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
        // Reset ball to center when mouse leaves
        ball.x = width / 2;
        ball.y = height / 2;
        ball.vx = 0;
        ball.vy = 0;
        mouse.x = width / 2;
        mouse.y = height / 2;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const update = () => {
        // Spring to mouse
        const dx = mouse.x - ball.x;
        const dy = mouse.y - ball.y;
        ball.vx += dx * springStrength;
        ball.vy += dy * springStrength;

        // Apply Physics
        ball.vx *= friction;
        ball.vy *= friction;
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collision
        if (ball.x + ball.r > width) { ball.x = width - ball.r; ball.vx *= -0.5; }
        if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx *= -0.5; }
        if (ball.y + ball.r > height) { ball.y = height - ball.r; ball.vy *= -0.5; }
        if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -0.5; }

        // Render
        ctx.clearRect(0, 0, width, height);
        
        // Draw Tether
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.stroke();

        // Draw Ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();

        // Draw Mouse Point
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        requestAnimationFrame(update);
    };
    const rafId = requestAnimationFrame(update);

    const resize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', resize);

    return () => {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
      <div className="h-full w-full bg-black relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-white/20 font-bold text-2xl">Elastic Physics</h2>
        </div>
      </div>
    </DemoContainer>
  );
}