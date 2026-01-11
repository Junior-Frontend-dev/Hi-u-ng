import React, { useRef, useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Zap, Shield, Smartphone, Globe, Cpu, Activity } from 'lucide-react';

const CARDS = [
  { title: "Lightning Fast", desc: "Optimized for speed.", icon: <Zap />, color: "bg-amber-500" },
  { title: "Secure Core", desc: "Bank-grade encryption.", icon: <Shield />, color: "bg-emerald-500" },
  { title: "Mobile First", desc: "Responsive by design.", icon: <Smartphone />, color: "bg-blue-500" },
  { title: "Global CDN", desc: "Deployed worldwide.", icon: <Globe />, color: "bg-purple-500" },
  { title: "AI Powered", desc: "Neural processing.", icon: <Cpu />, color: "bg-rose-500" },
  { title: "Real-time", desc: "Live data sync.", icon: <Activity />, color: "bg-cyan-500" },
];

const Card = ({ item, index }: { item: typeof CARDS[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        flex items-center gap-6 p-6 rounded-2xl
        bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm
        transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)
        hover:bg-white/[0.08] hover:scale-[1.02] hover:border-white/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg ${item.color} shadow-${item.color}/20`}>
        {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
        <p className="text-white/40 text-sm">{item.desc}</p>
      </div>
      {/* Progress Line Animation on Reveal */}
      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
            className={`h-full bg-white transition-transform duration-[1.5s] ease-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ transitionDelay: `${index * 100 + 300}ms` }}
        />
      </div>
    </div>
  );
};

export default function ScrollTrigger() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto p-10 hide-scrollbar bg-neutral-950">
        <div className="min-h-[40vh] flex flex-col justify-center mb-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Features<span className="text-blue-500">.</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-md">
            Scroll down to trigger staggered reveal animations using Intersection Observer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl pb-20">
          {CARDS.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}