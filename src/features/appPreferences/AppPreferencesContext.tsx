'use client';

import {
  defaultAppPreferences,
  type AppPreferencesState,
} from '@/features/appPreferences/appPreferencesTypes';
import { loadAppPreferences, saveAppPreferences } from '@/features/appPreferences/appPreferencesStorage';
import type { AppLocale } from '@/i18n/appLocales';
import { getSettingsStrings, type SettingsStrings } from '@/i18n/settingsCopy';
import { getUiStrings, type UiStrings } from '@/i18n/ui/getUiStrings';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AppPreferencesContextValue = {
  hydrated: boolean;
  preferences: AppPreferencesState;
  setPreferences: (patch: Partial<AppPreferencesState>) => void;
  /** Settings-area copy for the active locale */
  s: SettingsStrings;
  /** App-wide UI copy (tabs, dashboards, onboarding, etc.) */
  u: UiStrings;
  setLocale: (locale: AppLocale) => void;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [preferences, setPreferencesState] = useState<AppPreferencesState>(() => defaultAppPreferences());

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const loaded = await loadAppPreferences();
      if (!cancelled) {
        setPreferencesState(loaded);
        setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next: AppPreferencesState) => {
    await saveAppPreferences(next);
  }, []);

  const setPreferences = useCallback(
    (patch: Partial<AppPreferencesState>) => {
      setPreferencesState((prev) => {
        const next = { ...prev, ...patch };
        void persist(next);
        return next;
      });
    },
    [persist],
  );

  const setLocale = useCallback(
    (locale: AppLocale) => {
      setPreferences({ locale });
    },
    [setPreferences],
  );

  const s = useMemo(() => getSettingsStrings(preferences.locale), [preferences.locale]);
  const u = useMemo(() => getUiStrings(preferences.locale), [preferences.locale]);

  const value = useMemo<AppPreferencesContextValue>(
    () => ({
      hydrated,
      preferences,
      setPreferences,
      s,
      u,
      setLocale,
    }),
    [hydrated, preferences, setPreferences, s, u, setLocale],
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences(): AppPreferencesContextValue {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  }
  return ctx;
}
