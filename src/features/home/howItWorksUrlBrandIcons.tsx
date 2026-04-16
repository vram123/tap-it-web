'use client';

import React, { useId } from 'react';

export type UrlBrand = 'instagram' | 'linkedin' | 'google' | 'yelp' | 'website' | 'calendly' | 'github';

type Props = {
  brand: UrlBrand;
  className?: string;
};

/** Compact brand marks (inline SVG) for the landing URL stack. */
export function UrlBrandIcon({ brand, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const base = { className, width: 36, height: 36, viewBox: '0 0 24 24', 'aria-hidden': true as const };

  switch (brand) {
    case 'instagram':
      return (
        <svg {...base}>
          <defs>
            <linearGradient id={`ig-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f58529" />
              <stop offset="35%" stopColor="#dd2a7b" />
              <stop offset="65%" stopColor="#8134af" />
              <stop offset="100%" stopColor="#515bd4" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#ig-${uid})`}
            d="M16.6 3H7.4A4.4 4.4 0 003 7.4v9.2A4.4 4.4 0 007.4 21h9.2a4.4 4.4 0 004.4-4.4V7.4A4.4 4.4 0 0016.6 3zm0 1.6a2.8 2.8 0 012.8 2.8v9.2a2.8 2.8 0 01-2.8 2.8H7.4a2.8 2.8 0 01-2.8-2.8V7.4a2.8 2.8 0 012.8-2.8h9.2zM12 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8zm0 1.6a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm5.2-5.1a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...base}>
          <path
            fill="#0A66C2"
            d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 01-2.06-2.06 2.06 2.06 0 114.12 0 2.06 2.06 0 01-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
          />
        </svg>
      );
    case 'google':
      return (
        <svg {...base}>
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      );
    case 'yelp':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="11" fill="#FF1A1A" />
          <path
            fill="#fff"
            d="M7.5 8.4c0-1 1.1-1.5 2.3-1.1l4.4 1.6c1 .35 1 1.75 0 2.15l-1.2.45 1.5 2.55c.3.5-.1 1.1-.7 1l-2.35-.55-.55 2.35c-.15.6-.9.75-1.3.3L8.2 13.2V8.4H7.5z"
          />
        </svg>
      );
    case 'calendly':
      return (
        <svg {...base}>
          <rect width="24" height="24" rx="5" fill="#006BFF" />
          <path
            fill="#fff"
            d="M7 9.5h2v5H7v-5zm4-1h2v6h-2v-6zm4 2h2v4h-2v-4zM6 6.5h12v2H6v-2z"
          />
        </svg>
      );
    case 'github':
      return (
        <svg {...base}>
          <path
            fill="#f0f6fc"
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"
          />
        </svg>
      );
    case 'website':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(129,140,248,0.95)" strokeWidth="1.75" />
          <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="rgba(129,140,248,0.85)" strokeWidth="1.5" />
          <path
            fill="none"
            stroke="rgba(129,140,248,0.85)"
            strokeWidth="1.5"
            d="M2 12h20M12 2c2.5 3.2 2.5 16.8 0 20M12 2c-2.5 3.2-2.5 16.8 0 20"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function brandLabel(brand: UrlBrand): string {
  switch (brand) {
    case 'instagram':
      return 'Instagram';
    case 'linkedin':
      return 'LinkedIn';
    case 'google':
      return 'Google';
    case 'yelp':
      return 'Yelp';
    case 'calendly':
      return 'Calendly';
    case 'github':
      return 'GitHub';
    case 'website':
      return 'Website';
    default:
      return '';
  }
}
