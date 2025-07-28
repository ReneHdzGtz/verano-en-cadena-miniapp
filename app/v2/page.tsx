'use client';

import { useState } from 'react';
import { FloatingElements } from './components/FloatingElements';
import { ProfileCreation } from './components/ProfileCreation';
import { AdvancedTest } from './components/AdvancedTest';
import { WalletAnalysis } from './components/WalletAnalysis';
import { ProfileDisplay } from './components/ProfileDisplay';
import { CommunityHub } from './components/CommunityHub';
import { type UserProfile } from './data/baseData';

type ViewMode = 'home' | 'profile-creation' | 'advanced-test' | 'wallet-analysis' | 'profile-display' | 'community';

export default function PunkHoroscopeV2() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0052ff, #1b1b3a, #000000);
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .base-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 80%, rgba(0, 82, 255, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(0, 82, 255, 0.2) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        .v2-container {
          position: relative;
          z-index: 10;
          max-width: 420px;
          margin: 0 auto;
          padding: 20px;
        }

        .v2-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 25px;
          background: rgba(0, 82, 255, 0.1);
          border-radius: 20px;
          border: 2px solid rgba(0, 82, 255, 0.3);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px rgba(0, 82, 255, 0.2);
        }

        .v2-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 10px;
          background: linear-gradient(45deg, #0052ff, #00d4ff, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(0, 82, 255, 0.5);
        }

        .version-badge {
          display: inline-block;
          background: rgba(0, 82, 255, 0.8);
          color: white;
          padding: 5px 15px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .v2-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .v2-screen {
          display: none;
          animation: slideIn 0.5s ease-out;
        }

        .v2-screen.active {
          display: block;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .feature-card {
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

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 82, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-card:hover {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.25), rgba(255, 255, 255, 0.1));
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 82, 255, 0.3);
          border-color: #0052ff;
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          display: block;
        }

        .feature-title {
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #00d4ff;
        }

        .feature-description {
          font-size: 0.95rem;
          opacity: 0.85;
          line-height: 1.5;
        }

        .feature-new {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(45deg, #ff6b35, #ff9500);
          color: white;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .btn-v2 {
          background: linear-gradient(45deg, #0052ff, #00d4ff);
          border: none;
          color: white;
          padding: 15px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          transition: all 0.3s ease;
          margin: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .btn-v2::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-v2:hover::before {
          left: 100%;
        }

        .btn-v2:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 82, 255, 0.4);
        }

        .btn-v2-secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 480px) {
          .v2-container {
            padding: 15px;
          }
          
          .v2-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      {/* Efectos visuales de Base */}
      <div className="base-gradient"></div>
      <FloatingElements />

      <div className="v2-container">
        <div className="v2-header">
          <div className="version-badge">Base Network Edition</div>
          <h1 className="v2-title">🔵 Punk Horoscope v2.0</h1>
          <p className="v2-subtitle">Descubre tu identidad Base y conecta con el ecosistema L2 más vibrante</p>
        </div>

        {/* Pantalla principal */}
        <div className={`v2-screen ${currentView === 'home' ? 'active' : ''}`}>
          <div className="feature-card" onClick={() => setCurrentView('profile-creation')}>
            <div className="feature-new">New!</div>
            <div className="feature-icon">👤</div>
            <div className="feature-title">Crear Perfil Base</div>
            <div className="feature-description">Construye tu identidad completa en Base Network con stats y achievements</div>
          </div>
          
          <div className="feature-card" onClick={() => setCurrentView('advanced-test')}>
            <div className="feature-new">Enhanced</div>
            <div className="feature-icon">🧬</div>
            <div className="feature-title">Test Base DNA</div>
            <div className="feature-description">Test avanzado de 10 preguntas para mapear tu personalidad Base</div>
          </div>
          
          <div className="feature-card" onClick={() => setCurrentView('wallet-analysis')}>
            <div className="feature-icon">💎</div>
            <div className="feature-title">Análisis On-Chain</div>
            <div className="feature-description">Conecta tu wallet para análisis automático de tu actividad Base</div>
          </div>
          
          <div className="feature-card" onClick={() => setCurrentView('community')}>
            <div className="feature-icon">🌐</div>
            <div className="feature-title">Base Community Hub</div>
            <div className="feature-description">Conecta con otros usuarios Base y comparte tu journey</div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button className="btn-v2 btn-v2-secondary" onClick={() => window.location.href = '/'}>
              ← Volver a v1.0
            </button>
          </div>
        </div>

        {/* Otras pantallas */}
        <ProfileCreation 
          isActive={currentView === 'profile-creation'}
          onComplete={(profile) => {
            setUserProfile(profile);
            setCurrentView('profile-display');
          }}
          onBack={() => setCurrentView('home')}
        />

        <AdvancedTest 
          isActive={currentView === 'advanced-test'}
          onComplete={(profile) => {
            setUserProfile(profile);
            setCurrentView('profile-display');
          }}
          onBack={() => setCurrentView('home')}
        />

        <WalletAnalysis 
          isActive={currentView === 'wallet-analysis'}
          onComplete={(profile) => {
            setUserProfile(profile);
            setCurrentView('profile-display');
          }}
          onBack={() => setCurrentView('home')}
        />

        <ProfileDisplay 
          isActive={currentView === 'profile-display'}
          profile={userProfile}
          onBack={() => setCurrentView('home')}
        />

        <CommunityHub 
          isActive={currentView === 'community'}
          onBack={() => setCurrentView('home')}
        />
      </div>
    </>
  );
}