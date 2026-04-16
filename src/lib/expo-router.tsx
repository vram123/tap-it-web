'use client';

/**
 * Minimal Expo Router compatibility for Next.js App Router.
 * Maps route groups like `/(auth)/login` → `/login` (Expo Router hides `(auth)` in URLs).
 */
import { useRouter as useNextRouter, usePathname as useNextPathname, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo } from 'react';

export function normalizeExpoPath(path: string): string {
  const p = path.trim();
  if (!p) return '/';
  return p.replace(/^\/?\(auth\)/, '') || '/';
}

function toHref(href: string | { pathname: string; params?: Record<string, string> }): string {
  if (typeof href === 'string') {
    return normalizeExpoPath(href);
  }
  const path = normalizeExpoPath(href.pathname);
  const params = href.params;
  if (!params || Object.keys(params).length === 0) return path;
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') q.set(k, v);
  }
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}

let routerRef: ReturnType<typeof useNextRouter> | null = null;

/** Mount once under root layout so imperative `router` works (matches Expo singleton usage). */
export function ExpoRouterBridge() {
  const r = useNextRouter();
  useLayoutEffect(() => {
    routerRef = r;
    return () => {
      routerRef = null;
    };
  }, [r]);
  return null;
}

export const router = {
  /** Next.js does not expose stack depth; use a browser heuristic for settings subpages. */
  canGoBack(): boolean {
    if (typeof window === 'undefined') return false;
    return window.history.length > 1;
  },
  push(href: string | { pathname: string; params?: Record<string, string> }) {
    const r = routerRef;
    if (!r) {
      console.warn('[expo-router shim] router.push before bridge ready');
      return;
    }
    r.push(toHref(href));
  },
  replace(href: string | { pathname: string; params?: Record<string, string> }) {
    const r = routerRef;
    if (!r) {
      console.warn('[expo-router shim] router.replace before bridge ready');
      return;
    }
    r.replace(toHref(href));
  },
  back() {
    routerRef?.back();
  },
};

export function useLocalSearchParams<
  T extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>,
>(): T {
  const searchParams = useSearchParams();
  return useMemo(() => {
    const o: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      const prev = o[key];
      if (prev === undefined) {
        o[key] = value;
      } else if (Array.isArray(prev)) {
        prev.push(value);
      } else {
        o[key] = [prev, value];
      }
    });
    return o as T;
  }, [searchParams]);
}

export function useSegments(): string[] {
  const pathname = useNextPathname();
  return useMemo(() => pathname.split('/').filter(Boolean), [pathname]);
}

export { useNextPathname as usePathname };

/** Same behavior as React Navigation’s useFocusEffect for web: runs when callback changes (wrap with useCallback). */
export function useFocusEffect(callback: () => void | (() => void)) {
  useEffect(() => {
    return callback();
  }, [callback]);
}

type RedirectProps = { href: string };

export function Redirect({ href }: RedirectProps) {
  const r = useNextRouter();
  const target = normalizeExpoPath(href);
  useEffect(() => {
    r.replace(target);
  }, [r, target]);
  return null;
}
