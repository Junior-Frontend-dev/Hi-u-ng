import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function SignatureNarrative() {
  const [view, setView] = useState('home');

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center p-12">
        
        {view === 'home' && (
            <p className="text-4xl md:text-5xl font-serif leading-relaxed text-black max-w-4xl animate-fade-in-up">
                Hello. I am a digital designer. I want to <button onClick={() => setView('work')} className="text-blue-600 underline hover:text-blue-800">show you my work</button> or maybe just <button onClick={() => setView('contact')} className="text-blue-600 underline hover:text-blue-800">say hello</button>.
            </p>
        )}

        {view === 'work' && (
            <p className="text-4xl md:text-5xl font-serif leading-relaxed text-black max-w-4xl animate-fade-in-up">
                Great choice. Here are my latest projects. Do you want to see <button className="text-blue-600 underline hover:text-blue-800">Web Design</button> or <button className="text-blue-600 underline hover:text-blue-800">Branding</button>? Or <button onClick={() => setView('home')} className="text-gray-400 underline hover:text-gray-600">go back</button>.
            </p>
        )}

        {view === 'contact' && (
            <p className="text-4xl md:text-5xl font-serif leading-relaxed text-black max-w-4xl animate-fade-in-up">
                Let's talk. You can reach me at <span className="font-bold">hello@example.com</span>. Or <button onClick={() => setView('home')} className="text-gray-400 underline hover:text-gray-600">go back start</button>.
            </p>
        )}

      </div>
    </DemoContainer>
  );
}