'use client';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from '@/lib/expo-router';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function ServerErrorScreen() {
  return (
    <Screen>
      <View style={styles.box}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.subtitle}>
          We could not complete your request. Please try again or go back to log in.
        </Text>
      </View>
      <PrimaryButton title="Back to log in" onPress={() => router.replace('/(auth)/login')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.3)',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f87171',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
