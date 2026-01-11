import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode, Suspense, lazy, LazyExoticComponent } from 'react';

interface CacheEntry {
  component: LazyExoticComponent<any> | null;
  promise: Promise<any> | null;
  lastUsed: number;
  inView: boolean;
}

interface LazyCacheContextType {
  preloadEffect: (effectId: string) => void | Promise<void>;
  markAsUsed: (effectId: string) => void;
  setInView: (effectId: string, inView: boolean) => void;
  isLoaded: (effectId: string) => boolean;
  isLoading: (effectId: string) => boolean;
  getStats: () => { loaded: number; pending: number; cached: number };
}

const LazyCacheContext = createContext<LazyCacheContextType | null>(null);

const MAX_CACHED_EFFECTS = 8;
const UNLOAD_DELAY_MS = 60000;
const CHECK_INTERVAL_MS = 30000;

export function useLazyCache() {
  const context = useContext(LazyCacheContext);
  if (!context) {
    throw new Error('useLazyCache must be used within LazyCacheProvider');
  }
  return context;
}

interface EffectComponentMap {
  [key: string]: () => Promise<{ default: React.ComponentType<any> }>;
}

const effectComponentMap: EffectComponentMap = {
  'vietnam-flag': () => import('./effects/VietnamFlag'),
  'vietnam-drum': () => import('./effects/VietnamDrum'),
  'vietnam-map': () => import('./effects/VietnamMap'),
  'parallax-basic': () => import('./effects/ParallaxBasic'),
  'parallax-multi': () => import('./effects/ParallaxMulti'),
  'horizontal-scroll': () => import('./effects/HorizontalScroll'),
  'scroll-trigger': () => import('./effects/ScrollTrigger'),
  'scroll-snap': () => import('./effects/ScrollSnap'),
  'scroll-velocity': () => import('./effects/ScrollVelocity'),
  'scroll-stacking': () => import('./effects/ScrollStacking'),
  'scroll-text-fill': () => import('./effects/ScrollTextFill'),
  'scroll-split': () => import('./effects/ScrollSplit'),
  'scroll-blend': () => import('./effects/ScrollBlend'),
  'scroll-line-reveal': () => import('./effects/ScrollLineReveal'),
  'scroll-marquee': () => import('./effects/ScrollMarquee'),
  'scroll-staggered-fill': () => import('./effects/ScrollStaggeredFill'),
  'scroll-video': () => import('./effects/ScrollVideo'),
  'scroll-zoom': () => import('./effects/ScrollZoom'),
  'scroll-zoom-world': () => import('./effects/ScrollZoomWorld'),
  'scroll-rotation': () => import('./effects/ScrollRotation'),
  'scroll-scale': () => import('./effects/ScrollScale'),
  'scroll-blur': () => import('./effects/ScrollBlur'),
  'scroll-reveal': () => import('./effects/ScrollReveal'),
  'cursor-custom': () => import('./effects/CursorCustom'),
  'cursor-follower': () => import('./effects/CursorFollower'),
  'cursor-magnetic': () => import('./effects/CursorMagnetic'),
  'cursor-distortion': () => import('./effects/CursorDistortion'),
  'cursor-reveal': () => import('./effects/CursorReveal'),
  'cursor-blend': () => import('./effects/CursorBlend'),
  'cursor-trail': () => import('./effects/CursorTrail'),
  'cursor-ripple': () => import('./effects/CursorRipple'),
  'cursor-scale': () => import('./effects/CursorScale'),
  'cursor-tooltip': () => import('./effects/CursorTooltip'),
  'cursor-spotlight': () => import('./effects/CursorSpotlight'),
  'cursor-gravity': () => import('./effects/CursorGravity'),
  'cursor-tilt': () => import('./effects/CursorTilt'),
  'cursor-noise': () => import('./effects/CursorNoise'),
  'cursor-morph': () => import('./effects/CursorMorph'),
  'cursor-physics': () => import('./effects/CursorPhysics'),
  'cursor-liquid': () => import('./effects/CursorLiquid'),
  'cursor-hover-gravity': () => import('./effects/CursorHoverGravity'),
  'cursor-displacement-map': () => import('./effects/CursorDisplacementMap'),
  'cursor-spotlight-video': () => import('./effects/CursorSpotlightVideo'),
  'cursor-sound': () => import('./effects/CursorSound'),
  'cursor-parallax-depth': () => import('./effects/CursorParallaxDepth'),
  'cursor-speed-scale': () => import('./effects/CursorSpeedScale'),
  'cursor-magnetic-text': () => import('./effects/CursorMagneticText'),
  'cursor-reveal-ui': () => import('./effects/CursorRevealUI'),
  'type-split': () => import('./effects/TypeSplit'),
  'type-mask': () => import('./effects/TypeMask'),
  'type-stroke': () => import('./effects/TypeStroke'),
  'type-fill': () => import('./effects/TypeFill'),
  'type-variable': () => import('./effects/TypeVariable'),
  'type-3d': () => import('./effects/Type3D'),
  'type-kinetic': () => import('./effects/TypeKinetic'),
  'type-typewriter': () => import('./effects/TypeTypewriter'),
  'type-distortion': () => import('./effects/TypeDistortion'),
  'type-displacement': () => import('./effects/TypeDisplacement'),
  'visual-masking': () => import('./effects/VisualMasking'),
  'visual-image-reveal': () => import('./effects/VisualImageReveal'),
  'visual-clip-path': () => import('./effects/VisualClipPath'),
  'visual-glassmorphism': () => import('./effects/VisualGlassmorphism'),
  'visual-glitch-image': () => import('./effects/VisualGlitchImage'),
  'visual-neumorphism': () => import('./effects/VisualNeumorphism'),
  'visual-brutalist': () => import('./effects/VisualBrutalist'),
  'visual-cinematic': () => import('./effects/VisualCinematic'),
  'visual-noise': () => import('./effects/VisualNoise'),
  'visual-theme-switch': () => import('./effects/VisualThemeSwitch'),
  'visual-inversion': () => import('./effects/VisualInversion'),
  'ux-hesitation': () => import('./effects/UxHesitation'),
  'ux-predictive': () => import('./effects/UxPredictive'),
  'ux-rhythm': () => import('./effects/UxRhythm'),
  'ux-pacing': () => import('./effects/UxPacing'),
  'ux-scroll-rhythm': () => import('./effects/UxScrollRhythm'),
  'ux-no-buttons': () => import('./effects/UxNoButtons'),
  'ux-implicit': () => import('./effects/UxImplicit'),
  'ux-friction': () => import('./effects/UxFriction'),
  'ux-exploratory': () => import('./effects/UxExploratory'),
  'ux-resistance': () => import('./effects/UxResistance'),
  'ux-curiosity': () => import('./effects/UxCuriosity'),
  'ux-onetime': () => import('./effects/UxOneTime'),
  'ux-evolution': () => import('./effects/UxEvolution'),
  'ux-affordance': () => import('./effects/UxAffordance'),
  'ux-mystery': () => import('./effects/UxMystery'),
  'ux-focus': () => import('./effects/UxFocus'),
  'ux-delayed': () => import('./effects/UxDelayed'),
  'ux-memory': () => import('./effects/UxMemory'),
  'ux-surprise': () => import('./effects/UxSurprise'),
  'ux-storytelling': () => import('./effects/UxStorytelling'),
  'ux-micro-like': () => import('./effects/UxMicroLike'),
  'signature-ai-bg': () => import('./effects/SignatureAiBg'),
  'signature-emotion': () => import('./effects/SignatureEmotion'),
  'signature-film': () => import('./effects/SignatureFilm'),
  'signature-movie': () => import('./effects/SignatureMovie'),
  'signature-narrative': () => import('./effects/SignatureNarrative'),
  'experimental-audio': () => import('./effects/ExperimentalAudio'),
  'experimental-time': () => import('./effects/ExperimentalTime'),
  'experimental-ai': () => import('./effects/ExperimentalAI'),
  'experimental-story': () => import('./effects/ExperimentalStory'),
  'experimental-timeline': () => import('./effects/ExperimentalTimeline'),
  'experimental-noise-field': () => import('./effects/ExperimentalNoise'),
  'brand-morphing': () => import('./effects/BrandMorphing'),
  'brand-living-logo': () => import('./effects/BrandLivingLogo'),
  'brand-reactive': () => import('./effects/BrandReactive'),
  'brand-reconstruct': () => import('./effects/BrandReconstruct'),
  'brand-motion-lang': () => import('./effects/BrandMotionLang'),
  'brand-distortion': () => import('./effects/BrandDistortion'),
  'brand-patterns': () => import('./effects/BrandPatterns'),
  'brand-sound': () => import('./effects/BrandSound'),
  'brand-typography': () => import('./effects/BrandTypography'),
  'brand-reveal': () => import('./effects/BrandReveal'),
  'brand-depth': () => import('./effects/BrandDepth'),
  'brand-negative': () => import('./effects/BrandNegative'),
  'brand-disintegrate': () => import('./effects/BrandDisintegrate'),
  'brand-environment': () => import('./effects/BrandEnvironment'),
  'brand-time': () => import('./effects/BrandTime'),
  'brand-physics': () => import('./effects/BrandPhysics'),
  'brand-random': () => import('./effects/BrandRandom'),
  'brand-exploration': () => import('./effects/BrandExploration'),
  'brand-silent': () => import('./effects/BrandSilent'),
  'brand-experience': () => import('./effects/BrandExperience'),
  'brand-logo-morph': () => import('./effects/BrandLogoMorph'),
  'motion-reverse': () => import('./effects/MotionReverse'),
  'motion-breathing': () => import('./effects/MotionBreathing'),
  'motion-blur-ui': () => import('./effects/MotionBlurUI'),
  'motion-offset': () => import('./effects/MotionOffset'),
  'motion-layout-shift': () => import('./effects/MotionLayoutShift'),
  'motion-elastic': () => import('./effects/MotionElastic'),
  'motion-liquid-morph': () => import('./effects/MotionLiquidMorph'),
  'motion-noise': () => import('./effects/MotionNoise'),
  'motion-hand-drawn': () => import('./effects/MotionHandDrawn'),
  'motion-minimal': () => import('./effects/MotionMinimal'),
  'motion-typo-story': () => import('./effects/MotionTypoStory'),
  'motion-sync': () => import('./effects/MotionSync'),
  'motion-guide': () => import('./effects/MotionGuide'),
  'motion-easing': () => import('./effects/MotionEasing'),
  'motion-bloom': () => import('./effects/MotionBloom'),
  'motion-blur-reveal': () => import('./effects/MotionBlurReveal'),
  'motion-afterimage': () => import('./effects/MotionAfterimage'),
  'motion-physics-collapse': () => import('./effects/MotionPhysicsCollapse'),
  'motion-time': () => import('./effects/MotionTime'),
  'motion-cut': () => import('./effects/MotionCut'),
  'motion-path': () => import('./effects/MotionPath'),
  'three-ambient': () => import('./effects/ThreeAmbient'),
  'three-character': () => import('./effects/ThreeCharacter'),
  'three-depth-blur': () => import('./effects/ThreeDepthBlur'),
  'three-depth-map': () => import('./effects/ThreeDepthMap'),
  'three-dolly': () => import('./effects/ThreeDolly'),
  'three-env-story': () => import('./effects/ThreeEnvStory'),
  'three-explode': () => import('./effects/ThreeExplode'),
  'three-floating': () => import('./effects/ThreeFloating'),
  'three-fog': () => import('./effects/ThreeFog'),
  'three-gallery': () => import('./effects/ThreeGallery'),
  'three-geometry': () => import('./effects/ThreeGeometry'),
  'three-glass': () => import('./effects/ThreeGlass'),
  'three-hologram': () => import('./effects/ThreeHologram'),
  'three-liquid': () => import('./effects/ThreeLiquid'),
  'three-mouse-rotate': () => import('./effects/ThreeMouseRotate'),
  'three-shader-text': () => import('./effects/ThreeShaderText'),
  'three-shadow': () => import('./effects/ThreeShadow'),
  'three-terrain': () => import('./effects/ThreeTerrain'),
  'three-transition': () => import('./effects/ThreeTransition'),
  'three-tunnel': () => import('./effects/ThreeTunnel'),
  'three-volumetric': () => import('./effects/ThreeVolumetric'),
  'text-cinematic': () => import('./effects/TextCinematic'),
  'text-clipping': () => import('./effects/TextClipping'),
  'text-extrusion': () => import('./effects/TextExtrusion'),
  'text-glitch-hover': () => import('./effects/TextGlitchHover'),
  'text-gravity': () => import('./effects/TextGravity'),
  'text-ink': () => import('./effects/TextInk'),
  'text-kinetic-story': () => import('./effects/TextKineticStory'),
  'text-nav': () => import('./effects/TextNav'),
  'text-neon': () => import('./effects/TextNeon'),
  'text-noise': () => import('./effects/TextNoise'),
  'text-parallax-layers': () => import('./effects/TextParallaxLayers'),
  'text-particle': () => import('./effects/TextParticle'),
  'text-stroke-draw': () => import('./effects/TextStrokeDraw'),
  'text-variable-axis': () => import('./effects/TextVariableAxis'),
  'text-video-mask': () => import('./effects/TextVideoMask'),
  'text-wave': () => import('./effects/TextWave'),
  'scroll-assembly': () => import('./effects/ScrollAssembly'),
  'scroll-camera': () => import('./effects/ScrollCamera'),
  'scroll-freeze': () => import('./effects/ScrollFreeze'),
  'scroll-light': () => import('./effects/ScrollLight'),
  'scroll-morph-logo': () => import('./effects/ScrollMorphLogo'),
  'scroll-pinning': () => import('./effects/ScrollPinning'),
  'scroll-shake': () => import('./effects/ScrollShake'),
  'scroll-slicing': () => import('./effects/ScrollSlicing'),
  'scroll-slider': () => import('./effects/ScrollSlider'),
  'scroll-spotlight-text': () => import('./effects/ScrollSpotlightText'),
  'scroll-svg-mask': () => import('./effects/ScrollSvgMask'),
  'scroll-timeline-reveal': () => import('./effects/ScrollTimelineReveal'),
  'scroll-3d-grid': () => import('./effects/ScrollGridTunnel'),
  'scroll-parallax-zoom': () => import('./effects/ScrollParallaxZoom'),
  'cursor-magnetic-links': () => import('./effects/CursorMagneticLinks'),
  'text-neon-glow': () => import('./effects/TextNeon'),
  'text-neon-flicker': () => import('./effects/TextNeon'),
};

