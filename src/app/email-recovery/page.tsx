'use client';

import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from '@/lib/expo-router';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { LinkText } from '@/components/LinkText';
import { ErrorBanner } from '@/components/ErrorBanner';
import { validateRecoverEmailForm } from '@/features/auth/validators';
import { getAuthErrorMessage, recoverEmail } from '@/features/auth/auth.api';

export default function EmailRecoveryScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const result = validateRecoverEmailForm(phone);
    if (!result.valid) {
      setError(result.message);
      return;
    }
    setLoading(true);
    try {
      const response = await recoverEmail({ phone: phone.trim() });
      if ('inSystem' in response && response.inSystem === false) {
        setError('Not in system.');
        return;
      }
      if ('email' in response) {
        router.replace({
          pathname: '/(auth)/email-recovery-result',
          params: { email: response.email },
        });
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TextField
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="(555) 000-0000"
            keyboardType="phone-pad"
          />
          <ErrorBanner message={error} />
          <PrimaryButton title="Enter" onPress={handleSubmit} loading={loading} />
          <LinkText text="Back to log in" onPress={() => router.back()} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
