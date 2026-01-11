import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ImplTextExtras({ variant }: { variant: string }) {
  const [progress, setProgress] = useState(0);
  const [scrambleText, setScrambleText] = useState('DECRYPT');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (variant === 'text-gradient-flow') {
      const interval = setInterval(() => {
        setProgress(p => (p + 1) % 100);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [variant]);

  useEffect(() => {
    if (variant === 'text-scramble-hover' && isHovered) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let iterations = 0;
      const interval = setInterval(() => {
        setScrambleText('DECRYPT'.split('').map((letter, i) => {
          if (i < iterations) return 'DECRYPT'[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        iterations += 1/3;
        if (iterations >= 'DECRYPT'.length + 1) {
          clearInterval(interval);
          setScrambleText('DECRYPT');
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isHovered, variant]);

  const renderTextHighlightScroll = () => (
    <div className="relative w-full max-w-2xl">
      <p className="text-xl leading-relaxed text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        <span className="relative">
          <span className="absolute inset-0 bg-yellow-300/50 -skew-x-12 animate-[scan_3s_linear_infinite]" />
          <span className="relative">This text highlights</span>
        </span> 
        ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );

  const renderTextRotateScroll = () => (
    <div className="flex gap-4 overflow-hidden py-10">
      {['ROTATE', 'SKEW', 'SPIN', 'TILT', 'WARP'].map((word, i) => (
        <span 
          key={i} 
          className="text-6xl font-black text-gray-800 whitespace-nowrap"
          style={{ 
            transform: `rotate(${Math.sin(i + progress / 20) * 15}deg)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );

  const renderTextSpacingBreathe = () => (
    <h1 className="text-7xl font-black text-gray-800 tracking-[0em] animate-[breathe_2s_ease-in-out_infinite]">
      BREATHE
    </h1>
  );

  const renderTextBorderFill = () => (
    <div className="relative">
      <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-black to-gray-300 relative z-10">
        OUTLINE FILL
      </h1>
      <h1 className="text-7xl font-black absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 -z-10" style={{ WebkitTextStroke: '2px transparent' }}>
        OUTLINE FILL
      </h1>
    </div>
  );

  const renderTextImageFill = () => (
    <h1 
      className="text-7xl font-black text-transparent bg-clip-text bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80)',
        backgroundSize: '200% auto',
        backgroundPosition: `${progress}% center`,
      }}
    >
      IMAGE FILL
    </h1>
  );

  const renderTextSkewScroll = () => (
    <div className="flex flex-col items-center">
      {['ITALIC', 'ON', 'SCROLL'].map((word, i) => (
        <span 
          key={i}
          className="text-6xl font-black text-gray-800 italic"
          style={{ 
            transform: `skewX(${Math.sin(i + progress / 30) * 20}deg)`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );

  const renderTextBlurIn = () => (
    <h1 className="text-7xl font-black text-gray-800 filter blur-[10px] opacity-50 animate-[blur-in_1s_ease-out_forwards]">
      FOCUS IN
    </h1>
  );

  const renderTextScrambleHover = () => (
    <button 
      className="text-4xl font-mono font-bold text-gray-800 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {scrambleText}
    </button>
  );

  const renderTextTypewriterLoop = () => (
    <div className="text-center">
      <span className="text-4xl font-mono text-gray-800">Type, </span>
      <span className="text-4xl font-mono text-blue-600">Delete, </span>
      <span className="text-4xl font-mono text-green-600">Repeat.</span>
    </div>
  );

  const renderTextPathAnimation = () => (
    <svg className="w-96 h-48" viewBox="0 0 400 200">
      <path
        id="textPath"
        d="M20,100 Q100,20 200,100 T380,100"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
      />
      <text className="text-2xl font-bold fill-gray-800">
        <textPath href="#textPath" startOffset="0%">
          Follow the curve - Smooth motion
        </textPath>
      </text>
    </svg>
  );

  const renderText3dFold = () => (
    <div className="perspective-1000">
      <h1 
        className="text-7xl font-black text-gray-800 transition-transform duration-500 origin-top"
        style={{ transform: `perspective(1000px) rotateX(${Math.sin(progress / 20) * 30}deg)` }}
      >
        3D FOLD
      </h1>
    </div>
  );

  const renderTextShadowLong = () => (
    <h1 className="text-7xl font-black text-gray-200" style={{ 
      textShadow: '3px 3px 0 #9ca3af, 6px 6px 0 #6b7280, 9px 9px 0 #4b5563, 12px 12px 0 #374151',
    }}>
      LONG SHADOW
    </h1>
  );

  const renderTextNeonGlow = () => (
    <h1 className="text-7xl font-black text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[neon-flicker_3s_infinite]">
      NEON GLOW
    </h1>
  );

  const renderTextGradientFlow = () => (
    <h1 
      className="text-7xl font-black text-transparent bg-clip-text bg-[length:200%_auto] animate-[gradient-flow_2s_linear_infinite]"
      style={{ 
        backgroundImage: 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899)',
        backgroundPosition: `${progress}% center`,
      }}
    >
      GRADIENT FLOW
    </h1>
  );

  const renderTextMirrorReflection = () => (
    <div className="flex flex-col items-center">
      <h1 className="text-7xl font-black text-gray-800">MIRROR</h1>
      <h1 className="text-7xl font-black text-gray-300/50 transform scale-y-[-1] blur-[2px]">MIRROR</h1>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'text-highlight-scroll': return renderTextHighlightScroll();
      case 'text-rotate-scroll': return renderTextRotateScroll();
      case 'text-spacing-breathe': return renderTextSpacingBreathe();
      case 'text-border-fill': return renderTextBorderFill();
      case 'text-image-fill': return renderTextImageFill();
      case 'text-skew-scroll': return renderTextSkewScroll();
      case 'text-blur-in': return renderTextBlurIn();
      case 'text-scramble-hover': return renderTextScrambleHover();
      case 'text-typewriter-loop': return renderTextTypewriterLoop();
      case 'text-path-animation': return renderTextPathAnimation();
      case 'text-3d-fold': return renderText3dFold();
      case 'text-shadow-long': return renderTextShadowLong();
      case 'text-neon-glow': return renderTextNeonGlow();
      case 'text-gradient-flow': return renderTextGradientFlow();
      case 'text-mirror-reflection': return renderTextMirrorReflection();
      default: return renderTextGradientFlow();
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {renderContent()}
        <style>{`
          @keyframes gradient-flow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes breathe {
            0%, 100% { letter-spacing: 0em; }
            50% { letter-spacing: 0.2em; }
          }
          @keyframes blur-in {
            to { filter: blur(0); opacity: 1; }
          }
          @keyframes neon-flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
            20%, 24%, 55% { opacity: 0.8; }
          }
          @keyframes scan {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    </DemoContainer>
  );
}
