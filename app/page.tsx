'use client';

import { useState, useEffect } from 'react';
import { usePunkHoroscope } from '@/lib/hooks/usePunkHoroscope';
import { Web3Archetype } from '@/lib/types/punk-horoscope';
import { QuizComponent } from './components/QuizComponent';
import { ArchetypeSelector } from './components/ArchetypeSelector';
import { HoroscopeDisplay } from './components/HoroscopeDisplay';
import { WalletSection } from './components/WalletSection';

type ViewMode = 'home' | 'manual' | 'quiz' | 'horoscope';

export default function PunkHoroscopePage() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedArchetype, setSelectedArchetype] = useState<Web3Archetype | null>(null);
  
  const {
    allArchetypes,
    userProfile,
    lastReading,
    isQuizComplete,
    selectArchetype,
    generateHoroscope,
    resetQuiz
  } = usePunkHoroscope();

  // Auto-navigate to horoscope view when quiz is completed
  useEffect(() => {
    if (isQuizComplete && userProfile && currentView === 'quiz') {
      // Generate horoscope when quiz completes
      generateHoroscope(userProfile.archetype);
      setCurrentView('horoscope');
    }
  }, [isQuizComplete, userProfile, currentView, generateHoroscope]);

  const handleManualSelection = (archetype: Web3Archetype) => {
    setSelectedArchetype(archetype);
  };

  const handleConfirmManualSelection = () => {
    if (selectedArchetype) {
      selectArchetype(selectedArchetype.id);
      generateHoroscope(selectedArchetype.id);
      setCurrentView('horoscope');
    }
  };

  const handleQuizStart = () => {
    resetQuiz();
    setCurrentView('quiz');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedArchetype(null);
  };

  const handleGenerateNewHoroscope = () => {
    if (userProfile) {
      generateHoroscope(userProfile.archetype);
    }
  };


  // Home view
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
        {/* Header */}
        <header className="bg-[var(--app-card-bg)] backdrop-blur-md border-b border-[var(--app-card-border)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--app-foreground)]">
                  🔮 Punk Horoscope
                </h1>
                <p className="text-[var(--app-foreground-muted)] mt-1 text-sm sm:text-base">
                  Horóscopos Web3 para arquetipos crypto
                </p>
              </div>
              
              <WalletSection />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="mb-8">
              <div className="text-8xl mb-6">🔮</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--app-foreground)] mb-4">
                Descubre tu Arquetipo Web3
              </h2>
              <p className="text-lg text-[var(--app-foreground-muted)] max-w-2xl mx-auto leading-relaxed">
                Los horóscopos clásicos ya no funcionan en Web3. Descubre tu arquetipo crypto 
                y obtén predicciones personalizadas para tu vida on-chain.
              </p>
            </div>
          </section>

          {/* Method Selection */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-[var(--app-foreground)] text-center mb-8">
              ¿Cómo quieres descubrir tu arquetipo?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Manual Selection */}
              <div className="bg-[var(--app-card-bg)] rounded-2xl p-6 border border-[var(--app-card-border)] hover:border-[var(--app-accent)] transition-colors group cursor-pointer"
                   onClick={() => setCurrentView('manual')}>
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎭</div>
                  <h4 className="text-xl font-bold text-[var(--app-foreground)] mb-3">
                    Selección Manual
                  </h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm mb-4">
                    Explora los 12 arquetipos y elige el que mejor te represente
                  </p>
                  <div className="bg-[var(--app-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-[var(--app-accent-hover)] transition-colors">
                    Explorar Arquetipos
                  </div>
                </div>
              </div>

              {/* Quiz */}
              <div className="bg-[var(--app-card-bg)] rounded-2xl p-6 border border-[var(--app-card-border)] hover:border-[var(--app-accent)] transition-colors group cursor-pointer"
                   onClick={handleQuizStart}>
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧪</div>
                  <h4 className="text-xl font-bold text-[var(--app-foreground)] mb-3">
                    Test de Personalidad
                  </h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm mb-4">
                    Responde 5 preguntas y descubre tu arquetipo automáticamente
                  </p>
                  <div className="bg-[var(--app-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-[var(--app-accent-hover)] transition-colors">
                    Hacer Test
                  </div>
                </div>
              </div>

              {/* Auto Detection (Coming Soon) */}
              <div className="bg-[var(--app-card-bg)] rounded-2xl p-6 border border-[var(--app-card-border)] opacity-60 cursor-not-allowed">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h4 className="text-xl font-bold text-[var(--app-foreground)] mb-3">
                    Auto Detección
                  </h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm mb-4">
                    Análisis automático basado en tu actividad en Farcaster
                  </p>
                  <div className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Próximamente
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <div className="bg-[var(--app-card-bg)] rounded-2xl p-8 border border-[var(--app-card-border)]">
              <h3 className="text-2xl font-bold text-[var(--app-foreground)] text-center mb-8">
                ¿Qué incluye tu horóscopo?
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">🔮</div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-2">
                    Predicción Diaria
                  </h4>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    Predicciones divertidas e irónicas personalizadas
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-3">💡</div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-2">
                    Consejo Web3
                  </h4>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    Consejos específicos para tu arquetipo crypto
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-3">🎭</div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-2">
                    Estado Emocional
                  </h4>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    Tu mood del día en clave Web3
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-3">🪙</div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-2">
                    Token de la Suerte
                  </h4>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    El token que podría traerte fortuna
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Archetypes Preview */}
          <section>
            <h3 className="text-2xl font-bold text-[var(--app-foreground)] text-center mb-8">
              Los 12 Arquetipos Web3
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allArchetypes.map((archetype) => (
                <div
                  key={archetype.id}
                  className="bg-[var(--app-card-bg)] rounded-xl p-4 border border-[var(--app-card-border)] text-center hover:border-[var(--app-accent)] transition-colors group cursor-pointer"
                  onClick={() => setCurrentView('manual')}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {archetype.emoji}
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--app-foreground)] mb-1">
                    {archetype.name.replace('The ', '')}
                  </h4>
                  <p className="text-xs text-[var(--app-foreground-muted)]">
                    {archetype.traits[0]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--app-card-border)] bg-[var(--app-card-bg)] backdrop-blur-md mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
                🔮 Punk Horoscope
              </h3>
              <p className="text-sm text-[var(--app-foreground-muted)] mb-4">
                Horóscopos Web3 para la era crypto • Built for Farcaster
              </p>
              <div className="flex justify-center items-center gap-4 text-xs text-[var(--app-foreground-muted)]">
                <span>Built on Base</span>
                <span>•</span>
                <span>Powered by kiwik</span>
                <span>•</span>
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Manual selection view
  if (currentView === 'manual') {
    return (
      <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
        <header className="bg-[var(--app-card-bg)] backdrop-blur-md border-b border-[var(--app-card-border)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToHome}
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
              >
                ← Volver
              </button>
              <h1 className="text-xl font-bold text-[var(--app-foreground)]">
                Selección Manual
              </h1>
              <div></div>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ArchetypeSelector
            archetypes={allArchetypes}
            selectedArchetype={selectedArchetype}
            onSelect={handleManualSelection}
            onConfirm={handleConfirmManualSelection}
          />
        </main>
      </div>
    );
  }

  // Quiz view
  if (currentView === 'quiz') {
    return (
      <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
        <header className="bg-[var(--app-card-bg)] backdrop-blur-md border-b border-[var(--app-card-border)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToHome}
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
              >
                ← Volver
              </button>
              <h1 className="text-xl font-bold text-[var(--app-foreground)]">
                Test de Personalidad
              </h1>
              <div></div>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuizComponent />
        </main>
      </div>
    );
  }

  // Horoscope view
  if (currentView === 'horoscope' && lastReading) {
    return (
      <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
        <header className="bg-[var(--app-card-bg)] backdrop-blur-md border-b border-[var(--app-card-border)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToHome}
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
              >
                ← Volver
              </button>
              <h1 className="text-xl font-bold text-[var(--app-foreground)]">
                Tu Horóscopo
              </h1>
              <div></div>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HoroscopeDisplay
            reading={lastReading}
            onGenerateNew={handleGenerateNewHoroscope}
          />
        </main>
      </div>
    );
  }

  return null;
}