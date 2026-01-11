import React, { useState, useMemo, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminPage } from './components/AdminPage';
import { EFFECTS_DATA } from './constants';
import { CODE_MAP } from './data/code';
import { Loader2 } from 'lucide-react';
import { LazyCacheProvider, LazyEffectRenderer } from './components/LazyCache';

// Common fallback
const ComingSoon = React.lazy(() => import('./components/effects/ComingSoon'));

// --- EFFECT IMPORTS ---
const VietnamFlag = React.lazy(() => import('./components/effects/VietnamFlag'));
const VietnamDrum = React.lazy(() => import('./components/effects/VietnamDrum'));

const ParallaxBasic = React.lazy(() => import('./components/effects/ParallaxBasic'));
const ParallaxMulti = React.lazy(() => import('./components/effects/ParallaxMulti'));
const HorizontalScroll = React.lazy(() => import('./components/effects/HorizontalScroll'));
const ScrollTrigger = React.lazy(() => import('./components/effects/ScrollTrigger'));
const ScrollSnap = React.lazy(() => import('./components/effects/ScrollSnap'));
const ScrollProgress = React.lazy(() => import('./components/effects/ScrollProgress'));
const ScrollReveal = React.lazy(() => import('./components/effects/ScrollReveal'));
const ScrollBlur = React.lazy(() => import('./components/effects/ScrollBlur'));
const ScrollScale = React.lazy(() => import('./components/effects/ScrollScale'));
const ScrollRotation = React.lazy(() => import('./components/effects/ScrollRotation'));
const ScrollVelocity = React.lazy(() => import('./components/effects/ScrollVelocity'));
const ScrollStacking = React.lazy(() => import('./components/effects/ScrollStacking'));
const ScrollTextFill = React.lazy(() => import('./components/effects/ScrollTextFill'));
const ScrollSplit = React.lazy(() => import('./components/effects/ScrollSplit'));
const ScrollBlend = React.lazy(() => import('./components/effects/ScrollBlend'));
const ScrollLineReveal = React.lazy(() => import('./components/effects/ScrollLineReveal'));
const ScrollMarquee = React.lazy(() => import('./components/effects/ScrollMarquee'));
const ScrollStaggeredFill = React.lazy(() => import('./components/effects/ScrollStaggeredFill'));
const ScrollVideo = React.lazy(() => import('./components/effects/ScrollVideo'));
const ScrollCanvas = React.lazy(() => import('./components/effects/ScrollCanvas'));
const ScrollHijack = React.lazy(() => import('./components/effects/ScrollHijack'));
const ScrollInfinite = React.lazy(() => import('./components/effects/ScrollInfinite'));
const ScrollPinning = React.lazy(() => import('./components/effects/ScrollPinning'));
const ScrollMorph = React.lazy(() => import('./components/effects/ScrollMorph'));
const ScrollDepth = React.lazy(() => import('./components/effects/ScrollDepth'));
const ScrollDistortion = React.lazy(() => import('./components/effects/ScrollDistortion'));
const ScrollZoom = React.lazy(() => import('./components/effects/ScrollZoom'));
const ScrollColor = React.lazy(() => import('./components/effects/ScrollColor'));

const CursorCustom = React.lazy(() => import('./components/effects/CursorCustom'));
const CursorFollower = React.lazy(() => import('./components/effects/CursorFollower'));
const CursorMagnetic = React.lazy(() => import('./components/effects/CursorMagnetic'));
const CursorDistortion = React.lazy(() => import('./components/effects/CursorDistortion'));
const CursorReveal = React.lazy(() => import('./components/effects/CursorReveal'));
const CursorBlend = React.lazy(() => import('./components/effects/CursorBlend'));
const CursorTrail = React.lazy(() => import('./components/effects/CursorTrail'));
const CursorRipple = React.lazy(() => import('./components/effects/CursorRipple'));
const CursorScale = React.lazy(() => import('./components/effects/CursorScale'));
const CursorTooltip = React.lazy(() => import('./components/effects/CursorTooltip'));
const CursorSpotlight = React.lazy(() => import('./components/effects/CursorSpotlight'));
const CursorGravity = React.lazy(() => import('./components/effects/CursorGravity'));
const CursorTilt = React.lazy(() => import('./components/effects/CursorTilt'));
const CursorNoise = React.lazy(() => import('./components/effects/CursorNoise'));
const CursorMorph = React.lazy(() => import('./components/effects/CursorMorph'));

