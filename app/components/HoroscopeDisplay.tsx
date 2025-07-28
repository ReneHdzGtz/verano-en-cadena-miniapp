'use client';

import { HoroscopeReading } from '@/lib/types/punk-horoscope';
import { getArchetypeById } from '@/lib/data/archetypes';
import { generateFarcasterShareUrl } from '@/lib/utils/farcaster-share';

interface HoroscopeDisplayProps {
  reading: HoroscopeReading;
  onGenerateNew?: () => void;
}

export function HoroscopeDisplay({ reading, onGenerateNew }: HoroscopeDisplayProps) {
  const archetype = getArchetypeById(reading.archetype);
  
  if (!archetype) {
    return (
      <div className="text-center text-[var(--app-foreground-muted)]">
        Error: Arquetipo no encontrado
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header with archetype info */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div
            className="inline-block text-6xl p-4 rounded-2xl mb-4"
            style={{
              backgroundColor: `${archetype.colors.primary}20`,
              border: `2px solid ${archetype.colors.primary}40`
            }}
          >
            {archetype.emoji}
          </div>
          <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">
            {archetype.name}
          </h2>
          <p className="text-[var(--app-foreground-muted)] text-sm">
            {formatDate(reading.date)}
          </p>
        </div>
      </div>

      {/* Horoscope card */}
      <div
        className="relative overflow-hidden rounded-2xl border-2 p-8 mb-6"
        style={{
          background: `linear-gradient(135deg, ${archetype.colors.primary}10, ${archetype.colors.secondary}10)`,
          borderColor: `${archetype.colors.primary}40`
        }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-5"
          style={{
            background: `radial-gradient(circle, ${archetype.colors.primary}, transparent 70%)`
          }}
        />

        {/* Prediction */}
        <div className="relative mb-6">
          <h3 className="text-lg font-bold text-[var(--app-foreground)] mb-3 flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            Predicción
          </h3>
          <p className="text-[var(--app-foreground)] leading-relaxed bg-[var(--app-card-bg)] rounded-xl p-4 border border-[var(--app-card-border)]">
            {reading.prediction}
          </p>
        </div>

        {/* Advice */}
        <div className="relative mb-6">
          <h3 className="text-lg font-bold text-[var(--app-foreground)] mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Consejo Web3
          </h3>
          <p className="text-[var(--app-foreground)] leading-relaxed bg-[var(--app-card-bg)] rounded-xl p-4 border border-[var(--app-card-border)]">
            {reading.advice}
          </p>
        </div>

        {/* Emotion & Token */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--app-card-bg)] rounded-xl p-4 border border-[var(--app-card-border)]">
            <h4 className="font-semibold text-[var(--app-foreground)] mb-2 flex items-center gap-2">
              <span className="text-xl">🎭</span>
              Estado Emocional
            </h4>
            <p className="text-sm text-[var(--app-foreground-muted)]">
              {reading.emotion}
            </p>
          </div>
          
          <div className="bg-[var(--app-card-bg)] rounded-xl p-4 border border-[var(--app-card-border)]">
            <h4 className="font-semibold text-[var(--app-foreground)] mb-2 flex items-center gap-2">
              <span className="text-xl">🪙</span>
              Token de la Suerte
            </h4>
            <p
              className="text-sm font-mono px-3 py-1 rounded-full inline-block"
              style={{
                backgroundColor: `${archetype.colors.primary}20`,
                color: archetype.colors.primary,
                border: `1px solid ${archetype.colors.primary}40`
              }}
            >
              ${reading.luckyToken}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            const shareUrl = generateFarcasterShareUrl({ reading });
            window.open(shareUrl, '_blank');
          }}
          className="flex-1 bg-[var(--app-accent)] text-white px-6 py-3 rounded-lg hover:bg-[var(--app-accent-hover)] transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">📱</span>
          Compartir en Farcaster
        </button>
        
        {onGenerateNew && (
          <button
            onClick={onGenerateNew}
            className="flex-1 bg-[var(--app-card-bg)] text-[var(--app-foreground)] px-6 py-3 rounded-lg border border-[var(--app-card-border)] hover:bg-[var(--app-accent-light)] hover:border-[var(--app-accent)] transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-lg">🔄</span>
            Nuevo Horóscopo
          </button>
        )}
      </div>

      {/* Footer info */}
      <div className="text-center mt-6 text-xs text-[var(--app-foreground-muted)]">
        <p>
          Powered by Punk Horoscope • Built on Base • 
          <span className="ml-1" style={{ color: archetype.colors.primary }}>
            {archetype.name}
          </span>
        </p>
      </div>
    </div>
  );
}