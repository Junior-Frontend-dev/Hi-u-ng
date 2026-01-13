import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

interface ScrollImageBasicProps {
  effectId?: string;
  variant?: string;
}

export default function ScrollImageBasic(props: ScrollImageBasicProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  
  // Resolve ID from either prop (LazyCache uses effectId, EffectRenderer uses variant)
  const id = props.effectId || props.variant || '';

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const p = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setProgress(p);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const getEffectStyle = () => {
    if (!id) return {};

    const isFade = id.includes('fade');
    const isRotate = id.includes('rotate');
    const isBlur = id.includes('blur');
    const isGrayscale = id.includes('grayscale');
    const isParallax = id.includes('parallax');

    let style: React.CSSProperties = {
        transition: 'transform 0.1s linear, filter 0.1s linear, opacity 0.1s linear',
    };

    if (isFade) {
        style.opacity = progress;
    }
    
    if (isRotate) {
        style.transform = `rotate(${progress * 360}deg)`;
    }

    if (isBlur) {
        // Blur Out: starts clear (0), ends blurry (20px)
        style.filter = `blur(${progress * 20}px)`;
    }

    if (isGrayscale) {
        // Grayscale to Color: starts grayscale (1), ends color (0)
        style.filter = `grayscale(${1 - progress})`;
    }

    if (isParallax) {
        // Image moves slower than scroll or in opposite direction
        style.transform = `translateY(${progress * 100}px)`;
        style.height = '120%'; // Make it taller to allow movement
    }

    return style;
  };

  const titleMap: Record<string, string> = {
    'scroll-image-fade': 'Image Fade',
    'scroll-image-rotate': 'Image Rotate',
    'scroll-image-blur': 'Image Blur Out',
    'scroll-image-grayscale': 'Grayscale to Color',
    'scroll-image-parallax': 'Image Parallax',
  };

  const isParallax = id.includes('parallax');

  return (
    <DemoContainer>
      <div 
        ref={scrollRef} 
        className="h-full w-full overflow-y-auto relative scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <div className="sticky top-0 h-full w-full flex items-center justify-center overflow-hidden bg-black">
            <div className={`relative w-80 h-96 overflow-hidden rounded-xl ${isParallax ? '' : 'shadow-2xl'}`}>
                <img 
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
                    alt="Effect Demo" 
                    className={`w-full h-full object-cover rounded-xl ${isParallax ? 'absolute top-[-10%]' : ''}`}
                    style={getEffectStyle()}
                />
            </div>
            
            <div className="absolute bottom-10 text-white/50 text-sm font-mono animate-pulse pointer-events-none mix-blend-difference">
                SCROLL TO SEE EFFECT
            </div>
            
            <div className="absolute top-10 left-10 text-white/90 font-bold text-xl drop-shadow-md pointer-events-none">
                {titleMap[id] || 'Image Effect'}
            </div>
        </div>
        
        {/* Scroll spacer */}
        <div className="h-[300vh]"></div>
      </div>
    </DemoContainer>
  );
}