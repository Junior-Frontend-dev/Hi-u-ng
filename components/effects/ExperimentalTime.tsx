import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Sun, Moon, Cloud, Star } from 'lucide-react';

export default function ExperimentalTime() {
  const [hour, setHour] = useState(12); // Start at noon
  
  // Calculate day/night properties based on 24h clock
  // 6-18 is Day, 18-6 is Night
  const isNight = hour < 6 || hour > 18;
  const progress = (hour / 24); // 0 to 1

  // Dynamic Sky Gradient
  const getSkyGradient = () => {
    if (hour >= 5 && hour < 8) return 'from-indigo-900 via-purple-700 to-orange-500'; // Sunrise
    if (hour >= 8 && hour < 17) return 'from-blue-400 via-sky-300 to-blue-200'; // Day
    if (hour >= 17 && hour < 20) return 'from-blue-900 via-purple-800 to-orange-600'; // Sunset
    return 'from-black via-slate-900 to-slate-800'; // Night
  };

  // Sun/Moon Position (Semi-circle path)
  const rotation = (hour / 24) * 360; // Simple rotation for demo

  return (
    <DemoContainer>
      <div className={`h-full w-full relative overflow-hidden transition-all duration-1000 bg-gradient-to-b ${getSkyGradient()}`}>
        
        {/* Stars (Only visible at night) */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isNight ? 'opacity-100' : 'opacity-0'}`}>
            {[...Array(20)].map((_, i) => (
                <Star 
                    key={i} 
                    size={Math.random() * 10 + 4} 
                    className="absolute text-white/80 animate-pulse"
                    style={{ left: `${Math.random()*100}%`, top: `${Math.random()*50}%`, animationDelay: `${Math.random()*2}s` }}
                />
            ))}
        </div>

        {/* Celestial Body Container (Rotates) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div 
                className="w-[80%] h-[80%] relative transition-transform duration-100 ease-out"
                style={{ transform: `rotate(${rotation - 90}deg)` }} // -90 to start sun at left (approx 6am if we map carefully, here just rotation demo)
             >
                 {/* Sun */}
                 <div className="absolute top-1/2 -right-12 -translate-y-1/2">
                     <Sun className="text-yellow-400 w-24 h-24 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]" fill="currentColor" />
                 </div>
                 {/* Moon */}
                 <div className="absolute top-1/2 -left-12 -translate-y-1/2">
                     <Moon className="text-gray-200 w-20 h-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" fill="currentColor" />
                 </div>
             </div>
        </div>

        {/* Clouds (Move constantly) */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isNight ? 'opacity-20' : 'opacity-80'}`}>
             <Cloud className="absolute top-20 left-20 text-white w-32 h-32 opacity-80 animate-float-slow" fill="currentColor" />
             <Cloud className="absolute top-40 right-40 text-white w-24 h-24 opacity-60 animate-float-slower" fill="currentColor" />
        </div>

        {/* UI Control */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center w-80">
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">
                {Math.floor(hour).toString().padStart(2, '0')}:{( (hour%1)*60 ).toFixed(0).padStart(2,'0')}
            </h2>
            <input 
                type="range" 
                min="0" 
                max="23.9" 
                step="0.1" 
                value={hour} 
                onChange={(e) => setHour(parseFloat(e.target.value))}
                className="w-full accent-white cursor-pointer"
            />
            <p className="text-white/50 text-xs mt-2">Drag to change time</p>
        </div>

        <style>{`
            @keyframes float-slow {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(20px); }
            }
            .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
            .animate-float-slower { animation: float-slow 15s ease-in-out infinite reverse; }
        `}</style>

      </div>
    </DemoContainer>
  );
}