import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ScrollControl } from '../ScrollControl';
import { ChevronRight, RefreshCw, Download, Upload, Heart, Star, Zap } from 'lucide-react';

export default function ImplScroll({ variant }: { variant: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
      
      if (scrollRef.current) {
        scrollRef.current.style.setProperty('--scroll-percent', String(progress));
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAutoScroll = () => setIsAutoScrolling(!isAutoScrolling);

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  ];

  const renderScrollImageZoom = () => (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: `url(${images[0]})`,
          transform: `scale(${1 + scrollProgress * 2})`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-black text-white text-center" style={{ transform: `scale(${1 - scrollProgress * 0.3})`, opacity: 1 - scrollProgress }}>
          ZOOM SCROLL
        </h1>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white">
        <p>Scroll to zoom in: {(scrollProgress * 100).toFixed(0)}%</p>
      </div>
    </div>
  );

  const renderScrollImageFade = () => (
    <div className="relative w-full h-screen">
      {images.slice(0, 3).map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${img})`,
            opacity: Math.max(0, Math.min(1, 1 - Math.abs(scrollProgress * 3 - i))),
          }}
        />
      ))}
      <div className="absolute bottom-10 left-10 text-white">
        <h2 className="text-4xl font-bold">FADE EFFECT</h2>
        <p>Images fade as you scroll</p>
      </div>
    </div>
  );

  const renderScrollImageRotate = () => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{
          transform: `rotate(${scrollProgress * 720}deg) scale(${1 - scrollProgress * 0.5})`,
        }}
      >
        <span className="text-4xl font-bold text-white">{(scrollProgress * 360).toFixed(0)}°</span>
      </div>
      <div className="absolute bottom-10 text-white text-center">
        <p>Rotation: {(scrollProgress * 360).toFixed(0)}°</p>
      </div>
    </div>
  );

  const renderScrollImageParallax = () => (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[0]})`,
          transform: `translateY(${scrollProgress * 100}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      <div className="absolute bottom-20 left-10 text-white">
        <h2 className="text-5xl font-black mb-4">PARALLAX</h2>
        <p className="text-lg">Background moves at different speed</p>
      </div>
    </div>
  );

  const renderScrollImageBlur = () => (
    <div className="relative w-full h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-100"
        style={{
          backgroundImage: `url(${images[1]})`,
          filter: `blur(${Math.max(0, (1 - scrollProgress) * 20)}px)`,
        }}
      />
      <div className="absolute bottom-10 left-10 text-white">
        <h2 className="text-4xl font-bold">BLUR FOCUS</h2>
        <p>Blur: {Math.max(0, (1 - scrollProgress) * 20).toFixed(1)}px</p>
      </div>
    </div>
  );

  const renderScrollImageGrayscale = () => (
    <div className="relative w-full h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-100"
        style={{
          backgroundImage: `url(${images[2]})`,
          filter: `grayscale(${Math.max(0, (1 - scrollProgress) * 100)}%)`,
        }}
      />
      <div className="absolute bottom-10 left-10 text-white">
        <h2 className="text-4xl font-bold">TO COLOR</h2>
        <p>Grayscale to full color</p>
      </div>
    </div>
  );

  const renderScrollImageReveal = () => (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[3]})`,
          clipPath: `inset(0 0 ${(1 - scrollProgress) * 100}% 0)`,
        }}
      />
      <div className="relative z-10 text-white text-center">
        <h2 className="text-5xl font-black">REVEAL</h2>
        <p>Image reveals from bottom</p>
      </div>
    </div>
  );

  const renderScrollImageSticky = () => (
    <div className="relative w-full">
      <div className="h-screen flex items-center justify-center bg-neutral-900">
        <h2 className="text-4xl font-bold text-white">STICKY STACK</h2>
      </div>
      {images.slice(0, 4).map((img, i) => (
        <div
          key={i}
          className="sticky top-20 w-full max-w-md mx-auto h-96 bg-neutral-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-4"
          style={{ top: 40 + i * 30 }}
        >
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 text-white font-bold">Card {i + 1}</div>
        </div>
      ))}
      <div className="h-screen flex items-center justify-center bg-neutral-900">
        <h2 className="text-4xl font-bold text-white">END</h2>
      </div>
    </div>
  );

  const renderScrollImageGrid = () => (
    <div className="relative w-full h-screen p-10">
      <div 
        className="grid w-full h-full gap-4 transition-all duration-100"
        style={{ gap: `${Math.max(1, scrollProgress * 50)}px` }}
      >
        {images.slice(0, 4).map((img, i) => (
          <div key={i} className="bg-neutral-800 rounded-xl overflow-hidden border border-white/10">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderScrollImageSequence = () => (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div className="relative w-full max-w-2xl aspect-video">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
            style={{ opacity: Math.abs(scrollProgress * images.length - i) < 0.5 ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="absolute bottom-10 text-white">
        <p>Frame: {Math.floor(scrollProgress * images.length)} / {images.length}</p>
      </div>
    </div>
  );

  const renderProgressIndicator = () => (
    <div className="relative w-full h-full bg-[#0A0A0A]">
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <div className="fixed bottom-8 right-8 flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" stroke="white/10" strokeWidth="2" />
            <circle 
              cx="18" cy="18" r="16" 
              fill="none" 
              stroke="url(#progressGradient)" 
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress * 100}
              className="transition-all duration-75"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="h-[200vh] p-10">
        <h1 className="text-4xl font-bold text-white mb-10">Progress Indicator Demo</h1>
        <p className="text-gray-400 mb-4">Scroll down to see the progress indicators in action.</p>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/10" />
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'scroll-image-zoom-scroll': return renderScrollImageZoom();
      case 'scroll-image-fade': return renderScrollImageFade();
      case 'scroll-image-rotate': return renderScrollImageRotate();
      case 'scroll-image-parallax': return renderScrollImageParallax();
      case 'scroll-image-blur': return renderScrollImageBlur();
      case 'scroll-image-grayscale': return renderScrollImageGrayscale();
      case 'scroll-image-reveal': return renderScrollImageReveal();
      case 'scroll-image-sticky': return renderScrollImageSticky();
      case 'scroll-image-grid': return renderScrollImageGrid();
      case 'scroll-image-sequence': return renderScrollImageSequence();
      case 'progress-indicator': return renderProgressIndicator();
      default: return renderScrollImageZoom();
    }
  };

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />
      <div ref={containerRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        {renderContent()}
      </div>
    </DemoContainer>
  );
}
