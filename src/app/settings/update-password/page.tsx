'use client';

import { PageContainer } from '@/components/WebMaxWidth';
import { PrimaryButton } from '@/components/PrimaryButton';
import { PasswordField } from '@/components/PasswordField';
import { SettingsSubpageHeader } from '@/components/SettingsSubpageHeader';
import { changeAccountPassword } from '@/features/account/account.api';
import { getAuthErrorMessage } from '@/features/auth/auth.api';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import { router } from '@/lib/expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UpdatePasswordScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useUserProfile();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setError('');
    if (!current.trim()) {
      setError('Enter your current password.');
      return;
    }
    if (next.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (next !== confirm) {
      setError('New password and confirmation do not match.');
      return;
    }
    setLoading(true);
    try {
      await changeAccountPassword(current, next);
      Alert.alert('Password updated', 'Your password has been saved.', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (e) {
      setError(getAuthErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <SettingsSubpageHeader title="Update password" />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 24 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <PageContainer style={styles.pageInner}>
        <Text style={[styles.hint, { color: colors.muted }]}>
          Enter your current password, then choose a new one (at least 8 characters).
        </Text>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        <View style={styles.fields}>
          <PasswordField label="Current password" value={current} onChangeText={setCurrent} />
          <PasswordField label="New password" value={next} onChangeText={setNext} />
          <PasswordField label="Confirm new password" value={confirm} onChangeText={setConfirm} />
        </View>
        <PrimaryButton
          title="Save new password"
          onPress={onSave}
          loading={loading}
          fullWidth
          style={{ backgroundColor: colors.accent }}
        />
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingTop: 16 },
  pageInner: { paddingHorizontal: 20 },
  hint: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  error: { color: '#f87171', marginBottom: 12, fontSize: 14 },
  fields: { marginBottom: 8 },
});
