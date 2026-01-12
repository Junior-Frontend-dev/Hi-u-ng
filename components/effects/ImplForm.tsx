import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { 
  User, Mail, Lock, Eye, EyeOff, Search, CheckCircle2, 
  AlertCircle, ChevronRight, Settings, Smartphone, Bell,
  CreditCard, Send, Sparkles, Fingerprint
} from 'lucide-react';

/* 
  This component acts as a hub for all Form & Input effects.
  It renders different UI based on the effectId passed from LazyEffectRenderer.
*/

export default function ImplForm({ variant }: { variant?: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sliderValue, setRangeValue] = useState(50);
  const [switchActive, setSwitchActive] = useState(false);

  // Auto-reset error
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const renderEffect = () => {
    switch (variant) {
      case 'form-float-label':
        return (
          <div className="space-y-12 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em] mb-8">Float Labels</h2>
            <div className="relative group">
              <input
                type="text"
                placeholder=" "
                className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none transition-all focus:border-purple-500 focus:bg-white/10"
              />
              <label className="absolute left-6 top-5 text-white/30 transition-all pointer-events-none 
                peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#050505] peer-focus:px-2
                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-400 peer-[:not(:placeholder-shown)]:bg-[#050505] peer-[:not(:placeholder-shown)]:px-2">
                Full Name
              </label>
            </div>
            <div className="relative group">
              <input
                type="email"
                placeholder=" "
                className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none transition-all focus:border-blue-500 focus:bg-white/10"
              />
              <label className="absolute left-6 top-5 text-white/30 transition-all pointer-events-none 
                peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-blue-400 peer-focus:bg-[#050505] peer-focus:px-2
                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400 peer-[:not(:placeholder-shown)]:bg-[#050505] peer-[:not(:placeholder-shown)]:px-2">
                Email Address
              </label>
            </div>
          </div>
        );

      case 'form-focus-border':
        return (
          <div className="space-y-12 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em] mb-8">Focus Animation</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl text-white outline-none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500 ${isFocused ? 'w-full' : 'w-0'}`} />
            </div>
            <div className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
               <input
                type="text"
                placeholder="Password"
                className="relative w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-pink-500 transition-all"
              />
            </div>
          </div>
        );

      case 'form-shake-error':
        return (
          <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em] mb-12">Validation Shake</h2>
            <div className={`relative transition-transform duration-75 ${isError ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter invalid email..."
                className={`w-full bg-white/5 border ${isError ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-2xl px-6 py-5 text-white outline-none`}
              />
              {isError && <AlertCircle className="absolute right-4 top-5 text-red-500 animate-pulse" size={20} />}
            </div>
            <button 
              onClick={() => setIsError(true)}
              className="mt-8 px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all"
            >
              Trigger Error
            </button>
            <style>{`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-10px); }
                40%, 80% { transform: translateX(10px); }
              }
            `}</style>
          </div>
        );

      case 'form-password-reveal':
        return (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em] mb-12">Dynamic Reveal</h2>
            <div className="relative group">
              <div className="absolute left-5 top-5 text-white/20 group-focus-within:text-purple-500 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Secret Key"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-14 py-5 text-white outline-none focus:border-purple-500 transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-5 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        );

      case 'form-search-expand':
        return (
          <div className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em] mb-12">Elastic Search</h2>
            <div className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isFocused ? 'w-full scale-105' : 'w-14 hover:scale-110'}`}>
              <div className={`absolute inset-0 bg-white/5 border border-white/10 rounded-full transition-all duration-500 ${isFocused ? 'shadow-[0_0_30px_rgba(255,255,255,0.05)]' : ''}`}></div>
              <input
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`relative w-full bg-transparent py-4 pl-14 pr-6 text-white outline-none transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
                placeholder="Type to search..."
              />
              <div className="absolute left-4 pointer-events-none">
                <Search size={24} className={`${isFocused ? 'text-blue-400' : 'text-white/40'} transition-colors`} />
              </div>
            </div>
          </div>
        );

      case 'form-switch-ios':
        return (
          <div className="space-y-12 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em]">Switch UX</h2>
            <div className="flex items-center gap-12">
               <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-white/20"><Bell size={20} /></div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Notifications</p>
               </div>
               <button 
                onClick={() => setSwitchActive(!switchActive)}
                className={`w-20 h-10 rounded-full relative transition-all duration-500 ${switchActive ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-white/10 border border-white/5'}`}
               >
                  <div className={`absolute top-1 w-8 h-8 rounded-full bg-white shadow-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${switchActive ? 'left-11' : 'left-1'}`} />
               </button>
            </div>
          </div>
        );

      case 'form-range-slider':
        return (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-[0.2em] mb-12 text-center">Fluid Slider</h2>
            <div className="relative pt-10">
               <div 
                className="absolute top-0 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg -translate-x-1/2 transition-all"
                style={{ left: `${sliderValue}%` }}
               >
                  {sliderValue}%
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rotate-45"></div>
               </div>
               <input 
                type="range" 
                min="0" max="100" 
                value={sliderValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
               />
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
             <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl group hover:border-purple-500/30 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6"><Smartphone size={24} /></div>
                <h3 className="text-xl font-bold text-white mb-4">Device Auth</h3>
                <div className="space-y-4">
                   <div className="h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 text-white/20 font-mono text-xs">•••• •••• ••••</div>
                   <button className="w-full py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">Authenticate</button>
                </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl group hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6"><CreditCard size={24} /></div>
                <h3 className="text-xl font-bold text-white mb-4">Smart Payment</h3>
                <div className="flex gap-2">
                   <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 text-white/20 text-xs">CVV</div>
                   <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400"><Send size={18} /></div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
        {renderEffect()}
        
        {/* Helper Instructions */}
        <div className="mt-20 flex items-center gap-2 text-white/20 font-mono text-[10px] tracking-widest uppercase">
           <Sparkles size={12} />
           <span>Interactive Component Loaded</span>
           <Sparkles size={12} />
        </div>
      </div>
    </DemoContainer>
  );
}