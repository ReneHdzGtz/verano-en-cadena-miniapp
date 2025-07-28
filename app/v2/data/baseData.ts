export interface BaseArchetype {
  name: string;
  emoji: string;
  trait: string;
  color: string;
  description: string;
}

export interface UserProfile {
  username: string;
  bio: string;
  archetype: string;
  createdAt: Date;
  stats: {
    baseScore: number;
    transactions: number;
    daysActive: number;
    protocols: number;
  };
  testResults?: Record<string, number>;
}

export interface Question {
  question: string;
  answers: Array<{
    text: string;
    points: Record<string, number>;
  }>;
}

export const baseArchetypes: Record<string, BaseArchetype> = {
  'base_builder': { 
    name: 'Base Builder', 
    emoji: '🔧', 
    trait: 'Deploy daily',
    color: '#0052ff',
    description: 'Construye dApps nativas en Base con frecuencia obsesiva'
  },
  'onchain_summer': { 
    name: 'Onchain Summer Veteran', 
    emoji: '🌊', 
    trait: 'Summer vibes',
    color: '#00d4ff',
    description: 'Vivió el Onchain Summer desde el día uno'
  },
  'base_degen': { 
    name: 'Base Degen', 
    emoji: '💎', 
    trait: 'Apes everything',
    color: '#ff6b35',
    description: 'Primera en cada token, NFT y protocolo que sale en Base'
  },
  'l2_maximalist': { 
    name: 'L2 Maximalist', 
    emoji: '⚡', 
    trait: 'Scaling obsessed',
    color: '#2ed573',
    description: 'Predica las virtudes de Layer 2 y las low fees'
  },
  'coinbase_loyalist': { 
    name: 'Coinbase Loyalist', 
    emoji: '🔵', 
    trait: 'Team blue',
    color: '#0052ff',
    description: 'Confía ciegamente en todo lo que viene de Coinbase'
  },
  'base_artist': { 
    name: 'Base Artist', 
    emoji: '🎨', 
    trait: 'Creative soul',
    color: '#8a2be2',
    description: 'Crea arte y cultura nativa en Base Network'
  },
  'bridge_master': { 
    name: 'Bridge Master', 
    emoji: '🌉', 
    trait: 'Cross-chain guru',
    color: '#ffa502',
    description: 'Navega entre L1 y L2 como pez en el agua'
  },
  'base_whale': { 
    name: 'Base Whale', 
    emoji: '🐋', 
    trait: 'Deep pockets',
    color: '#1e90ff',
    description: 'Mueve cantidades que hacen temblar el TVL de Base'
  },
  'ecosystem_scout': { 
    name: 'Ecosystem Scout', 
    emoji: '🔍', 
    trait: 'Early adopter',
    color: '#ff4757',
    description: 'Descubre y testea cada nuevo protocolo en Base'
  },
  'social_aper': { 
    name: 'Social Aper', 
    emoji: '📱', 
    trait: 'Social native',
    color: '#3742fa',
    description: 'Ama las apps sociales descentralizadas en Base'
  },
  'yield_farmer': { 
    name: 'Base Yield Farmer', 
    emoji: '🚜', 
    trait: 'APY hunter',
    color: '#2ed573',
    description: 'Rota entre protocolos DeFi buscando el mejor yield'
  },
  'base_philosopher': { 
    name: 'Base Philosopher', 
    emoji: '🧠', 
    trait: 'Deep thinker',
    color: '#747d8c',
    description: 'Reflexiona sobre las implicaciones de Base para el futuro'
  }
};

