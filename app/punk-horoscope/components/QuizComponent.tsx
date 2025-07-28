'use client';

import { usePunkHoroscope } from '@/lib/hooks/usePunkHoroscope';
import { getArchetypeById } from '@/lib/data/archetypes';

export function QuizComponent() {
  const {
    currentQuestion,
    currentQuestionIndex,
    isQuizComplete,
    quizProgress,
    totalQuestions,
    answerQuestion,
    resetQuiz,
    userProfile
  } = usePunkHoroscope();

  if (isQuizComplete && userProfile) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[var(--app-card-bg)] rounded-2xl p-8 border border-[var(--app-card-border)] text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">
              ¡Quiz Completado!
            </h2>
            <p className="text-[var(--app-foreground-muted)]">
              Hemos determinado tu arquetipo Web3
            </p>
          </div>

          <div className="bg-[var(--app-accent-light)] rounded-xl p-6 mb-6">
            <p className="text-sm text-[var(--app-foreground-muted)] mb-2">
              Tu arquetipo es:
            </p>
            <h3 className="text-xl font-bold text-[var(--app-accent)]">
              {getArchetypeById(userProfile.archetype)?.name || userProfile.archetype}
            </h3>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-[var(--app-accent)] text-white px-6 py-3 rounded-lg hover:bg-[var(--app-accent-hover)] transition-colors"
          >
            Hacer quiz de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-[var(--app-card-bg)] rounded-2xl p-8 border border-[var(--app-card-border)]">
          <div className="text-4xl mb-6">🧪</div>
          <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-4">
            Test de Personalidad Web3
          </h2>
          <p className="text-[var(--app-foreground-muted)] mb-6">
            Responde 5 preguntas y descubre tu arquetipo en el ecosistema Web3
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[var(--app-foreground-muted)]">
            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
          </span>
          <span className="text-sm text-[var(--app-accent)]">
            {Math.round(quizProgress)}%
          </span>
        </div>
        <div className="w-full bg-[var(--app-card-border)] rounded-full h-2">
          <div
            className="bg-[var(--app-accent)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${quizProgress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-[var(--app-card-bg)] rounded-2xl p-8 border border-[var(--app-card-border)]">
        <h2 className="text-xl font-bold text-[var(--app-foreground)] mb-6">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => answerQuestion(index)}
              className="w-full text-left p-4 rounded-xl border border-[var(--app-card-border)] bg-[var(--app-card-bg)] hover:bg-[var(--app-accent-light)] hover:border-[var(--app-accent)] transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-[var(--app-card-border)] group-hover:border-[var(--app-accent)] flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[var(--app-accent)] transition-colors" />
                </div>
                <span className="text-[var(--app-foreground)] group-hover:text-[var(--app-accent)] transition-colors">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={resetQuiz}
          className="text-sm text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
        >
          Reiniciar quiz
        </button>
        <span className="text-sm text-[var(--app-foreground-muted)]">
          Selecciona una respuesta para continuar
        </span>
      </div>
    </div>
  );
}