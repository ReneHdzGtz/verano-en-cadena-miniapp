'use client';

import { useState } from 'react';
import { Web3Archetype } from '@/lib/types/punk-horoscope';
import { ArchetypeCard } from './ArchetypeCard';

interface ArchetypeSelectorProps {
  archetypes: Web3Archetype[];
  selectedArchetype?: Web3Archetype | null;
  onSelect: (archetype: Web3Archetype) => void;
  onConfirm?: () => void;
}

export function ArchetypeSelector({ 
  archetypes, 
  selectedArchetype, 
  onSelect, 
  onConfirm 
}: ArchetypeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArchetypes = archetypes.filter(archetype =>
    archetype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    archetype.personality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    archetype.traits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🎭</div>
        <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">
          Selecciona tu Arquetipo Web3
        </h2>
        <p className="text-[var(--app-foreground-muted)] max-w-2xl mx-auto">
          Elige el arquetipo que mejor describa tu personalidad en el ecosistema Web3. 
          Cada uno tiene características únicas y horóscopos personalizados.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar arquetipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-lg bg-[var(--app-card-bg)] border border-[var(--app-card-border)] text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--app-foreground-muted)]">
            🔍
          </div>
        </div>
      </div>

      {/* Archetypes grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredArchetypes.map((archetype) => (
          <ArchetypeCard
            key={archetype.id}
            archetype={archetype}
            isSelected={selectedArchetype?.id === archetype.id}
            onClick={() => onSelect(archetype)}
            showFullDescription
          />
        ))}
      </div>

      {/* No results */}
      {filteredArchetypes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
            No se encontraron arquetipos
          </h3>
          <p className="text-[var(--app-foreground-muted)]">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}

      {/* Confirm button */}
      {selectedArchetype && onConfirm && (
        <div className="text-center">
          <button
            onClick={onConfirm}
            className="bg-[var(--app-accent)] text-white px-8 py-4 rounded-lg hover:bg-[var(--app-accent-hover)] transition-colors font-semibold text-lg"
          >
            Confirmar: {selectedArchetype.name} {selectedArchetype.emoji}
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 bg-[var(--app-card-bg)] rounded-2xl p-6 border border-[var(--app-card-border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--app-accent)]">12</div>
            <div className="text-sm text-[var(--app-foreground-muted)]">Arquetipos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--app-accent)]">∞</div>
            <div className="text-sm text-[var(--app-foreground-muted)]">Horóscopos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--app-accent)]">Web3</div>
            <div className="text-sm text-[var(--app-foreground-muted)]">Native</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--app-accent)]">🔮</div>
            <div className="text-sm text-[var(--app-foreground-muted)]">Místico</div>
          </div>
        </div>
      </div>
    </div>
  );
}