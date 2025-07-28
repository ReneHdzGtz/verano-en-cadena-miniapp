'use client';

import { useState } from 'react';
import { BaseArchetypes } from './BaseArchetypes';
import { generateRandomStats, type UserProfile } from '../data/baseData';

interface ProfileCreationProps {
  isActive: boolean;
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export function ProfileCreation({ isActive, onComplete, onBack }: ProfileCreationProps) {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!username || !selectedArchetype) {
      alert('Por favor completa todos los campos y selecciona un arquetipo');
      return;
    }

    const profile: UserProfile = {
      username,
      bio,
      archetype: selectedArchetype,
      createdAt: new Date(),
      stats: generateRandomStats()
    };

    onComplete(profile);
  };

  if (!isActive) return null;

  return (
    <>
      <style jsx>{`
        .profile-creation {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.2), rgba(0, 212, 255, 0.1));
          border: 2px solid rgba(0, 82, 255, 0.5);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(20px);
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          font-weight: bold;
          margin-bottom: 8px;
          color: #00d4ff;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-input {
          width: 100%;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 82, 255, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input:focus {
          outline: none;
          border-color: #0052ff;
          box-shadow: 0 0 20px rgba(0, 82, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .base-features {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
          flex-wrap: wrap;
        }

        .base-feature {
          text-align: center;
          padding: 10px;
          margin: 5px;
          background: rgba(0, 82, 255, 0.1);
          border-radius: 10px;
          min-width: 80px;
        }

        .base-feature-icon {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 5px;
        }

        .base-feature-text {
          font-size: 0.7rem;
          opacity: 0.8;
        }
      `}</style>

      <div className="v2-screen active">
        <div className="profile-creation">
          <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#00d4ff' }}>
            🚀 Crear Perfil Base
          </h2>
          
          <div className="form-group">
            <label className="form-label">Username Base</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tu-nombre.base.eth"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Bio Base</label>
            <input
              type="text"
              className="form-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Building the future on Base..."
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Selecciona tu Arquetipo Base</label>
            <BaseArchetypes
              selectedArchetype={selectedArchetype}
              onSelect={setSelectedArchetype}
            />
          </div>
          
          <div className="base-features">
            <div className="base-feature">
              <span className="base-feature-icon">⚡</span>
              <span className="base-feature-text">Low Fees</span>
            </div>
            <div className="base-feature">
              <span className="base-feature-icon">🔵</span>
              <span className="base-feature-text">Base Native</span>
            </div>
            <div className="base-feature">
              <span className="base-feature-icon">🌊</span>
              <span className="base-feature-text">Onchain Summer</span>
            </div>
            <div className="base-feature">
              <span className="base-feature-icon">🎯</span>
              <span className="base-feature-text">Builder Focus</span>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button className="btn-v2" onClick={handleSubmit}>
              Crear Perfil Base
            </button>
            <button className="btn-v2 btn-v2-secondary" onClick={onBack}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}