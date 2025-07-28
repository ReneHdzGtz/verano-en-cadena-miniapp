'use client';

import { useState } from 'react';
import { advancedQuestions, generateRandomStats, baseArchetypes, type UserProfile } from '../data/baseData';

interface AdvancedTestProps {
  isActive: boolean;
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export function AdvancedTest({ isActive, onComplete, onBack }: AdvancedTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleStartTest = () => {
    setCurrentQuestion(0);
    const initialAnswers: Record<string, number> = {};
    Object.keys(baseArchetypes).forEach(key => {
      initialAnswers[key] = 0;
    });
    setTestAnswers(initialAnswers);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const question = advancedQuestions[currentQuestion];
    const answer = question.answers[selectedAnswer];
    
    // Sumar puntos
    const newAnswers = { ...testAnswers };
    Object.entries(answer.points).forEach(([archetype, points]) => {
      newAnswers[archetype] += points;
    });
    setTestAnswers(newAnswers);

    if (currentQuestion + 1 >= advancedQuestions.length) {
      finishTest(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const finishTest = (finalAnswers: Record<string, number>) => {
    // Encontrar arquetipo con mayor puntuación
    const winner = Object.entries(finalAnswers).reduce((a, b) => 
      finalAnswers[a[0]] > finalAnswers[b[0]] ? a : b
    );
    
    const profile: UserProfile = {
      username: 'Base User',
      bio: 'Discovered through Base DNA Test',
      archetype: winner[0],
      createdAt: new Date(),
      stats: generateRandomStats(),
      testResults: finalAnswers
    };
    
    onComplete(profile);
  };

  if (!isActive) return null;

  const progress = ((currentQuestion + 1) / advancedQuestions.length) * 100;
  const question = advancedQuestions[currentQuestion];

  return (
    <>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(45deg, #0052ff, #00d4ff);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .question-card {
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.2), rgba(0, 212, 255, 0.1));
          border: 2px solid rgba(0, 82, 255, 0.5);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(20px);
          margin-bottom: 20px;
        }

        .answer-option {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(0, 82, 255, 0.3);
          border-radius: 15px;
          padding: 15px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .answer-option:hover {
          background: rgba(0, 82, 255, 0.2);
          transform: translateX(5px);
        }

        .answer-option.selected {
          background: rgba(0, 82, 255, 0.3);
          border-color: #0052ff;
          box-shadow: 0 0 20px rgba(0, 82, 255, 0.4);
        }

        .test-start {
          text-align: center;
          padding: 40px 20px;
        }

        .test-title {
          font-size: 1.5rem;
          color: #00d4ff;
          margin-bottom: 20px;
        }

        .test-description {
          opacity: 0.8;
          margin-bottom: 30px;
          line-height: 1.6;
        }
      `}</style>

      <div className="v2-screen active">
        {currentQuestion === 0 && selectedAnswer === null && Object.keys(testAnswers).length === 0 ? (
          <div className="question-card">
            <div className="test-start">
              <h3 className="test-title">🧬 Base DNA Test</h3>
              <p className="test-description">
                Responde 10 preguntas diseñadas específicamente para mapear tu personalidad en el ecosistema Base. Cada respuesta revelará aspectos únicos de tu identidad crypto.
              </p>
              <button className="btn-v2" onClick={handleStartTest}>
                Comenzar Test
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="question-card">
              <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>
                Pregunta {currentQuestion + 1}/{advancedQuestions.length}
              </h3>
              <p style={{ marginBottom: '25px', fontSize: '1.1rem' }}>
                {question.question}
              </p>
              <div>
                {question.answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {answer.text}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        <div style={{ textAlign: 'center' }}>
          {selectedAnswer !== null && (
            <button className="btn-v2" onClick={handleNextQuestion}>
              {currentQuestion + 1 >= advancedQuestions.length ? 'Finalizar' : 'Siguiente'}
            </button>
          )}
          <button className="btn-v2 btn-v2-secondary" onClick={onBack}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}