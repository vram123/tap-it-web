import type { Metadata, Viewport } from 'next';

import { ExpoRouterBridge } from '@/lib/expo-router';
import { Providers } from '@/app/providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'TapIt',
  description: 'TapIt — digital NFC business cards',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f12',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="tap-it-body">
        <Providers>
          <ExpoRouterBridge />
          {children}
        </Providers>
      </body>
    </html>
  );
}
