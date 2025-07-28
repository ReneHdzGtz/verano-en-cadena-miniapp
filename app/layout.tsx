import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import './theme.css';

export const metadata: Metadata = {
  title: 'Punk Horoscope - Horóscopos Web3',
  description: 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto. 12 arquetipos únicos para la era digital.',
  keywords: ['Web3', 'horoscope', 'crypto', 'blockchain', 'Farcaster', 'archetypes', 'DeFi', 'NFT'],
  authors: [{ name: 'Frutero Club' }],
  creator: 'Frutero Club',
  
  // Open Graph
  openGraph: {
    title: 'Punk Horoscope - Horóscopos Web3',
    description: 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto',
    siteName: 'Punk Horoscope',
    locale: 'es_ES',
    type: 'website',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Punk Horoscope - Horóscopos Web3',
    description: 'Descubre tu arquetipo Web3 y obtén horóscopos personalizados para el ecosistema crypto',
    creator: '@fruteroclub',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[var(--app-background)] text-[var(--app-foreground)]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}