const TypeSplit = React.lazy(() => import('./components/effects/TypeSplit'));
const TypeMask = React.lazy(() => import('./components/effects/TypeMask'));
const TypeStroke = React.lazy(() => import('./components/effects/TypeStroke'));
const TypeFill = React.lazy(() => import('./components/effects/TypeFill'));
const TypeVariable = React.lazy(() => import('./components/effects/TypeVariable'));
const Type3D = React.lazy(() => import('./components/effects/Type3D'));
const TypeKinetic = React.lazy(() => import('./components/effects/TypeKinetic'));
const TypeTypewriter = React.lazy(() => import('./components/effects/TypeTypewriter'));
const TypeDistortion = React.lazy(() => import('./components/effects/TypeDistortion'));
const TypeDisplacement = React.lazy(() => import('./components/effects/TypeDisplacement'));

const LayoutAsymmetrical = React.lazy(() => import('./components/effects/LayoutAsymmetrical'));
const LayoutBrokenGrid = React.lazy(() => import('./components/effects/LayoutBrokenGrid'));
const LayoutOverlapping = React.lazy(() => import('./components/effects/LayoutOverlapping'));
const LayoutSticky = React.lazy(() => import('./components/effects/LayoutSticky'));
const LayoutFullscreen = React.lazy(() => import('./components/effects/LayoutFullscreen'));
const VisualMasking = React.lazy(() => import('./components/effects/VisualMasking'));
const VisualImageReveal = React.lazy(() => import('./components/effects/VisualImageReveal'));
const VisualClipPath = React.lazy(() => import('./components/effects/VisualClipPath'));
const VisualGlassmorphism = React.lazy(() => import('./components/effects/VisualGlassmorphism'));
const VisualNeumorphism = React.lazy(() => import('./components/effects/VisualNeumorphism'));
const VisualBrutalist = React.lazy(() => import('./components/effects/VisualBrutalist'));
const VisualCinematic = React.lazy(() => import('./components/effects/VisualCinematic'));
const VisualNoise = React.lazy(() => import('./components/effects/VisualNoise'));
const VisualThemeSwitch = React.lazy(() => import('./components/effects/VisualThemeSwitch'));
const VisualInversion = React.lazy(() => import('./components/effects/VisualInversion'));

const ExperimentalAudio = React.lazy(() => import('./components/effects/ExperimentalAudio'));
const ExperimentalTime = React.lazy(() => import('./components/effects/ExperimentalTime'));
const ExperimentalAI = React.lazy(() => import('./components/effects/ExperimentalAI'));
const ExperimentalStory = React.lazy(() => import('./components/effects/ExperimentalStory'));
const ExperimentalTimeline = React.lazy(() => import('./components/effects/ExperimentalTimeline'));

const ScrollCamera = React.lazy(() => import('./components/effects/ScrollCamera'));
const ScrollAssembly = React.lazy(() => import('./components/effects/ScrollAssembly'));
const ScrollTimelineReveal = React.lazy(() => import('./components/effects/ScrollTimelineReveal'));
const ScrollAudio = React.lazy(() => import('./components/effects/ScrollAudio'));
const ScrollShader = React.lazy(() => import('./components/effects/ScrollShader'));
const ScrollFreeze = React.lazy(() => import('./components/effects/ScrollFreeze'));
const ScrollMorphLogo = React.lazy(() => import('./components/effects/ScrollMorphLogo'));
const ScrollSlicing = React.lazy(() => import('./components/effects/ScrollSlicing'));
const ScrollDepthStack = React.lazy(() => import('./components/effects/ScrollDepthStack'));
const ScrollZoomWorld = React.lazy(() => import('./components/effects/ScrollZoomWorld'));
const ScrollSlider = React.lazy(() => import('./components/effects/ScrollSlider'));
const ScrollSpotlightText = React.lazy(() => import('./components/effects/ScrollSpotlightText'));
const ScrollNegativeSpace = React.lazy(() => import('./components/effects/ScrollNegativeSpace'));
const ScrollShake = React.lazy(() => import('./components/effects/ScrollShake'));
const ScrollLight = React.lazy(() => import('./components/effects/ScrollLight'));
const ScrollSvgMask = React.lazy(() => import('./components/effects/ScrollSvgMask'));
const ScrollErase = React.lazy(() => import('./components/effects/ScrollErase'));
const ScrollGravity = React.lazy(() => import('./components/effects/ScrollGravity'));
const ScrollFog = React.lazy(() => import('./components/effects/ScrollFog'));
const ScrollSceneSwitch = React.lazy(() => import('./components/effects/ScrollSceneSwitch'));

