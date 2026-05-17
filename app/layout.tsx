import type { Metadata } from 'next';
import { Syne, Instrument_Serif } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Poppit — Le jeu qui fait éclater les soirées',
  description: 'Sessions vidéo en direct. Présente-toi, vote, survive.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
