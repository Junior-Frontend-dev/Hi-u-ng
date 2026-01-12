import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

interface ImplDataProps {
  variant: string;
}

export default function ImplData({ variant }: ImplDataProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('ImplData: Canvas context not available for', variant);
      return;
    }

    let animationId: number;
    let w = canvas.width;
    let h = canvas.height;
    let tick = 0;
    let isMounted = true;
    const mouse = { x: w/2, y: h/2 };

    const resize = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        w = canvas.width;
        h = canvas.height;
        if (w === 0 || h === 0) {
            w = canvas.width = 800;
            h = canvas.height = 600;
        }
    };
    window.addEventListener('resize', resize);
    resize();

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    const particles: any[] = [];
    const nodes: any[] = [];
    
    const init = () => {
        particles.length = 0;
        nodes.length = 0;

        try {
            switch (variant) {
                case 'data-network-force':
                    for(let i=0; i<50; i++) nodes.push({
                        x: Math.random()*w, y: Math.random()*h,
                        vx: (Math.random()-0.5), vy: (Math.random()-0.5),
                        r: Math.random()*3+2
                    });
                    break;
                case 'data-globe-spin':
                    for(let i=0; i<400; i++) {
                        const theta = Math.acos(2 * Math.random() - 1);
                        const phi = Math.sqrt(400 * Math.PI) * theta;
                        const r = 150;
                        nodes.push({
                            x: r * Math.sin(theta) * Math.cos(phi),
                            y: r * Math.sin(theta) * Math.sin(phi),
                            z: r * Math.cos(theta)
                        });
                    }
                    break;
                case 'data-bar-race':
                    for(let i=0; i<10; i++) nodes.push({
                        val: Math.random()*w*0.8,
                        target: Math.random()*w*0.8,
                        color: `hsl(${i*36}, 70%, 60%)`,
                        label: `Data ${i+1}`
                    });
                    break;
                case 'data-radar-scan':
                    break;
                case 'data-scatter-gravity':
                    for(let i=0; i<100; i++) particles.push({
                        x: Math.random()*w, y: -Math.random()*h,
                        vy: 0, vx: 0, r: Math.random()*4+2,
                        targetY: h - 50 - Math.random()*200,
                        color: i % 2 === 0 ? '#10b981' : '#3b82f6'
                    });
                    break;
            }
        } catch (e) {
            console.warn('ImplData init error:', e);
        }
    };
    init();

    const render = () => {
        if (!isMounted || !ctx) return;
        
        try {
            tick++;
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, w, h);

            switch (variant) {
                case 'data-network-force':
                    ctx.fillStyle = '#3b82f6';
                    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
                    nodes.forEach(p => {
                        p.x += p.vx; p.y += p.vy;
                        if(p.x<0 || p.x>w) p.vx*=-1;
                        if(p.y<0 || p.y>h) p.vy*=-1;
                        
                        const dx = p.x - mouse.x;
                        const dy = p.y - mouse.y;
                        const d = Math.sqrt(dx*dx + dy*dy);
                        if(d < 100) {
                            p.x += dx/d * 2;
                            p.y += dy/d * 2;
                        }

                        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
                    });
                    for(let i=0; i<nodes.length; i++) {
                        for(let j=i+1; j<nodes.length; j++) {
                            const dx = nodes[i].x - nodes[j].x;
                            const dy = nodes[i].y - nodes[j].y;
                            const dist = Math.sqrt(dx*dx + dy*dy);
                            if(dist < 100) {
                                ctx.lineWidth = 1 - dist/100;
                                ctx.beginPath();
                                ctx.moveTo(nodes[i].x, nodes[i].y);
                                ctx.lineTo(nodes[j].x, nodes[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                    break;

                case 'data-globe-spin':
                    const cx = w/2, cy = h/2;
                    ctx.fillStyle = 'white';
                    const angleY = tick * 0.01;
                    const angleX = mouse.y * 0.005;
                    
                    nodes.forEach(p => {
                        let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
                        let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
                        let y = p.y * Math.cos(0.2) - z * Math.sin(0.2);
                        z = p.y * Math.sin(0.2) + z * Math.cos(0.2);

                        const scale = 300 / (300 - z);
                        const alpha = (z + 150) / 300;
                        
                        if (scale > 0) {
                            ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
                            ctx.beginPath();
                            ctx.arc(cx + x * scale, cy + y * scale, 2 * scale, 0, Math.PI*2);
                            ctx.fill();
                        }
                    });
                    ctx.globalAlpha = 1;
                    break;

                case 'data-radar-scan':
                    const rx = w/2, ry = h/2, rr = 150;
                    ctx.strokeStyle = '#10b981';
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.arc(rx, ry, rr, 0, Math.PI*2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(rx, ry, rr*0.6, 0, Math.PI*2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(rx, ry, rr*0.3, 0, Math.PI*2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(rx-rr, ry); ctx.lineTo(rx+rr, ry); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(rx, ry-rr); ctx.lineTo(rx, ry+rr); ctx.stroke();
                    
                    ctx.save();
                    ctx.translate(rx, ry);
                    ctx.rotate(tick * 0.05);
                    const grad = ctx.createConicGradient(0, 0, 0);
                    grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
                    grad.addColorStop(0.8, 'rgba(16, 185, 129, 0)');
                    grad.addColorStop(1, 'rgba(16, 185, 129, 0.5)');
                    ctx.fillStyle = grad;
                    ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                    
                    if(Math.random() > 0.95) particles.push({x: (Math.random()-0.5)*200, y: (Math.random()-0.5)*200, life: 1});
                    particles.forEach((p, i) => {
                        p.life -= 0.02;
                        if(p.life <= 0) { particles.splice(i,1); return; }
                        ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
                        ctx.beginPath(); ctx.arc(rx+p.x, ry+p.y, 3, 0, Math.PI*2); ctx.fill();
                    });
                    break;

                case 'data-bar-race':
                    nodes.forEach((bar, i) => {
                        if(Math.random() > 0.98) bar.target = Math.random() * w * 0.7 + 50;
                        bar.val += (bar.target - bar.val) * 0.05;
                        
                        const y = 50 + i * 40;
                        ctx.fillStyle = bar.color;
                        ctx.fillRect(100, y, bar.val, 20);
                        
                        ctx.fillStyle = 'white';
                        ctx.font = '12px monospace';
                        ctx.textAlign = 'right';
                        ctx.fillText(bar.label, 90, y + 14);
                        ctx.textAlign = 'left';
                        ctx.fillText(Math.floor(bar.val).toString(), 100 + bar.val + 10, y + 14);
                    });
                    break;

                case 'data-scatter-gravity':
                    ctx.strokeStyle = '#333';
                    ctx.beginPath(); ctx.moveTo(0, h-50); ctx.lineTo(w, h-50); ctx.stroke();
                    
                    particles.forEach(p => {
                        p.vy += 0.5;
                        p.y += p.vy;
                        
                        if (p.y > p.targetY) {
                            p.y = p.targetY;
                            p.vy *= -0.5;
                        }
                        
                        ctx.fillStyle = p.color;
                        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
                    });
                    break;
                    
                case 'data-stream-flow':
                    ctx.fillStyle = 'rgba(0,0,0,0.1)';
                    ctx.fillRect(0,0,w,h);
                    ctx.font = '14px monospace';
                    if(particles.length === 0) {
                        for(let i=0; i<w/20; i++) particles.push({x: i*20, y: Math.random()*h, v: Math.random()*5+2});
                    }
                    particles.forEach(p => {
                        ctx.fillStyle = '#0ff';
                        ctx.fillText(Math.random()>0.5?'1':'0', p.x, p.y);
                        p.y += p.v;
                        if(p.y > h) p.y = 0;
                    });
                    break;
            }
        } catch (e) {
            console.warn('ImplData render error:', e);
        }

        animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
        isMounted = false;
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        if (animationId) cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <DemoContainer>
      <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      </div>
    </DemoContainer>
  );
}