const CursorPhysics = React.lazy(() => import('./components/effects/CursorPhysics'));
const CursorLiquid = React.lazy(() => import('./components/effects/CursorLiquid'));
const CursorHoverGravity = React.lazy(() => import('./components/effects/CursorHoverGravity'));
const CursorDisplacementMap = React.lazy(() => import('./components/effects/CursorDisplacementMap'));
const CursorSpotlightVideo = React.lazy(() => import('./components/effects/CursorSpotlightVideo'));
const CursorSound = React.lazy(() => import('./components/effects/CursorSound'));
const CursorParallaxDepth = React.lazy(() => import('./components/effects/CursorParallaxDepth'));
const CursorSpeedScale = React.lazy(() => import('./components/effects/CursorSpeedScale'));
const CursorMagneticText = React.lazy(() => import('./components/effects/CursorMagneticText'));
const CursorRevealUI = React.lazy(() => import('./components/effects/CursorRevealUI'));
const CursorShaderBrush = React.lazy(() => import('./components/effects/CursorShaderBrush'));
const CursorTrailingParticles = React.lazy(() => import('./components/effects/CursorTrailingParticles'));
const CursorSlice = React.lazy(() => import('./components/effects/CursorSlice'));
const CursorInertia = React.lazy(() => import('./components/effects/CursorInertia'));
const CursorContextShape = React.lazy(() => import('./components/effects/CursorContextShape'));
const CursorVideoPreview = React.lazy(() => import('./components/effects/CursorVideoPreview'));
const CursorSpotlightText = React.lazy(() => import('./components/effects/CursorSpotlightText'));
const CursorLens = React.lazy(() => import('./components/effects/CursorLens'));
const CursorMultiFollower = React.lazy(() => import('./components/effects/CursorMultiFollower'));
const CursorGesture = React.lazy(() => import('./components/effects/CursorGesture'));

const MotionReverse = React.lazy(() => import('./components/effects/MotionReverse'));
const MotionBreathing = React.lazy(() => import('./components/effects/MotionBreathing'));
const MotionBlurUI = React.lazy(() => import('./components/effects/MotionBlurUI'));
const MotionOffset = React.lazy(() => import('./components/effects/MotionOffset'));
const MotionLayoutShift = React.lazy(() => import('./components/effects/MotionLayoutShift'));
const MotionElastic = React.lazy(() => import('./components/effects/MotionElastic'));
const MotionLiquidMorph = React.lazy(() => import('./components/effects/MotionLiquidMorph'));
const MotionNoise = React.lazy(() => import('./components/effects/MotionNoise'));
const MotionHandDrawn = React.lazy(() => import('./components/effects/MotionHandDrawn'));
const MotionMinimal = React.lazy(() => import('./components/effects/MotionMinimal'));
const MotionTypoStory = React.lazy(() => import('./components/effects/MotionTypoStory'));
const MotionSync = React.lazy(() => import('./components/effects/MotionSync'));
const MotionGuide = React.lazy(() => import('./components/effects/MotionGuide'));
const MotionEasing = React.lazy(() => import('./components/effects/MotionEasing'));
const MotionBloom = React.lazy(() => import('./components/effects/MotionBloom'));
const MotionBlurReveal = React.lazy(() => import('./components/effects/MotionBlurReveal'));
const MotionAfterimage = React.lazy(() => import('./components/effects/MotionAfterimage'));
const MotionPhysicsCollapse = React.lazy(() => import('./components/effects/MotionPhysicsCollapse'));
const MotionTime = React.lazy(() => import('./components/effects/MotionTime'));
const MotionCut = React.lazy(() => import('./components/effects/MotionCut'));

const MotionInactivity = React.lazy(() => import('./components/effects/MotionInactivity'));
const MotionScrollHesitation = React.lazy(() => import('./components/effects/MotionScrollHesitation'));
const MotionEcho = React.lazy(() => import('./components/effects/MotionEcho'));
const MotionSmear = React.lazy(() => import('./components/effects/MotionSmear'));
const MotionGlitchBurst = React.lazy(() => import('./components/effects/MotionGlitchBurst'));
const MotionFocusBlur = React.lazy(() => import('./components/effects/MotionFocusBlur'));
const MotionMelting = React.lazy(() => import('./components/effects/MotionMelting'));
const MotionFeedback = React.lazy(() => import('./components/effects/MotionFeedback'));
const MotionVibration = React.lazy(() => import('./components/effects/MotionVibration'));
const MotionHierarchy = React.lazy(() => import('./components/effects/MotionHierarchy'));
const MotionAcceleration = React.lazy(() => import('./components/effects/MotionAcceleration'));
const MotionDecay = React.lazy(() => import('./components/effects/MotionDecay'));
const MotionParallaxStack = React.lazy(() => import('./components/effects/MotionParallaxStack'));
const MotionDirectional = React.lazy(() => import('./components/effects/MotionDirectional'));
const MotionRevealSpeed = React.lazy(() => import('./components/effects/MotionRevealSpeed'));
const MotionAnticipation = React.lazy(() => import('./components/effects/MotionAnticipation'));
const MotionEmotion = React.lazy(() => import('./components/effects/MotionEmotion'));
const MotionInertia = React.lazy(() => import('./components/effects/MotionInertia'));
const MotionMemory = React.lazy(() => import('./components/effects/MotionMemory'));
const MotionStory = React.lazy(() => import('./components/effects/MotionStory'));

