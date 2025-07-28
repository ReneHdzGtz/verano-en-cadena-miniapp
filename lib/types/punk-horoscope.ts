// Types for the Punk Horoscope Web3 app
export interface Web3Archetype {
  id: string;
  name: string;
  emoji: string;
  personality: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  traits: string[];
}

export interface HoroscopeReading {
  id: string;
  archetype: string;
  date: string;
  prediction: string;
  advice: string;
  emotion: string;
  luckyToken: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: Record<string, number>; // archetype_id -> points
  }[];
}

export interface QuizResult {
  archetype: Web3Archetype;
  totalPoints: number;
  breakdown: Record<string, number>;
}

export interface UserProfile {
  address: string;
  archetype: string;
  lastReadingDate?: string;
  totalReadings: number;
  preferredMethod: 'manual' | 'quiz' | 'auto';
}