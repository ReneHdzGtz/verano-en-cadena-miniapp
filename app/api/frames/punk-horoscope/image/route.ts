import { NextRequest, NextResponse } from 'next/server';
import { getArchetypeById } from '@/lib/data/archetypes';

export const runtime = 'edge';

function generateRandomHoroscope(archetypeId: string) {
  const templates: Record<string, { predictions: string[], advice: string[], tokens: string[] }> = {
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
      tokens: ['BTC', 'SATS', 'LIGHTNING', 'TBTC']
    },
    airdropHunter: {
      predictions: [
        'Una nueva testnet aparecerá en tu radar. Tus wallets están listas.',
        'Un proyecto misterioso está hackeando puntos. Investigation time.',
        'Tu portfolio de dust tokens podría convertirse en oro.'
      ],
      advice: [
        'Diversifica tus estrategias, no todas tus wallets.',
        'El early bird catches the airdrop.',
        'Siempre lee los terms & conditions (spoiler: nadie lo hace).'
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
      tokens: ['CRV', 'UNI', 'AAVE', 'COMP']
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
      tokens: ['DEGEN', 'HAM', 'FARTHER', 'BUILD']
    }
  };

  const template = templates[archetypeId as keyof typeof templates] || templates.farcasterMaxi;
  const randomIndex = Math.floor(Math.random() * template.predictions.length);

  return {
    prediction: template.predictions[randomIndex],
    advice: template.advice[randomIndex],
    token: template.tokens[Math.floor(Math.random() * template.tokens.length)]
  };
}

function createSVGImage(content: {
  title: string;
  emoji: string;
  subtitle?: string;
  description?: string;
  primaryColor?: string;
  backgroundColor?: string;
}) {
  const { title, emoji, subtitle, description, primaryColor = '#6366f1', backgroundColor = '#0a0a0a' } = content;
  
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${primaryColor}20;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${backgroundColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Emoji -->
  <text x="600" y="200" text-anchor="middle" style="font-size: 120px; font-family: system-ui;">${emoji}</text>
  
  <!-- Title -->
  <text x="600" y="280" text-anchor="middle" style="font-size: 48px; font-weight: bold; fill: white; font-family: system-ui;">${title}</text>
  
  ${subtitle ? `<text x="600" y="320" text-anchor="middle" style="font-size: 24px; fill: #8b8b8b; font-family: system-ui;">${subtitle}</text>` : ''}
  
  ${description ? `
    <text x="600" y="380" text-anchor="middle" style="font-size: 18px; fill: #e5e5e5; font-family: system-ui;">
      <tspan x="600" dy="0">${description.substring(0, 80)}</tspan>
      ${description.length > 80 ? `<tspan x="600" dy="25">${description.substring(80, 160)}</tspan>` : ''}
    </text>
  ` : ''}
  
  <!-- Footer -->
  <text x="600" y="580" text-anchor="middle" style="font-size: 16px; fill: #6b7280; font-family: system-ui;">Punk Horoscope • Built on Base</text>
</svg>`;

  return svg;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view') || 'home';
    const archetypeId = searchParams.get('archetype');
    const id = searchParams.get('id');

    let svgContent: string;

    // Home view
    if (view === 'home') {
      svgContent = createSVGImage({
        title: 'Punk Horoscope',
        emoji: '🔮',
        subtitle: 'Horóscopos Web3 para arquetipos crypto',
        description: 'Descubre tu arquetipo y obtén predicciones personalizadas',
        primaryColor: '#6366f1'
      });
    }
    // Archetype view
    else if (view === 'archetype' && (id || archetypeId)) {
      const archetype = getArchetypeById(id || archetypeId!);
      if (!archetype) {
        return new NextResponse('Archetype not found', { status: 404 });
      }

      svgContent = createSVGImage({
        title: archetype.name,
        emoji: archetype.emoji,
        description: archetype.personality,
        primaryColor: archetype.colors.primary,
        backgroundColor: archetype.colors.background
      });
    }
    // Quiz view
    else if (view === 'quiz') {
      svgContent = createSVGImage({
        title: 'Test de Personalidad Web3',
        emoji: '🧪',
        subtitle: 'El quiz completo está disponible en la app',
        description: 'Usa "App Completa" para hacer el test de 5 preguntas',
        primaryColor: '#6366f1'
      });
    }
    // Horoscope view
    else if (view === 'horoscope' && archetypeId) {
      const archetype = getArchetypeById(archetypeId);
      if (!archetype) {
        return new NextResponse('Archetype not found', { status: 404 });
      }

      const horoscope = generateRandomHoroscope(archetypeId);
      const today = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      svgContent = createSVGImage({
        title: `${archetype.name} - ${today}`,
        emoji: archetype.emoji,
        description: horoscope.prediction.substring(0, 120) + '...',
        primaryColor: archetype.colors.primary,
        backgroundColor: archetype.colors.background
      });
    }
    // Default fallback
    else {
      return new NextResponse('Invalid view', { status: 400 });
    }

    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // 5 minutes cache
      },
    });

  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log(`Error generating image: ${errorMessage}`);
    return new NextResponse(`Failed to generate image: ${errorMessage}`, {
      status: 500,
    });
  }
}