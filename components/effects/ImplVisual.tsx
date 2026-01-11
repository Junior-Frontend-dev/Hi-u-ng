import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Search, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronRight, RefreshCw } from 'lucide-react';

export default function ImplVisual({ variant }: { variant: string }) {
  const [toggleState, setToggleState] = useState(false);
  const [radioIndex, setRadioIndex] = useState<number | null>(null);
  const [checkboxIndex, setCheckboxIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [shake, setShake] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (variant.startsWith('loader') && !variant.includes('skeleton')) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            if (!variant.includes('indeterminate')) return 0;
            return 0;
          }
          return p + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const renderLoaders = () => {
    switch (variant) {
      case 'loader-circle':
        return (
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        );
      case 'loader-bar':
        return (
          <div className="w-64">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center mt-2 text-gray-500">{progress}%</p>
          </div>
        );
      case 'loader-dots':
        return (
          <div className="flex gap-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        );
      case 'loader-text':
        return (
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-black to-gray-300 animate-pulse">
            LOADING
          </h2>
        );
      case 'loader-glitch':
        return (
          <div className="relative">
            <h2 className="text-4xl font-bold text-black">LOADING</h2>
            <div className="absolute inset-0 text-red-500 opacity-50 animate-pulse translate-x-[-2px]">LOADING</div>
            <div className="absolute inset-0 text-blue-500 opacity-50 animate-pulse translate-x-[2px]">LOADING</div>
          </div>
        );
      case 'loader-svg':
        return (
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8"
              strokeDasharray="251" strokeDashoffset="251"
              className="animate-[stroke-dashoffset_2s_ease-in-out_infinite]"
            />
          </svg>
        );
      case 'loader-mask':
        return (
          <div className="w-40 h-40 relative overflow-hidden rounded-full border-4 border-gray-200">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 transition-all duration-100"
              style={{ clipPath: `inset(${(1 - progress / 100) * 100}% 0 0 0)` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold">{progress}%</span>
          </div>
        );
      case 'loader-blur':
        return (
          <div className="text-center">
            <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 blur-[${Math.max(0, (1 - progress / 100) * 10)}px] transition-all duration-100`}>
              LOADING
            </div>
            <p className="mt-4 text-gray-500">Focusing...</p>
          </div>
        );
      case 'loader-progress':
        return (
          <div className="text-center">
            <span className="text-7xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {progress}%
            </span>
          </div>
        );
      case 'loader-skeleton':
        return (
          <div className="space-y-4 w-72">
            <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderForms = () => {
    switch (variant) {
      case 'form-float-label':
        return (
          <div className="w-full max-w-sm space-y-6">
            {['Username', 'Email', 'Password'].map((label, i) => (
              <div key={i} className="relative group">
                <input type={label === 'Password' ? 'password' : 'text'} className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 peer placeholder-transparent" placeholder={label} />
                <label className="absolute left-4 top-4 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1 cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'form-focus-border':
        return (
          <div className="w-full max-w-sm">
            <input type="text" className="w-full p-4 bg-transparent border-b-2 border-gray-200 outline-none focus:border-blue-500 transition-all" placeholder="Focus me..." />
          </div>
        );
      case 'form-shake-error':
        return (
          <div className="w-full max-w-sm">
            <input 
              type="text" 
              className={`w-full p-4 bg-white border-2 rounded-xl outline-none transition-all ${shake ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-gray-200'}`} 
              placeholder="Invalid input"
              onBlur={() => setShake(true)}
            />
            {shake && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} /> Invalid format</p>}
          </div>
        );
      case 'form-success-check':
        return (
          <div className="w-full max-w-sm">
            <input type="email" className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-green-500" placeholder="Enter email" />
            <div className="mt-2 text-green-500 flex items-center gap-1"><CheckCircle2 size={16} /> Valid email</div>
          </div>
        );
      case 'form-password-reveal':
        return (
          <div className="relative w-full max-w-sm">
            <input type={passwordVisible ? "text" : "password"} className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl pr-12" value="secretpassword123" readOnly />
            <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        );
      case 'form-search-expand':
        return (
          <div className={`flex items-center bg-white rounded-full shadow-lg overflow-hidden transition-all duration-500 ${searchExpanded ? 'w-72' : 'w-14'}`}>
            <button onClick={() => setSearchExpanded(!searchExpanded)} className="w-14 h-14 flex items-center justify-center text-gray-500 flex-shrink-0 cursor-pointer"><Search size={20} /></button>
            <input type="text" placeholder="Search..." className="w-full outline-none pr-4" />
          </div>
        );
      case 'form-switch-ios':
        return (
          <div className="flex items-center gap-4">
            <button onClick={() => setToggleState(!toggleState)} className={`w-16 h-10 rounded-full p-1 transition-colors duration-300 cursor-pointer ${toggleState ? 'bg-green-500' : 'bg-gray-300'}`}>
              <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ${toggleState ? 'translate-x-6' : ''}`} />
            </button>
            <span className="text-gray-600">{toggleState ? 'ON' : 'OFF'}</span>
          </div>
        );
      case 'form-radio-custom':
        return (
          <div className="space-y-3">
            {['Option A', 'Option B', 'Option C'].map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${radioIndex === i ? 'border-blue-500' : 'border-gray-300'}`}>
                  {radioIndex === i && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                </div>
                <input type="radio" name="radio" className="hidden" onChange={() => setRadioIndex(i)} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'form-checkbox-custom':
        return (
          <div className="space-y-3">
            {['Accept terms', 'Subscribe newsletter', 'Enable notifications'].map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${checkboxIndex === i ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                  {checkboxIndex === i && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={checkboxIndex === i} onChange={() => setCheckboxIndex(checkboxIndex === i ? null : i)} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'form-range-slider':
        return (
          <div className="w-full max-w-sm">
            <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    const btnContent: Record<string, React.ReactNode> = {
      'button-pulse': 'Pulsing',
      'button-shine': 'Shine Effect',
      'button-ripple-out': 'Ripple Out',
      'button-magnetic': 'Magnetic',
      'button-morph': 'Morph',
      'button-liquid': 'Liquid',
      'button-neon': 'Neon',
      'button-ghost': 'Ghost',
      'button-arrow': <span className="flex items-center gap-2">Learn More <ChevronRight size={18} /></span>,
      'button-loading': 'Loading',
    };

    const btnClass: Record<string, string> = {
      'button-pulse': 'animate-pulse',
      'button-shine': 'relative overflow-hidden',
      'button-magnetic': 'transition-transform hover:-translate-y-1',
      'button-ghost': 'border-2 bg-transparent',
    };

    return (
      <div className="flex flex-wrap gap-4 justify-center">
        <button className={`px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all ${btnClass[variant] || ''} cursor-pointer`}>
          {btnContent[variant] || 'Button'}
        </button>
        <button className={`px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold ${btnClass[variant] || ''} cursor-pointer`}>
          {variant === 'button-neon' ? <span className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Orange Neon</span> : 'Gradient'}
        </button>
      </div>
    );
  };

  const renderCards = () => {
    const cardImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&q=80',
    ];

    switch (variant) {
      case 'card-flip':
        return (
          <div className="w-72 h-96 perspective-1000">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-bold text-white">FRONT</h3>
              </div>
              <div className="absolute inset-0 bg-neutral-800 rounded-2xl flex items-center justify-center backface-hidden rotate-y-180">
                <h3 className="text-2xl font-bold text-white">BACK</h3>
              </div>
            </div>
          </div>
        );
      case 'card-hover-lift':
        return (
          <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl cursor-pointer">
            <div className="h-40 bg-gradient-to-br from-pink-400 to-red-500" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Hover Lift</h3>
              <p className="text-gray-500 mt-2">Card lifts up on hover with enhanced shadow</p>
            </div>
          </div>
        );
      case 'card-glare':
        return (
          <div className="relative w-72 bg-neutral-900 rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="h-40 bg-gradient-to-br from-cyan-500 to-blue-600" />
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-bold text-white">Holo Glare</h3>
              <p className="text-gray-400 mt-2">Shiny glare effect</p>
            </div>
          </div>
        );
      case 'card-border-gradient':
        return (
          <div className="relative w-72 p-1 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin-slow" />
            <div className="bg-neutral-900 rounded-xl p-6 relative z-10">
              <h3 className="text-xl font-bold text-white">Gradient Border</h3>
              <p className="text-gray-400 mt-2">Animated gradient border</p>
            </div>
          </div>
        );
      case 'card-focus':
        return (
          <div className="grid grid-cols-2 gap-4">
            {cardImages.slice(0, 2).map((img, i) => (
              <div key={i} className="relative w-40 h-40 rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold">Hovered</span>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Card Title</h3>
              <p className="text-gray-500 mt-2">Sample card description</p>
            </div>
          </div>
        );
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {variant.startsWith('loader') && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Loaders</h2>
            {renderLoaders()}
          </>
        )}
        {variant.startsWith('form') && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Form Elements</h2>
            {renderForms()}
          </>
        )}
        {variant.startsWith('button') && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Buttons</h2>
            {renderButtons()}
          </>
        )}
        {variant.startsWith('card') && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Cards</h2>
            {renderCards()}
          </>
        )}
      </div>
    </DemoContainer>
  );
}
