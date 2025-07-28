import { Web3Archetype } from '../types/punk-horoscope';

export const WEB3_ARCHETYPES: Record<string, Web3Archetype> = {
  maximalist: {
    id: 'maximalist',
    name: 'The Maximalist',
    emoji: '₿',
    personality: 'Cree que todo lo no-BTC es scam. Hardcore.',
    colors: {
      primary: '#F7931A',
      secondary: '#FFD700', 
      background: '#1A1A1A'
    },
    traits: ['Purista', 'Inflexible', 'Visionario', 'Crítico']
  },
  airdropHunter: {
    id: 'airdropHunter',
    name: 'The Airdrop Hunter',
    emoji: '💸',
    personality: 'Vive por misiones, quests y recompensas.',
    colors: {
      primary: '#00D2FF',
      secondary: '#3A7BD5',
      background: '#0F1419'
    },
    traits: ['Oportunista', 'Estratégico', 'Paciente', 'Calculador']
  },
  defiDj: {
    id: 'defiDj',
    name: 'The DeFi DJ',
    emoji: '🌽',
    personality: 'Ama yield, pools ilíquidas y riesgos DeFi.',
    colors: {
      primary: '#FFEB3B',
      secondary: '#FF9800',
      background: '#1B1B1B'
    },
    traits: ['Arriesgado', 'Analítico', 'Optimizador', 'Innovador']
  },
  ruggedDreamer: {
    id: 'ruggedDreamer',
    name: 'The Rugged Dreamer',
    emoji: '🪤',
    personality: 'Se ilusiona con proyectos que siempre ruggean.',
    colors: {
      primary: '#E91E63',
      secondary: '#FF5722',
      background: '#1A1A1A'
    },
    traits: ['Optimista', 'Resiliente', 'Soñador', 'Vulnerable']
  },
  daoPreacher: {
    id: 'daoPreacher',
    name: 'The DAO Preacher',
    emoji: '🏛️',
    personality: 'Cree en la descentralización total.',
    colors: {
      primary: '#9C27B0',
      secondary: '#673AB7',
      background: '#0D1117'
    },
    traits: ['Idealista', 'Democrático', 'Visionario', 'Activista']
  },
  nftDegen: {
    id: 'nftDegen',
    name: 'The NFT Degen',
    emoji: '🖼️',
    personality: 'Compra PFPs por instinto, colecciona sin freno.',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      background: '#1A1A1A'
    },
    traits: ['Coleccionista', 'Impulsivo', 'Estético', 'Especulativo']
  },
  chainHopper: {
    id: 'chainHopper',
    name: 'The Chain Hopper',
    emoji: '🔁',
    personality: 'Cada semana tiene una nueva chain favorita.',
    colors: {
      primary: '#00BCD4',
      secondary: '#009688',
      background: '#0F1419'
    },
    traits: ['Adaptable', 'Curioso', 'Explorador', 'Inquieto']
  },
  techProphet: {
    id: 'techProphet',
    name: 'The Tech Prophet',
    emoji: '🧬',
    personality: 'Predica sobre tech que no siempre entiende.',
    colors: {
      primary: '#3F51B5',
      secondary: '#2196F3',
      background: '#0D1117'
    },
    traits: ['Visionario', 'Evangelizador', 'Teórico', 'Comunicador']
  },
  builder: {
    id: 'builder',
    name: 'The Builder',
    emoji: '🔧',
    personality: 'Tiene side projects, deployea cosas por diversión.',
    colors: {
      primary: '#4CAF50',
      secondary: '#8BC34A',
      background: '#1A1A1A'
    },
    traits: ['Creativo', 'Práctico', 'Productivo', 'Experimentador']
  },
  governanceNerd: {
    id: 'governanceNerd',
    name: 'The Governance Nerd',
    emoji: '📜',
    personality: 'Ama votar, proponer y escribir RFCs.',
    colors: {
      primary: '#795548',
      secondary: '#FF9800',
      background: '#0D1117'
    },
    traits: ['Detallista', 'Meticuloso', 'Participativo', 'Organizador']
  },
  lurker: {
    id: 'lurker',
    name: 'The Lurker',
    emoji: '👁️',
    personality: 'Solo observa, nunca participa activamente.',
    colors: {
      primary: '#607D8B',
      secondary: '#9E9E9E',
      background: '#1A1A1A'
    },
    traits: ['Observador', 'Cauteloso', 'Analítico', 'Reservado']
  },
  farcasterMaxi: {
    id: 'farcasterMaxi',
    name: 'The Farcaster Maxi',
    emoji: '📡',
    personality: 'Todo lo vive desde Warpcast. El verdadero nativo Farcaster.',
    colors: {
      primary: '#8A63D2',
      secondary: '#6A4C93',
      background: '#0F0F23'
    },
    traits: ['Nativo', 'Social', 'Early Adopter', 'Comunicativo']
  }
};

export const getArchetypeById = (id: string): Web3Archetype | undefined => {
  return WEB3_ARCHETYPES[id];
};

export const getAllArchetypes = (): Web3Archetype[] => {
  return Object.values(WEB3_ARCHETYPES);
};