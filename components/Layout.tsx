import React, { useState, useMemo, useEffect } from 'react';
import { EFFECTS_DATA } from '../constants';
import { Menu, X, Code2, Sparkles, Search, Eye, Copy, Check, ChevronDown, ChevronRight, Heart, Star, MessageSquare } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';

interface LayoutProps {
  currentEffectId: string;
  onSelectEffect: (id: string) => void;
  children: React.ReactNode;
  viewMode: 'preview' | 'prompt' | 'code';
  onChangeViewMode: (mode: 'preview' | 'prompt' | 'code') => void;
  currentCode?: string;
  currentPrompt?: string;
}

const CodeViewer = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const highlightedCode = useMemo(() => {
        if (!code) return '';
        let html = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\b(import|export|default|return|function|const|let|var|if|else|for|while|await|async|from)\b/g, '<span class="text-purple-400">$1</span>')
            .replace(/\b(React|useState|useEffect|useRef|useMemo)\b/g, '<span class="text-yellow-300">$1</span>')
            .replace(/('.*?')/g, '<span class="text-green-300">$1</span>')
            .replace(/`([^`]+)`/g, '<span class="text-green-300">`$1`</span>')
            .replace(/\b(className|style|key|ref)\b/g, '<span class="text-blue-300">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>');
        return html;
    }, [code]);

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A]">
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
                <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-1 block">Source Code</span>
                    <h2 className="text-sm font-bold text-white leading-none">Component Implementation</h2>
                </div>
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors border border-white/5"
                >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <div className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-gray-300">
                <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </div>
        </div>
    );
};

// Category Configuration
const CATEGORIES = [
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
    
    // Expanded Groups
    { id: 'micro', label: 'Micro-Interactions', prefixes: ['micro'] },
    { id: 'data', label: 'Data Visualization', prefixes: ['data'] },
    { id: 'cyber', label: 'Cyberpunk & Glitch', prefixes: ['cyber'] },
    { id: 'nature', label: 'Nature & Physics', prefixes: ['nature'] },
    
    // Restored Groups
    { id: 'nav', label: 'Navigation', prefixes: ['nav'] },
    { id: 'card', label: 'Card Effects', prefixes: ['card'] },
    { id: 'button', label: 'Buttons', prefixes: ['button'] },
    { id: 'loader', label: 'Loaders', prefixes: ['loader'] },
    { id: 'form', label: 'Forms & Inputs', prefixes: ['form', 'input'] },
    { id: 'new', label: 'New Arrivals', prefixes: ['new', 'scroll-3d', 'scroll-parallax-zoom', 'cursor-magnetic-links', 'text-neon', 'visual-glitch', 'motion-path', 'three-particle', 'brand-logo', 'ux-micro', 'experimental-noise'] },
];

export const Layout: React.FC<LayoutProps> = ({ 
  currentEffectId, 
  onSelectEffect, 
  children,
  viewMode,
  onChangeViewMode,
  currentCode,
  currentPrompt
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  
  // Manage expanded state for each category
  const [expandedCats, setExpandedCats] = useState<string[]>(['vietnam', 'micro', 'nature']);

  // Group effects into categories
  const groupedEffects = useMemo(() => {
      const groups: Record<string, typeof EFFECTS_DATA> = {};
      
      // Initialize groups
      CATEGORIES.forEach(cat => groups[cat.id] = []);
      const misc: typeof EFFECTS_DATA = [];

      const filteredData = EFFECTS_DATA.filter(effect => 
        effect.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        effect.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      filteredData.forEach(effect => {
          const prefix = effect.id.split('-')[0] + '-' + effect.id.split('-')[1]; // check composite prefixes like layout-exp
          const simplePrefix = effect.id.split('-')[0];
          let matched = false;
          
          for (const cat of CATEGORIES) {
              // Special logic for new arrivals
              if (cat.id === 'new') {
                  const id = effect.id;
                  if (['scroll-3d-grid', 'scroll-parallax-zoom', 'cursor-magnetic-links', 'text-neon-flicker', 'visual-glitch-image', 'motion-path-follow', 'three-particle-terrain', 'brand-logo-morph', 'ux-micro-interaction', 'experimental-noise-field'].includes(id)) {
                      groups[cat.id].push(effect);
                      matched = true;
                      break;
                  }
              }
              
              // Standard prefix matching
              if (!matched && (cat.prefixes.includes(prefix) || cat.prefixes.includes(simplePrefix))) {
                  groups[cat.id].push(effect);
                  matched = true;
                  break;
              }
          }
          if (!matched) misc.push(effect);
      });

      return { groups, misc };
  }, [searchQuery]);

  const toggleCategory = (id: string) => {
      setExpandedCats(prev => 
          prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
  };

  // Auto-expand category of selected effect
  useEffect(() => {
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

  return (
    <div className="flex h-screen bg-[#030303] text-gray-100 overflow-hidden font-sans selection:bg-vn-red selection:text-white">
      
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-noise mix-blend-overlay"></div>

      {/* Mobile Header/Toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-black/50 backdrop-blur-md z-50 flex items-center justify-between px-4 border-b border-white/5">
         <span className="font-bold tracking-tight">EffectLib An VietNam</span>
         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-black/95 backdrop-blur-2xl border-r border-white/5 
        transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col relative z-10">
          <div className="p-6 pb-2">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20">
                    <Star size={20} className="text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                        EffectLib
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">An VietNam Library</p>
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded-full text-white/60 font-mono">
                            {EFFECTS_DATA.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Search Input */}
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
                <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
                >
                    <X size={12} />
                </button>
                )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 hide-scrollbar">
            {CATEGORIES.map((cat) => {
                const items = groupedEffects.groups[cat.id];
                if (!items || items.length === 0) return null;
                const isExpanded = expandedCats.includes(cat.id);
                const isVietnam = cat.id === 'vietnam';
                const isNew = cat.id === 'new';
                const isExp = cat.id === 'layout-exp';

                return (
                    <div key={cat.id} className="border-b border-white/5 pb-2 last:border-0">
                        <button 
                            onClick={() => toggleCategory(cat.id)}
                            className={`
                                w-full flex items-center justify-between py-3 px-2 text-xs font-bold uppercase tracking-wider transition-colors group 
                                ${isVietnam ? 'text-red-500 hover:text-red-400' : isNew ? 'text-blue-400 hover:text-blue-300' : isExp ? 'text-purple-400 hover:text-purple-300' : 'text-gray-400 hover:text-white'}
                            `}
                        >
                            <span className="flex items-center gap-2">
                                {cat.label}
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${isVietnam ? 'bg-red-500/10 text-red-500' : isNew ? 'bg-blue-500/10 text-blue-400' : isExp ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-gray-500 group-hover:bg-white/10'}`}>
                                    {items.length}
                                </span>
                            </span>
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        
                        {isExpanded && (
                            <div className="space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                {items.map((effect) => {
                                    const isActive = currentEffectId === effect.id;
                                    // Parse "01. Title" format if present
                                    const cleanTitle = effect.title.replace(/^\d+\.\s*/, '');
                                    
                                    return (
                                        <button
                                            key={effect.id}
                                            onClick={() => {
                                                onSelectEffect(effect.id);
                                                if (window.innerWidth < 1024) setSidebarOpen(false);
                                            }}
                                            className={`
                                                w-full group relative flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 rounded-lg text-left
                                                ${isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
                                            `}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'bg-white/10'}`}></span>
                                            <span className="truncate font-medium text-[13px]">{cleanTitle}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-xl">
             <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl border border-white/5 mb-4">
                <button
                    onClick={() => onChangeViewMode('preview')}
                    className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'preview' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                    title="Preview Effect"
                >
                    <Eye size={16} className="mb-1" />
                    <span className="text-[9px] font-bold tracking-wide uppercase">Preview</span>
                </button>
                
                <button
                    onClick={() => onChangeViewMode('prompt')}
                    className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'prompt' ? 'bg-white/10 text-red-500 shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                    title="View Super Prompt"
                >
                    <Sparkles size={16} className="mb-1" />
                    <span className="text-[9px] font-bold tracking-wide uppercase">Prompt</span>
                </button>

                <button
                    onClick={() => onChangeViewMode('code')}
                    className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'code' ? 'bg-white/10 text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                    title="View Source Code"
                >
                    <Code2 size={16} className="mb-1" />
                    <span className="text-[9px] font-bold tracking-wide uppercase">Code</span>
                </button>
             </div>
             
              <div className="grid grid-cols-1 gap-2 mb-4">
                 <button
                     onClick={() => setFeedbackOpen(true)}
                     className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all text-xs font-medium"
                 >
                     <MessageSquare size={14} />
                     <span>Phản hồi</span>
                 </button>
              </div>
             
             {/* Signature */}
             <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-600 font-mono tracking-tight opacity-60 hover:opacity-100 transition-opacity">
                <span>Made with</span>
                <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                <span>by <span className="text-gray-400 font-bold">B.Trọng</span></span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-black perspective-1000">
         
         <div className="absolute inset-0 w-full h-full flex">
            {/* Demo Stage */}
            <div 
                className={`
                    relative w-full h-full transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
                    ${viewMode !== 'preview' ? 'w-[50%] opacity-40 blur-[1px] scale-95' : 'w-full opacity-100 scale-100'}
                `}
            >
                {/* Top Gradient for subtle light */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-10" />
                {children}
            </div>

            {/* Sliding Panel (Prompt / Code) */}
            <div 
                className={`
                    absolute top-0 right-0 h-full bg-[#0A0A0A] border-l border-white/10 z-50 shadow-2xl
                    transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
                    ${viewMode !== 'preview' ? 'translate-x-0' : 'translate-x-full'}
                    w-full lg:w-[50%]
                `}
            >
                <button 
                    onClick={() => onChangeViewMode('preview')}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all"
                >
                    <X size={16} />
                </button>

                {viewMode === 'prompt' && currentPrompt && (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 mb-1 block">Super Prompt</span>
                                <h2 className="text-lg font-bold text-white leading-none">AI Generation Recipe</h2>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-8 font-mono text-sm leading-relaxed text-gray-300 selection:bg-red-900/30 whitespace-pre-wrap">
                            {currentPrompt}
                        </div>
                    </div>
                )}

                {viewMode === 'code' && (
                    currentCode ? (
                        <CodeViewer code={currentCode} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-white/30 flex-col gap-4">
                            <Code2 size={48} />
                            <p>Source code not available for this effect.</p>
                        </div>
                    )
                )}
</div>
          </div>

        </main>

        <FeedbackForm isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
};