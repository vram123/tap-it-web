'use client';

import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';

type Props = {
  visible: boolean;
};

/** Non-web fallback (e.g. native); web uses `LoginLoadingOverlay.web.tsx`. */
export function LoginLoadingOverlay({ visible }: Props) {
  const { u } = useAppPreferences();

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={visible} statusBarTranslucent>
      <View style={styles.back} accessibilityLiveRegion="polite" accessibilityLabel={u.login.loadingOverlay}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.txt}>{u.login.loadingOverlay}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 18, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#a1a1aa',
    textAlign: 'center',
  },
});
