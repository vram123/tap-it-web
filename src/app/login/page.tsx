'use client';

import { ErrorBanner } from '@/components/ErrorBanner';
import { LoginLoadingOverlay } from '@/components/LoginLoadingOverlay';
import { LinkText } from '@/components/LinkText';
import { PasswordField } from '@/components/PasswordField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { getAdminCredentials, validateAdminLogin } from '@/features/admin/adminCredentials';
import { setAdminSession } from '@/features/admin/adminSession';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { getAuthErrorMessage, login } from '@/features/auth/auth.api';
import { validateLoginForm } from '@/features/auth/validators';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import { router } from '@/lib/expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LoginScreen() {
  const { u } = useAppPreferences();
  const { refreshFromServer, applyAuthUser } = useUserProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    const result = validateLoginForm(email, password);
    if (!result.valid) {
      setError(result.message);
      return;
    }
    setLoading(true);
    try {
      if (getAdminCredentials() && validateAdminLogin(email, password)) {
        await setAdminSession();
        router.replace('/admin');
        return;
      }
      const response = await login({ email: email.trim(), password });
      applyAuthUser(response.user);
      void refreshFromServer();
      const displayName = response.user.display_name?.trim() || response.user.email;
      router.replace({
        pathname: '/home',
        params: { displayName },
      });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <LoginLoadingOverlay visible={loading} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{u.login.title}</Text>
          <ErrorBanner message={error} />
          <TextField
            label={u.login.email}
            value={email}
            onChangeText={setEmail}
            placeholder={u.login.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <PasswordField
            label={u.login.password}
            value={password}
            onChangeText={setPassword}
            placeholder={u.login.passwordPlaceholder}
            autoComplete="password"
          />
          <PrimaryButton title={u.login.submit} onPress={handleLogin} loading={false} disabled={loading} />
          <Pressable
            onPress={() =>
              router.replace({
                pathname: '/home',
                params: { guest: '1', displayName: u.common.guestDisplayName },
              })
            }
            style={({ pressed }) => [styles.guestBtn, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
            accessibilityLabel={u.login.guestA11y}
          >
            <Text style={styles.guestBtnText}>{u.login.guest}</Text>
          </Pressable>
          <View style={styles.links}>
            <LinkText text={u.login.forgotEmail} onPress={() => router.push('/(auth)/email-recovery')} />
            <LinkText text={u.login.forgotPassword} onPress={() => router.push('/(auth)/password-recovery')} />
          </View>
          <PrimaryButton
            title={u.login.register}
            onPress={() => router.push('/(auth)/register')}
            style={styles.secondaryButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 24,
  },
  links: {
    marginTop: 16,
    gap: 12,
  },
  secondaryButton: {
    marginTop: 24,
    backgroundColor: '#2a2a30',
  },
  guestBtn: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 8,
  },
  guestBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#a1a1aa',
    textDecorationLine: 'underline',
  },
});
