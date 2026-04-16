'use client';

import { AppPreferencesProvider, useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { UserProfileProvider } from '@/features/profile/UserProfileContext';
import { isRtlLocale } from '@/i18n/appLocales';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

function DocumentLocaleSync() {
  const { preferences } = useAppPreferences();
  useEffect(() => {
    const rtl = isRtlLocale(preferences.locale);
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', preferences.locale);
  }, [preferences.locale]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <UserProfileProvider>
        <AppPreferencesProvider>
          <DocumentLocaleSync />
          {/* DOM node so flex:1 from SafeAreaProvider reaches route screens (providers alone add no layout box). */}
          <View id="tap-it-root" style={styles.appRoot}>
            {children}
          </View>
        </AppPreferencesProvider>
      </UserProfileProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    flexDirection: 'column',
  },
});
