/**
 * Central API base URL for the TapIt Python backend (same contract as tap-it-client).
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_API_BASE_URL (`.env.local`)
 * 2. Fallback: production deploy on Render (matches client default)
 *
 * After changing `.env.local`, restart: `npm run dev`
 */
const DEFAULT_API_BASE = 'https://tap-it-server.onrender.com';

let didLogBaseUrl = false;

function fromProcessEnv(): string | undefined {
  const v = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return v && v.length > 0 ? v.replace(/\/$/, '') : undefined;
}

export function getApiBaseUrl(): string {
  const base = fromProcessEnv() || DEFAULT_API_BASE;

  if (process.env.NODE_ENV === 'development' && !didLogBaseUrl) {
    didLogBaseUrl = true;
    // eslint-disable-next-line no-console
    console.log(
      '[TapIt Web] API base URL:',
      base,
      fromProcessEnv() ? '(from NEXT_PUBLIC_API_BASE_URL)' : '(default)'
    );
  }
  return base;
}

/** Build a full URL for a path starting with `/api/...`. */
export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
