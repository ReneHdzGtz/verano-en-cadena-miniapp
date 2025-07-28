'use client';

import { baseArchetypes, horoscopePredictions, type UserProfile } from '../data/baseData';

interface ProfileDisplayProps {
  isActive: boolean;
  profile: UserProfile | null;
  onBack: () => void;
}

export function ProfileDisplay({ isActive, profile, onBack }: ProfileDisplayProps) {
  if (!isActive || !profile) return null;

  const archetype = baseArchetypes[profile.archetype];
  const horoscope = horoscopePredictions[profile.archetype] || horoscopePredictions.base_builder;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Mi perfil Base: ${archetype.name}`,
        text: `Soy ${archetype.name} en Base Network 🔵`,
        url: window.location.href
      });
    } else {
      const shareText = `Soy ${archetype.name} en Base Network 🔵\n\nDescubre tu arquetipo Base en: ${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      alert('¡Texto copiado al portapapeles! Compártelo en tus redes sociales.');
    }
  };

  const handleMintNFT = () => {
    alert('🎨 Mint como NFT\n\nEsta funcionalidad permitirá acuñar tu perfil Base como NFT en la red Base.');
  };

  return (
    <>
      <style jsx>{`
        .profile-display {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.2), rgba(0, 212, 255, 0.1));
          border: 2px solid rgba(0, 82, 255, 0.5);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          backdrop-filter: blur(20px);
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(45deg, ${archetype.color}, #00d4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          margin: 0 auto 25px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 82, 255, 0.3);
        }

        .profile-name {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #00d4ff;
        }

        .profile-archetype {
          font-size: 1.2rem;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 25px 0;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 15px;
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0052ff;
          display: block;
        }

        .stat-label {
          font-size: 0.8rem;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .base-horoscope {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.15), rgba(0, 212, 255, 0.05));
          border: 2px solid rgba(0, 82, 255, 0.4);
          border-radius: 18px;
          padding: 25px;
          margin-top: 25px;
        }

        .horoscope-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .horoscope-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #00d4ff;
          margin-bottom: 5px;
        }

        .horoscope-date {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .horoscope-section {
          margin-bottom: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border-left: 4px solid #0052ff;
        }

        .horoscope-section-title {
          font-size: 0.8rem;
          font-weight: bold;
          color: #00d4ff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .horoscope-section-content {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        @media (max-width: 480px) {
          .profile-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="v2-screen active">
        <div className="profile-display">
          <div className="profile-avatar">
            {archetype.emoji}
          </div>
          <div className="profile-name">{profile.username}</div>
          <div className="profile-archetype">{archetype.name}</div>
          <p style={{ opacity: 0.8, marginBottom: '20px' }}>{profile.bio}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{profile.stats.baseScore}</span>
              <span className="stat-label">Base Score</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats.transactions}</span>
              <span className="stat-label">Transactions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats.daysActive}</span>
              <span className="stat-label">Days Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats.protocols}</span>
              <span className="stat-label">Protocols</span>
            </div>
          </div>
        </div>
        
        <div className="base-horoscope">
          <div className="horoscope-header">
            <div className="horoscope-title">Tu Horóscopo Base</div>
            <div className="horoscope-date">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div>
            <div className="horoscope-section">
              <div className="horoscope-section-title">🔮 Predicción</div>
              <div className="horoscope-section-content">{horoscope.prediction}</div>
            </div>
            <div className="horoscope-section">
              <div className="horoscope-section-title">💡 Consejo Base</div>
              <div className="horoscope-section-content">{horoscope.advice}</div>
            </div>
            <div className="horoscope-section">
              <div className="horoscope-section-title">🪙 Token de la Suerte</div>
              <div className="horoscope-section-content">${horoscope.token}</div>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button className="btn-v2" onClick={handleShare}>
            Compartir en Base
          </button>
          <button className="btn-v2" onClick={handleMintNFT}>
            Mint como NFT
          </button>
          <button className="btn-v2 btn-v2-secondary" onClick={onBack}>
            Nuevo Perfil
          </button>
        </div>
      </div>
    </>
  );
}