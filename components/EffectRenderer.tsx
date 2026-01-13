import React, { Suspense, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { EffectParams } from '../types';

// --- Implementation Components ---
const ImplScroll = React.lazy(() => import('./effects/ImplScroll'));
const ImplNav = React.lazy(() => import('./effects/ImplNav'));
const ImplCard = React.lazy(() => import('./effects/ImplCard'));
const ImplForm = React.lazy(() => import('./effects/ImplForm'));
const ImplLoader = React.lazy(() => import('./effects/ImplLoader'));
const ImplVisual = React.lazy(() => import('./effects/ImplVisual'));
const ImplNature = React.lazy(() => import('./effects/ImplNature'));
const ImplCyber = React.lazy(() => import('./effects/ImplCyber'));
const ImplData = React.lazy(() => import('./effects/ImplData'));
const ImplCursorExtras = React.lazy(() => import('./effects/ImplCursorExtras'));
const ImplTextExtras = React.lazy(() => import('./effects/ImplTextExtras'));
const ImplLayoutExperimental = React.lazy(() => import('./effects/ImplLayoutExperimental'));
const ImplAdvanced = React.lazy(() => import('./effects/ImplAdvanced'));
const ComingSoon = React.lazy(() => import('./effects/ComingSoon'));

const modules = import.meta.glob('./effects/*.tsx');

const MANUAL_MAP: Record<string, string> = {
    'scroll-3d-grid': 'ScrollGridTunnel',
    'scroll-parallax-zoom': 'ScrollParallaxZoom',
    'cursor-magnetic-links': 'CursorMagneticLinks',
    'text-neon-flicker': 'TextNeon',
    'visual-glitch-image': 'VisualGlitchImage',
    'motion-path-follow': 'MotionPath',
    'three-particle-terrain': 'ThreeTerrain',
    'brand-logo-morph': 'BrandLogoMorph',
    'ux-micro-interaction': 'UxMicroLike',
    'experimental-noise-field': 'ExperimentalNoise',
    'scroll-image-zoom-scroll': 'ScrollImageZoom',
    'scroll-image-fade': 'ScrollImageBasic',
    'scroll-image-rotate': 'ScrollImageBasic',
    'scroll-image-parallax': 'ScrollImageBasic',
    'scroll-image-blur': 'ScrollImageBasic',
    'scroll-image-grayscale': 'ScrollImageBasic',
    'scroll-image-reveal': 'ScrollSlicing',
    'scroll-image-sticky': 'ScrollStacking',
    'scroll-image-grid': 'ScrollImageGrid',
    'scroll-image-sequence': 'ScrollImageSequence'
};

const toPascalCase = (str: string) => {
    return str.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

const getComponentLoader = (id: string) => {
    if (MANUAL_MAP[id]) {
        const fileName = `./effects/${MANUAL_MAP[id]}.tsx`;
        if (modules[fileName]) return modules[fileName];
    }

    const pascalName = toPascalCase(id);
    const pascalFile = `./effects/${pascalName}.tsx`;
    
    if (modules[pascalFile]) {
        return modules[pascalFile];
    }

    return null; 
};

export const preloadEffect = (id: string) => {
    const loader = getComponentLoader(id);
    if (loader) {
        loader();
    }
};

const LoadingFallback = () => (
    <div className="w-full h-full flex items-center justify-center text-white/20">
        <Loader2 className="animate-spin" size={24} />
    </div>
);

const ErrorFallback = ({ id }: { id: string }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] text-white p-8">
        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-2">Effect: {id}</h2>
        <p className="text-white/50 text-center max-w-md mb-6">
            This effect encountered an error and couldn't render properly.
        </p>
        <div className="text-sm text-white/30 font-mono">
            Please try selecting a different effect.
        </div>
    </div>
);

export const EffectRenderer = React.memo(({ id }: { id: string }) => {
    const Component = useMemo(() => {
        const loader = getComponentLoader(id);
        
        if (loader) {
            return React.lazy(loader as any);
        }

        if (id === 'progress-indicator') return ImplScroll;
        if (id.startsWith('scroll-image-')) return ImplScroll;
        if (id.startsWith('scroll-')) return ImplScroll;
        if (id.startsWith('nav-')) return ImplNav;
        if (id.startsWith('card-')) return ImplCard;
        if (id.startsWith('form-')) return ImplForm;
        if (id.startsWith('loader-')) return ImplLoader;
        if (id.startsWith('gallery-') || id.startsWith('modal-') || id.startsWith('toast-') || id.startsWith('tooltip-') || id.startsWith('accordion-') || id.startsWith('tabs-') || id.startsWith('dropdown-') || id.startsWith('breadcrumbs-') || id.startsWith('header-') || id.startsWith('footer-') || id.startsWith('sidebar-')) return ImplVisual;
        if (id.startsWith('cursor-')) return ImplCursorExtras;
        if (id.startsWith('text-')) return ImplTextExtras;
        if (id.startsWith('visual-')) return ImplVisual;
        if (id.startsWith('nature-')) return ImplNature;
        if (id.startsWith('cyber-')) return ImplCyber;
        if (id.startsWith('ux-')) return ImplVisual;
        if (id.startsWith('layout-exp-')) return ImplLayoutExperimental;
        
        if (
            id.startsWith('micro-') || 
            id.startsWith('data-') || 
            id.startsWith('cyber-') || 
            id.startsWith('nature-') || 
            id.startsWith('type-adv-')
        ) {
            return ImplAdvanced;
        }

        return ComingSoon;
    }, [id]);

    return (
        <ErrorBoundary fallback={<ErrorFallback id={id} />}>
            <Suspense fallback={<LoadingFallback />}>
                <Component variant={id} />
            </Suspense>
        </ErrorBoundary>
    );
});

EffectRenderer.displayName = 'EffectRenderer';