export const advancedQuestions: Question[] = [
  {
    question: "¿Cuál fue tu primera interacción con Base Network?",
    answers: [
      { text: "Hice bridge desde día uno", points: { l2_maximalist: 2, bridge_master: 1 } },
      { text: "Seguí el Onchain Summer", points: { onchain_summer: 2, base_artist: 1 } },
      { text: "Deploy mi primer contrato", points: { base_builder: 2, ecosystem_scout: 1 } },
      { text: "Compré tokens en Base", points: { base_degen: 2, base_whale: 1 } }
    ]
  },
  {
    question: "¿Qué te emociona más de Base?",
    answers: [
      { text: "Las low fees para experimentar", points: { base_builder: 1, base_degen: 1 } },
      { text: "El backing de Coinbase", points: { coinbase_loyalist: 2, l2_maximalist: 1 } },
      { text: "La cultura y comunidad", points: { onchain_summer: 1, social_aper: 2 } },
      { text: "Las oportunidades de yield", points: { yield_farmer: 2, base_whale: 1 } }
    ]
  },
  {
    question: "¿Cómo describes tu estrategia en Base?",
    answers: [
      { text: "HODL y stake todo", points: { coinbase_loyalist: 2, l2_maximalist: 1 } },
      { text: "Trade activo y farming", points: { base_degen: 2, yield_farmer: 1 } },
      { text: "Build y experimenta", points: { base_builder: 2, ecosystem_scout: 1 } },
      { text: "Colecciona arte y cultura", points: { base_artist: 2, onchain_summer: 1 } }
    ]
  },
  {
    question: "¿Cuál es tu dApp favorita en Base?",
    answers: [
      { text: "Aerodrome Finance", points: { yield_farmer: 2, base_degen: 1 } },
      { text: "Friend.tech", points: { social_aper: 2, base_degen: 1 } },
      { text: "Uniswap", points: { bridge_master: 1, l2_maximalist: 1 } },
      { text: "Zora", points: { base_artist: 2, onchain_summer: 1 } }
    ]
  },
  {
    question: "¿Qué haces cuando encuentras un nuevo protocolo en Base?",
    answers: [
      { text: "Lo testeo inmediatamente", points: { ecosystem_scout: 2, base_degen: 1 } },
      { text: "Investigo a fondo primero", points: { base_philosopher: 2, coinbase_loyalist: 1 } },
      { text: "Espero a que otros lo prueben", points: { coinbase_loyalist: 1, l2_maximalist: 1 } },
      { text: "Busco oportunidades de yield", points: { yield_farmer: 2, base_whale: 1 } }
    ]
  },
  {
    question: "¿Cómo interactúas con la comunidad Base?",
    answers: [
      { text: "Comparto mis builds y proyectos", points: { base_builder: 2, base_artist: 1 } },
      { text: "Participo activamente en redes sociales", points: { social_aper: 2, onchain_summer: 1 } },
      { text: "Ayudo a nuevos usuarios", points: { l2_maximalist: 1, bridge_master: 2 } },
      { text: "Principalmente observo y aprendo", points: { base_philosopher: 2, ecosystem_scout: 1 } }
    ]
  },
  {
    question: "¿Qué opinas sobre el futuro de Base?",
    answers: [
      { text: "Será el L2 dominante", points: { l2_maximalist: 2, coinbase_loyalist: 1 } },
      { text: "Revolucionará las apps sociales", points: { social_aper: 2, onchain_summer: 1 } },
      { text: "Atraerá más builders", points: { base_builder: 2, ecosystem_scout: 1 } },
      { text: "Creará nuevos mercados de arte", points: { base_artist: 2, base_degen: 1 } }
    ]
  },
  {
    question: "¿Cómo manejas las gas fees en Base?",
    answers: [
      { text: "Las amo, son súper bajas", points: { l2_maximalist: 2, base_builder: 1 } },
      { text: "Me permiten experimentar más", points: { ecosystem_scout: 2, base_degen: 1 } },
      { text: "Optimizo cada transacción", points: { yield_farmer: 1, base_philosopher: 2 } },
      { text: "Hago más transacciones frecuentes", points: { social_aper: 1, bridge_master: 2 } }
    ]
  },
  {
    question: "¿Qué tipo de contenido sigues sobre Base?",
    answers: [
      { text: "Tutoriales de desarrollo", points: { base_builder: 2, ecosystem_scout: 1 } },
      { text: "Análisis de protocolos", points: { yield_farmer: 2, base_philosopher: 1 } },
      { text: "Arte y cultura onchain", points: { base_artist: 2, onchain_summer: 1 } },
      { text: "Noticias de Coinbase", points: { coinbase_loyalist: 2, l2_maximalist: 1 } }
    ]
  },
  {
    question: "¿Cuál es tu meta principal en Base?",
    answers: [
      { text: "Construir la próxima killer app", points: { base_builder: 2, ecosystem_scout: 1 } },
      { text: "Maximizar mis returns", points: { yield_farmer: 2, base_whale: 1 } },
      { text: "Crear arte memorable", points: { base_artist: 2, onchain_summer: 1 } },
      { text: "Educar sobre Layer 2", points: { l2_maximalist: 2, bridge_master: 1 } }
    ]
  }
];

