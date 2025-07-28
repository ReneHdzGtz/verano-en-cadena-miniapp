import { QuizQuestion } from '../types/punk-horoscope';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cómo describes tu día a día en Web3?',
    options: [
      {
        text: 'Reviso quests, hago misiones, busco puntos',
        points: { airdropHunter: 1 }
      },
      {
        text: 'Estoy en calls de DAOs, votando cosas',
        points: { daoPreacher: 1, governanceNerd: 1 }
      },
      {
        text: 'Sigo chains nuevas, me meto en testnets',
        points: { chainHopper: 1, builder: 1 }
      },
      {
        text: 'Reviso Farcaster, casteo ideas, frames',
        points: { farcasterMaxi: 1 }
      }
    ]
  },
  {
    id: 2,
    question: '¿Cuál es tu relación con NFTs?',
    options: [
      {
        text: 'No tengo, puro BTC',
        points: { maximalist: 1 }
      },
      {
        text: 'Compro por memes o arte',
        points: { nftDegen: 1 }
      },
      {
        text: 'Los uso para acceso a comunidades DAOs',
        points: { daoPreacher: 1 }
      },
      {
        text: 'Me han rugged varias veces',
        points: { ruggedDreamer: 1 }
      }
    ]
  },
  {
    id: 3,
    question: '¿Qué frase podrías decir un lunes por la mañana?',
    options: [
      {
        text: 'GM, aquí el nuevo yield farm.',
        points: { defiDj: 1 }
      },
      {
        text: 'Hoy es día de deploy.',
        points: { builder: 1 }
      },
      {
        text: '¿Quién actualizó el Snapshot?',
        points: { governanceNerd: 1 }
      },
      {
        text: '[solo da like a un cast de otro]',
        points: { lurker: 1 }
      }
    ]
  },
  {
    id: 4,
    question: '¿Cuál es tu fuente de información?',
    options: [
      {
        text: 'Farcaster, todo lo demás es ruido',
        points: { farcasterMaxi: 1 }
      },
      {
        text: 'Whitepapers, papers académicos',
        points: { techProphet: 1 }
      },
      {
        text: 'Threads sobre narrativas nuevas',
        points: { ruggedDreamer: 1, chainHopper: 1 }
      },
      {
        text: 'Podcasts sobre descentralización',
        points: { daoPreacher: 1, maximalist: 1 }
      }
    ]
  },
  {
    id: 5,
    question: '¿Qué prefieres construir?',
    options: [
      {
        text: 'Un bot de Warpcast',
        points: { farcasterMaxi: 1, builder: 1 }
      },
      {
        text: 'Un protocolo DeFi nuevo',
        points: { defiDj: 1, builder: 1 }
      },
      {
        text: 'Un sistema de votación para DAOs',
        points: { governanceNerd: 1 }
      },
      {
        text: 'Una colección de NFTs generativos',
        points: { nftDegen: 1 }
      }
    ]
  }
];