const TextExtrusion = React.lazy(() => import('./components/effects/TextExtrusion'));
const TextVideoMask = React.lazy(() => import('./components/effects/TextVideoMask'));
const TextParticle = React.lazy(() => import('./components/effects/TextParticle'));
const TextNoise = React.lazy(() => import('./components/effects/TextNoise'));
const TextWave = React.lazy(() => import('./components/effects/TextWave'));
const TextGravity = React.lazy(() => import('./components/effects/TextGravity'));
const TextParallaxLayers = React.lazy(() => import('./components/effects/TextParallaxLayers'));
const TextVariableAxis = React.lazy(() => import('./components/effects/TextVariableAxis'));
const TextClipping = React.lazy(() => import('./components/effects/TextClipping'));
const TextInk = React.lazy(() => import('./components/effects/TextInk'));
const TextStrokeDraw = React.lazy(() => import('./components/effects/TextStrokeDraw'));
const TextGlitchHover = React.lazy(() => import('./components/effects/TextGlitchHover'));
const TextCinematic = React.lazy(() => import('./components/effects/TextCinematic'));
const TextNav = React.lazy(() => import('./components/effects/TextNav'));
const TextKineticStory = React.lazy(() => import('./components/effects/TextKineticStory'));

const ThreeTunnel = React.lazy(() => import('./components/effects/ThreeTunnel'));
const ThreeLiquid = React.lazy(() => import('./components/effects/ThreeLiquid'));
const ThreeDepthMap = React.lazy(() => import('./components/effects/ThreeDepthMap'));
const ThreeGlass = React.lazy(() => import('./components/effects/ThreeGlass'));
const ThreeGallery = React.lazy(() => import('./components/effects/ThreeGallery'));
const ThreeCharacter = React.lazy(() => import('./components/effects/ThreeCharacter'));
const ThreeFloating = React.lazy(() => import('./components/effects/ThreeFloating'));
const ThreeShaderText = React.lazy(() => import('./components/effects/ThreeShaderText'));
const ThreeExplode = React.lazy(() => import('./components/effects/ThreeExplode'));
const ThreeMouseRotate = React.lazy(() => import('./components/effects/ThreeMouseRotate'));
const ThreeEnvStory = React.lazy(() => import('./components/effects/ThreeEnvStory'));
const ThreeDepthBlur = React.lazy(() => import('./components/effects/ThreeDepthBlur'));
const ThreeShadow = React.lazy(() => import('./components/effects/ThreeShadow'));
const ThreeAmbient = React.lazy(() => import('./components/effects/ThreeAmbient'));
const ThreeTransition = React.lazy(() => import('./components/effects/ThreeTransition'));
const ThreeHologram = React.lazy(() => import('./components/effects/ThreeHologram'));
const ThreeVolumetric = React.lazy(() => import('./components/effects/ThreeVolumetric'));
const ThreeFog = React.lazy(() => import('./components/effects/ThreeFog'));
const ThreeDolly = React.lazy(() => import('./components/effects/ThreeDolly'));
const ThreeGeometry = React.lazy(() => import('./components/effects/ThreeGeometry'));

const SignatureEmotion = React.lazy(() => import('./components/effects/SignatureEmotion'));
const SignatureAiBg = React.lazy(() => import('./components/effects/SignatureAiBg'));
const SignatureNarrative = React.lazy(() => import('./components/effects/SignatureNarrative'));
const SignatureFilm = React.lazy(() => import('./components/effects/SignatureFilm'));
const SignatureMovie = React.lazy(() => import('./components/effects/SignatureMovie'));

const UxHesitation = React.lazy(() => import('./components/effects/UxHesitation'));
const UxPredictive = React.lazy(() => import('./components/effects/UxPredictive'));
const UxRhythm = React.lazy(() => import('./components/effects/UxRhythm'));
const UxPacing = React.lazy(() => import('./components/effects/UxPacing'));
const UxScrollRhythm = React.lazy(() => import('./components/effects/UxScrollRhythm'));
const UxNoButtons = React.lazy(() => import('./components/effects/UxNoButtons'));
const UxImplicit = React.lazy(() => import('./components/effects/UxImplicit'));
const UxFriction = React.lazy(() => import('./components/effects/UxFriction'));
const UxExploratory = React.lazy(() => import('./components/effects/UxExploratory'));
const UxResistance = React.lazy(() => import('./components/effects/UxResistance'));
const UxCuriosity = React.lazy(() => import('./components/effects/UxCuriosity'));
const UxOneTime = React.lazy(() => import('./components/effects/UxOneTime'));
const UxEvolution = React.lazy(() => import('./components/effects/UxEvolution'));
const UxAffordance = React.lazy(() => import('./components/effects/UxAffordance'));
const UxMystery = React.lazy(() => import('./components/effects/UxMystery'));
const UxFocus = React.lazy(() => import('./components/effects/UxFocus'));
const UxDelayed = React.lazy(() => import('./components/effects/UxDelayed'));
const UxMemory = React.lazy(() => import('./components/effects/UxMemory'));
const UxSurprise = React.lazy(() => import('./components/effects/UxSurprise'));
const UxStorytelling = React.lazy(() => import('./components/effects/UxStorytelling'));

