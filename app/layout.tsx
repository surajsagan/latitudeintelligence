import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap'
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});
export const metadata: Metadata = {
  title: 'Latitude Intelligence — Planning, Powered by Research-Grade Intelligence',
  description:
    'Research intelligence, academic mentorship, GIS & spatial analytics, scientific writing, and research training. Founded by Suraj Sagan (Ph.D.).',
  metadataBase: new URL('https://latitudeintelligence.in'),
  openGraph: {
    title: 'Latitude Intelligence',
    description:
      'Where spatial intelligence meets scientific eloquence. Bridging raw data and global impact through GeoAI, mentorship, and precise articulation.',
    type: 'website'
  },
  icons: {
    icon: '/assets/latitude-mark.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
