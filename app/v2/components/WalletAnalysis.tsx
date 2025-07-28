'use client';

import { useState } from 'react';
import { generateRandomStats, baseArchetypes, type UserProfile } from '../data/baseData';

interface WalletAnalysisProps {
  isActive: boolean;
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export function WalletAnalysis({ isActive, onComplete, onBack }: WalletAnalysisProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simular proceso de conexión y análisis
    setTimeout(() => {
      // Generar perfil basado en análisis simulado
      const randomArchetypes = Object.keys(baseArchetypes);
      const randomArchetype = randomArchetypes[Math.floor(Math.random() * randomArchetypes.length)];
      
      const profile: UserProfile = {
        username: 'Base Wallet User',
        bio: 'Profile generated from on-chain activity analysis',
        archetype: randomArchetype,
        createdAt: new Date(),
        stats: generateRandomStats()
      };
      
      setIsConnecting(false);
      onComplete(profile);
    }, 3000);
  };

  if (!isActive) return null;

  return (
    <>
      <style jsx>{`
        .wallet-connection {
          background: rgba(0, 82, 255, 0.1);
          border: 1px dashed rgba(0, 82, 255, 0.5);
          border-radius: 15px;
          padding: 40px 20px;
          text-align: center;
          margin: 20px 0;
        }

        .wallet-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.7;
        }

        .connecting-animation {
          display: inline-block;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .analysis-steps {
          text-align: left;
          margin: 30px 0;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 20px;
        }

        .analysis-step {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          opacity: 0.7;
        }

        .analysis-step.active {
          opacity: 1;
          color: #00d4ff;
        }

        .step-icon {
          font-size: 1.2rem;
          margin-right: 15px;
          width: 30px;
        }

        .wallet-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 30px 0;
        }

        .wallet-feature {
          background: rgba(0, 82, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
          text-align: center;
        }

        .wallet-feature-icon {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 8px;
        }

        .wallet-feature-text {
          font-size: 0.8rem;
          opacity: 0.8;
        }
      `}</style>

      <div className="v2-screen active">
        <div className="wallet-connection">
          <div className={`wallet-icon ${isConnecting ? 'connecting-animation' : ''}`}>
            {isConnecting ? '⏳' : '🔗'}
          </div>
          <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>
            {isConnecting ? 'Analizando Base Activity...' : 'Conectar Wallet Base'}
          </h3>
          <p style={{ marginBottom: '20px', opacity: 0.8 }}>
            {isConnecting 
              ? 'Analizando tu actividad on-chain para determinar tu perfil Base automáticamente'
              : 'Conecta tu wallet para análisis automático de tu actividad en Base Network'
            }
          </p>
          
          {!isConnecting && (
            <button className="btn-v2" onClick={handleConnectWallet}>
              Conectar con Base
            </button>
          )}
        </div>

        {isConnecting && (
          <div className="analysis-steps">
            <h4 style={{ marginBottom: '20px', color: '#00d4ff' }}>Análisis en Progreso:</h4>
            <div className="analysis-step active">
              <span className="step-icon">🔍</span>
              <span>Escaneando transacciones en Base...</span>
            </div>
            <div className="analysis-step active">
              <span className="step-icon">💎</span>
              <span>Analizando protocolos utilizados...</span>
            </div>
            <div className="analysis-step active">
              <span className="step-icon">📊</span>
              <span>Calculando patrones de comportamiento...</span>
            </div>
            <div className="analysis-step">
              <span className="step-icon">🎯</span>
              <span>Determinando arquetipo Base...</span>
            </div>
          </div>
        )}

        <div className="wallet-features">
          <div className="wallet-feature">
            <span className="wallet-feature-icon">⚡</span>
            <span className="wallet-feature-text">Análisis Instantáneo</span>
          </div>
          <div className="wallet-feature">
            <span className="wallet-feature-icon">🔒</span>
            <span className="wallet-feature-text">100% Seguro</span>
          </div>
          <div className="wallet-feature">
            <span className="wallet-feature-icon">🎯</span>
            <span className="wallet-feature-text">Alta Precisión</span>
          </div>
          <div className="wallet-feature">
            <span className="wallet-feature-icon">🌊</span>
            <span className="wallet-feature-text">Base Native</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn-v2 btn-v2-secondary" onClick={onBack} disabled={isConnecting}>
            {isConnecting ? 'Analizando...' : 'Volver'}
          </button>
        </div>
      </div>
    </>
  );
}