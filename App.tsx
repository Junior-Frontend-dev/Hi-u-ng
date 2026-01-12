import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminPage } from './components/AdminPage';
import { EFFECTS_DATA } from './constants';
import { CODE_MAP } from './data/code';
import { LazyCacheProvider } from './components/LazyCache';
import { EffectRenderer } from './components/EffectRenderer';
import { useStore } from './hooks/useStore';

function App() {
  const [currentId, setCurrentId] = useState(EFFECTS_DATA[0].id);
  const [viewMode, setViewMode] = useState<'preview' | 'prompt' | 'code'>('preview');

  const currentEffect = useMemo(() => 
    EFFECTS_DATA.find(e => e.id === currentId) || EFFECTS_DATA[0], 
  [currentId]);

  React.useEffect(() => {
      setViewMode('preview'); 
  }, [currentId]);

  return (
    <LazyCacheProvider>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={
          <Layout 
            currentEffectId={currentId} 
            onSelectEffect={setCurrentId}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            currentCode={CODE_MAP[currentId]}
            currentPrompt={currentEffect.prompt}
          >
              <div className="w-full h-full lg:p-6 p-0">
                  <EffectRenderer id={currentId} />
              </div>
          </Layout>
        } />
      </Routes>
    </LazyCacheProvider>
  );
}

export default App;