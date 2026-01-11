import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollGridTunnel() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black perspective-[500px]">
        <div className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
                
                {/* Retro Grid Floor */}
                <div 
                    className="absolute bottom-0 w-[200vw] h-[100vh] origin-bottom"
                    style={{
                        backgroundImage: `
                            linear-gradient(to bottom, transparent 0%, #a855f7 100%),
                            linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: '100% 100%, 60px 100%, 100% 60px',
                        transform: 'rotateX(70deg) translateY(100px)',
                        // Scroll moves the background position Y to simulate movement
                        backgroundPositionY: `calc(var(--scroll-percent, 0) * 1000px)`
                    }}
                />

                {/* Retro Grid Ceiling */}
                <div 
                    className="absolute top-0 w-[200vw] h-[100vh] origin-top"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, transparent 0%, #3b82f6 100%),
                            linear-gradient(to right, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: '100% 100%, 60px 100%, 100% 60px',
                        transform: 'rotateX(-70deg) translateY(-100px)',
                        backgroundPositionY: `calc(var(--scroll-percent, 0) * 1000px)`
                    }}
                />

                {/* Sun */}
                <div className="absolute top-[20%] w-64 h-64 rounded-full bg-gradient-to-t from-yellow-500 to-pink-600 blur-md shadow-[0_0_100px_rgba(236,72,153,0.5)]"></div>

                {/* Horizon Line */}
                <div className="absolute top-[50%] w-full h-[2px] bg-white blur-[2px]"></div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent opacity-80 italic tracking-tighter"
                        style={{ transform: 'skewX(-10deg)' }}>
                        SYNTHWAVE
                    </h1>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}