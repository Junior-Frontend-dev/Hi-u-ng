import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Loader2, Check } from 'lucide-react';

export default function UxPacing() {
  const [step, setStep] = useState<'idle' | 'processing' | 'success'>('idle');

  const startProcess = () => {
    setStep('processing');
    // Artificial delay to build anticipation
    setTimeout(() => {
        setStep('success');
        setTimeout(() => setStep('idle'), 3000);
    }, 2500);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center">
        <div className="w-80 p-8 rounded-2xl shadow-2xl bg-white border border-gray-100 text-center">
            {step === 'idle' && (
                <div className="animate-in fade-in zoom-in duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Transfer Funds</h3>
                    <p className="text-gray-500 mb-6">$5,000.00 to Savings</p>
                    <button 
                        onClick={startProcess}
                        className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            )}

            {step === 'processing' && (
                <div className="py-10 animate-in fade-in duration-500">
                    <Loader2 size={48} className="animate-spin mx-auto text-blue-600 mb-4" />
                    <p className="text-gray-500 font-mono text-sm animate-pulse">Securing connection...</p>
                </div>
            )}

            {step === 'success' && (
                <div className="py-8 animate-in zoom-in-50 duration-500 ease-out-back">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-200">
                        <Check size={40} strokeWidth={4} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Success!</h3>
                    <p className="text-gray-500 mt-2">Transaction completed.</p>
                </div>
            )}
        </div>
      </div>
    </DemoContainer>
  );
}