const BrandMorphing = React.lazy(() => import('./components/effects/BrandMorphing'));
const BrandLivingLogo = React.lazy(() => import('./components/effects/BrandLivingLogo'));
const BrandReactive = React.lazy(() => import('./components/effects/BrandReactive'));
const BrandReconstruct = React.lazy(() => import('./components/effects/BrandReconstruct'));
const BrandMotionLang = React.lazy(() => import('./components/effects/BrandMotionLang'));
const BrandDistortion = React.lazy(() => import('./components/effects/BrandDistortion'));
const BrandPatterns = React.lazy(() => import('./components/effects/BrandPatterns'));
const BrandSound = React.lazy(() => import('./components/effects/BrandSound'));
const BrandTypography = React.lazy(() => import('./components/effects/BrandTypography'));
const BrandReveal = React.lazy(() => import('./components/effects/BrandReveal'));
const BrandDepth = React.lazy(() => import('./components/effects/BrandDepth'));
const BrandNegative = React.lazy(() => import('./components/effects/BrandNegative'));
const BrandDisintegrate = React.lazy(() => import('./components/effects/BrandDisintegrate'));
const BrandEnvironment = React.lazy(() => import('./components/effects/BrandEnvironment'));
const BrandTime = React.lazy(() => import('./components/effects/BrandTime'));
const BrandPhysics = React.lazy(() => import('./components/effects/BrandPhysics'));
const BrandRandom = React.lazy(() => import('./components/effects/BrandRandom'));
const BrandExploration = React.lazy(() => import('./components/effects/BrandExploration'));
const BrandSilent = React.lazy(() => import('./components/effects/BrandSilent'));
const BrandExperience = React.lazy(() => import('./components/effects/BrandExperience'));

const ScrollGridTunnel = React.lazy(() => import('./components/effects/ScrollGridTunnel'));
const ScrollParallaxZoom = React.lazy(() => import('./components/effects/ScrollParallaxZoom'));
const CursorMagneticLinks = React.lazy(() => import('./components/effects/CursorMagneticLinks'));
const TextNeon = React.lazy(() => import('./components/effects/TextNeon'));
const VisualGlitchImage = React.lazy(() => import('./components/effects/VisualGlitchImage'));
const MotionPath = React.lazy(() => import('./components/effects/MotionPath'));
const ThreeTerrain = React.lazy(() => import('./components/effects/ThreeTerrain'));
const BrandLogoMorph = React.lazy(() => import('./components/effects/BrandLogoMorph'));
const UxMicroLike = React.lazy(() => import('./components/effects/UxMicroLike'));
const ExperimentalNoise = React.lazy(() => import('./components/effects/ExperimentalNoise'));

// --- IMPLEMENTATION COMPONENTS ---
const ImplScroll = React.lazy(() => import('./components/effects/ImplScroll'));
const ImplNav = React.lazy(() => import('./components/effects/ImplNav'));
const ImplCard = React.lazy(() => import('./components/effects/ImplCard'));
const ImplButton = React.lazy(() => import('./components/effects/ImplButton'));
const ImplVisual = React.lazy(() => import('./components/effects/ImplVisual'));
const ImplCursorExtras = React.lazy(() => import('./components/effects/ImplCursorExtras'));
const ImplTextExtras = React.lazy(() => import('./components/effects/ImplTextExtras'));
const ImplLayoutExperimental = React.lazy(() => import('./components/effects/ImplLayoutExperimental'));
const ImplAdvanced = React.lazy(() => import('./components/effects/ImplAdvanced'));

