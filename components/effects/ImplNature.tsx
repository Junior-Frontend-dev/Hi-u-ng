import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

interface ImplNatureProps {
  variant: string;
}

export default function ImplNature({ variant }: ImplNatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = canvas.width;
    let h = canvas.height;
    let tick = 0;
    
    // --- STATE STORAGE (Reset on variant change) ---
    const particles: any[] = [];
    const grid: any[] = []; // For sand/grid effects
    const mouse = { x: 0, y: 0, active: false };

    // --- UTILS ---
    const resize = () => {
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            w = canvas.width;
            h = canvas.height;
        }
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // --- EFFECT INITIALIZATION ---
    const init = () => {
        particles.length = 0;
        grid.length = 0;

        switch (variant) {
            case 'nature-rain-window':
                for(let i=0; i<100; i++) particles.push({
                    x: Math.random() * w, y: Math.random() * h,
                    l: Math.random() * 20 + 10, s: Math.random() * 10 + 15
                });
                break;
            case 'nature-snow-fall':
                for(let i=0; i<200; i++) particles.push({
                    x: Math.random() * w, y: Math.random() * h,
                    r: Math.random() * 3 + 1, d: Math.random() * 10
                });
                break;
            case 'nature-confetti':
                for(let i=0; i<100; i++) particles.push({
                    x: w/2, y: h,
                    vx: (Math.random() - 0.5) * 20, vy: -(Math.random() * 20 + 10),
                    c: `hsl(${Math.random()*360}, 100%, 50%)`, r: Math.random() * 10 + 5,
                    rot: Math.random() * 360, vRot: (Math.random()-0.5) * 10
                });
                break;
            case 'nature-starfield':
                for(let i=0; i<1000; i++) particles.push({
                    x: Math.random() * w - w/2, y: Math.random() * h - h/2, z: Math.random() * w
                });
                break;
            case 'nature-fire-flame':
                // Continuous emission in loop
                break;
            case 'nature-sand-grain':
                // Initialize grid for sand
                const cols = Math.floor(w / 4);
                const rows = Math.floor(h / 4);
                for(let i=0; i<cols*rows; i++) grid[i] = 0;
                break;
            case 'nature-galaxy-spiral':
                for(let i=0; i<500; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * 200;
                    particles.push({
                        angle, dist, speed: (1/dist) * 2, size: Math.random() * 2, color: `hsl(${200 + Math.random()*60}, 100%, 70%)`
                    });
                }
                break;
            case 'nature-flock-birds':
                for(let i=0; i<50; i++) particles.push({
                    x: Math.random() * w, y: Math.random() * h,
                    vx: Math.random() * 4 - 2, vy: Math.random() * 4 - 2
                });
                break;
            case 'nature-cloth-sim':
                const colsC = 20, rowsC = 15, sp = 20;
                const startX = (w - colsC * sp) / 2;
                for(let y=0; y<rowsC; y++) {
                    for(let x=0; x<colsC; x++) {
                        particles.push({
                            x: startX + x * sp, y: 50 + y * sp,
                            ox: startX + x * sp, oy: 50 + y * sp,
                            pin: y === 0
                        });
                    }
                }
                break;
            case 'nature-grass-sway':
                for(let i=0; i<w; i+=10) {
                    particles.push({
                        x: i, h: Math.random() * 50 + 50,
                        angle: Math.random() * 0.5 - 0.25,
                        stiffness: Math.random() * 0.05 + 0.02
                    });
                }
                break;
            case 'nature-bubbles-rise':
            case 'nature-bubble-rise':
                for(let i=0; i<50; i++) particles.push({
                    x: Math.random() * w, y: h + Math.random() * 100,
                    r: Math.random() * 10 + 5, s: Math.random() * 2 + 1,
                    wobble: Math.random() * Math.PI * 2
                });
                break;
        }
    };
    init();

    // --- MAIN RENDER LOOP ---
    const render = () => {
        if (!ctx) return;
        tick++;

        // Clear or Fade based on effect
        if (variant === 'nature-fire-flame' || variant === 'nature-starfield' || variant === 'nature-galaxy-spiral') {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails
            ctx.fillRect(0, 0, w, h);
        } else if (variant === 'nature-sand-grain') {
            // No clear for sand accumulation, or specific logic
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0,0,w,h);
        } else {
            ctx.clearRect(0, 0, w, h);
        }

        switch (variant) {
            case 'nature-rain-window':
                ctx.strokeStyle = 'rgba(174,194,224,0.5)';
                ctx.lineWidth = 2;
                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + p.l);
                    ctx.stroke();
                    p.y += p.s;
                    if (p.y > h) { p.y = -p.l; p.x = Math.random() * w; }
                });
                break;

            case 'nature-snow-fall':
                ctx.fillStyle = 'white';
                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
                    ctx.fill();
                    p.y += Math.cos(tick*0.01 + p.d) + 1 + p.r/2;
                    p.x += Math.sin(tick*0.01 + p.d) * 2;
                    if(p.x > w+5) p.x = -5;
                    if(p.x < -5) p.x = w+5;
                    if(p.y > h) p.y = -10;
                });
                break;

            case 'nature-water-ripple':
                if (Math.random() > 0.95 || mouse.active) {
                    particles.push({x: mouse.active ? mouse.x : Math.random()*w, y: mouse.active ? mouse.y : Math.random()*h, r: 0, a: 1});
                    mouse.active = false;
                }
                ctx.lineWidth = 2;
                for(let i=0; i<particles.length; i++) {
                    const p = particles[i];
                    p.r += 2; p.a -= 0.01;
                    if(p.a <= 0) { particles.splice(i,1); i--; continue; }
                    ctx.strokeStyle = `rgba(56,189,248,${p.a})`;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.stroke();
                }
                break;

            case 'nature-leaves-wind':
                if(particles.length < 50) particles.push({x: Math.random()*w, y: -20, r: Math.random()*360, vr: (Math.random()-0.5)*5, s: Math.random()*2+2});
                particles.forEach((p, i) => {
                    p.y += p.s; p.x += Math.sin(tick*0.02 + i)*2; p.r += p.vr;
                    if(p.y > h) { particles.splice(i,1); }
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.r * Math.PI/180);
                    ctx.fillStyle = '#fbbf24';
                    ctx.beginPath();
                    ctx.ellipse(0,0, 10, 5, 0, 0, Math.PI*2);
                    ctx.fill();
                    ctx.restore();
                });
                break;

            case 'nature-fire-flame':
                ctx.globalCompositeOperation = 'lighter';
                for(let i=0; i<5; i++) {
                    particles.push({x: w/2 + (Math.random()-0.5)*50, y: h, vy: Math.random()*3+2, life: 1, max: Math.random()*50+50, s: Math.random()*20+10});
                }
                for(let i=0; i<particles.length; i++) {
                    const p = particles[i];
                    p.y -= p.vy; p.life -= 0.02; p.s *= 0.98;
                    if(p.life <= 0 || p.s < 0.5) { particles.splice(i,1); i--; continue; }
                    const r = 255;
                    const g = Math.floor(255 * p.life);
                    const b = Math.floor(50 * p.life);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
                    ctx.fillStyle = `rgba(${r},${g},${b},${p.life})`;
                    ctx.fill();
                }
                ctx.globalCompositeOperation = 'source-over';
                break;

            case 'nature-gravity-balls':
                if(particles.length < 5 && Math.random() > 0.98) {
                    particles.push({x: Math.random()*w, y: 0, vx: (Math.random()-0.5)*10, vy: 0, r: Math.random()*20+10, color: `hsl(${Math.random()*360},70%,50%)`});
                }
                particles.forEach(p => {
                    p.vy += 0.5; p.x += p.vx; p.y += p.vy;
                    if(p.y + p.r > h) { p.y = h - p.r; p.vy *= -0.8; p.vx *= 0.95; }
                    if(p.x + p.r > w || p.x - p.r < 0) { p.vx *= -0.8; p.x = p.x < 0 ? p.r : w-p.r; }
                    ctx.fillStyle = p.color;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
                });
                break;

            case 'nature-confetti':
                if(mouse.active) {
                    for(let i=0; i<5; i++) particles.push({
                        x: mouse.x, y: mouse.y, vx: (Math.random()-0.5)*20, vy: (Math.random()-0.5)*20,
                        c: `hsl(${Math.random()*360},100%,50%)`, r: Math.random()*8+2, rot: 0, vRot: (Math.random()-0.5)*20
                    });
                    mouse.active = false;
                }
                particles.forEach((p, i) => {
                    p.vy += 0.2; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vRot;
                    if(p.y > h) { particles.splice(i,1); return; }
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot * Math.PI/180);
                    ctx.fillStyle = p.c;
                    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
                    ctx.restore();
                });
                if (particles.length === 0) {
                    ctx.fillStyle = 'white';
                    ctx.font = '20px monospace';
                    ctx.fillText('Click to pop confetti!', w/2 - 100, h/2);
                }
                break;

            case 'nature-starfield':
                ctx.fillStyle = 'white';
                particles.forEach(p => {
                    p.z -= 10;
                    if(p.z <= 0) { p.z = w; p.x = Math.random()*w - w/2; p.y = Math.random()*h - h/2; }
                    const sx = (p.x / p.z) * w + w/2;
                    const sy = (p.y / p.z) * h + h/2;
                    const s = (1 - p.z/w) * 3;
                    if(sx>0 && sx<w && sy>0 && sy<h) ctx.fillRect(sx, sy, s, s);
                });
                break;

            case 'nature-fog-roll':
                // Simple Perlin-like scrolling fog using transparent rects
                for(let i=0; i<50; i++) {
                    const x = (tick + i * 50) % (w + 200) - 100;
                    const y = Math.sin(tick * 0.01 + i) * 50 + h/2;
                    const s = 100 + Math.sin(i)*50;
                    const alpha = 0.05 + Math.sin(tick*0.005 + i)*0.02;
                    ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;
                    ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI*2); ctx.fill();
                }
                break;

            case 'nature-sun-rays':
                const cx = w/2, cy = h/2;
                ctx.translate(cx, cy);
                ctx.rotate(tick * 0.002);
                const rays = 20;
                for(let i=0; i<rays; i++) {
                    ctx.rotate((Math.PI*2)/rays);
                    ctx.fillStyle = 'rgba(255, 200, 50, 0.05)';
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(100, -w);
                    ctx.lineTo(-100, -w);
                    ctx.fill();
                }
                ctx.setTransform(1,0,0,1,0,0);
                // Sun
                ctx.shadowBlur = 50; ctx.shadowColor = 'orange';
                ctx.fillStyle = '#fbbf24';
                ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI*2); ctx.fill();
                ctx.shadowBlur = 0;
                break;

            case 'nature-grass-sway':
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                particles.forEach(p => {
                    const sway = Math.sin(tick * 0.02 + p.x * 0.01) * 20 * p.stiffness;
                    ctx.beginPath();
                    ctx.moveTo(p.x, h);
                    ctx.quadraticCurveTo(p.x, h - p.h/2, p.x + sway + (mouse.x - p.x)*0.1, h - p.h);
                    ctx.stroke();
                });
                break;

            case 'nature-jellyfish':
                const jx = w/2, jy = h/2 + Math.sin(tick*0.02)*20;
                // Head
                ctx.fillStyle = 'rgba(232, 121, 249, 0.2)';
                ctx.strokeStyle = 'rgba(232, 121, 249, 0.8)';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(jx, jy, 40, Math.PI, 0); 
                ctx.bezierCurveTo(jx+40, jy+20, jx-40, jy+20, jx-40, jy);
                ctx.fill(); ctx.stroke();
                // Tentacles
                for(let i=0; i<5; i++) {
                    ctx.beginPath();
                    ctx.moveTo(jx - 30 + i*15, jy+10);
                    for(let j=0; j<10; j++) {
                        ctx.lineTo(
                            jx - 30 + i*15 + Math.sin(tick*0.1 + j + i)*10, 
                            jy + 10 + j*10
                        );
                    }
                    ctx.stroke();
                }
                break;

            case 'nature-galaxy-spiral':
                ctx.translate(w/2, h/2);
                particles.forEach(p => {
                    const r = p.dist;
                    const a = p.angle + tick * p.speed * 0.01;
                    const x = Math.cos(a) * r;
                    const y = Math.sin(a) * r;
                    ctx.fillStyle = p.color;
                    ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI*2); ctx.fill();
                });
                ctx.setTransform(1,0,0,1,0,0);
                break;

            case 'nature-lightning':
                if (Math.random() > 0.95) {
                    let lx = Math.random() * w;
                    let ly = 0;
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 2;
                    ctx.shadowBlur = 20; ctx.shadowColor = 'cyan';
                    ctx.beginPath();
                    ctx.moveTo(lx, ly);
                    while(ly < h) {
                        lx += (Math.random()-0.5) * 50;
                        ly += Math.random() * 50;
                        ctx.lineTo(lx, ly);
                    }
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                    // Flash
                    ctx.fillStyle = 'rgba(255,255,255,0.1)';
                    ctx.fillRect(0,0,w,h);
                }
                break;

            case 'nature-bubbles-rise':
            case 'nature-bubble-rise':
                ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                ctx.lineWidth = 1;
                particles.forEach(p => {
                    p.y -= p.s;
                    p.x += Math.sin(tick * 0.05 + p.wobble) * 0.5;
                    if(p.y < -20) { p.y = h+20; p.x = Math.random()*w; }
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.stroke();
                    // Shine
                    ctx.beginPath(); ctx.arc(p.x - p.r*0.3, p.y - p.r*0.3, p.r*0.2, 0, Math.PI*2); 
                    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.fill();
                });
                break;

            case 'nature-sand-grain':
                // Cellular Automata (Simplified)
                const cols = Math.floor(w / 4);
                const rows = Math.floor(h / 4);
                if (mouse.active) {
                    const mx = Math.floor(mouse.x / 4);
                    const my = Math.floor(mouse.y / 4);
                    if(mx>=0 && mx<cols && my>=0 && my<rows) {
                        grid[my * cols + mx] = 1;
                        grid[my * cols + mx + 1] = 1;
                        grid[(my+1) * cols + mx] = 1;
                    }
                }
                // Update
                for (let y = rows-2; y >= 0; y--) {
                    for (let x = 0; x < cols; x++) {
                        const i = y * cols + x;
                        if (grid[i] === 1) {
                            const below = (y+1) * cols + x;
                            const belowLeft = (y+1) * cols + (x-1);
                            const belowRight = (y+1) * cols + (x+1);
                            
                            if (grid[below] === 0) {
                                grid[below] = 1; grid[i] = 0;
                            } else if (Math.random() > 0.5 && x>0 && grid[belowLeft] === 0) {
                                grid[belowLeft] = 1; grid[i] = 0;
                            } else if (x<cols-1 && grid[belowRight] === 0) {
                                grid[belowRight] = 1; grid[i] = 0;
                            }
                        }
                    }
                }
                // Draw
                ctx.fillStyle = '#fde047';
                for(let i=0; i<grid.length; i++) {
                    if(grid[i] === 1) {
                        const x = (i % cols) * 4;
                        const y = Math.floor(i / cols) * 4;
                        ctx.fillRect(x, y, 4, 4);
                    }
                }
                if (grid.every(v => v === 0)) {
                     ctx.fillStyle = 'white';
                     ctx.font = '20px monospace';
                     ctx.fillText('Draw with mouse to drop sand', w/2 - 150, h/2);
                }
                break;

            case 'nature-flock-birds':
                // Simple Boids
                ctx.fillStyle = 'white';
                particles.forEach(p => {
                    p.x += p.vx; p.y += p.vy;
                    if(p.x > w) p.x = 0; if(p.x < 0) p.x = w;
                    if(p.y > h) p.y = 0; if(p.y < 0) p.y = h;
                    
                    // Mouse avoid
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 100) {
                        p.vx += dx/dist * 0.5;
                        p.vy += dy/dist * 0.5;
                    }
                    // Limit speed
                    const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
                    if(speed > 4) { p.vx = (p.vx/speed)*4; p.vy = (p.vy/speed)*4; }

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
                    ctx.fill();
                    // Draw velocity line
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx*3, p.y - p.vy*3); ctx.stroke();
                });
                break;
            
            case 'nature-smoke-plume':
                if(tick % 5 === 0) particles.push({x: w/2 + (Math.random()-0.5)*20, y: h, vy: Math.random()*2+1, life: 1, s: Math.random()*20+10});
                particles.forEach((p, i) => {
                    p.y -= p.vy; p.life -= 0.005; p.s += 0.5; p.x += Math.sin(tick*0.01)*0.5;
                    if(p.life <= 0) { particles.splice(i,1); return; }
                    ctx.fillStyle = `rgba(100,100,100,${p.life * 0.2})`;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
                });
                break;
            
            case 'nature-ink-water':
                if(mouse.active || (tick === 1)) {
                    particles.push({x: mouse.active ? mouse.x : w/2, y: mouse.active ? mouse.y : h/2, r: 0, color: `hsl(${Math.random()*360},70%,50%)`});
                    mouse.active = false;
                }
                particles.forEach((p, i) => {
                    p.r += 1;
                    if(p.r > Math.max(w,h)) particles.splice(i,1);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = Math.max(0, 1 - p.r/500);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                });
                break;

            case 'nature-cloth-sim':
                // Simple cloth points draw
                ctx.strokeStyle = 'white';
                ctx.beginPath();
                particles.forEach((p, i) => {
                    // Sim step would go here, simplified for display
                    // Assuming existing sim logic or just drawing points
                    if (!p.pin) {
                        p.y += 0.5; // Gravity
                        const dx = p.x - mouse.x; const dy = p.y - mouse.y;
                        if (Math.sqrt(dx*dx + dy*dy) < 50) { p.x += dx*0.1; p.y += dy*0.1; }
                    }
                    // Constraint
                    if (i > 0 && i % 20 !== 0) {
                        const prev = particles[i-1];
                        ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y);
                    }
                    if (i >= 20) {
                        const top = particles[i-20];
                        ctx.moveTo(top.x, top.y); ctx.lineTo(p.x, p.y);
                    }
                });
                ctx.stroke();
                if (particles.length > 0) {
                    ctx.fillStyle='white'; ctx.fillText('Interact with mouse to tear (simulated)', 20, 30);
                }
                break;
        }

        animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <DemoContainer>
      <div ref={containerRef} className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      </div>
    </DemoContainer>
  );
}