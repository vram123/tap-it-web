import {
  APP_PREFERENCES_STORAGE_KEY,
  defaultAppPreferences,
  type AppPreferencesState,
} from '@/features/appPreferences/appPreferencesTypes';
import { isAppLocale, type AppLocale } from '@/i18n/appLocales';

function mergeStored(parsed: unknown): AppPreferencesState {
  const base = defaultAppPreferences();
  if (!parsed || typeof parsed !== 'object') return base;
  const o = parsed as Record<string, unknown>;
  const textSizeLevel =
    typeof o.textSizeLevel === 'number' && o.textSizeLevel >= 1 && o.textSizeLevel <= 5
      ? (o.textSizeLevel as AppPreferencesState['textSizeLevel'])
      : typeof o.largerText === 'boolean'
        ? o.largerText
          ? 4
          : 3
        : base.textSizeLevel;
  return {
    ...base,
    notificationsMuted: typeof o.notificationsMuted === 'boolean' ? o.notificationsMuted : base.notificationsMuted,
    useDataToImprove: typeof o.useDataToImprove === 'boolean' ? o.useDataToImprove : base.useDataToImprove,
    shareCrashReports: typeof o.shareCrashReports === 'boolean' ? o.shareCrashReports : base.shareCrashReports,
    allowPersonalizedContent:
      typeof o.allowPersonalizedContent === 'boolean'
        ? o.allowPersonalizedContent
        : base.allowPersonalizedContent,
    allowMarketingEmails: typeof o.allowMarketingEmails === 'boolean' ? o.allowMarketingEmails : base.allowMarketingEmails,
    reduceMotion: typeof o.reduceMotion === 'boolean' ? o.reduceMotion : base.reduceMotion,
    textSizeLevel,
    locale: typeof o.locale === 'string' && isAppLocale(o.locale) ? o.locale : base.locale,
  };
}

export async function loadAppPreferences(): Promise<AppPreferencesState> {
  if (typeof window === 'undefined') return defaultAppPreferences();
  try {
    const raw = localStorage.getItem(APP_PREFERENCES_STORAGE_KEY);
    if (!raw) return defaultAppPreferences();
    return mergeStored(JSON.parse(raw));
  } catch {
    return defaultAppPreferences();
  }
}

export async function saveAppPreferences(state: AppPreferencesState): Promise<void> {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APP_PREFERENCES_STORAGE_KEY, JSON.stringify(state));
}

export type { AppLocale };