const COMPONENT_MAP: Record<string, React.LazyExoticComponent<any>> = {
  // Existing...
  'vietnam-flag': VietnamFlag,
  'vietnam-drum': VietnamDrum,
  'parallax-basic': ParallaxBasic,
  'parallax-multi': ParallaxMulti,
  'horizontal-scroll': HorizontalScroll,
  'scroll-trigger': ScrollTrigger,
  'scroll-snap': ScrollSnap,
  'progress-indicator': ScrollProgress,
  'scroll-reveal': ScrollReveal,
  'scroll-blur': ScrollBlur,
  'scroll-scale': ScrollScale,
  'scroll-rotation': ScrollRotation,
  'scroll-velocity': ScrollVelocity,
  'scroll-stacking': ScrollStacking,
  'scroll-text-fill': ScrollTextFill,
  'scroll-split': ScrollSplit,
  'scroll-blend': ScrollBlend,
  'scroll-line-reveal': ScrollLineReveal,
  'scroll-marquee': ScrollMarquee,
  'scroll-staggered-fill': ScrollStaggeredFill,
  'scroll-video': ScrollVideo,
  'scroll-canvas': ScrollCanvas,
  'scroll-hijack': ScrollHijack,
  'scroll-infinite': ScrollInfinite,
  'scroll-pinning': ScrollPinning,
  'scroll-morph': ScrollMorph,
  'scroll-depth': ScrollDepth,
  'scroll-distortion': ScrollDistortion,
  'scroll-zoom': ScrollZoom,
  'scroll-color': ScrollColor,
  'cursor-custom': CursorCustom,
  'cursor-follower': CursorFollower,
  'cursor-magnetic': CursorMagnetic,
  'cursor-distortion': CursorDistortion,
  'cursor-reveal': CursorReveal,
  'cursor-blend': CursorBlend,
  'cursor-trail': CursorTrail,
  'cursor-ripple': CursorRipple,
  'cursor-scale': CursorScale,
  'cursor-tooltip': CursorTooltip,
  'cursor-spotlight': CursorSpotlight,
  'cursor-gravity': CursorGravity,
  'cursor-tilt': CursorTilt,
  'cursor-noise': CursorNoise,
  'cursor-morph': CursorMorph,
  'type-split': TypeSplit,
  'type-mask': TypeMask,
  'type-stroke': TypeStroke,
  'type-fill': TypeFill,
  'type-variable': TypeVariable,
  'type-3d': Type3D,
  'type-kinetic': TypeKinetic,
  'type-typewriter': TypeTypewriter,
  'type-distortion': TypeDistortion,
  'type-displacement': TypeDisplacement,
  'layout-asymmetrical': LayoutAsymmetrical,
  'layout-broken-grid': LayoutBrokenGrid,
  'layout-overlapping': LayoutOverlapping,
  'layout-sticky': LayoutSticky,
  'layout-fullscreen': LayoutFullscreen,
  'visual-masking': VisualMasking,
  'visual-image-reveal': VisualImageReveal,
  'visual-clip-path': VisualClipPath,
  'visual-glassmorphism': VisualGlassmorphism,
  'visual-neumorphism': VisualNeumorphism,
  'visual-brutalist': VisualBrutalist,
  'visual-cinematic': VisualCinematic,
  'visual-noise': VisualNoise,
  'visual-theme-switch': VisualThemeSwitch,
  'visual-inversion': VisualInversion,
  'experimental-audio': ExperimentalAudio,
  'experimental-time': ExperimentalTime,
  'experimental-ai': ExperimentalAI,
  'experimental-story': ExperimentalStory,
  'experimental-timeline': ExperimentalTimeline,
  'scroll-camera': ScrollCamera,
  'scroll-assembly': ScrollAssembly,
  'scroll-timeline-reveal': ScrollTimelineReveal,
  'scroll-audio': ScrollAudio,
  'scroll-shader': ScrollShader,
  'scroll-freeze': ScrollFreeze,
  'scroll-morph-logo': ScrollMorphLogo,
  'scroll-slicing': ScrollSlicing,
  'scroll-depth-stack': ScrollDepthStack,
  'scroll-zoom-world': ScrollZoomWorld,
  'scroll-slider': ScrollSlider,
  'scroll-spotlight-text': ScrollSpotlightText,
  'scroll-negative-space': ScrollNegativeSpace,
  'scroll-shake': ScrollShake,
  'scroll-light': ScrollLight,
  'scroll-svg-mask': ScrollSvgMask,
  'scroll-erase': ScrollErase,
  'scroll-gravity': ScrollGravity,
  'scroll-fog': ScrollFog,
  'scroll-scene-switch': ScrollSceneSwitch,
  'cursor-physics': CursorPhysics,
  'cursor-liquid': CursorLiquid,
  'cursor-hover-gravity': CursorHoverGravity,
  'cursor-displacement-map': CursorDisplacementMap,
  'cursor-spotlight-video': CursorSpotlightVideo,
  'cursor-sound': CursorSound,
  'cursor-parallax-depth': CursorParallaxDepth,
  'cursor-speed-scale': CursorSpeedScale,
  'cursor-magnetic-text': CursorMagneticText,
  'cursor-reveal-ui': CursorRevealUI,
  'cursor-shader-brush': CursorShaderBrush,
  'cursor-trailing-particles': CursorTrailingParticles,
  'cursor-slice': CursorSlice,
  'cursor-inertia': CursorInertia,
  'cursor-context-shape': CursorContextShape,
  'cursor-video-preview': CursorVideoPreview,
  'cursor-spotlight-text': CursorSpotlightText,
  'cursor-lens': CursorLens,
  'cursor-multi-follower': CursorMultiFollower,
  'cursor-gesture': CursorGesture,
  'motion-reverse': MotionReverse,
  'motion-breathing': MotionBreathing,
  'motion-blur-ui': MotionBlurUI,
  'motion-offset': MotionOffset,
  'motion-layout-shift': MotionLayoutShift,
  'motion-elastic': MotionElastic,
  'motion-liquid-morph': MotionLiquidMorph,
  'motion-noise': MotionNoise,
  'motion-hand-drawn': MotionHandDrawn,
  'motion-minimal': MotionMinimal,
  'motion-typo-story': MotionTypoStory,
  'motion-sync': MotionSync,
  'motion-guide': MotionGuide,
  'motion-easing': MotionEasing,
  'motion-bloom': MotionBloom,
  'motion-blur-reveal': MotionBlurReveal,
  'motion-afterimage': MotionAfterimage,
  'motion-physics-collapse': MotionPhysicsCollapse,
  'motion-time': MotionTime,
  'motion-cut': MotionCut,
  'motion-inactivity': MotionInactivity,
  'motion-scroll-hesitation': MotionScrollHesitation,
  'motion-echo': MotionEcho,
  'motion-smear': MotionSmear,
  'motion-glitch-burst': MotionGlitchBurst,
  'motion-focus-blur': MotionFocusBlur,
  'motion-melting': MotionMelting,
  'motion-feedback': MotionFeedback,
  'motion-vibration': MotionVibration,
  'motion-hierarchy': MotionHierarchy,
  'motion-acceleration': MotionAcceleration,
  'motion-decay': MotionDecay,
  'motion-parallax-stack': MotionParallaxStack,
  'motion-directional': MotionDirectional,
  'motion-reveal-speed': MotionRevealSpeed,
  'motion-anticipation': MotionAnticipation,
  'motion-emotion': MotionEmotion,
  'motion-inertia': MotionInertia,
  'motion-memory': MotionMemory,
  'motion-story': MotionStory,
  'text-extrusion': TextExtrusion,
  'text-video-mask': TextVideoMask,
  'text-particle': TextParticle,
  'text-noise': TextNoise,
  'text-wave': TextWave,
  'text-gravity': TextGravity,
  'text-parallax-layers': TextParallaxLayers,
  'text-variable-axis': TextVariableAxis,
  'text-clipping': TextClipping,
  'text-ink': TextInk,
  'text-stroke-draw': TextStrokeDraw,
  'text-glitch-hover': TextGlitchHover,
  'text-cinematic': TextCinematic,
  'text-nav': TextNav,
  'text-kinetic-story': TextKineticStory,
  'three-tunnel': ThreeTunnel,
  'three-liquid': ThreeLiquid,
  'three-depth-map': ThreeDepthMap,
  'three-glass': ThreeGlass,
  'three-gallery': ThreeGallery,
  'three-character': ThreeCharacter,
  'three-floating': ThreeFloating,
  'three-shader-text': ThreeShaderText,
  'three-explode': ThreeExplode,
  'three-mouse-rotate': ThreeMouseRotate,
  'three-env-story': ThreeEnvStory,
  'three-depth-blur': ThreeDepthBlur,
  'three-shadow': ThreeShadow,
  'three-ambient': ThreeAmbient,
  'three-transition': ThreeTransition,
  'three-hologram': ThreeHologram,
  'three-volumetric': ThreeVolumetric,
  'three-fog': ThreeFog,
  'three-dolly': ThreeDolly,
  'three-geometry': ThreeGeometry,
  'signature-emotion': SignatureEmotion,
  'signature-ai-bg': SignatureAiBg,
  'signature-narrative': SignatureNarrative,
  'signature-film': SignatureFilm,
  'signature-movie': SignatureMovie,
  'ux-hesitation': UxHesitation,
  'ux-predictive': UxPredictive,
  'ux-rhythm': UxRhythm,
  'ux-pacing': UxPacing,
  'ux-scroll-rhythm': UxScrollRhythm,
  'ux-no-buttons': UxNoButtons,
  'ux-implicit': UxImplicit,
  'ux-friction': UxFriction,
  'ux-exploratory': UxExploratory,
  'ux-resistance': UxResistance,
  'ux-curiosity': UxCuriosity,
  'ux-onetime': UxOneTime,
  'ux-evolution': UxEvolution,
  'ux-affordance': UxAffordance,
  'ux-mystery': UxMystery,
  'ux-focus': UxFocus,
  'ux-delayed': UxDelayed,
  'ux-memory': UxMemory,
  'ux-surprise': UxSurprise,
  'ux-storytelling': UxStorytelling,
  'brand-morphing': BrandMorphing,
  'brand-living-logo': BrandLivingLogo,
  'brand-reactive': BrandReactive,
  'brand-reconstruct': BrandReconstruct,
  'brand-motion-lang': BrandMotionLang,
  'brand-distortion': BrandDistortion,
  'brand-patterns': BrandPatterns,
  'brand-sound': BrandSound,
  'brand-typography': BrandTypography,
  'brand-reveal': BrandReveal,
  'brand-depth': BrandDepth,
  'brand-negative': BrandNegative,
  'brand-disintegrate': BrandDisintegrate,
  'brand-environment': BrandEnvironment,
  'brand-time': BrandTime,
  'brand-physics': BrandPhysics,
  'brand-random': BrandRandom,
  'brand-exploration': BrandExploration,
  'brand-silent': BrandSilent,
  'brand-experience': BrandExperience,
  'scroll-3d-grid': ScrollGridTunnel,
  'scroll-parallax-zoom': ScrollParallaxZoom,
  'cursor-magnetic-links': CursorMagneticLinks,
  'text-neon-flicker': TextNeon,
  'visual-glitch-image': VisualGlitchImage,
  'motion-path-follow': MotionPath,
  'three-particle-terrain': ThreeTerrain,
  'brand-logo-morph': BrandLogoMorph,
  'ux-micro-interaction': UxMicroLike,
  'experimental-noise-field': ExperimentalNoise,
};

