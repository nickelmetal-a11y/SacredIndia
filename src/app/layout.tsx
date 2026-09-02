import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

const noto = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500'],
  variable: '--font-devanagari',
});

export const metadata: Metadata = {
  title: 'Sacred India — Every Faith. Every Site. Every Step.',
  description:
    "India's first multi-faith pilgrimage app. Remote puja video on WhatsApp. 85+ sacred sites. 7 religions. Panchang timing. Transport to every site. Book pandits, khadims, guides.",
  keywords:
    'remote puja online, kashi rudrabhishek online, tirupati abhishekam online, sacred india app, pilgrimage app india, NRI puja booking, pandit booking online, dargah chadar offering, golden temple ardas',
  viewport: 'width=device-width, initial-scale=1',
  authors: [{ name: 'Sacred India', url: 'https://sacredindia.app' }],
  creator: 'Sacred India',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://sacredindia.app',
    title: 'Sacred India — Every Faith. Every Site. Every Step.',
    description:
      'Book Remote Puja from anywhere. Video delivered on WhatsApp. 85+ sacred sites. 7 faiths. Pandits, guides, prasad — all verified.',
    images: [
      {
        url: 'https://sacredindia.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sacred India App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sacred India — Multi-Faith Pilgrimage App',
    description: 'Book Remote Puja. Get video on WhatsApp in 2 hours. 85+ sacred sites across 7 faiths.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${noto.variable} scroll-smooth`}
    >
      <head>
        {mapsApiKey && (
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}`}
            async
            defer
          />
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
