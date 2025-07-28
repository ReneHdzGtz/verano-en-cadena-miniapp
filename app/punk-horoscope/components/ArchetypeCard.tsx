'use client';

import { Web3Archetype } from '@/lib/types/punk-horoscope';

interface ArchetypeCardProps {
  archetype: Web3Archetype;
  isSelected?: boolean;
  onClick?: () => void;
  showFullDescription?: boolean;
}

export function ArchetypeCard({ 
  archetype, 
  isSelected = false, 
  onClick, 
  showFullDescription = false 
}: ArchetypeCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-[var(--app-accent)] bg-[var(--app-accent-light)] shadow-lg shadow-[var(--app-accent)]/20' 
          : 'border-[var(--app-card-border)] bg-[var(--app-card-bg)] hover:border-[var(--app-accent)] hover:shadow-md'
        }
      `}
      onClick={onClick}
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${archetype.colors.primary}15, ${archetype.colors.secondary}15)`
          : undefined
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${archetype.colors.primary}, ${archetype.colors.secondary})`
        }}
      />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="text-4xl p-3 rounded-xl"
            style={{
              backgroundColor: `${archetype.colors.primary}20`,
              border: `2px solid ${archetype.colors.primary}40`
            }}
          >
            {archetype.emoji}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[var(--app-foreground)] mb-1">
              {archetype.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              {archetype.traits.slice(0, 2).map((trait, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full text-[var(--app-foreground-muted)]"
                  style={{
                    backgroundColor: `${archetype.colors.primary}15`,
                    border: `1px solid ${archetype.colors.primary}30`
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--app-foreground-muted)] text-sm leading-relaxed mb-4">
          {archetype.personality}
        </p>

        {/* Full traits (if showing full description) */}
        {showFullDescription && (
          <div className="flex flex-wrap gap-2">
            {archetype.traits.map((trait, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full text-[var(--app-foreground)]"
                style={{
                  backgroundColor: `${archetype.colors.primary}20`,
                  border: `1px solid ${archetype.colors.primary}40`
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: archetype.colors.primary }}
            >
              ✓
            </div>
          </div>
        )}
      </div>
    </div>
  );
}