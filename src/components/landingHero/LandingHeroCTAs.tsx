import { PrimaryButton } from '@/components/PrimaryButton';
import { router } from '@/lib/expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type LandingHeroCTAsProps = {
  wide: boolean;
  createLabel: string;
  logInLabel: string;
};

export function LandingHeroCTAs({ wide, createLabel, logInLabel }: LandingHeroCTAsProps) {
  return (
    <View style={[styles.ctaRow, wide && styles.ctaRowWide]}>
      <PrimaryButton
        title={createLabel}
        onPress={() => router.push('/(auth)/register')}
        style={styles.primaryButton}
      />
      <PrimaryButton
        title={logInLabel}
        onPress={() => router.push('/(auth)/login')}
        style={styles.secondaryButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ctaRow: {
    marginTop: 12,
    gap: 12,
    alignItems: 'center',
  },
  ctaRowWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  secondaryButton: {
    backgroundColor: '#1e2a4a',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(148, 163, 184, 0.35)',
  },
});
