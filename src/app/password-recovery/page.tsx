'use client';

import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from '@/lib/expo-router';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { LinkText } from '@/components/LinkText';
import { ErrorBanner } from '@/components/ErrorBanner';
import { validateRecoverPasswordForm } from '@/features/auth/validators';
import { getAuthErrorMessage, requestPasswordRecoveryQuestions } from '@/features/auth/auth.api';
import { setPasswordRecoveryDraft } from '@/features/auth/passwordRecoveryDraft';

export default function PasswordRecoveryScreen() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const result = validateRecoverPasswordForm(phone, email);
    if (!result.valid) {
      setError(result.message);
      return;
    }
    setLoading(true);
    try {
      const response = await requestPasswordRecoveryQuestions({
        phone: phone.trim(),
        email: email.trim(),
      });
      if ('inSystem' in response && response.inSystem === false) {
        setError('Not in system.');
        return;
      }
      if ('questions' in response && response.questions.length >= 3) {
        setPasswordRecoveryDraft({
          phone: phone.trim(),
          email: email.trim(),
          questions: response.questions,
        });
        router.push('/(auth)/security-questions');
        return;
      }
      setError('Not in system.');
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
          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ErrorBanner message={error} />
          <PrimaryButton title="Enter" onPress={handleSubmit} loading={loading} />
          <LinkText text="Back to log in" onPress={() => router.back()} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
