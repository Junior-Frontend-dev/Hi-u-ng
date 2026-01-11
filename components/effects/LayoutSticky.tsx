import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function LayoutSticky() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 1.5 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white text-black">
        <div className="flex min-h-[300vh] relative">
            
            {/* Main Content */}
            <div className="w-2/3 p-12 space-y-32">
                <div>
                    <h1 className="text-6xl font-bold mb-8">Long Form</h1>
                    <p className="text-xl leading-relaxed text-gray-600">
                        This is a classic layout pattern used for documentation, blogs, or storytelling. 
                        The main content scrolls naturally on the left, while contextual information or navigation 
                        stays fixed on the right.
                    </p>
                </div>
                {[1, 2, 3, 4].map(i => (
                    <div key={i}>
                        <h2 className="text-3xl font-bold mb-4">Chapter {i}</h2>
                        <p className="text-lg leading-relaxed text-gray-600 mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="h-40 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                ))}
            </div>

            {/* Sticky Sidebar */}
            <div className="w-1/3 border-l border-gray-100 relative">
                <div className="sticky top-0 h-screen flex flex-col justify-center p-8">
                    <div className="bg-black text-white p-8 rounded-2xl shadow-xl">
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Current View</span>
                        <h3 className="text-3xl font-bold mt-2 mb-4">Reading...</h3>
                        <div className="space-y-2">
                             <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                 <div 
                                    className="h-full bg-blue-500 will-change-transform"
                                    style={{ width: '100%', transform: 'scaleX(var(--scroll-percent, 0))', transformOrigin: 'left' }}
                                 ></div>
                             </div>
                             <p className="text-xs text-right text-gray-400">Progress</p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold">Related Topics</h4>
                            <p className="text-sm text-gray-500 mt-1">UX Design, Typography, Layouts</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}