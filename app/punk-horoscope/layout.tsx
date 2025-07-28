import type { Metadata } from 'next';
import { generateFrameMetadata } from '@/lib/utils/farcaster-share';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const frameMetadata = generateFrameMetadata();

  return {
    title: 'Punk Horoscope - Horóscopos Web3',
    description: 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto. 12 arquetipos únicos para la era digital.',
    keywords: ['Web3', 'horoscope', 'crypto', 'blockchain', 'Farcaster', 'archetypes', 'DeFi', 'NFT'],
    authors: [{ name: 'Frutero Club' }],
    creator: 'Frutero Club',
    publisher: 'kiwik',
    
    // Open Graph
    openGraph: {
      title: 'Punk Horoscope - Horóscopos Web3',
      description: 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto',
      url: `${baseUrl}/punk-horoscope`,
      siteName: 'Punk Horoscope',
      images: [
        {
          url: frameMetadata['og:image'] as string,
          width: 1200,
          height: 630,
          alt: 'Punk Horoscope - Horóscopos Web3',
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: 'Punk Horoscope - Horóscopos Web3',
      description: 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto',
      images: [frameMetadata['twitter:image'] as string],
      creator: '@fruteroclub',
    },

    // Farcaster Frame metadata
    other: frameMetadata,

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function PunkHoroscopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}