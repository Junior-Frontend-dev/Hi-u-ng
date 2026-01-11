import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function VisualMasking() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="min-h-[150vh] flex flex-col items-center justify-center relative">
            
            {/* Video Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                 <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&q=80" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-10 bg-white p-20 mix-blend-hard-light">
                 <h1 className="text-9xl font-black text-black">
                     MASK
                 </h1>
            </div>

            {/* Text Masking Image */}
            <div className="relative z-10 mt-20">
                <h1 
                    className="text-9xl font-black text-transparent bg-clip-text bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&q=80)',
                        WebkitBackgroundClip: 'text'
                    }}
                >
                    TEXTURE
                </h1>
            </div>

            {/* SVG Mask Shape */}
            <div className="relative z-10 mt-20 w-64 h-64 bg-white" style={{
                maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23FF0066\' d=\'M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.4C81.5,5.6,70.2,17.3,60.9,29.3C51.6,41.3,44.3,53.6,33.7,64.2C23.1,74.8,9.2,83.7,-4.4,91.3C-18,98.9,-31.3,105.2,-42.6,99.2C-53.9,93.2,-63.2,74.9,-71.4,57.7C-79.6,40.5,-86.7,24.4,-86.2,8.6C-85.7,-7.2,-77.6,-22.7,-67.2,-36.2C-56.8,-49.7,-44.1,-61.2,-30.5,-68.8C-16.9,-76.4,-2.4,-80.1,12.3,-80.8C27,-81.5,41.7,-79.2,44.7,-76.4Z\' transform=\'translate(100 100)\' /%3E%3C/svg%3E")',
                WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23FF0066\' d=\'M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.4C81.5,5.6,70.2,17.3,60.9,29.3C51.6,41.3,44.3,53.6,33.7,64.2C23.1,74.8,9.2,83.7,-4.4,91.3C-18,98.9,-31.3,105.2,-42.6,99.2C-53.9,93.2,-63.2,74.9,-71.4,57.7C-79.6,40.5,-86.7,24.4,-86.2,8.6C-85.7,-7.2,-77.6,-22.7,-67.2,-36.2C-56.8,-49.7,-44.1,-61.2,-30.5,-68.8C-16.9,-76.4,-2.4,-80.1,12.3,-80.8C27,-81.5,41.7,-79.2,44.7,-76.4Z\' transform=\'translate(100 100)\' /%3E%3C/svg%3E")',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
            }}>
                <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80" className="w-full h-full object-cover" />
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}