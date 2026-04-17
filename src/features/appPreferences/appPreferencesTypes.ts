import type { AppLocale } from '@/i18n/appLocales';

export type AppPreferencesState = {
  notificationsMuted: boolean;
  /** Product analytics / personalization (demo toggle). */
  useDataToImprove: boolean;
  shareCrashReports: boolean;
  allowPersonalizedContent: boolean;
  allowMarketingEmails: boolean;
  reduceMotion: boolean;
  textSizeLevel: 1 | 2 | 3 | 4 | 5;
  locale: AppLocale;
};

export const APP_PREFERENCES_STORAGE_KEY = '@tap_it/app_preferences_v1';

export function defaultAppPreferences(): AppPreferencesState {
  return {
    notificationsMuted: false,
    useDataToImprove: true,
    shareCrashReports: true,
    allowPersonalizedContent: true,
    allowMarketingEmails: false,
    reduceMotion: false,
    textSizeLevel: 3,
    locale: 'en',
  };
}
