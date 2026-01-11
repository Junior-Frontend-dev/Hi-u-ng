import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxEvolution() {
  const [level, setLevel] = useState(1);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#121212] flex flex-col items-center justify-center p-8 text-white">
        <div className="absolute top-8 right-8">
            <button 
                onClick={() => setLevel(l => Math.min(l + 1, 3))}
                className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 text-xs"
            >
                Simulate Visit ({level})
            </button>
        </div>

        {/* Level 1: Basic */}
        {level === 1 && (
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h1 className="text-4xl font-bold">Welcome User</h1>
                <button className="bg-blue-600 px-8 py-3 rounded-lg font-bold">Start</button>
            </div>
        )}

        {/* Level 2: Advanced (Dense) */}
        {level === 2 && (
            <div className="w-full max-w-2xl grid grid-cols-2 gap-4 animate-in fade-in">
                <div className="col-span-2 bg-neutral-800 p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-2">Dashboard</h2>
                    <div className="flex gap-4 text-sm text-gray-400">
                        <span>Analytics</span>
                        <span>Reports</span>
                        <span>Settings</span>
                    </div>
                </div>
                <div className="bg-neutral-800 p-6 rounded-xl h-32">Quick Action</div>
                <div className="bg-neutral-800 p-6 rounded-xl h-32">Recent Items</div>
            </div>
        )}

        {/* Level 3: Expert (Minimal/Hotkeys) */}
        {level === 3 && (
            <div className="w-full max-w-3xl font-mono text-green-400 animate-in fade-in">
                <p className="mb-4 opacity-50">// Expert Mode Activated</p>
                <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span>CMD+K</span>
                    <span>Search</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span>CMD+N</span>
                    <span>New Project</span>
                </div>
                <input type="text" placeholder="> Type command..." className="w-full bg-transparent border-none outline-none text-white mt-8" autoFocus />
            </div>
        )}

      </div>
    </DemoContainer>
  );
}