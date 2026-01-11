import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { CreditCard, Wifi } from 'lucide-react';

export default function VisualGlassmorphism() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#1a1a2e] flex items-center justify-center relative overflow-hidden">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Glass Card */}
        <div className="relative w-96 h-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-xl">
             <div className="flex justify-between items-start mb-8">
                 <h3 className="font-bold text-lg tracking-widest">Glass UI</h3>
                 <Wifi />
             </div>
             <div className="mb-2">
                 <div className="w-12 h-8 bg-yellow-400/80 rounded mb-4"></div>
                 <p className="font-mono text-xl tracking-widest">4520 **** **** 8892</p>
             </div>
             <div className="flex justify-between mt-6">
                 <div>
                     <p className="text-[10px] uppercase opacity-70">Card Holder</p>
                     <p className="text-sm font-medium">Alex Morgan</p>
                 </div>
                 <div>
                     <p className="text-[10px] uppercase opacity-70">Expires</p>
                     <p className="text-sm font-medium">12/25</p>
                 </div>
             </div>

             {/* Shine Effect */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-2xl"></div>
        </div>

        <style>{`
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}