import React, { memo, useState, useMemo } from 'react';
import { Menu, X, Search, ChevronDown, ChevronRight, Star, Eye, Sparkles, Code2, MessageSquare } from 'lucide-react';
import { EFFECTS_DATA } from '../constants';
import { preloadEffect } from './EffectRenderer';
import { useStore } from '../hooks/useStore';

// --- Category Config ---
const CATEGORIES = [
    { id: 'favorites', label: 'Favorites', prefixes: [] },
    { id: 'vietnam', label: 'Vietnam Special', prefixes: ['vietnam'] },
    { id: 'scroll', label: 'Scroll Effects', prefixes: ['scroll', 'parallax', 'horizontal', 'progress'] },
    { id: 'cursor', label: 'Cursor & Mouse', prefixes: ['cursor'] },
    { id: 'type', label: 'Typography', prefixes: ['type', 'text', 'type-adv'] },
    { id: 'layout', label: 'Layout & Grid', prefixes: ['layout'] },
    { id: 'layout-exp', label: 'Layout Experimental', prefixes: ['layout-exp'] },
    { id: 'visual', label: 'Visual Tricks', prefixes: ['visual'] },
    { id: 'motion', label: 'Motion & Animation', prefixes: ['motion'] },
    { id: 'three', label: '3D & WebGL', prefixes: ['three'] },
    { id: 'ux', label: 'Interaction UX', prefixes: ['ux'] },
    { id: 'brand', label: 'Brand Identity', prefixes: ['brand'] },
    { id: 'experimental', label: 'Experimental', prefixes: ['experimental'] },
    { id: 'signature', label: 'Signature Series', prefixes: ['signature'] },
    { id: 'micro', label: 'Micro-Interactions', prefixes: ['micro'] },
    { id: 'data', label: 'Data Visualization', prefixes: ['data'] },
    { id: 'cyber', label: 'Cyberpunk & Glitch', prefixes: ['cyber'] },
    { id: 'nature', label: 'Nature & Physics', prefixes: ['nature'] },
    { id: 'nav', label: 'Navigation', prefixes: ['nav'] },
    { id: 'card', label: 'Card Effects', prefixes: ['card'] },
    { id: 'button', label: 'Buttons', prefixes: ['button'] },
    { id: 'loader', label: 'Loaders', prefixes: ['loader'] },
    { id: 'form', label: 'Forms & Inputs', prefixes: ['form', 'input'] },
    { id: 'new', label: 'New Arrivals', prefixes: ['new', 'scroll-3d', 'scroll-parallax-zoom', 'cursor-magnetic-links', 'text-neon', 'visual-glitch', 'motion-path', 'three-particle', 'brand-logo', 'ux-micro', 'experimental-noise'] },
];