export function LazyCacheProvider({ children }: { children: ReactNode }) {
  const cacheRef = useRef<Map<string, CacheEntry>>(new Map());
  const loadingRef = useRef<Map<string, Promise<any>>>(new Map());
  const [loadedSet, setLoadedSet] = React.useState(() => new Set<string>());
  const checkTimerRef = useRef<number>();

  const preloadEffect = useCallback(async (effectId: string) => {
    const cache = cacheRef.current;
    const loading = loadingRef.current;
    
    if (cache.has(effectId)) {
      cache.get(effectId)!.lastUsed = Date.now();
      return;
    }
    
    if (loading.has(effectId)) {
      return loading.get(effectId);
    }
    
    const importer = effectComponentMap[effectId];
    if (!importer) {
      return;
    }
    
    const loadPromise = importer().then(module => {
      const component = lazy(() => Promise.resolve(module));
      cache.set(effectId, {
        component,
        promise: loadPromise,
        lastUsed: Date.now(),
        inView: false,
      });
      loading.delete(effectId);
      setLoadedSet(prev => new Set([...prev, effectId]));
      return component;
    }).catch(err => {
      console.warn(`Failed to load effect: ${effectId}`, err);
      loading.delete(effectId);
      return null;
    });
    
    loading.set(effectId, loadPromise);
    return loadPromise;
  }, []);

  const markAsUsed = useCallback((effectId: string) => {
    const entry = cacheRef.current.get(effectId);
    if (entry) {
      entry.lastUsed = Date.now();
    }
  }, []);

  const setInView = useCallback((effectId: string, inView: boolean) => {
    const entry = cacheRef.current.get(effectId);
    if (entry) {
      entry.inView = inView;
      if (inView) {
        entry.lastUsed = Date.now();
      }
    }
  }, []);

  const isLoaded = useCallback((effectId: string) => {
    return cacheRef.current.has(effectId) && cacheRef.current.get(effectId)?.component !== null;
  }, []);

  const isLoading = useCallback((effectId: string) => {
    return loadingRef.current.has(effectId);
  }, []);

  const getStats = useCallback(() => {
    return {
      loaded: loadedSet.size,
      pending: loadingRef.current.size,
      cached: cacheRef.current.size,
    };
  }, [loadedSet.size]);

  const cleanup = useCallback(() => {
    const cache = cacheRef.current;
    const now = Date.now();
    const toRemove: string[] = [];
    
    for (const [id, entry] of cache.entries()) {
      const timeSinceUse = now - entry.lastUsed;
      if (!entry.inView && timeSinceUse > UNLOAD_DELAY_MS) {
        toRemove.push(id);
      }
    }
    
    toRemove.forEach(id => {
      cache.delete(id);
      setLoadedSet(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    });
    
    if (cache.size > MAX_CACHED_EFFECTS) {
      const sorted = Array.from(cache.entries())
        .sort((a, b) => a[1].lastUsed - b[1].lastUsed);
      
      const excess = cache.size - MAX_CACHED_EFFECTS;
      sorted.slice(0, excess).forEach(([id]) => {
        cache.delete(id);
        setLoadedSet(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      });
    }
  }, []);

  useEffect(() => {
    checkTimerRef.current = window.setInterval(cleanup, CHECK_INTERVAL_MS);
    return () => {
      if (checkTimerRef.current) clearInterval(checkTimerRef.current);
    };
  }, [cleanup]);

  return (
    <LazyCacheContext.Provider value={{ preloadEffect, markAsUsed, setInView, isLoaded, isLoading, getStats }}>
      {children}
    </LazyCacheContext.Provider>
  );
}

export function useLazyEffect(effectId: string): { Component: React.ComponentType<any> | null; loading: boolean; loaded: boolean } {
  const { isLoaded, isLoading, preloadEffect } = useLazyCache();
  const importer = effectComponentMap[effectId];
  
  const Component = importer ? lazy(importer) : null;
  const loading = isLoading(effectId);
  const loaded = isLoaded(effectId);
  
  useEffect(() => {
    if (importer && !loaded && !loading) {
      preloadEffect(effectId);
    }
  }, [effectId, importer, loaded, loading, preloadEffect]);
  
  return { Component, loading, loaded };
}

export function LazyEffectRenderer({ effectId }: { effectId: string }) {
  const { Component, loading, loaded } = useLazyEffect(effectId);
  const { setInView } = useLazyCache();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(effectId, entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [effectId, setInView]);

  if (!Component) {
    return (
      <div ref={containerRef} className="h-full w-full flex items-center justify-center bg-neutral-900">
        <div className="flex items-center gap-3 text-neutral-400">
          <div className="w-6 h-6 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <React.Suspense fallback={
        <div className="h-full w-full flex items-center justify-center bg-neutral-900">
          <div className="flex items-center gap-3 text-neutral-400">
            <div className="w-6 h-6 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin" />
            <span>Loading {effectId}...</span>
          </div>
        </div>
      }>
        <Component effectId={effectId} />
      </React.Suspense>
    </div>
  );
}

export default LazyCacheProvider;
