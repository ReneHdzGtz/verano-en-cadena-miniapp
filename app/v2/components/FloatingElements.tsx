'use client';

import { useEffect } from 'react';

export function FloatingElements() {
  useEffect(() => {
    const container = document.getElementById('floatingElements');
    if (!container) return;

    const icons = ['🔵', '🌊', '⚡', '🔧', '💎', '🚜', '🎨', '🌉'];
    
    // Clear existing elements
    container.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
      const icon = document.createElement('div');
      icon.className = 'floating-icon';
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];
      icon.style.left = Math.random() * 100 + '%';
      icon.style.top = Math.random() * 100 + '%';
      icon.style.animationDelay = Math.random() * 6 + 's';
      container.appendChild(icon);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        .floating-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .floating-icon {
          position: absolute;
          color: rgba(0, 82, 255, 0.1);
          font-size: 2rem;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
      <div className="floating-elements" id="floatingElements"></div>
    </>
  );
}