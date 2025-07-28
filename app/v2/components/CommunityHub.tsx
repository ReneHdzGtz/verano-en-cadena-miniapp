'use client';

interface CommunityHubProps {
  isActive: boolean;
  onBack: () => void;
}

export function CommunityHub({ isActive, onBack }: CommunityHubProps) {
  if (!isActive) return null;

  return (
    <>
      <style jsx>{`
        .community-container {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.2), rgba(0, 212, 255, 0.1));
          border: 2px solid rgba(0, 82, 255, 0.5);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(20px);
        }

        .community-feature {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.15), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(0, 82, 255, 0.4);
          border-radius: 18px;
          padding: 25px;
          margin-bottom: 20px;
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(15px);
          position: relative;
          overflow: hidden;
        }

        .community-feature::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 82, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .community-feature:hover::before {
          left: 100%;
        }

        .community-feature:hover {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.25), rgba(255, 255, 255, 0.1));
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 82, 255, 0.3);
          border-color: #0052ff;
        }

        .coming-soon {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(45deg, #6c757d, #495057);
          color: white;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: bold;
          text-transform: uppercase;
        }
      `}</style>

      <div className="v2-screen active">
        <div className="community-container">
          <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#00d4ff' }}>
            🌐 Base Community Hub
          </h2>
          
          <div className="community-feature" onClick={() => alert('🚧 Coming Soon!\n\nEsta funcionalidad estará disponible próximamente.')}>
            <div className="coming-soon">Soon</div>
            <div className="feature-icon">📊</div>
            <div className="feature-title">Leaderboard Base</div>
            <div className="feature-description">Los perfiles más activos en Base Network</div>
          </div>
          
          <div className="community-feature" onClick={() => alert('🚧 Coming Soon!\n\nEsta funcionalidad estará disponible próximamente.')}>
            <div className="coming-soon">Soon</div>
            <div className="feature-icon">🎨</div>
            <div className="feature-title">Galería de Perfiles</div>
            <div className="feature-description">Explora perfiles únicos de la comunidad Base</div>
          </div>
          
          <div className="community-feature" onClick={() => alert('🚧 Coming Soon!\n\nEsta funcionalidad estará disponible próximamente.')}>
            <div className="coming-soon">Soon</div>
            <div className="feature-icon">🏆</div>
            <div className="feature-title">Achievements Base</div>
            <div className="feature-description">Desbloquea logros especiales en el ecosistema</div>
          </div>

          <div className="community-feature" onClick={() => alert('🚧 Coming Soon!\n\nEsta funcionalidad estará disponible próximamente.')}>
            <div className="coming-soon">Soon</div>
            <div className="feature-icon">💬</div>
            <div className="feature-title">Base Chat</div>
            <div className="feature-description">Conecta y chatea con otros usuarios de tu mismo arquetipo</div>
          </div>

          <div className="community-feature" onClick={() => alert('🚧 Coming Soon!\n\nEsta funcionalidad estará disponible próximamente.')}>
            <div className="coming-soon">Soon</div>
            <div className="feature-icon">🎯</div>
            <div className="feature-title">Base Challenges</div>
            <div className="feature-description">Participa en desafíos semanales y gana recompensas</div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <button className="btn-v2 btn-v2-secondary" onClick={onBack}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
}