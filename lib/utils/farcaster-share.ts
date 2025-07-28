import { HoroscopeReading } from '../types/punk-horoscope';
import { getArchetypeById } from '../data/archetypes';

export interface ShareOptions {
  reading: HoroscopeReading;
  userAddress?: string;
}

export function generateFarcasterShareText({ reading }: ShareOptions): string {
  const archetype = getArchetypeById(reading.archetype);
  if (!archetype) return '';

  const today = new Date(reading.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long'
  });

  return `🔮 Mi horóscopo Web3 del ${today}

${archetype.emoji} Soy ${archetype.name}

${reading.prediction}

💡 Consejo: ${reading.advice}

🪙 Token de la suerte: $${reading.luckyToken}

Descubre tu arquetipo Web3 👇`;
}

export function generateFarcasterShareUrl({ reading, userAddress }: ShareOptions): string {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const frameUrl = `${baseUrl}/api/frames/punk-horoscope`;
  
  const shareText = generateFarcasterShareText({ reading, userAddress });
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(frameUrl);

  // Warpcast share URL format
  return `https://warpcast.com/~/compose?text=${encodedText}&embeds[]=${encodedUrl}`;
}

export function generateDirectCastUrl({ reading, userAddress }: ShareOptions): string {
  const shareText = generateFarcasterShareText({ reading, userAddress });
  const encodedText = encodeURIComponent(shareText);
  
  return `https://warpcast.com/~/compose?text=${encodedText}`;
}

export function generateFrameMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  return {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/frames/punk-horoscope/image?view=home`,
    'fc:frame:image:aspect_ratio': '1.91:1',
    'fc:frame:button:1': '🎭 Selección Manual',
    'fc:frame:button:2': '🧪 Test Personalidad',
    'fc:frame:button:3': '🔮 Ver App Completa',
    'fc:frame:button:3:action': 'link',
    'fc:frame:button:3:target': `${baseUrl}/punk-horoscope`,
    'fc:frame:post_url': `${baseUrl}/api/frames/punk-horoscope?action=home`,
    'fc:frame:input:text': 'Tu wallet address...',
    'og:title': 'Punk Horoscope - Horóscopos Web3',
    'og:description': 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto',
    'og:image': `${baseUrl}/api/frames/punk-horoscope/image?view=home`,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Punk Horoscope - Horóscopos Web3',
    'twitter:description': 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto',
    'twitter:image': `${baseUrl}/api/frames/punk-horoscope/image?view=home`,
  };
}