function App() {
  const [currentId, setCurrentId] = useState(EFFECTS_DATA[0].id);
  const [viewMode, setViewMode] = useState<'preview' | 'prompt' | 'code'>('preview');

  const currentEffect = useMemo(() => 
    EFFECTS_DATA.find(e => e.id === currentId) || EFFECTS_DATA[0], 
  [currentId]);

  let ActiveComponent: any = COMPONENT_MAP[currentId];

  if (!ActiveComponent) {
      if (currentId.startsWith('scroll-image-')) ActiveComponent = ImplScroll;
      else if (currentId.startsWith('nav-')) ActiveComponent = ImplNav;
      else if (currentId.startsWith('card-')) ActiveComponent = ImplCard;
      else if (currentId.startsWith('button-')) ActiveComponent = ImplButton;
      else if (currentId.startsWith('loader-') || currentId.startsWith('form-') || currentId.startsWith('gallery-') || currentId.startsWith('modal-') || currentId.startsWith('toast-') || currentId.startsWith('tooltip-') || currentId.startsWith('accordion-') || currentId.startsWith('tabs-') || currentId.startsWith('dropdown-') || currentId.startsWith('breadcrumbs-') || currentId.startsWith('header-') || currentId.startsWith('footer-') || currentId.startsWith('sidebar-')) ActiveComponent = ImplVisual;
      else if (currentId.startsWith('cursor-')) ActiveComponent = ImplCursorExtras;
      else if (currentId.startsWith('text-')) ActiveComponent = ImplTextExtras;
      else if (currentId.startsWith('visual-')) ActiveComponent = ImplVisual;
      else if (currentId.startsWith('ux-')) ActiveComponent = ImplVisual;
      else if (currentId.startsWith('layout-exp-')) ActiveComponent = ImplLayoutExperimental;
      
      else if (
          currentId.startsWith('micro-') || 
          currentId.startsWith('data-') || 
          currentId.startsWith('cyber-') || 
          currentId.startsWith('nature-') || 
          currentId.startsWith('type-adv-')
      ) {
          ActiveComponent = ImplAdvanced;
      }
      
      else ActiveComponent = ComingSoon;
  }

  React.useEffect(() => {
      setViewMode('preview'); 
  }, [currentId]);

  return (
    <LazyCacheProvider>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={
          <Layout 
            currentEffectId={currentId} 
            onSelectEffect={setCurrentId}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            currentCode={CODE_MAP[currentId]}
            currentPrompt={currentEffect.prompt}
          >
              <div className="w-full h-full lg:p-6 p-0">
                  <Suspense fallback={
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                          <Loader2 className="animate-spin" size={24} />
                      </div>
                  }>
                      <ActiveComponent variant={currentId} />
                  </Suspense>
              </div>
          </Layout>
        } />
      </Routes>
    </LazyCacheProvider>
  );
}

export default App;