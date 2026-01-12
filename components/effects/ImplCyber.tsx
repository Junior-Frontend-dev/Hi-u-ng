import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

interface ImplCyberProps {
  variant: string;
}

export default function ImplCyber({ variant }: ImplCyberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = canvas.width;
    let h = canvas.height;
    let tick = 0;
    const mouse = { x: w/2, y: h/2 };

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
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // --- STATE & ASSETS ---
    const particles: any[] = [];
    let matrixCols: number[] = [];
    const text = "CYBERPUNK";
    
    const init = () => {
        particles.length = 0;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        switch (variant) {
            case 'cyber-matrix-rain':
                const fontSize = 16;
                const columns = Math.floor(w / fontSize);
                matrixCols = Array(columns).fill(1);
                break;
            case 'cyber-circuit-board':
                for(let i=0; i<20; i++) {
                    particles.push({
                        x: Math.random()*w, y: Math.random()*h,
                        vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4,
                        path: []
                    });
                }
                break;
            case 'cyber-hud-ui':
                // HUD rings setup
                break;
        }
    };
    init();

    // --- RENDER LOOP ---
    const render = () => {
        tick++;
        
        // Default Clear
        if (variant !== 'cyber-matrix-rain' && variant !== 'cyber-data-mosh') {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, w, h);
        }

        switch (variant) {
            case 'cyber-glitch-text':
                ctx.fillStyle = 'black'; ctx.fillRect(0,0,w,h);
                ctx.font = 'bold 80px monospace';
                ctx.fillStyle = 'white';
                
                // RGB Split
                const offsetX = Math.sin(tick*0.2) * 5 + (Math.random()-0.5)*5;
                const offsetY = Math.random() > 0.9 ? (Math.random()-0.5)*10 : 0;
                
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = '#f0f';
                ctx.fillText(text, w/2 - offsetX, h/2 - offsetY);
                ctx.fillStyle = '#0ff';
                ctx.fillText(text, w/2 + offsetX, h/2 + offsetY);
                ctx.fillStyle = 'white';
                ctx.fillText(text, w/2, h/2);
                ctx.globalCompositeOperation = 'source-over';

                // Slice glitch
                if (Math.random() > 0.9) {
                    const sliceH = Math.random() * 50;
                    const sliceY = Math.random() * h;
                    const shift = (Math.random()-0.5) * 50;
                    const imgData = ctx.getImageData(0, sliceY, w, sliceH);
                    ctx.putImageData(imgData, shift, sliceY);
                }
                break;

            case 'cyber-matrix-rain':
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#0F0';
                ctx.font = '16px monospace';
                
                matrixCols.forEach((y, i) => {
                    const char = String.fromCharCode(0x30A0 + Math.random() * 96);
                    const x = i * 16;
                    ctx.fillText(char, x, y * 16);
                    
                    if (y * 16 > h && Math.random() > 0.975) {
                        matrixCols[i] = 0;
                    }
                    matrixCols[i]++;
                });
                break;

            case 'cyber-scanlines':
                ctx.fillStyle = '#111'; ctx.fillRect(0,0,w,h);
                // Draw some content
                ctx.fillStyle = '#0f0'; ctx.font = '60px monospace';
                ctx.fillText("SYSTEM READY", w/2, h/2);
                
                // Scanlines
                for(let i=0; i<h; i+=4) {
                    ctx.fillStyle = 'rgba(0,0,0,0.5)';
                    ctx.fillRect(0, i, w, 2);
                }
                // Rolling bar
                const barY = (tick * 2) % h;
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(0, barY, w, 50);
                break;

            case 'cyber-hologram':
                ctx.fillStyle = 'black'; ctx.fillRect(0,0,w,h);
                const hologramSize = 100;
                
                // Scan effect
                ctx.save();
                ctx.translate(w/2, h/2);
                for(let i=0; i<20; i++) {
                    const y = (tick * 2 + i * 20) % 200 - 100;
                    const width = Math.cos(y/50) * hologramSize;
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - Math.abs(y)/100})`;
                    ctx.beginPath();
                    ctx.moveTo(-width, y);
                    ctx.lineTo(width, y);
                    ctx.stroke();
                }
                ctx.restore();
                break;

            case 'cyber-neon-flicker':
                ctx.fillStyle = '#050505'; ctx.fillRect(0,0,w,h);
                const flicker = Math.random() > 0.9 ? 0.2 : 1;
                ctx.shadowBlur = 20 * flicker;
                ctx.shadowColor = '#f0f';
                ctx.fillStyle = `rgba(255, 0, 255, ${flicker})`;
                ctx.font = 'bold 80px sans-serif';
                ctx.fillText("NEON", w/2, h/2);
                ctx.shadowBlur = 0;
                
                // Broken wire sparks
                if(Math.random() > 0.95) {
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(w/2 + 100, h/2);
                    ctx.lineTo(w/2 + 120 + Math.random()*20, h/2 + Math.random()*20);
                    ctx.stroke();
                }
                break;

            case 'cyber-pixel-sort':
                // Simulated pixel sort on a gradient
                for(let x=0; x<w; x+=10) {
                    const colorVal = (x + tick) % 360;
                    ctx.fillStyle = `hsl(${colorVal}, 50%, 50%)`;
                    // Sort length based on noise
                    const len = Math.sin(x*0.01 + tick*0.05) * 100 + 100;
                    ctx.fillRect(x, h/2 - len/2, 10, len);
                }
                if(Math.random() > 0.8) {
                    const y = Math.random()*h;
                    const shift = (Math.random()-0.5)*50;
                    const img = ctx.getImageData(0, y, w, 20);
                    ctx.putImageData(img, shift, y);
                }
                break;

            case 'cyber-vhs-tracking':
                ctx.fillStyle = 'blue'; ctx.fillRect(0,0,w,h);
                ctx.fillStyle = 'white'; ctx.font = '40px monospace';
                ctx.fillText("PLAY ► 00:04:20", 50, 50);
                
                // Tracking noise
                const trackY = h - (tick % h);
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.fillRect(0, trackY, w, 5);
                
                // Noise grain
                const imgData = ctx.getImageData(0,0,w,h);
                const data = imgData.data;
                for(let i=0; i<data.length; i+=4) {
                    if(Math.random() > 0.9) {
                        data[i] = data[i+1] = data[i+2] = Math.random()*255;
                    }
                }
                ctx.putImageData(imgData, 0, 0);
                break;

            case 'cyber-hud-ui':
                ctx.translate(w/2, h/2);
                ctx.strokeStyle = '#0ff';
                ctx.lineWidth = 2;
                
                // Outer Ring
                ctx.beginPath();
                ctx.arc(0, 0, 100, tick*0.01, tick*0.01 + Math.PI*1.5);
                ctx.stroke();
                
                // Inner Ring (Counter rotate)
                ctx.strokeStyle = '#f0f';
                ctx.beginPath();
                ctx.arc(0, 0, 80, -tick*0.02, -tick*0.02 + Math.PI);
                ctx.stroke();
                
                // Ticks
                for(let i=0; i<12; i++) {
                    ctx.rotate(Math.PI/6);
                    ctx.fillStyle = 'white';
                    ctx.fillRect(110, -2, 10, 4);
                }
                ctx.setTransform(1,0,0,1,0,0);
                break;

            case 'cyber-terminal':
                ctx.fillStyle = '#000'; ctx.fillRect(0,0,w,h);
                ctx.fillStyle = '#0f0'; ctx.font = '14px monospace';
                ctx.textAlign = 'left';
                
                const lines = [
                    "Connecting to server...",
                    "Access granted.",
                    "Downloading packet 324...",
                    "Decryption key found.",
                    "Root access: TRUE"
                ];
                
                lines.forEach((line, i) => {
                    const showLine = Math.floor(tick / 30) > i;
                    if(showLine) ctx.fillText(`> ${line}`, 50, 100 + i*20);
                });
                
                // Blinking cursor
                if(Math.floor(tick/30) < lines.length && tick%30 < 15) {
                    ctx.fillRect(50 + lines[Math.floor(tick/30)].length*9 + 20, 100 + Math.floor(tick/30)*20 - 10, 8, 14);
                }
                break;

            case 'cyber-distortion-field':
                // Draw grid
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                const gridSize = 40;
                
                for(let x=0; x<w; x+=gridSize) {
                    for(let y=0; y<h; y+=gridSize) {
                        // Distort based on mouse
                        const dx = x - mouse.x;
                        const dy = y - mouse.y;
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        const pull = Math.max(0, (200 - dist) / 200) * 50;
                        
                        const drawX = x - (dx/dist || 0) * pull;
                        const drawY = y - (dy/dist || 0) * pull;
                        
                        ctx.beginPath();
                        ctx.arc(drawX, drawY, 2, 0, Math.PI*2);
                        ctx.fillStyle = 'cyan';
                        ctx.fill();
                    }
                }
                break;

            case 'cyber-circuit-board':
                particles.forEach(p => {
                    // Move in straight lines
                    if(Math.random() > 0.95) {
                        p.vx = (Math.random() > 0.5 ? 1 : -1) * 4;
                        p.vy = 0;
                    } else if (Math.random() > 0.95) {
                        p.vy = (Math.random() > 0.5 ? 1 : -1) * 4;
                        p.vx = 0;
                    }
                    
                    p.x += p.vx; p.y += p.vy;
                    p.path.push({x:p.x, y:p.y});
                    if(p.path.length > 50) p.path.shift();
                    
                    if(p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
                        p.x = Math.random()*w; p.y = Math.random()*h;
                        p.path = [];
                    }

                    ctx.strokeStyle = '#0ff';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    p.path.forEach((pt:any, i:number) => {
                        if(i===0) ctx.moveTo(pt.x, pt.y);
                        else ctx.lineTo(pt.x, pt.y);
                    });
                    ctx.stroke();
                    
                    // Head
                    ctx.fillStyle = 'white';
                    ctx.fillRect(p.x-2, p.y-2, 4, 4);
                });
                break;
                
            case 'cyber-ascii-art':
                ctx.fillStyle = '#000'; ctx.fillRect(0,0,w,h);
                ctx.fillStyle = '#0f0'; ctx.font = '10px monospace';
                const chars = "@#$%=+*:-. ";
                for(let y=0; y<h; y+=12) {
                    for(let x=0; x<w; x+=8) {
                        // Create pattern based on sine waves
                        const v = Math.sin(x*0.01 + tick*0.05) * Math.cos(y*0.01) * 0.5 + 0.5;
                        const charIndex = Math.floor(v * chars.length);
                        ctx.fillText(chars[charIndex] || '.', x, y);
                    }
                }
                break;
                
            case 'cyber-laser-scan':
                ctx.fillStyle = '#111'; ctx.fillRect(0,0,w,h);
                // Grid object
                ctx.strokeStyle = 'rgba(255,0,0,0.2)';
                ctx.beginPath();
                for(let x=w/2-100; x<=w/2+100; x+=20) { ctx.moveTo(x, h/2-100); ctx.lineTo(x, h/2+100); }
                for(let y=h/2-100; y<=h/2+100; y+=20) { ctx.moveTo(w/2-100, y); ctx.lineTo(w/2+100, y); }
                ctx.stroke();
                
                // Scan beam
                const beamY = (tick * 5) % h;
                ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.fillRect(0, beamY, w, 2);
                ctx.shadowBlur = 20; ctx.shadowColor = 'red';
                ctx.fillRect(0, beamY, w, 5);
                ctx.shadowBlur = 0;
                
                // Highlight intersection
                if(beamY > h/2-100 && beamY < h/2+100) {
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(w/2-100, beamY, 200, 1);
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
      <div className="w-full h-full bg-black relative overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      </div>
    </DemoContainer>
  );
}
