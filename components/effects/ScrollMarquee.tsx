import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollMarquee() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 3 });

  const WORDS = ["INNOVATE", "CREATE", "INSPIRE", "DESIGN", "DEVELOP", "FUTURE"];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black text-white">
        <div className="h-[250vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
            
            {/* 
              We calculate translateX based on scroll-percent.
              Odd lines: Move Left (Starts at 0%, goes to -X%)
              Even lines: Move Right (Starts at -X%, goes to 0%)
            */}
            
            <div className="flex flex-col gap-0 w-full">
                {WORDS.map((word, i) => {
                    const isEven = i % 2 === 0;
                    const direction = isEven ? -1 : 1;
                    
                    return (
                        <div 
                            key={i} 
                            className="w-full flex whitespace-nowrap will-change-transform"
                            style={{
                                // Logic:
                                // Even (-1): translateX( scroll% * -50% )
                                // Odd  (1):  translateX( -50% + scroll% * 50% )
                                transform: isEven 
                                    ? `translateX(calc(var(--scroll-percent, 0) * -40%))`
                                    : `translateX(calc(-40% + var(--scroll-percent, 0) * 40%))`
                            }}
                        >
                            <span 
                                className={`
                                    text-[15vh] font-black tracking-tighter leading-[0.85] px-4
                                    ${isEven ? 'text-white' : 'text-transparent'}
                                `}
                                style={{
                                    WebkitTextStroke: isEven ? 'none' : '2px rgba(255,255,255,0.3)'
                                }}
                            >
                                {word} &nbsp; {word} &nbsp; {word} &nbsp; {word}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-10 text-center">
                <p className="text-white/40 text-xs uppercase tracking-[0.4em]">Scroll to scrub timeline</p>
            </div>

          </div>
        </div>
      </div>
    </DemoContainer>
  );
}