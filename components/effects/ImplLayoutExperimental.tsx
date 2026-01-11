import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ImplLayoutExperimental({ variant }: { variant: string }) {
  // Use scroll animation hook for scroll-based layouts
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive layouts
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        });
    };
    // Attach to window or specific ref depending on need, window is safer for broad motion
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <DemoContainer>
      {/* Add ScrollControl if it's a scroll-based variant */}
      {variant.includes('scroll') && <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />}

      <div ref={scrollRef} className="h-full w-full overflow-y-auto hide-scrollbar bg-neutral-900 relative">
        <div ref={containerRef} className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden">
            
            {/* === 221. Fluid Layout Morphing === */}
            {variant === 'layout-exp-morphing' && (
                <div className="w-full max-w-4xl h-[60vh] bg-gradient-to-br from-pink-500 to-purple-600 transition-all duration-[3000ms] ease-in-out animate-blob-layout flex items-center justify-center shadow-2xl">
                    <h1 className="text-6xl font-bold text-white mix-blend-overlay">FLUID</h1>
                    <style>{`
                        @keyframes blob-layout {
                            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; width: 60%; }
                            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; width: 90%; }
                            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; width: 60%; }
                        }
                        .animate-blob-layout { animation: blob-layout 10s infinite; }
                    `}</style>
                </div>
            )}

            {/* === 222. Layout Responding to Scroll Speed === */}
            {variant === 'layout-exp-scroll-speed' && (
                <div className="flex flex-col gap-8 w-full max-w-lg py-[50vh]">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="bg-white p-8 rounded-xl transition-transform duration-100 ease-out will-change-transform"
                             style={{ 
                                 // Stretch vertically based on velocity
                                 transform: `scaleY(calc(1 + abs(var(--scroll-velocity, 0)) * 0.02))` 
                             }}
                        >
                            <h2 className="text-black font-bold text-2xl">Item {i}</h2>
                            <p className="text-gray-500">Scroll fast to stretch layout.</p>
                        </div>
                    ))}
                </div>
            )}

            {/* === 223. Broken Container Illusion === */}
            {variant === 'layout-exp-broken' && (
                <div className="relative w-80 h-96 group">
                    <div className="absolute inset-0 bg-blue-600 rounded-lg transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-lg transform rotate-2 group-hover:rotate-6 opacity-80 mix-blend-multiply transition-transform"></div>
                    <div className="absolute inset-0 bg-white border-2 border-black p-8 transform group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500">
                        <h1 className="text-4xl font-black text-black uppercase">Broken<br/>Layout</h1>
                        <p className="mt-4 text-sm font-mono text-gray-600">Structure fails gracefully.</p>
                    </div>
                </div>
            )}

            {/* === 224. Time-based Layout === */}
            {variant === 'layout-exp-time' && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl h-[60vh]">
                    <div className="bg-neutral-800 rounded-2xl animate-float-slow delay-0"></div>
                    <div className="bg-neutral-700 rounded-2xl animate-float-slow" style={{ animationDelay: '1s' }}></div>
                    <div className="bg-neutral-700 rounded-2xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
                    <div className="bg-neutral-800 rounded-2xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
                    <style>{`
                        @keyframes float-slow {
                            0% { transform: translate(0, 0); }
                            25% { transform: translate(10px, -10px); }
                            50% { transform: translate(-5px, 5px); }
                            75% { transform: translate(-10px, -5px); }
                            100% { transform: translate(0, 0); }
                        }
                        .animate-float-slow { animation: float-slow 10s infinite ease-in-out; }
                    `}</style>
                </div>
            )}

            {/* === 225. Asymmetric Responsive Shift === */}
            {variant === 'layout-exp-asymmetric' && (
                <div className="grid grid-cols-6 gap-4 w-full max-w-4xl">
                    <div className="col-span-4 bg-white h-64 rounded-xl"></div>
                    <div className="col-span-2 bg-blue-500 h-40 mt-24 rounded-xl"></div>
                    <div className="col-span-1 bg-red-500 h-40 rounded-xl"></div>
                    <div className="col-span-5 bg-neutral-800 h-80 -mt-12 ml-12 rounded-xl z-10 border-4 border-black"></div>
                </div>
            )}

            {/* === 226. Layered Depth Layout === */}
            {variant === 'layout-exp-depth' && (
                <div className="relative w-full h-[80vh] perspective-[1000px] flex items-center justify-center">
                    <div className="w-64 h-80 bg-neutral-800 absolute transform translate-z-[-100px] opacity-50 scale-90 top-10 left-10 transition-transform hover:translate-z-[-50px]"></div>
                    <div className="w-64 h-80 bg-neutral-700 absolute transform translate-z-[-50px] opacity-75 scale-95 top-20 left-20 transition-transform hover:translate-z-[0px]"></div>
                    <div className="w-64 h-80 bg-white absolute transform translate-z-[0px] shadow-2xl top-30 left-30 transition-transform hover:translate-z-[50px] p-8">
                        <h2 className="text-4xl font-bold text-black">Depth</h2>
                    </div>
                </div>
            )}

            {/* === 227. Floating Layout Grid === */}
            {variant === 'layout-exp-floating' && (
                <div className="flex flex-wrap gap-8 justify-center w-full max-w-4xl">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="w-40 h-40 bg-white/10 backdrop-blur rounded-full animate-bob" style={{ animationDelay: `${i * 0.5}s` }}></div>
                    ))}
                    <style>{`
                        @keyframes bob {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-20px); }
                        }
                        .animate-bob { animation: bob 4s infinite ease-in-out; }
                    `}</style>
                </div>
            )}

            {/* === 228. Collapsing Layout Narrative === */}
            {variant === 'layout-exp-collapse' && (
                <div className="py-[50vh] space-y-96 max-w-lg mx-auto">
                    {[1,2,3].map(i => (
                        <div key={i} 
                             className="bg-white text-black p-8 rounded-xl transition-all duration-500 ease-out origin-top"
                             style={{ 
                                 // Logic: Scale down to 0 when scrolled past
                                 transform: `scale(calc(1 - max(0, (var(--scroll-percent, 0) * 3 - ${i-1}))))`,
                                 opacity: `calc(1 - max(0, (var(--scroll-percent, 0) * 3 - ${i-1}) * 2))`
                             }}
                        >
                            <h2 className="text-4xl font-bold mb-4">Part {i}</h2>
                            <p>This section collapses into nothingness as you proceed.</p>
                        </div>
                    ))}
                </div>
            )}

            {/* === 229. Expanding Negative Space === */}
            {variant === 'layout-exp-negative' && (
                <div className="flex flex-col w-full max-w-3xl transition-all duration-500" style={{ gap: `${mousePos.y * 200}px` }}>
                    <div className="h-40 bg-white w-full"></div>
                    <div className="h-40 bg-white w-full"></div>
                    <div className="h-40 bg-white w-full"></div>
                    <div className="fixed bottom-10 left-10 text-white/50">Move mouse Y to expand space</div>
                </div>
            )}

            {/* === 230. Anti-Grid Layout === */}
            {variant === 'layout-exp-anti-grid' && (
                <div className="relative w-full h-[80vh]">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} 
                             className="absolute bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center font-mono text-xl"
                             style={{
                                 top: `${Math.random() * 80}%`,
                                 left: `${Math.random() * 80}%`,
                                 width: `${Math.random() * 200 + 100}px`,
                                 height: `${Math.random() * 200 + 100}px`,
                                 transform: `rotate(${Math.random() * 20 - 10}deg)`
                             }}
                        >
                            {i}
                        </div>
                    ))}
                </div>
            )}

            {/* === 231. Proximity Layout === */}
            {variant === 'layout-exp-proximity' && (
                <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-white/10 h-32 rounded-lg transition-transform duration-200 hover:bg-white/20 hover:scale-95 border border-white/5"></div>
                    ))}
                </div>
            )}

            {/* === 232. Kinetic Blocks === */}
            {variant === 'layout-exp-kinetic' && (
                <div className="flex gap-4">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-32 h-32 bg-blue-500 rounded-xl cursor-pointer active:scale-[0.8] active:rotate-12 transition-all duration-[500ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] hover:-translate-y-4"></div>
                    ))}
                </div>
            )}

            {/* === 233. Spatial Scroll === */}
            {variant === 'layout-exp-spatial' && (
                <div className="h-[400vh] perspective-[1000px] w-full">
                    <div className="sticky top-0 h-screen w-full transform-style-3d flex items-center justify-center">
                        <div className="relative w-full h-full transform-style-3d" style={{ transform: `rotateY(calc(var(--scroll-percent, 0) * 360deg))` }}>
                            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 transform translate-z-[400px]">FRONT</div>
                            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 transform translate-z-[-400px]">BACK</div>
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 transform rotate-y-90 translate-z-[400px]">RIGHT</div>
                            <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20 transform rotate-y-90 translate-z-[-400px]">LEFT</div>
                        </div>
                    </div>
                </div>
            )}

            {/* === 234. Zoom Switch === */}
            {variant === 'layout-exp-zoom' && (
                <div className="w-full h-full flex items-center justify-center group overflow-hidden cursor-zoom-in">
                    <div className="grid grid-cols-2 gap-4 w-64 group-hover:scale-50 group-hover:gap-2 group-hover:grid-cols-4 group-hover:w-full transition-all duration-700 ease-in-out">
                        {[...Array(4)].map((_, i) => <div key={i} className="bg-white h-32 w-full rounded-lg"></div>)}
                        {/* Hidden extra items appearing on zoom out logic simulated */}
                        {[...Array(12)].map((_, i) => <div key={i+4} className="bg-white/50 h-32 w-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>)}
                    </div>
                    <div className="absolute bottom-10 text-white/50">Hover to Zoom Out (Grid Switch)</div>
                </div>
            )}

            {/* === 235. Layer Swap === */}
            {variant === 'layout-exp-swap' && (
                <div className="relative w-64 h-80 group cursor-pointer">
                    <div className="absolute inset-0 bg-blue-600 rounded-xl transform translate-x-4 translate-y-4 z-0 group-hover:z-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center text-2xl font-bold">
                        LAYER A
                    </div>
                    <div className="absolute inset-0 bg-white text-black rounded-xl z-10 group-hover:z-0 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 flex items-center justify-center text-2xl font-bold border border-black">
                        LAYER B
                    </div>
                </div>
            )}

            {/* === 236. Elastic Container === */}
            {variant === 'layout-exp-elastic' && (
                <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                    <textarea 
                        className="w-96 h-64 bg-neutral-800 text-white p-8 rounded-xl resize-none outline-none transition-all duration-300 focus:w-[500px] focus:h-[400px] focus:bg-neutral-700 focus:shadow-2xl"
                        placeholder="Click to expand elastically..."
                    ></textarea>
                </div>
            )}

            {/* === 237. Breathing Layout === */}
            {variant === 'layout-exp-breathe' && (
                <div className="flex gap-4 animate-layout-breathe">
                    <div className="bg-white/20 w-32 h-64 rounded-xl"></div>
                    <div className="bg-white/20 w-32 h-64 rounded-xl"></div>
                    <div className="bg-white/20 w-32 h-64 rounded-xl"></div>
                    <style>{`
                        @keyframes layout-breathe {
                            0%, 100% { gap: 1rem; }
                            50% { gap: 4rem; }
                        }
                        .animate-layout-breathe { animation: layout-breathe 4s infinite ease-in-out; }
                    `}</style>
                </div>
            )}

            {/* === 238. Floating Margins === */}
            {variant === 'layout-exp-margins' && (
                <div className="flex flex-col gap-4 w-full max-w-2xl">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} 
                             className="bg-white p-4 rounded text-black font-mono w-max animate-margin-float"
                             style={{ animationDelay: `${i * 0.2}s`, marginLeft: `${i * 20}px` }}
                        >
                            Floating Content Block {i}
                        </div>
                    ))}
                    <style>{`
                        @keyframes margin-float {
                            0%, 100% { transform: translateX(0); }
                            50% { transform: translateX(20px); }
                        }
                        .animate-margin-float { animation: margin-float 3s infinite ease-in-out; }
                    `}</style>
                </div>
            )}

            {/* === 239. Layout Driven by Typography === */}
            {variant === 'layout-exp-typography' && (
                <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
                    <h1 className="text-[25vw] font-black text-white/5 absolute z-0 select-none">BIG</h1>
                    <div className="grid grid-cols-2 gap-20 z-10">
                        <div className="mt-20">
                            <p className="text-xl font-serif">Typography isn't just text. It's structure. It creates the walls and floors of the digital room.</p>
                        </div>
                        <div className="-mt-20 text-right">
                            <p className="text-xl font-serif">By scaling type to architectural proportions, we define space without lines.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* === 240. Layout Fragmentation === */}
            {variant === 'layout-exp-fragmentation' && (
                <div className="grid grid-cols-4 gap-1 w-96 h-96 group cursor-pointer">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-90 group-hover:rotate-[20deg] group-hover:rounded-full group-hover:bg-red-500"></div>
                    ))}
                </div>
            )}

        </div>
      </div>
    </DemoContainer>
  );
}