export const horoscopePredictions: Record<string, { prediction: string; advice: string; token: string }> = {
  base_builder: {
    prediction: "Los contratos que despliegues esta semana tendrán un impacto duradero en Base.",
    advice: "Enfócate en la seguridad antes que en la velocidad de desarrollo.",
    token: "BUILD"
  },
  onchain_summer: {
    prediction: "Tu creatividad on-chain atraerá nuevas colaboraciones inesperadas.",
    advice: "Comparte tu proceso creativo para inspirar a otros builders.",
    token: "SUMMER"
  },
  base_degen: {
    prediction: "Una oportunidad de yield farming aparecerá en las próximas 48 horas.",
    advice: "No apes todo en el primer protocolo. DYOR siempre.",
    token: "DEGEN"
  },
  l2_maximalist: {
    prediction: "Base alcanzará un nuevo ATH en TVL y tu participación será clave.",
    advice: "Educa a otros sobre las ventajas de Layer 2.",
    token: "L2"
  },
  coinbase_loyalist: {
    prediction: "Coinbase anunciará una nueva feature que amplificará tu estrategia.",
    advice: "Mantén tu lealtad pero diversifica tus holdings.",
    token: "CB"
  },
  base_artist: {
    prediction: "Tu próxima creación resonará profundamente con la comunidad Base.",
    advice: "Experimenta con nuevos formatos de arte digital.",
    token: "ART"
  },
  bridge_master: {
    prediction: "Una nueva oportunidad de arbitraje aparecerá entre chains.",
    advice: "Mantén liquidez disponible en múltiples redes.",
    token: "BRIDGE"
  },
  base_whale: {
    prediction: "Tus movimientos influenciarán significativamente el mercado Base.",
    advice: "Con gran poder viene gran responsabilidad. Muévete con sabiduría.",
    token: "WHALE"
  },
  ecosystem_scout: {
    prediction: "Descubrirás el próximo protocolo unicornio antes que nadie.",
    advice: "Confía en tu instinto pero mantén diversificación.",
    token: "SCOUT"
  },
  social_aper: {
    prediction: "Una nueva app social en Base cambiará como interactúas online.",
    advice: "Sé early adopter pero protege tu privacidad.",
    token: "SOCIAL"
  },
  yield_farmer: {
    prediction: "Un pool de liquidez ofrecerá rendimientos inesperadamente altos.",
    advice: "Balancea riesgo y recompensa. No todo lo que brilla es oro.",
    token: "YIELD"
  },
  base_philosopher: {
    prediction: "Tu perspectiva sobre Base inspirará cambios fundamentales.",
    advice: "Documenta tus pensamientos. Las ideas mueven el mundo.",
    token: "THINK"
  }
};

export function generateRandomStats() {
  return {
    baseScore: Math.floor(Math.random() * 100) + 1,
    transactions: Math.floor(Math.random() * 1000) + 10,
    daysActive: Math.floor(Math.random() * 365) + 1,
    protocols: Math.floor(Math.random() * 20) + 1
  };
}