import React, { useState, useMemo, memo } from 'react';
import { Sidebar } from './Sidebar';
import { FeedbackForm } from './FeedbackForm';
import { X, Copy, Check, Code2, Sparkles } from 'lucide-react';
interface LayoutProps {
  currentEffectId: string;
  onSelectEffect: (id: string) => void;
  children: React.ReactNode;
  viewMode: 'preview' | 'prompt' | 'code';
  onChangeViewMode: (mode: 'preview' | 'prompt' | 'code') => void;
  currentCode?: string;
  currentPrompt?: string;
}

const CodeViewer = memo(({ code }: { code: string }) => {
// ... existing CodeViewer implementation
// ... CodeViewer implementation (unchanged)
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
});

export const Layout = memo(({ 
  currentEffectId, 
  onSelectEffect, 
  children,
  viewMode,
  onChangeViewMode,
  currentCode,
  currentPrompt
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#030303] text-gray-100 overflow-hidden font-sans selection:bg-vn-red selection:text-white">
      
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-noise mix-blend-overlay"></div>

      <Sidebar 
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          currentEffectId={currentEffectId}
          onSelectEffect={onSelectEffect}
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
          onFeedback={() => setFeedbackOpen(true)}
      />

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
});