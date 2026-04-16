'use client';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from '@/lib/expo-router';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function EmailRecoveryResultScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  return (
    <Screen>
      <Text style={styles.label}>Your account email is:</Text>
      <View style={styles.emailBox}>
        <Text style={styles.emailText}>{email || 'user@example.com'}</Text>
      </View>
      <PrimaryButton title="Back to log in" onPress={() => router.replace('/(auth)/login')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  emailBox: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  emailText: {
    fontSize: 16,
    color: '#e4e4e7',
  },
});