// --- Memoized Effect Button ---
const EffectButton = memo(({ effect, isActive, isFavorite, onToggleFavorite, onClick }: { effect: any, isActive: boolean, isFavorite: boolean, onToggleFavorite: (e: React.MouseEvent) => void, onClick: () => void }) => {
    const cleanTitle = effect.title.replace(/^\d+\.\s*/, '');
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => preloadEffect(effect.id)}
            className={`
                w-full group relative flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-200 rounded-lg text-left
                ${isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
            `}
        >
            <div className="flex items-center gap-3 overflow-hidden">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'bg-white/10'}`}></span>
                <span className="truncate font-medium text-[13px]">{cleanTitle}</span>
            </div>
            <div 
                onClick={onToggleFavorite}
                className={`p-1 rounded-full hover:bg-white/10 transition-colors ${isFavorite ? 'text-yellow-400 opacity-100' : 'text-gray-600 opacity-0 group-hover:opacity-100'}`}
            >
                <Star size={12} fill={isFavorite ? "currentColor" : "none"} />
            </div>
        </button>
    );
});

// --- Memoized Category Group ---
const CategoryGroup = memo(({ cat, items, isExpanded, onToggle, currentEffectId, onSelectEffect, favorites, onToggleFavorite }: any) => {
    if (!items || items.length === 0) return null;
    
    const isFavorites = cat.id === 'favorites';
    const isVietnam = cat.id === 'vietnam';
    const isNew = cat.id === 'new';
    const isExp = cat.id === 'layout-exp';

    return (
        <div className="border-b border-white/5 pb-2 last:border-0">
            <button 
                onClick={() => onToggle(cat.id)}
                className={`
                    w-full flex items-center justify-between py-3 px-2 text-xs font-bold uppercase tracking-wider transition-colors group 
                    ${isFavorites ? 'text-yellow-400 hover:text-yellow-300' : isVietnam ? 'text-red-500 hover:text-red-400' : isNew ? 'text-blue-400 hover:text-blue-300' : isExp ? 'text-purple-400 hover:text-purple-300' : 'text-gray-400 hover:text-white'}
                `}
            >
                <span className="flex items-center gap-2">
                    {cat.label}
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${isFavorites ? 'bg-yellow-500/10 text-yellow-400' : isVietnam ? 'bg-red-500/10 text-red-500' : isNew ? 'bg-blue-500/10 text-blue-400' : isExp ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-gray-500 group-hover:bg-white/10'}`}>
                        {items.length}
                    </span>
                </span>
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {isExpanded && (
                <div className="space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                    {items.map((effect: any) => (
                        <EffectButton 
                            key={effect.id} 
                            effect={effect} 
                            isActive={currentEffectId === effect.id} 
                            isFavorite={favorites.includes(effect.id)}
                            onToggleFavorite={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(effect.id);
                            }}
                            onClick={() => onSelectEffect(effect.id)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    currentEffectId: string;
    onSelectEffect: (id: string) => void;
    viewMode: string;
    onChangeViewMode: (mode: 'preview' | 'prompt' | 'code') => void;
    onFeedback: () => void;
}

export const Sidebar = memo(({ 
    isOpen, setIsOpen, currentEffectId, onSelectEffect, viewMode, onChangeViewMode, onFeedback
}: SidebarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCats, setExpandedCats] = useState<string[]>(['favorites', 'vietnam', 'micro', 'nature']);
    const { favorites, toggleFavorite } = useStore();

    // Auto-expand category logic
    React.useEffect(() => {
        const simplePrefix = currentEffectId.split('-')[0];
        const complexPrefix = currentEffectId.split('-')[0] + '-' + currentEffectId.split('-')[1];
        
        const cat = CATEGORIES.find(c => c.prefixes.includes(complexPrefix) || c.prefixes.includes(simplePrefix));
        const isNew = ['scroll-3d-grid', 'scroll-parallax-zoom', 'cursor-magnetic-links', 'text-neon-flicker', 'visual-glitch-image', 'motion-path-follow', 'three-particle-terrain', 'brand-logo-morph', 'ux-micro-interaction', 'experimental-noise-field'].includes(currentEffectId);
        
        if (isNew && !expandedCats.includes('new')) {
            setExpandedCats(prev => [...prev, 'new']);
        } else if (cat && !expandedCats.includes(cat.id)) {
            setExpandedCats(prev => [...prev, cat.id]);
        }
    }, [currentEffectId]);

    const groupedEffects = useMemo(() => {
        const groups: Record<string, typeof EFFECTS_DATA> = {};
        CATEGORIES.forEach(cat => groups[cat.id] = []);
        
        groups['favorites'] = EFFECTS_DATA.filter(e => favorites.includes(e.id));

        const filteredData = EFFECTS_DATA.filter(effect => 
            effect.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            effect.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filteredData.forEach(effect => {
            const prefix = effect.id.split('-')[0] + '-' + effect.id.split('-')[1];
            const simplePrefix = effect.id.split('-')[0];
            let matched = false;
            
            for (const cat of CATEGORIES) {
                if (cat.id === 'favorites') continue; 

                if (cat.id === 'new') {
                     if (['scroll-3d-grid', 'scroll-parallax-zoom', 'cursor-magnetic-links', 'text-neon-flicker', 'visual-glitch-image', 'motion-path-follow', 'three-particle-terrain', 'brand-logo-morph', 'ux-micro-interaction', 'experimental-noise-field'].includes(effect.id)) {
                        groups[cat.id].push(effect);
                        matched = true;
                        break;
                    }
                }
                if (!matched && (cat.prefixes.includes(prefix) || cat.prefixes.includes(simplePrefix))) {
                    groups[cat.id].push(effect);
                    matched = true;
                    break;
                }
            }
        });
        return groups;
    }, [searchQuery, favorites]);

    const toggleCategory = (id: string) => {
        setExpandedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    };

    return (
        <>
            <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-black/50 backdrop-blur-md z-50 flex items-center justify-between px-4 border-b border-white/5">
                <span className="font-bold tracking-tight">EffectLib An VietNam</span>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            <aside className={`
                fixed inset-y-0 left-0 z-40 w-80 bg-black/95 backdrop-blur-2xl border-r border-white/5 
                transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col relative z-10">
                    <div className="p-6 pb-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20">
                                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-white leading-none">EffectLib</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">An VietNam Library</p>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded-full text-white/60 font-mono">{EFFECTS_DATA.length}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" size={14} />
                            <input 
                                type="text" 
                                placeholder="Find an effect..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-white/10 focus:bg-white/10 transition-all"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"><X size={12} /></button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 hide-scrollbar">
                        {CATEGORIES.map(cat => (
                            <CategoryGroup 
                                key={cat.id} 
                                cat={cat} 
                                items={groupedEffects[cat.id]} 
                                isExpanded={expandedCats.includes(cat.id)} 
                                onToggle={toggleCategory} 
                                currentEffectId={currentEffectId} 
                                favorites={favorites}
                                onToggleFavorite={toggleFavorite}
                                onSelectEffect={(id: string) => {
                                    onSelectEffect(id);
                                    if (window.innerWidth < 1024) setIsOpen(false);
                                }} 
                            />
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                        <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl border border-white/5 mb-4">
                            <button onClick={() => onChangeViewMode('preview')} className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${viewMode === 'preview' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`} title="Preview">
                                <Eye size={16} className="mb-1" /><span className="text-[9px] font-bold tracking-wide uppercase">Preview</span>
                            </button>
                            <button onClick={() => onChangeViewMode('prompt')} className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${viewMode === 'prompt' ? 'bg-white/10 text-red-500 shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`} title="Prompt">
                                <Sparkles size={16} className="mb-1" /><span className="text-[9px] font-bold tracking-wide uppercase">Prompt</span>
                            </button>
                            <button onClick={() => onChangeViewMode('code')} className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${viewMode === 'code' ? 'bg-white/10 text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`} title="Code">
                                <Code2 size={16} className="mb-1" /><span className="text-[9px] font-bold tracking-wide uppercase">Code</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-4">
                            <button onClick={onFeedback} className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all text-xs font-medium">
                                <MessageSquare size={14} /><span>Phản hồi</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-600 font-mono tracking-tight opacity-60 hover:opacity-100 transition-opacity">
                            <span>Made with</span><span className="text-red-500 animate-pulse">★</span><span>by <span className="text-gray-400 font-bold">B.Trọng</span></span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
});
