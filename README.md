# tap-it-web

Next.js web app for **TapIt**. It mirrors the **folder layout and API usage** of `tap-it-client` (Expo) while using **web-specific UI** (HTML/CSS, no React Native primitives).

- **Backend:** unchanged — talks to the same FastAPI server as the mobile app (`NEXT_PUBLIC_API_BASE_URL`).
- **Shared structure:** `src/features/*`, `src/constants/*`, `src/i18n/*`, `src/config/api.ts` align with the Expo project’s integration pattern.

## Setup

```bash
cd tap-it-web
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_BASE_URL to your API, e.g. http://127.0.0.1:8000
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Route map (vs Expo `src/app`)

| Web path | Expo file (approx.) |
|----------|----------------------|
| `/` | `index.tsx` |
| `/login`, `/register`, `/security-questions-setup`, … | `(auth)/*` |
| `/home`, `/profile`, `/settings`, … | same names under `src/app` |

The **main shell** (nav) is applied in `src/app/(main)/layout.tsx` via `WebShell`, similar to how the Expo stack lists main screens in `_layout.tsx`.

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build  
- `npm run start` — serve production build  
