import React, { useEffect, useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

// SVG Icons as components
const StarIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const MoonIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const SunIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const DiamondIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2L2 12L12 22L22 12L12 2Z" />
  </svg>
);

const HexagonIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" />
  </svg>
);

const TriangleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 3L22 21H2L12 3Z" />
  </svg>
);

// Central rotating symbol
const CosmicSymbol = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
    <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <path d="M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z" fill="currentColor" opacity="0.6" />
    <circle cx="50" cy="10" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="90" cy="50" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="50" cy="90" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="10" cy="50" r="2" fill="currentColor" opacity="0.8" />
  </svg>
);

export default function ScrollRotation() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      setScrollProgress(progress);
      // Quay 720 độ (2 vòng) khi cuộn hết trang
      setRotation(scrollTop * 0.5);
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  const orbitingElements = [
    { Icon: StarIcon, size: 24, color: 'text-white', angle: 0, orbitRadius: '28vh', glowColor: 'rgba(255,255,255,0.6)' },
    { Icon: MoonIcon, size: 18, color: 'text-purple-400', angle: 60, orbitRadius: '25vh', glowColor: 'rgba(168,85,247,0.6)' },
    { Icon: DiamondIcon, size: 14, color: 'text-cyan-400', angle: 120, orbitRadius: '30vh', glowColor: 'rgba(34,211,238,0.6)' },
    { Icon: SunIcon, size: 22, color: 'text-amber-400', angle: 180, orbitRadius: '26vh', glowColor: 'rgba(251,191,36,0.6)' },
    { Icon: HexagonIcon, size: 12, color: 'text-pink-400', angle: 240, orbitRadius: '29vh', glowColor: 'rgba(244,114,182,0.6)' },
    { Icon: TriangleIcon, size: 16, color: 'text-emerald-400', angle: 300, orbitRadius: '24vh', glowColor: 'rgba(52,211,153,0.6)' },
  ];

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-neutral-900">
        
        {/* Enhanced Background Grid */}
        <div 
          className="absolute inset-0 opacity-20 will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)
            `,
            backgroundSize: '50px 50px, 50px 50px, 100% 100%',
            transform: `perspective(500px) rotateX(60deg) translateY(${scrollProgress * 100}px)`,
            transformOrigin: 'center top'
          }}
        />

        {/* Ambient glow effects */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            transform: `translate(${scrollProgress * 50}px, ${scrollProgress * -30}px)`,
            filter: 'blur(40px)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
            transform: `translate(${scrollProgress * -40}px, ${scrollProgress * 20}px)`,
            filter: 'blur(40px)'
          }}
        />

        <div className="min-h-[300%] p-10 flex flex-col items-center relative overflow-hidden">
          <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center">
            
            {/* Outer glow ring */}
            <div 
              className="absolute w-[65vh] h-[65vh] rounded-full will-change-transform transition-transform duration-100"
              style={{
                background: `conic-gradient(from ${rotation * 0.3}deg, transparent, rgba(139,92,246,0.2), transparent, rgba(34,211,238,0.2), transparent)`,
                filter: 'blur(20px)',
                transform: `rotate(${rotation * 0.1}deg)`
              }}
            />

            {/* Main Rotating Ring */}
            <div 
              className="w-[60vh] h-[60vh] rounded-full flex items-center justify-center relative will-change-transform transition-transform duration-75"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Outer ring with gradient stroke effect */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="50%" stopColor="rgba(139,92,246,0.3)" />
                    <stop offset="100%" stopColor="rgba(34,211,238,0.3)" />
                  </linearGradient>
                </defs>
                <circle 
                  cx="50" cy="50" r="49" 
                  fill="none" 
                  stroke="url(#ringGradient)" 
                  strokeWidth="0.3"
                />
              </svg>
              
              {/* Inner dashed ring - counter rotating */}
              <div 
                className="absolute inset-8 border border-dashed border-white/10 rounded-full will-change-transform transition-transform duration-75"
                style={{ 
                  transform: `rotate(${-rotation * 0.5}deg)`
                }}
              />
              
              {/* Middle decorative ring */}
              <div 
                className="absolute inset-16 rounded-full will-change-transform transition-transform duration-75"
                style={{
                  border: '1px solid rgba(255,255,255,0.05)',
                  transform: `rotate(${rotation * 0.3}deg)`
                }}
              />

              {/* Orbiting SVG Elements */}
              {orbitingElements.map((element, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 will-change-transform"
                  style={{
                    transform: `rotate(${element.angle}deg) translateY(-${element.orbitRadius})`,
                  }}
                >
                  {/* Glow effect behind icon */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: element.glowColor,
                      filter: 'blur(8px)',
                      transform: 'scale(1.5)'
                    }}
                  />
                  {/* Counter-rotate to keep icons upright */}
                  <div
                    className="relative will-change-transform transition-transform duration-75"
                    style={{
                      transform: `rotate(${-element.angle - rotation}deg)`
                    }}
                  >
                    <element.Icon 
                      className={`${element.color} drop-shadow-lg`}
                      style={{ width: element.size, height: element.size }}
                    />
                  </div>
                </div>
              ))}

              {/* Center Container - Counter Rotating */}
              <div 
                className="w-48 h-48 relative flex items-center justify-center will-change-transform transition-transform duration-75"
                style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
              >
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl" />
                
                {/* Inner glow */}
                <div 
                  className="absolute inset-4 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(139,92,246,0.1) 0%, transparent 70%)'
                  }}
                />
                
                {/* Central SVG Symbol */}
                <CosmicSymbol className="w-32 h-32 text-white/60" />
                
                {/* Pulsing ring */}
                <div 
                  className="absolute inset-2 border border-white/5 rounded-2xl"
                  style={{
                    animation: 'pulse 3s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
            
            {/* Title with mix-blend */}
            <h1 
              className="absolute text-8xl font-black text-white mix-blend-exclusion pointer-events-none tracking-tighter select-none"
              style={{
                textShadow: '0 0 60px rgba(139,92,246,0.3)'
              }}
            >
              TURNOVER
            </h1>

            {/* Subtle particle dots */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full will-change-transform transition-transform duration-75"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 45 + rotation * (0.05 + i * 0.02)}deg) translateY(-35vh)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </DemoContainer>
  );
}