import { useState, useCallback, useMemo } from 'react';
import { QuizResult, HoroscopeReading, UserProfile } from '../types/punk-horoscope';
import { WEB3_ARCHETYPES, getArchetypeById } from '../data/archetypes';
import { QUIZ_QUESTIONS } from '../data/quiz-questions';

export function usePunkHoroscope() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [lastReading, setLastReading] = useState<HoroscopeReading | null>(null);

  // Calculate quiz result based on answers
  const calculateQuizResult = useCallback((answers: number[]): QuizResult => {
    const points: Record<string, number> = {};
    
    // Initialize all archetypes with 0 points
    Object.keys(WEB3_ARCHETYPES).forEach(key => {
      points[key] = 0;
    });

    // Calculate points based on answers
    answers.forEach((answerIndex, questionIndex) => {
      const question = QUIZ_QUESTIONS[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      Object.entries(selectedOption.points).forEach(([archetypeId, pointValue]) => {
        points[archetypeId] = (points[archetypeId] || 0) + pointValue;
      });
    });

    // Find the archetype with the highest score
    const maxPoints = Math.max(...Object.values(points));
    const winningArchetypeId = Object.entries(points)
      .find(([, score]) => score === maxPoints)?.[0] || 'lurker';

    const archetype = getArchetypeById(winningArchetypeId)!;

    return {
      archetype,
      totalPoints: maxPoints,
      breakdown: points
    };
  }, []);

  // Answer a quiz question
  const answerQuestion = useCallback((answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, calculate result
      const result = calculateQuizResult(newAnswers);
      setUserProfile(prev => ({
        address: prev?.address || '',
        archetype: result.archetype.id,
        totalReadings: (prev?.totalReadings || 0) + 1,
        preferredMethod: 'quiz',
        lastReadingDate: new Date().toISOString()
      }));
      
      // Note: generateHoroscope will be called manually after quiz completion
    }
  }, [answers, currentQuestionIndex, calculateQuizResult]);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  // Select archetype manually
  const selectArchetype = useCallback((archetypeId: string) => {
    const archetype = getArchetypeById(archetypeId);
    if (archetype) {
      setUserProfile(prev => ({
        address: prev?.address || '',
        archetype: archetypeId,
        totalReadings: (prev?.totalReadings || 0) + 1,
        preferredMethod: 'manual',
        lastReadingDate: new Date().toISOString()
      }));
    }
  }, []);

  // Generate horoscope for a given archetype
  const generateHoroscope = useCallback((archetypeId: string): HoroscopeReading => {
    const archetype = getArchetypeById(archetypeId);
    if (!archetype) {
      throw new Error('Invalid archetype');
    }

    const today = new Date().toISOString().split('T')[0];
    
    // Horoscope templates per archetype
    const horoscopeTemplates = {
      maximalist: {
        predictions: [
          'Hoy es un día perfecto para stackear más sats. Los shitcoins tiemblan ante tu presencia.',
          'Las ballenas están moviéndose. Tu diamond hands serán recompensadas.',
          'Un nocoiners te preguntará sobre crypto. Es tu momento de orangepillear.'
        ],
        advice: [
          'HODL como si tu vida dependiera de ello.',
          'No te distraigas con altcoins brillantes.',
          'Recuerda: 1 BTC = 1 BTC siempre.'
        ],
        emotions: [
          'Zen absoluto ante la volatilidad',
          'Supremacía naranja corriendo por tus venas',
          'Desconfianza hacia todo lo que no sea BTC'
        ],
        tokens: ['BTC', 'SATS', 'LIGHTNING', 'TBTC']
      },
      airdropHunter: {
        predictions: [
          'Una nueva testnet aparecerá en tu radar. Tus wallets están listas.',
          'Un proyecto misteriosos está hackeando puntos. Investigation time.',
          'Tu portfolio de dust tokens podría convertirse en oro.'
        ],
        advice: [
          'Diversifica tus estrategias, no todas tus wallets.',
          'El early bird catches the airdrop.',
          'Siempre lee los terms & conditions (spoiler: nadie lo hace).'
        ],
        emotions: [
          'FOMO constante hacia nuevas opportunities',
          'Optimismo calculated ante cada nueva quest',
          'Ansiedad por no estar farmando suficiente'
        ],
        tokens: ['ARB', 'OP', 'STRK', 'POINTS']
      },
      defiDj: {
        predictions: [
          'Un nuevo pool aparecerá con APY imposible. Tu sixth sense dice "ape in".',
          'Gas fees están bajos. Es momento de rebalancear tu portfolio.',
          'Una liquidation está cerca, pero no será la tuya (hopefully).'
        ],
        advice: [
          'Diversifica tus farms, no pongas todos los huevos en una pool.',
          'Impermanent loss es temporal, gainz son eternal.',
          'DYOR antes de ape in (pero sabemos que no lo harás).'
        ],
        emotions: [
          'Adrenalina pura ante yields del 1000% APY',
          'Nervous excitement por tu health factor',
          'Zen master de la volatilidad DeFi'
        ],
        tokens: ['CRV', 'UNI', 'AAVE', 'COMP']
      },
      ruggedDreamer: {
        predictions: [
          'Un nuevo proyecto con roadmap increíble capturará tu corazón. Again.',
          'Tus holdings de proyectos muertos podrían tener una segunda vida.',
          'Someone en Twitter está promoting el próximo 100x. Trust your instincts.'
        ],
        advice: [
          'No todo lo que brilla es oro, pero some gold brilla.',
          'DYOR, pero also follow your heart.',
          'Los diamonds hands están hechos de rugpulls survived.'
        ],
        emotions: [
          'Eternal optimism hacia el próximo moonshot',
          'Nostalgia por proyectos que "could have been"',
          'Resilient hope ante cada nuevo opportunity'
        ],
        tokens: ['DOGE', 'SHIB', 'PEPE', 'HOPIUM']
      },
      daoPreacher: {
        predictions: [
          'Una nueva propuesta DAO necesitará tu wisdom vote.',
          'Web2 friends te preguntarán sobre descentralization. Preach time.',
          'Tu voto será el decisive en una propuesta controversial.'
        ],
        advice: [
          'Governance is a marathon, not a sprint.',
          'Read every proposal como si fuera la constitution.',
          'Power to the people, power to the protocols.'
        ],
        emotions: [
          'Democratic enthusiasm hacia cada vote',
          'Idealistic vision del futuro descentralizado',
          'Slight frustration con voter apathy'
        ],
        tokens: ['UNI', 'COMP', 'ENS', 'VOTE']
      },
      nftDegen: {
        predictions: [
          'Una colección nueva está mintando y tu finger está on the trigger.',
          'Tu PFP collection podría tener un surprise floor price pump.',
          'Un creator que sigues está dropping una obra maestra.'
        ],
        advice: [
          'Not every mint es un masterpiece, but every masterpiece started as a mint.',
          'Diversifica tu PFP portfolio como diversificas tu crypto.',
          'Art is subjective, pero floor price is objective.'
        ],
        emotions: [
          'Collector\'s pride por tu curated gallery',
          'FOMO hacia every new drop que trends',
          'Aesthetic appreciation mixed con speculation'
        ],
        tokens: ['ETH', 'BLUR', 'LOOKS', 'RARE']
      },
      chainHopper: {
        predictions: [
          'Una nueva L2 está launching y tu bags están ready.',
          'Bridge season is coming, tus assets quieren travel.',
          'Un ecosystem nuevo está gaining momentum. Early adopter alert.'
        ],
        advice: [
          'Stay curious, stay diversified across chains.',
          'Every chain tiene its own culture. Respect the locals.',
          'Bridge fees son el precio de ser multichain native.'
        ],
        emotions: [
          'Excitement por explorar new territories',
          'Adaptability ante cambios de ecosystem',
          'Slight overwhelm por tantas chains que track'
        ],
        tokens: ['MATIC', 'AVAX', 'FTM', 'ATOM']
      },
      techProphet: {
        predictions: [
          'Una nueva tech breakthrough será announced y tu serás first to understand.',
          'Someone citará tu thread sobre ZK proofs en su research paper.',
          'Un protocol upgrade que predicted se hará realidad.'
        ],
        advice: [
          'Stay ahead of the curve, pero don\'t lose touch con reality.',
          'Complex concepts need simple explanations.',
          'Innovation is great, pero adoption is everything.'
        ],
        emotions: [
          'Intellectual curiosity hacia cutting-edge tech',
          'Visionary confidence en predictions',
          'Slight impatience con mainstream adoption'
        ],
        tokens: ['LINK', 'DOT', 'NEAR', 'FIL']
      },
      builder: {
        predictions: [
          'Tu side project finalmente tendrá sus first real users.',
          'Una idea random que tuviste shower thinking se convertirá en código.',
          'GitHub contributions graph estará extra green hoy.'
        ],
        advice: [
          'Ship early, ship often, iterate always.',
          'Perfect is the enemy of deployed.',
          'Every bug es una opportunity para learn something new.'
        ],
        emotions: [
          'Creative satisfaction por cada deploy successful',
          'Maker\'s pride en projects que scale',
          'Healthy obsession con clean code'
        ],
        tokens: ['ETH', 'SOL', 'BASE', 'GAS']
      },
      governanceNerd: {
        predictions: [
          'Tu detailed analysis de una proposal será featured en governance forum.',
          'A DAO necesitará your expertise para una complex vote.',
          'Tu thread breakdown de tokenomics será viral en governance circles.'
        ],
        advice: [
          'Details matter, pero big picture matters more.',
          'Every vote es una building block para el future.',
          'Governance fatigue es real, pace yourself.'
        ],
        emotions: [
          'Democratic enthusiasm hacia participatory systems',
          'Analytical satisfaction con proposal breakdowns',
          'Civic duty hacia protocol governance'
        ],
        tokens: ['MKR', 'COMP', 'UNI', 'ENS']
      },
      lurker: {
        predictions: [
          'Tu silent observation strategy pagará off con insider knowledge.',
          'Someone preguntará tu opinion y tu insights sorprenderán a todos.',
          'Tu curated Twitter lists te darán alpha antes que a others.'
        ],
        advice: [
          'Observation is a superpower, pero don\'t forget to participate sometimes.',
          'Quality over quantity in everything.',
          'Your silence makes your words más valuable cuando finally speak.'
        ],
        emotions: [
          'Zen observer mode ante market chaos',
          'Strategic patience con investment decisions',
          'Quiet confidence en tu research approach'
        ],
        tokens: ['OBSERVATION', 'PATIENCE', 'WISDOM', 'STEALTH']
      },
      farcasterMaxi: {
        predictions: [
          'Tu cast será featured en trending y tu notifications explotarán.',
          'Una frame nueva que creates será viral across the network.',
          'Purple pill a someone important en crypto Twitter.'
        ],
        advice: [
          'Sufficient decentralization includes social networks.',
          'Cast con intention, build con purpose.',
          'Farcaster es más que social media, es social infrastructure.'
        ],
        emotions: [
          'Native enthusiasm por decentralized social',
          'Community pride en Farcaster growth',
          'Missionary zeal para convert Twitter refugees'
        ],
        tokens: ['DEGEN', 'HAM', 'FARTHER', 'BUILD']
      }
    } as const;

    const templates = horoscopeTemplates[archetypeId as keyof typeof horoscopeTemplates];
    const randomIndex = Math.floor(Math.random() * templates.predictions.length);

    const reading: HoroscopeReading = {
      id: `${archetypeId}-${today}-${Date.now()}`,
      archetype: archetypeId,
      date: today,
      prediction: templates.predictions[randomIndex],
      advice: templates.advice[randomIndex],
      emotion: templates.emotions[randomIndex],
      luckyToken: templates.tokens[Math.floor(Math.random() * templates.tokens.length)]
    };

    setLastReading(reading);
    return reading;
  }, []);

  // Current quiz state
  const currentQuestion = useMemo(() => {
    return QUIZ_QUESTIONS[currentQuestionIndex];
  }, [currentQuestionIndex]);

  const isQuizComplete = useMemo(() => {
    return answers.length === QUIZ_QUESTIONS.length;
  }, [answers.length]);

  const quizProgress = useMemo(() => {
    return (answers.length / QUIZ_QUESTIONS.length) * 100;
  }, [answers.length]);

  return {
    // Quiz state
    currentQuestion,
    currentQuestionIndex,
    answers,
    isQuizComplete,
    quizProgress,
    
    // User state
    userProfile,
    lastReading,
    
    // Actions
    answerQuestion,
    resetQuiz,
    selectArchetype,
    generateHoroscope,
    calculateQuizResult,
    
    // Data
    allArchetypes: Object.values(WEB3_ARCHETYPES),
    totalQuestions: QUIZ_QUESTIONS.length
  };
}