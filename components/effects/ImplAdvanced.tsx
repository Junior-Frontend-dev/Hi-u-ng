import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw, Power, Wifi, Bluetooth, Battery, Sun, Moon } from 'lucide-react';

export default function ImplAdvanced({ variant }: { variant: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(50);

  // --- NATURE/DATA/CYBER RENDERING LOGIC ---
  useEffect(() => {
    if (!variant.startsWith('nature-') && !variant.startsWith('data-') && !variant.startsWith('cyber-')) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.parentElement?.clientWidth || 300;
    let h = canvas.height = canvas.parentElement?.clientHeight || 300;
    let particles: any[] = [];
    let time = 0;
    let raf: number;

    const init = () => {
        particles = [];
        if (variant.includes('rain')) {
            for(let i=0; i<100; i++) particles.push({x: Math.random()*w, y: Math.random()*h, v: Math.random()*10+5, l: Math.random()*20+10});
        } else if (variant.includes('fire')) {
            for(let i=0; i<200; i++) particles.push({x: w/2 + (Math.random()-0.5)*50, y: h, v: Math.random()*3+1, s: Math.random()*20+10, life: 1});
        } else if (variant.includes('snow')) {
            for(let i=0; i<100; i++) particles.push({x: Math.random()*w, y: Math.random()*h, v: Math.random()*2+1, s: Math.random()*3+1, swing: Math.random()*0.02});
        } else if (variant.includes('matrix')) {
             const columns = Math.floor(w / 20);
             for(let i=0; i<columns; i++) particles.push({x: i*20, y: Math.random()*h, v: Math.random()*5+2, char: ''});
        } else if (variant.includes('starfield')) {
             for(let i=0; i<200; i++) particles.push({x: Math.random()*w, y: Math.random()*h, z: Math.random()*2});
        } else if (variant.includes('confetti')) {
             for(let i=0; i<100; i++) particles.push({
                 x: w/2, y: h/2, 
                 vx: (Math.random()-0.5)*20, vy: (Math.random()-0.5)*20 - 10, 
                 c: `hsl(${Math.random()*360}, 100%, 50%)`,
                 r: Math.random()*5+2,
                 angle: Math.random()*Math.PI*2
             });
        } else if (variant.includes('chart') || variant.includes('graph')) {
            // Data logic handled in loop
        }
    };
    init();

    const loop = () => {
        if (!variant.includes('trail') && !variant.includes('matrix')) ctx.clearRect(0, 0, w, h);
        if (variant.includes('trail') || variant.includes('matrix')) {
             ctx.fillStyle = 'rgba(0,0,0,0.1)';
             ctx.fillRect(0,0,w,h);
        }

        // --- NATURE ---
        if (variant.includes('rain') && !variant.includes('matrix')) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            particles.forEach(p => {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x, p.y + p.l);
                p.y += p.v;
                if(p.y > h) p.y = -p.l;
            });
            ctx.stroke();
        } 
        else if (variant.includes('snow')) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            particles.forEach(p => {
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
                p.y += p.v;
                p.x += Math.sin(time * p.swing) * 0.5;
                if(p.y > h) p.y = -10;
            });
            ctx.fill();
        }
        else if (variant.includes('fire')) {
            particles.forEach((p, i) => {
                p.y -= p.v;
                p.life -= 0.01;
                p.s *= 0.99;
                if(p.life <= 0) {
                    particles[i] = {x: w/2 + (Math.random()-0.5)*50, y: h, v: Math.random()*3+1, s: Math.random()*20+10, life: 1};
                }
                const hue = 60 * p.life; // Yellow to Red
                ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${p.life})`;
                ctx.beginPath();
                ctx.arc(p.x + Math.sin(time*0.1 + i)*10 * (1-p.life), p.y, p.s, 0, Math.PI*2);
                ctx.fill();
            });
        }
        else if (variant.includes('starfield')) {
            ctx.fillStyle = '#fff';
            particles.forEach(p => {
                p.z -= 0.02;
                if(p.z <= 0) { p.z = 2; p.x = Math.random()*w; p.y = Math.random()*h; }
                const sx = (p.x - w/2) / p.z + w/2;
                const sy = (p.y - h/2) / p.z + h/2;
                const r = 1.5 / p.z;
                ctx.beginPath();
                ctx.arc(sx, sy, r, 0, Math.PI*2);
                ctx.fill();
            });
        }
        else if (variant.includes('confetti')) {
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.5; // Gravity
                p.vx *= 0.95; // Friction
                p.angle += 0.1;
                
                if(p.y > h) {
                    p.y = h/2; p.x = w/2;
                    p.vx = (Math.random()-0.5)*20; p.vy = (Math.random()-0.5)*20 - 10;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.c;
                ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
                ctx.restore();
            });
        }

        // --- CYBER ---
        else if (variant.includes('matrix')) {
            ctx.fillStyle = '#0f0';
            ctx.font = '20px monospace';
            particles.forEach(p => {
                const char = String.fromCharCode(0x30A0 + Math.random() * 96);
                ctx.fillText(char, p.x, p.y);
                p.y += p.v;
                if(p.y > h && Math.random() > 0.975) p.y = 0;
            });
        }

        // --- DATA ---
        else if (variant === 'data-realtime-graph') {
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for(let x=0; x<w; x+=5) {
                const y = h/2 + Math.sin(x*0.02 + time*0.1)*50 + Math.random()*10;
                if(x===0) ctx.moveTo(x,y);
                else ctx.lineTo(x,y);
            }
            ctx.stroke();
        }
        else if (variant === 'data-particles-globe') {
             const cx = w/2, cy = h/2;
             for(let i=0; i<100; i++) {
                 const angle = (i/100) * Math.PI*2 + time*0.01;
                 const r = 100 + Math.sin(time*0.05 + i)*10;
                 ctx.fillStyle = `hsl(${i*3.6}, 70%, 50%)`;
                 ctx.fillRect(cx + Math.cos(angle)*r, cy + Math.sin(angle)*r, 4, 4);
             }
        }

        // --- CYBER ---
        else if (variant.includes('glitch')) {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 60px monospace';
            ctx.textAlign = 'center';
            const text = "CYBERPUNK";
            
            // RGB Split
            const shift = Math.random() > 0.9 ? 10 : 0;
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.fillText(text, w/2 - shift, h/2);
            ctx.fillStyle = 'rgba(0,255,255,0.5)';
            ctx.fillText(text, w/2 + shift, h/2);
            
            // Scanlines
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            for(let y=0; y<h; y+=4) ctx.fillRect(0, y, w, 2);
        }

        time++;
        raf = requestAnimationFrame(loop);
    };
    
    raf = requestAnimationFrame(loop);
    
    const resize = () => {
        if (canvas.parentElement) {
            w = canvas.width = canvas.parentElement.clientWidth;
            h = canvas.height = canvas.parentElement.clientHeight;
            init();
        }
    };
    window.addEventListener('resize', resize);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
    };
  }, [variant]);

  // --- RENDER CONTENT ---
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative flex items-center justify-center overflow-hidden">
        
        {/* === CANVAS BASED EFFECTS === */}
        {(variant.startsWith('nature-') || variant.startsWith('data-') || variant.startsWith('cyber-')) && (
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        )}

        {/* === MICRO INTERACTIONS (DOM) === */}
        {variant === 'micro-toggle-elastic' && (
            <div 
                onClick={() => setActive(!active)}
                className={`w-32 h-16 rounded-full p-2 cursor-pointer transition-colors duration-500 ${active ? 'bg-green-500' : 'bg-gray-700'}`}
            >
                <div className={`w-12 h-12 bg-white rounded-full shadow-md transition-transform duration-500 cubic-bezier(0.68, -0.55, 0.27, 1.55) ${active ? 'translate-x-16' : 'translate-x-0'}`} />
            </div>
        )}

        {variant === 'micro-button-morph-loader' && (
            <button 
                onClick={() => { setActive(true); setTimeout(() => setActive(false), 2000); }}
                className={`h-16 flex items-center justify-center bg-blue-600 text-white font-bold transition-all duration-300 ${active ? 'w-16 rounded-full' : 'w-48 rounded-lg'}`}
            >
                {active ? <RefreshCcw className="animate-spin" /> : 'Submit'}
            </button>
        )}

        {variant === 'micro-checkbox-particle' && (
            <div 
                onClick={() => setActive(!active)}
                className={`w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 ${active ? 'bg-blue-500 border-blue-500' : 'bg-transparent'}`}
            >
                {active && <div className="text-white animate-ping absolute w-full h-full bg-blue-400 rounded-lg opacity-50"></div>}
                {active && <Check size={24} className="text-white animate-bounce" />}
            </div>
        )}

        {variant === 'micro-slider-fluid' && (
            <div className="w-64 relative">
                <input 
                    type="range" min="0" max="100" value={val} 
                    onChange={(e) => setVal(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div 
                    className="absolute top-[-40px] w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs transform -translate-x-1/2 transition-transform ease-out duration-75"
                    style={{ left: `${val}%`, borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%', borderTopLeftRadius: '50%', transform: `translateX(-50%) scale(${1 + val/200})` }}
                >
                    {val}
                </div>
            </div>
        )}

        {variant === 'micro-input-shake' && (
            <div className="w-64">
                <input
                    type="text"
                    placeholder="Type 'error' to shake"
                    className={`w-full p-4 bg-neutral-800 border-2 rounded-xl text-white outline-none transition-all ${active ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-neutral-700 focus:border-blue-500'}`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (e.currentTarget.value === 'error') {
                                setActive(true);
                                setTimeout(() => setActive(false), 500);
                            }
                        }
                    }}
                />
                <p className="text-gray-500 text-sm mt-2">Press Enter. Try typing 'error'.</p>
                <style>{`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                `}</style>
            </div>
        )}

        {variant === 'micro-card-tilt-glare' && (
            <div 
                className="w-64 h-80 relative group perspective-1000"
                onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    
                    const glare = card.querySelector('.glare') as HTMLElement;
                    if (glare) {
                        glare.style.transform = `translateX(${x}px) translateY(${y}px)`;
                        glare.style.opacity = '1';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                    const glare = e.currentTarget.querySelector('.glare') as HTMLElement;
                    if (glare) glare.style.opacity = '0';
                }}
                style={{ transition: 'transform 0.1s ease-out' }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative p-6 h-full flex flex-col justify-end text-white">
                        <h3 className="text-2xl font-bold">Holo Card</h3>
                        <p className="opacity-80">Hover to see 3D tilt and glare.</p>
                    </div>
                    <div 
                        className="glare absolute w-48 h-48 bg-white/30 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-0 mix-blend-overlay"
                        style={{ top: '-100px', left: '-100px' }}
                    />
                </div>
            </div>
        )}

        {variant === 'micro-like-heart' && (
            <button 
                onClick={() => setActive(!active)}
                className="group relative"
            >
                <Heart 
                    size={64} 
                    className={`transition-all duration-300 ${active ? 'fill-red-500 text-red-500 scale-125' : 'text-gray-500 group-hover:text-red-400'}`} 
                />
                {active && (
                    <>
                        <div className="absolute inset-0 animate-ping bg-red-500 rounded-full opacity-20 duration-500" />
                        {[...Array(8)].map((_, i) => (
                            <div 
                                key={i}
                                className="absolute left-1/2 top-1/2 w-2 h-2 bg-red-500 rounded-full animate-out fade-out zoom-out"
                                style={{
                                    transform: `translate(${Math.cos(i * 45 * Math.PI / 180) * 40}px, ${Math.sin(i * 45 * Math.PI / 180) * 40}px)`,
                                    transition: 'all 0.5s ease-out'
                                }}
                            />
                        ))}
                    </>
                )}
            </button>
        )}

        {variant === 'micro-nav-underline' && (
            <div className="bg-neutral-800 p-2 rounded-full flex gap-4 relative">
                {['Home', 'About', 'Contact'].map((item, i) => (
                    <button
                        key={i}
                        onMouseEnter={(e) => {
                            const underline = e.currentTarget.parentElement?.querySelector('.underline') as HTMLElement;
                            if (underline) {
                                underline.style.width = `${e.currentTarget.offsetWidth}px`;
                                underline.style.left = `${e.currentTarget.offsetLeft}px`;
                            }
                        }}
                        className="px-4 py-2 text-white relative z-10 hover:text-blue-300 transition-colors"
                    >
                        {item}
                    </button>
                ))}
                <div className="underline absolute bottom-2 h-8 bg-blue-600/20 rounded-full transition-all duration-300 ease-out" style={{ width: 0, height: '80%', bottom: '10%' }} />
            </div>
        )}

        {variant === 'micro-tooltip-follow' && (
            <div 
                className="w-full h-full flex items-center justify-center relative cursor-none"
                onMouseMove={(e) => {
                    const tooltip = document.getElementById('tooltip-follower');
                    if (tooltip) {
                        tooltip.style.left = `${e.clientX + 15}px`;
                        tooltip.style.top = `${e.clientY + 15}px`;
                    }
                }}
            >
                <div className="text-white text-xl">Hover anywhere...</div>
                <div 
                    id="tooltip-follower"
                    className="fixed pointer-events-none bg-white text-black px-3 py-1 rounded shadow-lg text-sm font-bold z-50 transition-opacity duration-100"
                >
                    I follow you!
                </div>
            </div>
        )}

        {/* === DATA VISUALIZATION (DOM) === */}
        {variant === 'data-bar-race' && (
            <div className="w-full max-w-lg space-y-4 p-4">
                {[1, 2, 3, 4, 5].map((i) => {
                    const [width, setWidth] = useState(Math.random() * 100);
                    useEffect(() => {
                        const interval = setInterval(() => setWidth(Math.random() * 100), 2000);
                        return () => clearInterval(interval);
                    }, []);
                    return (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-white w-20">Item {i}</span>
                            <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 transition-all duration-1000 ease-in-out" 
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                            <span className="text-white w-10">{Math.round(width)}%</span>
                        </div>
                    );
                })}
            </div>
        )}

        {/* === TYPE ADVANCED === */}
        {variant.startsWith('type-adv-') && (
            <div className="text-center">
                {variant === 'type-adv-kinetic-loop' && (
                    <div className="flex text-6xl font-black text-white gap-4">
                        {["L","O","O","P"].map((c,i) => (
                            <span key={i} className="animate-bounce" style={{ animationDelay: `${i*0.1}s` }}>{c}</span>
                        ))}
                    </div>
                )}
                {variant === 'type-adv-shatter' && (
                    <h1 className="text-8xl font-black text-white hover:tracking-[1em] hover:opacity-0 transition-all duration-500 cursor-pointer">
                        SHATTER
                    </h1>
                )}
                {variant === 'type-adv-neon-sign' && (
                    <div className="border-4 border-pink-500 p-8 rounded-xl shadow-[0_0_20px_#ec4899,inset_0_0_20px_#ec4899]">
                        <h1 className="text-8xl font-monoton text-pink-500 animate-pulse drop-shadow-[0_0_10px_#ec4899]">
                            OPEN
                        </h1>
                    </div>
                )}
            </div>
        )}

        {/* Fallback Label for Generic Variants */}
        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-xs text-white/50 pointer-events-none">
            {variant}
        </div>

      </div>
    </DemoContainer>
  );
}

function Check({size, className}: any) {
    return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
}