'use client';

import { baseArchetypes } from '../data/baseData';

interface BaseArchetypesProps {
  selectedArchetype: string | null;
  onSelect: (archetypeKey: string) => void;
}

export function BaseArchetypes({ selectedArchetype, onSelect }: BaseArchetypesProps) {
  return (
    <>
      <style jsx>{`
        .base-archetypes {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .archetype-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(0, 82, 255, 0.3);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .archetype-card:hover {
          background: rgba(0, 82, 255, 0.2);
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 82, 255, 0.3);
        }

        .archetype-card.selected {
          background: rgba(0, 82, 255, 0.3);
          border-color: #0052ff;
          box-shadow: 0 0 30px rgba(0, 82, 255, 0.5);
        }

        .archetype-emoji {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 10px;
        }

        .archetype-name {
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .archetype-trait {
          font-size: 0.7rem;
          opacity: 0.7;
          font-style: italic;
        }

        @media (max-width: 480px) {
          .base-archetypes {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="base-archetypes">
        {Object.entries(baseArchetypes).map(([key, archetype]) => (
          <div
            key={key}
            className={`archetype-card ${selectedArchetype === key ? 'selected' : ''}`}
            onClick={() => onSelect(key)}
          >
            <div className="archetype-emoji">{archetype.emoji}</div>
            <div className="archetype-name">{archetype.name}</div>
            <div className="archetype-trait">{archetype.trait}</div>
          </div>
        ))}
      </div>
    </>
  );
}